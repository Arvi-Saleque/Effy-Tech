// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
if (process.env.NODE_ENV !== "test" && !process.env.NODE_TEST_CONTEXT) {
  require("server-only");
}
import { createMockSupabase } from "@/features/effy-edu-demo/lib/demo/mock-supabase";

/** Demo admin client; intentionally does not use service-role credentials. */
export function createAdminClient(): any {
  return createMockSupabase("TEACHER");
}
