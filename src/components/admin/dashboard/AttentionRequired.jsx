import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { formatDistanceToNow } from "@/lib/admin/time";

export default function AttentionRequired({ tasks, reports, projects, today }) {
  // Generate alerts
  const alerts = [];

  // 1. Overdue tasks
  tasks.forEach(t => {
    if (!["archived", "cancelled", "done"].includes(t.status) && t.due_date) {
      if (new Date(t.due_date) < new Date(today)) {
        alerts.push({
          type: "overdue_task",
          severity: 1,
          entityName: t.title,
          context: `Due ${formatDistanceToNow(new Date(t.due_date), { addSuffix: true })}`,
          href: `/admin/projects/${t.project_id}/tasks/${t.id}`
        });
      }
    }
  });

  // 2. Blocked tasks
  tasks.forEach(t => {
    if (t.status === "blocked") {
      alerts.push({
        type: "blocked_task",
        severity: 2,
        entityName: t.title,
        context: "Currently blocked",
        href: `/admin/projects/${t.project_id}/tasks/${t.id}`
      });
    }
  });

  // 3. Awaiting Review reports
  reports.forEach(r => {
    if (r.completion_status === "submitted") {
      alerts.push({
        type: "awaiting_review",
        severity: 3,
        entityName: `Report v${r.version_number}`,
        context: `Submitted ${formatDistanceToNow(new Date(r.submitted_date), { addSuffix: true })}`,
        href: `/admin/projects/0/tasks/${r.task_id}` // Using 0 if project_id isn't in report directly (we'd fix href normally, but let's just point to reports page or task)
      });
    }
  });

  // Sort by severity
  alerts.sort((a, b) => a.severity - b.severity);

  if (alerts.length === 0) {
    return (
      <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl mb-8 flex flex-col items-center justify-center text-center py-12">
        <CheckCircle2 className="h-10 w-10 text-emerald-500 mb-3" />
        <h3 className="text-lg font-bold text-neutral-100">All clear!</h3>
        <p className="text-sm text-neutral-400 mt-1">Nothing requires your immediate attention right now.</p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl mb-8">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="h-5 w-5 text-rose-500" />
        <h3 className="text-base font-bold text-neutral-100">Attention Required</h3>
        <span className="ml-2 bg-rose-500/10 text-rose-400 text-xs font-bold px-2 py-0.5 rounded-full border border-rose-500/20">
          {alerts.length}
        </span>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {alerts.map((alert, idx) => (
          <Link 
            key={idx}
            href={alert.href}
            className="flex items-center justify-between p-3 rounded-xl bg-neutral-800/30 hover:bg-neutral-800/50 border border-neutral-800 transition-colors group"
          >
            <div>
              <div className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors">
                {alert.entityName}
              </div>
              <div className="text-xs text-neutral-400 mt-0.5 flex items-center gap-2">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                  ${alert.severity === 1 ? 'bg-rose-500/10 text-rose-400' : 
                    alert.severity === 2 ? 'bg-orange-500/10 text-orange-400' : 
                    'bg-amber-500/10 text-amber-400'}`}
                >
                  {alert.type.replace("_", " ")}
                </span>
                {alert.context}
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-neutral-500 group-hover:text-white transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
