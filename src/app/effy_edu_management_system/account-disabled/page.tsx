// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import React from "react";
import { redirect } from "next/navigation";
import { resolveAuthenticatedDestination } from "@/features/effy-edu-demo/lib/supabase/auth";
import { getGlobalSettings } from "@/features/effy-edu-demo/features/website-cms/actions/global-settings";
import { AccountDisabledView } from "./account-disabled-view";

export default async function AccountDisabledPage() {
  const siteInfo = await getGlobalSettings();
  // Authoritative server-side verification checks
  const {
    destination,
    profile,
    studentProfile,
  } = await resolveAuthenticatedDestination();

  if (destination === "UNAUTHENTICATED") {
    redirect("/effy_edu_management_system/login");
  }
  if (destination === "TEACHER_DASHBOARD") {
    redirect("/effy_edu_management_system/teacher");
  }
  if (destination === "STUDENT_DASHBOARD") {
    redirect("/effy_edu_management_system/student");
  }
  if (destination === "PENDING_APPROVAL") {
    redirect("/effy_edu_management_system/pending-approval");
  }
  if (destination === "INVALID_PROFILE") {
    redirect("/effy_edu_management_system/login?error=invalid_profile");
  }

  const studentName = profile?.full_name || "User";
  const studentCode = studentProfile?.student_code || "N/A";

  return (
    <AccountDisabledView
      studentName={studentName}
      studentCode={studentCode}
      contactPhone={siteInfo.phone}
    />
  );
}
