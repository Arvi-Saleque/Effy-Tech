/* ============================================================
   StatCard — Single animated stat counter for the About bento
   ─────────────────────────────────────────────────
   Uses useCountUp hook to animate from 0 → target on viewport entry.
   Designed for the dark stats bento card.
   ============================================================ */

"use client";

import useCountUp from "@/hooks/useCountUp";

export default function StatCard({ value, suffix = "", label }) {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <div ref={ref} className="text-center">
      <p className="text-2xl font-bold text-text-inverse sm:text-3xl">
        {count}
        <span className="text-primary-light">{suffix}</span>
      </p>
      <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-neutral-400">
        {label}
      </p>
    </div>
  );
}
