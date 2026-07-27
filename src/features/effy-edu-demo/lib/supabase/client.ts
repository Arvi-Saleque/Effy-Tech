// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { createMockSupabase } from "@/features/effy-edu-demo/lib/demo/mock-supabase";

/** Browser-side demo data/auth client. No network, database, or credentials. */
export function createClient(): any {
  return createMockSupabase("STUDENT");
}

export const supabase = createClient();
