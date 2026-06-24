"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createSubtask, transitionSubtaskStatus, completeSubtask, cancelSubtask } from "@/lib/admin/task-actions";
import TaskStatusBadge from "./TaskStatusBadge";
import TaskPriorityBadge from "./TaskPriorityBadge";
import ProgressBar from "./ProgressBar";

export default function SubtasksPanel({ taskId, subtasks = [], isTaskEditable = true }) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({ title: "", estimatedMinutes: "", priority: "normal" });

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    setLoading(true);
    setError(null);
    const res = await createSubtask({
      taskId,
      title: formData.title,
      priority: formData.priority,
      estimatedMinutes: formData.estimatedMinutes ? parseInt(formData.estimatedMinutes) : null
    });
    if (res.error) {
      setError(res.error);
    } else {
      setAdding(false);
      setFormData({ title: "", estimatedMinutes: "", priority: "normal" });
    }
    setLoading(false);
  };

  const handleAction = async (actionFn, subtaskId, ...args) => {
    const res = await actionFn(subtaskId, ...args);
    if (res.error) alert(res.error); // simple error handling for row actions
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-200">Subtasks ({subtasks.length})</h3>
        {isTaskEditable && !adding && (
          <button onClick={() => setAdding(true)} className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-sm transition-colors border border-blue-700/50">
            + Add Subtask
          </button>
        )}
      </div>

      {error && <div className="mb-4 text-xs text-red-400 bg-red-900/20 p-2 rounded">{error}</div>}

      {adding && (
        <form onSubmit={handleCreate} className="mb-6 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2">
              <input required type="text" placeholder="Subtask title" value={formData.title} onChange={e => setFormData(f => ({...f, title: e.target.value}))} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200" />
            </div>
            <div>
              <select value={formData.priority} onChange={e => setFormData(f => ({...f, priority: e.target.value}))} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200">
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <input type="number" min="0" placeholder="Est. Mins" value={formData.estimatedMinutes} onChange={e => setFormData(f => ({...f, estimatedMinutes: e.target.value}))} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setAdding(false)} className="px-3 py-1.5 text-slate-400 hover:text-slate-200 text-sm">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm disabled:opacity-50">Create</button>
          </div>
        </form>
      )}

      {subtasks.length === 0 && !adding ? (
        <div className="text-center py-8 text-slate-500 text-sm border border-dashed border-slate-800 rounded-lg">No subtasks yet.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {subtasks.map(s => {
            const isDone = s.status === "done";
            return (
              <div key={s.id} className={`p-4 rounded-lg border flex flex-col md:flex-row gap-4 items-start md:items-center justify-between ${isDone ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-800/80 border-slate-700'}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`text-sm font-medium ${isDone ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{s.title}</h4>
                    <TaskPriorityBadge priority={s.priority} />
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <TaskStatusBadge status={s.status} />
                    {s.estimated_minutes > 0 && <span className="text-xs text-slate-500">{s.estimated_minutes}m est.</span>}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {!isDone && s.status !== "archived" && s.status !== "cancelled" && isTaskEditable && (
                    <>
                      <select 
                        value={s.status}
                        onChange={(e) => handleAction(transitionSubtaskStatus, s.id, e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300"
                      >
                        <option value={s.status} disabled>{s.status.replace("_", " ")}</option>
                        {s.status === "todo" && <option value="in_progress">In Progress</option>}
                        {s.status === "todo" && <option value="blocked">Blocked</option>}
                        
                        {s.status === "in_progress" && <option value="review">Review</option>}
                        {s.status === "in_progress" && <option value="blocked">Blocked</option>}
                        
                        {s.status === "blocked" && <option value="todo">To Do</option>}
                        {s.status === "blocked" && <option value="in_progress">In Progress</option>}
                        {s.status === "blocked" && <option value="review">Review</option>}

                        {s.status === "review" && <option value="in_progress">In Progress</option>}
                      </select>
                      {["review", "in_progress"].includes(s.status) && (
                        <button onClick={() => handleAction(completeSubtask, s.id)} className="px-3 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-xs rounded border border-emerald-700/50">Done</button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
