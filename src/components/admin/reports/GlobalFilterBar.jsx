"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Calendar, Users, Briefcase, CheckCircle, RotateCcw } from "lucide-react";

export default function GlobalFilterBar({ filterOptions, currentFilters }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state for the custom date range to avoid constant url updates while typing
  const [customStart, setCustomStart] = useState(currentFilters.startDate || "");
  const [customEnd, setCustomEnd] = useState(currentFilters.endDate || "");

  const updateFilters = (newFilters) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`/admin/reports?${params.toString()}`);
    router.refresh();
  };

  const handleCustomDateApply = () => {
    if (customStart && customEnd && customEnd < customStart) {
      alert("End date cannot be before start date.");
      return;
    }
    updateFilters({ range: "custom", startDate: customStart, endDate: customEnd });
  };

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("range");
    params.delete("startDate");
    params.delete("endDate");
    params.delete("member");
    params.delete("client");
    params.delete("project");
    params.delete("taskStatus");
    params.delete("reportStatus");
    params.delete("sourceType");
    router.push(`/admin/reports?${params.toString()}`);
    router.refresh();
  };

  return (
    <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-5 shadow-xl backdrop-blur-xl mb-6 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-neutral-200 flex items-center gap-2">
          <Filter className="h-4 w-4 text-indigo-400" />
          Global Filters
        </h3>
        <button onClick={resetFilters} className="text-xs text-neutral-400 hover:text-neutral-200 flex items-center gap-1 transition-colors">
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range Pre-sets */}
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-neutral-400">Date Range</label>
          <select 
            value={currentFilters.range || "today"} 
            onChange={(e) => updateFilters({ range: e.target.value })}
            className="bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="last30">Last 30 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {/* Custom Range Inputs */}
        {currentFilters.range === "custom" && (
          <div className="flex space-x-2 items-end">
            <div className="flex flex-col flex-1 space-y-1">
              <label className="text-xs font-semibold text-neutral-400">Start</label>
              <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)} className="bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 rounded-lg p-2" />
            </div>
            <div className="flex flex-col flex-1 space-y-1">
              <label className="text-xs font-semibold text-neutral-400">End</label>
              <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)} className="bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 rounded-lg p-2" />
            </div>
            <button onClick={handleCustomDateApply} className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-lg text-sm font-semibold h-[38px]">
              Apply
            </button>
          </div>
        )}

        {/* Team Member */}
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-neutral-400">Team Member</label>
          <select 
            value={currentFilters.member || "all"} 
            onChange={(e) => updateFilters({ member: e.target.value })}
            className="bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Members</option>
            {filterOptions.members.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>

        {/* Project */}
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-neutral-400">Project</label>
          <select 
            value={currentFilters.project || "all"} 
            onChange={(e) => updateFilters({ project: e.target.value })}
            className="bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Projects</option>
            {filterOptions.projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-neutral-800/40">
        {/* Client */}
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-neutral-400">Client</label>
          <select 
            value={currentFilters.client || "all"} 
            onChange={(e) => updateFilters({ client: e.target.value })}
            className="bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Clients</option>
            {filterOptions.clients.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Task Status */}
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-neutral-400">Task Status</label>
          <select 
            value={currentFilters.taskStatus || "all"} 
            onChange={(e) => updateFilters({ taskStatus: e.target.value })}
            className="bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="backlog">Backlog</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="review">Review</option>
            <option value="blocked">Blocked</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Report Status */}
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-neutral-400">Report Status</label>
          <select 
            value={currentFilters.reportStatus || "all"} 
            onChange={(e) => updateFilters({ reportStatus: e.target.value })}
            className="bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="submitted">Awaiting Review</option>
            <option value="approved">Approved</option>
            <option value="revision_requested">Revision Requested</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Source Type */}
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-neutral-400">Source Type</label>
          <select 
            value={currentFilters.sourceType || "all"} 
            onChange={(e) => updateFilters({ sourceType: e.target.value })}
            className="bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Sources</option>
            <option value="project_task">Project Task</option>
            <option value="legacy_assignment">Legacy Assignment</option>
            <option value="manual">Manual Work</option>
          </select>
        </div>
      </div>
    </div>
  );
}
