import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getCurrentProfile() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return null;
    }

    const { data: profile, error: profileError } = await supabase
      .from("admin_profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return null;
    }

    return profile;
  } catch (error) {
    console.error("Error in getCurrentProfile:", error);
    return null;
  }
}

export async function requireAuth() {
  const profile = await getCurrentProfile();
  if (!profile) {
    redirect("/admin/login");
  }
  return profile;
}

export async function requireAdmin() {
  const profile = await getCurrentProfile();
  if (!profile) {
    redirect("/admin/login");
  }
  if (profile.role !== "admin") {
    redirect("/admin/my-work");
  }
  return profile;
}
