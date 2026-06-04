"use client";

import React, { useState, useEffect } from "react";

export default function WorkTimer({ session }) {
  const [timeState, setTimeState] = useState({
    workedSeconds: 0,
    breakSeconds: 0,
  });

  useEffect(() => {
    if (!session || !session.started_at) {
      setTimeState({ workedSeconds: 0, breakSeconds: 0 });
      return;
    }

    const start = new Date(session.started_at).getTime();
    const recordedBreakMs = (session.break_minutes || 0) * 60 * 1000;

    const updateTimer = () => {
      const now = new Date().getTime();

      let workedMs = 0;
      let breakMs = recordedBreakMs;

      if (session.status === "active") {
        workedMs = now - start - recordedBreakMs;
      } else if (session.status === "break" && session.break_started_at) {
        const breakStart = new Date(session.break_started_at).getTime();
        const currentBreakMs = now - breakStart;
        breakMs = recordedBreakMs + currentBreakMs;
        workedMs = breakStart - start - recordedBreakMs;
      } else if (session.status === "ended" && session.ended_at) {
        workedMs = (session.total_minutes || 0) * 60 * 1000;
      }

      setTimeState({
        workedSeconds: Math.max(0, Math.floor(workedMs / 1000)),
        breakSeconds: Math.max(0, Math.floor(breakMs / 1000)),
      });
    };

    updateTimer();

    // Only set interval if the state is active or break
    if (session.status === "active" || session.status === "break") {
      const intervalId = setInterval(updateTimer, 1000);
      return () => clearInterval(intervalId);
    }
  }, [session]);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  if (!session || !session.started_at) {
    return (
      <div className="flex flex-col gap-1 items-center justify-center p-6 border border-neutral-800 rounded-xl bg-neutral-950/20">
        <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-medium">Worked Today</span>
        <span className="text-3xl font-mono font-bold text-neutral-600">00:00:00</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-1 items-center justify-center p-6 border border-neutral-800/80 rounded-xl bg-neutral-950/30">
        <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-medium">Worked Today</span>
        <span className="text-3xl font-mono font-bold text-emerald-400 tracking-tight">
          {formatTime(timeState.workedSeconds)}
        </span>
      </div>
      
      <div className="flex flex-col gap-1 items-center justify-center p-6 border border-neutral-800/80 rounded-xl bg-neutral-950/30">
        <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-medium">Total Break</span>
        <span className="text-3xl font-mono font-bold text-amber-400 tracking-tight">
          {formatTime(timeState.breakSeconds)}
        </span>
      </div>
    </div>
  );
}
