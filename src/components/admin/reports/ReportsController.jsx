"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GlobalFilterBar from "./GlobalFilterBar";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CheckSquare, 
  Clock, 
  FileSpreadsheet,
  History
} from "lucide-react";

// Lazy loaded or directly imported tab components
import OverviewTab from "./tabs/OverviewTab";
import TeamPerformanceTab from "./tabs/TeamPerformanceTab";
import ProjectReportsTab from "./tabs/ProjectReportsTab";
import TaskReportsTab from "./tabs/TaskReportsTab";
import TimeReportsTab from "./tabs/TimeReportsTab";
import WorkReportAnalysisTab from "./tabs/WorkReportAnalysisTab";
import LegacyHistoryTab from "./tabs/LegacyHistoryTab";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "team", label: "Team Performance", icon: Users },
  { id: "projects", label: "Project Reports", icon: Briefcase },
  { id: "tasks", label: "Task Reports", icon: CheckSquare },
  { id: "time", label: "Time Reports", icon: Clock },
  { id: "analysis", label: "Work Report Analysis", icon: FileSpreadsheet },
  { id: "legacy", label: "Legacy History", icon: History }
];

export default function ReportsController({ 
  filterOptions, 
  currentFilters, 
  activeTab, 
  tabData 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = (tabId) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tabId);
    router.push(`/admin/reports?${params.toString()}`);
  };

  return (
    <div className="space-y-6 font-sans animate-fade-in">
      
      {/* Header */}
      <div>
        <span className="text-xs text-neutral-400 font-semibold uppercase tracking-widest block mb-1">
          Reports
        </span>
        <h2 className="text-2xl font-extrabold text-neutral-100 tracking-tight">
          Work Analytics & Logs
        </h2>
      </div>

      <GlobalFilterBar filterOptions={filterOptions} currentFilters={currentFilters} />

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto space-x-2 pb-2 mb-4 scrollbar-hide border-b border-neutral-800/80">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                isActive 
                  ? "border-indigo-500 text-indigo-400" 
                  : "border-transparent text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {tabData.hasError ? (
          <div className="bg-red-950/40 border border-red-900/50 rounded-xl p-6 text-center">
            <h3 className="text-red-400 font-bold mb-2">Error Loading Data</h3>
            <p className="text-sm text-red-300/80">
              There was an issue fetching data for this report. Please check your connection or try adjusting filters.
            </p>
          </div>
        ) : (
          <>
            {activeTab === "overview" && <OverviewTab data={tabData} currentFilters={currentFilters} />}
            {activeTab === "team" && <TeamPerformanceTab data={tabData} />}
            {activeTab === "projects" && <ProjectReportsTab data={tabData} />}
            {activeTab === "tasks" && <TaskReportsTab data={tabData} />}
            {activeTab === "time" && <TimeReportsTab data={tabData} />}
            {activeTab === "analysis" && <WorkReportAnalysisTab data={tabData} />}
            {activeTab === "legacy" && <LegacyHistoryTab data={tabData} />}
          </>
        )}
      </div>

    </div>
  );
}
