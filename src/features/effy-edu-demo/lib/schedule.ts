// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
export type NormalizedSchedule = {
  days: string[];
  daysText: string;
  time: string;
};

/**
 * Normalizes schedule values coming from PostgreSQL JSON, form submissions,
 * or the local demo seed. The production data has historically contained
 * both comma-separated strings and string arrays, so UI code must not assume
 * one representation.
 */
export function normalizeSchedule(input: unknown): NormalizedSchedule | null {
  if (input == null || input === "") return null;

  let value: unknown = input;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;

    if ((trimmed.startsWith("{") && trimmed.endsWith("}")) || (trimmed.startsWith("[") && trimmed.endsWith("]"))) {
      try {
        value = JSON.parse(trimmed);
      } catch {
        // A non-JSON string is treated as a day list below.
        value = { days: trimmed, time: "" };
      }
    } else {
      value = { days: trimmed, time: "" };
    }
  }

  if (Array.isArray(value)) {
    const days = value.map(String).map((day) => day.trim()).filter(Boolean);
    return days.length ? { days, daysText: days.join(", "), time: "" } : null;
  }

  if (typeof value !== "object" || value === null) return null;

  const record = value as Record<string, unknown>;
  const rawDays = record.days ?? record.day ?? record.weekdays ?? [];
  const rawTime = record.time ?? record.class_time ?? record.schedule_time ?? "";

  let days: string[] = [];
  if (Array.isArray(rawDays)) {
    days = rawDays.map(String).map((day) => day.trim()).filter(Boolean);
  } else if (typeof rawDays === "string") {
    days = rawDays
      .split(/[,;|/]+/)
      .map((day) => day.trim())
      .filter(Boolean);
  } else if (rawDays && typeof rawDays === "object") {
    days = Object.entries(rawDays as Record<string, unknown>)
      .filter(([, enabled]) => Boolean(enabled))
      .map(([day]) => day.trim())
      .filter(Boolean);
  } else if (rawDays != null) {
    const day = String(rawDays).trim();
    if (day) days = [day];
  }

  const time = rawTime == null ? "" : String(rawTime).trim();
  if (!days.length && !time) return null;

  return {
    days,
    daysText: days.join(", "),
    time,
  };
}
