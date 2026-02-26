/* ============================================================
   AmalTrackerShowcase — Full professional app showcase
   ─────────────────────────────────────────────────
   Sections:
   1. Hero — App name, tagline, phone mockup, download CTA
   2. Highlights — Quick stat cards
   3. Features — Icon grid with Bangla + English text
   4. Screenshots — Phone-frame gallery with horizontal scroll
   5. How It Works — 4-step visual flow
   6. Download CTA — Final conversion banner
   ============================================================ */

"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  HiArrowLeft,
  HiDownload,
  HiExternalLink,
  HiCheckCircle,
} from "react-icons/hi";
import {
  FaMosque,
  FaUsers,
  FaChartBar,
  FaClipboardList,
  FaShieldAlt,
  FaCalendarAlt,
  FaChartLine,
  FaBell,
  FaSun,
  FaCheckCircle,
  FaBookOpen,
  FaLayerGroup,
  FaGooglePlay,
} from "react-icons/fa";

/* ── Icon map ──────────────────────────────────────────────── */
const iconMap = {
  mosque: FaMosque,
  users: FaUsers,
  chart: FaChartBar,
  clipboard: FaClipboardList,
  shield: FaShieldAlt,
  calendar: FaCalendarAlt,
  trending: FaChartLine,
  bell: FaBell,
  sunrise: FaSun,
  check: FaCheckCircle,
  book: FaBookOpen,
  layers: FaLayerGroup,
};

/* ── Animation variants ───────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ── Animated section wrapper ─────────────────────────────── */
function Section({ children, className = "", id }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ── Section heading ──────────────────────────────────────── */
function SectionHeading({ overline, title, subtitle }) {
  return (
    <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
      {overline && (
        <motion.p
          variants={fadeUp}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-light mb-3"
        >
          {overline}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        className="text-3xl sm:text-4xl font-bold text-neutral-100 leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="mt-4 text-neutral-400 leading-relaxed text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ── Phone frame mockup ───────────────────────────────────── */
function PhoneMockup({ src, alt, className = "" }) {
  return (
    <div className={`relative mx-auto ${className}`}>
      {/* Phone frame */}
      <div className="relative rounded-[2.5rem] border-[6px] border-neutral-700/60 bg-neutral-900 p-1.5 shadow-[0_0_60px_rgba(45,212,191,0.08)]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 h-6 w-28 rounded-b-2xl bg-neutral-900" />
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2rem] bg-neutral-800">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto block"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

/* ── Screenshot Carousel — 4 visible, with overlay on active ─ */
function ScreenshotCarousel({ screenshots }) {
  const VISIBLE = 4;
  const [activeIndex, setActiveIndex] = useState(0);
  const total = screenshots.length;

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + VISIBLE >= total ? 0 : prev + 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev <= 0 ? Math.max(total - VISIBLE, 0) : prev - 1,
    );
  }, [total]);

  /* Get the 4 visible screenshots from current index */
  const visibleScreenshots = [];
  for (let i = 0; i < VISIBLE; i++) {
    const idx = (activeIndex + i) % total;
    visibleScreenshots.push({ ...screenshots[idx], originalIndex: idx });
  }

  /* The center item (index 1 of the 4) gets the overlay */
  const overlayIdx = 1;

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="screenshots"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHeading
          overline="Screenshots"
          title="App Interface"
          subtitle="A clean, intuitive design that makes daily spiritual tracking effortless and beautiful."
        />
      </div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 sm:px-10"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {visibleScreenshots.map((ss, i) => (
            <div
              key={`${ss.originalIndex}-${activeIndex}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer"
            >
              {/* Image — full cover */}
              <img
                src={ss.src}
                alt={ss.label}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Dark overlay — always subtle, stronger on center */}
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  i === overlayIdx
                    ? "bg-neutral-black/50"
                    : "bg-neutral-black/10 group-hover:bg-neutral-black/30"
                }`}
              />

              {/* Active overlay content — only on center card */}
              {i === overlayIdx && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                  <h3 className="text-base sm:text-xl font-bold text-neutral-100 uppercase tracking-wider">
                    {ss.label}
                  </h3>
                  <div className="mt-3 flex items-center gap-2 text-neutral-200">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300/40">
                      <svg
                        className="h-3.5 w-3.5 ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </span>
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest">
                      View Demo
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* PRE / NEXT navigation */}
        <div className="flex items-center justify-center gap-8 mt-8">
          <button
            onClick={goPrev}
            className="flex items-center gap-2 text-sm text-neutral-400 uppercase tracking-widest font-medium transition-colors hover:text-neutral-100 cursor-pointer"
          >
            <span className="text-lg">←</span> Pre
          </button>
          <button
            onClick={goNext}
            className="flex items-center gap-2 text-sm text-neutral-400 uppercase tracking-widest font-medium transition-colors hover:text-neutral-100 cursor-pointer"
          >
            Next <span className="text-lg">→</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
export default function AmalTrackerShowcase({ data }) {
  const {
    name,
    nameBn,
    tagline,
    taglineEn,
    description,
    descriptionBn,
    playStoreUrl,
    category,
    techStack,
    features,
    screenshots,
    howItWorks,
    highlights,
  } = data;

  return (
    <div className="min-h-screen bg-surface-dark text-text-inverse overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────
          SECTION 1 — HERO
         ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/6 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(45,212,191,0.4) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-28 sm:pt-32 pb-16 sm:pb-24">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-primary-light transition-colors group mb-10 sm:mb-14"
            >
              <HiArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Text */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              {/* Category badge */}
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-light backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-light animate-pulse" />
                  {category} App
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeUp}
                className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-100 leading-[1.1]"
              >
                {name}
              </motion.h1>

              {/* Bangla tagline */}
              <motion.p
                variants={fadeUp}
                className="mt-4 text-xl sm:text-2xl text-primary-light/90 font-medium"
              >
                {tagline}
              </motion.p>

              {/* English subtitle */}
              <motion.p
                variants={fadeUp}
                className="mt-2 text-neutral-400 text-lg"
              >
                {taglineEn}
              </motion.p>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="mt-6 text-neutral-400 leading-relaxed max-w-lg"
              >
                {description}
              </motion.p>

              {/* Tech stack pills */}
              <motion.div
                variants={fadeUp}
                className="mt-6 flex flex-wrap gap-2"
              >
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-neutral-700/50 bg-neutral-800/40 px-3 py-1 font-mono text-xs text-neutral-400"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-4"
              >
                <a
                  href={playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-neutral-100 transition-all hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(15,118,110,0.3)] active:scale-[0.98]"
                >
                  <FaGooglePlay className="h-5 w-5" />
                  <span>
                    <span className="block text-[10px] font-normal opacity-80 leading-none">
                      GET IT ON
                    </span>
                    <span className="block leading-tight">Google Play</span>
                  </span>
                </a>
                <a
                  href="#screenshots"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-600 px-6 py-3.5 text-sm font-medium text-neutral-300 transition-all hover:bg-neutral-800 hover:text-neutral-100 hover:border-neutral-500"
                >
                  View Screenshots
                </a>
              </motion.div>
            </motion.div>

            {/* Right — Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex justify-center lg:justify-end"
            >
              <PhoneMockup
                src="/images/amal/home1.png"
                alt="Amal Tracker Home Screen"
                className="w-56 sm:w-64 lg:w-72"
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent" />
      </section>

      {/* ─────────────────────────────────────────────────────
          SECTION 2 — HIGHLIGHTS
         ───────────────────────────────────────────────────── */}
      <Section className="relative py-16 sm:py-20 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {highlights.map((h, i) => {
            const Icon = iconMap[h.icon] || FaLayerGroup;
            return (
              <motion.div
                key={h.label}
                variants={fadeUp}
                custom={i}
                className="group relative rounded-2xl border border-neutral-700/30 bg-neutral-900/50 p-5 sm:p-6 text-center backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-neutral-900/70"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary-light transition-colors group-hover:bg-primary/20">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-neutral-100">
                  {h.value}
                </p>
                <p className="mt-1 text-xs text-neutral-500 uppercase tracking-wider">
                  {h.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────
          SECTION 3 — FEATURES
         ───────────────────────────────────────────────────── */}
      <Section className="relative py-20 sm:py-28">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
          <SectionHeading
            overline="Features"
            title="যা যা আছে এই অ্যাপে"
            subtitle="Everything you need to stay consistent with your daily Islamic practices — all in one beautiful app."
          />

          <motion.div
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {features.map((f, i) => {
              const Icon = iconMap[f.icon] || FaCheckCircle;
              return (
                <motion.div
                  key={f.titleEn}
                  variants={fadeUp}
                  custom={i}
                  className="group relative rounded-2xl border border-neutral-700/30 bg-neutral-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/25 hover:bg-neutral-900/60 hover:shadow-[0_0_40px_rgba(45,212,191,0.04)]"
                >
                  {/* Icon */}
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary-light transition-colors group-hover:bg-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Bangla title */}
                  <h3 className="text-base font-bold text-neutral-100 leading-snug">
                    {f.titleBn}
                  </h3>

                  {/* English title */}
                  <p className="mt-0.5 text-xs font-medium text-primary-light/70 uppercase tracking-wide">
                    {f.titleEn}
                  </p>

                  {/* Bangla description */}
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                    {f.descBn}
                  </p>

                  {/* Hover accent line */}
                  <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary-light/0 to-transparent transition-all duration-300 group-hover:via-primary-light/20" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────
          SECTION 4 — SCREENSHOTS (Carousel — 4 visible)
         ───────────────────────────────────────────────────── */}
      <ScreenshotCarousel screenshots={screenshots} />

      {/* ─────────────────────────────────────────────────────
          SECTION 5 — HOW IT WORKS
         ───────────────────────────────────────────────────── */}
      <Section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.015] to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
          <SectionHeading
            overline="How It Works"
            title="কীভাবে ব্যবহার করবেন"
            subtitle="Get started in just four simple steps — no account required."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                custom={i}
                className="relative text-center"
              >
                {/* Connector line (hidden on first) */}
                {i > 0 && (
                  <div className="absolute top-8 -left-4 sm:-left-5 hidden lg:block w-8 sm:w-10 h-px bg-gradient-to-r from-primary-light/30 to-transparent" />
                )}

                {/* Step number */}
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-2xl font-bold text-primary-light">
                  {step.step}
                </div>

                {/* Bangla title */}
                <h3 className="text-lg font-bold text-neutral-100">
                  {step.titleBn}
                </h3>

                {/* English title */}
                <p className="mt-0.5 text-xs font-medium text-primary-light/60 uppercase tracking-wide">
                  {step.titleEn}
                </p>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  {step.descBn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────
          SECTION 6 — BANGLA DESCRIPTION BLOCK
         ───────────────────────────────────────────────────── */}
      <Section className="relative py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-neutral-700/30 bg-neutral-900/40 p-8 sm:p-12 backdrop-blur-sm"
          >
            <p className="text-xl sm:text-2xl leading-relaxed text-neutral-300 font-medium">
              {descriptionBn}
            </p>
            <div className="mt-6 flex justify-center gap-2">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-mono text-primary-light"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────
          SECTION 7 — DOWNLOAD CTA
         ───────────────────────────────────────────────────── */}
      <Section className="relative py-20 sm:py-28">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[300px] w-[600px] rounded-full bg-primary/6 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-100 leading-tight">
              আজই ডাউনলোড করুন
            </h2>
            <p className="mt-2 text-lg text-neutral-400">
              Download now and start your spiritual journey
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
          >
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-neutral-100 transition-all hover:bg-primary-dark hover:shadow-[0_0_40px_rgba(15,118,110,0.3)] active:scale-[0.98]"
            >
              <FaGooglePlay className="h-6 w-6" />
              <span>
                <span className="block text-[10px] font-normal opacity-80 leading-none">
                  GET IT ON
                </span>
                <span className="block leading-tight">Google Play</span>
              </span>
            </a>
            <Link
              href="/#projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-600 px-8 py-4 text-base font-medium text-neutral-300 transition-all hover:bg-neutral-800 hover:text-neutral-100"
            >
              <HiArrowLeft className="h-5 w-5" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Checkmarks */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-neutral-500"
          >
            {["Free to Use", "No Account Required", "Offline Support"].map(
              (item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <HiCheckCircle className="h-4 w-4 text-primary-light" />
                  {item}
                </span>
              ),
            )}
          </motion.div>
        </div>
      </Section>

      {/* ── Bottom accent ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-primary-light/20 to-transparent" />
      </div>

      {/* Spacer above footer */}
      <div className="h-16" />
    </div>
  );
}
