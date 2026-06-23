"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createProject, updateProject } from "@/lib/admin/project-actions";
import { createProjectSchema, updateProjectSchema } from "@/lib/admin/project-schema";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";

export default function ProjectForm({ initialData = null, clients = [], activeAdmins = [] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const isEditing = !!initialData;
  const isArchived = initialData?.status === "archived";
  const isCompletedOrCancelled = initialData?.status === "completed" || initialData?.status === "cancelled";

  // Pre-fill URL client if creating new
  const [searchParams] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  });
  const defaultClientId = searchParams.get("clientId") || "";

  const [formData, setFormData] = useState({
    client_id: initialData?.client_id || defaultClientId,
    name: initialData?.name || "",
    description: initialData?.description || "",
    status: initialData?.status || "planning",
    priority: initialData?.priority || "normal",
    start_date: initialData?.start_date || "",
    due_date: initialData?.due_date || "",
    progress_percent: initialData?.progress_percent || 0,
  });

  const [initialMembers, setInitialMembers] = useState(
    activeAdmins.length > 0 ? [{ user_id: "", project_role: "owner" }] : []
  );

  const activeClients = clients.filter(c => c.status !== "archived");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let finalValue = value;
    if (type === "number") {
      finalValue = parseInt(value, 10);
      if (isNaN(finalValue)) finalValue = 0;
    }
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...initialMembers];
    updated[index][field] = value;
    setInitialMembers(updated);
  };

  const addMemberRow = () => {
    setInitialMembers([...initialMembers, { user_id: "", project_role: "member" }]);
  };

  const removeMemberRow = (index) => {
    setInitialMembers(initialMembers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});

    if (isEditing && (isArchived || isCompletedOrCancelled)) {
      setError("This project cannot be edited in its current status.");
      return;
    }

    const payload = { ...formData };
    if (!isEditing) {
      payload.initialMembers = initialMembers.filter(m => m.user_id !== "");
    }

    const schema = isEditing ? updateProjectSchema : createProjectSchema;
    const parsed = schema.safeParse(payload);

    if (!parsed.success) {
      setValidationErrors(parsed.error.flatten().fieldErrors);
      return;
    }

    startTransition(async () => {
      let result;
      if (isEditing) {
        result = await updateProject(initialData.id, payload);
      } else {
        result = await createProject(payload);
      }

      if (result.error) {
        setError(result.error);
        if (result.details) setValidationErrors(result.details.fieldErrors || {});
      } else {
        router.push(`/admin/projects/${result.data.id}`);
      }
    });
  };

  if (activeClients.length === 0 && !isEditing) {
    return (
      <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-6 rounded-xl flex items-start gap-4">
        <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-lg">No Active Clients Found</h3>
          <p className="mt-1 text-amber-500/80">You must create a client before you can create a project.</p>
          <Link href="/admin/clients/new" className="mt-4 inline-flex items-center text-sm font-medium hover:underline">
            Create Client <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {isEditing && isArchived && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">This project is archived and cannot be edited. Restore it first.</p>
        </div>
      )}

      {isEditing && isCompletedOrCancelled && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">This project is {initialData.status}. Editing is restricted.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Info */}
        <div className="space-y-6 md:col-span-2">
          <div className="bg-[#1C1C1E] border border-white/10 rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white">Project Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Client *</label>
                <select
                  name="client_id"
                  value={formData.client_id}
                  onChange={handleChange}
                  disabled={isPending || (isEditing && isArchived)}
                  className="w-full bg-[#2C2C2E] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  required
                >
                  <option value="">Select a client...</option>
                  {isEditing && !activeClients.find(c => c.id === formData.client_id) && (
                    <option value={formData.client_id}>
                      {clients.find(c => c.id === formData.client_id)?.name || "Unknown Client"} (Archived)
                    </option>
                  )}
                  {activeClients.map(c => (
                    <option key={c.id} value={c.id}>{c.name} {c.company_name ? `(${c.company_name})` : ""}</option>
                  ))}
                </select>
                {validationErrors.client_id && <p className="text-red-500 text-xs">{validationErrors.client_id[0]}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Project Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isPending || (isEditing && (isArchived || isCompletedOrCancelled))}
                  className="w-full bg-[#2C2C2E] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder:text-neutral-500"
                  placeholder="e.g. Website Redesign"
                  required
                />
                {validationErrors.name && <p className="text-red-500 text-xs">{validationErrors.name[0]}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={isPending || (isEditing && (isArchived || isCompletedOrCancelled))}
                rows={4}
                className="w-full bg-[#2C2C2E] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder:text-neutral-500 resize-none"
                placeholder="Project goals, scope, and details..."
              />
              {validationErrors.description && <p className="text-red-500 text-xs">{validationErrors.description[0]}</p>}
            </div>
          </div>
        </div>

        {/* Schedule & Status */}
        <div className="space-y-6 md:col-span-2">
          <div className="bg-[#1C1C1E] border border-white/10 rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white">Schedule & Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  disabled={isPending || (isEditing && (isArchived || isCompletedOrCancelled))}
                  className="w-full bg-[#2C2C2E] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="planning">Planning</option>
                  <option value="active">Active</option>
                  <option value="on_hold">On Hold</option>
                  {isEditing && (isArchived || isCompletedOrCancelled) && (
                    <option value={initialData.status} disabled>
                      {initialData.status.charAt(0).toUpperCase() + initialData.status.slice(1)}
                    </option>
                  )}
                </select>
                {validationErrors.status && <p className="text-red-500 text-xs">{validationErrors.status[0]}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  disabled={isPending || (isEditing && (isArchived || isCompletedOrCancelled))}
                  className="w-full bg-[#2C2C2E] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
                {validationErrors.priority && <p className="text-red-500 text-xs">{validationErrors.priority[0]}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date || ""}
                  onChange={handleChange}
                  disabled={isPending || (isEditing && (isArchived || isCompletedOrCancelled))}
                  className="w-full bg-[#2C2C2E] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 [color-scheme:dark]"
                />
                {validationErrors.start_date && <p className="text-red-500 text-xs">{validationErrors.start_date[0]}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Due Date</label>
                <input
                  type="date"
                  name="due_date"
                  value={formData.due_date || ""}
                  onChange={handleChange}
                  disabled={isPending || (isEditing && (isArchived || isCompletedOrCancelled))}
                  className="w-full bg-[#2C2C2E] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 [color-scheme:dark]"
                />
                {validationErrors.due_date && <p className="text-red-500 text-xs">{validationErrors.due_date[0]}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Progress: {formData.progress_percent}%</label>
              <input
                type="range"
                name="progress_percent"
                min="0"
                max="100"
                value={formData.progress_percent}
                onChange={handleChange}
                disabled={isPending || (isEditing && (isArchived || isCompletedOrCancelled))}
                className="w-full h-2 bg-[#2C2C2E] rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <p className="text-xs text-neutral-500">Manual progress tracking. Automatic task tracking will be added later.</p>
              {validationErrors.progress_percent && <p className="text-red-500 text-xs">{validationErrors.progress_percent[0]}</p>}
            </div>
          </div>
        </div>

        {/* Initial Members (Only on Create) */}
        {!isEditing && (
          <div className="space-y-6 md:col-span-2">
            <div className="bg-[#1C1C1E] border border-white/10 rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-semibold text-white">Initial Project Team</h2>
              <p className="text-sm text-neutral-400">Add initial team members. The creator is automatically added as an owner if omitted.</p>

              <div className="space-y-4">
                {initialMembers.map((member, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full space-y-2">
                      <label className="text-sm font-medium text-neutral-300">Admin</label>
                      <select
                        value={member.user_id}
                        onChange={(e) => handleMemberChange(index, "user_id", e.target.value)}
                        className="w-full bg-[#2C2C2E] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      >
                        <option value="">Select an admin...</option>
                        {activeAdmins.map(admin => (
                          <option key={admin.id} value={admin.id}>{admin.name} ({admin.email})</option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full md:w-48 space-y-2">
                      <label className="text-sm font-medium text-neutral-300">Role</label>
                      <select
                        value={member.project_role}
                        onChange={(e) => handleMemberChange(index, "project_role", e.target.value)}
                        className="w-full bg-[#2C2C2E] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      >
                        <option value="owner">Owner</option>
                        <option value="manager">Manager</option>
                        <option value="reviewer">Reviewer</option>
                        <option value="member">Member</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMemberRow(index)}
                      className="px-4 py-2.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addMemberRow}
                  className="px-4 py-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 rounded-lg font-medium text-sm transition-colors"
                >
                  + Add Member
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={isPending || (isEditing && (isArchived || isCompletedOrCancelled))}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
        >
          {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : isEditing ? "Save Changes" : "Create Project"}
        </button>
        <Link
          href={isEditing ? `/admin/projects/${initialData.id}` : "/admin/projects"}
          className="px-6 py-2.5 text-neutral-400 hover:text-white transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
