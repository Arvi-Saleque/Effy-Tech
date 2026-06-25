"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { startWork, takeBreak, resumeWork, endWork, markAssignmentDone, finishCurrentWorkForNow, completeCurrentTask } from "@/lib/admin/actions";
import StatusBadge from "./StatusBadge";
import WorkTimer from "./WorkTimer";
import { formatDateTime, formatDuration } from "@/lib/admin/time";
import { Loader2, AlertCircle, CheckCircle2, Play, CornerDownRight, ClipboardList, Calendar, Coffee, Clock } from "lucide-react";

function ActiveBlockTimer({ startedAt, session, previousAccumulatedMs = 0 }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!startedAt) return;
    const start = new Date(startedAt).getTime();
    const update = () => {
      const now = new Date().getTime();
      let elapsedMs = now - start;

      // If session is currently on break, subtract the live break duration
      if (session && session.status === "break" && session.break_started_at) {
        const breakStart = new Date(session.break_started_at).getTime();
        const currentBreakMs = now - breakStart;
        elapsedMs -= currentBreakMs;
      }

      setSeconds(Math.max(0, Math.floor((elapsedMs + previousAccumulatedMs) / 1000)));
    };
    update();

    if (session && session.status === "break") {
      // Freeze timer during break, do not set interval
      return;
    }

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startedAt, session]);

  const formatSecs = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return <span className="font-mono text-emerald-450 font-bold">{formatSecs(seconds)}</span>;
}

export default function MyWorkClient({ initialData }) {
  const router = useRouter();
  const { profile, todaySession, todayWorkBlocks = [], myTasks = [], recentDoneTasks = [], projectTasks = [] } = initialData;

  const mappedProjectTasks = projectTasks.map(pt => {
    let mappedStatus = "pending";
    if (["backlog", "todo"].includes(pt.status)) mappedStatus = "pending";
    if (["in_progress", "blocked", "review"].includes(pt.status)) mappedStatus = "in_progress";
    if (pt.status === "done") mappedStatus = "done";
    
    return {
      ...pt,
      is_project_task: true,
      mapped_status: mappedStatus
    };
  });

  const allPending = [
    ...myTasks.filter(t => t.status === "pending"),
    ...mappedProjectTasks.filter(t => t.mapped_status === "pending")
  ];

  const allInProgress = [
    ...myTasks.filter(t => t.status === "in_progress"),
    ...mappedProjectTasks.filter(t => t.mapped_status === "in_progress")
  ];

  const allDone = [
    ...recentDoneTasks,
    ...mappedProjectTasks.filter(t => t.mapped_status === "done")
  ];

  const [optimisticState, setOptimisticState] = useState(null);
  
  useEffect(() => {
    setOptimisticState(null);
  }, [todaySession, todayWorkBlocks, myTasks, projectTasks]);

  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isPageLoading = isLoading || isPending;
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const baseStatus = todaySession ? todaySession.status : "offline";
  const status = optimisticState?.action === "take_break" ? "break"
               : optimisticState?.action === "resume" ? "active"
               : baseStatus;
               
  const isWorking = status === "active" || status === "break";
  const isEnded = status === "ended" || optimisticState?.action === "end_work";

  let activeBlock = todayWorkBlocks.find(b => b.status === "active");
  if (optimisticState) {
    if (optimisticState.action === "finish" || optimisticState.action === "complete" || optimisticState.action === "end_work") {
      activeBlock = null;
    } else if (optimisticState.action === "start" || optimisticState.action === "resume") {
      activeBlock = {
        status: "active",
        assignment_id: optimisticState.isProjectTask === false ? optimisticState.taskId : activeBlock?.assignment_id,
        project_task_id: optimisticState.isProjectTask === true ? optimisticState.taskId : activeBlock?.project_task_id,
        started_at: optimisticState.timestamp ? new Date(optimisticState.timestamp).toISOString() : (activeBlock?.started_at || new Date().toISOString()),
        source_type: optimisticState.isProjectTask ? "project_task" : "legacy_assignment",
      };
    }
  }

  const completedWorkBlocks = todayWorkBlocks.filter(b => b.status === "done");

  let activeBlockAccumulatedMs = 0;
  if (activeBlock) {
    const taskId = activeBlock.assignment_id || activeBlock.project_task_id;
    if (taskId) {
      completedWorkBlocks.forEach(b => {
        if (b.assignment_id === taskId || b.project_task_id === taskId) {
          if (b.started_at && b.ended_at) {
            activeBlockAccumulatedMs += new Date(b.ended_at).getTime() - new Date(b.started_at).getTime();
          } else {
            activeBlockAccumulatedMs += (b.total_minutes || 0) * 60000;
          }
        }
      });
    }
  }

  // Derived display status
  let displayStatus = "offline";
  if (!todaySession && !optimisticState) {
    displayStatus = "offline";
  } else if (isEnded) {
    displayStatus = "workday_ended";
  } else if (status === "break") {
    displayStatus = "break";
  } else if (status === "active" || optimisticState?.action === "start") {
    displayStatus = activeBlock ? "task_active" : "workday_open";
  }

  const clearMessages = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleFinishCurrentWorkForNow = async () => {
    setOptimisticState({ action: "finish" });
    clearMessages();

    try {
      const res = await finishCurrentWorkForNow();
      if (res.error) {
        setOptimisticState(null);
        setErrorMsg(res.error);
      } else {
        setSuccessMsg("Task paused for now. It remains In Progress.");
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (err) {
      setOptimisticState(null);
      setErrorMsg("Failed to pause task.");
    }
  };

  const handleCompleteCurrentTask = async () => {
    setOptimisticState({ action: "complete" });
    clearMessages();

    try {
      const res = await completeCurrentTask();
      if (res.error) {
        setOptimisticState(null);
        setErrorMsg(res.error);
      } else {
        setSuccessMsg("Task completed and moved to Done!");
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (err) {
      setOptimisticState(null);
      setErrorMsg("Failed to complete task.");
    }
  };


  const handleStartAssignment = async (title, id, isProjectTask = false) => {
    setOptimisticState({ action: "start", taskId: id, title, isProjectTask, timestamp: Date.now() });
    clearMessages();

    try {
      const res = await startWork({
        currentWorkTitle: title,
        currentWorkNote: `Working on ${isProjectTask ? "project task" : "assignment"}: ${title}`,
        assignmentId: id,
        sourceType: isProjectTask ? "project_task" : "legacy_assignment"
      });

      if (res.error) {
        setOptimisticState(null);
        setErrorMsg(res.error);
      } else {
        setSuccessMsg(`Started task: "${title}"`);
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (err) {
      setOptimisticState(null);
      setErrorMsg(`Failed to start ${isProjectTask ? "project task" : "assignment"}.`);
    }
  };

  const handleTakeBreak = async () => {
    setOptimisticState({ action: "take_break", timestamp: Date.now() });
    clearMessages();

    try {
      const res = await takeBreak();
      if (res.error) {
        setOptimisticState(null);
        setErrorMsg(res.error);
      } else {
        setSuccessMsg("Task paused.");
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (err) {
      setOptimisticState(null);
      setErrorMsg("Failed to pause task.");
    }
  };

  const handleResumeWork = async () => {
    setOptimisticState({ action: "resume" });
    clearMessages();

    try {
      const res = await resumeWork();
      if (res.error) {
        setOptimisticState(null);
        setErrorMsg(res.error);
      } else {
        setSuccessMsg("Task resumed.");
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (err) {
      setOptimisticState(null);
      setErrorMsg("Failed to resume task.");
    }
  };

  const handleEndWork = async () => {
    const firstConfirm = confirm(
      "End full workday for today? This is not for finishing one task. Use 'Finish This Task' if you only completed the current task."
    );
    if (!firstConfirm) return;

    const secondConfirm = confirm(
      "Final confirmation: this will close your full workday, calculate today's total time, auto-finish any active task, and you cannot start another task today. Continue?"
    );
    if (!secondConfirm) return;

    setOptimisticState({ action: "end_work" });
    clearMessages();

    try {
      const res = await endWork();
      if (res.error) {
        setOptimisticState(null);
        setErrorMsg(res.error);
      } else {
        setSuccessMsg("Workday ended successfully.");
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (err) {
      setOptimisticState(null);
      setErrorMsg("Failed to end workday.");
    }
  };

  const renderBoardTaskCard = (task, buttonText, isProjectTask = false) => {
    const isDone = isProjectTask ? task.mapped_status === "done" : task.status === "done";
    const isCurrentlyTracking = !isProjectTask && activeBlock && activeBlock.assignment_id === task.id;

    const label = isProjectTask ? task.status.replace("_", " ") : "";

    const cardClasses = `p-4 rounded-xl border transition-all duration-200 text-left block w-full ${
      isCurrentlyTracking 
        ? "bg-emerald-950/15 border-emerald-500/40" 
        : isDone 
          ? "bg-neutral-950/10 border-neutral-800/40 opacity-70"
          : "bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700/60"
    } ${isProjectTask ? "cursor-pointer hover:bg-neutral-800/40" : ""}`;

    const cardContent = (
      <>
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="space-y-1">
            <h5 className={`font-semibold text-sm ${isDone ? "line-through text-neutral-400" : "text-neutral-200"}`}>
              {task.title}
            </h5>
            {isProjectTask ? (
              <p className={`text-xs leading-relaxed whitespace-pre-wrap ${isDone ? "text-neutral-500" : "text-neutral-450"}`}>
                <span className="font-medium text-blue-400">{task.projects?.name}</span>
                {task.projects?.clients?.name && ` • ${task.projects.clients.name}`}
              </p>
            ) : (
              task.description && (
                <p className={`text-xs leading-relaxed whitespace-pre-wrap ${isDone ? "text-neutral-500" : "text-neutral-450"}`}>
                  {task.description}
                </p>
              )
            )}
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            {isProjectTask && (
              <span className="text-[9px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                Project Task
              </span>
            )}
            <span className={`text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded border shrink-0 ${
              isDone ? "bg-neutral-850 border-neutral-800 text-neutral-450" :
              (!isProjectTask ? task.status === "in_progress" : task.mapped_status === "in_progress") ? "bg-blue-500/10 border-blue-500/20 text-blue-400" :
              "bg-amber-500/10 border-amber-500/20 text-amber-400"
            }`}>
              {isDone ? "Done" : (!isProjectTask ? task.status === "in_progress" : task.mapped_status === "in_progress") ? "In Progress" : "To Do"}
            </span>
          </div>
        </div>

        {isProjectTask && (
           <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-neutral-500 font-mono mb-2 mt-2">
             <span className="capitalize">Priority: {task.priority}</span>
             <span>Progress: {task.progress_percent || 0}%</span>
             {task.due_date && <span>Due: {task.due_date}</span>}
             <span className="capitalize">Status: {label}</span>
           </div>
        )}

        {!isProjectTask && task.work_date && (
          <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-mono mb-2">
            <Calendar className="h-3 w-3" />
            <span>Target: {task.work_date}</span>
          </div>
        )}

        {/* Action Button */}
        {buttonText && !isEnded && (
          <div className="pt-2 border-t border-neutral-800/40 flex justify-end">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleStartAssignment(task.title, task.id, isProjectTask); }}
              disabled={!!activeBlock || isEnded || !!optimisticState}
              title={activeBlock ? "Finish or complete the active task first." : ""}
              className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 disabled:text-neutral-600 disabled:border-neutral-800/50 disabled:bg-transparent text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="h-3 w-3 fill-emerald-400/20" />
              {buttonText}
            </button>
          </div>
        )}
      </>
    );

    return (
      <div 
        key={task.id} 
        className={cardClasses}
        onClick={() => {
          if (isProjectTask) router.push(`/admin/projects/${task.project_id}/tasks/${task.id}`);
        }}
      >
        {cardContent}
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans animate-fade-in">
      
      {/* Top Banner and Status Badges */}
      <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
            <StatusBadge status={displayStatus} />
          </div>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-2.5 text-xs">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center gap-2.5 text-xs">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      {/* Live Timer and Active Task Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Ticking Timer & Active Task Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Active Task Card */}
          {activeBlock && (
            <div className="p-6 bg-neutral-900/60 border border-emerald-500/30 rounded-2xl shadow-lg shadow-emerald-950/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-4 border-b border-neutral-800/60">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold block">
                      Current Active Task
                    </span>
                    {status === "break" && (
                      <span className="text-[9px] bg-amber-500/15 border border-amber-500/30 text-amber-400 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                        Paused / On Break
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-extrabold text-neutral-100 flex items-center gap-2">
                    <CornerDownRight className="h-5 w-5 text-emerald-400 shrink-0" />
                    {activeBlock.title}
                  </h3>
                  {activeBlock.note && (
                    <p className="text-xs text-neutral-450 pl-7 italic leading-relaxed">
                      &ldquo;{activeBlock.note}&rdquo;
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4 text-xs text-neutral-500 pl-7 pt-1">
                    <span>Started: {formatDateTime(activeBlock.started_at)}</span>
                    {status === "break" && (
                      <span className="text-amber-400 font-medium italic">Break pauses daily timer only</span>
                    )}
                  </div>
                </div>
                
                <div className="sm:text-right shrink-0 bg-neutral-950/30 border border-neutral-800/40 p-4 rounded-xl">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold block mb-1">
                    Task Elapsed
                  </span>
                  <div className="text-2xl">
                    <ActiveBlockTimer startedAt={activeBlock.started_at} session={todaySession} previousAccumulatedMs={activeBlockAccumulatedMs} />
                  </div>
                </div>
              </div>

              {/* Task Actions (Pause / Resume / Finish / Complete) */}
              <div className="mt-5 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  {optimisticState ? (
                    <div className="flex items-center gap-2 text-xs text-neutral-400 py-2">
                      <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      {status === "active" && (
                        <>
                          <button
                            onClick={handleTakeBreak}
                            className="py-2.5 px-4 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 hover:border-amber-500/40 text-amber-400 text-xs font-bold rounded-lg transition-all duration-200"
                          >
                            Pause / Break
                          </button>
                          <button
                            onClick={handleFinishCurrentWorkForNow}
                            className="py-2.5 px-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/25 hover:border-blue-500/40 text-blue-400 text-xs font-bold rounded-lg transition-all duration-200 flex items-center gap-1.5"
                          >
                            <Play className="h-3.5 w-3.5 fill-blue-400/20" />
                            Finish For Now
                          </button>
                          <button
                            onClick={handleCompleteCurrentTask}
                            className="py-2.5 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 hover:border-emerald-500/40 text-emerald-450 text-xs font-bold rounded-lg transition-all duration-200 flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Complete Task
                          </button>
                        </>
                      )}
                      {status === "break" && (
                        <>
                          <button
                            onClick={handleResumeWork}
                            className="py-2.5 px-4 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 text-xs font-bold rounded-lg transition-all duration-200"
                          >
                            Resume Task
                          </button>
                          <button
                            disabled
                            title="Resume task first to pause"
                            className="py-2.5 px-4 bg-neutral-950/20 border border-neutral-900 text-neutral-600 text-xs font-bold rounded-lg opacity-50 cursor-not-allowed flex items-center gap-1.5"
                          >
                            <Play className="h-3.5 w-3.5" />
                            Finish For Now
                          </button>
                          <button
                            disabled
                            title="Resume task first to complete"
                            className="py-2.5 px-4 bg-neutral-950/20 border border-neutral-900 text-neutral-600 text-xs font-bold rounded-lg opacity-50 cursor-not-allowed flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Complete Task
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* Explanation text */}
                {!optimisticState && status === "active" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-neutral-800/40 text-[11px] text-neutral-500 leading-relaxed">
                    <p>
                      <strong className="text-blue-400/80">Finish For Now:</strong> Stops the timer but keeps this task In Progress.
                    </p>
                    <p>
                      <strong className="text-emerald-450/90">Complete Task:</strong> Stops the timer and moves this task to Done.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Today's worked hours ticker widget */}
          <WorkTimer session={todaySession} workBlocks={todayWorkBlocks} />

          {/* Workday ended banner */}
          {isEnded && (
            <div className="w-full py-4 text-center border border-dashed border-neutral-800 rounded-xl bg-neutral-950/20">
              <span className="text-sm font-semibold text-neutral-500">
                Work ended for today. Excellent job!
              </span>
            </div>
          )}

          {/* End Full Workday Danger Zone */}
          {todaySession && (status === "active" || status === "break") && !isEnded && (
            <div className="p-5 bg-red-950/5 border border-red-500/10 rounded-2xl space-y-3 shadow-sm shadow-red-950/5">
              <div>
                <h4 className="text-sm font-extrabold text-red-400 uppercase tracking-wider">
                  End Full Workday
                </h4>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                  {!activeBlock && (
                    <span className="block text-red-405 font-bold mb-1.5">
                      No task is currently active. Use this only if your full workday is finished.
                    </span>
                  )}
                  Use this only when you are completely finished for today. After ending the workday, you cannot start another task today.
                </p>
              </div>
              <div className="pt-1">
                <button
                  onClick={handleEndWork}
                  disabled={!!optimisticState}
                  className="py-2.5 px-5 bg-red-500/15 hover:bg-red-500/25 border border-red-500/20 hover:border-red-500/40 text-red-400 text-xs font-bold rounded-xl transition-all duration-200 disabled:opacity-50"
                >
                  End Full Workday
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Active status notice and Manual Task Form */}
        <div className="lg:col-span-1 space-y-6">
          {/* Empty state instruction card when no task is active */}
          {!activeBlock && !isEnded && (
            <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl space-y-3">
              <div className="flex items-center gap-2 text-teal-400">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <h3 className="text-base font-bold text-neutral-100">No task is active</h3>
              </div>
              {myTasks.length > 0 ? (
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Start a task from your board below. Tasks move from To Do &rarr; In Progress &rarr; Done.
                </p>
              ) : (
                <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                  No assigned tasks available. Ask an admin/founder to create a task from the dashboard.
                </p>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Bottom Section: My Task Board */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-neutral-100 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-emerald-400" />
          My Task Board
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* To Do column */}
          <div className="bg-neutral-900/30 border border-neutral-800/60 rounded-2xl p-5 space-y-4 min-h-[350px]">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800/40">
              <h4 className="text-sm font-bold text-neutral-300">To Do</h4>
              <span className="px-2 py-0.5 text-xs font-semibold bg-neutral-800 text-neutral-400 rounded-md">
                {allPending.length}
              </span>
            </div>
            <div className="space-y-3">
              {allPending.length === 0 ? (
                <div className="text-center py-12 text-xs text-neutral-600 italic">No tasks in To Do.</div>
              ) : (
                allPending.map(task => renderBoardTaskCard(task, "Start Task", task.is_project_task))
              )}
            </div>
          </div>

          {/* In Progress column */}
          <div className="bg-neutral-900/30 border border-neutral-800/60 rounded-2xl p-5 space-y-4 min-h-[350px]">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800/40">
              <h4 className="text-sm font-bold text-blue-400">In Progress</h4>
              <span className="px-2 py-0.5 text-xs font-semibold bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20">
                {allInProgress.length}
              </span>
            </div>
            <div className="space-y-3">
              {allInProgress.length === 0 ? (
                <div className="text-center py-12 text-xs text-neutral-600 italic">No tasks In Progress.</div>
              ) : (
                allInProgress.map(task => renderBoardTaskCard(task, "Continue Task", task.is_project_task))
              )}
            </div>
          </div>

          {/* Done column */}
          <div className="bg-neutral-900/30 border border-neutral-800/60 rounded-2xl p-5 space-y-4 min-h-[350px]">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800/40">
              <h4 className="text-sm font-bold text-emerald-400">Done</h4>
              <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20">
                {allDone.length}
              </span>
            </div>
            <div className="space-y-3">
              {allDone.length === 0 ? (
                <div className="text-center py-12 text-xs text-neutral-600 italic">No recently completed tasks.</div>
              ) : (
                allDone.map(task => renderBoardTaskCard(task, null, task.is_project_task))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Completed work blocks summary list at the bottom of the page */}
      {completedWorkBlocks.length > 0 && (
        <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
          <h3 className="text-sm font-bold text-neutral-200 mb-4 flex items-center justify-between">
            <span>Completed Work Blocks Today</span>
            <span className="text-xs text-neutral-500 font-medium">
              {completedWorkBlocks.length} block{completedWorkBlocks.length !== 1 ? "s" : ""}
            </span>
          </h3>
          <div className="space-y-3">
            {completedWorkBlocks.map((block) => {
              const linkedLegacy = myTasks.find(a => a.id === block.assignment_id) || 
                                       recentDoneTasks.find(a => a.id === block.assignment_id);
              const linkedProjectTask = projectTasks.find(p => p.id === block.project_task_id);
              
              let blockDurationSecs = 0;
              if (block.started_at && block.ended_at) {
                blockDurationSecs = Math.max(0, Math.floor((new Date(block.ended_at).getTime() - new Date(block.started_at).getTime()) / 1000));
              } else {
                blockDurationSecs = (block.total_minutes || 0) * 60;
              }

              let sourceLabel = "Manual Work";
              let taskTitle = "";
              if (block.source_type === "project_task" && linkedProjectTask) {
                sourceLabel = "Project Task";
                taskTitle = linkedProjectTask.title;
              } else if ((block.source_type === "legacy_assignment" || block.assignment_id) && linkedLegacy) {
                sourceLabel = "Legacy Assignment";
                taskTitle = linkedLegacy.title;
              }

              return (
                <div 
                  key={block.id} 
                  className="p-3.5 rounded-xl border text-xs bg-neutral-950/20 border-neutral-800/40 hover:border-neutral-700/60 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-neutral-200">{block.title || (block.source_type === "project_task" ? "Project Task Session" : "Task Session")}</span>
                        {taskTitle ? (
                          <span className="text-[10px] bg-neutral-850 text-neutral-450 px-1.5 py-0.5 rounded border border-neutral-800/40">
                            {sourceLabel}: {taskTitle}
                          </span>
                        ) : (
                          <span className="text-[10px] bg-neutral-950/20 text-neutral-505 px-1.5 py-0.5 rounded border border-neutral-800/20 italic">
                            {sourceLabel}
                          </span>
                        )}
                      </div>
                      {block.note && (
                        <p className="text-neutral-450 italic font-light">&ldquo;{block.note}&rdquo;</p>
                      )}
                      <div className="text-[10px] text-neutral-600 font-mono">
                        {formatDateTime(block.started_at)} &mdash; {formatDateTime(block.ended_at)}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-mono font-bold text-neutral-300">
                        {formatDuration(blockDurationSecs)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
