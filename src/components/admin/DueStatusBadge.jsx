"use client";
import React from "react";

export function getDueState(dueDate, isDone) {
  if (!dueDate) return { id: "no_due_date", label: "No Due Date", color: "text-slate-500 bg-slate-800/50" };
  if (isDone) return { id: "completed", label: "Completed", color: "text-emerald-500 bg-emerald-900/30" };
  
  const today = new Date();
  today.setHours(0,0,0,0);
  const due = new Date(dueDate);
  due.setHours(0,0,0,0);
  
  if (due < today) return { id: "overdue", label: "Overdue", color: "text-red-400 bg-red-900/40" };
  if (due.getTime() === today.getTime()) return { id: "due_today", label: "Due Today", color: "text-orange-400 bg-orange-900/40" };
  
  const soon = new Date(today);
  soon.setDate(soon.getDate() + 3);
  if (due > today && due <= soon) return { id: "due_soon", label: "Due Soon", color: "text-yellow-400 bg-yellow-900/40" };
  
  return { id: "upcoming", label: "Upcoming", color: "text-primary-light bg-primary-dark/25" };
}

export default function DueStatusBadge({ dueDate, isDone, className = "" }) {
  const state = getDueState(dueDate, isDone);
  return (
    <span className={`px-2 py-0.5 text-xs rounded border border-white/5 whitespace-nowrap ${state.color} ${className}`}>
      {state.label}
    </span>
  );
}
