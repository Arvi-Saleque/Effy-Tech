/* ============================================================
   Coming Soon — Shown for routes that are not yet built
   Orbiting constellation + pulsing core, dark teal theme.
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

/* ── Orbit ring component ──────────────────────────────────── */
function OrbitRing({ radius, duration, delay = 0, dotCount = 3, color }) {
  return (
    <motion.div
      className="absolute rounded-full border"
      style={{
        width: radius * 2,
        height: radius * 2,
        borderColor: `${color}15`,
      }}
      initial={{ rotate: 0, opacity: 0 }}
      animate={{ rotate: 360, opacity: 1 }}
      transition={{
        rotate: { duration, repeat: Infinity, ease: "linear" },
        opacity: { duration: 1, delay },
      }}
    >
      {Array.from({ length: dotCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 4 + i * 2,
            height: 4 + i * 2,
            background: color,
            top: "50%",
            left: "50%",
            transform: `rotate(${(360 / dotCount) * i}deg) translateX(${radius}px) translate(-50%, -50%)`,
            boxShadow: `0 0 12px 2px ${color}40`,
          }}
        />
      ))}
    </motion.div>
  );
}

export default function ComingSoon() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-surface-dark">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/6 blur-[160px]" />
        <div className="absolute top-1/3 right-1/4 h-[300px] w-[300px] rounded-full bg-primary-light/4 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(45,212,191,0.5) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Orbit animation */}
      <div className="relative z-10 flex items-center justify-center mb-12">
        {/* Core pulse */}
        <motion.div
          className="absolute rounded-full bg-primary-light/80"
          style={{
            width: 14,
            height: 14,
            boxShadow: "0 0 40px 10px rgba(45,212,191,0.3)",
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner glow ring */}
        <motion.div
          className="absolute rounded-full border border-primary-light/20"
          style={{ width: 50, height: 50 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbit rings */}
        <OrbitRing
          radius={60}
          duration={8}
          delay={0}
          dotCount={2}
          color="#2dd4bf"
        />
        <OrbitRing
          radius={100}
          duration={14}
          delay={0.3}
          dotCount={3}
          color="#0f766e"
        />
        <OrbitRing
          radius={145}
          duration={20}
          delay={0.6}
          dotCount={4}
          color="#2dd4bf"
        />

        {/* Spacer to give the orbits visual room */}
        <div className="h-[300px] w-[300px]" />
      </div>

      {/* Text content */}
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <motion.span
          className="inline-block rounded-full border border-primary-light/20 bg-primary-light/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary-light mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Coming Soon
        </motion.span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-inverse mt-2">
          Something{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary">
            Amazing
          </span>
          <br />
          is Brewing
        </h1>

        <p className="mt-5 text-base sm:text-lg text-neutral-400 max-w-lg mx-auto leading-relaxed">
          We&apos;re crafting something special for this page. Stay tuned —
          it&apos;ll be worth the wait.
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-neutral-100 transition-all hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(45,212,191,0.2)]"
        >
          <HiArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-400 transition-all hover:border-neutral-600 hover:text-neutral-200 hover:bg-neutral-800/50"
        >
          Get Notified
        </Link>
      </motion.div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-light/20 to-transparent" />
    </div>
  );
}
