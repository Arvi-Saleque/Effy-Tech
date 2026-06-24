"use client";
import React from "react";
import TaskCard from "./TaskCard";

const BOARD_COLUMNS = [
  { id: "backlog", label: "Backlog", border: "border-gray-700" },
  { id: "todo", label: "To Do", border: "border-slate-700" },
  { id: "in_progress", label: "In Progress", border: "border-blue-800" },
  { id: "blocked", label: "Blocked", border: "border-red-900" },
  { id: "review", label: "Review", border: "border-purple-800" },
  { id: "done", label: "Done", border: "border-emerald-800" },
  { id: "cancelled", label: "Cancelled", border: "border-red-900/50" },
  { id: "archived", label: "Archived", border: "border-slate-800" }
];

export default function TaskBoard({ tasks, projectId }) {
  const tasksByStatus = tasks.reduce((acc, task) => {
    if (!acc[task.status]) acc[task.status] = [];
    acc[task.status].push(task);
    return acc;
  }, {});

  return (
    <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x">
      {BOARD_COLUMNS.map(col => {
        const colTasks = tasksByStatus[col.id] || [];
        return (
          <div key={col.id} className="min-w-[300px] w-[300px] flex-shrink-0 flex flex-col snap-start">
            <div className={`flex items-center justify-between mb-4 border-b-2 pb-2 ${col.border}`}>
              <h3 className="font-semibold text-slate-200">{col.label}</h3>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                {colTasks.length}
              </span>
            </div>
            
            <div className="flex flex-col gap-3 flex-grow bg-slate-900/30 rounded-lg p-2 min-h-[150px]">
              {colTasks.map(task => (
                <TaskCard key={task.id} task={task} projectId={projectId} />
              ))}
              {colTasks.length === 0 && (
                <div className="text-sm text-slate-500 text-center py-6 border border-dashed border-slate-800 rounded-lg">
                  No tasks
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
