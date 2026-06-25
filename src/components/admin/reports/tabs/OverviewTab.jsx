import React from "react";
import { formatDuration } from "@/lib/admin/time";
import { 
  Clock, 
  Briefcase, 
  CheckCircle, 
  AlertTriangle,
  FileSpreadsheet,
  Users
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

function DistributionList({ title, data, colorClass }) {
  const entries = Object.entries(data || {}).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [_, v]) => sum + v, 0);

  return (
    <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-5 shadow-xl backdrop-blur-xl flex flex-col">
      <h3 className="text-sm font-bold text-neutral-300 mb-4">{title}</h3>
      {entries.length === 0 ? (
        <div className="text-xs text-neutral-500 italic mt-auto">No data</div>
      ) : (
        <div className="space-y-3">
          {entries.map(([key, val]) => (
            <div key={key}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-400 capitalize">{key.replace(/_/g, " ")}</span>
                <span className="font-mono font-bold text-neutral-200">{val}</span>
              </div>
              <div className="w-full bg-neutral-800/50 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${colorClass}`} 
                  style={{ width: `${(val / total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OverviewTab({ data }) {
  if (!data || !data.metrics) return null;

  const { metrics, distributions } = data;

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Time Tracking Section */}
      <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest border-b border-neutral-800/80 pb-2">
        Time Tracking
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Net Productive Time" value={formatDuration(metrics.netProductiveSeconds)} icon={Clock} colorClass="text-emerald-400" />
        <MetricCard title="Total Break Time" value={formatDuration(metrics.totalBreakSeconds)} icon={Clock} colorClass="text-amber-400" />
        <MetricCard title="Total Tracked Time" value={formatDuration(metrics.totalTrackedSeconds)} icon={Clock} colorClass="text-indigo-400" />
      </div>

      {/* Projects & Tasks Section */}
      <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest border-b border-neutral-800/80 pb-2 pt-4">
        Projects & Tasks
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Completed Tasks" value={metrics.completedTasks} icon={CheckCircle} colorClass="text-emerald-400" />
        <MetricCard title="Completed Legacy" value={metrics.completedLegacy} icon={CheckCircle} colorClass="text-emerald-600" />
        <MetricCard title="Overdue Tasks" value={metrics.overdueTasks} icon={AlertTriangle} colorClass="text-red-500" />
        <MetricCard title="Blocked Tasks" value={metrics.blockedTasks} icon={AlertTriangle} colorClass="text-rose-500" />
        <MetricCard title="Active Projects" value={metrics.activeProjects} icon={Briefcase} colorClass="text-blue-400" />
        <MetricCard title="Completed Projects" value={metrics.completedProjects} icon={Briefcase} colorClass="text-emerald-400" />
      </div>

      {/* Reports Section */}
      <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest border-b border-neutral-800/80 pb-2 pt-4">
        Task Work Reports
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Reports Submitted" value={metrics.reportsSubmitted} icon={FileSpreadsheet} colorClass="text-indigo-400" />
        <MetricCard title="Reports Approved" value={metrics.reportsApproved} icon={CheckCircle} colorClass="text-emerald-400" />
        <MetricCard title="Awaiting Review" value={metrics.reportsAwaiting} icon={Clock} colorClass="text-amber-400" />
        <MetricCard title="Revision Requests" value={metrics.reportsRevision} icon={AlertTriangle} colorClass="text-rose-400" />
      </div>

      {/* Distributions */}
      <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest border-b border-neutral-800/80 pb-2 pt-4">
        Distributions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DistributionList title="Task Status" data={distributions.taskStatusDistribution} colorClass="bg-indigo-500" />
        <DistributionList title="Project Status" data={distributions.projectStatusDistribution} colorClass="bg-blue-500" />
        <DistributionList title="Report Status" data={distributions.reportStatusDistribution} colorClass="bg-emerald-500" />
        <DistributionList title="Work Source" data={distributions.sourceDistribution} colorClass="bg-purple-500" />
      </div>
      
    </div>
  );
}
