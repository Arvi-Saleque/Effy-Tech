// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import React from "react";
import { StudentShell } from "@/features/effy-edu-demo/components/dashboard/student-shell";
import { demoTables } from "@/features/effy-edu-demo/lib/demo/mock-data";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const student = demoTables.student_profiles[0];
  const profile = demoTables.profiles.find((p:any) => p.id === student.profile_id);
  const activeBatches = demoTables.enrollments
    .filter((e:any) => e.student_id === student.id && e.status === "ACTIVE")
    .map((e:any) => demoTables.batches.find((b:any) => b.id === e.batch_id))
    .filter(Boolean);
  return (
    <StudentShell userName={profile?.full_name || "Demo Student"} userEmail={profile?.email || "student@demo.edu"} activeBatches={activeBatches}>
      {children}
    </StudentShell>
  );
}
