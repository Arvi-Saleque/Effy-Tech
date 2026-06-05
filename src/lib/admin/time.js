/**
 * Time utility functions for EffyOps
 */

/**
 * Formats a number of minutes into a human-readable string.
 * Examples:
 * 0 -> "0m"
 * 45 -> "45m"
 * 90 -> "1h 30m"
 * 480 -> "8h"
 */
export function formatMinutes(minutes) {
  const mins = Math.max(0, Math.round(minutes || 0));
  if (mins === 0) return "0m";

  const hrs = Math.floor(mins / 60);
  const remainingMins = mins % 60;

  if (hrs > 0 && remainingMins > 0) {
    return `${hrs}h ${remainingMins}m`;
  } else if (hrs > 0) {
    return `${hrs}h`;
  } else {
    return `${remainingMins}m`;
  }
}

const APP_TIME_ZONE = "Asia/Dhaka";

function getDateStringInTimeZone(offsetDays = 0) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: APP_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(now);
  const year = parts.find(p => p.type === "year").value;
  const month = parts.find(p => p.type === "month").value;
  const day = parts.find(p => p.type === "day").value;

  // Create Date at noon UTC using these local date parts
  const d = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 12, 0, 0));
  if (offsetDays !== 0) {
    d.setUTCDate(d.getUTCDate() + offsetDays);
  }

  const resYear = d.getUTCFullYear();
  const resMonth = String(d.getUTCMonth() + 1).padStart(2, "0");
  const resDay = String(d.getUTCDate()).padStart(2, "0");
  return `${resYear}-${resMonth}-${resDay}`;
}

/**
 * Returns the current date in YYYY-MM-DD format (Asia/Dhaka timezone).
 */
export function getTodayDateString() {
  return getDateStringInTimeZone(0);
}

/**
 * Returns tomorrow's date in YYYY-MM-DD format (Asia/Dhaka timezone).
 */
export function getTomorrowDateString() {
  return getDateStringInTimeZone(1);
}

/**
 * Returns the date string with offset relative to today (Asia/Dhaka timezone).
 */
export function getDateStringWithOffset(offsetDays) {
  return getDateStringInTimeZone(offsetDays);
}

/**
 * Returns YYYY-MM-01 based on current date (Asia/Dhaka timezone).
 */
export function getCurrentMonthStartDateString() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: APP_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(now);
  const year = parts.find(p => p.type === "year").value;
  const month = parts.find(p => p.type === "month").value;
  
  return `${year}-${month}-01`;
}

/**
 * Calculates display minutes for an active, break, or ended session.
 * For UI display:
 * - If ended: use total_minutes.
 * - If active: now - started_at - break_minutes.
 * - If break: break_started_at - started_at - break_minutes (break time doesn't count).
 * - Never return negative value.
 */
export function calculateSessionDisplayMinutes(session) {
  if (!session || !session.started_at) return 0;

  if (session.status === "ended" || session.ended_at) {
    return Math.max(0, session.total_minutes || 0);
  }

  const start = new Date(session.started_at).getTime();
  const breakMinutes = session.break_minutes || 0;

  let end;
  if (session.status === "break" && session.break_started_at) {
    end = new Date(session.break_started_at).getTime();
  } else {
    end = new Date().getTime();
  }

  const elapsedMs = end - start;
  const elapsedMins = Math.floor(elapsedMs / 60000);
  
  return Math.max(0, elapsedMins - breakMinutes);
}

/**
 * Formats a Date object or ISO string into a human-readable format.
 * Example: "Jun 4, 2026, 5:12 PM" or "Jun 4, 2026" depending on format.
 */
export function formatDateTime(value, includeTime = true) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";

  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  if (includeTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }

  return d.toLocaleString("en-US", options);
}

/**
 * Calculates display minutes for an array of work blocks.
 * - done blocks: total_minutes
 * - active blocks: live elapsed from started_at to now (minus live break duration if session is on break)
 * - ignore cancelled blocks
 * - Never return negative values
 */
export function calculateWorkBlocksDisplayMinutes(workBlocks, session = null) {
  if (!workBlocks || workBlocks.length === 0) return 0;
  
  let totalMins = 0;
  const now = new Date().getTime();

  workBlocks.forEach(block => {
    if (block.status === "done") {
      totalMins += Math.max(0, block.total_minutes || 0);
    } else if (block.status === "active" && block.started_at) {
      const start = new Date(block.started_at).getTime();
      let diffMs = now - start;

      // If the session is currently on break, subtract the live active break duration
      if (session && session.status === "break" && session.break_started_at && session.user_id === block.user_id) {
        const breakStart = new Date(session.break_started_at).getTime();
        const currentBreakMs = now - breakStart;
        diffMs -= currentBreakMs;
      }

      const diffMins = Math.floor(diffMs / 60000);
      totalMins += Math.max(0, diffMins);
    }
  });

  return Math.max(0, totalMins);
}
