// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import React from "react";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { resolveAuthenticatedDestination } from "@/features/effy-edu-demo/lib/supabase/auth";
import { createAdminClient } from "@/features/effy-edu-demo/lib/supabase/admin";
import { TeacherAnnouncementsPanel } from "@/features/effy-edu-demo/components/materials/teacher-announcements-panel";
import { DashboardPageHeader } from "@/features/effy-edu-demo/components/dashboard/dashboard-page-header";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{
    batchId: string;
  }>;
}

export default async function TeacherBatchAnnouncementsPage({ params }: PageProps) {
  const { batchId } = await params;
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

  // Load batch details
  const { data: batch, error: batchError } = await admin
    .from("batches")
    .select("id, name")
    .eq("id", batchId)
    .single();

  if (batchError || !batch) {
    notFound();
  }

  // Load announcements for this batch
  const announcementsResult = await admin
    .from("announcements")
    .select("*")
    .eq("batch_id", batchId)
    .order("created_at", { ascending: false });

  if (announcementsResult.error) {
    throw new Error("Unable to load batch announcements right now.");
  }

  return (
    <div className="space-y-6 text-xs font-bold text-slate-800">
      <div className="space-y-4">
        <Link
          href={`/effy_edu_management_system/teacher/batches/${batchId}`}
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors font-bold text-xs"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Batch Management
        </Link>
        <DashboardPageHeader
          title={`${batch.name} - Announcements`}
          description="Send alerts, class timings updates, schedule notifications or reminders to the enrolled students."
        />
      </div>

      <TeacherAnnouncementsPanel
        batchId={batchId}
        batchName={batch.name}
        announcements={announcementsResult.data || []}
      />
    </div>
  );
}
