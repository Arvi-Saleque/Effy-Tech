import React, { useState } from "react";
import { formatDuration, formatDateTime } from "@/lib/admin/time";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function TeamPerformanceTab({ data }) {
  const [sortConfig, setSortConfig] = useState({ key: "netProductiveSeconds", direction: "desc" });

  if (!data || !data.teamData) return null;

  const handleSort = (key) => {
    let direction = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data.teamData].sort((a, b) => {
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
    { key: "name", label: "Member" },
    { key: "projectMemberships", label: "Projects" },
    { key: "netProductiveSeconds", label: "Net Time" },
    { key: "completedProjectTasks", label: "Tasks Done" },
    { key: "completedLegacyAssignments", label: "Legacy Done" },
    { key: "reportsSubmitted", label: "Reports" },
    { key: "revisionRequestsReceived", label: "Revisions" },
    { key: "overdueAssignedTasks", label: "Overdue" },
    { key: "blockedAssignedTasks", label: "Blocked" },
    { key: "lastActivityDate", label: "Last Active" },
  ];

  return (
    <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl animate-fade-in overflow-x-auto">
      <h3 className="text-sm font-bold text-neutral-100 mb-6">Team Performance</h3>
      
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
          {sortedData.map(member => (
            <tr key={member.id} className="text-neutral-300 hover:bg-neutral-800/20 transition-colors">
              <td className="py-4 font-semibold text-neutral-100">
                <div className="flex flex-col">
                  <span>{member.name}</span>
                  <span className="text-[10px] text-neutral-500 font-normal">{member.email}</span>
                </div>
              </td>
              <td className="py-4 font-mono text-xs">{member.projectMemberships}</td>
              <td className="py-4 font-mono text-xs font-bold text-emerald-400">
                {formatDuration(member.netProductiveSeconds)}
              </td>
              <td className="py-4 font-mono text-xs">{member.completedProjectTasks}</td>
              <td className="py-4 font-mono text-xs">{member.completedLegacyAssignments}</td>
              <td className="py-4 font-mono text-xs">
                {member.reportsSubmitted} 
                {member.reportsApproved > 0 && <span className="text-emerald-500 ml-1">({member.reportsApproved} ✓)</span>}
              </td>
              <td className="py-4 font-mono text-xs text-amber-500">{member.revisionRequestsReceived}</td>
              <td className="py-4 font-mono text-xs text-red-400">{member.overdueAssignedTasks}</td>
              <td className="py-4 font-mono text-xs text-rose-400">{member.blockedAssignedTasks}</td>
              <td className="py-4 text-xs text-neutral-400">
                {member.lastActivityDate ? formatDateTime(member.lastActivityDate, true) : "Never"}
              </td>
            </tr>
          ))}
          {sortedData.length === 0 && (
            <tr>
              <td colSpan={headers.length} className="py-8 text-center text-neutral-500 text-xs">
                No active team members found for this filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
