"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAuth, requireAdmin } from "@/lib/admin/auth";
import { 
  getTodayDateString, 
  getTomorrowDateString, 
  calculateSessionDisplayMinutes,
  getDateStringWithOffset,
  getCurrentMonthStartDateString,
  calculateWorkBlocksDisplayMinutes
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

    // Fetch myTasks: status in ('pending', 'in_progress')
    const { data: myTasks } = await supabase
      .from("work_assignments")
      .select("*")
      .eq("assigned_to", profile.id)
      .in("status", ["pending", "in_progress"])
      .order("created_at", { ascending: true });

    // Fetch recentDoneTasks: status = 'done', limit 10
    const { data: recentDoneTasks } = await supabase
      .from("work_assignments")
      .select("*")
      .eq("assigned_to", profile.id)
      .eq("status", "done")
      .order("updated_at", { ascending: false })
      .limit(10);

    // Fetch active project tasks assigned to this user
    const { data: projectTasks } = await supabase
      .from("project_tasks")
      .select(`
        *,
        projects (name, clients (name)),
        task_assignees!inner(user_id)
      `)
      .eq("task_assignees.user_id", profile.id)
      .neq("status", "archived")
      .neq("status", "cancelled")
      .order("updated_at", { ascending: false });

    return {
      profile,
      todaySession: todaySession || null,
      todayAssignments: todayAssignments || [],
      tomorrowAssignments: tomorrowAssignments || [],
      todayWorkBlocks: todayWorkBlocks || [],
      myTasks: myTasks || [],
      recentDoneTasks: recentDoneTasks || [],
      projectTasks: projectTasks || []
    };
  } catch (error) {
    console.error("Error in getMyWorkData:", error);
    return {
      profile: null,
      todaySession: null,
      todayAssignments: [],
      tomorrowAssignments: [],
      todayWorkBlocks: [],
      myTasks: [],
      recentDoneTasks: [],
      projectTasks: []
    };
  }
}

/**
 * Start or update today's work session.
 */
export async function startWork({ currentWorkTitle, currentWorkNote, assignmentId }) {
  const profile = await requireAuth();
  try {
    if (!assignmentId) {
      return { error: "Please start work from an assigned task." };
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

    // Verify assignment
    const { data: assignment, error: assignError } = await supabase
      .from("work_assignments")
      .select("*")
      .eq("id", assignmentId)
      .eq("assigned_to", profile.id)
      .maybeSingle();

    if (assignError || !assignment) {
      return { error: "Selected assignment does not belong to you or does not exist." };
    }

    if (assignment.status !== "pending" && assignment.status !== "in_progress") {
      return { error: "Selected assignment is already done or cancelled." };
    }

    const titleToUse = (currentWorkTitle || assignment.title || "").trim();
    if (!titleToUse) {
      return { error: "Task title cannot be empty." };
    }
    const noteToUse = currentWorkNote || assignment.description || "";

    let sessionId;
    if (existingSession) {
      sessionId = existingSession.id;
      // Update session
      const { error: updateError } = await supabase
        .from("work_sessions")
        .update({
          status: "active",
          current_work_title: titleToUse,
          current_work_note: noteToUse,
          assignment_id: assignmentId,
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
          current_work_title: titleToUse,
          current_work_note: noteToUse,
          assignment_id: assignmentId,
          started_at: now,
          break_minutes: 0,
          total_minutes: 0
        })
        .select()
        .single();

      if (insertError) throw insertError;
      sessionId = newSession.id;
    }

    // Update assignment to in_progress
    await supabase
      .from("work_assignments")
      .update({ status: "in_progress" })
      .eq("id", assignmentId);

    // Create work block
    const { error: blockInsertError } = await supabase
      .from("work_blocks")
      .insert({
        user_id: profile.id,
        session_id: sessionId,
        assignment_id: assignmentId,
        work_date: today,
        title: titleToUse,
        note: noteToUse,
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

    // Shift active work block started_at forward by the break duration
    const { data: activeBlock } = await supabase
      .from("work_blocks")
      .select("*")
      .eq("session_id", session.id)
      .eq("status", "active")
      .maybeSingle();

    if (activeBlock) {
      const currentStart = new Date(activeBlock.started_at).getTime();
      const newStart = new Date(currentStart + diffMs);
      
      const { error: blockUpdateError } = await supabase
        .from("work_blocks")
        .update({
          started_at: newStart.toISOString()
        })
        .eq("id", activeBlock.id);

      if (blockUpdateError) throw blockUpdateError;
    }

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
    }

    let finalBreakMinutes = session.break_minutes || 0;
    if (session.status === "break" && session.break_started_at) {
      const breakStart = new Date(session.break_started_at);
      const diffMs = now.getTime() - breakStart.getTime();
      const diffMins = Math.max(0, Math.round(diffMs / 60000));
      finalBreakMinutes += diffMins;
    }

    // Fetch all today work_blocks for this session and user and sum total_minutes where status = done
    const { data: doneBlocks, error: dbError } = await supabase
      .from("work_blocks")
      .select("total_minutes")
      .eq("session_id", session.id)
      .eq("user_id", profile.id)
      .eq("status", "done");

    if (dbError) throw dbError;

    const finalTotalMinutes = doneBlocks
      ? doneBlocks.reduce((acc, b) => acc + (b.total_minutes || 0), 0)
      : 0;

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
 * Shared internal helper to finish the active work block.
 * @param {boolean} completeTask - If true, marks the linked assignment as "done". If false, leaves it as is.
 */
async function finishActiveBlock(supabase, profileId, today, now, completeTask) {
  // Find today's session
  const { data: session } = await supabase
    .from("work_sessions")
    .select("*")
    .eq("user_id", profileId)
    .eq("work_date", today)
    .maybeSingle();

  if (!session) {
    throw new Error("No active daily work session found.");
  }

  // Find active work block for today/session
  const { data: activeBlock } = await supabase
    .from("work_blocks")
    .select("*")
    .eq("session_id", session.id)
    .eq("status", "active")
    .maybeSingle();

  if (!activeBlock) {
    throw new Error("No active work block found to finish.");
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

  if (activeBlock.assignment_id && completeTask) {
    const { error: assignErr } = await supabase
      .from("work_assignments")
      .update({ status: "done" })
      .eq("id", activeBlock.assignment_id)
      .eq("assigned_to", profileId);
      
    if (assignErr) throw assignErr;
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

  return { success: true };
}

/**
 * Finish the currently active work block for now, keeping the task in progress.
 */
export async function finishCurrentWorkForNow() {
  const profile = await requireAuth();
  try {
    const supabase = await createClient();
    const today = getTodayDateString();
    const now = new Date();

    const res = await finishActiveBlock(supabase, profile.id, today, now, false);

    revalidatePath("/admin/my-work");
    revalidatePath("/admin/dashboard");
    return res;
  } catch (error) {
    console.error("Error in finishCurrentWorkForNow:", error);
    return { error: error.message || "Failed to finish current work block." };
  }
}

/**
 * Complete the currently active work block and mark the task as done.
 */
export async function completeCurrentTask() {
  const profile = await requireAuth();
  try {
    const supabase = await createClient();
    const today = getTodayDateString();
    const now = new Date();

    const res = await finishActiveBlock(supabase, profile.id, today, now, true);

    revalidatePath("/admin/my-work");
    revalidatePath("/admin/dashboard");
    return res;
  } catch (error) {
    console.error("Error in completeCurrentTask:", error);
    return { error: error.message || "Failed to complete current task." };
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
    const today = getTodayDateString();

    if (!assignedTo || !title) {
      return { error: "Missing required task fields." };
    }

    const { error: insertError } = await supabase
      .from("work_assignments")
      .insert({
        assigned_to: assignedTo,
        assigned_by: profile.id,
        title,
        description: description || "",
        work_date: workDate || today,
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

    // Fetch today's work blocks for all users
    const { data: todayWorkBlocks } = await supabase
      .from("work_blocks")
      .select("*")
      .eq("work_date", today)
      .order("started_at", { ascending: true });

    // Fetch active/completed tasks for all founders
    const { data: rawTeamTasks } = await supabase
      .from("work_assignments")
      .select("*")
      .in("status", ["pending", "in_progress", "done"])
      .order("created_at", { ascending: false })
      .limit(100);

    // Summary counts
    const activeNow = todayWorkBlocks ? todayWorkBlocks.filter(b => b.status === "active").length : 0;
    const onBreak = sessions ? sessions.filter(s => s.status === "break").length : 0;
    
    // Sum of worked minutes today calculated from work blocks
    let totalMinutesToday = 0;
    if (profiles) {
      profiles.forEach(member => {
        const memberBlocks = todayWorkBlocks ? todayWorkBlocks.filter(b => b.user_id === member.id) : [];
        const session = sessions ? sessions.find(s => s.user_id === member.id) : null;
        totalMinutesToday += calculateWorkBlocksDisplayMinutes(memberBlocks, session);
      });
    }
    const totalHoursToday = parseFloat((totalMinutesToday / 60).toFixed(1));

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

    return {
      profiles: profiles || [],
      sessions: sessions || [],
      todayAssignments: mapAssignmentNames(todayAssignments),
      tomorrowAssignments: mapAssignmentNames(tomorrowAssignments),
      todayWorkBlocks: todayWorkBlocks || [],
      teamTasks: mapAssignmentNames(rawTeamTasks),
      stats: {
        activeNow,
        onBreak,
        totalHoursToday
      }
    };
  } catch (error) {
    console.error("Error in getAdminDashboardData:", error);
    return {
      profiles: [],
      sessions: [],
      todayAssignments: [],
      tomorrowAssignments: [],
      todayWorkBlocks: [],
      teamTasks: [],
      stats: { activeNow: 0, onBreak: 0, totalHoursToday: 0 }
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

    // Fetch work blocks in range
    const { data: rawWorkBlocks, error: wbErr } = await supabase
      .from("work_blocks")
      .select("*")
      .gte("work_date", startDate)
      .lte("work_date", endDate)
      .order("started_at", { ascending: true });

    if (wbErr) throw wbErr;

    // Map member names onto work blocks
    const workBlocksHistory = rawWorkBlocks ? rawWorkBlocks.map(block => ({
      ...block,
      memberName: profileMap[block.user_id] || "Unknown"
    })) : [];

    // Process summary details per member
    const summary = profiles.map(member => {
      const memberBlocks = rawWorkBlocks ? rawWorkBlocks.filter(b => b.user_id === member.id) : [];
      const todaySession = sessions ? sessions.find(s => s.user_id === member.id && s.work_date === today) : null;

      const totalMinutes = calculateWorkBlocksDisplayMinutes(memberBlocks, todaySession);
      const totalHours = parseFloat((totalMinutes / 60).toFixed(1));

      const validBlocks = memberBlocks.filter(b => b.status !== "cancelled");
      const uniqueDates = new Set(validBlocks.map(b => b.work_date));
      const daysWorked = uniqueDates.size;

      const averageHours = daysWorked > 0 ? parseFloat((totalHours / daysWorked).toFixed(1)) : 0;

      return {
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role,
        totalHours,
        daysWorked,
        averageHours
      };
    });

    // Process work history list (sessions only)
    const history = [];
    if (sessions) {
      sessions.forEach(session => {
        const matchingProfile = profiles.find(p => p.id === session.user_id);

        if (matchingProfile) {
          const dayBlocks = rawWorkBlocks ? rawWorkBlocks.filter(b => b.user_id === session.user_id && b.work_date === session.work_date) : [];
          history.push({
            id: session.id,
            user_id: session.user_id,
            name: matchingProfile.name,
            work_date: session.work_date,
            status: session.status,
            current_work_title: session.current_work_title,
            break_minutes: session.break_minutes,
            total_minutes: calculateWorkBlocksDisplayMinutes(dayBlocks, session)
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
