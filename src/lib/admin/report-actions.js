"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin/auth";
import { calculateWorkBlocksDisplaySeconds, getTodayDateString } from "@/lib/admin/time";

const buildDateFilter = (query, dateColumn, startDate, endDate) => {
  if (startDate) query.gte(dateColumn, `${startDate}T00:00:00.000Z`);
  if (endDate) query.lte(dateColumn, `${endDate}T23:59:59.999Z`);
  return query;
};

// Base fetchers for reuse
export async function fetchFilteredProfiles(supabase) {
  const { data } = await supabase.from("admin_profiles").select("id, name, email, is_active, role").order("name");
  return data || [];
}

export async function fetchFilteredProjects(supabase, filters = {}) {
  let query = supabase.from("projects").select("*");
  if (filters.client) query.eq("client_id", filters.client);
  if (filters.project) query.eq("id", filters.project);
  const { data, error } = await query;
  if (error) { console.error("Error fetching projects:", error); return []; }
  return data || [];
}

export async function fetchFilteredTasks(supabase, filters = {}) {
  let query = supabase.from("project_tasks").select("*");
  if (filters.project) query.eq("project_id", filters.project);
  if (filters.taskStatus && filters.taskStatus !== "all") query.eq("status", filters.taskStatus);
  const { data, error } = await query;
  if (error) { console.error("Error fetching tasks:", error); return []; }
  return data || [];
}

export async function fetchFilteredReports(supabase, filters = {}) {
  let query = supabase.from("task_work_reports").select("*");
  if (filters.member) query.eq("submitted_by", filters.member);
  if (filters.reportStatus && filters.reportStatus !== "all") query.eq("completion_status", filters.reportStatus);
  // For reports, date range usually applies to submitted_date
  if (filters.startDate || filters.endDate) {
    if (filters.startDate) query.gte("submitted_date", filters.startDate);
    if (filters.endDate) query.lte("submitted_date", filters.endDate);
  }
  const { data, error } = await query;
  if (error) { console.error("Error fetching reports:", error); return []; }
  return data || [];
}

export async function fetchFilteredBlocks(supabase, filters = {}) {
  let query = supabase.from("work_blocks").select("*");
  if (filters.member) query.eq("user_id", filters.member);
  if (filters.sourceType && filters.sourceType !== "all") query.eq("source_type", filters.sourceType);
  if (filters.startDate || filters.endDate) {
    if (filters.startDate) query.gte("work_date", filters.startDate);
    if (filters.endDate) query.lte("work_date", filters.endDate);
  }
  const { data, error } = await query;
  if (error) { console.error("Error fetching blocks:", error); return []; }
  return data || [];
}

export async function fetchFilteredSessions(supabase, filters = {}) {
  let query = supabase.from("work_sessions").select("*");
  if (filters.member) query.eq("user_id", filters.member);
  if (filters.startDate || filters.endDate) {
    if (filters.startDate) query.gte("work_date", filters.startDate);
    if (filters.endDate) query.lte("work_date", filters.endDate);
  }
  const { data, error } = await query;
  if (error) { console.error("Error fetching sessions:", error); return []; }
  return data || [];
}

export async function fetchFilteredLegacy(supabase, filters = {}) {
  let query = supabase.from("work_assignments").select("*");
  if (filters.member) query.eq("assigned_to", filters.member);
  if (filters.startDate || filters.endDate) {
    if (filters.startDate) query.gte("work_date", filters.startDate);
    if (filters.endDate) query.lte("work_date", filters.endDate);
  }
  const { data, error } = await query;
  if (error) { console.error("Error fetching legacy assignments:", error); return []; }
  return data || [];
}

/**
 * Deduplicate reports: group by task_id + submitted_by, keep highest version_number.
 */
export function getLatestReports(reports) {
  const map = new Map();
  reports.forEach(r => {
    const key = `${r.task_id}_${r.submitted_by}`;
    if (!map.has(key)) {
      map.set(key, r);
    } else {
      const existing = map.get(key);
      if (r.version_number > existing.version_number) {
        map.set(key, r);
      } else if (r.version_number === existing.version_number && new Date(r.created_at) > new Date(existing.created_at)) {
        map.set(key, r);
      }
    }
  });
  return Array.from(map.values());
}

export async function getOverviewData(filters) {
  const profile = await requireAdmin();
  const supabase = await createClient();
  const today = getTodayDateString();

  const [
    profiles,
    projects,
    tasks,
    reports,
    blocks,
    sessions,
    legacy
  ] = await Promise.all([
    fetchFilteredProfiles(supabase),
    fetchFilteredProjects(supabase, filters),
    fetchFilteredTasks(supabase, filters),
    fetchFilteredReports(supabase, filters),
    fetchFilteredBlocks(supabase, filters),
    fetchFilteredSessions(supabase, filters),
    fetchFilteredLegacy(supabase, filters)
  ]);

  const latestReports = getLatestReports(reports);

  // Time calculations
  let totalTrackedSeconds = 0;
  let totalBreakSeconds = 0;
  
  profiles.forEach(member => {
    const memberBlocks = blocks.filter(b => b.user_id === member.id);
    const activeSession = sessions.find(s => s.user_id === member.id && s.status !== "ended");
    totalTrackedSeconds += calculateWorkBlocksDisplaySeconds(memberBlocks, activeSession);
    
    const memberSessions = sessions.filter(s => s.user_id === member.id);
    memberSessions.forEach(s => {
      totalBreakSeconds += (s.break_seconds || 0);
      if (s.status === "break" && s.break_started_at) {
        const start = new Date(s.break_started_at).getTime();
        const now = new Date().getTime();
        totalBreakSeconds += Math.max(0, Math.floor((now - start) / 1000));
      }
    });
  });

  const netProductiveSeconds = Math.max(0, totalTrackedSeconds - totalBreakSeconds);

  const completedTasks = tasks.filter(t => t.status === "done" && (!filters.startDate || (t.updated_at && t.updated_at >= filters.startDate)));
  const completedLegacy = legacy.filter(l => l.status === "done");
  
  const reportsSubmitted = latestReports.length;
  const reportsApproved = latestReports.filter(r => r.completion_status === "approved").length;
  const reportsAwaiting = latestReports.filter(r => r.completion_status === "submitted").length;
  const reportsRevision = latestReports.filter(r => r.completion_status === "revision_requested").length;
  
  const overdueTasks = tasks.filter(t => {
    if (["archived", "cancelled", "done"].includes(t.status) || !t.due_date) return false;
    return t.due_date.split("T")[0] < today;
  }).length;
  const blockedTasks = tasks.filter(t => t.status === "blocked").length;

  const activeProjects = projects.filter(p => p.status === "active").length;
  const completedProjects = projects.filter(p => p.status === "completed").length;

  const taskStatusDistribution = tasks.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  const projectStatusDistribution = projects.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});

  const reportStatusDistribution = latestReports.reduce((acc, r) => {
    acc[r.completion_status] = (acc[r.completion_status] || 0) + 1;
    return acc;
  }, {});

  const sourceDistribution = blocks.reduce((acc, b) => {
    const type = b.source_type || "manual";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return {
    hasError: false,
    metrics: {
      totalTrackedSeconds,
      totalBreakSeconds,
      netProductiveSeconds,
      completedTasks: completedTasks.length,
      completedLegacy: completedLegacy.length,
      reportsSubmitted,
      reportsApproved,
      reportsAwaiting,
      reportsRevision,
      overdueTasks,
      blockedTasks,
      activeProjects,
      completedProjects
    },
    distributions: {
      taskStatusDistribution,
      projectStatusDistribution,
      reportStatusDistribution,
      sourceDistribution
    }
  };
}
