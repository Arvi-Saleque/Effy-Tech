// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { notFound, redirect } from "next/navigation";
import { DashboardPageHeader } from "@/features/effy-edu-demo/components/dashboard/dashboard-page-header";
import { ClassSessionForm } from "@/features/effy-edu-demo/components/class-routine/class-session-form";
import { resolveAuthenticatedDestination } from "@/features/effy-edu-demo/lib/supabase/auth";
import { createAdminClient } from "@/features/effy-edu-demo/lib/supabase/admin";

export default async function EditClassSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const [{ destination }, { sessionId }] = await Promise.all([
    resolveAuthenticatedDestination(undefined, "TEACHER"),
    params,
  ]);
  if (destination === "UNAUTHENTICATED") redirect("/effy_edu_management_system/login");
  if (destination !== "TEACHER_DASHBOARD") redirect("/effy_edu_management_system/student");

  const admin = createAdminClient();
  const [sessionResult, batchesResult, subjectsResult, unitsResult] = await Promise.all([
    admin.from("academic_class_sessions").select("*").eq("id", sessionId).single(),
    admin.from("batches").select("id,name,code").order("name"),
    admin.from("batch_subjects").select("id,batch_id,name,code,status").order("display_order"),
    admin.from("subject_units").select("id,subject_id,title,sequence_no").order("sequence_no"),
  ]);
  if (sessionResult.error || !sessionResult.data) notFound();
  if (batchesResult.error || subjectsResult.error || unitsResult.error) {
    throw batchesResult.error || subjectsResult.error || unitsResult.error;
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader title="Edit Class Routine" description={`Update topic, time, chapter, location, or status for ${sessionResult.data.title}.`} />
      <ClassSessionForm batches={batchesResult.data || []} subjects={subjectsResult.data || []} units={unitsResult.data || []} initialData={sessionResult.data} />
    </div>
  );
}
