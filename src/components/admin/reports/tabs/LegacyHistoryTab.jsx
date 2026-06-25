import React, { useState } from "react";
import { formatDateTime } from "@/lib/admin/time";
import { ChevronDown, ChevronUp, History, Info } from "lucide-react";

export default function LegacyHistoryTab({ data }) {
  const [sortConfig, setSortConfig] = useState({ key: "targetDate", direction: "desc" });

  if (!data || !data.legacyData) return null;

  const handleSort = (key) => {
    let direction = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data.legacyData].sort((a, b) => {
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
    { key: "title", label: "Legacy Assignment" },
    { key: "assignedTo", label: "Assigned To" },
    { key: "status", label: "Status" },
    { key: "targetDate", label: "Target Date" },
    { key: "sessionsCount", label: "Sessions" },
    { key: "totalMinutes", label: "Tracked Minutes" },
    { key: "completionDate", label: "Completion Date" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-indigo-950/40 border border-indigo-900/50 rounded-xl p-4 flex gap-3 items-start">
        <Info className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
        <p className="text-sm text-indigo-200/80">
          <strong>Historical Record:</strong> Legacy Assignments are from the old task system before the introduction of Project Tasks. 
          They are preserved here for historical analysis but are isolated from active Project metrics.
        </p>
      </div>

      <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl overflow-x-auto">
        <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2 mb-6">
          <History className="h-4 w-4 text-indigo-400" />
          Legacy History
        </h3>
        
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
            {sortedData.map(item => (
              <tr key={item.id} className="text-neutral-300 hover:bg-neutral-800/20 transition-colors">
                <td className="py-4 font-semibold text-neutral-100">
                  <div className="flex flex-col max-w-[300px] whitespace-normal">
                    <span className="text-indigo-400">{item.title}</span>
                    {item.notes && (
                      <span className="text-[10px] text-neutral-500 line-clamp-2 mt-1">
                        {item.notes}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-4 text-xs">{item.assignedTo}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                    item.status === "done" ? "text-emerald-400 bg-emerald-400/10" :
                    item.status === "cancelled" ? "text-neutral-400 bg-neutral-400/10" :
                    "text-indigo-400 bg-indigo-400/10"
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 text-xs font-mono">{item.targetDate || "-"}</td>
                <td className="py-4 text-xs font-mono">{item.sessionsCount}</td>
                <td className="py-4 text-xs font-mono text-emerald-400 font-bold">{item.totalMinutes}m</td>
                <td className="py-4 text-xs text-neutral-400">
                  {item.completionDate ? formatDateTime(item.completionDate, false) : "-"}
                </td>
              </tr>
            ))}
            {sortedData.length === 0 && (
              <tr>
                <td colSpan={headers.length} className="py-8 text-center text-neutral-500 text-xs">
                  No legacy assignments found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
