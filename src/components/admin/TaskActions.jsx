"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { completeTask, cancelTask, archiveTask, restoreTask } from "@/lib/admin/task-actions";

export default function TaskActions({ task, projectId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmContext, setConfirmContext] = useState({});

  const handleAction = async (actionFn, force = false) => {
    setLoading(true);
    setError(null);
    setShowConfirm(false);
    
    const res = await actionFn(task.id, force);
    if (res.requiresConfirmation && !force) {
      setConfirmContext({
        message: res.error,
        action: actionFn
      });
      setShowConfirm(true);
      setLoading(false);
      return;
    }

    if (res.error) {
      setError(res.error);
    }
    setLoading(false);
  };

  const isEditable = !["done", "cancelled", "archived"].includes(task.status);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h3 className="text-sm font-medium text-slate-300 mb-4">Task Actions</h3>
      
      {error && <div className="mb-4 text-xs text-red-400 bg-red-900/20 border border-red-900/50 p-2 rounded">{error}</div>}

      <div className="flex flex-col gap-3">
        {isEditable && (
          <Link href={`/admin/projects/${projectId}/tasks/${task.id}/edit`} className="w-full py-2 text-center text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700">
            Edit Task
          </Link>
        )}

        {task.status !== "done" && task.status !== "archived" && task.status !== "cancelled" && (
          <button onClick={() => handleAction(completeTask)} disabled={loading} className="w-full py-2 text-sm font-medium bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-700/50 rounded-lg transition-colors">
            Mark as Done
          </button>
        )}

        {task.status !== "cancelled" && task.status !== "archived" && task.status !== "done" && (
          <button onClick={() => {
            setConfirmContext({ message: "Are you sure you want to cancel this task? Progress will be frozen.", action: cancelTask });
            setShowConfirm(true);
          }} disabled={loading} className="w-full py-2 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700 rounded-lg transition-colors">
            Cancel Task
          </button>
        )}

        {task.status !== "archived" && (
          <button onClick={() => {
            setConfirmContext({ message: "Archive this task? It will be hidden from normal views.", action: archiveTask });
            setShowConfirm(true);
          }} disabled={loading} className="w-full py-2 text-sm font-medium bg-stone-800/40 hover:bg-stone-800/60 text-stone-400 border border-stone-800/50 rounded-lg transition-colors mt-2">
            Archive Task
          </button>
        )}

        {task.status === "archived" && (
          <button onClick={() => handleAction(restoreTask)} disabled={loading} className="w-full py-2 text-sm font-medium bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-700/50 rounded-lg transition-colors mt-2">
            Restore Task
          </button>
        )}
      </div>

      {showConfirm && (
        <div className="mt-4 p-4 bg-slate-800/80 border border-slate-700 rounded-lg">
          <p className="text-sm text-slate-300 mb-3">{confirmContext.message}</p>
          <div className="flex gap-2">
            <button onClick={() => setShowConfirm(false)} className="flex-1 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors">Abort</button>
            <button onClick={() => handleAction(confirmContext.action, true)} className="flex-1 py-1.5 text-xs bg-red-600/80 hover:bg-red-600 text-white rounded transition-colors">Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
}
