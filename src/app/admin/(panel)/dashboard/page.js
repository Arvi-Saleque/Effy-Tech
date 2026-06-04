import { getAdminDashboardData } from "@/lib/admin/actions";
import DashboardClient from "@/components/admin/DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const initialData = await getAdminDashboardData();

  return <DashboardClient initialData={initialData} />;
}

