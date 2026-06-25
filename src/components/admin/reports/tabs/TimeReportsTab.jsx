import React, { useState } from "react";
import { formatDuration, formatDateTime } from "@/lib/admin/time";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function TimeReportsTab({ data }) {
  const [sortConfig, setSortConfig] = useState({ key: "totalTrackedSeconds", direction: "desc" });

  if (!data || !data.timeData) return null;

  const handleSort = (key) => {
    let direction = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data.timeData].sort((a, b) => {
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
    { key: "netProductiveSeconds", label: "Net Productive" },
    { key: "totalTrackedSeconds", label: "Tracked Work" },
    { key: "totalBreakSeconds", label: "Break Time" },
    { key: "sessionsCount", label: "Sessions" },
    { key: "blocksCount", label: "Blocks" },
    { key: "projectTaskSeconds", label: "Project Task Time" },
    { key: "legacySeconds", label: "Legacy Time" },
    { key: "manualSeconds", label: "Manual Time" },
    { key: "maxBlockDuration", label: "Longest Block" },
    { key: "avgBlockSeconds", label: "Avg Block" },
    { key: "firstWorkStart", label: "First Start" },
    { key: "lastWorkEnd", label: "Last End" },
  ];

  return (
    <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl animate-fade-in overflow-x-auto">
      <h3 className="text-sm font-bold text-neutral-100 mb-6">Time Reports (Exact Duration)</h3>
      
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
                <div className="flex items-center gap-2">
                  <span>{member.name}</span>
                  {member.hasActiveSession && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  )}
                </div>
              </td>
              <td className="py-4 font-mono text-xs font-bold text-emerald-400">
                {formatDuration(member.netProductiveSeconds)}
              </td>
              <td className="py-4 font-mono text-xs font-bold text-indigo-400">
                {formatDuration(member.totalTrackedSeconds)}
              </td>
              <td className="py-4 font-mono text-xs text-amber-400">
                {member.totalBreakSeconds !== null ? formatDuration(member.totalBreakSeconds) : "Unavailable"}
              </td>
              <td className="py-4 font-mono text-xs">{member.sessionsCount}</td>
              <td className="py-4 font-mono text-xs">{member.blocksCount}</td>
              <td className="py-4 font-mono text-xs text-indigo-300">
                {formatDuration(member.projectTaskSeconds)}
              </td>
              <td className="py-4 font-mono text-xs text-neutral-400">
                {formatDuration(member.legacySeconds)}
              </td>
              <td className="py-4 font-mono text-xs text-neutral-400">
                {formatDuration(member.manualSeconds)}
              </td>
              <td className="py-4 font-mono text-xs">
                {formatDuration(member.maxBlockDuration)}
              </td>
              <td className="py-4 font-mono text-xs">
                {formatDuration(member.avgBlockSeconds)}
              </td>
              <td className="py-4 text-xs text-neutral-400">
                {member.firstWorkStart ? formatDateTime(member.firstWorkStart, true) : "-"}
              </td>
              <td className="py-4 text-xs text-neutral-400">
                {member.lastWorkEnd === "Active Now" ? (
                  <span className="text-emerald-400 font-bold">Active Now</span>
                ) : member.lastWorkEnd ? formatDateTime(member.lastWorkEnd, true) : "-"}
              </td>
            </tr>
          ))}
          {sortedData.length === 0 && (
            <tr>
              <td colSpan={headers.length} className="py-8 text-center text-neutral-500 text-xs">
                No time data found for this filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
