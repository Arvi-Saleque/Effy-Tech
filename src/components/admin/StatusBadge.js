import React from "react";

export default function StatusBadge({ status }) {
  let badgeStyles = "bg-neutral-800/80 text-neutral-400 border border-neutral-700/60";
  let label = "Offline";
  let dotColor = "bg-neutral-500";
  let animate = false;

  if (status === "active" || status === "task_active") {
    badgeStyles = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    label = status === "task_active" ? "Task Active" : "Active";
    dotColor = "bg-emerald-400";
    animate = true;
  } else if (status === "workday_open") {
    badgeStyles = "bg-primary/10 text-primary-light border border-primary-light/20";
    label = "Workday Open";
    dotColor = "bg-primary-light";
    animate = true;
  } else if (status === "break" || status === "on_break") {
    badgeStyles = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    label = "On Break";
    dotColor = "bg-amber-400";
    animate = true;
  } else if (status === "ended" || status === "workday_ended") {
    badgeStyles = "bg-primary/10 text-primary-light border border-primary-light/20";
    label = status === "workday_ended" ? "Workday Ended" : "Ended";
    dotColor = "bg-primary-light";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${badgeStyles}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor} ${animate ? "animate-pulse" : ""}`} />
      {label}
    </span>
  );
}
