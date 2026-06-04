"use client";

import React from "react";
import { CheckCircle2, Play, Circle } from "lucide-react";

export default function AssignmentCard({ assignment, onStartWork, onMarkDone, isWorking, currentAssignmentId, isEnded, readOnly }) {
  const isInProgress = assignment.status === "in_progress";
  const isDone = assignment.status === "done";

  // Check if this assignment is currently active in the active session
  const isCurrentlyTracking = isWorking && currentAssignmentId === assignment.id;

  return (
    <div className={`p-4 rounded-xl border transition-all duration-200 ${
      isCurrentlyTracking 
        ? "bg-emerald-950/10 border-emerald-500/30" 
        : isDone 
          ? "bg-neutral-950/10 border-neutral-800/40 opacity-70"
          : "bg-neutral-900/20 border-neutral-800/80 hover:border-neutral-700/60"
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1.5">
            {isDone ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            ) : isInProgress ? (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            ) : (
              <Circle className="h-4 w-4 text-neutral-500 shrink-0" />
            )}
            <h4 className={`text-sm font-semibold tracking-tight ${isDone ? "line-through text-neutral-400" : "text-neutral-200"}`}>
              {assignment.title}
            </h4>
          </div>
          {assignment.description && (
            <p className={`text-xs ${isDone ? "text-neutral-500" : "text-neutral-400"} leading-relaxed pl-6 mb-3`}>
              {assignment.description}
            </p>
          )}
        </div>

        {/* Status indicator */}
        <span className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded ${
          isDone ? "bg-neutral-800 text-neutral-400" :
          isInProgress ? "bg-emerald-500/10 text-emerald-400" :
          "bg-neutral-800 text-neutral-400"
        }`}>
          {isDone ? "Done" : isInProgress ? "In Progress" : "Pending"}
        </span>
      </div>

      {!isDone && !readOnly && (
        <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-neutral-800/30 pl-6">
          {!isCurrentlyTracking && onStartWork && !isEnded && (
            <button
              onClick={() => onStartWork(assignment.title, assignment.id)}
              disabled={isWorking}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
              <Play className="h-3 w-3" />
              Start Work
            </button>
          )}
          
          {onMarkDone && (
            <button
              onClick={() => onMarkDone(assignment.id)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              <CheckCircle2 className="h-3 w-3" />
              Mark Done
            </button>
          )}
        </div>
      )}
    </div>
  );
}
