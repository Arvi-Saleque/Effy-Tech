"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addTaskAssignee, removeTaskAssignee } from "@/lib/admin/task-actions";

export default function TaskAssignees({ taskId, currentAssignees = [], projectMembers = [], isEditable = true }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const handleAdd = async () => {
    if (!selectedUser) return;
    setLoading(true);
    setError(null);
    const res = await addTaskAssignee(taskId, selectedUser);
    if (res.error) setError(res.error);
    else {
      setAdding(false);
      setSelectedUser("");
    }
    setLoading(false);
  };

  const handleRemove = async (assignmentId) => {
    setLoading(true);
    setError(null);
    const res = await removeTaskAssignee(taskId, assignmentId);
    if (res.error) setError(res.error);
    setLoading(false);
  };

  const availableMembers = projectMembers.filter(m => !currentAssignees.some(a => a.user_id === m.user_id));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-slate-300">Assignees</h3>
        {isEditable && !adding && availableMembers.length > 0 && (
          <button onClick={() => setAdding(true)} className="text-xs text-blue-400 hover:text-blue-300">+ Add</button>
        )}
      </div>

      {error && <div className="mb-3 text-xs text-red-400">{error}</div>}

      <div className="flex flex-col gap-2">
        {currentAssignees.length === 0 && !adding && (
          <p className="text-sm text-slate-500">No assignees.</p>
        )}

        {currentAssignees.map(a => (
          <div key={a.id} className="flex justify-between items-center bg-slate-800/50 rounded px-3 py-2 border border-slate-700/50">
            <div>
              <div className="text-sm text-slate-200">{a.admin_profiles?.name}</div>
              <div className="text-xs text-slate-500 capitalize">{a.admin_profiles?.role}</div>
            </div>
            {isEditable && (
              <button disabled={loading} onClick={() => handleRemove(a.id)} className="text-slate-500 hover:text-red-400 transition-colors" title="Remove">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            )}
          </div>
        ))}

        {adding && (
          <div className="mt-2 flex gap-2">
            <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)} className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 text-sm text-slate-200">
              <option value="">Select member...</option>
              {availableMembers.map(m => (
                <option key={m.user_id} value={m.user_id}>{m.admin_profiles?.name}</option>
              ))}
            </select>
            <button onClick={handleAdd} disabled={!selectedUser || loading} className="px-3 py-1 bg-blue-600 text-white rounded text-sm disabled:opacity-50">Add</button>
            <button onClick={() => setAdding(false)} className="px-2 py-1 text-slate-400 hover:text-slate-200 text-sm">Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}
