"use client";
import React from "react";

export default function ProgressBar({ progress, className = "" }) {
  const safeProgress = Math.min(100, Math.max(0, Number(progress) || 0));
  let colorClass = "bg-primary";
  if (safeProgress === 100) colorClass = "bg-emerald-500";
  else if (safeProgress > 0) colorClass = "bg-primary-light";
  else colorClass = "bg-slate-600";

  return (
    <div className={`w-full bg-slate-800 rounded-full h-2 overflow-hidden ${className}`}>
      <div 
        className={`h-full transition-all duration-300 ${colorClass}`}
        style={{ width: safeProgress + '%' }}
      ></div>
    </div>
  );
}
