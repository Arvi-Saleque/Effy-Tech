"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createAssignment } from "@/lib/admin/actions";
import { calculateSessionDisplayMinutes, formatMinutes, getTodayDateString, getTomorrowDateString, calculateWorkBlocksDisplayMinutes } from "@/lib/admin/time";
import StatusBadge from "./StatusBadge";
import WorkHoursChart from "./WorkHoursChart";
import { 
  Activity, 
  Coffee, 
  Clock, 
  FileText, 
  UserPlus, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ClipboardList,
  Calendar
} from "lucide-react";

export default function DashboardClient({ initialData }) {
  const router = useRouter();
  const { profiles, sessions, logs, teamTasks = [], todayWorkBlocks = [], stats } = initialData;

  // Calculate compact assignment stats from task board
  const pendingCount = teamTasks.filter(t => t.status === "pending").length;
  const inProgressCount = teamTasks.filter(t => t.status === "in_progress").length;
  const doneCount = teamTasks.filter(t => t.status === "done").length;

  const [assignedTo, setAssignedTo] = useState("");
  const [assignTitle, setAssignTitle] = useState("");
  const [assignDesc, setAssignDesc] = useState("");
  const [workDate, setWorkDate] = useState(getTodayDateString());

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Prepare chart data: worked hours today per profile
  const chartData = profiles.map(member => {
    const memberBlocks = todayWorkBlocks.filter(b => b.user_id === member.id);
    const session = sessions.find(s => s.user_id === member.id);
    const mins = calculateWorkBlocksDisplayMinutes(memberBlocks, session);
    return {
      name: member.name,
      hours: parseFloat((mins / 60).toFixed(1))
    };
  });

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!assignedTo) {
      setErrorMsg("Please select a team member.");
      return;
    }
    if (!assignTitle.trim()) {
      setErrorMsg("Please enter a task title.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await createAssignment({
        assignedTo,
        title: assignTitle,
        description: assignDesc,
        workDate
      });

      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setSuccessMsg("Task assigned successfully!");
        setAssignTitle("");
        setAssignDesc("");
        // Retain assignedTo if they want to assign multiple tasks, or clear it
        router.refresh();
      }
    } catch (err) {
      setErrorMsg("Failed to assign task.");
    } finally {
      setIsLoading(false);
    }
  };

  const getProfileName = (id) => {
    const p = profiles.find(profile => profile.id === id);
    return p ? p.name : "Unknown User";
  };

  return (
    <div className="space-y-8 font-sans animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-neutral-400 font-semibold uppercase tracking-widest block mb-1">
            Admin
          </span>
          <h2 className="text-2xl font-extrabold text-neutral-100 tracking-tight">
            Admin Dashboard
          </h2>
        </div>
      </div>

      {/* Summary Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-neutral-900/40 border border-neutral-800/80 p-5 rounded-2xl shadow-xl backdrop-blur-xl flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider block">
              Active Now
            </span>
            <span className="text-xl font-bold text-neutral-100">{stats.activeNow}</span>
          </div>
        </div>

        <div className="bg-neutral-900/40 border border-neutral-800/80 p-5 rounded-2xl shadow-xl backdrop-blur-xl flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <Coffee className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider block">
              On Break
            </span>
            <span className="text-xl font-bold text-neutral-100">{stats.onBreak}</span>
          </div>
        </div>

        <div className="bg-neutral-900/40 border border-neutral-800/80 p-5 rounded-2xl shadow-xl backdrop-blur-xl flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider block">
              Hours Logged Today
            </span>
            <span className="text-xl font-bold text-neutral-100">{stats.totalHoursToday}h</span>
          </div>
        </div>

        <div className="bg-neutral-900/40 border border-neutral-800/80 p-5 rounded-2xl shadow-xl backdrop-blur-xl flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider block">
              Reports Submitted
            </span>
            <span className="text-xl font-bold text-neutral-100">{stats.reportsSubmitted}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Status Table & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Team Status Table */}
        <div className="lg:col-span-2 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-100 mb-4">
              Team Member Status
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-800/80 text-neutral-400 text-xs uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Member</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Current Work</th>
                    <th className="pb-3 font-semibold">Worked Today</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/40">
                  {profiles.map(member => {
                    const session = sessions.find(s => s.user_id === member.id);
                    const activeBlock = todayWorkBlocks.find(b => b.user_id === member.id && b.status === "active");
                    const memberBlocks = todayWorkBlocks.filter(b => b.user_id === member.id);
                    const workedMins = calculateWorkBlocksDisplayMinutes(memberBlocks, session);

                    let displayStatus = "offline";
                    if (!session) {
                      displayStatus = "offline";
                    } else if (session.status === "ended") {
                      displayStatus = "workday_ended";
                    } else if (session.status === "break") {
                      displayStatus = "break";
                    } else if (session.status === "active" && activeBlock) {
                      displayStatus = "task_active";
                    } else if (session.status === "active" && !activeBlock) {
                      displayStatus = "workday_open";
                    }

                    let currentWorkLabel = "Offline";
                    if (displayStatus === "task_active") {
                      currentWorkLabel = activeBlock.title;
                    } else if (displayStatus === "break") {
                      currentWorkLabel = activeBlock ? `${activeBlock.title} (Paused)` : "No active task (Paused)";
                    } else if (displayStatus === "workday_open") {
                      currentWorkLabel = "No active task";
                    } else if (displayStatus === "workday_ended") {
                      currentWorkLabel = "Workday Ended";
                    } else {
                      currentWorkLabel = "Offline";
                    }
                    
                    return (
                      <tr key={member.id} className="text-neutral-300">
                        <td className="py-3.5 font-semibold text-neutral-100">
                          {member.name}
                          <span className="block text-[10px] text-neutral-500 font-normal mt-0.5">
                            {member.email}
                          </span>
                        </td>
                        <td className="py-3.5">
                          <StatusBadge status={displayStatus} />
                        </td>
                        <td className="py-3.5 text-xs text-neutral-400 max-w-[200px] truncate">
                          {displayStatus === "task_active" || (displayStatus === "break" && activeBlock) ? (
                            <span className="text-neutral-200 font-medium">
                              {currentWorkLabel}
                            </span>
                          ) : (
                            <span className="text-neutral-500 italic">
                              {currentWorkLabel}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 font-mono text-xs text-neutral-200">
                          {formatMinutes(workedMins)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Work Hours Chart */}
        <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-100 mb-4">
              Today's Work Hours
            </h3>
            <WorkHoursChart data={chartData} />
          </div>
        </div>

      </div>

      {/* Today's Work Blocks Grouped by Founder */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-neutral-100 flex items-center gap-2">
          <Clock className="h-5 w-5 text-emerald-400" />
          Today's Work Blocks
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profiles.map(member => {
            const memberBlocks = todayWorkBlocks.filter(b => b.user_id === member.id);
            const formatBlockDuration = (minutes) => {
              if (!minutes || minutes <= 0) return "0m";
              const hrs = Math.floor(minutes / 60);
              const mins = minutes % 60;
              if (hrs > 0) return `${hrs}h ${mins}m`;
              return `${mins}m`;
            };
            const formatBlockTime = (timeStr) => {
              if (!timeStr) return "";
              const date = new Date(timeStr);
              return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            };

            return (
              <div key={member.id} className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-5 shadow-xl backdrop-blur-xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-neutral-800/60 pb-3 mb-3">
                    <h4 className="text-sm font-bold text-neutral-100">{member.name}</h4>
                    <span className="text-[10px] text-neutral-500 font-semibold uppercase font-mono">
                      {memberBlocks.length} Task{memberBlocks.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {memberBlocks.length === 0 ? (
                    <div className="text-center py-6 text-xs text-neutral-600 italic">
                      No work blocks started today.
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                      {memberBlocks.map(block => {
                        const isBlockActive = block.status === "active";
                        return (
                          <div 
                            key={block.id} 
                            className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                              isBlockActive 
                                ? "bg-emerald-950/10 border-emerald-500/25 animate-pulse" 
                                : "bg-neutral-950/30 border-neutral-800/40 hover:border-neutral-700/40"
                            }`}
                          >
                            <div className="flex justify-between items-start gap-2">
                              <span className="font-semibold text-neutral-200 break-words">{block.title}</span>
                              <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border shrink-0 ${
                                isBlockActive ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                                block.status === "done" ? "bg-neutral-800 border-neutral-700 text-neutral-400" :
                                "bg-red-500/10 border-red-500/20 text-red-400"
                              }`}>
                                {block.status}
                              </span>
                            </div>

                            {block.note && (
                              <p className="text-neutral-400 italic text-[11px]">&ldquo;{block.note}&rdquo;</p>
                            )}

                            <div className="flex justify-between items-center text-[10px] text-neutral-500 pt-1 border-t border-neutral-800/20">
                              <span>
                                {formatBlockTime(block.started_at)}
                                {block.ended_at ? ` - ${formatBlockTime(block.ended_at)}` : " - Present"}
                              </span>
                              {!isBlockActive && (
                                <span className="font-mono text-neutral-350">
                                  {formatBlockDuration(block.total_minutes)}
                                </span>
                              )}
                              {isBlockActive && (
                                <span className="font-mono text-emerald-400 font-semibold">
                                  Active
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's Work Notes Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-neutral-100">
          Today's Logs & Work Notes
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profiles.map(member => {
            const session = sessions.find(s => s.user_id === member.id);
            const log = logs.find(l => l.user_id === member.id);
            const activeBlock = todayWorkBlocks.find(b => b.user_id === member.id && b.status === "active");
            const memberBlocks = todayWorkBlocks.filter(b => b.user_id === member.id);
            const workedMins = calculateWorkBlocksDisplayMinutes(memberBlocks, session);
            const hasLog = !!log;
            const isSubmitted = !!(log && log.submitted_at);

            return (
              <div key={member.id} className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-5 shadow-xl backdrop-blur-xl space-y-3.5">
                <div className="flex items-center justify-between border-b border-neutral-800/60 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-neutral-100">{member.name}</h4>
                    <span className="text-[10px] text-neutral-500 font-medium font-mono">
                      Time: {formatMinutes(workedMins)}
                    </span>
                  </div>
                  
                  <span className={`text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded border ${
                    isSubmitted 
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                      : hasLog 
                        ? "bg-amber-500/10 border-amber-500/20 text-amber-400" 
                        : "bg-neutral-800 border-neutral-700 text-neutral-500"
                  }`}>
                    {isSubmitted ? "Submitted" : hasLog ? "Draft" : "No Activity"}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="block text-[10px] text-neutral-500 font-semibold uppercase tracking-wider mb-1">
                      Current Work
                    </span>
                    <div className="text-neutral-300">
                      {session ? (
                        session.status === "ended" ? (
                          <span className="text-neutral-500 italic">Workday Ended</span>
                        ) : session.status === "break" ? (
                          activeBlock ? (
                            <span className="text-neutral-350 font-medium">{activeBlock.title} <span className="text-amber-500/80 text-[10px] uppercase tracking-wider font-semibold">(Paused)</span></span>
                          ) : (
                            <span className="text-neutral-600 italic">No active task</span>
                          )
                        ) : session.status === "active" ? (
                          activeBlock ? (
                            <span className="text-neutral-200 font-medium">{activeBlock.title}</span>
                          ) : (
                            <span className="text-neutral-600 italic">No active task</span>
                          )
                        ) : (
                          <span className="text-neutral-650 italic">Offline</span>
                        )
                      ) : (
                        <span className="text-neutral-650 italic">Offline</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="block text-[10px] text-neutral-500 font-semibold uppercase tracking-wider mb-1">
                      Work Accomplished
                    </span>
                    <p className="text-neutral-300 line-clamp-3">
                      {log?.work_note || <span className="text-neutral-600 italic">No notes written yet</span>}
                    </p>
                  </div>

                  {log?.blockers && (
                    <div>
                      <span className="block text-[10px] text-red-400 font-semibold uppercase tracking-wider mb-1">
                        Blockers
                      </span>
                      <p className="text-red-300">{log.blockers}</p>
                    </div>
                  )}

                  {log?.tomorrow_plan && (
                    <div>
                      <span className="block text-[10px] text-neutral-500 font-semibold uppercase tracking-wider mb-1">
                        Tomorrow's Plan
                      </span>
                      <p className="text-neutral-400 line-clamp-2">{log.tomorrow_plan}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Task Board Section */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-neutral-100 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-emerald-400" />
          Team Task Board
        </h3>

        {/* Compact Assignment Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-neutral-900/30 border border-neutral-800/60 p-4 rounded-xl flex flex-col justify-between">
            <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">To Do Tasks</span>
            <span className="text-lg font-bold text-amber-400 mt-1">{pendingCount}</span>
          </div>
          <div className="bg-neutral-900/30 border border-neutral-800/60 p-4 rounded-xl flex flex-col justify-between">
            <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">In Progress Tasks</span>
            <span className="text-lg font-bold text-blue-400 mt-1">{inProgressCount}</span>
          </div>
          <div className="bg-neutral-900/30 border border-neutral-800/60 p-4 rounded-xl flex flex-col justify-between">
            <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">Completed Tasks</span>
            <span className="text-lg font-bold text-emerald-400 mt-1">{doneCount}</span>
          </div>
        </div>

        {/* Board Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* To Do */}
          <div className="bg-neutral-900/30 border border-neutral-800/60 rounded-2xl p-5 space-y-4 min-h-[350px]">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800/40">
              <h4 className="text-sm font-bold text-neutral-300">To Do</h4>
              <span className="px-2 py-0.5 text-xs font-semibold bg-neutral-800 text-neutral-400 rounded-md">
                {teamTasks.filter(t => t.status === "pending").length}
              </span>
            </div>
            <div className="space-y-3">
              {teamTasks.filter(t => t.status === "pending").length === 0 ? (
                <div className="text-center py-12 text-xs text-neutral-600 italic">No tasks in To Do.</div>
              ) : (
                teamTasks.filter(t => t.status === "pending").map(task => renderTeamTaskCard(task))
              )}
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-neutral-900/30 border border-neutral-800/60 rounded-2xl p-5 space-y-4 min-h-[350px]">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800/40">
              <h4 className="text-sm font-bold text-blue-400">In Progress</h4>
              <span className="px-2 py-0.5 text-xs font-semibold bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20">
                {teamTasks.filter(t => t.status === "in_progress").length}
              </span>
            </div>
            <div className="space-y-3">
              {teamTasks.filter(t => t.status === "in_progress").length === 0 ? (
                <div className="text-center py-12 text-xs text-neutral-600 italic">No tasks In Progress.</div>
              ) : (
                teamTasks.filter(t => t.status === "in_progress").map(task => renderTeamTaskCard(task))
              )}
            </div>
          </div>

          {/* Done */}
          <div className="bg-neutral-900/30 border border-neutral-800/60 rounded-2xl p-5 space-y-4 min-h-[350px]">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800/40">
              <h4 className="text-sm font-bold text-emerald-400">Done</h4>
              <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20">
                {teamTasks.filter(t => t.status === "done").length}
              </span>
            </div>
            <div className="space-y-3">
              {teamTasks.filter(t => t.status === "done").length === 0 ? (
                <div className="text-center py-12 text-xs text-neutral-600 italic">No completed tasks.</div>
              ) : (
                teamTasks.filter(t => t.status === "done").map(task => renderTeamTaskCard(task))
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Task Assignment Control Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Assign Work Form */}
        <div className="lg:col-span-1 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
          <h3 className="text-base font-bold text-neutral-100 mb-4 flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-emerald-400" />
            Create / Assign Task
          </h3>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-2.5 text-xs">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center gap-2.5 text-xs">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleAssign} className="space-y-4">
            <div>
              <label htmlFor="assignee" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                Team Member <span className="text-red-500">*</span>
              </label>
              <select
                id="assignee"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full bg-neutral-950/40 border border-neutral-800/80 rounded-xl px-3 py-2.5 text-sm text-neutral-300 focus:outline-none focus:border-emerald-500/50"
                required
              >
                <option value="" className="bg-neutral-950 text-neutral-400">-- Select Member --</option>
                {profiles.map(member => (
                  <option key={member.id} value={member.id} className="bg-neutral-950 text-neutral-200">
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="taskTitle" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                Work Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="taskTitle"
                placeholder="e.g. Implement contact API endpoint..."
                value={assignTitle}
                onChange={(e) => setAssignTitle(e.target.value)}
                className="w-full bg-neutral-950/40 border border-neutral-800/80 rounded-xl px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50"
                required
              />
            </div>

            <div>
              <label htmlFor="taskDesc" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                Description (Optional)
              </label>
              <textarea
                id="taskDesc"
                placeholder="Add instructions, links, requirements..."
                value={assignDesc}
                onChange={(e) => setAssignDesc(e.target.value)}
                rows={3}
                className="w-full bg-neutral-950/40 border border-neutral-800/80 rounded-xl px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div>
              <label htmlFor="workDate" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                Target Date (Optional)
              </label>
              <input
                type="date"
                id="workDate"
                value={workDate}
                onChange={(e) => setWorkDate(e.target.value)}
                className="w-full bg-neutral-950/40 border border-neutral-800/80 rounded-xl px-4 py-2 text-sm text-neutral-300 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <UserPlus className="h-4 w-4" />
              )}
              Create Task
            </button>
          </form>
        </div>

        {/* Task Management info box */}
        <div className="lg:col-span-2 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col justify-center items-center text-center">
          <ClipboardList className="h-12 w-12 text-neutral-600 mb-3" />
          <h4 className="text-neutral-300 font-bold mb-1">Task Management</h4>
          <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
            Create and assign tasks to team members. They will appear on their boards in the To Do column, and they can start tracking work blocks against them.
          </p>
        </div>

      </div>

    </div>
  );
}

// Render task card helper for team task board
const renderTeamTaskCard = (task) => {
  const isDone = task.status === "done";
  return (
    <div key={task.id} className="p-4 bg-neutral-900/60 border border-neutral-800/80 rounded-xl space-y-3 shadow-md hover:border-neutral-700/80 transition-all duration-200 text-left">
      <div>
        <h5 className={`font-semibold text-neutral-200 text-sm ${isDone ? "line-through text-neutral-450" : ""}`}>
          {task.title}
        </h5>
        {task.description && (
          <p className={`text-xs mt-1.5 leading-relaxed whitespace-pre-wrap ${isDone ? "text-neutral-500" : "text-neutral-450"}`}>
            {task.description}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5 pt-2 border-t border-neutral-800/40 text-[10px] text-neutral-500">
        <div className="flex justify-between items-center">
          <span>Assigned to: <strong className="text-neutral-300">{task.assignedToName}</strong></span>
          <span>By: <strong className="text-neutral-400">{task.assignedByName}</strong></span>
        </div>
        {task.work_date && (
          <div className="flex items-center gap-1.5 text-neutral-400 font-mono mt-0.5">
            <Calendar className="h-3 w-3 text-neutral-500" />
            <span>Target: {task.work_date}</span>
          </div>
        )}
      </div>
    </div>
  );
};
