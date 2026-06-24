"use client";

import React, { useState, useTransition } from "react";
import { archiveProject, restoreProject, completeProject, cancelProject, transitionProjectStatus } from "@/lib/admin/project-actions";
import { useRouter } from "next/navigation";
import { Play, Pause, CheckCircle2, XCircle, Archive, RefreshCw, Loader2, AlertCircle } from "lucide-react";

export default function ProjectActions({ project, compact = false }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  // Archive flow states
  const [archiveStep, setArchiveStep] = useState(0); // 0 = closed, 1 = warning
  const [cancelStep, setCancelStep] = useState(0); 
  const [completeStep, setCompleteStep] = useState(0);

  const resetModals = () => {
    setArchiveStep(0);
    setCancelStep(0);
    setCompleteStep(0);
    setError(null);
  };

  const executeAction = async (actionFn, args) => {
    setError(null);
    startTransition(async () => {
      const result = await actionFn(...args);
      if (result?.requiresConfirmation && actionFn === archiveProject) {
        setArchiveStep(2); // Escalate to stronger warning
      } else if (result?.error) {
        setError(result.error);
      } else {
        resetModals();
        router.refresh();
      }
    });
  };

  const handleStatusTransition = (newStatus) => {
    executeAction(transitionProjectStatus, [project.id, newStatus]);
  };

  const { status } = project;

  if (compact) {
     return (
        <div className="flex items-center gap-2">
           {status === "planning" && (
              <button onClick={() => handleStatusTransition("active")} disabled={isPending} className="text-emerald-500 hover:text-emerald-400 text-sm font-medium">Activate</button>
           )}
           {status === "active" && (
              <button onClick={() => handleStatusTransition("on_hold")} disabled={isPending} className="text-amber-500 hover:text-amber-400 text-sm font-medium">Hold</button>
           )}
           {status === "on_hold" && (
              <button onClick={() => handleStatusTransition("active")} disabled={isPending} className="text-emerald-500 hover:text-emerald-400 text-sm font-medium">Activate</button>
           )}
           {status === "archived" && (
              <button onClick={() => executeAction(restoreProject, [project.id])} disabled={isPending} className="text-blue-500 hover:text-blue-400 text-sm font-medium">Restore</button>
           )}
           {status !== "archived" && (
              <button onClick={() => setArchiveStep(1)} disabled={isPending} className="text-slate-500 hover:text-slate-400 text-sm font-medium">Archive</button>
           )}
        </div>
     );
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {status === "planning" && (
          <>
            <button onClick={() => handleStatusTransition("active")} disabled={isPending} className="btn-action bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
              <Play className="w-4 h-4" /> Activate
            </button>
            <button onClick={() => handleStatusTransition("on_hold")} disabled={isPending} className="btn-action bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
              <Pause className="w-4 h-4" /> Hold
            </button>
            <button onClick={() => setCompleteStep(1)} disabled={isPending} className="btn-action bg-teal-500/10 text-teal-500 hover:bg-teal-500/20">
              <CheckCircle2 className="w-4 h-4" /> Complete
            </button>
          </>
        )}
        {status === "active" && (
          <>
            <button onClick={() => handleStatusTransition("on_hold")} disabled={isPending} className="btn-action bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
              <Pause className="w-4 h-4" /> Hold
            </button>
            <button onClick={() => setCompleteStep(1)} disabled={isPending} className="btn-action bg-teal-500/10 text-teal-500 hover:bg-teal-500/20">
              <CheckCircle2 className="w-4 h-4" /> Complete
            </button>
          </>
        )}
        {status === "on_hold" && (
          <>
            <button onClick={() => handleStatusTransition("active")} disabled={isPending} className="btn-action bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
              <Play className="w-4 h-4" /> Activate
            </button>
            <button onClick={() => setCompleteStep(1)} disabled={isPending} className="btn-action bg-teal-500/10 text-teal-500 hover:bg-teal-500/20">
              <CheckCircle2 className="w-4 h-4" /> Complete
            </button>
          </>
        )}

        {status !== "completed" && status !== "cancelled" && status !== "archived" && (
          <button onClick={() => setCancelStep(1)} disabled={isPending} className="btn-action bg-red-500/10 text-red-500 hover:bg-red-500/20">
            <XCircle className="w-4 h-4" /> Cancel
          </button>
        )}

        {status !== "archived" && (
          <button onClick={() => setArchiveStep(1)} disabled={isPending} className="btn-action bg-slate-500/10 text-slate-400 hover:bg-slate-500/20">
            <Archive className="w-4 h-4" /> Archive
          </button>
        )}

        {status === "archived" && (
          <button onClick={() => executeAction(restoreProject, [project.id])} disabled={isPending} className="btn-action bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
            <RefreshCw className="w-4 h-4" /> Restore
          </button>
        )}
      </div>

      <style jsx>{`
        .btn-action {
          @apply inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed;
        }
      `}</style>

      {/* Modals for Destructive Actions */}
      {(archiveStep > 0 || cancelStep > 0 || completeStep > 0) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1C1C1E] border border-white/10 rounded-xl p-6 max-w-md w-full shadow-xl">
            {archiveStep === 1 && (
              <>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Archive className="w-5 h-5 text-slate-400" /> Archive Project
                </h3>
                <p className="text-neutral-400 mb-6">
                  Are you sure you want to archive <strong>{project.name}</strong>? It will be hidden from the default list but members and data are preserved.
                </p>
                {error && <p className="text-red-500 text-sm mb-4 bg-red-500/10 p-2 rounded">{error}</p>}
                <div className="flex justify-end gap-3">
                  <button onClick={resetModals} disabled={isPending} className="px-4 py-2 text-neutral-400 hover:text-white transition-colors">Cancel</button>
                  <button onClick={() => executeAction(archiveProject, [project.id, { force: false }])} disabled={isPending} className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg flex items-center">
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Confirm Archive"}
                  </button>
                </div>
              </>
            )}

            {archiveStep === 2 && (
              <>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500" /> Active Project Warning
                </h3>
                <p className="text-neutral-400 mb-6">
                  This project is currently active or on hold. Archiving it will hide it from normal views. Are you absolutely sure?
                </p>
                {error && <p className="text-red-500 text-sm mb-4 bg-red-500/10 p-2 rounded">{error}</p>}
                <div className="flex justify-end gap-3">
                  <button onClick={resetModals} disabled={isPending} className="px-4 py-2 text-neutral-400 hover:text-white transition-colors">Cancel</button>
                  <button onClick={() => executeAction(archiveProject, [project.id, { force: true }])} disabled={isPending} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg flex items-center">
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Force Archive"}
                  </button>
                </div>
              </>
            )}

            {cancelStep === 1 && (
              <>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" /> Cancel Project
                </h3>
                <p className="text-neutral-400 mb-6">
                  Are you sure you want to cancel <strong>{project.name}</strong>? It will halt all work.
                </p>
                {error && <p className="text-red-500 text-sm mb-4 bg-red-500/10 p-2 rounded">{error}</p>}
                <div className="flex justify-end gap-3">
                  <button onClick={resetModals} disabled={isPending} className="px-4 py-2 text-neutral-400 hover:text-white transition-colors">Abort</button>
                  <button onClick={() => executeAction(cancelProject, [project.id])} disabled={isPending} className="px-4 py-2 bg-red-500/20 text-red-500 hover:bg-red-500/30 rounded-lg flex items-center">
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Confirm Cancel"}
                  </button>
                </div>
              </>
            )}

            {completeStep === 1 && (
              <>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500" /> Complete Project
                </h3>
                <p className="text-neutral-400 mb-6">
                  Mark <strong>{project.name}</strong> as completed? This will set progress to 100%. 
                  <br/><br/><span className="text-sm text-teal-500">Note: Automatic task-based completion verification will be added in a future update.</span>
                </p>
                {error && <p className="text-red-500 text-sm mb-4 bg-red-500/10 p-2 rounded">{error}</p>}
                <div className="flex justify-end gap-3">
                  <button onClick={resetModals} disabled={isPending} className="px-4 py-2 text-neutral-400 hover:text-white transition-colors">Abort</button>
                  <button onClick={() => executeAction(completeProject, [project.id])} disabled={isPending} className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg flex items-center">
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Complete Project"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
