import React from "react";
import Link from "next/link";
import { getProjectById } from "@/lib/admin/project-actions";
import { getProjectTasks } from "@/lib/admin/task-actions";
import TaskFilters from "@/components/admin/TaskFilters";
import TaskBoard from "@/components/admin/TaskBoard";
import TaskCard from "@/components/admin/TaskCard";
import TaskStatusBadge from "@/components/admin/TaskStatusBadge";
import TaskPriorityBadge from "@/components/admin/TaskPriorityBadge";
import ProgressBar from "@/components/admin/ProgressBar";
import DueStatusBadge from "@/components/admin/DueStatusBadge";

export default async function TasksPage({ params, searchParams }) {
  const { projectId } = await params;
  const sParams = await searchParams;

  const { data: project } = await getProjectById(projectId);
  if (!project) {
    return <div className="p-8 text-red-400">Project not found</div>;
  }

  const { data } = await getProjectTasks(projectId, {
    search: sParams?.search,
    status: sParams?.status || "current",
    priority: sParams?.priority || "all",
    assigneeId: sParams?.assigneeId || "all",
    dueState: sParams?.dueState || "all"
  });

  const tasks = data?.tasks || [];
  const viewMode = sParams?.view || "board";

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link href={`/admin/projects/${projectId}`} className="text-sm text-primary-light hover:underline mb-2 inline-block">
          &larr; Back to {project.name}
        </Link>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-slate-100">Tasks</h1>
            <p className="text-slate-400 text-sm mt-1">Manage tasks for {project.name}</p>
          </div>
          {project.status !== "archived" && project.status !== "cancelled" && (
            <Link href={`/admin/projects/${projectId}/tasks/new`} className="px-4 py-2 bg-primary-dark hover:bg-primary text-white rounded-md text-sm transition-colors shadow shadow-primary-dark/20">
              + New Task
            </Link>
          )}
        </div>
      </div>

      <TaskFilters />

      {tasks.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/50 rounded-xl border border-slate-800">
          <p className="text-slate-400 mb-4">No tasks match the current filters.</p>
          {project.status !== "archived" && project.status !== "cancelled" && (
            <Link href={`/admin/projects/${projectId}/tasks/new`} className="text-primary-light hover:underline text-sm">
              Create the first task
            </Link>
          )}
        </div>
      ) : (
        <>
          {viewMode === "board" ? (
            <TaskBoard tasks={tasks} projectId={projectId} />
          ) : (
            <div className="bg-slate-900/80 rounded-xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-800/50 border-b border-slate-700/50 text-sm text-slate-300">
                      <th className="p-4 font-medium">Task</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Priority</th>
                      <th className="p-4 font-medium">Progress</th>
                      <th className="p-4 font-medium">Due Date</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {tasks.map(task => (
                      <tr key={task.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-4">
                          <Link href={`/admin/projects/${projectId}/tasks/${task.id}`} className="font-medium text-primary-light hover:underline block mb-1">
                            {task.title}
                          </Link>
                          <div className="text-xs text-slate-500">
                            {task.project_subtasks?.filter(s=>s.status==='done').length || 0}/{task.project_subtasks?.length || 0} subtasks
                          </div>
                        </td>
                        <td className="p-4"><TaskStatusBadge status={task.status} /></td>
                        <td className="p-4"><TaskPriorityBadge priority={task.priority} /></td>
                        <td className="p-4 w-32"><ProgressBar progress={task.progress_percent} /></td>
                        <td className="p-4">
                          {task.due_date ? <DueStatusBadge dueDate={task.due_date} isDone={task.status === "done"} /> : <span className="text-slate-600 text-sm">-</span>}
                        </td>
                        <td className="p-4 text-right">
                          <Link href={`/admin/projects/${projectId}/tasks/${task.id}`} className="text-sm text-slate-400 hover:text-primary-light">View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
