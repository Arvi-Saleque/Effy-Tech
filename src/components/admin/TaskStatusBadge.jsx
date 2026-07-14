"use client";
import React from "react";

const statusConfig = {
  backlog: { bg: "bg-gray-800", text: "text-gray-300", label: "Backlog" },
  todo: { bg: "bg-slate-700", text: "text-slate-200", label: "To Do" },
  in_progress: { bg: "bg-primary-dark/30", text: "text-primary-light", label: "In Progress" },
  blocked: { bg: "bg-red-900/40", text: "text-red-400", label: "Blocked" },
  review: { bg: "bg-purple-900/40", text: "text-purple-400", label: "Review" },
  done: { bg: "bg-emerald-900/40", text: "text-emerald-400", label: "Done" },
  cancelled: { bg: "bg-zinc-800", text: "text-zinc-500", label: "Cancelled" },
  archived: { bg: "bg-stone-800", text: "text-stone-500", label: "Archived" },
};

export default function TaskStatusBadge({ status, className = "" }) {
  const conf = statusConfig[status] || statusConfig.todo;
  return (
    <span className={`px-2 py-0.5 text-xs rounded-full border border-white/5 whitespace-nowrap ${conf.bg} ${conf.text} ${className}`}>
      {conf.label}
    </span>
  );
}
