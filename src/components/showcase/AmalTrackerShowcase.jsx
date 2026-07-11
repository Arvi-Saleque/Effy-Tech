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
import { useRef, useState, useCallback, useEffect, useActionState } from "react";
import Link from "next/link";
import { submitReview } from "@/app/actions/submitReview";
import { trackCTAClick, trackReviewSubmit } from "@/lib/analytics";
import IAMAppTour from "@/components/showcase/iam/IAMAppTour";
import {
  HiArrowLeft,
  HiExternalLink,
  HiCheckCircle,
  HiChevronLeft,
  HiChevronRight,
  HiChevronDown,
  HiStar,
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
  FaQuran,
  FaFire,
  FaPrayingHands,
  FaHandHoldingHeart,
} from "react-icons/fa";

const SCROLL_THRESHOLD = 80;

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
  praying: FaPrayingHands,
  quran: FaQuran,
  heart: FaHandHoldingHeart,
  widgets: FaLayerGroup,
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

/* ── Feature Deep Dive — Interactive accordion ────────────── */
function FeatureDeepDive({ categories }) {
  const [openId, setOpenId] = useState("home");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="deep-dive"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 h-[600px] w-[600px] rounded-full bg-primary/[0.03] blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-accent/[0.025] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center mb-14 sm:mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary-light/40" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary-light/70">
              Deep Dive
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-primary-light/40" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1]">
            <span className="bg-gradient-to-b from-neutral-100 to-neutral-400 bg-clip-text text-transparent">
              বিস্তারিত ফিচারসমূহ
            </span>
          </h2>
          <p className="mt-5 text-neutral-500 leading-relaxed text-lg max-w-xl mx-auto">
            Explore every feature in detail — tap each section to learn more.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || FaLayerGroup;
            const isOpen = openId === cat.id;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                {/* Accordion item wrapper */}
                <div
                  className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
                    isOpen
                      ? "bg-neutral-900/80 shadow-[0_0_60px_rgba(0,0,0,0.3)]"
                      : "bg-neutral-900/30 hover:bg-neutral-900/50"
                  }`}
                >
                  {/* Border */}
                  <div
                    className={`absolute inset-0 rounded-2xl border transition-colors duration-500 pointer-events-none ${
                      isOpen
                        ? "border-primary/20"
                        : "border-neutral-700/20 hover:border-neutral-700/40"
                    }`}
                  />

                  {/* Active indicator glow */}
                  {isOpen && (
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-light/30 to-transparent" />
                  )}

                  {/* Header — clickable */}
                  <button
                    onClick={() => setOpenId(isOpen ? null : cat.id)}
                    className="relative z-10 w-full flex items-center gap-4 sm:gap-5 p-5 sm:p-6 text-left cursor-pointer"
                  >
                    {/* Icon */}
                    <div
                      className={`relative flex-shrink-0 flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br ${cat.color} border transition-all duration-500 ${
                        isOpen
                          ? "border-primary/20 shadow-[0_0_25px_rgba(45,212,191,0.06)]"
                          : "border-neutral-700/20"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300 ${
                          isOpen
                            ? "text-primary-light drop-shadow-[0_0_6px_rgba(45,212,191,0.4)]"
                            : "text-neutral-400"
                        }`}
                      />
                    </div>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                          isOpen ? "text-neutral-100" : "text-neutral-300"
                        }`}
                      >
                        {cat.titleBn}
                      </h3>
                      <p className="text-[11px] font-semibold text-neutral-600 uppercase tracking-[0.15em] mt-0.5">
                        {cat.titleEn}
                      </p>
                    </div>

                    {/* Number + chevron */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span
                        className={`hidden sm:block text-xs font-mono transition-colors duration-300 ${
                          isOpen ? "text-primary-light/40" : "text-neutral-700"
                        }`}
                      >
                        {cat.points.length} items
                      </span>
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-300 ${
                          isOpen
                            ? "border-primary/20 bg-primary/10 text-primary-light rotate-180"
                            : "border-neutral-700/30 bg-neutral-800/50 text-neutral-500"
                        }`}
                      >
                        <HiChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </button>

                  {/* Expandable body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 sm:pb-7 pt-0 sm:pl-[5.25rem]">
                          <div className="flex flex-col gap-3">
                            {cat.points.map((point, pi) => (
                              <motion.div
                                key={pi}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: pi * 0.06,
                                }}
                                className="flex gap-3 items-start group/point"
                              >
                                {/* Bullet */}
                                <div className="relative mt-2 flex-shrink-0">
                                  <div className="h-2 w-2 rounded-full bg-primary/30 group-hover/point:bg-primary/60 transition-colors duration-300" />
                                  <div className="absolute -inset-1 rounded-full bg-primary/10 blur-sm opacity-0 group-hover/point:opacity-100 transition-opacity duration-300" />
                                </div>
                                {/* Text */}
                                <p className="text-[15px] leading-relaxed text-neutral-400 group-hover/point:text-neutral-300 transition-colors duration-300">
                                  {point}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Screenshot Carousel — Full-width, slides 1 image at a time ── */
function ScreenshotCarousel({ screenshots }) {
  const total = screenshots.length;
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Lightbox navigation
  const lbIndex = lightbox
    ? screenshots.findIndex((s) => s.src === lightbox.src)
    : -1;

  const lbPrev = useCallback(() => {
    if (lbIndex < 0) return;
    setLightbox(screenshots[(lbIndex - 1 + total) % total]);
  }, [lbIndex, screenshots, total]);

  const lbNext = useCallback(() => {
    if (lbIndex < 0) return;
    setLightbox(screenshots[(lbIndex + 1) % total]);
  }, [lbIndex, screenshots, total]);

  // Triple array for seamless infinite looping
  const extended = [...screenshots, ...screenshots, ...screenshots];
  const offset = total;

  return (
    <>
      <section id="screenshots" ref={ref} className="relative py-16 sm:py-24">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-14 px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-light mb-3"
          >
            Screenshots
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-neutral-100 leading-tight"
          >
            App Interface
          </motion.h2>
        </div>

        {/* Full-width image strip — slides one image at a time */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full overflow-hidden"
        >
          <div
            className="screenshot-strip flex transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{
              transform: `translateX(calc(-${offset + current} * (100% / var(--cols))))`,
              "--cols": 2,
            }}
          >
            {extended.map((ss, i) => (
              <div
                key={`${i}`}
                className="flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/4 relative overflow-hidden group cursor-pointer px-2 sm:px-3"
                style={{ aspectRatio: "9 / 16" }}
                onClick={() => setLightbox(ss)}
              >
                <img
                  src={ss.src}
                  alt={ss.label}
                  className="absolute inset-2 sm:inset-3 w-[calc(100%_-_1rem)] sm:w-[calc(100%_-_1.5rem)] h-[calc(100%_-_1rem)] sm:h-[calc(100%_-_1.5rem)] rounded-2xl object-contain bg-neutral-950/40 transition-transform duration-500 group-hover:scale-[1.02] shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
                  loading="lazy"
                />
                <div className="absolute inset-2 sm:inset-3 rounded-2xl bg-neutral-black/0 group-hover:bg-neutral-black/10 transition-all duration-300" />
              </div>
            ))}
          </div>

          {/* Override --cols at each breakpoint */}
          <style>{`
            @media (min-width: 768px) {
              .screenshot-strip { --cols: 3 !important; }
            }
            @media (min-width: 1024px) {
              .screenshot-strip { --cols: 4 !important; }
            }
          `}</style>
        </motion.div>

        {/* Navigation — ← PRE    NEXT → */}
        <div className="flex items-center justify-center gap-8 mt-8 sm:mt-10">
          <button
            onClick={goPrev}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-100 transition-colors cursor-pointer"
          >
            <HiChevronLeft className="h-4 w-4" />
            Pre
          </button>
          <button
            onClick={goNext}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-100 transition-colors cursor-pointer"
          >
            Next
            <HiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* ── Lightbox ──────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <>
            <motion.div
              key="lb-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-neutral-black/90 backdrop-blur-md"
              onClick={() => setLightbox(null)}
            />
            <motion.div
              key="lb-content"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
              onClick={() => setLightbox(null)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  lbPrev();
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-neutral-600/50 bg-neutral-900/70 text-neutral-300 hover:text-neutral-white hover:border-neutral-400 backdrop-blur-sm transition-all cursor-pointer"
                aria-label="Previous screenshot"
              >
                <HiChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <div
                className="relative max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={lightbox.src}
                  alt={lightbox.label}
                  className="w-full h-auto rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.5)]"
                />
                <p className="mt-4 text-center text-sm text-neutral-400 uppercase tracking-wider">
                  {lightbox.label}
                  <span className="ml-2 text-neutral-600">
                    {lbIndex + 1} / {total}
                  </span>
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  lbNext();
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-neutral-600/50 bg-neutral-900/70 text-neutral-300 hover:text-neutral-white hover:border-neutral-400 backdrop-blur-sm transition-all cursor-pointer"
                aria-label="Next screenshot"
              >
                <HiChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-600/50 bg-neutral-900/70 text-neutral-400 hover:text-neutral-white hover:border-neutral-400 backdrop-blur-sm transition-all cursor-pointer"
                aria-label="Close"
              >
                <span className="text-xl leading-none">&times;</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Amal Tracker custom navbar links ─────────────────────── */
const showcaseNavLinks = [
  { label: "Features", href: "#features" },
  { label: "Details", href: "#deep-dive" },
  { label: "Screenshots", href: "#screenshots" },
  { label: "Feedback", href: "#reviews" },
  { label: "Download", href: "#download" },
];

/* ── Stagger variants for mobile overlay ──────────────────── */
const mobileOverlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};
const mobileMenuStagger = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};
const mobileLinkVariants = {
  closed: { opacity: 0, y: 30, filter: "blur(4px)" },
  open: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/* ── Custom Navbar for Amal Tracker page ──────────────────── */
function ShowcaseNavbar({ appName, logoImage, playStoreUrl }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          scrolled
            ? "bg-neutral-900/80 backdrop-blur-md shadow-lg border-b border-primary-darkest/30"
            : "bg-neutral-900/20 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 md:h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── Left: Back + App name ────────────────────── */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link
              href="/#projects"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-neutral-700/35 bg-neutral-800/45 text-neutral-400 transition-all hover:border-primary/35 hover:text-primary-light"
              aria-label="Back to projects"
            >
              <HiArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex min-w-0 items-center gap-2">
              <img
                src={logoImage}
                alt={`${appName} logo`}
                className="h-8 w-8 shrink-0 rounded-lg border border-white/10 object-cover shadow-sm"
              />
              <span className="text-[12px] font-black tracking-[0.14em] text-neutral-100 sm:hidden">
                IAM
              </span>
              <span className="hidden text-sm font-bold text-neutral-200 sm:inline">
                {appName}
              </span>
            </div>
          </div>

          {/* ── Center: Nav Links (desktop) ──────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {showcaseNavLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 group ${
                  scrolled
                    ? "text-neutral-300 hover:text-primary-light"
                    : "text-text-inverse/80 hover:text-text-inverse"
                }`}
              >
                {label}
                <span className="absolute bottom-0.5 left-4 right-4 h-0.5 bg-primary-light scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            ))}
          </nav>

          {/* ── Right: CTA + Hamburger ───────────────────── */}
          <div className="flex items-center gap-3">
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick("Download - Navbar", "IAM")}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-primary px-3 text-[11px] font-bold text-white shadow-[0_8px_24px_rgba(15,118,110,0.3)] transition-all duration-300 hover:bg-primary-dark hover:shadow-[0_0_24px_rgba(45,212,191,0.22)] active:scale-[0.98] sm:h-10 sm:gap-2 sm:px-4 sm:text-xs"
            >
              <FaGooglePlay className="h-3.5 w-3.5" />
              <span className="sm:hidden">Install</span>
              <span className="hidden sm:inline">Get it on Google Play</span>
            </a>

            {/* Hamburger toggle (mobile) */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 cursor-pointer md:hidden ${
                scrolled
                  ? "text-text-inverse hover:bg-neutral-white/10"
                  : "text-text-inverse hover:bg-neutral-white/10"
              }`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative h-5 w-5">
                <span
                  className={`absolute left-0 top-0.5 h-0.5 w-5 rounded-full bg-text-inverse transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                />
                <span
                  className={`absolute left-0 top-[9px] h-0.5 w-5 rounded-full bg-text-inverse transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`}
                />
                <span
                  className={`absolute left-0 bottom-0.5 h-0.5 w-5 rounded-full bg-text-inverse transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Full-screen mobile overlay (Effy Tech style) ───── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-surface-dark md:hidden"
            variants={mobileOverlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3 }}
          >
            {/* Top bar — app name + close */}
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3">
                <Link
                  href="/#projects"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary-light/20 text-neutral-400 hover:text-primary-light transition-colors"
                >
                  <HiArrowLeft className="h-4 w-4" />
                </Link>
                <div className="flex items-center gap-2.5">
                  <img
                    src={logoImage}
                    alt={`${appName} logo`}
                    className="h-9 w-9 rounded-xl object-cover shadow-sm"
                  />
                  <span className="text-base font-bold text-neutral-100">
                    {appName}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-light/20 text-text-inverse hover:bg-primary-light/10 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Large stagger-animated links */}
            <motion.nav
              className="flex flex-1 flex-col items-center justify-center gap-2"
              variants={mobileMenuStagger}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {showcaseNavLinks.map(({ label, href }, index) => (
                <motion.div key={label} variants={mobileLinkVariants}>
                  {index > 0 && (
                    <div className="mx-auto mb-2 h-px w-16 bg-primary-light/20" />
                  )}
                  <a
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-6 py-3 text-center text-4xl md:text-5xl font-bold text-text-inverse hover:text-primary-light transition-colors"
                  >
                    {label}
                  </a>
                </motion.div>
              ))}

              {/* Download CTA */}
              <motion.div variants={mobileLinkVariants} className="mt-8">
                <a
                  href={playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTAClick("Download - Mobile Menu", "IAM")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-light px-8 py-3 text-base font-semibold text-text-inverse shadow-[0_0_25px_rgba(45,212,191,0.25)] transition-all hover:scale-105"
                >
                  <FaGooglePlay className="h-4 w-4" />
                  Download on Google Play
                </a>
              </motion.div>
            </motion.nav>

            {/* Bottom — back to Effy Tech */}
            <div className="flex justify-center pb-8">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-neutral-500 hover:text-primary-light transition-colors"
              >
                &larr; Back to Effy Tech
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Custom Footer for Amal Tracker page ──────────────────── */
function ShowcaseFooter({ appName, playStoreUrl }) {
  return (
    <footer className="relative border-t border-neutral-800/40 bg-neutral-950/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold text-neutral-100">{appName}</h3>
            <p className="mt-2 text-sm text-neutral-500 leading-relaxed max-w-xs">
              A complete daily companion for Salah, Sunnah, Kaza, Amal,
              Dhikr, routines, reminders and meaningful progress.
            </p>
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick("Download - Showcase Footer", "IAM")}
              className="inline-flex items-center gap-2 mt-4 rounded-lg bg-primary/15 border border-primary/20 px-4 py-2 text-xs font-semibold text-primary-light hover:bg-primary/25 transition-colors"
            >
              <FaGooglePlay className="h-3.5 w-3.5" />
              Google Play
            </a>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2.5">
              {showcaseNavLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm text-neutral-400 hover:text-primary-light transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3 — Effy Tech */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">
              Effy Tech
            </h4>
            <nav className="flex flex-col gap-2.5">
              <Link
                href="/"
                className="text-sm text-neutral-400 hover:text-primary-light transition-colors"
              >
                Home
              </Link>
              <Link
                href="/#projects"
                className="text-sm text-neutral-400 hover:text-primary-light transition-colors"
              >
                All Projects
              </Link>
              <Link
                href="/#about"
                className="text-sm text-neutral-400 hover:text-primary-light transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/#contact"
                className="text-sm text-neutral-400 hover:text-primary-light transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Col 4 — Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">
              App Info
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-neutral-400">
              <li className="flex items-center gap-2">
                <HiCheckCircle className="h-4 w-4 text-primary-light/60 flex-shrink-0" />
                Free to Use
              </li>
              <li className="flex items-center gap-2">
                <HiCheckCircle className="h-4 w-4 text-primary-light/60 flex-shrink-0" />
                Account Optional
              </li>
              <li className="flex items-center gap-2">
                <HiCheckCircle className="h-4 w-4 text-primary-light/60 flex-shrink-0" />
                Offline-first
              </li>
              <li className="flex items-center gap-2">
                <HiCheckCircle className="h-4 w-4 text-primary-light/60 flex-shrink-0" />
                Flutter, Drift &amp; Supabase
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-neutral-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} Effy Tech. All rights reserved.
          </p>
          <Link
            href="/"
            className="text-xs text-neutral-600 hover:text-primary-light transition-colors"
          >
            Powered by Effy Tech
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ── Star Rating Input ─────────────────────────────────────── */
function StarRatingInput({ value, onChange }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="p-0.5 transition-transform hover:scale-110 cursor-pointer"
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          <HiStar
            className={`h-7 w-7 transition-colors duration-150 ${
              star <= (hover || value)
                ? "text-primary-light drop-shadow-[0_0_6px_rgba(45,212,191,0.4)]"
                : "text-neutral-700"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

/* ── Star Rating Display ───────────────────────────────────── */
function StarRatingDisplay({ rating, size = "sm" }) {
  const sizeClass = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <HiStar
          key={star}
          className={`${sizeClass} ${
            star <= rating ? "text-primary-light" : "text-neutral-700"
          }`}
        />
      ))}
    </div>
  );
}

/* ── Review Card ───────────────────────────────────────────── */
function ReviewCard({ review, index }) {
  const gradients = [
    "from-primary/20 to-primary-light/20",
    "from-purple-500/20 to-primary/20",
    "from-emerald-500/20 to-primary/20",
    "from-cyan-500/20 to-primary-light/20",
    "from-primary-light/20 to-teal-500/20",
    "from-blue-500/20 to-primary/20",
  ];

  const borderColors = [
    "hover:border-primary-light/40",
    "hover:border-purple-400/40",
    "hover:border-emerald-400/40",
    "hover:border-cyan-400/40",
    "hover:border-teal-400/40",
    "hover:border-blue-400/40",
  ];

  const grad = gradients[index % gradients.length];
  const borderHover = borderColors[index % borderColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative overflow-hidden rounded-2xl border border-neutral-700/40 bg-neutral-900/50 p-6 backdrop-blur-sm transition-all duration-300 ${borderHover} hover:bg-neutral-800/50`}
    >
      {/* Gradient glow on hover */}
      <div
        className={`absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-br ${grad} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="relative z-10">
        {/* Header: avatar + name + date */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary-light/30 text-sm font-bold text-primary-light ring-1 ring-primary-light/20">
              {review.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-200">
                {review.name}
              </p>
              <p className="text-xs text-neutral-500">
                {new Date(review.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <StarRatingDisplay rating={review.rating} />
        </div>

        {/* Review text */}
        <p className="text-sm leading-relaxed text-neutral-400">
          {review.message}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Review Form ───────────────────────────────────────────── */
function ReviewForm() {
  const [serverState, formAction, isPending] = useActionState(submitReview, null);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (serverState?.success) {
      trackReviewSubmit("Islamic Amal Tracker", rating);
      setSubmitted(true);
      setRating(0);
      formRef.current?.reset();
      // Reset success state after 5 seconds
      const t = setTimeout(() => setSubmitted(false), 5000);
      return () => clearTimeout(t);
    }
  }, [serverState]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl border border-neutral-700/40 bg-neutral-900/50 p-6 sm:p-8 backdrop-blur-sm"
    >
      <h3 className="text-lg font-bold text-neutral-100 mb-1">
        Share Your Experience
      </h3>
      <p className="text-sm text-neutral-500 mb-6">
        আপনার মতামত জানান — your review helps others discover this app
      </p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <motion.div
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light/15 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
            >
              <HiCheckCircle className="h-8 w-8 text-primary-light" />
            </motion.div>
            <p className="text-base font-semibold text-neutral-200">
              Thank you for your review!
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              Your review is pending approval
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            action={(fd) => {
              fd.set("rating", String(rating));
              formAction(fd);
            }}
            className="space-y-5"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Rating */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-neutral-500 mb-2">
                Rating
              </label>
              <StarRatingInput value={rating} onChange={setRating} />
              {serverState?.errors?.rating && (
                <p className="mt-1 text-xs text-error">{serverState.errors.rating}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="review-name"
                className="block text-xs font-medium uppercase tracking-wider text-neutral-500 mb-2"
              >
                Your Name
              </label>
              <input
                id="review-name"
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-all focus:border-primary-light focus:ring-2 focus:ring-primary-light/10"
              />
              {serverState?.errors?.name && (
                <p className="mt-1 text-xs text-error">{serverState.errors.name}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="review-message"
                className="block text-xs font-medium uppercase tracking-wider text-neutral-500 mb-2"
              >
                Your Review
              </label>
              <textarea
                id="review-message"
                name="message"
                rows={4}
                required
                placeholder="Share your experience with Amal Tracker..."
                className="w-full resize-none rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-all focus:border-primary-light focus:ring-2 focus:ring-primary-light/10"
              />
              {serverState?.errors?.message && (
                <p className="mt-1 text-xs text-error">{serverState.errors.message}</p>
              )}
            </div>

            {/* Server error */}
            {serverState?.errors?.server && (
              <p className="text-sm text-error">{serverState.errors.server}</p>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isPending || rating === 0}
              className="w-full rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-neutral-100 transition-all hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(15,118,110,0.2)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              whileTap={{ scale: 0.98 }}
            >
              {isPending ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Review"
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Review Section ────────────────────────────────────────── */
function ReviewSection({ initialReviews }) {
  const [reviews] = useState(initialReviews);

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: reviews.length > 0
      ? Math.round((reviews.filter((r) => r.rating === star).length / reviews.length) * 100)
      : 0,
  }));

  return (
    <Section id="reviews" className="relative py-20 sm:py-28">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-primary/4 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-accent/3 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary-light mb-4">
            Beta Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-100">
            Help Shape{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary">
              Version 2.0
            </span>
          </h2>
          <p className="mt-3 text-neutral-400 max-w-lg mx-auto">
            Share your experience, report gaps and help improve Islamic Amal Tracker during beta
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 rounded-2xl border border-neutral-700/40 bg-neutral-900/50 p-6 sm:p-8 backdrop-blur-sm"
        >
          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
            {/* Big average */}
            <div className="text-center sm:text-left shrink-0">
              <p className="text-5xl font-black text-neutral-100 leading-none">
                {avgRating}
              </p>
              <div className="mt-2">
                <StarRatingDisplay rating={Math.round(Number(avgRating))} size="md" />
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                {reviews.length} review{reviews.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Rating breakdown bars */}
            <div className="flex-1 w-full space-y-2">
              {ratingCounts.map(({ star, count, pct }) => (
                <div key={star} className="flex items-center gap-3 text-sm">
                  <span className="text-neutral-500 w-4 text-right">{star}</span>
                  <HiStar className="h-3.5 w-3.5 text-primary-light shrink-0" />
                  <div className="flex-1 h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 + star * 0.05 }}
                    />
                  </div>
                  <span className="text-neutral-600 w-8 text-right text-xs">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Reviews grid + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review cards — 2 cols on lg */}
          <div className="lg:col-span-2 space-y-5">
            {reviews.length === 0 ? (
              <div className="rounded-2xl border border-neutral-700/40 bg-neutral-900/50 p-12 text-center backdrop-blur-sm">
                <p className="text-neutral-500">
                  No approved Version 2.0 feedback yet. Be the first to share your experience!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {reviews.map((review, i) => (
                  <ReviewCard key={review.id} review={review} index={i} />
                ))}
              </div>
            )}
          </div>

          {/* Review form — 1 col on lg */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <ReviewForm />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function useHideFixedWhatsAppInHero(heroRef) {
  useEffect(() => {
    const originals = new Map();
    const selector = [
      'a[href*="wa.me"]',
      'a[href*="api.whatsapp.com"]',
      'a[href*="whatsapp.com"]',
      '[aria-label*="whatsapp" i]',
      '[title*="whatsapp" i]',
    ].join(",");

    const findFixedContainer = (node) => {
      let element = node;

      for (let depth = 0; element && depth < 5; depth += 1) {
        if (window.getComputedStyle(element).position === "fixed") {
          return element;
        }
        element = element.parentElement;
      }

      return null;
    };

    const restore = (element) => {
      const original = originals.get(element);
      if (!original) return;

      element.style.opacity = original.opacity;
      element.style.pointerEvents = original.pointerEvents;
      element.style.transform = original.transform;
      element.style.visibility = original.visibility;
      originals.delete(element);
    };

    const update = () => {
      const hero = heroRef.current;
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      const rect = hero?.getBoundingClientRect();
      const heroVisible =
        Boolean(rect) &&
        rect.bottom > 72 &&
        rect.top < window.innerHeight * 0.82;

      const fixedLaunchers = new Set(
        Array.from(document.querySelectorAll(selector))
          .map(findFixedContainer)
          .filter(Boolean),
      );

      fixedLaunchers.forEach((element) => {
        if (isMobile && heroVisible) {
          if (!originals.has(element)) {
            originals.set(element, {
              opacity: element.style.opacity,
              pointerEvents: element.style.pointerEvents,
              transform: element.style.transform,
              visibility: element.style.visibility,
            });
          }

          element.style.setProperty("opacity", "0", "important");
          element.style.setProperty("pointer-events", "none", "important");
          element.style.setProperty("transform", "scale(0.82)", "important");
          element.style.setProperty("visibility", "hidden", "important");
        } else {
          restore(element);
        }
      });

      Array.from(originals.keys()).forEach((element) => {
        if (!fixedLaunchers.has(element) || !isMobile || !heroVisible) {
          restore(element);
        }
      });
    };

    update();

    const delayedUpdate = window.setTimeout(update, 500);
    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.clearTimeout(delayedUpdate);
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      Array.from(originals.keys()).forEach(restore);
    };
  }, [heroRef]);
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
export default function AmalTrackerShowcase({ data, initialReviews = [] }) {
  const {
    name,
    nameBn,
    versionLabel,
    tagline,
    taglineEn,
    description,
    descriptionBn,
    playStoreUrl,
    category,
    techStack,
    logoImage,
    features,
    deepDiveCategories,
    screenshots,
    howItWorks,
    highlights,
  } = data;

  const heroRef = useRef(null);
  useHideFixedWhatsAppInHero(heroRef);

  /* Scroll to top & restore body scroll on client-side navigation */
  useEffect(() => {
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-surface-dark text-text-inverse overflow-x-hidden">
      {/* Custom Navbar for this page */}
      <ShowcaseNavbar
        appName={name}
        logoImage={logoImage}
        playStoreUrl={playStoreUrl}
      />

      {/* ─────────────────────────────────────────────────────
          SECTION 1 — MOBILE-FIRST CONVERSION HERO
         ───────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden pt-16 md:pt-[72px]">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 h-[620px] w-[620px] rounded-full bg-primary/8 blur-[150px]" />
          <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-accent/6 blur-[135px]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(45,212,191,0.4) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Mobile: a spacious conversion hero, then a dedicated full-size App Tour */}
        <div className="relative z-10 lg:hidden">
          <div className="mx-auto max-w-md px-4 sm:px-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52 }}
              className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center py-10 text-center"
            >
              <img
                src={logoImage}
                alt={`${name} logo`}
                className="h-20 w-20 rounded-[1.4rem] border border-primary/20 bg-neutral-900 object-cover shadow-[0_22px_60px_rgba(0,0,0,0.42)]"
                loading="eager"
              />

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.26em] text-primary-light/80">
                Your Daily Worship Companion
              </p>

              <h1 className="mt-3 text-[38px] font-black leading-[1.04] tracking-[-0.045em] text-neutral-50">
                Islamic Amal Tracker
              </h1>

              <p className="mx-auto mt-5 max-w-[360px] text-[15px] font-medium leading-7 text-neutral-300">
                নামাজ, কাযা, যিকির, দৈনিক আমল ও ইসলামিক রুটিন—সবকিছু গুছিয়ে রাখুন এক অ্যাপে।
              </p>

              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("Download - Hero", "IAM")}
                className="mt-7 inline-flex min-h-16 w-full items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-4 text-[15px] font-bold text-white shadow-[0_18px_48px_rgba(15,118,110,0.36)] transition active:scale-[0.985]"
              >
                <FaGooglePlay className="h-6 w-6" />
                <span>Google Play থেকে ইনস্টল করুন</span>
              </a>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] font-semibold text-neutral-400">
                <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5">
                  Free to Download
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5">
                  Beta Version
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5">
                  Privacy Focused
                </span>
              </div>

              <a
                href="#iam-tour"
                className="mt-10 inline-flex flex-col items-center gap-2 text-[9px] font-bold uppercase tracking-[0.22em] text-neutral-500"
              >
                Explore the App
                <span className="text-base leading-none text-primary-light/70">↓</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.62 }}
              className="border-t border-white/[0.07] pb-12 pt-10"
            >
              <div className="mb-6 text-center">
                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-primary-light/70">
                  App Preview
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-neutral-50">
                  Explore Every Screen
                </h2>
                <p className="mx-auto mt-2 max-w-[330px] text-[12px] leading-5 text-neutral-500">
                  একটি screen বেছে নিন, তারপর phone-এর ভেতরে scroll করে সম্পূর্ণ page দেখুন।
                </p>
              </div>

              <IAMAppTour appName={name} />
            </motion.div>
          </div>
        </div>

        {/* Desktop: concise brand copy + full-height App Tour */}
        <div className="relative z-10 hidden min-h-[calc(100vh-72px)] lg:flex lg:items-center">
          <div className="mx-auto w-full max-w-7xl px-10 py-10">
            <div className="grid grid-cols-[0.82fr_1.18fr] items-center gap-14">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="max-w-xl"
              >
                <motion.div variants={fadeUp} className="flex items-center gap-4">
                  <img
                    src={logoImage}
                    alt={`${name} logo`}
                    className="h-20 w-20 rounded-2xl border border-primary/20 bg-neutral-900 object-cover shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
                    loading="eager"
                  />
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-light">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-light animate-pulse" />
                    {category} App{versionLabel ? ` • ${versionLabel}` : ""}
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="mt-7 text-6xl font-bold leading-[1.04]"
                >
                  <span className="bg-gradient-to-b from-neutral-50 to-neutral-300 bg-clip-text text-transparent">
                    {name}
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="mt-3 text-xl font-medium text-primary-light/90"
                >
                  {tagline}
                </motion.p>

                <motion.p
                  variants={fadeUp}
                  className="mt-4 max-w-lg text-base leading-relaxed text-neutral-400"
                >
                  {description}
                </motion.p>

                <motion.a
                  variants={fadeUp}
                  href={playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTAClick("Download - Hero", "IAM")}
                  className="mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(15,118,110,0.3)] transition hover:bg-primary-dark hover:shadow-[0_0_42px_rgba(15,118,110,0.36)] active:scale-[0.985]"
                >
                  <FaGooglePlay className="h-5 w-5" />
                  <span className="text-left">
                    <span className="block text-[10px] font-normal leading-none opacity-80">
                      GET IT ON
                    </span>
                    <span className="block text-base leading-tight">Google Play</span>
                  </span>
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 34, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.85,
                  delay: 0.18,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="mx-auto w-full max-w-[620px]"
              >
                <IAMAppTour appName={name} />
              </motion.div>
            </div>
          </div>
        </div>

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
          SECTION 3 — FEATURES  (WOW Edition)
         ───────────────────────────────────────────────────── */}
      <Section
        id="features"
        className="relative py-24 sm:py-32 overflow-hidden"
      >
        {/* ── Atmospheric background layers ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 h-[600px] w-[800px] rounded-full bg-primary/[0.04] blur-[160px]" />
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-accent/[0.03] blur-[130px]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(45,212,191,0.4) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          {/* Horizontal accent line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/[0.06] to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
          {/* ── Premium section heading ── */}
          <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-3 mb-5"
            >
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary-light/40" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary-light/70">
                Features
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-primary-light/40" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold leading-[1.1]"
            >
              <span className="bg-gradient-to-b from-neutral-100 to-neutral-400 bg-clip-text text-transparent">
                যা যা আছে এই অ্যাপে
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-neutral-500 leading-relaxed text-lg max-w-xl mx-auto"
            >
              Prayer, Amal, Dhikr, routines, reminders, insights and accountability — organized in one focused app.
            </motion.p>
          </div>

          {/* ── Bento Feature Grid ── */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {features.map((f, i) => {
              const Icon = iconMap[f.icon] || FaCheckCircle;
              const isHero = i === 0;

              return (
                <motion.div
                  key={f.titleEn}
                  variants={fadeUp}
                  custom={i}
                  className={`group relative overflow-hidden rounded-2xl ${
                    isHero ? "sm:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  {/* Default subtle border */}
                  <div className="absolute inset-0 rounded-2xl border border-neutral-700/25 group-hover:border-transparent transition-colors duration-500" />

                  {/* Hover — gradient border reveal */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/40 via-primary/10 to-accent/30" />
                    <div className="absolute inset-[1px] rounded-[15px] bg-[#0a0e14]" />
                  </div>

                  {/* Glass fill */}
                  <div className="absolute inset-[1px] rounded-[15px] bg-neutral-900/50 backdrop-blur-2xl group-hover:bg-[#0d1117]/90 transition-colors duration-500" />

                  {/* Top glow bloom */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-28 w-2/3 bg-primary/[0.06] blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Shimmer sweep on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-in-out bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none" />

                  {/* ── Card content ── */}
                  <div
                    className={`relative z-10 ${
                      isHero
                        ? "flex flex-col sm:flex-row sm:items-center gap-6 p-8 sm:p-10"
                        : "flex flex-col p-6 sm:p-7"
                    }`}
                  >
                    {/* Icon with glow halo */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute -inset-4 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      <div
                        className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/[0.03] border border-primary/10 group-hover:border-primary/25 group-hover:shadow-[0_0_30px_rgba(45,212,191,0.08)] transition-all duration-500 ${
                          isHero ? "h-16 w-16" : "h-12 w-12"
                        }`}
                      >
                        <Icon
                          className={`text-primary-light transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.5)] ${
                            isHero ? "h-7 w-7" : "h-5 w-5"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Text block */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3
                            className={`font-bold text-neutral-200 leading-snug group-hover:text-neutral-50 transition-colors duration-300 ${
                              isHero ? "text-xl sm:text-2xl" : "text-base"
                            }`}
                          >
                            {f.titleBn}
                          </h3>
                          <p className="mt-1 text-[11px] font-semibold text-primary-light/50 uppercase tracking-[0.15em]">
                            {f.titleEn}
                          </p>
                        </div>
                        {/* Numbered badge */}
                        <span className="text-[10px] font-mono text-neutral-700 tracking-widest flex-shrink-0 mt-1 opacity-60 group-hover:opacity-100 group-hover:text-primary-light/30 transition-all duration-300">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <p
                        className={`mt-3 leading-relaxed text-neutral-500 group-hover:text-neutral-400 transition-colors duration-300 ${
                          isHero ? "text-[15px]" : "text-sm"
                        }`}
                      >
                        {f.descBn}
                      </p>
                    </div>
                  </div>

                  {/* Bottom accent glow line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/25 transition-all duration-700 pointer-events-none" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────
          SECTION 3.5 — DETAILED FEATURE DEEP DIVE
         ───────────────────────────────────────────────────── */}
      <FeatureDeepDive categories={deepDiveCategories} />

      {/* ─────────────────────────────────────────────────────
          SECTION 4 — SCREENSHOTS (Full-width carousel)
         ───────────────────────────────────────────────────── */}
      <ScreenshotCarousel screenshots={screenshots} />

      {/* ─────────────────────────────────────────────────────
          SECTION 5 — HOW IT WORKS
         ───────────────────────────────────────────────────── */}
      <Section id="how-it-works" className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.015] to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
          <SectionHeading
            overline="How It Works"
            title="কীভাবে ব্যবহার করবেন"
            subtitle="Start offline in minutes; sign in only when you want secure backup and sync."
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
          SECTION 6.5 — REVIEWS
         ───────────────────────────────────────────────────── */}
      <ReviewSection initialReviews={initialReviews} />

      {/* ─────────────────────────────────────────────────────
          SECTION 7 — DOWNLOAD CTA
         ───────────────────────────────────────────────────── */}
      <Section id="download" className="relative py-20 sm:py-28">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[300px] w-[600px] rounded-full bg-primary/6 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-100 leading-tight">
              আজই Islamic Amal Tracker ব্যবহার শুরু করুন
            </h2>
            <p className="mt-2 text-lg text-neutral-400">
              Track consistently, understand your gaps and improve one day at a time.
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
              onClick={() => trackCTAClick("Download - CTA", "IAM")}
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
            {["Free to Use", "Works Offline", "Optional Cloud Sync", "Bangla & English"].map(
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

    </div>
  );
}
