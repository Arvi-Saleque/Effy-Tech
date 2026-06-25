import React from "react";
import Link from "next/link";
import { formatDhakaDate } from "@/lib/admin/time";
import { RefreshCw, Plus, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardHeader({ onRefresh, isRefreshing }) {
  const router = useRouter();
  
  const dateStr = formatDhakaDate();

  const handleRefresh = () => {
    if (onRefresh) onRefresh();
    else router.refresh();
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <span className="text-xs text-neutral-400 font-semibold uppercase tracking-widest block mb-1">
          {dateStr}
        </span>
        <h2 className="text-2xl font-extrabold text-neutral-100 tracking-tight flex items-center gap-2">
          EffyOps Dashboard
        </h2>
        <p className="text-sm text-neutral-400 mt-1">
          Overview of current projects, tasks, and team activity.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors border border-neutral-700 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>

        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg bg-emerald-600/90 text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/20"
        >
          <Plus className="h-4 w-4" />
          <span>Project</span>
        </Link>
        
        <Link
          href="/admin/my-work"
          className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg bg-indigo-600/90 text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/20"
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>My Work</span>
        </Link>
      </div>
    </div>
  );
}
