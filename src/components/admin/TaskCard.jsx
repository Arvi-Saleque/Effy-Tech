"use client";
import React from "react";
import Link from "next/link";
import TaskStatusBadge from "./TaskStatusBadge";
import TaskPriorityBadge from "./TaskPriorityBadge";
import DueStatusBadge from "./DueStatusBadge";
import ProgressBar from "./ProgressBar";

export default function TaskCard({ task, projectId }) {
  const isDone = task.status === "done";
  
  // Assignees preview
  const assignees = task.task_assignees || [];
  const assigneeInitials = assignees.slice(0, 3).map(a => {
    const name = a.admin_profiles?.name || "Unknown";
    return name.substring(0, 2).toUpperCase();
  });
  const extraAssignees = assignees.length > 3 ? assignees.length - 3 : 0;

  // Subtasks summary
  const subtasks = task.project_subtasks || [];
  const completedSubtasks = subtasks.filter(s => s.status === "done").length;
  
  return (
    <Link href={`/admin/projects/${projectId}/tasks/${task.id}`} className="block bg-slate-800/80 border border-slate-700/50 rounded-lg p-4 hover:border-primary-light/50 transition-colors">
      <div className="flex justify-between items-start mb-2 gap-2">
        <h4 className="font-medium text-slate-200 truncate">{task.title}</h4>
        <TaskPriorityBadge priority={task.priority} />
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <TaskStatusBadge status={task.status} />
        {task.due_date && <DueStatusBadge dueDate={task.due_date} isDone={isDone} />}
      </div>

      <ProgressBar progress={task.progress_percent} className="mb-2" />

      <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          {subtasks.length > 0 && (
            <span title="Subtasks">
              <svg className="w-3.5 h-3.5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
              {completedSubtasks}/{subtasks.length}
            </span>
          )}
          {task.estimated_minutes > 0 && (
            <span title="Estimated Minutes">
              <svg className="w-3.5 h-3.5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {Math.round(task.estimated_minutes / 60)}h {task.estimated_minutes % 60}m
            </span>
          )}
        </div>
        
        {assignees.length > 0 && (
          <div className="flex -space-x-1">
            {assigneeInitials.map((initials, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-slate-600 border border-slate-800 flex items-center justify-center text-[10px] text-white font-medium">
                {initials}
              </div>
            ))}
            {extraAssignees > 0 && (
              <div className="w-6 h-6 rounded-full bg-slate-700 border border-slate-800 flex items-center justify-center text-[10px] text-white font-medium">
                +{extraAssignees}
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
