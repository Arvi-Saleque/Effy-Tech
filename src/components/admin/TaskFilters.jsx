"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function TaskFilters({ assignees = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  
  useEffect(() => {
    const delay = setTimeout(() => {
      const q = new URLSearchParams(searchParams.toString());
      if (search.trim()) q.set("search", search.trim());
      else q.delete("search");
      router.replace(`${pathname}?${q.toString()}`);
    }, 400);
    return () => clearTimeout(delay);
  }, [search, router, pathname, searchParams]);

  const setFilter = (key, val) => {
    const q = new URLSearchParams(searchParams.toString());
    let defaultVal = "all";
    if (key === "status") defaultVal = "current";
    if (key === "view") defaultVal = "board";

    if (val && val !== defaultVal) q.set(key, val);
    else q.delete(key);
    
    router.replace(`${pathname}?${q.toString()}`);
  };

  const currentStatus = searchParams.get("status") || "current";
  const currentPriority = searchParams.get("priority") || "all";
  const currentAssignee = searchParams.get("assigneeId") || "all";
  const currentDueState = searchParams.get("dueState") || "all";
  const currentView = searchParams.get("view") || "board";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        
        <div className="lg:col-span-2">
          <label className="block text-xs text-slate-400 mb-1">Search Tasks</label>
          <input 
            type="text" 
            placeholder="Search by title or description..." 
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">View</label>
          <select 
            value={currentView} 
            onChange={(e) => setFilter("view", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200"
          >
            <option value="board">Kanban Board</option>
            <option value="list">List View</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Status</label>
          <select 
            value={currentStatus} 
            onChange={(e) => setFilter("status", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200"
          >
            <option value="current">Active (Hide Archived/Cancelled)</option>
            <option value="all">All</option>
            <option value="backlog">Backlog</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
            <option value="cancelled">Cancelled</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Priority</label>
          <select 
            value={currentPriority} 
            onChange={(e) => setFilter("priority", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Due Date</label>
          <select 
            value={currentDueState} 
            onChange={(e) => setFilter("dueState", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200"
          >
            <option value="all">Any Date</option>
            <option value="overdue">Overdue</option>
            <option value="due_today">Due Today</option>
            <option value="due_soon">Due Soon (3 Days)</option>
            <option value="no_due_date">No Due Date</option>
          </select>
        </div>

      </div>
    </div>
  );
}
