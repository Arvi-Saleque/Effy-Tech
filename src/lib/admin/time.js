/**
 * Time utility functions for EffyOps
 */

export function formatDuration(totalSeconds) {
  const secs = Math.max(0, Math.round(totalSeconds || 0));
  if (secs === 0) return "00:00:00";

  const hrs = Math.floor(secs / 3600);
  const mins = Math.floor((secs % 3600) / 60);
  const remainingSecs = secs % 60;

  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(remainingSecs).padStart(2, "0")}`;
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
 * Calculates display seconds for an active, break, or ended session.
 * For UI display:
 * - If ended: use total_minutes * 60 (or exact seconds if stored, but total_minutes is legacy fallback).
 * - If active: now - started_at - break_seconds.
 * - If break: break_started_at - started_at - break_seconds (break time doesn't count).
 * - Never return negative value.
 */
export function calculateSessionDisplaySeconds(session) {
  if (!session || !session.started_at) return 0;

  if (session.status === "ended" || session.ended_at) {
    // If ended, we rely on the DB's accumulated sum. For sessions, total_minutes is the sum of block minutes.
    // For exactness, session exact elapsed is better derived from block sum in getReportsData,
    // but here we just return the stored total_minutes * 60 as fallback.
    return Math.max(0, (session.total_minutes || 0) * 60);
  }

  const start = new Date(session.started_at).getTime();
  const breakMs = (session.break_minutes || 0) * 60000;

  let end;
  if (session.status === "break" && session.break_started_at) {
    end = new Date(session.break_started_at).getTime();
  } else {
    end = new Date().getTime();
  }

  const elapsedMs = end - start;
  const elapsedSecs = Math.floor((elapsedMs - breakMs) / 1000);
  
  return Math.max(0, elapsedSecs);
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
 * Calculates exact display seconds for an array of work blocks.
 * - done blocks: exact ms between started_at and ended_at, falling back to total_minutes if missing ended_at
 * - active blocks: live elapsed from started_at to now (minus live break duration if session is on break)
 * - ignore cancelled blocks
 * - Never return negative values
 */
export function calculateWorkBlocksDisplaySeconds(workBlocks, session = null) {
  if (!workBlocks || workBlocks.length === 0) return 0;
  
  let totalMs = 0;
  const now = new Date().getTime();

  workBlocks.forEach(block => {
    if (block.status === "done") {
      if (block.started_at && block.ended_at) {
        totalMs += Math.max(0, new Date(block.ended_at).getTime() - new Date(block.started_at).getTime());
      } else {
        totalMs += Math.max(0, (block.total_minutes || 0) * 60000);
      }
    } else if (block.status === "active" && block.started_at) {
      const start = new Date(block.started_at).getTime();
      let diffMs = now - start;

      // If the session is currently on break, subtract the live active break duration
      if (session && session.status === "break" && session.break_started_at && session.user_id === block.user_id) {
        const breakStart = new Date(session.break_started_at).getTime();
        const currentBreakMs = now - breakStart;
        diffMs -= currentBreakMs;
      }

      totalMs += Math.max(0, diffMs);
    }
  });

  return Math.max(0, Math.floor(totalMs / 1000));
}

export function formatDistanceToNow(dateInput) {
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return "just now";
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  
  return `${Math.floor(diffInDays / 365)}y ago`;
}

export function formatDhakaDate() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date());
}
