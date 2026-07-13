import React from "react";
import Link from "next/link";
import { getTaskById } from "@/lib/admin/task-actions";
import TaskStatusBadge from "@/components/admin/TaskStatusBadge";
import TaskPriorityBadge from "@/components/admin/TaskPriorityBadge";
import ProgressBar from "@/components/admin/ProgressBar";
import DueStatusBadge from "@/components/admin/DueStatusBadge";
import TaskActions from "@/components/admin/TaskActions";
import TaskAssignees from "@/components/admin/TaskAssignees";
import SubtasksPanel from "@/components/admin/SubtasksPanel";
import TaskWorkReportPanel from "@/components/admin/TaskWorkReportPanel";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/admin/auth";

export default async function TaskDetailsPage({ params }) {
  const { projectId, taskId } = await params;
  
  const profile = await getCurrentProfile();
  
  const { data: task, error, notFound } = await getTaskById(taskId);

  if (notFound) return <div className="p-8 text-slate-400">Task not found.</div>;
  if (error) return <div className="p-8 text-red-400">Error loading task: {error}</div>;

  // Ensure task matches project
  if (task.project_id !== projectId) {
    return <div className="p-8 text-red-400">Task does not belong to this project.</div>;
  }

  // Get project active members for assignees component
  const supabase = await createClient();
  const { data: members } = await supabase.from("project_members")
    .select("user_id, project_role, admin_profiles!project_members_user_id_fkey!inner(name, is_active, role)")
    .eq("project_id", projectId);

  const activeMembers = members?.filter(m => m.admin_profiles.is_active) || [];
  const isEditable = !["done", "archived", "cancelled"].includes(task.status);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link href={`/admin/projects/${projectId}/tasks`} className="text-sm text-primary-light hover:underline mb-2 inline-block">
          &larr; Back to Tasks
        </Link>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-semibold text-slate-100">{task.title}</h1>
              <TaskStatusBadge status={task.status} />
              <TaskPriorityBadge priority={task.priority} />
            </div>
            <p className="text-slate-400 text-sm">Created by {task.created_by_profile?.name || "Unknown"} on {new Date(task.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-300 mb-3">Description</h3>
            {task.description ? (
              <div className="text-slate-200 whitespace-pre-wrap text-sm">{task.description}</div>
            ) : (
              <div className="text-slate-500 italic text-sm">No description provided.</div>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-300 mb-4">Timeline & Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {(() => {
                const firstTimer = task.work_blocks?.length > 0 ? [...task.work_blocks].sort((a, b) => new Date(a.started_at) - new Date(b.started_at))[0] : null;
                const activeReport = task.task_work_reports?.length > 0 ? task.task_work_reports[0] : null;
                const firstAssign = task.task_assignees?.length > 0 ? [...task.task_assignees].sort((a, b) => new Date(a.assigned_at) - new Date(b.assigned_at))[0] : null;

                const actualStartedAt = firstTimer?.started_at || activeReport?.actual_start_date || task.start_date;
                const assignedAt = firstAssign?.assigned_at;
                const reportSubmittedAt = activeReport?.submitted_date;

                return (
                  <>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Started</p>
                      <p className="text-sm text-slate-200">{actualStartedAt ? new Date(actualStartedAt).toLocaleDateString() : "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Assigned</p>
                      <p className="text-sm text-slate-200">{assignedAt ? new Date(assignedAt).toLocaleDateString() : "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Due Date</p>
                      <div className="mt-0.5">
                        {task.due_date ? <DueStatusBadge dueDate={task.due_date} isDone={task.status === "done"} /> : <span className="text-slate-600">-</span>}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Report Submitted</p>
                      <p className="text-sm text-slate-200">{reportSubmittedAt ? new Date(reportSubmittedAt).toLocaleDateString() : "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Est. Minutes</p>
                      <p className="text-sm text-slate-200">{task.estimated_minutes ? `${task.estimated_minutes}m` : "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Progress</p>
                      <div className="flex items-center gap-2">
                        <ProgressBar progress={task.progress_percent} className="flex-1" />
                        <span className="text-xs text-slate-400">{task.progress_percent}%</span>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          <SubtasksPanel taskId={taskId} subtasks={task.project_subtasks} isTaskEditable={isEditable} />
          
          <TaskWorkReportPanel task={task} profile={profile} projectId={projectId} />
        </div>

        <div className="flex flex-col gap-6">
          <TaskActions task={task} projectId={projectId} />
          <TaskAssignees taskId={taskId} currentAssignees={task.task_assignees} projectMembers={activeMembers} isEditable={isEditable} />
        </div>
      </div>
    </div>
  );
}
