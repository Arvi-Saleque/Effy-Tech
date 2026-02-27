/* ============================================================
   About — Asymmetric Bento Grid (Apple-style feature cards)
   ─────────────────────────────────────────────────
   Layout (desktop 4-col grid):
     Row 1: Story (2 col) | Mission (2 col)
     Row 2: Values (2 col) | Tech Stack (1 col) | Stats (1 col)
   Each card: scroll-reveal fade-up + 3D tilt on hover.
   Stats: animated count-up numbers on viewport entry.
   Mobile: single column stack.
   ============================================================ */

"use client";

import { motion, useReducedMotion } from "framer-motion";
import siteConfig from "@/theme/siteConfig";
import StatCard from "./StatCard";

const { about } = siteConfig;

/* ── Scroll-reveal variant ──────────────────────────────────── */
const cardReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ── Shared tilt-hover style generator ──────────────────────── */
function useTiltHover(prefersReduced) {
  if (prefersReduced) return {};
  return {
    whileHover: {
      rotateX: -2,
      rotateY: 3,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };
}

/* ── Bento Card wrapper ─────────────────────────────────────── */
function BentoCard({ children, className = "", index = 0, prefersReduced }) {
  const tilt = useTiltHover(prefersReduced);

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl border border-neutral-700/40 bg-neutral-800/60 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-neutral-600/50 transition-all duration-300 backdrop-blur-sm ${className}`}
      style={{ perspective: 800 }}
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
      {...tilt}
    >
      {children}
    </motion.div>
  );
}

/* ── Main Component ─────────────────────────────────────────── */
export default function About() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="about" className="relative overflow-hidden bg-surface-dark py-24 sm:py-32">
      {/* Subtle background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-primary/5 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 h-[250px] w-[250px] sm:h-[400px] sm:w-[400px] rounded-full bg-primary-light/3 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full border border-primary-light/20 bg-primary-light/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary-light mb-4">
            About Us
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-inverse sm:text-4xl lg:text-5xl">
            Crafting Digital{" "}
            <span className="text-gradient-primary">Excellence</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-400 text-lg">
            A glimpse into who we are, what we believe, and the tools we use.
          </p>
        </motion.div>

        {/* ── Bento Grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* ─ Story Card (large — spans 2 cols) ─────────────── */}
          <BentoCard
            className="lg:col-span-2 lg:row-span-1"
            index={0}
            prefersReduced={prefersReduced}
          >
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary-light">
              {about.story.title}
            </span>
            <p className="relative text-neutral-400 leading-relaxed text-base sm:text-lg">
              {about.story.text}
            </p>
          </BentoCard>

          {/* ─ Mission Card (medium — spans 2 cols) ──────────── */}
          <BentoCard
            className="lg:col-span-2 lg:row-span-1"
            index={1}
            prefersReduced={prefersReduced}
          >
            <div className="absolute -left-6 -bottom-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary-light">
              {about.mission.title}
            </span>
            <p className="relative text-neutral-400 leading-relaxed text-base sm:text-lg">
              {about.mission.text}
            </p>
          </BentoCard>

          {/* ─ Values Card (medium — spans 2 cols) ───────────── */}
          <BentoCard
            className="lg:col-span-2 lg:row-span-1"
            index={2}
            prefersReduced={prefersReduced}
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-primary-light">
              Our Values
            </span>
            <div className="space-y-4">
              {about.values.map(({ label, desc }, i) => (
                <div key={label} className="flex gap-3">
                  {/* Numbered circle */}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light/10 text-xs font-bold text-primary-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-200">
                      {label}
                    </h4>
                    <p className="text-sm text-neutral-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* ─ Tech Stack Card (small — 1 col) ───────────────── */}
          <BentoCard
            className="lg:col-span-1 lg:row-span-1"
            index={3}
            prefersReduced={prefersReduced}
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-primary-light">
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {about.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-neutral-700/50 bg-neutral-800/50 px-2.5 py-1 text-xs font-medium text-neutral-400 transition-colors hover:border-primary-light/30 hover:text-primary-light"
                >
                  {tech}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* ─ Stats Card (small — 1 col) ────────────────────── */}
          <BentoCard
            className="lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-primary-darkest to-neutral-900"
            index={4}
            prefersReduced={prefersReduced}
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-primary-light">
              By the Numbers
            </span>
            <div className="grid grid-cols-2 gap-4">
              {about.stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
