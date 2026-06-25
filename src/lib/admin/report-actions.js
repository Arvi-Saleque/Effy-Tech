"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/admin/auth";
import { revalidatePath } from "next/cache";

/**
 * Submit or resubmit a task work report.
 * If resubmitting, we create a new row and link it via supersedes_report_id.
 */
export async function submitTaskReport(payload) {
  try {
    const profile = await getCurrentProfile();
    if (!profile) return { error: "Unauthorized" };

    const supabase = await createClient();

    // Verify user is assigned to task
    const { data: assignment, error: assignErr } = await supabase
      .from("task_assignees")
      .select("id")
      .eq("task_id", payload.taskId)
      .eq("user_id", profile.id)
      .single();

    if (assignErr || !assignment) {
      return { error: "You are not assigned to this task." };
    }

    // Check if there's an existing report that is blocking submission (e.g. approved)
    const { data: existingReport } = await supabase
      .from("task_work_reports")
      .select("id, version_number, completion_status")
      .eq("task_id", payload.taskId)
      .eq("submitted_by", profile.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (existingReport?.completion_status === "approved") {
      return { error: "An approved report already exists for this task." };
    }

    const versionNumber = existingReport ? existingReport.version_number + 1 : 1;
    const supersedesId = existingReport ? existingReport.id : null;

    // Validate dates
    if (new Date(payload.submittedDate) < new Date(payload.actualStartDate)) {
      return { error: "Submitted date cannot be before actual start date." };
    }

    if (!payload.workSummary?.trim()) {
      return { error: "Work summary is required." };
    }

    const { error: insertErr } = await supabase
      .from("task_work_reports")
      .insert({
        task_id: payload.taskId,
        submitted_by: profile.id,
        actual_start_date: payload.actualStartDate,
        submitted_date: payload.submittedDate,
        work_summary: payload.workSummary.trim(),
        work_link: payload.workLink?.trim() || null,
        note: payload.note?.trim() || null,
        completion_status: "submitted",
        version_number: versionNumber,
        supersedes_report_id: supersedesId
      });

    if (insertErr) {
      console.error("[submitTaskReport] DB Error:", insertErr);
      return { error: "Failed to submit report. Please try again." };
    }

    revalidatePath(`/admin/projects/${payload.projectId}/tasks/${payload.taskId}`);
    revalidatePath(`/admin/my-work`);
    return { success: true };
  } catch (error) {
    console.error("[submitTaskReport] Exception:", error);
    return { error: error.message || "An unexpected error occurred." };
  }
}

/**
 * Update an unapproved report (for typos)
 */
export async function updateTaskReport(reportId, payload) {
  try {
    const profile = await getCurrentProfile();
    if (!profile) return { error: "Unauthorized" };

    const supabase = await createClient();

    if (new Date(payload.submittedDate) < new Date(payload.actualStartDate)) {
      return { error: "Submitted date cannot be before actual start date." };
    }

    if (!payload.workSummary?.trim()) {
      return { error: "Work summary is required." };
    }

    const { error: updateErr } = await supabase
      .from("task_work_reports")
      .update({
        actual_start_date: payload.actualStartDate,
        submitted_date: payload.submittedDate,
        work_summary: payload.workSummary.trim(),
        work_link: payload.workLink?.trim() || null,
        note: payload.note?.trim() || null
      })
      .eq("id", reportId)
      .eq("submitted_by", profile.id)
      .in("completion_status", ["submitted", "revision_requested"]);

    if (updateErr) {
      console.error("[updateTaskReport] DB Error:", updateErr);
      return { error: "Failed to update report." };
    }

    revalidatePath(`/admin/projects/${payload.projectId}/tasks/${payload.taskId}`);
    return { success: true };
  } catch (error) {
    console.error("[updateTaskReport] Exception:", error);
    return { error: error.message || "An unexpected error occurred." };
  }
}

/**
 * Admin review of a report
 */
export async function reviewTaskReport(reportId, taskId, projectId, action, reviewNote, markTaskDone = false) {
  try {
    const profile = await getCurrentProfile();
    if (!profile || profile.role !== "admin" || !profile.is_active) {
      return { error: "Unauthorized: Active admin required." };
    }

    if (action === "revision_requested" && !reviewNote?.trim()) {
      return { error: "A review note is required when requesting revision." };
    }

    const validStatuses = {
      "approve": "approved",
      "reject": "rejected",
      "revision_requested": "revision_requested"
    };

    const newStatus = validStatuses[action];
    if (!newStatus) return { error: "Invalid review action." };

    const supabase = await createClient();

    // 1. Update report
    const { error: updateErr } = await supabase
      .from("task_work_reports")
      .update({
        completion_status: newStatus,
        reviewed_by: profile.id,
        reviewed_at: new Date().toISOString(),
        review_note: reviewNote?.trim() || null
      })
      .eq("id", reportId);

    if (updateErr) {
      console.error("[reviewTaskReport] Update Error:", updateErr);
      return { error: "Failed to apply review." };
    }

    // 2. Mark task done if requested and approved
    if (newStatus === "approved" && markTaskDone) {
      const { error: taskErr } = await supabase
        .from("project_tasks")
        .update({
          status: "done",
          progress_percent: 100
        })
        .eq("id", taskId)
        .neq("status", "done");

      if (taskErr) {
        console.error("[reviewTaskReport] Task Update Error:", taskErr);
        return { success: true, warning: "Report approved, but failed to mark task as done." };
      }
    }

    revalidatePath(`/admin/projects/${projectId}/tasks/${taskId}`);
    revalidatePath(`/admin/my-work`);
    return { success: true };
  } catch (error) {
    console.error("[reviewTaskReport] Exception:", error);
    return { error: error.message || "An unexpected error occurred." };
  }
}
