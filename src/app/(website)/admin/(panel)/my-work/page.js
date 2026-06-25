import { getMyWorkData } from "@/lib/admin/actions";
import MyWorkClient from "@/components/admin/MyWorkClient";

export const dynamic = "force-dynamic";

export default async function MyWorkPage() {
  const initialData = await getMyWorkData();

  return <MyWorkClient initialData={initialData} />;
}

