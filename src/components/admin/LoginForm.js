"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Mail, Lock, Eye, EyeOff, Loader2, Shield } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error("No user returned from login.");
      }

      // Fetch user profile role
      const { data: profile, error: profileError } = await supabase
        .from("admin_profiles")
        .select("role, is_active")
        .eq("id", data.user.id)
        .single();

      if (profileError || !profile) {
        // Logged in but no profile exists
        await supabase.auth.signOut();
        throw new Error("Login failed: User profile not registered in Admin database.");
      }

      if (!profile.is_active) {
        await supabase.auth.signOut();
        throw new Error("Login failed: This admin account is deactivated.");
      }

      // Successful login - refresh router and redirect
      router.refresh();
      if (profile.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/admin/my-work");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 relative overflow-hidden font-sans">
      {/* Background Mesh/Blur Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[180px]" />
        <div className="absolute bottom-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-teal-500/5 blur-[150px]" />
      </div>

      <div className="relative w-full max-w-md animate-fade-in">
        <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-8 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <Shield className="h-7 w-7 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-100 tracking-tight">
              EffyOps Login
            </h1>
            <p className="text-sm text-neutral-400 mt-1.5 font-sans">
              Access the internal team admin panel
            </p>
          </div>

          {/* Error message */}
          {errorMsg && (
            <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2"
              >
                Work Email
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@effytech.com"
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950/50 pl-11 pr-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950/50 pl-11 pr-10 py-3 text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-all shadow-[0_0_20px_rgba(16,185,129,0.15)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
