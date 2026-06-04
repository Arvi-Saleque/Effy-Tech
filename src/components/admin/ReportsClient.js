"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { formatMinutes } from "@/lib/admin/time";
import WorkHoursChart from "./WorkHoursChart";
import { 
  Calendar, 
  FileSpreadsheet, 
  Clock, 
  TrendingUp, 
  CheckCircle,
  AlertTriangle,
  ChevronRight
} from "lucide-react";

export default function ReportsClient({ initialData, currentRange }) {
  const router = useRouter();
  const { summary, history, assignments = [], startDate, endDate } = initialData;

  const handleRangeChange = (range) => {
    router.push(`/admin/reports?range=${range}`);
  };

  // Format chart data: [{ name, hours }]
  const chartData = summary.map(item => ({
    name: item.name,
    hours: item.totalHours
  }));

  return (
    <div className="space-y-8 font-sans animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-neutral-400 font-semibold uppercase tracking-widest block mb-1">
            Reports
          </span>
          <h2 className="text-2xl font-extrabold text-neutral-100 tracking-tight">
            Work Analytics & Logs
          </h2>
        </div>

        {/* Range Selector */}
        <div className="inline-flex p-1 bg-neutral-950/60 border border-neutral-800/80 rounded-xl">
          {["today", "week", "month"].map((r) => (
            <button
              key={r}
              onClick={() => handleRangeChange(r)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg capitalize transition-all duration-200 ${
                currentRange === r 
                  ? "bg-emerald-400 text-emerald-950 shadow-lg font-bold" 
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {r === "week" ? "This Week" : r === "month" ? "This Month" : "Today"}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-neutral-400 pl-1 font-mono">
        Period: <span className="text-neutral-200">{startDate}</span> to <span className="text-neutral-200">{endDate}</span>
      </div>

      {/* Analytics Summary and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Aggregated Summary Table */}
        <div className="lg:col-span-2 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-100 mb-4 flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-emerald-400" />
              Member Aggregate Summary
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-800/80 text-neutral-400 text-xs uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Member</th>
                    <th className="pb-3 font-semibold">Total Hours</th>
                    <th className="pb-3 font-semibold">Days Worked</th>
                    <th className="pb-3 font-semibold">Avg Hours/Day</th>
                    <th className="pb-3 font-semibold">Reports Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/40">
                  {summary.map(item => (
                    <tr key={item.id} className="text-neutral-300">
                      <td className="py-4 font-semibold text-neutral-100">{item.name}</td>
                      <td className="py-4 font-mono text-xs text-neutral-200 font-semibold">{item.totalHours}h</td>
                      <td className="py-4 font-mono text-xs">{item.daysWorked}d</td>
                      <td className="py-4 font-mono text-xs text-neutral-400">{item.averageHours}h/d</td>
                      <td className="py-4 font-mono text-xs text-emerald-400">{item.reportsCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Aggregate worked hours chart */}
        <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-100 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              Work Distribution (Hours)
            </h3>
            <WorkHoursChart data={chartData} />
          </div>
        </div>

      </div>

      {/* Assigned Work in Selected Period Section */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-neutral-100 flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-emerald-400" />
          Assigned Work in Selected Period ({assignments.length})
        </h3>

        {assignments.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-neutral-800/60 rounded-2xl bg-neutral-900/10 text-xs text-neutral-500 font-medium">
            No work assignments found for the selected period.
          </div>
        ) : (
          <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-800/80 text-neutral-400 text-xs uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Assigned To</th>
                    <th className="pb-3 font-semibold">Title</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Assigned By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/40">
                  {assignments.map(task => (
                    <tr key={task.id} className="text-neutral-300">
                      <td className="py-3.5 font-mono text-xs text-neutral-400">
                        {task.work_date}
                      </td>
                      <td className="py-3.5 font-semibold text-neutral-100">
                        {task.assignedToName}
                      </td>
                      <td className="py-3.5">
                        <span className="font-medium text-neutral-200 block">
                          {task.title}
                        </span>
                        {task.description && (
                          <span className="text-xs text-neutral-500 block max-w-md truncate">
                            {task.description}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 text-xs">
                        <span className={`px-2 py-0.5 rounded font-semibold uppercase tracking-wider text-[9px] border ${
                          task.status === "done" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                          task.status === "in_progress" ? "bg-blue-500/10 border-blue-500/20 text-blue-400" :
                          task.status === "cancelled" ? "bg-neutral-800 border-neutral-700 text-neutral-500" :
                          "bg-amber-500/10 border-amber-500/20 text-amber-400"
                        }`}>
                          {task.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3.5 text-xs text-neutral-400">
                        {task.assignedByName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* History Log Section */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-neutral-100 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-emerald-400" />
          Work Log History ({history.length})
        </h3>

        {history.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-neutral-800/60 rounded-2xl bg-neutral-900/10">
            <span className="text-xs text-neutral-500 font-medium">
              No historical logs found for the selected period.
            </span>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((log) => {
              const hasWorkNote = !!log.work_note;
              
              return (
                <div key={log.id} className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl space-y-4">
                  
                  {/* Top info row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/60 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-neutral-100">{log.name}</span>
                      <ChevronRight className="h-4 w-4 text-neutral-600 hidden sm:block" />
                      <span className="text-xs font-semibold text-emerald-400 font-mono">
                        {log.work_date}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-neutral-500 font-mono">
                        Hours: <strong className="text-neutral-200">{(log.total_minutes / 60).toFixed(1)}h</strong> ({formatMinutes(log.total_minutes)})
                      </span>
                      <span className={`text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded border ${
                        log.submitted_at 
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                          : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                      }`}>
                        {log.submitted_at ? "Submitted" : "Draft"}
                      </span>
                    </div>
                  </div>

                  {/* Body description */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    <div>
                      <span className="block text-[10px] text-neutral-500 font-bold uppercase tracking-wider mb-1">
                        Current Work Title
                      </span>
                      <p className="text-neutral-300">
                        {log.current_work_title || <span className="text-neutral-600 italic">No activity registered</span>}
                      </p>
                    </div>

                    <div>
                      <span className="block text-[10px] text-neutral-500 font-bold uppercase tracking-wider mb-1">
                        Work Accomplished Note
                      </span>
                      <p className="text-neutral-300 whitespace-pre-line leading-relaxed">
                        {log.work_note || <span className="text-neutral-600 italic">No notes written</span>}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {log.blockers && (
                        <div>
                          <span className="block text-[10px] text-red-400 font-bold uppercase tracking-wider mb-1">
                            Blockers
                          </span>
                          <p className="text-red-300 leading-relaxed">{log.blockers}</p>
                        </div>
                      )}
                      
                      {log.tomorrow_plan && (
                        <div>
                          <span className="block text-[10px] text-neutral-500 font-bold uppercase tracking-wider mb-1">
                            Tomorrow's Plan
                          </span>
                          <p className="text-neutral-400 leading-relaxed">{log.tomorrow_plan}</p>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
