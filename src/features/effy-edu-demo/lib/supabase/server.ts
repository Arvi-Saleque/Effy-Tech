// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
if (process.env.NODE_ENV !== "test" && !process.env.NODE_TEST_CONTEXT) {
  require("server-only");
}
import { cookies } from "next/headers";
import { createMockSupabase } from "@/features/effy-edu-demo/lib/demo/mock-supabase";

/**
 * Demo-mode server data client. The selected role is mirrored into a
 * non-sensitive browser cookie by the mock auth client, so server actions can
 * resolve the same Student/Teacher session after a full navigation.
 */
export async function createClient(): Promise<any> {
  let role: "TEACHER" | "STUDENT" | null = null;
  try {
    const cookieStore = await cookies();
    const value = cookieStore.get("edupilot-demo-role")?.value;
    if (value === "TEACHER" || value === "STUDENT") role = value;
  } catch {
    // Static checks and non-Next test contexts may not provide request cookies.
  }
  return createMockSupabase(role);
}
