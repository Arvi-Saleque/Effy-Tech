import React from "react";
import Link from "next/link";
import { Plus, FolderKanban, AlertCircle } from "lucide-react";
import { getProjects } from "@/lib/admin/project-actions";
import { getClients } from "@/lib/admin/client-actions";
import ProjectFilters from "./ProjectFilters";
import ProjectStatusBadge from "@/components/admin/ProjectStatusBadge";
import ProjectPriorityBadge from "@/components/admin/ProjectPriorityBadge";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Project Management - EffyOps",
};

function formatDate(dateStr) {
  if (!dateStr) return "--";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function ProjectsPage({ searchParams }) {
  const { data: projects, counts, error } = await getProjects(searchParams);
  const { data: clientsData } = await getClients({ status: "all" });

  const activeClients = clientsData?.filter(c => c.status !== "archived") || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-emerald-500" />
            Project Management
          </h1>
          <p className="text-neutral-400 text-sm mt-1">Manage client projects, schedules, priorities, and team ownership.</p>
        </div>
        <Link 
          href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </Link>
      </div>

      {/* Summary Cards */}
      {counts && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-[#1C1C1E] border border-white/10 p-4 rounded-xl">
            <p className="text-sm text-neutral-400">Current</p>
            <p className="text-2xl font-semibold text-white mt-1">{counts.current}</p>
          </div>
          <div className="bg-[#1C1C1E] border border-blue-500/20 p-4 rounded-xl">
            <p className="text-sm text-blue-400">Planning</p>
            <p className="text-2xl font-semibold text-white mt-1">{counts.planning}</p>
          </div>
          <div className="bg-[#1C1C1E] border border-emerald-500/20 p-4 rounded-xl">
            <p className="text-sm text-emerald-400">Active</p>
            <p className="text-2xl font-semibold text-white mt-1">{counts.active}</p>
          </div>
          <div className="bg-[#1C1C1E] border border-amber-500/20 p-4 rounded-xl">
            <p className="text-sm text-amber-400">On Hold</p>
            <p className="text-2xl font-semibold text-white mt-1">{counts.onHold}</p>
          </div>
          <div className="bg-[#1C1C1E] border border-teal-500/20 p-4 rounded-xl">
            <p className="text-sm text-teal-400">Completed</p>
            <p className="text-2xl font-semibold text-white mt-1">{counts.completed}</p>
          </div>
          <div className="bg-[#1C1C1E] border border-slate-500/20 p-4 rounded-xl">
            <p className="text-sm text-slate-400">Archived</p>
            <p className="text-2xl font-semibold text-white mt-1">{counts.archived}</p>
          </div>
        </div>
      )}

      <ProjectFilters clients={activeClients} />

      {error ? (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-xl flex items-center justify-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      ) : projects?.length === 0 ? (
        <div className="bg-[#1C1C1E] border border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center">
          <FolderKanban className="w-12 h-12 text-neutral-600 mb-4" />
          <h3 className="text-lg font-medium text-white">No projects match the current filters.</h3>
          <p className="text-neutral-400 mt-2">Adjust your filters or create a new project.</p>
        </div>
      ) : (
        <div className="bg-[#1C1C1E] border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 text-sm font-medium text-neutral-300">Project</th>
                  <th className="p-4 text-sm font-medium text-neutral-300">Client</th>
                  <th className="p-4 text-sm font-medium text-neutral-300">Status</th>
                  <th className="p-4 text-sm font-medium text-neutral-300">Priority</th>
                  <th className="p-4 text-sm font-medium text-neutral-300 text-center">Progress</th>
                  <th className="p-4 text-sm font-medium text-neutral-300">Due Date</th>
                  <th className="p-4 text-sm font-medium text-neutral-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {projects.map(project => (
                  <tr key={project.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="font-medium text-white">{project.name}</div>
                      {project.project_members?.length > 0 && (
                        <div className="text-xs text-neutral-500 mt-1">
                          {project.project_members.length} {project.project_members.length === 1 ? "member" : "members"}
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-sm text-neutral-300">
                      <Link href={`/admin/clients/${project.client_id}`} className="hover:text-white transition-colors">
                        {project.clients?.name || "Unknown"}
                      </Link>
                    </td>
                    <td className="p-4">
                      <ProjectStatusBadge status={project.status} />
                    </td>
                    <td className="p-4">
                      <ProjectPriorityBadge priority={project.priority} />
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <span className="text-xs font-medium text-neutral-400">{project.progress_percent}%</span>
                        <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden max-w-[80px]">
                          <div 
                            className="h-full bg-emerald-500 rounded-full" 
                            style={{ width: `${project.progress_percent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-neutral-400">
                      {formatDate(project.due_date)}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="text-sm text-emerald-500 hover:text-emerald-400 font-medium"
                        >
                          View
                        </Link>
                        {project.status !== "completed" && project.status !== "cancelled" && project.status !== "archived" && (
                          <Link
                            href={`/admin/projects/${project.id}/edit`}
                            className="text-sm text-blue-500 hover:text-blue-400 font-medium"
                          >
                            Edit
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
