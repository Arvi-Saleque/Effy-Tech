// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import React from "react";
import { redirect } from "next/navigation";
import { resolveAuthenticatedDestination } from "@/features/effy-edu-demo/lib/supabase/auth";
import { createClient } from "@/features/effy-edu-demo/lib/supabase/server";
import { DashboardPageHeader } from "@/features/effy-edu-demo/components/dashboard/dashboard-page-header";
import { SettingsForm } from "./settings-form";

export default async function TeacherSettingsPage() {
  const { profile, destination } = await resolveAuthenticatedDestination(undefined, "TEACHER");

  if (destination !== "TEACHER_DASHBOARD" || !profile) {
    redirect("/effy_edu_management_system/login");
  }

  const supabase = await createClient();

  // Fetch coaching center settings (single row with primary key = true)
  const { data: settings } = await supabase
    .from("app_settings")
    .select("*")
    .eq("id", true)
    .single();

  const initialData = {
    coachingCenterName: settings?.coaching_center_name || "EduPilot Coaching Academy",
    shortName: settings?.short_name || "ST",
    studentIdPrefix: settings?.student_id_prefix || "ST",
    publicPhone: settings?.public_phone || "+8801234567890",
    publicEmail: settings?.public_email || "hello@edupilot.demo",
    address: settings?.address || "Dhaka, Bangladesh",
    defaultCurrency: settings?.default_currency || "BDT",
    defaultTimezone: settings?.default_timezone || "Asia/Dhaka",
    academicSession: settings?.academic_session || "2026",
    defaultGradingScale: settings?.default_grading_scale || "STANDARD",
    pendingApprovalContactText: settings?.pending_approval_contact_text || "Please contact administration to activate your account.",
    disabledAccountContactText: settings?.disabled_account_contact_text || "Your account is disabled. Please contact administration.",
    studentRankVisible: settings?.student_rank_visible ?? true,
    completedBatchesVisible: settings?.completed_batches_visible ?? true,
    gradesDisplayed: settings?.grades_displayed ?? true,
  };

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        title="Application Settings"
        description="Configure your coaching center identity, localization values, student ID patterns, and gating screen alert descriptions."
      />

      <SettingsForm initialData={initialData} />
    </div>
  );
}
