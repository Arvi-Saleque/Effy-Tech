import { getCurrentProfile } from "@/lib/admin/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const profile = await getCurrentProfile();
  
  if (profile) {
    if (profile.role === "admin") {
      redirect("/admin/dashboard");
    } else {
      redirect("/admin/my-work");
    }
  }

  return <LoginForm />;
}
