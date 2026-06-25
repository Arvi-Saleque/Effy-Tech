import React from "react";
import { formatDuration } from "@/lib/admin/time";

export default function TeamActivity({ profiles, sessions, blocks }) {
  // We need to calculate precise seconds for each profile.
  return (
    <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl h-full flex flex-col">
      <h3 className="text-base font-bold text-neutral-100 mb-4">
        Team Activity
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-800/80 text-neutral-400 text-xs uppercase tracking-wider">
              <th className="pb-3 font-semibold">Member</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Current Work</th>
              <th className="pb-3 font-semibold text-right">Worked</th>
              <th className="pb-3 font-semibold text-right">Break</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/40">
            {profiles.map(member => {
              const session = sessions.find(s => s.user_id === member.id);
              const activeBlock = blocks.find(b => b.user_id === member.id && b.status === "active");
              const memberBlocks = blocks.filter(b => b.user_id === member.id);
              
              // Calculate exact tracked time
              let exactSeconds = 0;
              const nowMs = new Date().getTime();
              memberBlocks.forEach(b => {
                if (b.status === "done") {
                  if (b.started_at && b.ended_at) {
                    exactSeconds += Math.max(0, new Date(b.ended_at).getTime() - new Date(b.started_at).getTime()) / 1000;
                  } else {
                    exactSeconds += (b.total_minutes || 0) * 60;
                  }
                } else if (b.status === "active" && b.started_at) {
                  const startMs = new Date(b.started_at).getTime();
                  let diffMs = nowMs - startMs;
                  
                  // If on break, subtract active break time from work block diff
                  if (session && session.status === "break" && session.break_started_at) {
                    const breakStartMs = new Date(session.break_started_at).getTime();
                    diffMs -= (nowMs - breakStartMs);
                  }
                  exactSeconds += Math.max(0, diffMs) / 1000;
                }
              });

              // Calculate break time
              let breakSeconds = session ? (session.break_seconds || 0) : 0;
              if (session && session.status === "break" && session.break_started_at) {
                breakSeconds += Math.max(0, nowMs - new Date(session.break_started_at).getTime()) / 1000;
              }

              let displayStatus = "Offline";
              let statusColor = "bg-neutral-500/10 text-neutral-400 border-neutral-500/20";
              let dotColor = "bg-neutral-500";

              if (!session) {
                displayStatus = "Offline";
              } else if (session.status === "ended") {
                displayStatus = "Ended";
                statusColor = "bg-neutral-500/10 text-neutral-400 border-neutral-500/20";
                dotColor = "bg-neutral-500";
              } else if (session.status === "break") {
                displayStatus = "Break";
                statusColor = "bg-amber-500/10 text-amber-400 border-amber-500/20";
                dotColor = "bg-amber-500 animate-pulse";
              } else if (session.status === "active" && activeBlock) {
                displayStatus = "Working";
                statusColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
                dotColor = "bg-emerald-500 animate-pulse";
              } else if (session.status === "active" && !activeBlock) {
                displayStatus = "Open";
                statusColor = "bg-blue-500/10 text-blue-400 border-blue-500/20";
                dotColor = "bg-blue-500";
              }

              let currentWorkLabel = "Offline";
              if (displayStatus === "Working" && activeBlock) {
                const source = activeBlock.source_type === 'project_task' ? 'Project Task' : activeBlock.source_type === 'legacy_assignment' ? 'Legacy Assignment' : 'Manual Work';
                currentWorkLabel = `[${source}] ${activeBlock.title}`;
              } else if (displayStatus === "Break") {
                const source = activeBlock ? (activeBlock.source_type === 'project_task' ? 'Project Task' : activeBlock.source_type === 'legacy_assignment' ? 'Legacy Assignment' : 'Manual Work') : null;
                currentWorkLabel = activeBlock ? `[${source}] ${activeBlock.title} (Paused)` : "No active task (Paused)";
              } else if (displayStatus === "Open") {
                currentWorkLabel = "No active task";
              } else if (displayStatus === "Ended") {
                currentWorkLabel = "Workday Ended";
              }

              return (
                <tr key={member.id} className="group hover:bg-neutral-800/20 transition-colors">
                  <td className="py-3">
                    <span className="font-semibold text-neutral-200 group-hover:text-white transition-colors">
                      {member.name}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColor}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`}></span>
                      {displayStatus}
                    </div>
                  </td>
                  <td className="py-3 text-neutral-300 truncate max-w-[200px]" title={currentWorkLabel}>
                    {currentWorkLabel}
                  </td>
                  <td className="py-3 text-right font-mono text-neutral-300">
                    {formatDuration(exactSeconds)}
                  </td>
                  <td className="py-3 text-right font-mono text-neutral-400">
                    {formatDuration(breakSeconds)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
