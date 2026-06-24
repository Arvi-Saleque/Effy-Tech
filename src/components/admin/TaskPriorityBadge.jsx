"use client";
import React from "react";

const priorityConfig = {
  low: { bg: "bg-slate-800", text: "text-slate-400", label: "Low" },
  normal: { bg: "bg-blue-900/30", text: "text-blue-300", label: "Normal" },
  high: { bg: "bg-orange-900/40", text: "text-orange-400", label: "High" },
  urgent: { bg: "bg-red-900/50", text: "text-red-400", label: "Urgent" },
};

export default function TaskPriorityBadge({ priority, className = "" }) {
  const conf = priorityConfig[priority] || priorityConfig.normal;
  return (
    <span className={`px-2 py-0.5 text-xs rounded-full border border-white/5 whitespace-nowrap ${conf.bg} ${conf.text} ${className}`}>
      {conf.label}
    </span>
  );
}
