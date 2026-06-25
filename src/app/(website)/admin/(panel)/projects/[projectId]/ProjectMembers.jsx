"use client";

import React, { useState, useTransition } from "react";
import { addProjectMember, removeProjectMember, updateProjectMemberRole } from "@/lib/admin/project-actions";
import { useRouter } from "next/navigation";
import { Loader2, UserPlus, X, AlertCircle } from "lucide-react";

export default function ProjectMembers({ projectId, members = [], activeAdmins = [], isArchived = false }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newUserId, setNewUserId] = useState("");
  const [newRole, setNewRole] = useState("member");

  const executeAction = async (actionFn, args, onSuccess = () => {}) => {
    setError(null);
    startTransition(async () => {
      const result = await actionFn(...args);
      if (result?.error) {
        setError(result.error);
      } else {
        onSuccess();
        router.refresh();
      }
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newUserId) return;
    executeAction(addProjectMember, [projectId, { user_id: newUserId, project_role: newRole }], () => {
      setIsAdding(false);
      setNewUserId("");
      setNewRole("member");
    });
  };

  const handleRoleChange = (membershipId, role) => {
    executeAction(updateProjectMemberRole, [projectId, membershipId, role]);
  };

  const handleRemove = (membershipId) => {
    executeAction(removeProjectMember, [projectId, membershipId]);
  };

  // Only show admins that aren't already members
  const availableAdmins = activeAdmins.filter(admin => !members.some(m => m.user.id === admin.id));

  return (
    <div className="bg-[#1C1C1E] border border-white/10 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Project Team</h2>
        {!isArchived && !isAdding && availableAdmins.length > 0 && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
          >
            <UserPlus className="w-4 h-4" /> Add Member
          </button>
        )}
      </div>

      {error && (
        <div className="px-6 py-3 bg-red-500/10 border-b border-red-500/20 flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
        </div>
      )}

      {isAdding && (
        <form onSubmit={handleAddSubmit} className="p-6 border-b border-white/10 bg-[#2C2C2E]/30 flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full space-y-1">
            <label className="text-xs font-medium text-neutral-400">Select Admin</label>
            <select
              value={newUserId}
              onChange={(e) => setNewUserId(e.target.value)}
              className="w-full bg-[#1C1C1E] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              required
            >
              <option value="">Choose an admin...</option>
              {availableAdmins.map(a => <option key={a.id} value={a.id}>{a.name} ({a.email})</option>)}
            </select>
          </div>
          <div className="w-full md:w-48 space-y-1">
            <label className="text-xs font-medium text-neutral-400">Role</label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full bg-[#1C1C1E] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="owner">Owner</option>
              <option value="manager">Manager</option>
              <option value="reviewer">Reviewer</option>
              <option value="member">Member</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-neutral-400 hover:text-white transition-colors text-sm">Cancel</button>
            <button type="submit" disabled={isPending || !newUserId} className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 disabled:opacity-50 flex items-center">
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add"}
            </button>
          </div>
        </form>
      )}

      <div className="divide-y divide-white/10">
        {members.length === 0 ? (
          <div className="p-6 text-center text-neutral-500">No team members have been assigned to this project.</div>
        ) : (
          members.map(member => (
            <div key={member.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors group">
              <div>
                <p className="text-sm font-medium text-white">{member.user.name}</p>
                <p className="text-xs text-neutral-500">{member.user.email}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <select
                  value={member.project_role}
                  onChange={(e) => handleRoleChange(member.id, e.target.value)}
                  disabled={isArchived || isPending}
                  className="bg-transparent border border-white/10 rounded px-2 py-1 text-sm text-neutral-300 focus:outline-none focus:border-emerald-500"
                >
                  <option value="owner">Owner</option>
                  <option value="manager">Manager</option>
                  <option value="reviewer">Reviewer</option>
                  <option value="member">Member</option>
                </select>

                {!isArchived && (
                  <button
                    onClick={() => handleRemove(member.id)}
                    disabled={isPending}
                    className="text-neutral-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                    title="Remove member"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
