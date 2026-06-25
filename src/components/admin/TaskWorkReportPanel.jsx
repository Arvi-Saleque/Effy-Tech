"use client";

import React, { useState, useTransition, useRef } from "react";
import { formatDuration } from "@/lib/admin/time";
import { submitTaskReport, reviewTaskReport, updateTaskReport } from "@/lib/admin/report-actions";
import { CheckCircle2, Clock, CalendarDays, ExternalLink, Paperclip, AlertCircle, RefreshCw, X, Play } from "lucide-react";

export default function TaskWorkReportPanel({ task, profile, projectId }) {
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const actualStartDateRef = useRef(null);
  const submittedDateRef = useRef(null);

  const openDatePicker = (ref) => {
    const input = ref.current;
    if (!input) return;

    try {
      if (typeof input.showPicker === "function") {
        input.showPicker();
      } else {
        input.focus();
        input.click();
      }
    } catch {
      input.focus();
    }
  };

  const reports = task.task_work_reports || [];
  const activeReport = reports.length > 0 ? reports[0] : null;

  const isAssigned = task.task_assignees?.some(a => a.user_id === profile.id);
  const isAdmin = profile.role === "admin" && profile.is_active;
  const isDoneStatus = ["done", "archived", "cancelled"].includes(task.status);
  
  const hasApproved = reports.some(r => r.completion_status === "approved");
  const canSubmit = isAssigned && !hasApproved && !["archived", "cancelled"].includes(task.status) && (!activeReport || activeReport.completion_status === "revision_requested");
  const canEdit = isAssigned && activeReport && activeReport.completion_status === "submitted" && activeReport.submitted_by === profile.id;

  // Strict YYYY-MM-DD formatter for HTML5 native date inputs
  const formatDateForInput = (dateValue) => {
    if (!dateValue) return new Date().toISOString().split("T")[0];
    try {
      // If it's already YYYY-MM-DD string, return as is to avoid timezone shift
      if (typeof dateValue === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateValue.trim())) {
        return dateValue.trim();
      }
      const d = new Date(dateValue);
      if (isNaN(d.getTime())) return new Date().toISOString().split("T")[0];
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch {
      return new Date().toISOString().split("T")[0];
    }
  };

  // Form State
  const defaultStartDate = formatDateForInput(activeReport?.actual_start_date || task.start_date);
  const [formData, setFormData] = useState({
    actualStartDate: defaultStartDate,
    submittedDate: formatDateForInput(),
    workSummary: "",
    workLink: "",
    note: ""
  });

  const openSubmitModal = () => {
    setFormData({
      actualStartDate: formatDateForInput(activeReport?.actual_start_date || task.start_date),
      submittedDate: formatDateForInput(),
      workSummary: "",
      workLink: "",
      note: ""
    });
    setIsEditing(false);
    setErrorMsg("");
    setShowModal(true);
  };

  const openEditModal = () => {
    setFormData({
      actualStartDate: formatDateForInput(activeReport.actual_start_date),
      submittedDate: formatDateForInput(activeReport.submitted_date),
      workSummary: activeReport.work_summary,
      workLink: activeReport.work_link || "",
      note: activeReport.note || ""
    });
    setIsEditing(true);
    setErrorMsg("");
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    startTransition(async () => {
      let res;
      if (isEditing) {
        res = await updateTaskReport(activeReport.id, { ...formData, taskId: task.id, projectId });
      } else {
        res = await submitTaskReport({ ...formData, taskId: task.id, projectId });
      }

      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setShowModal(false);
      }
    });
  };

  const [reviewNote, setReviewNote] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewAction, setReviewAction] = useState(null); // 'approve', 'reject', 'revision_requested', 'approve_done'

  const handleReview = (action) => {
    if (action === "revision_requested" || action === "reject") {
      setReviewAction(action);
      setReviewNote("");
      setShowReviewModal(true);
      return;
    }
    
    // Auto confirm approve
    executeReview(action, "");
  };

  const executeReview = (action, note) => {
    startTransition(async () => {
      let act = action;
      let markDone = false;
      if (act === "approve_done") {
        act = "approve";
        markDone = true;
      }

      const res = await reviewTaskReport(activeReport.id, task.id, projectId, act, note, markDone);
      if (res.error) {
        alert(res.error);
      } else {
        setShowReviewModal(false);
      }
    });
  };

  // Compute metrics
  const calculateDurationDays = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    const diffTime = Math.abs(e - s);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive days
  };

  const totalTrackedSeconds = (task.work_blocks || []).reduce((acc, block) => {
    if (block.ended_at) {
      acc += Math.floor((new Date(block.ended_at) - new Date(block.started_at)) / 1000);
    }
    return acc;
  }, 0);

  const StatusBadge = ({ status }) => {
    const colors = {
      submitted: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      approved: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      revision_requested: "bg-amber-500/10 border-amber-500/20 text-amber-400",
      rejected: "bg-red-500/10 border-red-500/20 text-red-400"
    };
    return (
      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md border ${colors[status] || colors.submitted}`}>
        {status.replace("_", " ")}
      </span>
    );
  };

  if (!activeReport && !canSubmit) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/60">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-indigo-400" />
            Task Work Report
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Submit work completed without the EffyOps timer.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {canEdit && (
            <button
              onClick={openEditModal}
              disabled={isPending}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors border border-slate-700"
            >
              Edit Report
            </button>
          )}
          {canSubmit && (
            <button
              onClick={openSubmitModal}
              disabled={isPending}
              className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-xs font-bold rounded-lg transition-colors border border-indigo-500/30 flex items-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              {activeReport?.completion_status === "revision_requested" ? "Resubmit Report" : "Submit Work Report"}
            </button>
          )}
        </div>
      </div>

      {activeReport && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Status</p>
              <div className="mt-2"><StatusBadge status={activeReport.completion_status} /></div>
              <p className="text-xs text-slate-400 mt-2">v{activeReport.version_number}</p>
            </div>
            
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Duration</p>
              <p className="text-lg font-bold text-slate-200">
                {calculateDurationDays(activeReport.actual_start_date, activeReport.submitted_date)} days
              </p>
              <p className="text-xs text-slate-400 mt-1">Calendar Days</p>
            </div>

            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Tracked Time</p>
              <p className="text-lg font-bold text-slate-200 flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-400" />
                {formatDuration(totalTrackedSeconds)}
              </p>
              <p className="text-xs text-slate-400 mt-1">From EffyOps Timer</p>
            </div>

            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Dates</p>
              <p className="text-xs text-slate-300 mt-1"><span className="text-slate-500">Started:</span> {new Date(activeReport.actual_start_date).toLocaleDateString()}</p>
              <p className="text-xs text-slate-300 mt-0.5"><span className="text-slate-500">Submitted:</span> {new Date(activeReport.submitted_date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Work Summary</h4>
            <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
              {activeReport.work_summary}
            </div>
            
            {(activeReport.work_link || activeReport.note) && (
              <div className="mt-4 pt-4 border-t border-slate-800/60 grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeReport.work_link && (
                  <div>
                    <span className="text-xs text-slate-500 block mb-1">Work Link</span>
                    <a href={activeReport.work_link} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline flex items-center gap-1.5 break-all">
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                      {activeReport.work_link}
                    </a>
                  </div>
                )}
                {activeReport.note && (
                  <div>
                    <span className="text-xs text-slate-500 block mb-1">Additional Note</span>
                    <p className="text-sm text-slate-400 italic">{activeReport.note}</p>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t border-slate-800/60 flex justify-between items-center text-xs text-slate-500">
              <span>Submitted by {activeReport.submitter?.name}</span>
              <span>{new Date(activeReport.created_at).toLocaleString()}</span>
            </div>
          </div>

          {activeReport.review_note && (
            <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                Review Note from {activeReport.reviewer?.name}
              </h4>
              <p className="text-sm text-amber-200/80">{activeReport.review_note}</p>
            </div>
          )}

          {/* Admin Workflow */}
          {isAdmin && activeReport.completion_status === "submitted" && (
            <div className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Admin Review Actions</h4>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleReview("approve")}
                  disabled={isPending}
                  className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-bold rounded-lg transition-colors border border-emerald-500/30"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReview("approve_done")}
                  disabled={isPending}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-emerald-900/20 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Approve & Mark Task Done
                </button>
                <button
                  onClick={() => handleReview("revision_requested")}
                  disabled={isPending}
                  className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs font-bold rounded-lg transition-colors border border-amber-500/30 ml-auto"
                >
                  Request Revision
                </button>
                <button
                  onClick={() => handleReview("reject")}
                  disabled={isPending}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded-lg transition-colors border border-red-500/20"
                >
                  Reject
                </button>
              </div>
            </div>
          )}

          {/* History Timeline */}
          {reports.length > 1 && (
            <div className="mt-6">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Report History</h4>
              <div className="space-y-3">
                {reports.slice(1).map(r => (
                  <div key={r.id} className="flex items-center justify-between p-3 bg-slate-950/30 border border-slate-800/60 rounded-lg text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 font-mono">v{r.version_number}</span>
                      <StatusBadge status={r.completion_status} />
                      <span className="text-slate-400 hidden sm:inline">Submitted {new Date(r.created_at).toLocaleDateString()}</span>
                    </div>
                    {r.review_note && (
                      <span className="text-amber-500 truncate max-w-[200px] ml-4 italic">
                        "{r.review_note}"
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Submission Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-100">
                {isEditing ? "Edit Work Report" : activeReport?.completion_status === "revision_requested" ? "Resubmit Work Report" : "Submit Work Report"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-200">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto">
              {errorMsg && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}
              
              <form id="reportForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="cursor-pointer" onClick={() => openDatePicker(actualStartDateRef)}>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 pointer-events-none">Actual Start Date *</label>
                    <div className="relative">
                      <input 
                        ref={actualStartDateRef}
                        type="date" 
                        required
                        value={formData.actualStartDate}
                        onChange={e => setFormData({...formData, actualStartDate: e.target.value})}
                        onClick={(e) => {
                          e.stopPropagation();
                          openDatePicker(actualStartDateRef);
                        }}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg p-2.5 pl-10 focus:border-indigo-500 outline-none cursor-pointer relative z-10"
                        style={{ colorScheme: "dark" }}
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 cursor-pointer text-indigo-400 hover:text-indigo-300 flex items-center justify-center p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDatePicker(actualStartDateRef);
                        }}
                      >
                        <CalendarDays className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="cursor-pointer" onClick={() => openDatePicker(submittedDateRef)}>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 pointer-events-none">Submitted Date *</label>
                    <div className="relative">
                      <input 
                        ref={submittedDateRef}
                        type="date" 
                        required
                        value={formData.submittedDate}
                        onChange={e => setFormData({...formData, submittedDate: e.target.value})}
                        onClick={(e) => {
                          e.stopPropagation();
                          openDatePicker(submittedDateRef);
                        }}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg p-2.5 pl-10 focus:border-indigo-500 outline-none cursor-pointer relative z-10"
                        style={{ colorScheme: "dark" }}
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 cursor-pointer text-indigo-400 hover:text-indigo-300 flex items-center justify-center p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDatePicker(submittedDateRef);
                        }}
                      >
                        <CalendarDays className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Work Summary *</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Describe the work completed..."
                    value={formData.workSummary}
                    onChange={e => setFormData({...formData, workSummary: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg p-3 focus:border-indigo-500 outline-none resize-y"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Work Link (Optional)</label>
                  <input 
                    type="url" 
                    placeholder="https://..."
                    value={formData.workLink}
                    onChange={e => setFormData({...formData, workLink: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg p-2.5 focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Additional Note (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="Any extra context for the reviewer"
                    value={formData.note}
                    onChange={e => setFormData({...formData, note: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg p-2.5 focus:border-indigo-500 outline-none"
                  />
                </div>
              </form>
            </div>
            
            <div className="p-5 border-t border-slate-800 flex justify-end gap-3 bg-slate-900/50">
              <button 
                onClick={() => setShowModal(false)}
                disabled={isPending}
                className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button 
                type="submit"
                form="reportForm"
                disabled={isPending}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isPending && <RefreshCw className="h-4 w-4 animate-spin" />}
                {isEditing ? "Save Changes" : "Submit Report"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-800">
              <h2 className="text-lg font-bold text-slate-100">
                {reviewAction === "revision_requested" ? "Request Revision" : "Reject Report"}
              </h2>
            </div>
            <div className="p-5">
              <label className="block text-xs font-semibold text-slate-400 mb-2">Review Note {reviewAction === "revision_requested" ? "*" : "(Optional)"}</label>
              <textarea 
                rows={3}
                placeholder="Explain what needs to be changed..."
                value={reviewNote}
                onChange={e => setReviewNote(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg p-3 focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="p-5 border-t border-slate-800 flex justify-end gap-3 bg-slate-900/50">
              <button 
                onClick={() => setShowReviewModal(false)}
                disabled={isPending}
                className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button 
                onClick={() => executeReview(reviewAction, reviewNote)}
                disabled={isPending || (reviewAction === "revision_requested" && !reviewNote.trim())}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isPending && <RefreshCw className="h-4 w-4 animate-spin" />}
                Confirm {reviewAction === "revision_requested" ? "Revision" : "Rejection"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
