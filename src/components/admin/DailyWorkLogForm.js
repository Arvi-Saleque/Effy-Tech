"use client";

import React, { useState, useEffect } from "react";
import { saveDailyLog, submitDailyLog } from "@/lib/admin/actions";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { formatDateTime } from "@/lib/admin/time";

export default function DailyWorkLogForm({ initialLog, hasSession }) {
  const router = useRouter();
  const [workNote, setWorkNote] = useState("");
  const [blockers, setBlockers] = useState("");
  const [tomorrowPlan, setTomorrowPlan] = useState("");
  
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  // Hydrate fields from initialLog
  useEffect(() => {
    if (initialLog) {
      setWorkNote(initialLog.work_note || "");
      setBlockers(initialLog.blockers || "");
      setTomorrowPlan(initialLog.tomorrow_plan || "");
    } else {
      setWorkNote("");
      setBlockers("");
      setTomorrowPlan("");
    }
  }, [initialLog]);

  const isSubmitted = !!(initialLog && initialLog.submitted_at);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!hasSession) {
      setMessage({ type: "error", text: "You must start your work session first." });
      return;
    }
    
    setIsSaving(true);
    setMessage(null);
    
    try {
      const res = await saveDailyLog({ workNote, blockers, tomorrowPlan });
      if (res.error) {
        setMessage({ type: "error", text: res.error });
      } else {
        setMessage({ type: "success", text: "Draft saved successfully!" });
        router.refresh();
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred while saving." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmitLog = async (e) => {
    e.preventDefault();
    if (!hasSession) {
      setMessage({ type: "error", text: "You must start your work session first." });
      return;
    }

    if (!workNote.trim()) {
      setMessage({ type: "error", text: "Please enter what you accomplished today before submitting." });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await submitDailyLog({ workNote, blockers, tomorrowPlan });
      if (res.error) {
        setMessage({ type: "error", text: res.error });
      } else {
        setMessage({ type: "success", text: "Work log submitted successfully and locked!" });
        router.refresh();
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred while submitting." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
      <h3 className="text-lg font-bold text-neutral-100 mb-4 flex items-center gap-2">
        Daily Work Log
        {isSubmitted && (
          <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-normal capitalize">
            Submitted
          </span>
        )}
      </h3>

      {isSubmitted && (
        <div className="mb-4 p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-2.5 text-xs text-neutral-300">
          <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>
            Log submitted and locked on <strong>{formatDateTime(initialLog.submitted_at)}</strong>.
          </span>
        </div>
      )}

      {!hasSession && (
        <div className="mb-4 p-3 bg-neutral-950/40 border border-neutral-800 rounded-xl flex items-center gap-2.5 text-xs text-neutral-400">
          <AlertCircle className="h-4 w-4 text-neutral-500 shrink-0" />
          <span>You need to start your work session to edit the daily log.</span>
        </div>
      )}

      {message && (
        <div className={`mb-4 p-3 rounded-xl flex items-start gap-2 text-xs ${
          message.type === "success" 
            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
            : "bg-red-500/10 border border-red-500/20 text-red-400"
        }`}>
          {message.type === "success" ? (
            <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label htmlFor="workNote" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
            Work Accomplished Today <span className="text-red-500">*</span>
          </label>
          <textarea
            id="workNote"
            rows={4}
            value={workNote}
            onChange={(e) => setWorkNote(e.target.value)}
            disabled={isSubmitted || !hasSession || isSaving || isSubmitting}
            placeholder="Describe what specific tasks you completed..."
            className="w-full bg-neutral-950/40 border border-neutral-800/80 rounded-xl px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50 disabled:opacity-50 disabled:bg-neutral-950/20"
          />
        </div>

        <div>
          <label htmlFor="blockers" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
            Blockers or Challenges (Optional)
          </label>
          <textarea
            id="blockers"
            rows={2}
            value={blockers}
            onChange={(e) => setBlockers(e.target.value)}
            disabled={isSubmitted || !hasSession || isSaving || isSubmitting}
            placeholder="List any blocker, wait time, or issue..."
            className="w-full bg-neutral-950/40 border border-neutral-800/80 rounded-xl px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50 disabled:opacity-50 disabled:bg-neutral-950/20"
          />
        </div>

        <div>
          <label htmlFor="tomorrowPlan" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
            Plan for Tomorrow (Optional)
          </label>
          <textarea
            id="tomorrowPlan"
            rows={2}
            value={tomorrowPlan}
            onChange={(e) => setTomorrowPlan(e.target.value)}
            disabled={isSubmitted || !hasSession || isSaving || isSubmitting}
            placeholder="Outline your planned tasks for the next workday..."
            className="w-full bg-neutral-950/40 border border-neutral-800/80 rounded-xl px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500/50 disabled:opacity-50 disabled:bg-neutral-950/20"
          />
        </div>

        {!isSubmitted && hasSession && (
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving || isSubmitting}
              className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 bg-transparent rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSaving && <Loader2 className="h-3 w-3 animate-spin" />}
              Save Draft
            </button>
            <button
              type="button"
              onClick={handleSubmitLog}
              disabled={isSaving || isSubmitting}
              className="px-4 py-2 text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="h-3 w-3 animate-spin" />}
              Submit Log
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
