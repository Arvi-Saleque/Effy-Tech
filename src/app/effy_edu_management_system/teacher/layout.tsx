// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import React from "react";
import { TeacherShell } from "@/features/effy-edu-demo/components/dashboard/teacher-shell";

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <TeacherShell userName="Dr. Arif Rahman" userEmail="teacher@demo.edu">
      {children}
    </TeacherShell>
  );
}
