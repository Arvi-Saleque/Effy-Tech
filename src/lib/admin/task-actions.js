"use server";

import { createClient as createSupabaseClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/admin/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  taskIdSchema, subtaskIdSchema, createTaskSchema, updateTaskSchema, createSubtaskSchema, updateSubtaskSchema, taskStatusFilterSchema, taskPriorityFilterSchema, taskStatusTransitionSchema, subtaskStatusTransitionSchema, safeSearchSchema, taskReorderSchema, subtaskReorderSchema, taskDueStateFilterSchema
} from "./task-schema";

const uuidSchema = z.string().uuid();

async function requireActiveAdmin() {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "admin" || profile.is_active !== true) {
    throw new Error("Unauthorized: Active admin required.");
  }
  return profile;
}

// Helper to check read access (Admin or Project Member)
async function requireReadAccess(projectId) {
  const profile = await getCurrentProfile();
  if (!profile) throw new Error("Unauthorized");
  if (profile.role === "admin" && profile.is_active) return profile;

  // Check if member
  const supabase = await createSupabaseClient();
  const { data: member, error: mErr } = await supabase.from("project_members").select("user_id").eq("project_id", projectId).eq("user_id", profile.id).single();
  if (mErr) {
    if (mErr.code === "PGRST116") throw new Error("Unauthorized: Not a project member.");
    console.error("[requireReadAccess]", mErr);
    throw new Error("Unable to verify project access.");
  }
  if (!member) throw new Error("Unauthorized: Not a project member.");
  return profile;
}

// ---------------------------------------------------------
// TASKS
// ---------------------------------------------------------

export async function getProjectTasks(projectId, filters = {}) {
  try {
    const pidCheck = uuidSchema.safeParse(projectId);
    if (!pidCheck.success) return { data: null, error: "Invalid project ID." };

    await requireReadAccess(projectId);
    const supabase = await createSupabaseClient();

    let query = supabase.from("project_tasks")
      .select("*, task_assignees(id, user_id, assigned_by, assigned_at, admin_profiles!task_assignees_user_id_fkey(name, role, is_active)), project_subtasks(id, status, progress_percent, estimated_minutes), created_by_profile:admin_profiles!project_tasks_created_by_fkey(name)")
      .eq("project_id", projectId);

    const parsedSearch = safeSearchSchema.safeParse(filters.search);
    if (parsedSearch.success && parsedSearch.data) {
      query = query.or(`title.ilike.%${parsedSearch.data}%,description.ilike.%${parsedSearch.data}%`);
    }

    const parsedStatus = taskStatusFilterSchema.safeParse(filters.status);
    const validStatus = parsedStatus.success ? parsedStatus.data : "all";

    if (validStatus !== "all") {
      if (validStatus === "current") {
        query = query.not("status", "eq", "archived").not("status", "eq", "cancelled");
      } else {
        query = query.eq("status", validStatus);
      }
    } else {
      const incArchived = filters.includeArchived === true || filters.includeArchived === "true";
      if (!incArchived) {
        query = query.neq("status", "archived");
      }
    }

    const parsedPriority = taskPriorityFilterSchema.safeParse(filters.priority);
    if (parsedPriority.success && parsedPriority.data !== "all") {
      query = query.eq("priority", parsedPriority.data);
    }

    const { data: tasks, error } = await query;
    if (error) {
      console.error("[getProjectTasks]", error);
      return { data: null, error: "Unable to load tasks." };
    }

    // Apply post-db filters
    let filtered = tasks;
    if (filters.assigneeId && filters.assigneeId !== "all") {
      if (uuidSchema.safeParse(filters.assigneeId).success) {
        filtered = filtered.filter(t => t.task_assignees.some(a => a.user_id === filters.assigneeId));
      }
    }
    
    const parsedDue = taskDueStateFilterSchema.safeParse(filters.dueState);
    const validDueState = parsedDue.success ? parsedDue.data : "all";

    if (validDueState !== "all") {
      const today = new Date();
      today.setHours(0,0,0,0);
      const soon = new Date(today);
      soon.setDate(soon.getDate() + 3);

      filtered = filtered.filter(t => {
        if (!t.due_date) return validDueState === "no_due_date";
        // Parse YYYY-MM-DD safely
        const [y, m, d] = t.due_date.split('-');
        const dd = new Date(y, m - 1, d);
        if (validDueState === "overdue") return dd < today && t.status !== "done";
        if (validDueState === "due_today") return dd.getTime() === today.getTime();
        if (validDueState === "due_soon") return dd > today && dd <= soon;
        return false;
      });
    }

    const prioScore = { urgent: 1, high: 2, normal: 3, low: 4 };
    filtered.sort((a, b) => {
      if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
      if (prioScore[a.priority] !== prioScore[b.priority]) return prioScore[a.priority] - prioScore[b.priority];
      if (a.due_date && b.due_date) {
         if (a.due_date !== b.due_date) return a.due_date.localeCompare(b.due_date);
      } else if (a.due_date) return -1;
      else if (b.due_date) return 1;
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

    const counts = { total: 0, backlog: 0, todo: 0, inProgress: 0, blocked: 0, review: 0, done: 0, cancelled: 0, archived: 0, visible: filtered.length };
    
    const { data: allTasks } = await supabase.from("project_tasks").select("status").eq("project_id", projectId);
    if (allTasks) {
      allTasks.forEach(t => {
        counts.total++;
        if (t.status === "backlog") counts.backlog++;
        if (t.status === "todo") counts.todo++;
        if (t.status === "in_progress") counts.inProgress++;
        if (t.status === "blocked") counts.blocked++;
        if (t.status === "review") counts.review++;
        if (t.status === "done") counts.done++;
        if (t.status === "cancelled") counts.cancelled++;
        if (t.status === "archived") counts.archived++;
      });
    }

    return { data: { tasks: filtered, counts }, error: null };
  } catch (error) {
    console.error("[getProjectTasks]", error);
    return { data: null, error: "Unable to load tasks." };
  }
}

export async function getTaskById(taskId) {
  try {
    const idCheck = taskIdSchema.safeParse(taskId);
    if (!idCheck.success) return { data: null, error: "Invalid task ID." };

    const supabase = await createSupabaseClient();
    
    // We fetch first to know projectId, then authorize
    const { data, error } = await supabase
      .from("project_tasks")
      .select("*, project:projects(id, name, client_id, status, clients(id, name)), task_assignees(id, user_id, assigned_by, assigned_at, admin_profiles!task_assignees_user_id_fkey(name, role, is_active)), project_subtasks(*, subtask_assignees(id, user_id, admin_profiles!subtask_assignees_user_id_fkey(name, is_active))), created_by_profile:admin_profiles!project_tasks_created_by_fkey(name)")
      .eq("id", taskId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return { data: null, error: "Task not found", notFound: true };
      console.error("[getTaskById]", error);
      return { data: null, error: "Unable to load task details." };
    }

    await requireReadAccess(data.project_id);

    return { data, error: null };
  } catch (error) {
    console.error("[getTaskById]", error);
    return { data: null, error: "Unable to load task details." };
  }
}

export async function createTask(input) {
  try {
    await requireActiveAdmin();
    const parsed = createTaskSchema.safeParse(input);
    if (!parsed.success) return { data: null, error: parsed.error.issues[0].message };

    const d = parsed.data;
    const supabase = await createSupabaseClient();

    const { data: taskId, error: rpcErr } = await supabase.rpc("create_task_with_assignees_v1", {
      p_project_id: d.projectId,
      p_title: d.title,
      p_description: d.description,
      p_status: d.status,
      p_priority: d.priority,
      p_start_date: d.startDate,
      p_due_date: d.dueDate,
      p_estimated_minutes: d.estimatedMinutes,
      p_progress_percent: d.progressPercent,
      p_sort_order: d.sortOrder,
      p_assignee_ids: d.assignees || []
    });

    if (rpcErr) {
      console.error("[createTask RPC]", rpcErr);
      return { data: null, error: "Unable to create the task. Please ensure inputs are valid." };
    }

    revalidatePath(`/admin/projects/${d.projectId}`);
    revalidatePath(`/admin/projects/${d.projectId}/tasks`);
    return { data: taskId, error: null };
  } catch (err) {
    console.error("[createTask]", err);
    return { data: null, error: "Unable to create the task." };
  }
}

export async function updateTask(taskId, input) {
  try {
    await requireActiveAdmin();
    const idCheck = taskIdSchema.safeParse(taskId);
    if (!idCheck.success) return { data: null, error: "Invalid task ID." };
    
    const parsed = updateTaskSchema.safeParse(input);
    if (!parsed.success) return { data: null, error: parsed.error.issues[0].message };

    const supabase = await createSupabaseClient();
    
    const { data: task, error: fetchErr } = await supabase.from("project_tasks").select("status, project_id, projects(status)").eq("id", taskId).single();
    if (fetchErr) {
      if (fetchErr.code === "PGRST116") return { data: null, error: "Task not found." };
      console.error("[updateTask]", fetchErr);
      return { data: null, error: "Unable to find the task." };
    }
    
    if (["done", "cancelled", "archived"].includes(task.status)) return { data: null, error: "Task is not in an editable state." };
    if (["completed", "cancelled", "archived"].includes(task.projects.status)) return { data: null, error: "Project is no longer editable." };

    const updateData = { ...parsed.data };
    delete updateData.assignees;

    const { error: updErr } = await supabase.from("project_tasks").update(updateData).eq("id", taskId);
    if (updErr) {
      console.error("[updateTask]", updErr);
      return { data: null, error: "Unable to update the task." };
    }

    revalidatePath(`/admin/projects/${task.project_id}`);
    revalidatePath(`/admin/projects/${task.project_id}/tasks`);
    revalidatePath(`/admin/projects/${task.project_id}/tasks/${taskId}`);
    return { data: true, error: null };
  } catch (err) {
    console.error("[updateTask]", err);
    return { data: null, error: "Unable to update the task." };
  }
}

export async function transitionTaskStatus(taskId, targetStatus) {
  try {
    await requireActiveAdmin();
    if (!taskIdSchema.safeParse(taskId).success) return { data: null, error: "Invalid task ID." };
    if (!taskStatusTransitionSchema.safeParse(targetStatus).success) return { data: null, error: "Invalid transition status." };

    const supabase = await createSupabaseClient();
    const { data: task, error: fetchErr } = await supabase.from("project_tasks").select("status, project_id, projects(status)").eq("id", taskId).single();
    if (fetchErr) {
      if (fetchErr.code === "PGRST116") return { data: null, error: "Task not found." };
      console.error("[transitionTaskStatus]", fetchErr);
      return { data: null, error: "Unable to find the task." };
    }

    if (["completed", "cancelled", "archived"].includes(task.projects.status)) return { data: null, error: "Project is no longer editable." };

    if (["archived", "cancelled", "done"].includes(task.status)) {
      return { data: null, error: "Cannot transition task from its current terminal state." };
    }

    const allowed = {
      backlog: ["todo", "in_progress"],
      todo: ["backlog", "in_progress", "blocked"],
      in_progress: ["blocked", "review"],
      blocked: ["todo", "in_progress", "review"],
      review: ["in_progress", "done"]
    };

    if (!allowed[task.status] || !allowed[task.status].includes(targetStatus)) {
      return { data: null, error: "Invalid status transition." };
    }

    if (targetStatus === "done") {
      return completeTask(taskId);
    }

    const { error: updErr } = await supabase.from("project_tasks").update({ status: targetStatus }).eq("id", taskId);
    if (updErr) {
      console.error("[transitionTaskStatus]", updErr);
      return { data: null, error: "Unable to change task status." };
    }

    revalidatePath(`/admin/projects/${task.project_id}`);
    revalidatePath(`/admin/projects/${task.project_id}/tasks`);
    revalidatePath(`/admin/projects/${task.project_id}/tasks/${taskId}`);
    return { data: true, error: null };
  } catch (err) {
    console.error("[transitionTaskStatus]", err);
    return { data: null, error: "Unable to change task status." };
  }
}

export async function completeTask(taskId, force = false) {
  try {
    await requireActiveAdmin();
    if (!taskIdSchema.safeParse(taskId).success) return { data: null, error: "Invalid task ID." };
    const supabase = await createSupabaseClient();
    
    const { data: t, error: fetchErr } = await supabase.from("project_tasks").select("status, project_id, projects(status)").eq("id", taskId).single();
    if (fetchErr) {
      if (fetchErr.code === "PGRST116") return { data: null, error: "Task not found." };
      console.error("[completeTask]", fetchErr);
      return { data: null, error: "Unable to complete the task." };
    }

    if (["completed", "cancelled", "archived"].includes(t.projects.status)) return { data: null, error: "Project is no longer editable." };
    if (["done", "cancelled", "archived"].includes(t.status)) return { data: null, error: "Task is already in a terminal state." };

    const { data: subtasks, error: subErr } = await supabase.from("project_subtasks").select("id, status").eq("task_id", taskId);
    if (subErr) {
      console.error("[completeTask] subtasks query error:", subErr);
      return { data: null, error: "Unable to verify the task's subtasks." };
    }
    const incomplete = subtasks?.filter(s => s.status !== "done" && s.status !== "cancelled" && s.status !== "archived") || [];
    
    if (incomplete.length > 0 && !force) {
      return { data: null, error: "Task has incomplete subtasks.", requiresConfirmation: true, incompleteCount: incomplete.length };
    }

    const { error } = await supabase.from("project_tasks").update({
      status: "done",
      progress_percent: 100
    }).eq("id", taskId);
    
    if (error) {
      console.error("[completeTask]", error);
      return { data: null, error: "Unable to complete the task." };
    }
    
    revalidatePath(`/admin/projects/${t.project_id}`);
    revalidatePath(`/admin/projects/${t.project_id}/tasks`);
    revalidatePath(`/admin/projects/${t.project_id}/tasks/${taskId}`);
    return { data: true, error: null };
  } catch (err) {
    console.error("[completeTask]", err);
    return { data: null, error: "Unable to complete the task." };
  }
}

export async function cancelTask(taskId) {
  try {
    await requireActiveAdmin();
    if (!taskIdSchema.safeParse(taskId).success) return { data: null, error: "Invalid task ID." };
    const supabase = await createSupabaseClient();
    const { data: t, error: fetchErr } = await supabase.from("project_tasks").select("status, project_id, projects(status)").eq("id", taskId).single();
    if (fetchErr) {
      if (fetchErr.code === "PGRST116") return { data: null, error: "Task not found." };
      console.error("[cancelTask]", fetchErr);
      return { data: null, error: "Unable to cancel the task." };
    }

    if (["completed", "cancelled", "archived"].includes(t.projects.status)) return { data: null, error: "Project is no longer editable." };
    if (["done", "cancelled", "archived"].includes(t.status)) return { data: null, error: "Task is already in a terminal state." };

    const { error } = await supabase.from("project_tasks").update({ status: "cancelled" }).eq("id", taskId);
    if (error) {
      console.error("[cancelTask]", error);
      return { data: null, error: "Unable to cancel the task." };
    }
    
    revalidatePath(`/admin/projects/${t.project_id}`);
    revalidatePath(`/admin/projects/${t.project_id}/tasks`);
    revalidatePath(`/admin/projects/${t.project_id}/tasks/${taskId}`);
    return { data: true, error: null };
  } catch (err) {
    console.error("[cancelTask]", err);
    return { data: null, error: "Unable to cancel the task." };
  }
}

export async function archiveTask(taskId) {
  try {
    await requireActiveAdmin();
    if (!taskIdSchema.safeParse(taskId).success) return { data: null, error: "Invalid task ID." };
    const supabase = await createSupabaseClient();
    const { data: t, error: fetchErr } = await supabase.from("project_tasks").select("status, project_id, projects(status)").eq("id", taskId).single();
    if (fetchErr) {
      if (fetchErr.code === "PGRST116") return { data: null, error: "Task not found." };
      console.error("[archiveTask]", fetchErr);
      return { data: null, error: "Unable to archive the task." };
    }

    if (["completed", "cancelled", "archived"].includes(t.projects.status)) return { data: null, error: "Project is no longer editable." };
    if (t.status === "archived") return { data: null, error: "Task is already archived." };

    const { error } = await supabase.from("project_tasks").update({ status: "archived" }).eq("id", taskId);
    if (error) {
      console.error("[archiveTask]", error);
      return { data: null, error: "Unable to archive the task." };
    }
    
    revalidatePath(`/admin/projects/${t.project_id}`);
    revalidatePath(`/admin/projects/${t.project_id}/tasks`);
    revalidatePath(`/admin/projects/${t.project_id}/tasks/${taskId}`);
    return { data: true, error: null };
  } catch (err) {
    console.error("[archiveTask]", err);
    return { data: null, error: "Unable to archive the task." };
  }
}

export async function restoreTask(taskId) {
  try {
    await requireActiveAdmin();
    if (!taskIdSchema.safeParse(taskId).success) return { data: null, error: "Invalid task ID." };
    const supabase = await createSupabaseClient();
    const { data: t, error: fetchErr } = await supabase.from("project_tasks").select("status, project_id, projects(status)").eq("id", taskId).single();
    if (fetchErr) {
      if (fetchErr.code === "PGRST116") return { data: null, error: "Task not found." };
      console.error("[restoreTask]", fetchErr);
      return { data: null, error: "Unable to restore the task." };
    }

    if (["completed", "cancelled", "archived"].includes(t.projects.status)) return { data: null, error: "Project is no longer editable." };
    if (t.status !== "archived") return { data: null, error: "Only archived tasks can be restored." };

    const { error } = await supabase.from("project_tasks").update({ status: "backlog" }).eq("id", taskId);
    if (error) {
      console.error("[restoreTask]", error);
      return { data: null, error: "Unable to restore the task." };
    }
    
    revalidatePath(`/admin/projects/${t.project_id}`);
    revalidatePath(`/admin/projects/${t.project_id}/tasks`);
    revalidatePath(`/admin/projects/${t.project_id}/tasks/${taskId}`);
    return { data: true, error: null };
  } catch (err) {
    console.error("[restoreTask]", err);
    return { data: null, error: "Unable to restore the task." };
  }
}

export async function addTaskAssignee(taskId, userId) {
  try {
    const profile = await requireActiveAdmin();
    if (!taskIdSchema.safeParse(taskId).success) return { data: null, error: "Invalid task ID." };
    if (!uuidSchema.safeParse(userId).success) return { data: null, error: "Invalid user ID." };

    const supabase = await createSupabaseClient();
    
    const { data: t, error: fetchErr } = await supabase.from("project_tasks").select("project_id, status, projects(status)").eq("id", taskId).single();
    if (fetchErr) {
      if (fetchErr.code === "PGRST116") return { data: null, error: "Task not found." };
      console.error("[addTaskAssignee]", fetchErr);
      return { data: null, error: "Unable to add assignee." };
    }

    if (["done", "cancelled", "archived"].includes(t.status)) return { data: null, error: "Cannot modify assignees on terminal tasks." };
    if (["completed", "cancelled", "archived"].includes(t.projects.status)) return { data: null, error: "Project is no longer editable." };

    const { data: m, error: mErr } = await supabase.from("project_members").select("user_id, admin_profiles!inner(is_active)").eq("project_id", t.project_id).eq("user_id", userId).single();
    if (mErr) {
      if (mErr.code === "PGRST116") return { data: null, error: "User is not an active member of this project." };
      console.error("[addTaskAssignee] member check error:", mErr);
      return { data: null, error: "Unable to verify the selected member." };
    }
    if (!m || !m.admin_profiles.is_active) return { data: null, error: "User is not an active member of this project." };

    const { error } = await supabase.from("task_assignees").insert({
      task_id: taskId,
      user_id: userId,
      assigned_by: profile.id
    });
    
    if (error) {
      if (error.code === '23505') return { data: null, error: "User is already assigned." };
      console.error("[addTaskAssignee]", error);
      return { data: null, error: "Unable to update the assignment." };
    }
    
    revalidatePath(`/admin/projects/${t.project_id}/tasks`);
    revalidatePath(`/admin/projects/${t.project_id}/tasks/${taskId}`);
    return { data: true, error: null };
  } catch (err) {
    console.error("[addTaskAssignee]", err);
    return { data: null, error: "Unable to update the assignment." };
  }
}

export async function removeTaskAssignee(taskId, assignmentId) {
  try {
    await requireActiveAdmin();
    if (!taskIdSchema.safeParse(taskId).success) return { data: null, error: "Invalid task ID." };
    if (!uuidSchema.safeParse(assignmentId).success) return { data: null, error: "Invalid assignment ID." };

    const supabase = await createSupabaseClient();
    const { data: a, error: aErr } = await supabase.from("task_assignees").select("task_id").eq("id", assignmentId).single();
    if (aErr) {
      if (aErr.code === "PGRST116") return { data: null, error: "Assignment not found." };
      console.error("[removeTaskAssignee]", aErr);
      return { data: null, error: "Unable to update the assignment." };
    }
    if (a.task_id !== taskId) return { data: null, error: "Assignment does not belong to this task." };

    const { data: t, error: tErr } = await supabase.from("project_tasks").select("project_id, status, projects(status)").eq("id", taskId).single();
    if (tErr) {
      if (tErr.code === "PGRST116") return { data: null, error: "Task not found." };
      console.error("[removeTaskAssignee]", tErr);
      return { data: null, error: "Unable to update the assignment." };
    }
    if (["done", "cancelled", "archived"].includes(t.status)) return { data: null, error: "Cannot modify assignees on terminal tasks." };
    if (["completed", "cancelled", "archived"].includes(t.projects.status)) return { data: null, error: "Project is no longer editable." };

    const { error } = await supabase.from("task_assignees").delete().eq("id", assignmentId);
    if (error) {
      console.error("[removeTaskAssignee]", error);
      return { data: null, error: "Unable to update the assignment." };
    }
    
    revalidatePath(`/admin/projects/${t.project_id}/tasks`);
    revalidatePath(`/admin/projects/${t.project_id}/tasks/${taskId}`);
    return { data: true, error: null };
  } catch (err) {
    console.error("[removeTaskAssignee]", err);
    return { data: null, error: "Unable to update the assignment." };
  }
}

export async function reorderTasks(projectId, orderedTaskIds) {
  try {
    await requireActiveAdmin();
    if (!uuidSchema.safeParse(projectId).success) return { data: null, error: "Invalid project ID." };
    const parsed = taskReorderSchema.safeParse({ orderedTaskIds });
    if (!parsed.success) return { data: null, error: parsed.error.issues[0].message };

    const supabase = await createSupabaseClient();
    const { error } = await supabase.rpc("reorder_project_tasks_v1", {
      p_project_id: projectId,
      p_ordered_task_ids: orderedTaskIds
    });
    if (error) {
      console.error("[reorderTasks]", error);
      return { data: null, error: "Unable to reorder tasks." };
    }
    revalidatePath(`/admin/projects/${projectId}/tasks`);
    return { data: true, error: null };
  } catch (err) {
    console.error("[reorderTasks]", err);
    return { data: null, error: "Unable to reorder tasks." };
  }
}

// ---------------------------------------------------------
// SUBTASKS
// ---------------------------------------------------------

export async function createSubtask(input) {
  try {
    await requireActiveAdmin();
    const parsed = createSubtaskSchema.safeParse(input);
    if (!parsed.success) return { data: null, error: parsed.error.issues[0].message };

    const d = parsed.data;
    const supabase = await createSupabaseClient();

    const { data: subtaskId, error: rpcErr } = await supabase.rpc("create_subtask_with_assignees_v1", {
      p_task_id: d.taskId,
      p_title: d.title,
      p_description: d.description ?? null,
      p_status: d.status,
      p_priority: d.priority,
      p_due_date: d.dueDate ?? null,
      p_estimated_minutes: d.estimatedMinutes ?? null,
      p_progress_percent: d.progressPercent ?? 0,
      p_sort_order: d.sortOrder ?? 0,
      p_assignee_ids: d.assignees || []
    });

    if (rpcErr) {
      console.error("[createSubtask RPC]", rpcErr);
      return { data: null, error: "Unable to create the subtask." };
    }

    const { data: t } = await supabase.from("project_tasks").select("project_id").eq("id", d.taskId).single();
    if (t) {
      revalidatePath(`/admin/projects/${t.project_id}/tasks`);
      revalidatePath(`/admin/projects/${t.project_id}/tasks/${d.taskId}`);
    }
    return { data: subtaskId, error: null };
  } catch (err) { 
    console.error("[createSubtask]", err);
    return { data: null, error: "Unable to create the subtask." };
  }
}

export async function updateSubtask(subtaskId, input) {
  try {
    await requireActiveAdmin();
    const idCheck = subtaskIdSchema.safeParse(subtaskId);
    if (!idCheck.success) return { data: null, error: "Invalid subtask ID." };
    
    const parsed = updateSubtaskSchema.safeParse(input);
    if (!parsed.success) return { data: null, error: parsed.error.issues[0].message };

    const supabase = await createSupabaseClient();
    const { data: st, error: fetchErr } = await supabase.from("project_subtasks").select("status, task_id, project_tasks(project_id, status, projects(status))").eq("id", subtaskId).single();
    if (fetchErr) {
      if (fetchErr.code === "PGRST116") return { data: null, error: "Subtask not found." };
      console.error("[updateSubtask]", fetchErr);
      return { data: null, error: "Unable to update the subtask." };
    }

    if (["done", "cancelled", "archived"].includes(st.status)) return { data: null, error: "Subtask is not in an editable state." };
    if (["done", "cancelled", "archived"].includes(st.project_tasks.status)) return { data: null, error: "Parent task is not editable." };
    if (["completed", "cancelled", "archived"].includes(st.project_tasks.projects?.status)) return { data: null, error: "Project is no longer editable." };

    const updateData = { ...parsed.data };
    delete updateData.assignees;

    const { error: updErr } = await supabase.from("project_subtasks").update(updateData).eq("id", subtaskId);
    if (updErr) {
      console.error("[updateSubtask]", updErr);
      return { data: null, error: "Unable to update the subtask." };
    }

    revalidatePath(`/admin/projects/${st.project_tasks.project_id}/tasks`);
    revalidatePath(`/admin/projects/${st.project_tasks.project_id}/tasks/${st.task_id}`);
    return { data: true, error: null };
  } catch (err) { 
    console.error("[updateSubtask]", err);
    return { data: null, error: "Unable to update the subtask." };
  }
}

export async function transitionSubtaskStatus(subtaskId, targetStatus) {
  try {
    await requireActiveAdmin();
    if (!subtaskIdSchema.safeParse(subtaskId).success) return { data: null, error: "Invalid subtask ID." };
    if (!subtaskStatusTransitionSchema.safeParse(targetStatus).success) return { data: null, error: "Invalid transition status." };

    const supabase = await createSupabaseClient();
    const { data: st, error: fetchErr } = await supabase.from("project_subtasks").select("status, task_id, project_tasks(project_id, status, projects(status))").eq("id", subtaskId).single();
    if (fetchErr) {
      if (fetchErr.code === "PGRST116") return { data: null, error: "Subtask not found." };
      console.error("[transitionSubtaskStatus]", fetchErr);
      return { data: null, error: "Unable to transition the subtask." };
    }

    if (["done", "cancelled", "archived"].includes(st.project_tasks.status)) return { data: null, error: "Parent task is not editable." };
    if (["completed", "cancelled", "archived"].includes(st.project_tasks.projects?.status)) return { data: null, error: "Project is no longer editable." };

    const allowed = {
      todo: ["in_progress", "blocked"],
      in_progress: ["blocked", "review"],
      blocked: ["todo", "in_progress", "review"],
      review: ["in_progress", "done"]
    };

    if (!allowed[st.status] || !allowed[st.status].includes(targetStatus)) {
      return { data: null, error: "Invalid status transition." };
    }

    if (targetStatus === "done") return completeSubtask(subtaskId);

    const { error } = await supabase.from("project_subtasks").update({ status: targetStatus }).eq("id", subtaskId);
    if (error) {
      console.error("[transitionSubtaskStatus]", error);
      return { data: null, error: "Unable to change status." };
    }

    revalidatePath(`/admin/projects/${st.project_tasks.project_id}/tasks`);
    revalidatePath(`/admin/projects/${st.project_tasks.project_id}/tasks/${st.task_id}`);
    return { data: true, error: null };
  } catch (err) { 
    console.error("[transitionSubtaskStatus]", err);
    return { data: null, error: "Unable to change status." };
  }
}

export async function completeSubtask(subtaskId) {
  try {
    await requireActiveAdmin();
    if (!subtaskIdSchema.safeParse(subtaskId).success) return { data: null, error: "Invalid subtask ID." };
    const supabase = await createSupabaseClient();
    const { data: st, error: fetchErr } = await supabase.from("project_subtasks").select("status, task_id, project_tasks(project_id, status, projects(status))").eq("id", subtaskId).single();
    if (fetchErr) {
      if (fetchErr.code === "PGRST116") return { data: null, error: "Subtask not found." };
      console.error("[completeSubtask]", fetchErr);
      return { data: null, error: "Unable to complete the subtask." };
    }

    if (["done", "cancelled", "archived"].includes(st.status)) return { data: null, error: "Subtask is already in a terminal state." };
    if (["done", "cancelled", "archived"].includes(st.project_tasks.status)) return { data: null, error: "Parent task is not editable." };
    if (["completed", "cancelled", "archived"].includes(st.project_tasks.projects?.status)) return { data: null, error: "Project is no longer editable." };

    const { error } = await supabase.from("project_subtasks").update({
      status: "done", progress_percent: 100
    }).eq("id", subtaskId);
    
    if (error) {
      console.error("[completeSubtask]", error);
      return { data: null, error: "Unable to complete the subtask." };
    }
    revalidatePath(`/admin/projects/${st.project_tasks.project_id}/tasks`);
    revalidatePath(`/admin/projects/${st.project_tasks.project_id}/tasks/${st.task_id}`);
    return { data: true, error: null };
  } catch (err) { 
    console.error("[completeSubtask]", err);
    return { data: null, error: "Unable to complete the subtask." };
  }
}

export async function cancelSubtask(subtaskId) {
  try {
    await requireActiveAdmin();
    if (!subtaskIdSchema.safeParse(subtaskId).success) return { data: null, error: "Invalid subtask ID." };
    const supabase = await createSupabaseClient();
    const { data: st, error: fetchErr } = await supabase.from("project_subtasks").select("status, task_id, project_tasks(project_id, status, projects(status))").eq("id", subtaskId).single();
    if (fetchErr) {
      if (fetchErr.code === "PGRST116") return { data: null, error: "Subtask not found." };
      console.error("[cancelSubtask]", fetchErr);
      return { data: null, error: "Unable to cancel the subtask." };
    }

    if (["done", "cancelled", "archived"].includes(st.status)) return { data: null, error: "Subtask is already in a terminal state." };
    if (["done", "cancelled", "archived"].includes(st.project_tasks.status)) return { data: null, error: "Parent task is not editable." };
    if (["completed", "cancelled", "archived"].includes(st.project_tasks.projects?.status)) return { data: null, error: "Project is no longer editable." };

    const { error } = await supabase.from("project_subtasks").update({ status: "cancelled" }).eq("id", subtaskId);
    if (error) {
      console.error("[cancelSubtask]", error);
      return { data: null, error: "Unable to cancel the subtask." };
    }
    revalidatePath(`/admin/projects/${st.project_tasks.project_id}/tasks`);
    revalidatePath(`/admin/projects/${st.project_tasks.project_id}/tasks/${st.task_id}`);
    return { data: true, error: null };
  } catch (err) { 
    console.error("[cancelSubtask]", err);
    return { data: null, error: "Unable to cancel the subtask." };
  }
}

export async function archiveSubtask(subtaskId) {
  try {
    await requireActiveAdmin();
    if (!subtaskIdSchema.safeParse(subtaskId).success) return { data: null, error: "Invalid subtask ID." };
    const supabase = await createSupabaseClient();
    const { data: st, error: fetchErr } = await supabase.from("project_subtasks").select("status, task_id, project_tasks(project_id, status, projects(status))").eq("id", subtaskId).single();
    if (fetchErr) {
      if (fetchErr.code === "PGRST116") return { data: null, error: "Subtask not found." };
      console.error("[archiveSubtask]", fetchErr);
      return { data: null, error: "Unable to archive the subtask." };
    }

    if (st.status === "archived") return { data: null, error: "Subtask is already archived." };
    if (["done", "cancelled", "archived"].includes(st.project_tasks.status)) return { data: null, error: "Parent task is not editable." };
    if (["completed", "cancelled", "archived"].includes(st.project_tasks.projects?.status)) return { data: null, error: "Project is no longer editable." };
    
    const { error } = await supabase.from("project_subtasks").update({ status: "archived" }).eq("id", subtaskId);
    if (error) {
      console.error("[archiveSubtask]", error);
      return { data: null, error: "Unable to archive the subtask." };
    }
    revalidatePath(`/admin/projects/${st.project_tasks.project_id}/tasks`);
    revalidatePath(`/admin/projects/${st.project_tasks.project_id}/tasks/${st.task_id}`);
    return { data: true, error: null };
  } catch (err) { 
    console.error("[archiveSubtask]", err);
    return { data: null, error: "Unable to archive the subtask." };
  }
}

export async function restoreSubtask(subtaskId) {
  try {
    await requireActiveAdmin();
    if (!subtaskIdSchema.safeParse(subtaskId).success) return { data: null, error: "Invalid subtask ID." };
    const supabase = await createSupabaseClient();
    const { data: st, error: fetchErr } = await supabase.from("project_subtasks").select("status, task_id, project_tasks(project_id, status, projects(status))").eq("id", subtaskId).single();
    if (fetchErr) {
      if (fetchErr.code === "PGRST116") return { data: null, error: "Subtask not found." };
      console.error("[restoreSubtask]", fetchErr);
      return { data: null, error: "Unable to restore the subtask." };
    }

    if (st.status !== "archived") return { data: null, error: "Only archived subtasks can be restored." };
    if (["done", "cancelled", "archived"].includes(st.project_tasks.status)) return { data: null, error: "Parent task is not editable." };
    if (["completed", "cancelled", "archived"].includes(st.project_tasks.projects?.status)) return { data: null, error: "Project is no longer editable." };

    const { error } = await supabase.from("project_subtasks").update({ status: "todo" }).eq("id", subtaskId);
    if (error) {
      console.error("[restoreSubtask]", error);
      return { data: null, error: "Unable to restore the subtask." };
    }
    revalidatePath(`/admin/projects/${st.project_tasks.project_id}/tasks`);
    revalidatePath(`/admin/projects/${st.project_tasks.project_id}/tasks/${st.task_id}`);
    return { data: true, error: null };
  } catch (err) { 
    console.error("[restoreSubtask]", err);
    return { data: null, error: "Unable to restore the subtask." };
  }
}

export async function addSubtaskAssignee(subtaskId, userId) {
  try {
    const profile = await requireActiveAdmin();
    if (!subtaskIdSchema.safeParse(subtaskId).success) return { data: null, error: "Invalid subtask ID." };
    if (!uuidSchema.safeParse(userId).success) return { data: null, error: "Invalid user ID." };
    const supabase = await createSupabaseClient();
    const { data: st, error: fetchErr } = await supabase.from("project_subtasks").select("status, task_id, project_tasks(project_id, status, projects(status))").eq("id", subtaskId).single();
    if (fetchErr) {
      if (fetchErr.code === "PGRST116") return { data: null, error: "Subtask not found." };
      console.error("[addSubtaskAssignee]", fetchErr);
      return { data: null, error: "Unable to add assignee." };
    }

    if (["done", "cancelled", "archived"].includes(st.status)) return { data: null, error: "Cannot modify assignees on terminal subtasks." };
    if (["done", "cancelled", "archived"].includes(st.project_tasks.status)) return { data: null, error: "Parent task is not editable." };
    if (["completed", "cancelled", "archived"].includes(st.project_tasks.projects?.status)) return { data: null, error: "Project is no longer editable." };

    const { data: m, error: mErr } = await supabase.from("project_members").select("user_id, admin_profiles!inner(is_active)").eq("project_id", st.project_tasks.project_id).eq("user_id", userId).single();
    if (mErr) {
      if (mErr.code === "PGRST116") return { data: null, error: "User is not an active member of this project." };
      console.error("[addSubtaskAssignee] member check error:", mErr);
      return { data: null, error: "Unable to verify the selected member." };
    }
    if (!m || !m.admin_profiles.is_active) return { data: null, error: "User is not an active member of this project." };

    const { error } = await supabase.from("subtask_assignees").insert({ subtask_id: subtaskId, user_id: userId, assigned_by: profile.id });
    if (error) {
      if (error.code === '23505') return { data: null, error: "User is already assigned." };
      console.error("[addSubtaskAssignee]", error);
      return { data: null, error: "Unable to update the assignment." };
    }
    revalidatePath(`/admin/projects/${st.project_tasks.project_id}/tasks/${st.task_id}`);
    return { data: true, error: null };
  } catch (err) { 
    console.error("[addSubtaskAssignee]", err);
    return { data: null, error: "Unable to update the assignment." };
  }
}

export async function removeSubtaskAssignee(subtaskId, assignmentId) {
  try {
    await requireActiveAdmin();
    if (!subtaskIdSchema.safeParse(subtaskId).success) return { data: null, error: "Invalid subtask ID." };
    if (!uuidSchema.safeParse(assignmentId).success) return { data: null, error: "Invalid assignment ID." };
    
    const supabase = await createSupabaseClient();
    const { data: a, error: aErr } = await supabase.from("subtask_assignees").select("subtask_id").eq("id", assignmentId).single();
    if (aErr) {
      if (aErr.code === "PGRST116") return { data: null, error: "Assignment not found." };
      console.error("[removeSubtaskAssignee]", aErr);
      return { data: null, error: "Unable to update the assignment." };
    }
    if (a.subtask_id !== subtaskId) return { data: null, error: "Assignment does not belong to this subtask." };

    const { data: st, error: fetchErr } = await supabase.from("project_subtasks").select("status, task_id, project_tasks(project_id, status, projects(status))").eq("id", subtaskId).single();
    if (fetchErr) {
      if (fetchErr.code === "PGRST116") return { data: null, error: "Subtask not found." };
      console.error("[removeSubtaskAssignee]", fetchErr);
      return { data: null, error: "Unable to remove assignee." };
    }

    if (["done", "cancelled", "archived"].includes(st.status)) return { data: null, error: "Cannot modify assignees on terminal subtasks." };
    if (["done", "cancelled", "archived"].includes(st.project_tasks.status)) return { data: null, error: "Parent task is not editable." };
    if (["completed", "cancelled", "archived"].includes(st.project_tasks.projects?.status)) return { data: null, error: "Project is no longer editable." };

    const { error } = await supabase.from("subtask_assignees").delete().eq("id", assignmentId);
    if (error) {
      console.error("[removeSubtaskAssignee]", error);
      return { data: null, error: "Unable to update the assignment." };
    }
    revalidatePath(`/admin/projects/${st.project_tasks.project_id}/tasks/${st.task_id}`);
    return { data: true, error: null };
  } catch (err) { 
    console.error("[removeSubtaskAssignee]", err);
    return { data: null, error: "Unable to update the assignment." };
  }
}

export async function reorderSubtasks(taskId, orderedSubtaskIds) {
  try {
    await requireActiveAdmin();
    if (!taskIdSchema.safeParse(taskId).success) return { data: null, error: "Invalid task ID." };
    const parsed = subtaskReorderSchema.safeParse({ orderedSubtaskIds });
    if (!parsed.success) return { data: null, error: parsed.error.issues[0].message };

    const supabase = await createSupabaseClient();
    const { error } = await supabase.rpc("reorder_project_subtasks_v1", {
      p_task_id: taskId,
      p_ordered_subtask_ids: orderedSubtaskIds
    });
    if (error) {
      console.error("[reorderSubtasks]", error);
      return { data: null, error: "Unable to reorder subtasks." };
    }
    
    const { data: t } = await supabase.from("project_tasks").select("project_id").eq("id", taskId).single();
    if (t) revalidatePath(`/admin/projects/${t.project_id}/tasks/${taskId}`);
    return { data: true, error: null };
  } catch (err) { 
    console.error("[reorderSubtasks]", err);
    return { data: null, error: "Unable to reorder subtasks." };
  }
}
