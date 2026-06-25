"use client";

import React, { useState } from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import ExecutiveSummary from "./dashboard/ExecutiveSummary";
import AttentionRequired from "./dashboard/AttentionRequired";
import TeamActivity from "./dashboard/TeamActivity";
import ProjectHealth from "./dashboard/ProjectHealth";
import TaskOverview from "./dashboard/TaskOverview";
import WorkReportOverview from "./dashboard/WorkReportOverview";
import Link from "next/link";
import { FolderGit2 } from "lucide-react";

export default function DashboardClient({ initialData }) {
  const { 
    profiles, 
    projects, 
    tasks, 
    latestReports, 
    sessions, 
    blocks, 
    legacyAssignments, 
    stats 
  } = initialData;

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Usually handled by router.refresh() in Next.js App router, 
    // but we let the header handle it natively and just show UI feedback momentarily
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const pendingLegacyCount = legacyAssignments.length;

  return (
    <div className="space-y-6 font-sans animate-fade-in max-w-[1600px] mx-auto">
      
      <DashboardHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />

      <ExecutiveSummary stats={stats} />

      <AttentionRequired 
        tasks={tasks} 
        reports={latestReports} 
        projects={projects} 
        today={new Date().toISOString().split('T')[0]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Projects and Work Reports */}
        <div className="lg:col-span-2 space-y-8">
          <ProjectHealth projects={projects} tasks={tasks} reports={latestReports} />
          <WorkReportOverview reports={latestReports} profiles={profiles} tasks={tasks} stats={stats} />
        </div>

        {/* Right column: Task Overview and Team Activity */}
        <div className="space-y-8">
          <TaskOverview statusCounts={stats.taskStatusCounts} />
          <TeamActivity profiles={profiles} sessions={sessions} blocks={blocks} />
          
          {/* Optional Legacy assignments callout if there are any active */}
          {pendingLegacyCount > 0 && (
            <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-3">
                <FolderGit2 className="h-5 w-5 text-neutral-500" />
                <h3 className="text-sm font-bold text-neutral-300">Legacy Assignments</h3>
              </div>
              <p className="text-xs text-neutral-400 mb-4">
                There are {pendingLegacyCount} legacy assignments still active or pending. 
                Consider migrating these to Project Tasks.
              </p>
              <Link href="/admin/my-work" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                View My Work
              </Link>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
