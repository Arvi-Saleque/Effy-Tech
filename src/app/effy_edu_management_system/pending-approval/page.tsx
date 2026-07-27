// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import React from "react";
import { redirect } from "next/navigation";
import { resolveAuthenticatedDestination } from "@/features/effy-edu-demo/lib/supabase/auth";
import { getGlobalSettings } from "@/features/effy-edu-demo/features/website-cms/actions/global-settings";
import { PendingApprovalView } from "./pending-approval-view";

export default async function PendingApprovalPage() {
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
  if (destination === "ACCOUNT_DISABLED") {
    redirect("/effy_edu_management_system/account-disabled");
  }
  if (destination === "INVALID_PROFILE") {
    redirect("/effy_edu_management_system/login?error=invalid_profile");
  }

  const studentName = profile?.full_name || "Student";
  const studentCode = studentProfile?.student_code || "N/A";
  const regStatus = studentProfile?.registration_status || "PENDING";
  const regDate = studentProfile?.registered_at
    ? new Date(studentProfile.registered_at).toLocaleDateString()
    : "N/A";

  return (
    <PendingApprovalView
      studentName={studentName}
      studentCode={studentCode}
      registrationStatus={regStatus}
      registrationDate={regDate}
      contactPhone={siteInfo.phone}
      contactEmail={siteInfo.email}
    />
  );
}
