import React from "react";

export default function StatusBadge({ status }) {
  let badgeStyles = "bg-neutral-800/80 text-neutral-400 border border-neutral-700/60";
  let label = "Offline";

  if (status === "active") {
    badgeStyles = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    label = "Active";
  } else if (status === "break") {
    badgeStyles = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    label = "On Break";
  } else if (status === "ended") {
    badgeStyles = "bg-blue-500/10 text-blue-400 border border-blue-500/20";
    label = "Ended";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${badgeStyles}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${
        status === "active" ? "bg-emerald-400 animate-pulse" :
        status === "break" ? "bg-amber-400 animate-pulse" :
        status === "ended" ? "bg-blue-400" : "bg-neutral-500"
      }`} />
      {label}
    </span>
  );
}
