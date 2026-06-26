import { createClient } from "@/lib/supabase/server";
import { 
  getOverviewData, 
  getTeamPerformanceData,
  getProjectReportsData,
  getTaskReportsData,
  getTimeReportsData,
  getWorkReportAnalysisData,
  getLegacyHistoryData,
  fetchFilteredProfiles
} from "@/lib/admin/report-actions";
import { getTodayDateString, getDateStringWithOffset, getCurrentMonthStartDateString } from "@/lib/admin/time";
import ReportsController from "@/components/admin/reports/ReportsController";

export const dynamic = "force-dynamic";

export default async function ReportsPage(props) {
  const searchParams = await props.searchParams;
  const tab = searchParams?.tab || "overview";
  
  const currentFilters = {
    range: searchParams?.range || "today",
    startDate: searchParams?.startDate || "",
    endDate: searchParams?.endDate || "",
    member: searchParams?.member || "all",
    client: searchParams?.client || "all",
    project: searchParams?.project || "all",
    taskStatus: searchParams?.taskStatus || "all",
    reportStatus: searchParams?.reportStatus || "all",
    sourceType: searchParams?.sourceType || "all",
  };

  // Resolve standard date ranges if not custom
  const todayStr = getTodayDateString();
  if (currentFilters.range === "today" && !currentFilters.startDate) {
    currentFilters.startDate = todayStr;
    currentFilters.endDate = todayStr;
  } else if (currentFilters.range === "week" && !currentFilters.startDate) {
    currentFilters.startDate = getDateStringWithOffset(-6);
    currentFilters.endDate = todayStr;
  } else if (currentFilters.range === "month" && !currentFilters.startDate) {
    currentFilters.startDate = getCurrentMonthStartDateString();
    currentFilters.endDate = todayStr;
  } else if (currentFilters.range === "last30" && !currentFilters.startDate) {
    currentFilters.startDate = getDateStringWithOffset(-30);
    currentFilters.endDate = todayStr;
  }
  
  const filterArgs = {
    startDate: currentFilters.startDate,
    endDate: currentFilters.endDate,
    member: currentFilters.member !== "all" ? currentFilters.member : null,
    client: currentFilters.client !== "all" ? currentFilters.client : null,
    project: currentFilters.project !== "all" ? currentFilters.project : null,
    taskStatus: currentFilters.taskStatus !== "all" ? currentFilters.taskStatus : null,
    reportStatus: currentFilters.reportStatus !== "all" ? currentFilters.reportStatus : null,
    sourceType: currentFilters.sourceType !== "all" ? currentFilters.sourceType : null,
  };

  // Fetch filter options globally
  const supabase = await createClient();
  const [membersRes, clientsRes, projectsRes] = await Promise.all([
    fetchFilteredProfiles(supabase),
    supabase.from("clients").select("id, name").order("name"),
    supabase.from("projects").select("id, name").order("name")
  ]);

  if (membersRes.error || clientsRes.error || projectsRes.error) {
    return (
      <div className="p-8 text-center text-red-400 bg-neutral-900 rounded-xl border border-red-900">
        <h2 className="text-xl font-bold mb-2">Filters Unavailable</h2>
        <p>Failed to load filter options. Please try again later.</p>
      </div>
    );
  }
  
  const filterOptions = {
    members: membersRes.data || [],
    clients: clientsRes.data || [],
    projects: projectsRes.data || []
  };

  let tabData = { hasError: true };
  try {
    switch (tab) {
      case "overview":
        tabData = await getOverviewData(filterArgs);
        break;
      case "team":
        tabData = await getTeamPerformanceData(filterArgs);
        break;
      case "projects":
        tabData = await getProjectReportsData(filterArgs);
        break;
      case "tasks":
        tabData = await getTaskReportsData(filterArgs);
        break;
      case "time":
        tabData = await getTimeReportsData(filterArgs);
        break;
      case "analysis":
        tabData = await getWorkReportAnalysisData(filterArgs);
        break;
      case "legacy":
        tabData = await getLegacyHistoryData(filterArgs);
        break;
      default:
        tabData = await getOverviewData(filterArgs);
    }
  } catch (err) {
    console.error(`Error fetching data for tab \${tab}:`, err);
  }

  return (
    <ReportsController 
      filterOptions={filterOptions} 
      currentFilters={currentFilters} 
      activeTab={tab}
      tabData={tabData} 
    />
  );
}
