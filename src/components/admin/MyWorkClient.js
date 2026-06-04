"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { startWork, takeBreak, resumeWork, endWork, markAssignmentDone, finishCurrentWork } from "@/lib/admin/actions";
import StatusBadge from "./StatusBadge";
import WorkTimer from "./WorkTimer";
import AssignmentCard from "./AssignmentCard";
import DailyWorkLogForm from "./DailyWorkLogForm";
import { formatDateTime } from "@/lib/admin/time";
import { Loader2, AlertCircle, CheckCircle2, Play, CornerDownRight } from "lucide-react";

function ActiveBlockTimer({ startedAt }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!startedAt) return;
    const start = new Date(startedAt).getTime();
    const update = () => {
      const now = new Date().getTime();
      setSeconds(Math.max(0, Math.floor((now - start) / 1000)));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startedAt]);

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return (
    <span className="font-mono text-emerald-450 font-bold tracking-tight">
      {String(hrs).padStart(2, "0")}:{String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </span>
  );
}

export default function MyWorkClient({ initialData }) {
  const router = useRouter();
  const { profile, todaySession, todayLog, todayAssignments, tomorrowAssignments, todayWorkBlocks = [] } = initialData;

  const [currentWorkTitle, setCurrentWorkTitle] = useState("");
  const [currentWorkNote, setCurrentWorkNote] = useState("");
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const status = todaySession ? todaySession.status : "offline";
  const isWorking = status === "active" || status === "break";
  const isEnded = status === "ended";

  const activeBlock = todayWorkBlocks.find(b => b.status === "active");

  const clearMessages = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleFinishCurrentWork = async () => {
    setIsLoading(true);
    clearMessages();

    try {
      const res = await finishCurrentWork();
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setSuccessMsg("Current work block finished successfully.");
        router.refresh();
      }
    } catch (err) {
      setErrorMsg("Failed to finish current work block.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualStart = async (e) => {
    e.preventDefault();
    if (!currentWorkTitle.trim()) {
      setErrorMsg("Please enter what you are working on.");
      return;
    }

    setIsLoading(true);
    clearMessages();

    try {
      const res = await startWork({
        currentWorkTitle,
        currentWorkNote,
        assignmentId: selectedAssignmentId
      });

      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setSuccessMsg("Session started successfully!");
        setCurrentWorkTitle("");
        setCurrentWorkNote("");
        setSelectedAssignmentId(null);
        router.refresh();
      }
    } catch (err) {
      setErrorMsg("Failed to start session.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartAssignment = async (title, id) => {
    setIsLoading(true);
    clearMessages();

    try {
      const res = await startWork({
        currentWorkTitle: title,
        currentWorkNote: `Working on assignment: ${title}`,
        assignmentId: id
      });

      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setSuccessMsg(`Started work on: "${title}"`);
        router.refresh();
      }
    } catch (err) {
      setErrorMsg("Failed to start assignment work.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTakeBreak = async () => {
    setIsLoading(true);
    clearMessages();

    try {
      const res = await takeBreak();
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setSuccessMsg("Break started.");
        router.refresh();
      }
    } catch (err) {
      setErrorMsg("Failed to start break.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResumeWork = async () => {
    setIsLoading(true);
    clearMessages();

    try {
      const res = await resumeWork();
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setSuccessMsg("Work resumed.");
        router.refresh();
      }
    } catch (err) {
      setErrorMsg("Failed to resume work.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndWork = async () => {
    if (!confirm("Are you sure you want to end work for today? This will record your total time and cannot be restarted.")) {
      return;
    }

    setIsLoading(true);
    clearMessages();

    try {
      const res = await endWork();
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setSuccessMsg("Work session ended successfully.");
        router.refresh();
      }
    } catch (err) {
      setErrorMsg("Failed to end work session.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAssignmentDone = async (id) => {
    setIsLoading(true);
    clearMessages();

    try {
      const res = await markAssignmentDone(id);
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setSuccessMsg("Assignment marked as completed!");
        router.refresh();
      }
    } catch (err) {
      setErrorMsg("Failed to update assignment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto font-sans animate-fade-in">
      
      {/* Left Column: Timer & Controls */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Status Dashboard Header */}
        <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs text-neutral-400 font-semibold uppercase tracking-widest block mb-1">
                Tracker
              </span>
              <h2 className="text-2xl font-extrabold text-neutral-100 tracking-tight">
                My Work — {profile?.name}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-400 font-medium">
                {formatDateTime(new Date().toISOString(), false)}
              </span>
              <StatusBadge status={status} />
            </div>
          </div>

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

          {/* Current Active Work Block Display */}
          {activeBlock && (
            <div className="mb-6 p-4 bg-neutral-950/30 border border-neutral-850/60 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold block mb-1">
                    Current Active Task
                  </span>
                  <h3 className="text-base font-bold text-neutral-200 flex items-center gap-2">
                    <CornerDownRight className="h-4 w-4 text-emerald-400 shrink-0" />
                    {activeBlock.title}
                  </h3>
                  {activeBlock.note && (
                    <p className="text-xs text-neutral-400 pl-6 mt-1 italic">
                      &ldquo;{activeBlock.note}&rdquo;
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4 text-xs text-neutral-500 mt-3 pl-6">
                    <span>Started: {formatDateTime(activeBlock.started_at)}</span>
                    {status === "break" && (
                      <span className="text-amber-400 font-medium">Break pauses daily timer only</span>
                    )}
                  </div>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold block mb-1">
                    Task Elapsed
                  </span>
                  <div className="text-xl">
                    <ActiveBlockTimer startedAt={activeBlock.started_at} />
                  </div>
                </div>
              </div>

              {status === "active" && (
                <div className="mt-4 pl-6">
                  <button
                    onClick={handleFinishCurrentWork}
                    disabled={isLoading}
                    className="py-1.5 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 text-xs font-bold rounded-lg transition-all duration-200 flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    )}
                    Finish Current Work
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Timer Display Widget */}
          <div className="mb-6">
            <WorkTimer session={todaySession} />
          </div>

          {/* Live Action Timer Controls */}
          <div className="flex items-center gap-3">
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                <span>Processing...</span>
              </div>
            )}

            {!isLoading && status === "active" && (
              <>
                <button
                  onClick={handleTakeBreak}
                  className="flex-grow py-3 px-4 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-amber-500/40 text-amber-400 text-sm font-bold rounded-xl transition-all duration-200"
                >
                  Take Break
                </button>
                <button
                  onClick={handleEndWork}
                  className="flex-grow py-3 px-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 text-sm font-bold rounded-xl transition-all duration-200"
                >
                  End Work
                </button>
              </>
            )}

            {!isLoading && status === "break" && (
              <>
                <button
                  onClick={handleResumeWork}
                  className="flex-grow py-3 px-4 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 text-sm font-bold rounded-xl transition-all duration-200"
                >
                  Resume Work
                </button>
                <button
                  onClick={handleEndWork}
                  className="flex-grow py-3 px-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 text-sm font-bold rounded-xl transition-all duration-200"
                >
                  End Work
                </button>
              </>
            )}

            {isEnded && (
              <div className="w-full py-4 text-center border border-dashed border-neutral-800 rounded-xl bg-neutral-950/20">
                <span className="text-sm font-semibold text-neutral-500">
                  Work ended for today. Excellent job!
                </span>
              </div>
            )}
          </div>

          {/* Today's Work Blocks list */}
          {todayWorkBlocks.length > 0 && (
            <div className="mt-8 pt-6 border-t border-neutral-800/80">
              <h3 className="text-sm font-bold text-neutral-200 mb-4 flex items-center justify-between">
                <span>Today's Completed Work</span>
                <span className="text-xs text-neutral-500 font-medium">
                  {todayWorkBlocks.length} block{todayWorkBlocks.length !== 1 ? "s" : ""}
                </span>
              </h3>
              <div className="space-y-3">
                {todayWorkBlocks.map((block) => {
                  const linkedAssignment = todayAssignments.find(a => a.id === block.assignment_id) || 
                                           tomorrowAssignments.find(a => a.id === block.assignment_id);
                  const isBlockActive = block.status === "active";
                  const formatBlockDuration = (minutes) => {
                    if (!minutes || minutes <= 0) return "0m";
                    const hrs = Math.floor(minutes / 60);
                    const mins = minutes % 60;
                    if (hrs > 0) {
                      return `${hrs}h ${mins}m`;
                    }
                    return `${mins}m`;
                  };
                  return (
                    <div 
                      key={block.id} 
                      className={`p-3.5 rounded-xl border text-xs transition-all duration-200 ${
                        isBlockActive 
                          ? "bg-emerald-950/5 border-emerald-500/20" 
                          : "bg-neutral-950/20 border-neutral-800/40 hover:border-neutral-700/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-neutral-200">{block.title}</span>
                            {linkedAssignment && (
                              <span className="text-[10px] bg-neutral-850 text-neutral-400 px-1.5 py-0.5 rounded">
                                Assignment: {linkedAssignment.title}
                              </span>
                            )}
                          </div>
                          {block.note && (
                            <p className="text-neutral-400 italic font-light">&ldquo;{block.note}&rdquo;</p>
                          )}
                          <div className="text-[10px] text-neutral-500 flex items-center gap-2">
                            <span>Started: {formatDateTime(block.started_at, true)}</span>
                            {block.ended_at && (
                              <span>• Ended: {formatDateTime(block.ended_at, true)}</span>
                            )}
                          </div>
                        </div>

                        <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                          <span className={`text-[9px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded ${
                            isBlockActive 
                              ? "bg-emerald-500/10 text-emerald-400 animate-pulse" 
                              : block.status === "done" 
                                ? "bg-neutral-800 text-neutral-400" 
                                : "bg-red-500/10 text-red-400"
                          }`}>
                            {block.status}
                          </span>
                          {!isBlockActive && (
                            <span className="font-mono font-medium text-neutral-400">
                              {formatBlockDuration(block.total_minutes)}
                            </span>
                          )}
                          {isBlockActive && (
                            <span className="font-mono font-medium text-emerald-455">
                              <ActiveBlockTimer startedAt={block.started_at} />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Manual Tracker Start Form */}
        {((!isWorking && !isEnded) || (status === "active" && !activeBlock)) && (
          <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
            <h3 className="text-lg font-bold text-neutral-100 mb-4">
              {status === "active" ? "Start Next Work" : "Start Work Session"}
            </h3>
            
            <form onSubmit={handleManualStart} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                  What are you working on now? <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Website layout adjustments, Supabase APIs..."
                  value={currentWorkTitle}
                  onChange={(e) => setCurrentWorkTitle(e.target.value)}
                  className="w-full bg-neutral-950/40 border border-neutral-800/80 rounded-xl px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                  Task Note / Context (Optional)
                </label>
                <textarea
                  placeholder="Additional context on current work..."
                  value={currentWorkNote}
                  onChange={(e) => setCurrentWorkNote(e.target.value)}
                  rows={2}
                  className="w-full bg-neutral-950/40 border border-neutral-800/80 rounded-xl px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              {todayAssignments.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                    Associate with Today's Assignment (Optional)
                  </label>
                  <select
                    value={selectedAssignmentId || ""}
                    onChange={(e) => setSelectedAssignmentId(e.target.value || null)}
                    className="w-full bg-neutral-950/40 border border-neutral-800/80 rounded-xl px-3 py-2 text-sm text-neutral-300 focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="" className="bg-neutral-950 text-neutral-400">-- None --</option>
                    {todayAssignments
                      .filter(a => a.status !== "done")
                      .map(a => (
                        <option key={a.id} value={a.id} className="bg-neutral-950 text-neutral-200">
                          {a.title}
                        </option>
                      ))
                    }
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4 fill-emerald-950" />
                )}
                Start Work
              </button>
            </form>
          </div>
        )}

        {/* EOD Work Log Form */}
        <DailyWorkLogForm initialLog={todayLog} hasSession={!!todaySession} />

      </div>

      {/* Right Column: Assignments */}
      <div className="space-y-8">
        
        {/* Today's Assignments */}
        <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
          <h3 className="text-base font-bold text-neutral-100 mb-4 flex items-center justify-between">
            <span>Today's Assignments</span>
            <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full font-medium">
              {todayAssignments.length}
            </span>
          </h3>

          {todayAssignments.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-neutral-800/60 rounded-xl bg-neutral-950/10">
              <span className="text-xs text-neutral-500 font-medium">
                No tasks assigned for today.
              </span>
            </div>
          ) : (
            <div className="space-y-3">
              {todayAssignments.map(assignment => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  isWorking={!!activeBlock}
                  isEnded={isEnded}
                  currentAssignmentId={todaySession?.assignment_id}
                  onStartWork={handleStartAssignment}
                  onMarkDone={handleMarkAssignmentDone}
                />
              ))}
            </div>
          )}
        </div>

        {/* Tomorrow's Assignments */}
        <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl animate-fade-in">
          <h3 className="text-base font-bold text-neutral-100 mb-4 flex items-center justify-between">
            <span>Tomorrow's Assignments</span>
            <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full font-medium">
              {tomorrowAssignments.length}
            </span>
          </h3>

          {tomorrowAssignments.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-neutral-800/60 rounded-xl bg-neutral-950/10">
              <span className="text-xs text-neutral-500 font-medium">
                No tasks assigned for tomorrow yet.
              </span>
            </div>
          ) : (
            <div className="space-y-3">
              {tomorrowAssignments.map(assignment => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  isWorking={false}
                  readOnly={true}
                />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
