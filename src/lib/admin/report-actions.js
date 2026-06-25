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

export async function fetchFilteredProjectMembers(supabase) {
  const { data, error } = await supabase.from("project_members").select("*");
  if (error) { console.error("Error fetching project members:", error); return []; }
  return data || [];
}

export async function fetchFilteredTaskAssignees(supabase) {
  const { data, error } = await supabase.from("task_assignees").select("*");
  if (error) { console.error("Error fetching task assignees:", error); return []; }
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

export async function getTeamPerformanceData(filters) {
  const profile = await requireAdmin();
  const supabase = await createClient();
  const today = getTodayDateString();

  const [
    profiles,
    projects,
    projectMembers,
    tasks,
    taskAssignees,
    reports,
    blocks,
    sessions,
    legacy
  ] = await Promise.all([
    fetchFilteredProfiles(supabase),
    fetchFilteredProjects(supabase, filters),
    fetchFilteredProjectMembers(supabase),
    fetchFilteredTasks(supabase, filters),
    fetchFilteredTaskAssignees(supabase),
    fetchFilteredReports(supabase, filters),
    fetchFilteredBlocks(supabase, filters),
    fetchFilteredSessions(supabase, filters),
    fetchFilteredLegacy(supabase, filters)
  ]);

  const latestReports = getLatestReports(reports);

  const teamData = profiles.map(member => {
    const memberBlocks = blocks.filter(b => b.user_id === member.id);
    const activeSession = sessions.find(s => s.user_id === member.id && s.status !== "ended");
    const totalTrackedSeconds = calculateWorkBlocksDisplaySeconds(memberBlocks, activeSession);
    
    let totalBreakSeconds = 0;
    const memberSessions = sessions.filter(s => s.user_id === member.id);
    memberSessions.forEach(s => {
      totalBreakSeconds += (s.break_seconds || 0);
      if (s.status === "break" && s.break_started_at) {
        const start = new Date(s.break_started_at).getTime();
        const now = new Date().getTime();
        totalBreakSeconds += Math.max(0, Math.floor((now - start) / 1000));
      }
    });

    const netProductiveSeconds = Math.max(0, totalTrackedSeconds - totalBreakSeconds);

    const projectMemberships = projectMembers.filter(pm => pm.user_id === member.id).length;
    
    // Member's assigned tasks
    const memberAssignedTaskIds = new Set(taskAssignees.filter(ta => ta.user_id === member.id).map(ta => ta.task_id));
    const memberTasks = tasks.filter(t => memberAssignedTaskIds.has(t.id));
    const completedProjectTasks = memberTasks.filter(t => t.status === "done" && (!filters.startDate || (t.updated_at && t.updated_at >= filters.startDate)));
    
    const overdueAssignedTasks = memberTasks.filter(t => {
      if (["archived", "cancelled", "done"].includes(t.status) || !t.due_date) return false;
      return t.due_date.split("T")[0] < today;
    }).length;

    const blockedAssignedTasks = memberTasks.filter(t => t.status === "blocked").length;

    // Legacy
    const completedLegacy = legacy.filter(l => l.assigned_to === member.id && l.status === "done");

    // Reports submitted by this member
    const memberReports = latestReports.filter(r => r.submitted_by === member.id);
    const reportsSubmitted = memberReports.length;
    const reportsApproved = memberReports.filter(r => r.completion_status === "approved").length;
    const revisionRequestsReceived = memberReports.filter(r => r.completion_status === "revision_requested").length;
    const rejectedReports = memberReports.filter(r => r.completion_status === "rejected").length;

    const lastActivityBlock = memberBlocks.sort((a, b) => new Date(b.started_at) - new Date(a.started_at))[0];
    const lastActivityDate = lastActivityBlock ? lastActivityBlock.started_at : null;

    return {
      id: member.id,
      name: member.name,
      email: member.email,
      projectMemberships,
      totalTrackedSeconds,
      totalBreakSeconds,
      netProductiveSeconds,
      workBlocksCount: memberBlocks.length,
      completedProjectTasks: completedProjectTasks.length,
      completedLegacyAssignments: completedLegacy.length,
      reportsSubmitted,
      reportsApproved,
      revisionRequestsReceived,
      rejectedReports,
      overdueAssignedTasks,
      blockedAssignedTasks,
      lastActivityDate
    };
  });

  return {
    hasError: false,
    teamData
  };
}

export async function getProjectReportsData(filters) {
  const profile = await requireAdmin();
  const supabase = await createClient();
  const today = getTodayDateString();

  const [
    projects,
    clients,
    projectMembers,
    tasks,
    reports,
    blocks
  ] = await Promise.all([
    fetchFilteredProjects(supabase, filters),
    supabase.from("clients").select("*").then(res => res.data || []),
    fetchFilteredProjectMembers(supabase),
    fetchFilteredTasks(supabase, filters),
    fetchFilteredReports(supabase, filters),
    fetchFilteredBlocks(supabase, filters)
  ]);

  const latestReports = getLatestReports(reports);

  const projectData = projects.map(p => {
    const pClient = clients.find(c => c.id === p.client_id);
    const pMembersCount = projectMembers.filter(pm => pm.project_id === p.id).length;
    const pTasks = tasks.filter(t => t.project_id === p.id);
    
    const totalTasks = pTasks.length;
    const completedTasks = pTasks.filter(t => t.status === "done");
    const activeTasks = pTasks.filter(t => !["archived", "cancelled", "done"].includes(t.status));
    
    const overdueTasks = pTasks.filter(t => {
      if (["archived", "cancelled", "done"].includes(t.status) || !t.due_date) return false;
      return t.due_date.split("T")[0] < today;
    }).length;
    const blockedTasks = pTasks.filter(t => t.status === "blocked").length;
    
    // Determine Unassigned tasks (no task_assignees). We don't fetch task_assignees globally here to save payload, 
    // but we can query it or if it's already in task data. We didn't fetch task_assignees in this Promise.all.
    // I'll add task_assignees fetch to this function below.
    
    const pTaskIds = new Set(pTasks.map(t => t.id));
    const pReports = latestReports.filter(r => pTaskIds.has(r.task_id));
    const reportsAwaiting = pReports.filter(r => r.completion_status === "submitted").length;
    const reportsRevision = pReports.filter(r => r.completion_status === "revision_requested").length;

    // Time calculations
    const pBlocks = blocks.filter(b => b.source_type === "project_task" && pTaskIds.has(b.task_id));
    const totalTrackedSeconds = calculateWorkBlocksDisplaySeconds(pBlocks); 
    // Break time for projects is tricky because breaks are at session level, not task level.
    // For project reports, we can't easily attribute a general session break to a specific project.
    // So break time might be 0 unless stored explicitly per block.
    
    const lastActivityBlock = pBlocks.sort((a, b) => new Date(b.started_at) - new Date(a.started_at))[0];
    const lastActivityDate = lastActivityBlock ? lastActivityBlock.started_at : null;

    let projectHealth = "On Track";
    if (p.status === "completed") projectHealth = "Completed";
    else if (blockedTasks > 0) projectHealth = "Blocked Risk";
    else if (p.due_date && p.due_date.split("T")[0] < today) projectHealth = "Overdue";
    else if (p.due_date && (new Date(p.due_date) - new Date()) / (1000*60*60*24) <= 3) projectHealth = "Due Soon";
    else if (activeTasks.length === 0) projectHealth = "No Active Work";
    else if (!p.due_date) projectHealth = "No Due Date";

    return {
      id: p.id,
      name: p.name,
      clientName: pClient ? pClient.name : "Unknown",
      status: p.status,
      priority: p.priority,
      startDate: p.start_date,
      dueDate: p.due_date,
      progress: p.progress,
      memberCount: pMembersCount,
      totalTasks,
      completedTasks: completedTasks.length,
      activeTasks: activeTasks.length,
      overdueTasks,
      blockedTasks,
      reportsAwaiting,
      reportsRevision,
      totalTrackedSeconds,
      totalBreakSeconds: 0,
      netProductiveSeconds: totalTrackedSeconds,
      lastActivityDate,
      projectHealth
    };
  });

  return { hasError: false, projectData };
}

export async function getTaskReportsData(filters) {
  const profile = await requireAdmin();
  const supabase = await createClient();
  const today = getTodayDateString();

  const [
    tasks,
    projects,
    clients,
    taskAssignees,
    profiles,
    reports,
    blocks
  ] = await Promise.all([
    fetchFilteredTasks(supabase, filters),
    fetchFilteredProjects(supabase, filters),
    supabase.from("clients").select("*").then(res => res.data || []),
    fetchFilteredTaskAssignees(supabase),
    fetchFilteredProfiles(supabase),
    fetchFilteredReports(supabase, filters),
    fetchFilteredBlocks(supabase, filters)
  ]);

  const latestReports = getLatestReports(reports);

  const taskData = tasks.map(t => {
    const p = projects.find(proj => proj.id === t.project_id);
    const c = p ? clients.find(cl => cl.id === p.client_id) : null;
    
    const assignees = taskAssignees.filter(ta => ta.task_id === t.id).map(ta => {
      const prof = profiles.find(pr => pr.id === ta.user_id);
      return prof ? prof.name : "Unknown";
    });

    const tBlocks = blocks.filter(b => b.source_type === "project_task" && b.task_id === t.id);
    const firstBlock = tBlocks.sort((a, b) => new Date(a.started_at) - new Date(b.started_at))[0];
    const firstTimerStartDate = firstBlock ? firstBlock.started_at : null;

    const totalTrackedSeconds = calculateWorkBlocksDisplaySeconds(tBlocks);
    
    // Use the latest report for current status
    const tReports = latestReports.filter(r => r.task_id === t.id);
    const currentReport = tReports.sort((a, b) => b.version_number - a.version_number)[0];
    
    const allVersions = reports.filter(r => r.task_id === t.id);
    const reportVersionCount = allVersions.length;
    const revisionCount = allVersions.filter(r => r.completion_status === "revision_requested").length;

    let isOverdue = false;
    if (!["archived", "cancelled", "done"].includes(t.status) && t.due_date) {
      isOverdue = t.due_date.split("T")[0] < today;
    }

    // Subtask completion
    let subtaskCompletion = "0/0";
    if (t.subtasks && Array.isArray(t.subtasks)) {
      const completed = t.subtasks.filter(st => st.completed).length;
      subtaskCompletion = `${completed}/${t.subtasks.length}`;
    }

    return {
      id: t.id,
      title: t.title,
      projectName: p ? p.name : "Unknown",
      clientName: c ? c.name : "Unknown",
      assignees,
      status: t.status,
      priority: t.priority,
      createdDate: t.created_at,
      plannedStartDate: t.start_date,
      dueDate: t.due_date,
      firstTimerStartDate,
      reportedActualStartDate: currentReport ? currentReport.actual_start_date : null,
      reportSubmittedDate: currentReport ? currentReport.submitted_date : null,
      completedDate: t.status === "done" ? t.updated_at : null, // Fallback to updated_at
      totalTrackedSeconds,
      progress: t.progress,
      subtaskCompletion,
      workReportStatus: currentReport ? currentReport.completion_status : "none",
      reportVersionCount,
      revisionCount,
      isOverdue
    };
  });

  return { hasError: false, taskData };
}
