"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { archiveClient, restoreClient } from "@/lib/admin/client-actions";
import { Archive, RefreshCw, Loader2, AlertTriangle, AlertCircle } from "lucide-react";

export default function ClientActions({ client, compact = false }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [archiveStep, setArchiveStep] = useState(0); // 0: closed, 1: initial warning, 2: active project warning
  const [activeCountWarning, setActiveCountWarning] = useState(0);
  const [actionError, setActionError] = useState(null);

  const isArchived = client.status === "archived";

  const handleArchiveSubmit = async () => {
    setActionError(null);
    const force = archiveStep === 2;
    
    startTransition(async () => {
      const result = await archiveClient(client.id, { force });
      
      if (result.requiresConfirmation) {
        setActiveCountWarning(result.activeProjectCount);
        setArchiveStep(2);
      } else if (result.error) {
        setActionError(result.error);
      } else {
        setArchiveStep(0);
        router.refresh();
      }
    });
  };

  const handleRestore = async () => {
    setActionError(null);
    startTransition(async () => {
      const result = await restoreClient(client.id);
      if (result.error) {
        setActionError(result.error);
      } else {
        router.refresh();
      }
    });
  };

  if (isArchived) {
    if (compact) {
      return (
        <div className="flex items-center flex-col gap-1">
          <button
            onClick={handleRestore}
            disabled={isPending}
            className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isPending ? "Restoring..." : "Restore"}
          </button>
          {actionError && <span className="text-red-400 text-[10px] whitespace-nowrap">{actionError}</span>}
        </div>
      );
    }
    
    return (
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={handleRestore}
          disabled={isPending}
          className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-medium rounded-lg transition-colors flex items-center gap-2 border border-neutral-700 disabled:opacity-50"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4 text-emerald-400" />}
          Restore Client
        </button>
        {actionError && (
          <div className="text-red-400 text-xs flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {actionError}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {compact ? (
        <button
          onClick={() => setArchiveStep(1)}
          disabled={isPending}
          className="text-slate-400 hover:text-slate-300 text-sm font-medium transition-colors disabled:opacity-50"
        >
          Archive
        </button>
      ) : (
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={() => setArchiveStep(1)}
            disabled={isPending}
            className="px-4 py-2 bg-neutral-800/50 hover:bg-neutral-800 text-slate-300 hover:text-slate-200 font-medium rounded-lg transition-colors flex items-center gap-2 border border-neutral-700/50 disabled:opacity-50"
          >
            <Archive className="w-4 h-4" />
            Archive
          </button>
          {actionError && !archiveStep && (
            <div className="text-red-400 text-xs flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {actionError}
            </div>
          )}
        </div>
      )}

      {archiveStep > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 text-amber-400 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-neutral-100">Archive Client?</h3>
            </div>
            
            {archiveStep === 1 ? (
              <p className="text-neutral-300 text-sm mb-4">
                Archive this client? The client will be hidden from the default active list, but its projects and historical data will remain.
              </p>
            ) : (
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 p-4 rounded-lg text-sm mb-4">
                This client currently has <strong className="text-amber-200">{activeCountWarning} active projects</strong>. 
                Archiving the client will not archive those projects. Do you still want to continue?
              </div>
            )}

            {actionError && (
              <div className="text-red-400 text-sm mb-4 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> {actionError}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setArchiveStep(0);
                  setActionError(null);
                }}
                disabled={isPending}
                className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white bg-neutral-800 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleArchiveSubmit}
                disabled={isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(217,119,6,0.2)] disabled:opacity-50"
              >
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {archiveStep === 2 ? "Archive Anyway" : "Confirm Archive"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
