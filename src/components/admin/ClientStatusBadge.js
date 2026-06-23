import React from "react";

export default function ClientStatusBadge({ status }) {
  let badgeStyles = "bg-neutral-800/80 text-neutral-400 border border-neutral-700/60";
  let label = "Unknown";
  let dotColor = "bg-neutral-500";
  let animate = false;

  if (status === "lead") {
    badgeStyles = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    label = "Lead";
    dotColor = "bg-amber-400";
    animate = true;
  } else if (status === "active") {
    badgeStyles = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    label = "Active";
    dotColor = "bg-emerald-400";
    animate = true;
  } else if (status === "inactive") {
    badgeStyles = "bg-neutral-800/80 text-neutral-400 border border-neutral-700/60";
    label = "Inactive";
    dotColor = "bg-neutral-500";
  } else if (status === "archived") {
    badgeStyles = "bg-slate-800/80 text-slate-400 border border-slate-700/60";
    label = "Archived";
    dotColor = "bg-slate-500";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${badgeStyles}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor} ${animate ? "animate-pulse" : ""}`} />
      {label}
    </span>
  );
}
