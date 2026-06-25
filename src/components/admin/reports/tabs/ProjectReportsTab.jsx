import React, { useState } from "react";
import Link from "next/link";
import { formatDuration, formatDateTime } from "@/lib/admin/time";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ProjectReportsTab({ data }) {
  const [sortConfig, setSortConfig] = useState({ key: "progress", direction: "desc" });

  if (!data || !data.projectData) return null;

  const handleSort = (key) => {
    let direction = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data.projectData].sort((a, b) => {
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];
    
    if (typeof aVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = bVal?.toLowerCase() || "";
    }

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <span className="ml-1 opacity-0 group-hover:opacity-50">↓</span>;
    return sortConfig.direction === "asc" 
      ? <ChevronUp className="inline-block w-3 h-3 ml-1" />
      : <ChevronDown className="inline-block w-3 h-3 ml-1" />;
  };

  const headers = [
    { key: "name", label: "Project" },
    { key: "clientName", label: "Client" },
    { key: "projectHealth", label: "Health" },
    { key: "progress", label: "Progress" },
    { key: "dueDate", label: "Due Date" },
    { key: "memberCount", label: "Members" },
    { key: "totalTasks", label: "Tasks" },
    { key: "activeTasks", label: "Active" },
    { key: "overdueTasks", label: "Overdue" },
    { key: "reportsAwaiting", label: "Reports Wait" },
    { key: "totalTrackedSeconds", label: "Tracked Time" },
    { key: "lastActivityDate", label: "Last Active" },
  ];

  return (
    <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl animate-fade-in overflow-x-auto">
      <h3 className="text-sm font-bold text-neutral-100 mb-6">Project Reports</h3>
      
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead>
          <tr className="border-b border-neutral-800/80 text-neutral-400 text-xs uppercase tracking-wider">
            {headers.map(h => (
              <th 
                key={h.key} 
                className="pb-3 font-semibold cursor-pointer group hover:text-neutral-200 transition-colors"
                onClick={() => handleSort(h.key)}
              >
                {h.label}
                <SortIcon columnKey={h.key} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/40">
          {sortedData.map(project => (
            <tr key={project.id} className="text-neutral-300 hover:bg-neutral-800/20 transition-colors">
              <td className="py-4 font-semibold text-neutral-100">
                <Link href={`/admin/projects/${project.id}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  {project.name}
                </Link>
                <div className="text-[10px] text-neutral-500 font-normal capitalize">
                  {project.status.replace(/_/g, " ")} • {project.priority} priority
                </div>
              </td>
              <td className="py-4 font-mono text-xs">{project.clientName}</td>
              <td className="py-4 font-mono text-xs">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  project.projectHealth === "On Track" ? "bg-emerald-950/50 text-emerald-400" :
                  project.projectHealth === "Completed" ? "bg-blue-950/50 text-blue-400" :
                  project.projectHealth === "Blocked Risk" ? "bg-rose-950/50 text-rose-400" :
                  project.projectHealth === "Overdue" ? "bg-red-950/50 text-red-500" :
                  project.projectHealth === "Due Soon" ? "bg-amber-950/50 text-amber-400" :
                  "bg-neutral-800/50 text-neutral-400"
                }`}>
                  {project.projectHealth}
                </span>
              </td>
              <td className="py-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs w-8">{project.progress}%</span>
                  <div className="w-16 h-1.5 bg-neutral-800 rounded-full">
                    <div 
                      className="h-1.5 bg-indigo-500 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </td>
              <td className="py-4 font-mono text-xs">{project.dueDate ? project.dueDate.split("T")[0] : "None"}</td>
              <td className="py-4 font-mono text-xs">{project.memberCount}</td>
              <td className="py-4 font-mono text-xs">
                {project.completedTasks}/{project.totalTasks}
              </td>
              <td className="py-4 font-mono text-xs text-indigo-300">{project.activeTasks}</td>
              <td className={`py-4 font-mono text-xs ${project.overdueTasks > 0 ? "text-red-400 font-bold" : ""}`}>
                {project.overdueTasks}
              </td>
              <td className={`py-4 font-mono text-xs ${project.reportsAwaiting > 0 ? "text-amber-400 font-bold" : ""}`}>
                {project.reportsAwaiting} {project.reportsRevision > 0 && `(+${project.reportsRevision})`}
              </td>
              <td className="py-4 font-mono text-xs font-bold text-emerald-400">
                {formatDuration(project.totalTrackedSeconds)}
              </td>
              <td className="py-4 text-xs text-neutral-400">
                {project.lastActivityDate ? formatDateTime(project.lastActivityDate, true) : "Never"}
              </td>
            </tr>
          ))}
          {sortedData.length === 0 && (
            <tr>
              <td colSpan={headers.length} className="py-8 text-center text-neutral-500 text-xs">
                No active projects found for this filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
