"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin, getCurrentProfile } from "@/lib/admin/auth";
import { calculateWorkBlocksDisplaySeconds, getTodayDateString } from "@/lib/admin/time";
import { revalidatePath } from "next/cache";

const buildDateFilter = (query, dateColumn, startDate, endDate, isTimestamptz = false) => {
  if (startDate) {
    const startVal = isTimestamptz ? `${startDate}T00:00:00+06:00` : startDate;
    query.gte(dateColumn, startVal);
  }
  if (endDate) {
    const endVal = isTimestamptz ? `${endDate}T23:59:59.999+06:00` : endDate;
    query.lte(dateColumn, endVal);
  }
  return query;
};

export async function fetchFilteredProfiles(supabase) {
  const { data, error } = await supabase.from("admin_profiles").select("id, name, email, is_active, role").order("name");
  return { data, error: error || null };
}

export async function fetchFilteredProjects(supabase, filters = {}) {
  let query = supabase.from("projects").select("*");
  if (filters.client && filters.client !== "all") query.eq("client_id", filters.client);
  if (filters.project && filters.project !== "all") query.eq("id", filters.project);
  const { data, error } = await query;
  return { data, error: error || null };
}

export async function fetchFilteredTasks(supabase, filters = {}, projectIds = null, assignedTaskIds = null) {
  if (projectIds && projectIds.length === 0) return { data: [], error: null };
  if (assignedTaskIds && assignedTaskIds.length === 0) return { data: [], error: null };
  
  let query = supabase.from("project_tasks").select("*");
  if (projectIds) query.in("project_id", projectIds);
  if (assignedTaskIds) query.in("id", assignedTaskIds);
  if (filters.taskStatus && filters.taskStatus !== "all") query.eq("status", filters.taskStatus);
  const { data, error } = await query;
  return { data, error: error || null };
}

export async function fetchFilteredSubtasks(supabase, taskIds = null) {
  if (taskIds && taskIds.length === 0) return { data: [], error: null };
  let query = supabase.from("project_subtasks").select("id, task_id, status");
  if (taskIds) query.in("task_id", taskIds);
  const { data, error } = await query;
  return { data, error: error || null };
}

export async function fetchFilteredReports(supabase, filters = {}, taskIds = null) {
  if (taskIds && taskIds.length === 0) return { data: [], error: null };
  let query = supabase.from("task_work_reports").select("*");
  if (taskIds) query.in("task_id", taskIds);
  if (filters.member && filters.member !== "all") query.eq("submitted_by", filters.member);
  const { data, error } = await query;
  return { data, error: error || null };
}

export async function fetchFilteredBlocks(supabase, filters = {}) {
  let query = supabase.from("work_blocks").select("*");
  if (filters.member && filters.member !== "all") query.eq("user_id", filters.member);
  
  // sourceType is manual if source_type is null or matches the exact string. We do that filtering in JS for precision, 
  // but we can pre-filter here if it's 'project_task' or 'legacy_assignment'.
  if (filters.sourceType === "project_task") query.eq("source_type", "project_task");
  if (filters.sourceType === "legacy_assignment") query.eq("source_type", "legacy_assignment");
  if (filters.sourceType === "manual") query.is("source_type", null); // Assuming manual blocks have null source_type in DB

  query = buildDateFilter(query, "work_date", filters.startDate, filters.endDate, false); 
  const { data, error } = await query;
  return { data, error: error || null };
}

export async function fetchFilteredSessions(supabase, filters = {}) {
  let query = supabase.from("work_sessions").select("*");
  if (filters.member && filters.member !== "all") query.eq("user_id", filters.member);
  query = buildDateFilter(query, "work_date", filters.startDate, filters.endDate, false); 
  const { data, error } = await query;
  return { data, error: error || null };
}

export async function fetchFilteredLegacy(supabase, filters = {}) {
  let query = supabase.from("work_assignments").select("*");
  if (filters.member && filters.member !== "all") query.eq("assigned_to", filters.member);
  query = buildDateFilter(query, "work_date", filters.startDate, filters.endDate, false); 
  const { data, error } = await query;
  return { data, error: error || null };
}

export async function fetchFilteredProjectMembers(supabase, projectIds = null) {
  if (projectIds && projectIds.length === 0) return { data: [], error: null };
  let query = supabase.from("project_members").select("*");
  if (projectIds) query.in("project_id", projectIds);
  const { data, error } = await query;
  return { data, error: error || null };
}

export async function fetchFilteredTaskAssignees(supabase, taskIds = null, memberId = null) {
  let query = supabase.from("task_assignees").select("*");
  if (taskIds) {
    if (taskIds.length === 0) return { data: [], error: null };
    query.in("task_id", taskIds);
  }
  if (memberId) query.eq("user_id", memberId);
  const { data, error } = await query;
  return { data, error: error || null };
}

/**
 * Deduplicate reports: group by task_id + submitted_by, keep highest version_number.
 */
function getLatestReports(reports) {
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

async function resolveDataForAggregators(supabase, filters, needsSubtasks = false, needsMembersAndAssignees = false) {
  const projectsRes = await fetchFilteredProjects(supabase, filters);
  if (projectsRes.error) return { error: projectsRes.error };
  const projects = projectsRes.data;
  const projectIds = projects.map(p => p.id);

  let assignedTaskIds = null;
  if (filters.member && filters.member !== "all") {
    const memAssignRes = await fetchFilteredTaskAssignees(supabase, null, filters.member);
    if (memAssignRes.error) return { error: memAssignRes.error };
    assignedTaskIds = memAssignRes.data.map(ta => ta.task_id);
  }

  const tasksRes = await fetchFilteredTasks(supabase, filters, projectIds, assignedTaskIds);
  if (tasksRes.error) return { error: tasksRes.error };
  let tasks = tasksRes.data;
  let taskIds = tasks.map(t => t.id);

  const promises = [
    fetchFilteredProfiles(supabase),
    fetchFilteredReports(supabase, filters, taskIds),
    fetchFilteredBlocks(supabase, filters),
    fetchFilteredSessions(supabase, filters),
    fetchFilteredLegacy(supabase, filters)
  ];
  
  if (needsMembersAndAssignees) {
    promises.push(fetchFilteredProjectMembers(supabase, projectIds));
    promises.push(fetchFilteredTaskAssignees(supabase, taskIds));
  } else {
    promises.push(Promise.resolve({ data: [], error: null }));
    promises.push(Promise.resolve({ data: [], error: null }));
  }

  if (needsSubtasks) {
    promises.push(fetchFilteredSubtasks(supabase, taskIds));
  } else {
    promises.push(Promise.resolve({ data: [], error: null }));
  }

  const [
    profilesRes,
    reportsRes,
    blocksRes,
    sessionsRes,
    legacyRes,
    projectMembersRes,
    taskAssigneesRes,
    subtasksRes
  ] = await Promise.all(promises);

  if (profilesRes.error || reportsRes.error || blocksRes.error || sessionsRes.error || legacyRes.error || projectMembersRes.error || taskAssigneesRes.error || subtasksRes.error) {
    return { error: true };
  }

  let reports = reportsRes.data;
  let latestReports = getLatestReports(reports);

  let profiles = profilesRes.data;
  if (filters.member && filters.member !== "all") {
    profiles = profiles.filter(p => p.id === filters.member);
  }

  let legacy = legacyRes.data;
  if ((filters.project && filters.project !== "all") || (filters.client && filters.client !== "all")) {
    legacy = [];
  } else if (filters.sourceType && filters.sourceType !== "all" && filters.sourceType !== "legacy_assignment") {
    legacy = [];
  }

  // Apply report status filter to tasks if needed
  if (filters.reportStatus && filters.reportStatus !== "all") {
    latestReports = latestReports.filter(r => r.completion_status === filters.reportStatus);
    const validTaskIds = new Set(latestReports.map(r => r.task_id));
    tasks = tasks.filter(t => validTaskIds.has(t.id));
    taskIds = tasks.map(t => t.id);
    
    // Cascading the refilter
    reports = reports.filter(r => validTaskIds.has(r.task_id));
  }

  // Filter blocks logically in JS so we don't accidentally drop valid legacy/manual blocks 
  // simply because project_task_id isn't in taskIds.
  let blocks = blocksRes.data.filter(b => {
    const type = b.source_type;
    // Manual source checks (could be 'manual' or null depending on convention)
    const isManual = type === "manual" || !type;
    
    // Explicit filter by Source Type
    if (filters.sourceType && filters.sourceType !== "all") {
      if (filters.sourceType === "project_task" && type !== "project_task") return false;
      if (filters.sourceType === "legacy_assignment" && type !== "legacy_assignment") return false;
      if (filters.sourceType === "manual" && !isManual) return false;
    }
    
    if (type === "project_task") {
      // Must belong to the filtered task list
      return taskIds.includes(b.project_task_id);
    }
    
    // If it's legacy/manual, and a Project/Client filter is explicitly applied, they usually shouldn't be included 
    // unless the Source Type is explicitly 'all', but even then, legacy blocks don't belong to the project.
    // The prompt says: "Project/Client filter should normally exclude unrelated legacy/manual work"
    if ((filters.project && filters.project !== "all") || (filters.client && filters.client !== "all")) {
      return false; // Exclude non-project blocks if project/client is filtered
    }
    
    return true;
  });

  return {
    projects,
    tasks,
    profiles,
    reports,
    latestReports,
    blocks,
    sessions: sessionsRes.data,
    legacy,
    projectMembers: projectMembersRes.data,
    taskAssignees: taskAssigneesRes.data,
    subtasks: subtasksRes.data
  };
}

// Helpers for timestamps
function isCompletedInRange(completedAt, startDate, endDate) {
  if (!completedAt) return false;
  const d = new Date(completedAt).getTime();
  if (startDate) {
    const startBoundary = new Date(`${startDate}T00:00:00+06:00`).getTime();
    if (d < startBoundary) return false;
  }
  if (endDate) {
    const endBoundary = new Date(`${endDate}T23:59:59.999+06:00`).getTime();
    if (d > endBoundary) return false;
  }
  return true;
}

export async function getOverviewData(filters) {
  const profile = await requireAdmin();
  const supabase = await createClient();
  const today = getTodayDateString();

  const dataRes = await resolveDataForAggregators(supabase, filters);
  if (dataRes.error) return { hasError: true };
  const { profiles, projects, tasks, latestReports, reports, blocks, sessions, legacy } = dataRes;

  const isBreakTimeReliable = !(filters.project && filters.project !== "all") &&
                              !(filters.client && filters.client !== "all") &&
                              !(filters.sourceType && filters.sourceType !== "all") &&
                              !(filters.reportStatus && filters.reportStatus !== "all");

  let totalTrackedSeconds = 0;
  let totalBreakSeconds = isBreakTimeReliable ? 0 : null;
  
  profiles.forEach(member => {
    const memberBlocks = blocks.filter(b => b.user_id === member.id);
    const activeSession = sessions.find(s => s.user_id === member.id && ["task_active", "break", "workday_open"].includes(s.status));
    totalTrackedSeconds += calculateWorkBlocksDisplaySeconds(memberBlocks, activeSession);

    if (isBreakTimeReliable) {
      const memberSessions = sessions.filter(s => s.user_id === member.id);
      memberSessions.forEach(s => {
        totalBreakSeconds += (s.break_seconds || 0);
        if (s.status === "break" && s.break_started_at) {
          const start = new Date(s.break_started_at).getTime();
          const now = new Date().getTime();
          totalBreakSeconds += Math.max(0, Math.floor((now - start) / 1000));
        }
      });
    }
  });

  const netProductiveSeconds = totalTrackedSeconds; 

  const completedTasks = tasks.filter(t => t.status === "done" && isCompletedInRange(t.completed_at, filters.startDate, filters.endDate));
  const completedLegacy = legacy.filter(l => l.status === "done");
  
  // Submissions in range uses ALL versions of reports, not just latest.
  const reportsSubmittedRange = reports.filter(r => {
    if (filters.startDate && r.submitted_date < filters.startDate) return false;
    if (filters.endDate && r.submitted_date > filters.endDate) return false;
    return true;
  });

  const reportsSubmitted = reportsSubmittedRange.length;
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
    const blockSecs = calculateWorkBlocksDisplaySeconds([b], sessions.find(s => s.user_id === b.user_id && ["task_active", "break", "workday_open"].includes(s.status)));
    acc[type] = (acc[type] || 0) + blockSecs;
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

  const dataRes = await resolveDataForAggregators(supabase, filters, false, true);
  if (dataRes.error) return { hasError: true };
  const { profiles, projects, projectMembers, tasks, taskAssignees, reports, latestReports, blocks, sessions, legacy } = dataRes;

  const isBreakTimeReliable = !(filters.project && filters.project !== "all") &&
                              !(filters.client && filters.client !== "all") &&
                              !(filters.sourceType && filters.sourceType !== "all") &&
                              !(filters.reportStatus && filters.reportStatus !== "all");

  const teamData = profiles.map(member => {
    const memberBlocks = blocks.filter(b => b.user_id === member.id);
    const memberSessions = sessions.filter(s => s.user_id === member.id);
    const activeSession = memberSessions.find(s => ["task_active", "break", "workday_open"].includes(s.status));
    
    const netProductiveSeconds = calculateWorkBlocksDisplaySeconds(memberBlocks, activeSession);

    let totalBreakSeconds = isBreakTimeReliable ? 0 : null;
    if (isBreakTimeReliable) {
      memberSessions.forEach(s => {
        totalBreakSeconds += (s.break_seconds || 0);
        if (s.status === "break" && s.break_started_at) {
          const start = new Date(s.break_started_at).getTime();
          const now = new Date().getTime();
          totalBreakSeconds += Math.max(0, Math.floor((now - start) / 1000));
        }
      });
    }

    const projectMemberships = projectMembers.filter(pm => pm.user_id === member.id).length;
    
    // memberTasks are implicitly already constrained if filters.member is set, but we double check to be safe
    const memberAssignedTaskIds = new Set(taskAssignees.filter(ta => ta.user_id === member.id).map(ta => ta.task_id));
    const memberTasks = tasks.filter(t => memberAssignedTaskIds.has(t.id));
    const completedProjectTasks = memberTasks.filter(t => t.status === "done" && isCompletedInRange(t.completed_at, filters.startDate, filters.endDate));
    
    const overdueAssignedTasks = memberTasks.filter(t => {
      if (["archived", "cancelled", "done"].includes(t.status) || !t.due_date) return false;
      return t.due_date.split("T")[0] < today;
    }).length;

    const blockedAssignedTasks = memberTasks.filter(t => t.status === "blocked").length;

    const completedLegacy = legacy.filter(l => l.assigned_to === member.id && l.status === "done");

    // All submissions by member in range
    const memberReportsSubmitted = reports.filter(r => r.submitted_by === member.id && (!filters.startDate || r.submitted_date >= filters.startDate) && (!filters.endDate || r.submitted_date <= filters.endDate));
    
    // Latest state by member
    const memberLatestReports = latestReports.filter(r => r.submitted_by === member.id);
    
    const reportsSubmitted = memberReportsSubmitted.length;
    const reportsApproved = memberLatestReports.filter(r => r.completion_status === "approved").length;
    const revisionRequestsReceived = memberLatestReports.filter(r => r.completion_status === "revision_requested").length;
    const rejectedReports = memberLatestReports.filter(r => r.completion_status === "rejected").length;

    const lastActivityBlock = memberBlocks.sort((a, b) => new Date(b.started_at) - new Date(a.started_at))[0];
    const lastActivityDate = lastActivityBlock ? lastActivityBlock.started_at : null;

    return {
      id: member.id,
      name: member.name,
      email: member.email,
      projectMemberships,
      totalTrackedSeconds: netProductiveSeconds, // display is net
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

  return { hasError: false, teamData };
}

export async function getProjectReportsData(filters) {
  const profile = await requireAdmin();
  const supabase = await createClient();
  const today = getTodayDateString();

  const dataRes = await resolveDataForAggregators(supabase, filters, false, true);
  if (dataRes.error) return { hasError: true };
  const { projects, projectMembers, tasks, latestReports, blocks } = dataRes;

  const clientsRes = await supabase.from("clients").select("*");
  if (clientsRes.error) return { hasError: true };
  const clients = clientsRes.data || [];

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
    
    const pTaskIds = new Set(pTasks.map(t => t.id));
    const pReports = latestReports.filter(r => pTaskIds.has(r.task_id));
    const reportsAwaiting = pReports.filter(r => r.completion_status === "submitted").length;
    const reportsRevision = pReports.filter(r => r.completion_status === "revision_requested").length;

    const pBlocks = blocks.filter(b => b.source_type === "project_task" && pTaskIds.has(b.project_task_id));
    const totalTrackedSeconds = calculateWorkBlocksDisplaySeconds(pBlocks); 
    
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
      progress: p.progress_percent,
      memberCount: pMembersCount,
      totalTasks,
      completedTasks: completedTasks.length,
      activeTasks: activeTasks.length,
      overdueTasks,
      blockedTasks,
      reportsAwaiting,
      reportsRevision,
      totalTrackedSeconds,
      totalBreakSeconds: null, // Omit break metric to prevent false project-level zeros since sessions can span multiple sources
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

  const dataRes = await resolveDataForAggregators(supabase, filters, true, true);
  if (dataRes.error) return { hasError: true };
  const { tasks, projects, taskAssignees, profiles, reports, latestReports, blocks, subtasks } = dataRes;

  const clientsRes = await supabase.from("clients").select("*");
  if (clientsRes.error) return { hasError: true };
  const clients = clientsRes.data || [];

  const taskData = tasks.map(t => {
    const p = projects.find(proj => proj.id === t.project_id);
    const c = p ? clients.find(cl => cl.id === p.client_id) : null;
    
    const assignees = taskAssignees.filter(ta => ta.task_id === t.id).map(ta => {
      const prof = profiles.find(pr => pr.id === ta.user_id);
      return prof ? prof.name : "Unknown";
    });

    const tBlocks = blocks.filter(b => b.source_type === "project_task" && b.project_task_id === t.id);
    const firstBlock = tBlocks.sort((a, b) => new Date(a.started_at) - new Date(b.started_at))[0];
    const firstTimerStartDate = firstBlock ? firstBlock.started_at : null;

    const totalTrackedSeconds = calculateWorkBlocksDisplaySeconds(tBlocks);
    
    // Resolve deterministic task-level report status: Newest among current submitters' latest reports
    const tLatestReports = latestReports.filter(r => r.task_id === t.id);
    tLatestReports.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const currentReport = tLatestReports[0];
    
    const allVersions = reports.filter(r => r.task_id === t.id);
    const reportVersionCount = allVersions.length;
    const revisionCount = allVersions.filter(r => r.completion_status === "revision_requested").length;

    let isOverdue = false;
    if (!["archived", "cancelled", "done"].includes(t.status) && t.due_date) {
      isOverdue = t.due_date.split("T")[0] < today;
    }

    let subtaskCompletion = "0/0";
    const tSubtasks = subtasks.filter(st => st.task_id === t.id && !["archived", "cancelled"].includes(st.status));
    if (tSubtasks.length > 0) {
      const completed = tSubtasks.filter(st => st.status === "done").length;
      subtaskCompletion = `${completed}/${tSubtasks.length}`;
    }

    return {
      id: t.id,
      projectId: t.project_id,
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
      completedDate: t.completed_at || (t.status === "done" ? t.updated_at : null),
      completedDateIsFallback: !t.completed_at && t.status === "done",
      totalTrackedSeconds,
      progress: t.progress_percent,
      subtaskCompletion,
      workReportStatus: currentReport ? currentReport.completion_status : "none",
      reportVersionCount,
      revisionCount,
      isOverdue
    };
  });

  return { hasError: false, taskData };
}

export async function getTimeReportsData(filters) {
  const profile = await requireAdmin();
  const supabase = await createClient();

  const dataRes = await resolveDataForAggregators(supabase, filters);
  if (dataRes.error) return { hasError: true };
  const { blocks, sessions, profiles } = dataRes;

  const isBreakTimeReliable = !(filters.project && filters.project !== "all") &&
                              !(filters.client && filters.client !== "all") &&
                              !(filters.sourceType && filters.sourceType !== "all") &&
                              !(filters.reportStatus && filters.reportStatus !== "all");

  const timeData = profiles.map(member => {
    const memberBlocks = blocks.filter(b => b.user_id === member.id);
    const memberSessions = sessions.filter(s => s.user_id === member.id);
    const activeSession = memberSessions.find(s => ["task_active", "break", "workday_open"].includes(s.status));

    const netProductiveSeconds = calculateWorkBlocksDisplaySeconds(memberBlocks, activeSession);
    
    let totalBreakSeconds = isBreakTimeReliable ? 0 : null;
    if (isBreakTimeReliable) {
      memberSessions.forEach(s => {
        totalBreakSeconds += (s.break_seconds || 0);
        if (s.status === "break" && s.break_started_at) {
          const start = new Date(s.break_started_at).getTime();
          const now = new Date().getTime();
          totalBreakSeconds += Math.max(0, Math.floor((now - start) / 1000));
        }
      });
    }

    let firstWorkStart = null;
    let lastWorkEnd = null;
    let maxBlockDuration = 0;
    
    let projectTaskSeconds = 0;
    let legacySeconds = 0;
    let manualSeconds = 0;

    memberBlocks.forEach(b => {
      if (b.started_at) {
        const t = new Date(b.started_at);
        if (!firstWorkStart || t < new Date(firstWorkStart)) firstWorkStart = b.started_at;
      }
      
      let blockSecs = 0;
      if (b.status === "done") {
        if (b.started_at && b.ended_at) {
          blockSecs = Math.max(0, Math.floor((new Date(b.ended_at) - new Date(b.started_at)) / 1000));
          const endT = new Date(b.ended_at);
          if (!lastWorkEnd || endT > new Date(lastWorkEnd)) lastWorkEnd = b.ended_at;
        } else {
          blockSecs = (b.total_minutes || 0) * 60;
        }
      } else if (b.status === "active" && b.started_at) {
        const start = new Date(b.started_at).getTime();
        let diffMs = new Date().getTime() - start;
        if (activeSession && activeSession.status === "break" && activeSession.break_started_at) {
          const breakStart = new Date(activeSession.break_started_at).getTime();
          diffMs -= (new Date().getTime() - breakStart);
        }
        blockSecs = Math.max(0, Math.floor(diffMs / 1000));
        lastWorkEnd = "Active Now";
      }

      if (blockSecs > maxBlockDuration) maxBlockDuration = blockSecs;

      const type = b.source_type;
      const isManual = type === "manual" || !type;
      
      if (type === "project_task") projectTaskSeconds += blockSecs;
      else if (type === "legacy_assignment") legacySeconds += blockSecs;
      else if (isManual) manualSeconds += blockSecs;
    });

    const avgBlockSeconds = memberBlocks.length > 0 ? Math.floor(netProductiveSeconds / memberBlocks.length) : 0;

    return {
      id: member.id,
      name: member.name,
      totalTrackedSeconds: netProductiveSeconds,
      totalBreakSeconds,
      netProductiveSeconds,
      sessionsCount: memberSessions.length,
      blocksCount: memberBlocks.length,
      firstWorkStart,
      lastWorkEnd,
      maxBlockDuration,
      avgBlockSeconds,
      projectTaskSeconds,
      legacySeconds,
      manualSeconds,
      hasActiveSession: !!activeSession
    };
  });

  return { hasError: false, timeData };
}

export async function getWorkReportAnalysisData(filters) {
  const profile = await requireAdmin();
  const supabase = await createClient();

  const dataRes = await resolveDataForAggregators(supabase, filters);
  if (dataRes.error) return { hasError: true };
  const { latestReports, profiles, tasks, projects } = dataRes;
  
  let reviewTimeTotal = 0;
  let reviewedCount = 0;
  
  const analysisData = latestReports.map(r => {
    const t = tasks.find(tsk => tsk.id === r.task_id);
    if (!t) return null; 

    const p = projects.find(proj => proj.id === t.project_id);
    const author = profiles.find(prof => prof.id === r.submitted_by);
    const reviewer = profiles.find(prof => prof.id === r.reviewed_by);

    let reviewAge = 0;
    if (r.completion_status === "submitted" && r.created_at) {
      reviewAge = Math.floor((new Date() - new Date(r.created_at)) / (1000 * 60 * 60 * 24));
    }
    
    if (r.reviewed_at && r.created_at) {
      const rt = Math.floor((new Date(r.reviewed_at) - new Date(r.created_at)) / 1000);
      reviewTimeTotal += rt;
      reviewedCount++;
    }

    const isAfterDueDate = t.due_date && r.submitted_date ? r.submitted_date > t.due_date.split("T")[0] : false;
    
    let calendarDays = 0;
    if (r.actual_start_date && r.submitted_date) {
      const s = new Date(r.actual_start_date);
      const e = new Date(r.submitted_date);
      calendarDays = Math.max(0, Math.round((e - s) / (1000 * 60 * 60 * 24)));
    }

    return {
      id: r.id,
      taskId: r.task_id,
      projectId: t.project_id,
      taskTitle: t.title,
      projectName: p ? p.name : "Unknown",
      submittedBy: author ? author.name : "Unknown",
      versionNumber: r.version_number,
      actualStartDate: r.actual_start_date,
      submittedDate: r.submitted_date,
      completionDurationDays: calendarDays,
      status: r.completion_status,
      reviewedBy: reviewer ? reviewer.name : null,
      reviewedAt: r.reviewed_at,
      reviewAge,
      isAfterDueDate,
      hasWorkLinks: typeof r.work_link === "string" && r.work_link.trim().length > 0,
      createdAt: r.created_at
    };
  }).filter(Boolean);

  const avgReviewSeconds = reviewedCount > 0 ? Math.floor(reviewTimeTotal / reviewedCount) : 0;
  
  const pendingReports = analysisData.filter(d => d.status === "submitted");
  pendingReports.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const oldestPending = pendingReports[0] || null;

  return {
    hasError: false,
    analysisData,
    avgReviewSeconds,
    oldestPending
  };
}

export async function getLegacyHistoryData(filters) {
  const profile = await requireAdmin();
  const supabase = await createClient();

  const dataRes = await resolveDataForAggregators(supabase, filters);
  if (dataRes.error) return { hasError: true };
  const { legacy, profiles, blocks } = dataRes;

  const legacyData = legacy.map(l => {
    const assignee = profiles.find(p => p.id === l.assigned_to);
    
    const lBlocks = blocks.filter(b => b.source_type === "legacy_assignment" && b.assignment_id === l.id);
    const uniqueSessions = new Set(lBlocks.map(b => b.session_id).filter(Boolean));
    const totalTrackedSeconds = calculateWorkBlocksDisplaySeconds(lBlocks);
    
    return {
      id: l.id,
      title: l.title,
      assignedTo: assignee ? assignee.name : "Unknown",
      status: l.status,
      targetDate: l.work_date,
      sessionsCount: uniqueSessions.size,
      blocksCount: lBlocks.length,
      totalTrackedSeconds,
      completionDate: l.status === "done" ? l.completed_at || l.updated_at : null,
      completionDateIsFallback: l.status === "done" && !l.completed_at,
      notes: l.historical_notes || null
    };
  });

  return {
    hasError: false,
    legacyData
  };
}
/**
 * Submit or resubmit a task work report.
 * If resubmitting, we create a new row and link it via supersedes_report_id.
 */
export async function submitTaskReport(payload) {
  try {
    const profile = await getCurrentProfile();
    if (!profile) return { error: "Unauthorized" };

    const supabase = await createClient();

    // Verify user is assigned to task
    const { data: assignment, error: assignErr } = await supabase
      .from("task_assignees")
      .select("id")
      .eq("task_id", payload.taskId)
      .eq("user_id", profile.id)
      .single();

    if (assignErr || !assignment) {
      return { error: "You are not assigned to this task." };
    }

    // Check if there's an existing report that is blocking submission (e.g. approved)
    const { data: existingReport } = await supabase
      .from("task_work_reports")
      .select("id, version_number, completion_status")
      .eq("task_id", payload.taskId)
      .eq("submitted_by", profile.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (existingReport?.completion_status === "approved") {
      return { error: "An approved report already exists for this task." };
    }

    const versionNumber = existingReport ? existingReport.version_number + 1 : 1;
    const supersedesId = existingReport ? existingReport.id : null;

    // Validate dates
    if (new Date(payload.submittedDate) < new Date(payload.actualStartDate)) {
      return { error: "Submitted date cannot be before actual start date." };
    }

    if (!payload.workSummary?.trim()) {
      return { error: "Work summary is required." };
    }

    const { error: insertErr } = await supabase
      .from("task_work_reports")
      .insert({
        task_id: payload.taskId,
        submitted_by: profile.id,
        actual_start_date: payload.actualStartDate,
        submitted_date: payload.submittedDate,
        work_summary: payload.workSummary.trim(),
        work_link: payload.workLink?.trim() || null,
        note: payload.note?.trim() || null,
        completion_status: "submitted",
        version_number: versionNumber,
        supersedes_report_id: supersedesId
      });

    if (insertErr) {
      console.error("[submitTaskReport] DB Error:", insertErr);
      return { error: "Failed to submit report. Please try again." };
    }

    revalidatePath(`/admin/projects/${payload.projectId}/tasks/${payload.taskId}`);
    revalidatePath(`/admin/my-work`);
    return { success: true };
  } catch (error) {
    console.error("[submitTaskReport] Exception:", error);
    return { error: error.message || "An unexpected error occurred." };
  }
}

/**
 * Update an unapproved report (for typos)
 */
export async function updateTaskReport(reportId, payload) {
  try {
    const profile = await getCurrentProfile();
    if (!profile) return { error: "Unauthorized" };

    const supabase = await createClient();

    if (new Date(payload.submittedDate) < new Date(payload.actualStartDate)) {
      return { error: "Submitted date cannot be before actual start date." };
    }

    if (!payload.workSummary?.trim()) {
      return { error: "Work summary is required." };
    }

    const { error: updateErr } = await supabase
      .from("task_work_reports")
      .update({
        actual_start_date: payload.actualStartDate,
        submitted_date: payload.submittedDate,
        work_summary: payload.workSummary.trim(),
        work_link: payload.workLink?.trim() || null,
        note: payload.note?.trim() || null
      })
      .eq("id", reportId)
      .eq("submitted_by", profile.id)
      .in("completion_status", ["submitted", "revision_requested"]);

    if (updateErr) {
      console.error("[updateTaskReport] DB Error:", updateErr);
      return { error: "Failed to update report." };
    }

    revalidatePath(`/admin/projects/${payload.projectId}/tasks/${payload.taskId}`);
    return { success: true };
  } catch (error) {
    console.error("[updateTaskReport] Exception:", error);
    return { error: error.message || "An unexpected error occurred." };
  }
}

/**
 * Admin review of a report
 */
export async function reviewTaskReport(reportId, taskId, projectId, action, reviewNote, markTaskDone = false) {
  try {
    const profile = await getCurrentProfile();
    if (!profile || profile.role !== "admin" || !profile.is_active) {
      return { error: "Unauthorized: Active admin required." };
    }

    if (action === "revision_requested" && !reviewNote?.trim()) {
      return { error: "A review note is required when requesting revision." };
    }

    const validStatuses = {
      "approve": "approved",
      "reject": "rejected",
      "revision_requested": "revision_requested"
    };

    const newStatus = validStatuses[action];
    if (!newStatus) return { error: "Invalid review action." };

    const supabase = await createClient();

    // 1. Update report
    const { error: updateErr } = await supabase
      .from("task_work_reports")
      .update({
        completion_status: newStatus,
        reviewed_by: profile.id,
        reviewed_at: new Date().toISOString(),
        review_note: reviewNote?.trim() || null
      })
      .eq("id", reportId);

    if (updateErr) {
      console.error("[reviewTaskReport] Update Error:", updateErr);
      return { error: "Failed to apply review." };
    }

    // 2. Mark task done if requested and approved
    if (newStatus === "approved" && markTaskDone) {
      const { error: taskErr } = await supabase
        .from("project_tasks")
        .update({
          status: "done",
          progress_percent: 100
        })
        .eq("id", taskId)
        .neq("status", "done");

      if (taskErr) {
        console.error("[reviewTaskReport] Task Update Error:", taskErr);
        return { success: true, warning: "Report approved, but failed to mark task as done." };
      }
    }

    revalidatePath(`/admin/projects/${projectId}/tasks/${taskId}`);
    revalidatePath(`/admin/my-work`);
    return { success: true };
  } catch (error) {
    console.error("[reviewTaskReport] Exception:", error);
    return { error: error.message || "An unexpected error occurred." };
  }
}
