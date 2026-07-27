// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
"use server";

import { createClient } from "@/features/effy-edu-demo/lib/supabase/server";
import { createAdminClient } from "@/features/effy-edu-demo/lib/supabase/admin";
import { resolveAuthenticatedDestination } from "@/features/effy-edu-demo/lib/supabase/auth";
import { requireTeacher } from "@/features/effy-edu-demo/lib/auth-guards";
import { createAuditLog } from "@/features/effy-edu-demo/lib/audit";
import { createNotificationForProfile } from "@/features/effy-edu-demo/lib/notifications";
import { revalidatePath } from "next/cache";
import {
  studentProfileSelfSchema,
  teacherProfileSelfSchema,
  studentProfileTeacherEditSchema,
  appSettingsSchema,
} from "@/features/effy-edu-demo/lib/validations/profiles";

const normalizePhone = (phone: string) => {
  if (!phone) return "";
  return phone.replace(/[\s()-]/g, "");
};

/**
 * 1. Student self profile edit
 */
export async function updateStudentProfileSelfAction(rawInput: any) {
  try {
    const { destination, profile } = await resolveAuthenticatedDestination(undefined, "STUDENT");
    if (destination !== "STUDENT_DASHBOARD" || !profile) {
      return { success: false, message: "Unauthorized: Only active students can update their profile details." };
    }

    // Validate inputs
    const validated = studentProfileSelfSchema.safeParse({
      phone: normalizePhone(rawInput.phone),
      guardianName: rawInput.guardianName,
      guardianPhone: normalizePhone(rawInput.guardianPhone),
      address: rawInput.address,
      dateOfBirth: rawInput.dateOfBirth || null,
      avatarUrl: rawInput.avatarUrl || null,
    });

    if (!validated.success) {
      return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    const data = validated.data;
    const admin = createAdminClient();

    // Fetch existing student details
    const { data: studentProfile, error: fetchErr } = await admin
      .from("student_profiles")
      .select("*")
      .eq("profile_id", profile.id)
      .single();

    if (fetchErr || !studentProfile) {
      return { success: false, message: "Student profile record not found." };
    }

    // Update profiles table (phone)
    const { error: profileErr } = await admin
      .from("profiles")
      .update({ phone: data.phone })
      .eq("id", profile.id);

    if (profileErr) {
      return { success: false, message: `Failed to update profile: ${profileErr.message}` };
    }

    // Update student_profiles table
    const { error: studentErr } = await admin
      .from("student_profiles")
      .update({
        guardian_name: data.guardianName,
        guardian_phone: data.guardianPhone,
        address: data.address,
        date_of_birth: data.dateOfBirth,
      })
      .eq("profile_id", profile.id);

    if (studentErr) {
      return { success: false, message: `Failed to update student details: ${studentErr.message}` };
    }

    // Create Audit Log
    await createAuditLog({
      actorProfileId: profile.id,
      action: "STUDENT_SELF_PROFILE_UPDATED",
      entityType: "student_profiles",
      entityId: studentProfile.id,
      oldValue: {
        phone: profile.phone,
        guardian_name: studentProfile.guardian_name,
        guardian_phone: studentProfile.guardian_phone,
        address: studentProfile.address,
        date_of_birth: studentProfile.date_of_birth,
      },
      newValue: {
        phone: data.phone,
        guardian_name: data.guardianName,
        guardian_phone: data.guardianPhone,
        address: data.address,
        date_of_birth: data.dateOfBirth,
      },
    });

    revalidatePath("/effy_edu_management_system/student/profile");
    return { success: true };
  } catch (err: any) {
    return { success: false, message: err.message || "Internal server error" };
  }
}

/**
 * 2. Teacher self profile edit
 */
export async function updateTeacherProfileSelfAction(rawInput: any) {
  try {
    const { profile } = await requireTeacher();

    // Validate inputs
    const validated = teacherProfileSelfSchema.safeParse({
      fullName: rawInput.fullName,
      phone: rawInput.phone ? normalizePhone(rawInput.phone) : null,
      email: rawInput.email,
      designation: rawInput.designation,
      coachingCenterName: rawInput.coachingCenterName,
      publicContactInfo: rawInput.publicContactInfo,
      avatarUrl: rawInput.avatarUrl || null,
    });

    if (!validated.success) {
      return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    const data = validated.data;
    const admin = createAdminClient();

    // Fetch existing teacher profile details
    const { data: teacherProfile, error: fetchErr } = await admin
      .from("teacher_profiles")
      .select("*")
      .eq("profile_id", profile.id)
      .single();

    // Update profiles table
    const { error: profileErr } = await admin
      .from("profiles")
      .update({
        full_name: data.fullName,
        phone: data.phone,
      })
      .eq("id", profile.id);

    if (profileErr) {
      return { success: false, message: `Failed to update profiles: ${profileErr.message}` };
    }

    // Update or insert teacher_profiles table
    if (teacherProfile) {
      const { error: tErr } = await admin
        .from("teacher_profiles")
        .update({
          designation: data.designation,
          coaching_center_name: data.coachingCenterName,
          public_contact_info: data.publicContactInfo,
        })
        .eq("profile_id", profile.id);

      if (tErr) return { success: false, message: `Failed to update teacher profile details: ${tErr.message}` };
    } else {
      const { error: tErr } = await admin.from("teacher_profiles").insert({
        profile_id: profile.id,
        designation: data.designation,
        coaching_center_name: data.coachingCenterName,
        public_contact_info: data.publicContactInfo,
      });

      if (tErr) return { success: false, message: `Failed to insert teacher profile details: ${tErr.message}` };
    }

    // Handle email change securely via Supabase Auth
    let emailChangeTriggered = false;
    if (data.email.toLowerCase() !== profile.email.toLowerCase()) {
      const supabase = await createClient();
      const { error: authEmailErr } = await supabase.auth.updateUser({ email: data.email });
      if (authEmailErr) {
        return {
          success: false,
          message: `Profile updated, but failed to request email change: ${authEmailErr.message}`,
        };
      }
      emailChangeTriggered = true;
    }

    // Audit log
    await createAuditLog({
      actorProfileId: profile.id,
      action: "TEACHER_SELF_PROFILE_UPDATED",
      entityType: "profiles",
      entityId: profile.id,
      newValue: {
        full_name: data.fullName,
        phone: data.phone,
        designation: data.designation,
        coaching_center_name: data.coachingCenterName,
        public_contact_info: data.publicContactInfo,
        email_change_requested: emailChangeTriggered,
      },
    });

    revalidatePath("/effy_edu_management_system/teacher/profile");
    return { success: true, emailChangeTriggered };
  } catch (err: any) {
    return { success: false, message: err.message || "Internal server error" };
  }
}

/**
 * 3. Teacher updates Student profile details
 */
export async function updateStudentProfileByTeacherAction(studentId: string, rawInput: any) {
  try {
    const { profile: teacher } = await requireTeacher();

    const validated = studentProfileTeacherEditSchema.safeParse({
      fullName: rawInput.fullName,
      phone: normalizePhone(rawInput.phone),
      academicLevel: rawInput.academicLevel,
      institution: rawInput.institution,
      guardianName: rawInput.guardianName,
      guardianPhone: normalizePhone(rawInput.guardianPhone),
      address: rawInput.address,
      dateOfBirth: rawInput.dateOfBirth || null,
      registrationStatus: rawInput.registrationStatus,
      accountStatus: rawInput.accountStatus,
      teacherNote: rawInput.teacherNote || null,
      studentCode: rawInput.studentCode,
      correctionReason: rawInput.correctionReason || null,
      confirmCorrection: rawInput.confirmCorrection === true || rawInput.confirmCorrection === "true",
    });

    if (!validated.success) {
      return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    const data = validated.data;
    const admin = createAdminClient();

    // Fetch existing student profile details
    const { data: student, error: fetchErr } = await admin
      .from("student_profiles")
      .select("*, profiles(*)")
      .eq("id", studentId)
      .single();

    if (fetchErr || !student) {
      return { success: false, message: "Student record not found." };
    }

    const studentProfileObj = student.profiles as any;

    // 1. Handle Student ID Correction
    if (data.studentCode !== student.student_code) {
      if (!data.confirmCorrection) {
        return { success: false, message: "Student ID correction requires explicit confirmation." };
      }
      if (!data.correctionReason || !data.correctionReason.trim()) {
        return { success: false, message: "Student ID correction requires a documented reason." };
      }

      // Check unique code constraint
      const { data: duplicate } = await admin
        .from("student_profiles")
        .select("id")
        .eq("student_code", data.studentCode)
        .neq("id", studentId)
        .maybeSingle();

      if (duplicate) {
        return { success: false, message: `Student ID '${data.studentCode}' is already assigned to another student.` };
      }

      // Invoke DB function to update code (which sets postgres config bypass)
      const { error: rpcError } = await admin.rpc("update_student_code_admin", {
        student_profile_id: studentId,
        new_code: data.studentCode,
      });

      if (rpcError) {
        return { success: false, message: `Failed to correct Student ID: ${rpcError.message}` };
      }

      // Audit log student code correction
      await createAuditLog({
        actorProfileId: teacher.id,
        action: "STUDENT_ID_CORRECTED",
        entityType: "student_profiles",
        entityId: studentId,
        oldValue: { student_code: student.student_code },
        newValue: { student_code: data.studentCode, reason: data.correctionReason },
      });
    }

    // 2. Update profiles table
    const { error: profileErr } = await admin
      .from("profiles")
      .update({
        full_name: data.fullName,
        phone: data.phone,
        account_status: data.accountStatus,
      })
      .eq("id", student.profile_id);

    if (profileErr) {
      return { success: false, message: `Failed to update profiles: ${profileErr.message}` };
    }

    // 3. Update student_profiles table
    const { error: studentErr } = await admin
      .from("student_profiles")
      .update({
        academic_level: data.academicLevel,
        institution: data.institution,
        guardian_name: data.guardianName,
        guardian_phone: data.guardianPhone,
        address: data.address,
        date_of_birth: data.dateOfBirth,
        registration_status: data.registrationStatus,
        teacher_note: data.teacherNote,
      })
      .eq("id", studentId);

    if (studentErr) {
      return { success: false, message: `Failed to update student details: ${studentErr.message}` };
    }

    // Log general updates
    await createAuditLog({
      actorProfileId: teacher.id,
      action: "TEACHER_UPDATED_STUDENT_PROFILE",
      entityType: "student_profiles",
      entityId: studentId,
      newValue: {
        fullName: data.fullName,
        phone: data.phone,
        academicLevel: data.academicLevel,
        institution: data.institution,
        guardianName: data.guardianName,
        guardianPhone: data.guardianPhone,
        address: data.address,
        dateOfBirth: data.dateOfBirth,
        registrationStatus: data.registrationStatus,
        accountStatus: data.accountStatus,
        teacherNote: data.teacherNote,
      },
    });

    // Notify student of changes if applicable
    if (data.accountStatus !== studentProfileObj.account_status) {
      const action = data.accountStatus === "DISABLED" ? "STUDENT_ACCOUNT_DISABLED" : "STUDENT_ACCOUNT_REACTIVATED";
      await createNotificationForProfile({
        profileId: student.profile_id,
        type: action,
        title: data.accountStatus === "DISABLED" ? "Account Disabled" : "Account Activated",
        message: data.accountStatus === "DISABLED"
          ? "Your portal account access has been suspended."
          : "Your portal account access has been reactivated.",
        relatedEntityType: "profiles",
        relatedEntityId: student.profile_id,
      });
    }

    if (data.registrationStatus !== student.registration_status) {
      const action = data.registrationStatus === "APPROVED" ? "REGISTRATION_APPROVED" : "REGISTRATION_REJECTED";
      await createNotificationForProfile({
        profileId: student.profile_id,
        type: action,
        title: data.registrationStatus === "APPROVED" ? "Registration Approved" : "Registration Rejected",
        message: data.registrationStatus === "APPROVED"
          ? "Your registration has been approved. Welcome to our coaching center!"
          : "Your registration has been rejected by administration.",
        relatedEntityType: "student_profiles",
        relatedEntityId: studentId,
      });
    }

    revalidatePath("/effy_edu_management_system/teacher/students");
    revalidatePath(`/effy_edu_management_system/teacher/students/${studentId}`);
    revalidatePath(`/effy_edu_management_system/teacher/students/${studentId}/edit`);
    return { success: true };
  } catch (err: any) {
    return { success: false, message: err.message || "Internal server error" };
  }
}

/**
 * 3.5. Teacher/Admin deletes Student profile & account permanently with clean cascade
 */
export async function deleteStudentByAdminAction(studentId: string) {
  try {
    const { profile: teacher } = await requireTeacher();

    const admin = createAdminClient();

    // 1. Fetch student and associated profile_id
    const { data: student, error: fetchErr } = await admin
      .from("student_profiles")
      .select("*, profile:profiles(*)")
      .eq("id", studentId)
      .single();

    if (fetchErr || !student) {
      return { success: false, message: "Student record not found." };
    }

    const profileId = student.profile_id;

    // 2. Fetch enrollments so related notifications can be removed before
    // database foreign-key cascades delete enrollment-owned records.
    const { data: studentEnrollments } = await admin
      .from("enrollments")
      .select("id")
      .eq("student_id", studentId);

    if (studentEnrollments && studentEnrollments.length > 0) {
      const enrollmentIds = studentEnrollments.map((e) => e.id);
      await admin.from("payments").delete().in("enrollment_id", enrollmentIds);
      await admin.from("exam_results").delete().in("enrollment_id", enrollmentIds);
      await admin.from("notifications").delete().in("related_entity_id", enrollmentIds);
      await admin.from("enrollments").delete().eq("student_id", studentId);
    }

    // 3. Clean up notifications linked to this profile.
    if (profileId) {
      await admin.from("notifications").delete().eq("user_id", profileId);
    }

    // 4. Delete the student_profiles row
    const { error: deleteStudentErr } = await admin
      .from("student_profiles")
      .delete()
      .eq("id", studentId);

    if (deleteStudentErr) {
      return { success: false, message: `Failed to delete student: ${deleteStudentErr.message}` };
    }

    // 5. Delete the profile row if it belongs purely to this student
    if (profileId) {
      const { data: profileObj } = await admin.from("profiles").select("role, auth_user_id").eq("id", profileId).maybeSingle();
      if (profileObj && profileObj.role === "STUDENT") {
        await admin.from("profiles").delete().eq("id", profileId);
        if (profileObj.auth_user_id && admin.auth?.admin?.deleteUser) {
          try {
            await admin.auth.admin.deleteUser(profileObj.auth_user_id);
          } catch (e) {
            console.error("Non-fatal: could not delete auth.user:", e);
          }
        }
      }
    }

    // 6. Audit log
    await createAuditLog({
      actorProfileId: teacher.id,
      action: "STUDENT_DELETED",
      entityType: "student_profiles",
      entityId: studentId,
      oldValue: student,
    });

    revalidatePath("/effy_edu_management_system/teacher/students");
    return { success: true };
  } catch (err: any) {
    console.error("Error in deleteStudentByAdminAction:", err);
    return { success: false, message: err.message || "Internal server error" };
  }
}

/**
 * 4. Teachers update coaching center application settings
 */
export async function updateAppSettingsAction(rawInput: any) {
  try {
    const { profile: teacher } = await requireTeacher();

    const validated = appSettingsSchema.safeParse({
      coachingCenterName: rawInput.coachingCenterName,
      shortName: rawInput.shortName,
      studentIdPrefix: rawInput.studentIdPrefix,
      publicPhone: normalizePhone(rawInput.publicPhone),
      publicEmail: rawInput.publicEmail,
      address: rawInput.address,
      defaultCurrency: rawInput.defaultCurrency,
      defaultTimezone: rawInput.defaultTimezone,
      academicSession: rawInput.academicSession,
      defaultGradingScale: rawInput.defaultGradingScale,
      pendingApprovalContactText: rawInput.pendingApprovalContactText,
      disabledAccountContactText: rawInput.disabledAccountContactText,
      studentRankVisible: rawInput.studentRankVisible === true || rawInput.studentRankVisible === "true",
      completedBatchesVisible: rawInput.completedBatchesVisible === true || rawInput.completedBatchesVisible === "true",
      gradesDisplayed: rawInput.gradesDisplayed === true || rawInput.gradesDisplayed === "true",
    });

    if (!validated.success) {
      return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    const data = validated.data;
    const admin = createAdminClient();

    // Fetch existing settings
    const { data: oldSettings } = await admin
      .from("app_settings")
      .select("*")
      .eq("id", true)
      .single();

    // Warn about student ID prefix in code - prefix affects future IDs only.
    // The alert warning check is displayed client-side prior to execution.

    // Update settings table
    const { error } = await admin
      .from("app_settings")
      .upsert({
        id: true,
        coaching_center_name: data.coachingCenterName,
        short_name: data.shortName,
        student_id_prefix: data.studentIdPrefix,
        public_phone: data.publicPhone,
        public_email: data.publicEmail,
        address: data.address,
        default_currency: data.defaultCurrency,
        default_timezone: data.defaultTimezone,
        academic_session: data.academicSession,
        default_grading_scale: data.defaultGradingScale,
        pending_approval_contact_text: data.pendingApprovalContactText,
        disabled_account_contact_text: data.disabledAccountContactText,
        student_rank_visible: data.studentRankVisible,
        completed_batches_visible: data.completedBatchesVisible,
        grades_displayed: data.gradesDisplayed,
      });

    if (error) {
      return { success: false, message: `Failed to save settings: ${error.message}` };
    }

    // Audit log
    await createAuditLog({
      actorProfileId: teacher.id,
      action: "TEACHER_SETTINGS_UPDATED",
      entityType: "app_settings",
      entityId: "00000000-0000-0000-0000-000000000000", // system entity
      oldValue: oldSettings,
      newValue: data,
    });

    revalidatePath("/effy_edu_management_system/teacher/settings");
    revalidatePath("/effy_edu_management_system/student/profile");
    revalidatePath("/effy_edu_management_system/pending-approval");
    revalidatePath("/effy_edu_management_system/account-disabled");
    return { success: true };
  } catch (err: any) {
    return { success: false, message: err.message || "Internal server error" };
  }
}

/**
 * 5. Secure Server-side image uploads for profile photograph
 */
export async function uploadAvatarAction(formData: FormData) {
  try {
    const role = formData.get("role") === "STUDENT" ? "STUDENT" : "TEACHER";
    const { profile } = await resolveAuthenticatedDestination(undefined, role);
    if (!profile) return { success: false, message: "Unauthorized" };

    const file = formData.get("file") as File | null;
    if (!file || file.size === 0) return { success: false, message: "No file provided" };
    if (file.size > 5 * 1024 * 1024) return { success: false, message: "File size exceeds the maximum 5 MB limit." };
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      return { success: false, message: "Unsupported file type. Please upload a JPG, PNG, or WEBP image." };
    }

    // Store a compact browser-renderable data URL in the process-local mock data.
    // It is intentionally temporary and disappears when the demo server restarts.
    const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
    const avatarUrl = `data:${file.type};base64,${base64}`;
    const admin = createAdminClient();
    const { error } = await admin
      .from("profiles")
      .update({ avatar_url: avatarUrl, avatar_cloudinary_public_id: null })
      .eq("id", profile.id);

    if (error) return { success: false, message: `Failed to save avatar: ${error.message}` };

    await createAuditLog({
      actorProfileId: profile.id,
      action: "PROFILE_AVATAR_UPDATED",
      entityType: "profiles",
      entityId: profile.id,
    });

    revalidatePath("/effy_edu_management_system/student/profile");
    revalidatePath("/effy_edu_management_system/teacher/profile");
    return { success: true, avatarUrl };
  } catch (err: any) {
    return { success: false, message: err.message || "Internal server error" };
  }
}
