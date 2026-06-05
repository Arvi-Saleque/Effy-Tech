"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAuth, requireAdmin } from "@/lib/admin/auth";
import { 
  getTodayDateString, 
  getTomorrowDateString, 
  calculateSessionDisplayMinutes,
  getDateStringWithOffset,
  getCurrentMonthStartDateString
} from "@/lib/admin/time";
import { revalidatePath } from "next/cache";

/**
 * Fetch all data needed for the logged-in user's My Work page.
 */
export async function getMyWorkData() {
  const profile = await requireAuth();
  try {
    const supabase = await createClient();
    const today = getTodayDateString();
    const tomorrow = getTomorrowDateString();

    // Get today's work session
    const { data: todaySession, error: sessionError } = await supabase
      .from("work_sessions")
      .select("*")
      .eq("user_id", profile.id)
      .eq("work_date", today)
      .maybeSingle();

    // Get today's daily work log
    const { data: todayLog, error: logError } = await supabase
      .from("daily_work_logs")
      .select("*")
      .eq("user_id", profile.id)
      .eq("work_date", today)
      .maybeSingle();

    // Get today's assignments
    const { data: todayAssignments, error: todayAssignError } = await supabase
      .from("work_assignments")
      .select("*")
      .eq("assigned_to", profile.id)
      .eq("work_date", today)
      .order("created_at", { ascending: true });

    // Get tomorrow's assignments
    const { data: tomorrowAssignments, error: tomorrowAssignError } = await supabase
      .from("work_assignments")
      .select("*")
      .eq("assigned_to", profile.id)
      .eq("work_date", tomorrow)
      .order("created_at", { ascending: true });

    // Get today's work blocks
    const { data: todayWorkBlocks, error: blocksError } = await supabase
      .from("work_blocks")
      .select("*")
      .eq("user_id", profile.id)
      .eq("work_date", today)
      .order("started_at", { ascending: true });

    return {
      profile,
      todaySession: todaySession || null,
      todayLog: todayLog || null,
      todayAssignments: todayAssignments || [],
      tomorrowAssignments: tomorrowAssignments || [],
      todayWorkBlocks: todayWorkBlocks || []
    };
  } catch (error) {
    console.error("Error in getMyWorkData:", error);
    return {
      profile: null,
      todaySession: null,
      todayLog: null,
      todayAssignments: [],
      tomorrowAssignments: [],
      todayWorkBlocks: []
    };
  }
}

/**
 * Start or update today's work session.
 */
export async function startWork({ currentWorkTitle, currentWorkNote, assignmentId }) {
  const profile = await requireAuth();
  try {
    if (!currentWorkTitle || currentWorkTitle.trim() === "") {
      return { error: "Please enter what you are working on." };
    }

    const supabase = await createClient();
    const today = getTodayDateString();
    const now = new Date().toISOString();

    // Get today's work session first
    const { data: existingSession } = await supabase
      .from("work_sessions")
      .select("*")
      .eq("user_id", profile.id)
      .eq("work_date", today)
      .maybeSingle();

    if (existingSession) {
      if (existingSession.status === "ended") {
        return { error: "Work already ended for today." };
      }
      if (existingSession.status === "break") {
        return { error: "You are currently on break. Resume work before changing work." };
      }
      if (existingSession.status === "active") {
        // Check if there is already an active work block
        const { data: activeBlock } = await supabase
          .from("work_blocks")
          .select("*")
          .eq("session_id", existingSession.id)
          .eq("status", "active")
          .maybeSingle();

        if (activeBlock) {
          return { error: "Finish current work before starting a new one." };
        }
      }
    }

    // Verify assignment if provided
    if (assignmentId) {
      const { data: assignment, error: assignError } = await supabase
        .from("work_assignments")
        .select("*")
        .eq("id", assignmentId)
        .eq("assigned_to", profile.id)
        .maybeSingle();

      if (assignError || !assignment) {
        return { error: "Selected assignment does not belong to you or does not exist." };
      }
    }

    let sessionId;
    if (existingSession) {
      sessionId = existingSession.id;
      // Update session
      const { error: updateError } = await supabase
        .from("work_sessions")
        .update({
          status: "active",
          current_work_title: currentWorkTitle,
          current_work_note: currentWorkNote || "",
          assignment_id: assignmentId || null,
          started_at: existingSession.started_at || now,
          ended_at: null,
          break_started_at: null
        })
        .eq("id", existingSession.id);

      if (updateError) throw updateError;
    } else {
      // Create session
      const { data: newSession, error: insertError } = await supabase
        .from("work_sessions")
        .insert({
          user_id: profile.id,
          work_date: today,
          status: "active",
          current_work_title: currentWorkTitle,
          current_work_note: currentWorkNote || "",
          assignment_id: assignmentId || null,
          started_at: now,
          break_minutes: 0,
          total_minutes: 0
        })
        .select()
        .single();

      if (insertError) throw insertError;
      sessionId = newSession.id;
    }

    // Update assignment to in_progress if provided
    if (assignmentId) {
      await supabase
        .from("work_assignments")
        .update({ status: "in_progress" })
        .eq("id", assignmentId);
    }

    // Create work block
    const { error: blockInsertError } = await supabase
      .from("work_blocks")
      .insert({
        user_id: profile.id,
        session_id: sessionId,
        assignment_id: assignmentId || null,
        work_date: today,
        title: currentWorkTitle,
        note: currentWorkNote || "",
        status: "active",
        started_at: now,
        total_minutes: 0
      });

    if (blockInsertError) throw blockInsertError;

    revalidatePath("/admin/my-work");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error in startWork:", error);
    return { error: error.message || "Failed to start work." };
  }
}

/**
 * Pause work and take a break.
 */
export async function takeBreak() {
  const profile = await requireAuth();
  try {
    const supabase = await createClient();
    const today = getTodayDateString();
    const now = new Date().toISOString();

    const { data: session, error: getError } = await supabase
      .from("work_sessions")
      .select("*")
      .eq("user_id", profile.id)
      .eq("work_date", today)
      .maybeSingle();

    if (getError || !session) {
      return { error: "No work session found for today." };
    }

    if (session.status !== "active") {
      return { error: "You can only take a break when work status is Active." };
    }

    const { error: updateError } = await supabase
      .from("work_sessions")
      .update({
        status: "break",
        break_started_at: now
      })
      .eq("id", session.id);

    if (updateError) throw updateError;

    revalidatePath("/admin/my-work");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error in takeBreak:", error);
    return { error: error.message || "Failed to pause work." };
  }
}

/**
 * Resume work from break.
 */
export async function resumeWork() {
  const profile = await requireAuth();
  try {
    const supabase = await createClient();
    const today = getTodayDateString();

    const { data: session, error: getError } = await supabase
      .from("work_sessions")
      .select("*")
      .eq("user_id", profile.id)
      .eq("work_date", today)
      .maybeSingle();

    if (getError || !session) {
      return { error: "No work session found for today." };
    }

    if (session.status !== "break") {
      return { error: "You can only resume work when status is Break." };
    }

    const now = new Date();
    const breakStart = new Date(session.break_started_at);
    const diffMs = now.getTime() - breakStart.getTime();
    const diffMins = Math.max(0, Math.round(diffMs / 60000));
    const newBreakMinutes = (session.break_minutes || 0) + diffMins;

    const { error: updateError } = await supabase
      .from("work_sessions")
      .update({
        status: "active",
        break_started_at: null,
        break_minutes: newBreakMinutes
      })
      .eq("id", session.id);

    if (updateError) throw updateError;

    revalidatePath("/admin/my-work");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error in resumeWork:", error);
    return { error: error.message || "Failed to resume work." };
  }
}

/**
 * End work session today. Calculates final work minutes server-side.
 */
export async function endWork() {
  const profile = await requireAuth();
  try {
    const supabase = await createClient();
    const today = getTodayDateString();
    const now = new Date();

    const { data: session, error: getError } = await supabase
      .from("work_sessions")
      .select("*")
      .eq("user_id", profile.id)
      .eq("work_date", today)
      .maybeSingle();

    if (getError || !session) {
      return { error: "No work session found for today." };
    }

    if (!session.started_at) {
      return { error: "Session has not been started yet." };
    }

    // Find active work block to auto-finish
    const { data: activeBlock } = await supabase
      .from("work_blocks")
      .select("*")
      .eq("session_id", session.id)
      .eq("status", "active")
      .maybeSingle();

    if (activeBlock) {
      const start = new Date(activeBlock.started_at);
      const diffMs = now.getTime() - start.getTime();
      const diffMins = Math.max(0, Math.round(diffMs / 60000));

      await supabase
        .from("work_blocks")
        .update({
          status: "done",
          ended_at: now.toISOString(),
          total_minutes: diffMins
        })
        .eq("id", activeBlock.id);

      if (activeBlock.assignment_id) {
        await supabase
          .from("work_assignments")
          .update({ status: "done" })
          .eq("id", activeBlock.assignment_id)
          .eq("assigned_to", profile.id);
      }
    }

    let finalBreakMinutes = session.break_minutes || 0;
    if (session.status === "break" && session.break_started_at) {
      const breakStart = new Date(session.break_started_at);
      const diffMs = now.getTime() - breakStart.getTime();
      const diffMins = Math.max(0, Math.round(diffMs / 60000));
      finalBreakMinutes += diffMins;
    }

    const start = new Date(session.started_at);
    const totalMs = now.getTime() - start.getTime();
    const totalMins = Math.round(totalMs / 60000) - finalBreakMinutes;
    const finalTotalMinutes = Math.max(0, totalMins);

    const { error: updateError } = await supabase
      .from("work_sessions")
      .update({
        status: "ended",
        ended_at: now.toISOString(),
        break_started_at: null,
        break_minutes: finalBreakMinutes,
        total_minutes: finalTotalMinutes,
        current_work_title: null,
        current_work_note: "",
        assignment_id: null
      })
      .eq("id", session.id);

    if (updateError) throw updateError;

    revalidatePath("/admin/my-work");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error in endWork:", error);
    return { error: error.message || "Failed to end work." };
  }
}

/**
 * Finish the currently active work block.
 */
export async function finishCurrentWork() {
  const profile = await requireAuth();
  try {
    const supabase = await createClient();
    const today = getTodayDateString();
    const now = new Date();

    // Find today's session
    const { data: session } = await supabase
      .from("work_sessions")
      .select("*")
      .eq("user_id", profile.id)
      .eq("work_date", today)
      .maybeSingle();

    if (!session) {
      return { error: "No active daily work session found." };
    }

    // Find active work block for today/session
    const { data: activeBlock } = await supabase
      .from("work_blocks")
      .select("*")
      .eq("session_id", session.id)
      .eq("status", "active")
      .maybeSingle();

    if (!activeBlock) {
      return { error: "No active work block found to finish." };
    }

    const start = new Date(activeBlock.started_at);
    const diffMs = now.getTime() - start.getTime();
    const diffMins = Math.max(0, Math.round(diffMs / 60000));

    // Set work_block done
    const { error: blockErr } = await supabase
      .from("work_blocks")
      .update({
        status: "done",
        ended_at: now.toISOString(),
        total_minutes: diffMins
      })
      .eq("id", activeBlock.id);

    if (blockErr) throw blockErr;

    if (activeBlock.assignment_id) {
      await supabase
        .from("work_assignments")
        .update({ status: "done" })
        .eq("id", activeBlock.assignment_id)
        .eq("assigned_to", profile.id);
    }

    // Clear session current work fields (title = null, current_work_note = '', assignment_id = null)
    const { error: sessionErr } = await supabase
      .from("work_sessions")
      .update({
        current_work_title: null,
        current_work_note: "",
        assignment_id: null
      })
      .eq("id", session.id);

    if (sessionErr) throw sessionErr;

    revalidatePath("/admin/my-work");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error in finishCurrentWork:", error);
    return { error: error.message || "Failed to finish current work block." };
  }
}

/**
 * Save daily work log draft.
 */
export async function saveDailyLog({ workNote, blockers, tomorrowPlan }) {
  const profile = await requireAuth();
  try {
    const supabase = await createClient();
    const today = getTodayDateString();

    // Must have today's session
    const { data: session } = await supabase
      .from("work_sessions")
      .select("*")
      .eq("user_id", profile.id)
      .eq("work_date", today)
      .maybeSingle();

    if (!session) {
      return { error: "You must start a work session before saving notes." };
    }

    const { data: existingLog } = await supabase
      .from("daily_work_logs")
      .select("*")
      .eq("user_id", profile.id)
      .eq("work_date", today)
      .maybeSingle();

    if (existingLog) {
      if (existingLog.submitted_at) {
        return { error: "Daily work log is already submitted and locked." };
      }
      const { error: updateError } = await supabase
        .from("daily_work_logs")
        .update({
          work_note: workNote || "",
          blockers: blockers || "",
          tomorrow_plan: tomorrowPlan || ""
        })
        .eq("id", existingLog.id);

      if (updateError) throw updateError;
    } else {
      const { error: insertError } = await supabase
        .from("daily_work_logs")
        .insert({
          user_id: profile.id,
          session_id: session.id,
          work_date: today,
          work_note: workNote || "",
          blockers: blockers || "",
          tomorrow_plan: tomorrowPlan || ""
        });

      if (insertError) throw insertError;
    }

    revalidatePath("/admin/my-work");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error in saveDailyLog:", error);
    return { error: error.message || "Failed to save daily work log." };
  }
}

/**
 * Submit daily work log.
 */
export async function submitDailyLog({ workNote, blockers, tomorrowPlan }) {
  const profile = await requireAuth();
  try {
    const supabase = await createClient();
    const today = getTodayDateString();
    const now = new Date().toISOString();

    const { data: session } = await supabase
      .from("work_sessions")
      .select("*")
      .eq("user_id", profile.id)
      .eq("work_date", today)
      .maybeSingle();

    if (!session) {
      return { error: "You must start a work session before submitting reports." };
    }

    const { data: existingLog } = await supabase
      .from("daily_work_logs")
      .select("*")
      .eq("user_id", profile.id)
      .eq("work_date", today)
      .maybeSingle();

    if (existingLog) {
      if (existingLog.submitted_at) {
        return { error: "Daily work log is already submitted and locked." };
      }
      const { error: updateError } = await supabase
        .from("daily_work_logs")
        .update({
          work_note: workNote || "",
          blockers: blockers || "",
          tomorrow_plan: tomorrowPlan || "",
          submitted_at: now
        })
        .eq("id", existingLog.id);

      if (updateError) throw updateError;
    } else {
      const { error: insertError } = await supabase
        .from("daily_work_logs")
        .insert({
          user_id: profile.id,
          session_id: session.id,
          work_date: today,
          work_note: workNote || "",
          blockers: blockers || "",
          tomorrow_plan: tomorrowPlan || "",
          submitted_at: now
        });

      if (insertError) throw insertError;
    }

    revalidatePath("/admin/my-work");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error in submitDailyLog:", error);
    return { error: error.message || "Failed to submit daily work log." };
  }
}

/**
 * Mark an assignment as done.
 */
export async function markAssignmentDone(assignmentId) {
  const profile = await requireAuth();
  try {
    const supabase = await createClient();

    const { data: assignment, error: getError } = await supabase
      .from("work_assignments")
      .select("*")
      .eq("id", assignmentId)
      .maybeSingle();

    if (getError || !assignment) {
      return { error: "Assignment not found." };
    }

    // Admins can mark anything done, members can only mark their own
    const isAdmin = profile.role === "admin";
    const isOwner = assignment.assigned_to === profile.id;

    if (!isAdmin && !isOwner) {
      return { error: "Unauthorized to update this assignment." };
    }

    const { error: updateError } = await supabase
      .from("work_assignments")
      .update({ status: "done" })
      .eq("id", assignmentId);

    if (updateError) throw updateError;

    revalidatePath("/admin/my-work");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error in markAssignmentDone:", error);
    return { error: error.message || "Failed to mark assignment as done." };
  }
}

/**
 * Create a new assignment. Admin only.
 */
export async function createAssignment({ assignedTo, title, description, workDate }) {
  const profile = await requireAdmin();
  try {
    const supabase = await createClient();

    if (!assignedTo || !title || !workDate) {
      return { error: "Missing required assignment fields." };
    }

    const { error: insertError } = await supabase
      .from("work_assignments")
      .insert({
        assigned_to: assignedTo,
        assigned_by: profile.id,
        title,
        description: description || "",
        work_date: workDate,
        status: "pending"
      });

    if (insertError) throw insertError;

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/my-work");
    return { success: true };
  } catch (error) {
    console.error("Error in createAssignment:", error);
    return { error: error.message || "Failed to create assignment." };
  }
}

/**
 * Fetch all data for the administrator dashboard view. Admin only.
 */
export async function getAdminDashboardData() {
  const profile = await requireAdmin();
  try {
    const supabase = await createClient();
    const today = getTodayDateString();
    const tomorrow = getTomorrowDateString();

    // Fetch active admin profiles
    const { data: profiles, error: profilesError } = await supabase
      .from("admin_profiles")
      .select("*")
      .eq("is_active", true)
      .order("name", { ascending: true });

    if (profilesError) throw profilesError;

    // Fetch today's work sessions
    const { data: sessions } = await supabase
      .from("work_sessions")
      .select("*")
      .eq("work_date", today);

    // Fetch today's daily work logs
    const { data: logs } = await supabase
      .from("daily_work_logs")
      .select("*")
      .eq("work_date", today);

    // Fetch today's assignments
    const { data: todayAssignments } = await supabase
      .from("work_assignments")
      .select("*")
      .eq("work_date", today);

    // Fetch tomorrow's assignments
    const { data: tomorrowAssignments } = await supabase
      .from("work_assignments")
      .select("*")
      .eq("work_date", tomorrow);

    // Summary counts
    const activeNow = sessions ? sessions.filter(s => s.status === "active").length : 0;
    const onBreak = sessions ? sessions.filter(s => s.status === "break").length : 0;
    
    // Sum of worked minutes today (including live elapsed minutes for currently active/break sessions)
    let totalMinutesToday = 0;
    if (sessions) {
      sessions.forEach(session => {
        totalMinutesToday += calculateSessionDisplayMinutes(session);
      });
    }
    const totalHoursToday = parseFloat((totalMinutesToday / 60).toFixed(1));

    const reportsSubmitted = logs ? logs.filter(l => l.submitted_at !== null).length : 0;

    // Helper map to lookup profile names
    const profileMap = {};
    if (profiles) {
      profiles.forEach(p => {
        profileMap[p.id] = p.name;
      });
    }

    const mapAssignmentNames = (list) => {
      if (!list) return [];
      return list.map(item => ({
        ...item,
        assignedToName: profileMap[item.assigned_to] || "Unknown",
        assignedByName: profileMap[item.assigned_by] || "Unknown"
      }));
    };

    // Fetch today's work blocks for all users
    const { data: todayWorkBlocks } = await supabase
      .from("work_blocks")
      .select("*")
      .eq("work_date", today)
      .order("started_at", { ascending: true });

    return {
      profiles: profiles || [],
      sessions: sessions || [],
      logs: logs || [],
      todayAssignments: mapAssignmentNames(todayAssignments),
      tomorrowAssignments: mapAssignmentNames(tomorrowAssignments),
      todayWorkBlocks: todayWorkBlocks || [],
      stats: {
        activeNow,
        onBreak,
        totalHoursToday,
        reportsSubmitted
      }
    };
  } catch (error) {
    console.error("Error in getAdminDashboardData:", error);
    return {
      profiles: [],
      sessions: [],
      logs: [],
      todayAssignments: [],
      tomorrowAssignments: [],
      todayWorkBlocks: [],
      stats: { activeNow: 0, onBreak: 0, totalHoursToday: 0, reportsSubmitted: 0 }
    };
  }
}

/**
 * Fetch reports data aggregated by member for a specific range. Admin only.
 */
export async function getReportsData(range) {
  const profile = await requireAdmin();
  try {
    const supabase = await createClient();
    const today = getTodayDateString();

    let startDate = today;
    let endDate = today;

    if (range === "week") {
      startDate = getDateStringWithOffset(-6);
    } else if (range === "month") {
      startDate = getCurrentMonthStartDateString();
    }

    // Fetch active profiles
    const { data: profiles, error: pErr } = await supabase
      .from("admin_profiles")
      .select("*")
      .eq("is_active", true)
      .order("name", { ascending: true });

    if (pErr) throw pErr;

    // Fetch sessions in range
    const { data: sessions, error: sErr } = await supabase
      .from("work_sessions")
      .select("*")
      .gte("work_date", startDate)
      .lte("work_date", endDate);

    if (sErr) throw sErr;

    // Fetch logs in range
    const { data: logs, error: lErr } = await supabase
      .from("daily_work_logs")
      .select("*")
      .gte("work_date", startDate)
      .lte("work_date", endDate);

    if (lErr) throw lErr;

    // Fetch assignments in range
    const { data: rawAssignments } = await supabase
      .from("work_assignments")
      .select("*")
      .gte("work_date", startDate)
      .lte("work_date", endDate)
      .order("work_date", { ascending: false });

    // Map names for assignments
    const profileMap = {};
    if (profiles) {
      profiles.forEach(p => {
        profileMap[p.id] = p.name;
      });
    }

    const assignments = rawAssignments ? rawAssignments.map(item => ({
      ...item,
      assignedToName: profileMap[item.assigned_to] || "Unknown",
      assignedByName: profileMap[item.assigned_by] || "Unknown"
    })) : [];

    // Process summary details per member
    const summary = profiles.map(member => {
      const memberSessions = sessions ? sessions.filter(s => s.user_id === member.id) : [];
      const memberLogs = logs ? logs.filter(l => l.user_id === member.id) : [];

      let totalMinutes = 0;
      memberSessions.forEach(session => {
        totalMinutes += calculateSessionDisplayMinutes(session);
      });

      const totalHours = parseFloat((totalMinutes / 60).toFixed(1));
      const daysWorked = memberSessions.filter(s => s.status !== "offline").length;
      const averageHours = daysWorked > 0 ? parseFloat((totalHours / daysWorked).toFixed(1)) : 0;
      const reportsCount = memberLogs.filter(l => l.submitted_at !== null).length;

      return {
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role,
        totalHours,
        daysWorked,
        averageHours,
        reportsCount
      };
    });

    // Process work log history list (join logs & sessions by user/date)
    const history = [];
    if (sessions) {
      sessions.forEach(session => {
        const matchingLog = logs ? logs.find(l => l.user_id === session.user_id && l.work_date === session.work_date) : null;
        const matchingProfile = profiles.find(p => p.id === session.user_id);

        if (matchingProfile) {
          history.push({
            id: session.id,
            user_id: session.user_id,
            name: matchingProfile.name,
            work_date: session.work_date,
            status: session.status,
            current_work_title: session.current_work_title,
            break_minutes: session.break_minutes,
            total_minutes: calculateSessionDisplayMinutes(session),
            work_note: matchingLog ? matchingLog.work_note : "",
            blockers: matchingLog ? matchingLog.blockers : "",
            tomorrow_plan: matchingLog ? matchingLog.tomorrow_plan : "",
            submitted_at: matchingLog ? matchingLog.submitted_at : null
          });
        }
      });
    }

    // Sort history by date descending, then by name
    history.sort((a, b) => {
      if (a.work_date !== b.work_date) {
        return b.work_date.localeCompare(a.work_date);
      }
      return a.name.localeCompare(b.name);
    });

    // Fetch work blocks in range
    const { data: rawWorkBlocks } = await supabase
      .from("work_blocks")
      .select("*")
      .gte("work_date", startDate)
      .lte("work_date", endDate)
      .order("started_at", { ascending: true });

    // Map member names onto work blocks
    const workBlocksHistory = rawWorkBlocks ? rawWorkBlocks.map(block => ({
      ...block,
      memberName: profileMap[block.user_id] || "Unknown"
    })) : [];

    return {
      summary,
      history,
      assignments,
      workBlocksHistory,
      startDate,
      endDate
    };
  } catch (error) {
    console.error("Error in getReportsData:", error);
    return {
      summary: [],
      history: [],
      assignments: [],
      workBlocksHistory: [],
      startDate: "",
      endDate: ""
    };
  }
}
