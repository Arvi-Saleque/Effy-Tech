import React from "react";
import Link from "next/link";
import { FileCheck, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "@/lib/admin/time";

export default function WorkReportOverview({ reports, profiles, tasks, stats }) {
  // Sort latest reports by submission date (newest first)
  const sortedReports = [...reports].sort((a, b) => {
    return new Date(b.submitted_date || 0).getTime() - new Date(a.submitted_date || 0).getTime();
  }).slice(0, 5); // top 5

  const getProfileName = (id) => profiles.find(p => p.id === id)?.name || "Unknown";
  const getTaskTitle = (id) => tasks.find(t => t.id === id)?.title || "Unknown Task";
  const getProjectId = (id) => tasks.find(t => t.id === id)?.project_id || "";

  return (
    <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl mb-8 flex flex-col md:flex-row gap-8">
      
      {/* Left side: Queue metrics */}
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <FileCheck className="h-5 w-5 text-amber-400" />
          <h3 className="text-base font-bold text-neutral-100">Work Reports</h3>
        </div>
        
        <div className="flex flex-col p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
          <span className="text-3xl font-bold text-amber-400 mb-1">{stats.reportsAwaitingReview}</span>
          <span className="text-xs text-amber-400/80 font-semibold uppercase tracking-wider">Awaiting Review</span>
        </div>

        <div className="flex flex-col p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">
          <span className="text-3xl font-bold text-rose-400 mb-1">{stats.revisionRequestedReports}</span>
          <span className="text-xs text-rose-400/80 font-semibold uppercase tracking-wider">Revision Requested</span>
        </div>
      </div>

      {/* Right side: Recent Reports */}
      <div className="w-full md:w-2/3">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-neutral-100">Recent Submissions</h4>
          <Link href="/admin/reports" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            View All Reports
          </Link>
        </div>

        <div className="space-y-3">
          {sortedReports.map(r => (
            <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-neutral-800/30 border border-neutral-800">
              <div className="flex flex-col max-w-[70%]">
                <span className="text-sm font-semibold text-neutral-200 truncate" title={getTaskTitle(r.task_id)}>
                  {getTaskTitle(r.task_id)}
                </span>
                <span className="text-xs text-neutral-400 mt-1">
                  By {getProfileName(r.submitted_by)} • {r.submitted_date ? formatDistanceToNow(new Date(r.submitted_date), { addSuffix: true }) : 'Unknown'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                  ${r.completion_status === 'submitted' ? 'bg-amber-500/10 text-amber-400' : 
                    r.completion_status === 'revision_requested' ? 'bg-rose-500/10 text-rose-400' : 
                    r.completion_status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 
                    'bg-neutral-500/10 text-neutral-400'}`}
                >
                  {r.completion_status.replace("_", " ")}
                </span>
                <Link 
                  href={`/admin/projects/${getProjectId(r.task_id)}/tasks/${r.task_id}`} 
                  className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white transition-colors"
                  title="Review Report"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}

          {sortedReports.length === 0 && (
            <div className="text-center py-6 text-neutral-500 text-sm">
              No recent work reports.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
