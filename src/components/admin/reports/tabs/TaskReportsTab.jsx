import React, { useState } from "react";
import Link from "next/link";
import { formatDuration, formatDateTime } from "@/lib/admin/time";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function TaskReportsTab({ data }) {
  const [sortConfig, setSortConfig] = useState({ key: "totalTrackedSeconds", direction: "desc" });

  if (!data || !data.taskData) return null;

  const handleSort = (key) => {
    let direction = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data.taskData].sort((a, b) => {
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
    { key: "title", label: "Task" },
    { key: "projectName", label: "Project" },
    { key: "assignees", label: "Assignees" },
    { key: "status", label: "Status" },
    { key: "workReportStatus", label: "Report Status" },
    { key: "subtaskCompletion", label: "Subtasks" },
    { key: "dueDate", label: "Due Date" },
    { key: "totalTrackedSeconds", label: "Tracked Time" },
    { key: "firstTimerStartDate", label: "First Work" },
    { key: "reportedActualStartDate", label: "Actual Start" },
    { key: "reportSubmittedDate", label: "Submitted" },
    { key: "completedDate", label: "Completed" },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "done": return "text-emerald-400 bg-emerald-400/10";
      case "blocked": return "text-rose-400 bg-rose-400/10";
      case "review": return "text-amber-400 bg-amber-400/10";
      case "in_progress": return "text-indigo-400 bg-indigo-400/10";
      case "todo": return "text-blue-400 bg-blue-400/10";
      default: return "text-neutral-400 bg-neutral-400/10";
    }
  };

  return (
    <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl animate-fade-in overflow-x-auto">
      <h3 className="text-sm font-bold text-neutral-100 mb-6">Task Reports</h3>
      
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
          {sortedData.map(task => (
            <tr key={task.id} className="text-neutral-300 hover:bg-neutral-800/20 transition-colors">
              <td className="py-4 font-semibold text-neutral-100">
                <Link href={`/admin/projects/${task.projectId}/tasks/${task.id}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  {task.title}
                </Link>
                {task.isOverdue && <span className="ml-2 text-[10px] bg-red-950/50 text-red-500 px-1.5 py-0.5 rounded font-bold uppercase">Overdue</span>}
                <div className="text-[10px] text-neutral-500 font-normal">
                  Priority: {task.priority} • Progress: {task.progress}%
                </div>
              </td>
              <td className="py-4 text-xs">
                <div>{task.projectName}</div>
                <div className="text-[10px] text-neutral-500">{task.clientName}</div>
              </td>
              <td className="py-4 text-xs text-neutral-400">
                {task.assignees.length > 0 ? task.assignees.join(", ") : "Unassigned"}
              </td>
              <td className="py-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(task.status)}`}>
                  {task.status.replace(/_/g, " ")}
                </span>
              </td>
              <td className="py-4">
                <span className="text-xs capitalize text-neutral-300">
                  {task.workReportStatus.replace(/_/g, " ")}
                </span>
                {task.reportVersionCount > 1 && (
                  <span className="ml-1 text-[10px] text-neutral-500 font-mono">v{task.reportVersionCount}</span>
                )}
                {task.revisionCount > 0 && (
                  <div className="text-[10px] text-amber-500">{task.revisionCount} revisions</div>
                )}
              </td>
              <td className="py-4 font-mono text-xs">{task.subtaskCompletion}</td>
              <td className="py-4 font-mono text-xs text-neutral-400">
                {task.dueDate ? task.dueDate.split("T")[0] : "-"}
              </td>
              <td className="py-4 font-mono text-xs font-bold text-emerald-400">
                {formatDuration(task.totalTrackedSeconds)}
              </td>
              <td className="py-4 text-xs text-neutral-400">
                {task.firstTimerStartDate ? formatDateTime(task.firstTimerStartDate, true) : "-"}
              </td>
              <td className="py-4 text-xs text-neutral-400">
                {task.reportedActualStartDate || "-"}
              </td>
              <td className="py-4 text-xs text-neutral-400">
                {task.reportSubmittedDate || "-"}
              </td>
              <td className="py-4 text-xs text-neutral-400">
                {task.completedDate ? (
                  <div className="flex flex-col">
                    <span>{formatDateTime(task.completedDate, false)}</span>
                    {task.completedDateIsFallback && <span className="text-[9px] text-amber-500/80 mt-0.5">Legacy fallback date</span>}
                  </div>
                ) : "-"}
              </td>
            </tr>
          ))}
          {sortedData.length === 0 && (
            <tr>
              <td colSpan={headers.length} className="py-8 text-center text-neutral-500 text-xs">
                No tasks found for this filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
