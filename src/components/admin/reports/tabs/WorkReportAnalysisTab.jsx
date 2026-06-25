import React, { useState } from "react";
import Link from "next/link";
import { formatDuration, formatDateTime } from "@/lib/admin/time";
import { 
  FileSpreadsheet, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  ChevronDown,
  ChevronUp
} from "lucide-react";

function MetricCard({ title, value, icon: Icon, colorClass }) {
  return (
    <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-5 shadow-xl backdrop-blur-xl">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`h-5 w-5 ${colorClass}`} />
        <h3 className="text-sm font-bold text-neutral-300">{title}</h3>
      </div>
      <div className="text-2xl font-extrabold text-neutral-100">{value}</div>
    </div>
  );
}

export default function WorkReportAnalysisTab({ data }) {
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });

  if (!data || !data.analysisData) return null;

  const handleSort = (key) => {
    let direction = "desc";
    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data.analysisData].sort((a, b) => {
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];
    
    if (typeof aVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = bVal?.toLowerCase() || "";
    }

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <span className="ml-1 opacity-0 group-hover:opacity-50">↓</span>;
    return sortConfig.direction === "asc" 
      ? <ChevronUp className="inline-block w-3 h-3 ml-1" />
      : <ChevronDown className="inline-block w-3 h-3 ml-1" />;
  };

  const headers = [
    { key: "taskTitle", label: "Task" },
    { key: "projectName", label: "Project" },
    { key: "submittedBy", label: "Author" },
    { key: "versionNumber", label: "Ver" },
    { key: "actualStartDate", label: "Actual Start" },
    { key: "submittedDate", label: "Submitted" },
    { key: "completionDurationDays", label: "Cal Days" },
    { key: "status", label: "Status" },
    { key: "reviewedBy", label: "Reviewer" },
    { key: "reviewAge", label: "Review Age" },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "approved": return "text-emerald-400 bg-emerald-400/10";
      case "rejected": return "text-rose-400 bg-rose-400/10";
      case "revision_requested": return "text-amber-400 bg-amber-400/10";
      case "submitted": return "text-indigo-400 bg-indigo-400/10";
      default: return "text-neutral-400 bg-neutral-400/10";
    }
  };

  const totalReports = data.analysisData.length;
  const approved = data.analysisData.filter(r => r.status === "approved").length;
  const awaiting = data.analysisData.filter(r => r.status === "submitted").length;
  const revision = data.analysisData.filter(r => r.status === "revision_requested").length;
  const rejected = data.analysisData.filter(r => r.status === "rejected").length;
  
  const totalCalDays = data.analysisData.reduce((sum, r) => sum + r.completionDurationDays, 0);
  const avgCalDays = totalReports > 0 ? Math.round(totalCalDays / totalReports) : 0;
  const afterDueDate = data.analysisData.filter(r => r.isAfterDueDate).length;
  const withLinks = data.analysisData.filter(r => r.hasWorkLinks).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Reports (Latest)" value={totalReports} icon={FileSpreadsheet} colorClass="text-indigo-400" />
        <MetricCard title="Avg Review Time" value={formatDuration(data.avgReviewSeconds)} icon={Clock} colorClass="text-emerald-400" />
        <MetricCard title="Avg Calendar Days" value={`${avgCalDays} days`} icon={Clock} colorClass="text-blue-400" />
        <MetricCard title="Oldest Pending" value={data.oldestPending ? `${data.oldestPending.reviewAge} days` : "None"} icon={AlertTriangle} colorClass="text-amber-400" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Approved" value={approved} icon={CheckCircle} colorClass="text-emerald-400" />
        <MetricCard title="Awaiting Review" value={awaiting} icon={Clock} colorClass="text-indigo-400" />
        <MetricCard title="Revision Requested" value={revision} icon={AlertTriangle} colorClass="text-amber-400" />
        <MetricCard title="Rejected" value={rejected} icon={AlertTriangle} colorClass="text-rose-400" />
      </div>

      <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl overflow-x-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-neutral-100">Work Report Analysis</h3>
          <div className="text-xs text-neutral-400 space-x-4">
            <span>Late Submissions: <strong className="text-red-400">{afterDueDate}</strong></span>
            <span>With Links: <strong className="text-indigo-400">{withLinks}</strong></span>
          </div>
        </div>
        
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-neutral-800/80 text-neutral-400 text-xs uppercase tracking-wider">
              {headers.map(h => (
                <th 
                  key={h.key} 
                  className="pb-3 font-semibold cursor-pointer group hover:text-neutral-200 transition-colors"
                  onClick={() => handleSort(h.key)}
                >
                  {h.label}
                  <SortIcon columnKey={h.key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/40">
            {sortedData.map(report => (
              <tr key={report.id} className="text-neutral-300 hover:bg-neutral-800/20 transition-colors">
                <td className="py-4 font-semibold text-neutral-100">
                  <Link href={`/admin/projects/${report.projectId}/tasks/${report.taskId}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">
                    {report.taskTitle}
                  </Link>
                </td>
                <td className="py-4 text-xs text-neutral-400">{report.projectName}</td>
                <td className="py-4 text-xs">{report.submittedBy}</td>
                <td className="py-4 font-mono text-xs">v{report.versionNumber}</td>
                <td className="py-4 text-xs font-mono">{report.actualStartDate || "-"}</td>
                <td className="py-4 text-xs font-mono">
                  {report.submittedDate || "-"}
                  {report.isAfterDueDate && <span className="ml-1 text-red-500 font-bold" title="Late">!</span>}
                </td>
                <td className="py-4 text-xs font-mono">{report.completionDurationDays}d</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(report.status)}`}>
                    {report.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="py-4 text-xs text-neutral-400">{report.reviewedBy || "-"}</td>
                <td className="py-4 text-xs font-mono text-neutral-400">
                  {report.status === "submitted" ? `${report.reviewAge}d` : "-"}
                </td>
              </tr>
            ))}
            {sortedData.length === 0 && (
              <tr>
                <td colSpan={headers.length} className="py-8 text-center text-neutral-500 text-xs">
                  No reports found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
