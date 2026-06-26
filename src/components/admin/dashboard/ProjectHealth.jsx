import React from "react";
import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBadge";


export default function ProjectHealth({ projects, tasks }) {
  // We want to show active or important projects
  const activeProjects = projects.filter(p => ["planning", "active", "on_hold"].includes(p.status));

  // Default sorting logic (from requirements: overdue projects, projects with overdue tasks, etc)
  const sortedProjects = activeProjects.sort((a, b) => {
    // 1. high priority
    if (a.priority === "high" && b.priority !== "high") return -1;
    if (b.priority === "high" && a.priority !== "high") return 1;
    // 2. recently updated
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  }).slice(0, 5); // Limit to top 5

  return (
    <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-neutral-100">Project Health</h3>
        <Link href="/admin/projects" className="text-sm text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
          View All Projects
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-800/80 text-neutral-400 text-xs uppercase tracking-wider">
              <th className="pb-3 font-semibold">Project</th>
              <th className="pb-3 font-semibold">Client</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Priority</th>
              <th className="pb-3 font-semibold text-center">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/40">
            {sortedProjects.map(p => {
              const projectTasks = tasks.filter(t => t.project_id === p.id);
              const blockedTasksCount = projectTasks.filter(t => t.status === "blocked").length;

              return (
                <tr key={p.id} className="group hover:bg-neutral-800/20 transition-colors">
                  <td className="py-3">
                    <Link href={`/admin/projects/${p.id}`} className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                      {p.name}
                    </Link>
                    {blockedTasksCount > 0 && (
                      <span className="ml-2 text-xs text-rose-400">({blockedTasksCount} blocked)</span>
                    )}
                  </td>
                  <td className="py-3 text-neutral-300">
                    {p.clients?.name || "No Client"}
                  </td>
                  <td className="py-3">
                    <StatusBadge status={p.status} type="project" />
                  </td>
                  <td className="py-3">
                    <StatusBadge status={p.priority} type="priority" />
                  </td>
                  <td className="py-3">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-24 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${p.progress_percent || 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-neutral-400 font-mono w-8">{p.progress_percent || 0}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
            
            {sortedProjects.length === 0 && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-neutral-500">
                  No active projects to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
