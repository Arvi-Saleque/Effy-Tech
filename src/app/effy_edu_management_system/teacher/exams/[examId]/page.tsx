// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import React from "react";
import { notFound, redirect } from "next/navigation";
import { resolveAuthenticatedDestination } from "@/features/effy-edu-demo/lib/supabase/auth";
import { createClient } from "@/features/effy-edu-demo/lib/supabase/server";
import { ResultsManager } from "./results/results-manager";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ExamListActions } from "@/features/effy-edu-demo/components/dashboard/exam-list-actions";

interface PageProps {
  params: Promise<{
    examId: string;
  }>;
}

export default async function ExamDetailsPage({ params }: PageProps) {
  const { examId } = await params;
  const { destination } = await resolveAuthenticatedDestination(undefined, "TEACHER");

  if (destination === "UNAUTHENTICATED") {
    redirect("/effy_edu_management_system/login");
  }
  if (destination !== "TEACHER_DASHBOARD") {
    redirect("/effy_edu_management_system");
  }

  const supabase = await createClient();

  const { data: exam, error: examError } = await supabase
    .from("exams")
    .select("*, batches(id, name, code)")
    .eq("id", examId)
    .single();

  if (examError || !exam) {
    notFound();
  }

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(`
      id,
      status,
      student:student_profiles (
        id,
        student_code,
        profile:profiles (
          full_name
        )
      )
    `)
    .eq("batch_id", exam.batch_id)
    .in("status", ["ACTIVE", "COMPLETED"]);

  const { data: results } = await supabase
    .from("exam_results")
    .select("*")
    .eq("exam_id", examId);

  const studentsList = (enrollments || []).map((enr: any) => ({
    enrollmentId: enr.id,
    studentId: enr.student.id,
    studentCode: enr.student.student_code,
    fullName: enr.student.profile.full_name,
    enrollmentStatus: enr.status,
  }));

  const initialResults = (results || []).map((r: any) => ({
    studentId: r.student_id,
    enrollmentId: r.enrollment_id,
    attendanceStatus: r.attendance_status,
    obtainedMarks: r.obtained_marks,
    remarks: r.remarks,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-border/40 shadow-xs">
        <Link
          href="/effy_edu_management_system/teacher/exams"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors font-bold text-xs"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Examinations
        </Link>
        <ExamListActions examId={examId} examName={exam.name} status={exam.status} />
      </div>

      <ResultsManager
        examId={examId}
        exam={exam as any}
        students={studentsList}
        initialResults={initialResults}
        initialMode="VIEW"
      />
    </div>
  );
}
