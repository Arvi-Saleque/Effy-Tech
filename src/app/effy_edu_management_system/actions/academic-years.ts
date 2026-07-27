// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
"use server";

/** Public registration options for the standalone demo. */
export async function getDistinctAcademicYears() {
  return ["2027", "2026", "2025"];
}
