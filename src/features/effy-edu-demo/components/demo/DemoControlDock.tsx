// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpenCheck,
  ChevronUp,
  ExternalLink,
  GraduationCap,
  Home,
  Loader2,
  Presentation,
  ShieldCheck,
  X,
} from "lucide-react";
import { supabase } from "@/features/effy-edu-demo/lib/supabase/client";

const DEMO_HOME = "/effy_edu_management_system";
type DemoDestination = "STUDENT" | "TEACHER" | "ADMIN";

export function DemoControlDock() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [launchingDemo, setLaunchingDemo] = useState<DemoDestination | null>(null);

  const launchDemo = async (demo: DemoDestination) => {
    setLaunchingDemo(demo);
    const email = demo === "STUDENT" ? "student@demo.edu" : "teacher@demo.edu";
    const destination = {
      STUDENT: `${DEMO_HOME}/student`,
      TEACHER: `${DEMO_HOME}/teacher/academic`,
      ADMIN: `${DEMO_HOME}/teacher`,
    }[demo];

    try {
      await supabase.auth.signInWithPassword({
        email,
        password: "demo123",
      });
      window.location.assign(destination);
    } catch {
      window.location.assign(`${DEMO_HOME}/login`);
    }
  };

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        className="fixed bottom-4 right-4 z-[90] inline-flex items-center gap-2 rounded-full border border-amber-300 bg-slate-950 px-4 py-2.5 text-xs font-black text-white shadow-2xl transition hover:-translate-y-0.5"
        aria-label="Open demo navigation"
      >
        <ShieldCheck className="h-4 w-4 text-amber-300" aria-hidden="true" />
        Demo controls
        <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    );
  }

  return (
    <aside
      className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-6xl rounded-2xl border border-white/15 bg-slate-950/95 p-2.5 text-white shadow-[0_24px_70px_rgba(2,6,23,0.38)] backdrop-blur-xl sm:bottom-4 sm:p-3"
      aria-label="Generalized demo controls"
    >
      <div className="flex items-center gap-2 overflow-x-auto">
        <div className="hidden min-w-0 px-2 lg:block">
          <p className="truncate text-[10px] font-black uppercase tracking-[0.18em] text-amber-300">
            Generalized demo
          </p>
          <p className="mt-0.5 whitespace-nowrap text-[11px] font-semibold text-slate-300">
            Local mock data · Changes reset
          </p>
        </div>

        <div className="hidden h-9 w-px shrink-0 bg-white/10 lg:block" />

        <Link
          href={DEMO_HOME}
          className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-black transition ${
            pathname === DEMO_HOME
              ? "bg-amber-300 text-slate-950"
              : "bg-white/8 text-white hover:bg-white/15"
          }`}
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Public site
        </Link>

        <button
          type="button"
          onClick={() => launchDemo("STUDENT")}
          disabled={launchingDemo !== null}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white/8 px-3 py-2.5 text-xs font-black text-white transition hover:bg-white/15 disabled:opacity-60"
        >
          {launchingDemo === "STUDENT" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <GraduationCap className="h-4 w-4 text-sky-300" aria-hidden="true" />
          )}
          Student demo
        </button>

        <button
          type="button"
          onClick={() => launchDemo("TEACHER")}
          disabled={launchingDemo !== null}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white/8 px-3 py-2.5 text-xs font-black text-white transition hover:bg-white/15 disabled:opacity-60"
        >
          {launchingDemo === "TEACHER" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Presentation className="h-4 w-4 text-violet-300" aria-hidden="true" />
          )}
          Teacher demo
        </button>

        <button
          type="button"
          onClick={() => launchDemo("ADMIN")}
          disabled={launchingDemo !== null}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white/8 px-3 py-2.5 text-xs font-black text-white transition hover:bg-white/15 disabled:opacity-60"
        >
          {launchingDemo === "ADMIN" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <ShieldCheck className="h-4 w-4 text-emerald-300" aria-hidden="true" />
          )}
          Admin demo
        </button>

        <Link
          href="/projects/EEMS"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white/8 px-3 py-2.5 text-xs font-black text-white transition hover:bg-white/15"
        >
          <BookOpenCheck className="h-4 w-4 text-violet-300" aria-hidden="true" />
          Project details
        </Link>

        <Link
          href="/"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15 px-3 py-2.5 text-xs font-black text-slate-200 transition hover:bg-white/10 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Effy Tech
        </Link>

        <button
          type="button"
          onClick={() => setCollapsed(true)}
          className="ml-auto inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/10 hover:text-white"
          aria-label="Minimize demo controls"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
