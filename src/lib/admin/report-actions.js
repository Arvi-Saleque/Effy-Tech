"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/admin/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ReportPayloadSchema = z.object({
  taskId: z.string().uuid("Invalid task ID"),
  projectId: z.string().uuid("Invalid project ID"),
  actualStartDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid start date format"),
  submittedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid submitted date format"),
  workSummary: z.string().trim().min(1, "Work summary is required").max(10000, "Summary too long"),
  workLink: z.string().trim().url("Invalid URL").optional().or(z.literal("")),
  note: z.string().trim().max(10000, "Note too long").optional().or(z.literal(""))
}).refine(data => new Date(data.submittedDate) >= new Date(data.actualStartDate), {
  message: "Submitted date cannot be before actual start date.",
  path: ["submittedDate"]
});

const UpdatePayloadSchema = ReportPayloadSchema.extend({
  reportId: z.string().uuid("Invalid report ID")
});

const ReviewSchema = z.object({
  reportId: z.string().uuid("Invalid report ID"),
  taskId: z.string().uuid("Invalid task ID").optional(),
  projectId: z.string().uuid("Invalid project ID").optional(),
  action: z.enum(["approve", "reject", "revision_requested"], { errorMap: () => ({ message: "Invalid review action." }) }),
  reviewNote: z.string().trim().max(10000, "Review note too long").optional().or(z.literal("")),
  markTaskDone: z.boolean().optional()
}).refine(data => {
  if (data.action === "revision_requested" && (!data.reviewNote || data.reviewNote.trim() === "")) {
    return false;
  }
  return true;
}, {
  message: "A review note is required when requesting revision.",
  path: ["reviewNote"]
});

/**
 * Submit or resubmit a task work report.
 * If resubmitting, we create a new row and link it via supersedes_report_id.
 */
export async function submitTaskReport(payload) {
  try {
    const profile = await getCurrentProfile();
    if (!profile) return { error: "Unauthorized" };

    const parsed = ReportPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      return { error: parsed.error.errors[0].message };
    }
    const data = parsed.data;

    const supabase = await createClient();

    const { data: rpcData, error: rpcErr } = await supabase.rpc("submit_task_work_report", {
      p_task_id: data.taskId,
      p_actual_start_date: data.actualStartDate,
      p_submitted_date: data.submittedDate,
      p_work_summary: data.workSummary,
      p_work_link: data.workLink || null,
      p_note: data.note || null
    });

    if (rpcErr) {
      console.error("[submitTaskReport] RPC Error:", rpcErr);
      return { error: rpcErr.message || "Failed to submit report. Please try again." };
    }

    if (!rpcData || rpcData.length !== 1) {
      return { error: "Submission failed or returned unexpected data." };
    }

    const { task_id, project_id } = rpcData[0];
    revalidatePath(`/admin/projects/${project_id}/tasks/${task_id}`);
    
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

    const parsed = UpdatePayloadSchema.safeParse({ reportId, ...payload });
    if (!parsed.success) {
      return { error: parsed.error.errors[0].message };
    }
    const data = parsed.data;

    const supabase = await createClient();

    const { data: rpcData, error: rpcErr } = await supabase.rpc("update_task_work_report", {
      p_report_id: data.reportId,
      p_actual_start_date: data.actualStartDate,
      p_submitted_date: data.submittedDate,
      p_work_summary: data.workSummary,
      p_work_link: data.workLink || null,
      p_note: data.note || null
    });

    if (rpcErr) {
      console.error("[updateTaskReport] RPC Error:", rpcErr);
      return { error: rpcErr.message || "Failed to update report." };
    }

    if (!rpcData || rpcData.length !== 1) {
      return { error: "Update failed or returned unexpected data." };
    }

    const { task_id, project_id } = rpcData[0];
    revalidatePath(`/admin/projects/${project_id}/tasks/${task_id}`);

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

    const parsed = ReviewSchema.safeParse({ reportId, taskId, projectId, action, reviewNote, markTaskDone });
    if (!parsed.success) {
      return { error: parsed.error.errors[0].message };
    }
    const data = parsed.data;

    const validStatuses = {
      "approve": "approved",
      "reject": "rejected",
      "revision_requested": "revision_requested"
    };

    const newStatus = validStatuses[data.action];
    
    const supabase = await createClient();

    const { data: rpcData, error: rpcErr } = await supabase.rpc("review_task_work_report", {
      p_report_id: data.reportId,
      p_review_action: newStatus,
      p_review_note: data.reviewNote || null,
      p_mark_task_done: data.markTaskDone || false
    });

    if (rpcErr) {
      console.error("[reviewTaskReport] RPC Error:", rpcErr);
      return { error: rpcErr.message || "Failed to apply review." };
    }

    if (!rpcData || rpcData.length !== 1) {
      return { error: "Review failed or returned unexpected data." };
    }

    const { task_id, project_id } = rpcData[0];
    revalidatePath(`/admin/projects/${project_id}/tasks/${task_id}`);
    
    revalidatePath(`/admin/my-work`);
    return { success: true };
  } catch (error) {
    console.error("[reviewTaskReport] Exception:", error);
    return { error: error.message || "An unexpected error occurred." };
  }
}
