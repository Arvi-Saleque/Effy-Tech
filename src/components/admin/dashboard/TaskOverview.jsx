import React from "react";
import Link from "next/link";
import { ClipboardList } from "lucide-react";

export default function TaskOverview({ statusCounts }) {
  const statusItems = [
    { label: "Backlog", count: statusCounts.backlog, color: "bg-neutral-500" },
    { label: "To Do", count: statusCounts.todo, color: "bg-blue-500" },
    { label: "In Progress", count: statusCounts.in_progress, color: "bg-indigo-500" },
    { label: "Blocked", count: statusCounts.blocked, color: "bg-rose-500" },
    { label: "Review", count: statusCounts.review, color: "bg-amber-500" },
    { label: "Done", count: statusCounts.done, color: "bg-emerald-500" }
  ];

  return (
    <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <ClipboardList className="h-5 w-5 text-indigo-400" />
        <h3 className="text-base font-bold text-neutral-100">Task Overview</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 flex-grow">
        {statusItems.map((item, idx) => (
          <div key={idx} className="flex flex-col p-3 bg-neutral-800/30 rounded-xl border border-neutral-800/50">
            <span className="text-2xl font-bold text-neutral-100 mb-1">{item.count}</span>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
              <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
