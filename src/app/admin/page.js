import { getCurrentProfile } from "@/lib/admin/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const profile = await getCurrentProfile();
  
  if (!profile) {
    redirect("/admin/login");
  }

  if (profile.role === "admin") {
    redirect("/admin/dashboard");
  } else {
    redirect("/admin/my-work");
  }
}
