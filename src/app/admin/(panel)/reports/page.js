import { getReportsData } from "@/lib/admin/actions";
import ReportsClient from "@/components/admin/ReportsClient";

export const dynamic = "force-dynamic";

export default async function ReportsPage(props) {
  const searchParams = await props.searchParams;
  const range = searchParams?.range || "today";
  const initialData = await getReportsData(range);

  return <ReportsClient initialData={initialData} currentRange={range} />;
}

