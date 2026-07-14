import React from "react";

export default function ProjectStatusBadge({ status, className = "" }) {
  const config = {
    planning: { label: "Planning", colors: "bg-primary/10 text-primary-light border-primary-light/20" },
    active: { label: "Active", colors: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
    on_hold: { label: "On Hold", colors: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    completed: { label: "Completed", colors: "bg-primary/10 text-primary-light border-primary-light/20" },
    cancelled: { label: "Cancelled", colors: "bg-red-500/10 text-red-500 border-red-500/20" },
    archived: { label: "Archived", colors: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
  };

  const style = config[status] || { label: status, colors: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20" };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style.colors} ${className}`}>
      {style.label}
    </span>
  );
}
