"use client";

import React, { useState, useEffect } from "react";

export default function WorkTimer({ session, workBlocks = [] }) {
  const [timeState, setTimeState] = useState({
    workedSeconds: 0,
    breakSeconds: 0,
  });

  useEffect(() => {
    if (!session || !session.started_at) {
      setTimeState({ workedSeconds: 0, breakSeconds: 0 });
      return;
    }

    const activeBlock = workBlocks.find(b => b.status === "active");
    const completedBlocks = workBlocks.filter(b => b.status === "done");
    const completedSeconds = completedBlocks.reduce((acc, curr) => {
      if (curr.started_at && curr.ended_at) {
        return acc + Math.floor((new Date(curr.ended_at).getTime() - new Date(curr.started_at).getTime()) / 1000);
      }
      return acc + (curr.total_minutes || 0) * 60;
    }, 0);

    const recordedBreakMs = (session.break_minutes || 0) * 60 * 1000;

    const updateTimer = () => {
      const now = new Date().getTime();

      let workedSecs = completedSeconds;
      if (activeBlock) {
        const start = new Date(activeBlock.started_at).getTime();
        let elapsedMs = now - start;

        // If the session is currently on break, subtract the live active break duration
        if (session.status === "break" && session.break_started_at) {
          const breakStart = new Date(session.break_started_at).getTime();
          const currentBreakMs = now - breakStart;
          elapsedMs -= currentBreakMs;
        }

        workedSecs += Math.max(0, Math.floor(elapsedMs / 1000));
      }

      let breakMs = recordedBreakMs;
      if (session.status === "break" && session.break_started_at) {
        const breakStart = new Date(session.break_started_at).getTime();
        const currentBreakMs = now - breakStart;
        breakMs = recordedBreakMs + currentBreakMs;
      }

      setTimeState({
        workedSeconds: workedSecs,
        breakSeconds: Math.max(0, Math.floor(breakMs / 1000)),
      });
    };

    updateTimer();

    // Only set interval if the state is active or break
    if (session.status === "active" || session.status === "break") {
      const intervalId = setInterval(updateTimer, 1000);
      return () => clearInterval(intervalId);
    }
  }, [session, workBlocks]);

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
