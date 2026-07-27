// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import React from "react";
import { redirect } from "next/navigation";
import { resolveAuthenticatedDestination } from "@/features/effy-edu-demo/lib/supabase/auth";
import { createAdminClient } from "@/features/effy-edu-demo/lib/supabase/admin";
import { TeacherMaterialsList } from "@/features/effy-edu-demo/components/materials/teacher-materials-list";
import { DashboardPageHeader } from "@/features/effy-edu-demo/components/dashboard/dashboard-page-header";

export default async function TeacherMaterialsPage() {
  // Authoritative server-side status resolution
  const { destination } = await resolveAuthenticatedDestination(undefined, "TEACHER");

  if (destination === "UNAUTHENTICATED") {
    redirect("/effy_edu_management_system/login");
  }
  if (destination === "STUDENT_DASHBOARD") {
    redirect("/effy_edu_management_system/student");
  }
  if (destination === "PENDING_APPROVAL") {
    redirect("/effy_edu_management_system/pending-approval");
  }
  if (destination === "ACCOUNT_DISABLED") {
    redirect("/effy_edu_management_system/account-disabled");
  }
  if (destination === "INVALID_PROFILE") {
    redirect("/effy_edu_management_system/login?error=invalid_profile");
  }

  const admin = createAdminClient();

  const [materialsResult, batchesResult, subjectsResult] = await Promise.all([
    admin
      .from("batch_contents")
      .select("*, batches(name), subject:batch_subjects(id, name, code)")
      .order("created_at", { ascending: false }),
    admin
      .from("batches")
      .select("id, name")
      .order("name", { ascending: true }),
    admin
      .from("batch_subjects")
      .select("id,batch_id,name,code")
      .neq("status", "ARCHIVED")
      .order("display_order", { ascending: true }),
  ]);

  if (materialsResult.error) {
    throw new Error(`Unable to load study materials: ${materialsResult.error.message}`);
  }
  if (batchesResult.error || subjectsResult.error) {
    throw new Error("Unable to load material filters right now.");
  }
  const normalizedMaterials = (materialsResult.data || []).map((material) => ({
    ...material,
    subject: Array.isArray(material.subject) ? material.subject[0] || null : material.subject || null,
  }));

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        title="Class Study Materials"
        description="Upload handouts, secure PDF notes, homework assignments, or link reference videos to your student batches."
      />
      <TeacherMaterialsList
        key="all-materials"
        materials={normalizedMaterials}
        batches={batchesResult.data || []}
        subjects={subjectsResult.data || []}
      />
    </div>
  );
}
