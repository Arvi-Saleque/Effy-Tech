// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { redirect } from "next/navigation";
import { DashboardPageHeader } from "@/features/effy-edu-demo/components/dashboard/dashboard-page-header";
import { AssignmentForm } from "@/features/effy-edu-demo/components/assignments/assignment-form";
import { resolveAuthenticatedDestination } from "@/features/effy-edu-demo/lib/supabase/auth";
import { createAdminClient } from "@/features/effy-edu-demo/lib/supabase/admin";

export default async function NewAssignmentPage({
  searchParams,
}: {
  searchParams: Promise<{ batchId?: string; subjectId?: string }>;
}) {
  const [{ destination }, params] = await Promise.all([
    resolveAuthenticatedDestination(undefined, "TEACHER"),
    searchParams,
  ]);
  if (destination === "UNAUTHENTICATED") redirect("/effy_edu_management_system/login");
  if (destination !== "TEACHER_DASHBOARD") redirect("/effy_edu_management_system/student");

  const admin = createAdminClient();
  const [batchesResult, subjectsResult, unitsResult] = await Promise.all([
    admin.from("batches").select("id,name,code").not("status", "in", "(ARCHIVED,CANCELLED)").order("name"),
    admin.from("batch_subjects").select("id,batch_id,name,code,status").neq("status", "ARCHIVED").order("display_order"),
    admin.from("subject_units").select("id,subject_id,title,sequence_no").neq("status", "SKIPPED").order("sequence_no"),
  ]);
  if (batchesResult.error || subjectsResult.error || unitsResult.error) {
    throw batchesResult.error || subjectsResult.error || unitsResult.error;
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Create Assignment"
        description="Publish structured homework with a clear deadline, marks, resources, and subject connection."
      />
      <AssignmentForm
        batches={batchesResult.data || []}
        subjects={subjectsResult.data || []}
        units={unitsResult.data || []}
        preselectedBatchId={params.batchId || ""}
        preselectedSubjectId={params.subjectId || ""}
      />
    </div>
  );
}
