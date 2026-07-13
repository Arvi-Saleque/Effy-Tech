"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createTask, updateTask } from "@/lib/admin/task-actions";

export default function TaskForm({ projectId, projectMembers, initialData = null, isTerminal = false }) {
  const router = useRouter();
  const isEdit = !!initialData;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    status: initialData?.status || (isEdit ? "backlog" : "todo"),
    priority: initialData?.priority || "normal",
    progressPercent: initialData?.progress_percent || 0,
    estimatedMinutes: initialData?.estimated_minutes || "",
    startDate: initialData?.start_date || "",
    dueDate: initialData?.due_date || "",
    assignees: initialData?.task_assignees?.map(a => a.user_id) || []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAssigneeToggle = (userId) => {
    setFormData(prev => {
      const isSelected = prev.assignees.includes(userId);
      if (isSelected) return { ...prev, assignees: prev.assignees.filter(id => id !== userId) };
      return { ...prev, assignees: [...prev.assignees, userId] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      projectId,
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      progressPercent: parseInt(formData.progressPercent) || 0,
      estimatedMinutes: formData.estimatedMinutes ? parseInt(formData.estimatedMinutes) : null,
      startDate: formData.startDate || null,
      dueDate: formData.dueDate || null,
      assignees: formData.assignees
    };

    let result;
    if (isEdit) {
      result = await updateTask(initialData.id, payload);
    } else {
      result = await createTask(payload);
    }

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push(`/admin/projects/${projectId}/tasks/${isEdit ? initialData.id : result.data}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      {error && <div className="mb-6 p-4 bg-red-900/40 border border-red-500/50 text-red-400 rounded-lg text-sm">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-300 mb-2">Title *</label>
          <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-primary-light" placeholder="Task title" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-primary-light" placeholder="Task details..."></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200">
            <option value="backlog">Backlog</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200">
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Start Date</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Due Date</label>
          <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Estimated Minutes</label>
          <input type="number" min="0" name="estimatedMinutes" value={formData.estimatedMinutes} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200" placeholder="e.g. 120" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Progress (%)</label>
          <input type="number" min="0" max="100" name="progressPercent" value={formData.progressPercent} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200" />
        </div>

        <div className="md:col-span-2 border-t border-slate-800 pt-6 mt-2">
          <label className="block text-sm font-medium text-slate-300 mb-4">Assignees (Active Project Members)</label>
          {projectMembers.length === 0 ? (
            <p className="text-sm text-slate-500">No active members in this project.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {projectMembers.map(member => (
                <label key={member.user_id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${formData.assignees.includes(member.user_id) ? "bg-primary-dark/20 border-primary-light/50" : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600"}`}>
                  <input type="checkbox" checked={formData.assignees.includes(member.user_id)} onChange={() => handleAssigneeToggle(member.user_id)} className="w-4 h-4 rounded border-slate-600 text-primary-light focus:ring-primary-light focus:ring-offset-slate-900 bg-slate-700" />
                  <div>
                    <div className="text-sm font-medium text-slate-200">{member.admin_profiles.name}</div>
                    <div className="text-xs text-slate-400">{member.admin_profiles.email}</div>
                    <div className="text-xs text-slate-500 capitalize mt-0.5">{member.project_role}</div>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button type="button" onClick={() => router.back()} className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors">Cancel</button>
        <button type="submit" disabled={loading || isTerminal} className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${isTerminal ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-primary-dark hover:bg-primary text-white shadow shadow-primary-dark/20'}`}>
          {loading ? "Saving..." : isEdit ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
}
