import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectById } from "@/lib/admin/project-actions";
import { getAllAdmins } from "@/lib/admin/auth";
import ProjectStatusBadge from "@/components/admin/ProjectStatusBadge";
import { getProjectTasks } from "@/lib/admin/task-actions";
import ProjectPriorityBadge from "@/components/admin/ProjectPriorityBadge";
import ProjectActions from "./ProjectActions";
import ProjectMembers from "./ProjectMembers";
import { ArrowLeft, Edit, Calendar, Clock, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Project Details - EffyOps",
};

function formatDate(dateStr) {
  if (!dateStr) return "--";
  
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split('-');
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function calculateScheduleHealth(startDate, dueDate, completedAt) {
  if (completedAt) return { label: "Completed", color: "text-primary-light", days: null };
  if (!dueDate) return { label: "No Due Date", color: "text-neutral-500", days: null };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today in local context
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { label: "Overdue", color: "text-red-500", days: Math.abs(diffDays) };
  if (diffDays === 0) return { label: "Due Today", color: "text-amber-500", days: 0 };
  if (diffDays <= 3) return { label: "Due Soon", color: "text-amber-500", days: diffDays };
  return { label: "Upcoming", color: "text-emerald-500", days: diffDays };
}

function calculateDuration(startDate, endDate) {
  if (!startDate) return "--";
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const diffDays = Math.max(0, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  return `${diffDays} days`;
}

export default async function ProjectDetailsPage({ params }) {
  const resolvedParams = await params;
  const [{ data: project, error }, { data: admins }, { data: tasksData }] = await Promise.all([
    getProjectById(resolvedParams.projectId),
    getAllAdmins(),
    getProjectTasks(resolvedParams.projectId)
  ]);

  if (error || !project) {
    if (error === "Invalid UUID format." || error === "Project not found.") {
      notFound();
    }
    return (
      <div className="bg-red-500/10 text-red-500 p-6 rounded-xl flex gap-3">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p>{error || "An unknown error occurred."}</p>
      </div>
    );
  }

  const isArchived = project.status === "archived";
  const isCompleted = project.status === "completed";
  const health = calculateScheduleHealth(project.start_date, project.due_date, project.completed_at);
  const duration = calculateDuration(project.start_date, project.completed_at || new Date());

  return (
    <div className="space-y-6">
      <Link href="/admin/projects" className="inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Projects
      </Link>

      {/* Header */}
      <div className="bg-[#1C1C1E] border border-white/10 rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.name}</h1>
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <span>Client:</span>
              <Link href={`/admin/clients/${project.client_id}`} className="text-primary-light hover:text-primary-light hover:underline">
                {project.clients?.name || "Unknown"}
              </Link>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <ProjectStatusBadge status={project.status} />
            <ProjectPriorityBadge priority={project.priority} />
            <span className="text-sm text-neutral-500 px-2 py-0.5 border border-neutral-800 rounded-full">
              Progress: {project.progress_percent}%
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4">
          <ProjectActions project={project} />
          {!isArchived && !isCompleted && project.status !== "cancelled" && (
             <Link 
               href={`/admin/projects/${project.id}/edit`}
               className="inline-flex items-center gap-2 text-sm text-primary-light hover:text-primary-light font-medium"
             >
               <Edit className="w-4 h-4" /> Edit Details
             </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1C1C1E] border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Description</h2>
            {project.description ? (
              <p className="text-neutral-300 whitespace-pre-wrap leading-relaxed">
                {project.description}
              </p>
            ) : (
              <p className="text-neutral-500 italic">No description provided.</p>
            )}
          </div>

          {/* Tasks Summary */}
          <div className="bg-[#1C1C1E] border border-white/10 rounded-xl p-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Project Tasks</h2>
              <p className="text-sm text-neutral-400">
                {tasksData?.counts?.total || 0} total tasks ({tasksData?.counts?.done || 0} completed)
              </p>
            </div>
            <Link 
              href={`/admin/projects/${project.id}/tasks`} 
              className="px-4 py-2 bg-[#2C2C2E] hover:bg-[#3C3C3E] text-white text-sm font-medium rounded-lg transition-colors border border-white/5"
            >
              View Task Board
            </Link>
          </div>

          <ProjectMembers 
             projectId={project.id} 
             members={project.project_members || []} 
             activeAdmins={admins || []}
             isArchived={isArchived}
          />
        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-6">
          <div className="bg-[#1C1C1E] border border-white/10 rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white">Project Stats</h2>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-[#2C2C2E] rounded-lg p-3">
                 <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Members</p>
                 <p className="text-xl font-semibold text-white">{project.project_members?.length || 0}</p>
               </div>
               <div className="bg-[#2C2C2E] rounded-lg p-3">
                 <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Progress</p>
                 <p className="text-xl font-semibold text-white">{project.progress_percent}%</p>
               </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-neutral-400 flex items-center gap-2"><Calendar className="w-4 h-4" /> Start Date</span>
                <span className="text-white font-medium">{formatDate(project.start_date)}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-neutral-400 flex items-center gap-2"><Clock className="w-4 h-4" /> Due Date</span>
                <span className="text-white font-medium">{formatDate(project.due_date)}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-neutral-400 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Schedule Health</span>
                <span className={`font-medium ${health.color}`}>
                  {health.label} {health.days !== null ? `(${health.days}d)` : ""}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pb-2">
                <span className="text-neutral-400">Duration</span>
                <span className="text-white font-medium">{duration}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1C1C1E] border border-white/10 rounded-xl p-6 space-y-4 text-sm">
            <h2 className="text-lg font-semibold text-white">Metadata</h2>
            <div className="flex justify-between">
              <span className="text-neutral-400">Created</span>
              <span className="text-white">{formatDate(project.created_at)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Created By</span>
              <span className="text-white">{project.created_by_profile?.name || "Unknown"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Last Updated</span>
              <span className="text-white">{formatDate(project.updated_at)}</span>
            </div>
            {project.completed_at && (
              <div className="flex justify-between text-primary-light">
                <span>Completed</span>
                <span>{formatDate(project.completed_at)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
