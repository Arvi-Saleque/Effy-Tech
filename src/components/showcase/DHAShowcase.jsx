/* ============================================================
   DHAShowcase — Full professional web project showcase
   ─────────────────────────────────────────────────
   Sections:
   1. Hero — Project name, tagline, browser mockup, live site CTA
   2. Highlights — Quick stat cards
   3. Features — Icon grid (same WOW edition as Amal page)
   4. Screenshots — Full-width gallery with scroll & lightbox
   5. Tech Stack — Visual tech breakdown
   6. CTA — Final conversion banner
   ============================================================ */

"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { trackCTAClick, trackExternalLink } from "@/lib/analytics";
import {
  HiArrowLeft,
  HiExternalLink,
  HiCheckCircle,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import {
  FaGlobe,
  FaLayerGroup,
  FaCheckCircle,
  FaShieldAlt,
  FaFilter,
  FaSearch,
  FaMobileAlt,
  FaImages,
  FaUserGraduate,
  FaFilePdf,
  FaLanguage,
  FaCogs,
  FaChalkboardTeacher,
} from "react-icons/fa";

const SCROLL_THRESHOLD = 80;

/* ── Icon map ──────────────────────────────────────────────── */
const iconMap = {
  admin: FaCogs,
  language: FaLanguage,
  academic: FaChalkboardTeacher,
  pdf: FaFilePdf,
  filter: FaFilter,
  seo: FaSearch,
  responsive: FaMobileAlt,
  gallery: FaImages,
  admission: FaUserGraduate,
  layers: FaLayerGroup,
  shield: FaShieldAlt,
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

/* ── Browser Mockup for hero ──────────────────────────────── */
function BrowserMockup({ src, alt, className = "" }) {
  return (
    <div className={`relative mx-auto ${className}`}>
      {/* Browser frame */}
      <div className="relative rounded-xl border border-neutral-700/40 bg-neutral-900 shadow-[0_20px_80px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800/80 bg-neutral-900/90">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/70" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <div className="h-3 w-3 rounded-full bg-green-500/70" />
          </div>
          {/* URL bar */}
          <div className="flex-1 mx-3">
            <div className="flex items-center gap-2 rounded-md bg-neutral-800/80 px-3 py-1.5 text-xs text-neutral-500">
              <FaGlobe className="h-3 w-3 text-primary-light/50" />
              <span className="truncate">www.dhakhl.com</span>
            </div>
          </div>
        </div>
        {/* Screen content */}
        <div className="relative bg-neutral-800">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto block"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}

/* ── Screenshot Carousel — matches Amal Tracker's UI exactly ── */
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
            Web Interface
          </motion.h2>
        </div>

        {/* Full-width image strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full overflow-hidden"
        >
          <div
            className="dha-screenshot-strip flex transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{
              transform: `translateX(calc(-${offset + current} * (100% / var(--cols))))`,
              "--cols": 1,
            }}
          >
            {extended.map((ss, i) => (
              <div
                key={`${i}`}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 relative overflow-hidden group cursor-pointer"
                style={{ aspectRatio: "16 / 10" }}
                onClick={() => setLightbox(ss)}
              >
                <img
                  src={ss.src}
                  alt={ss.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-neutral-black/0 group-hover:bg-neutral-black/15 transition-all duration-300" />
                {/* Label overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs font-medium text-neutral-200 text-center uppercase tracking-wider">
                    {ss.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Override --cols at each breakpoint */}
          <style>{`
            @media (min-width: 768px) {
              .dha-screenshot-strip { --cols: 2 !important; }
            }
            @media (min-width: 1024px) {
              .dha-screenshot-strip { --cols: 3 !important; }
            }
          `}</style>
        </motion.div>

        {/* Navigation */}
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
                className="relative max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl w-full"
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

/* ── Full-Page Gallery — auto-scrolling long screenshots ──── */
function FullPageGallery({ longScreenshots }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState(null);
  const total = longScreenshots.length;

  const lbIndex = lightbox
    ? longScreenshots.findIndex((s) => s.src === lightbox.src)
    : -1;

  const lbPrev = useCallback(() => {
    if (lbIndex < 0) return;
    setLightbox(longScreenshots[(lbIndex - 1 + total) % total]);
  }, [lbIndex, longScreenshots, total]);

  const lbNext = useCallback(() => {
    if (lbIndex < 0) return;
    setLightbox(longScreenshots[(lbIndex + 1) % total]);
  }, [lbIndex, longScreenshots, total]);

  return (
    <>
      <section
        id="full-pages"
        ref={ref}
        className="relative py-16 sm:py-24 overflow-hidden"
      >
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-14 px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-light mb-3"
          >
            Full Page Views
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-neutral-100 leading-tight"
          >
            সম্পূর্ণ পেজ প্রিভিউ
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-3 text-neutral-500 text-sm max-w-md mx-auto"
          >
            Hover over each card to scroll through the full page — click to
            expand.
          </motion.p>
        </div>

        {/* Scrollable horizontal row of tall cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-7xl mx-auto px-6 sm:px-10"
        >
          <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
            {longScreenshots.map((ss, i) => (
              <motion.div
                key={ss.src}
                variants={fadeUp}
                custom={i}
                className="group relative flex-shrink-0 w-[260px] sm:w-[300px] lg:w-[340px] h-[420px] sm:h-[480px] rounded-2xl overflow-hidden border border-neutral-700/30 bg-neutral-900/50 cursor-pointer snap-center transition-all hover:border-primary/30 hover:shadow-[0_0_40px_rgba(15,118,110,0.1)]"
                onClick={() => setLightbox(ss)}
              >
                {/* Browser frame header */}
                <div className="absolute top-0 left-0 right-0 z-20 flex items-center gap-1.5 px-3 py-2 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-700/40">
                  <span className="h-2 w-2 rounded-full bg-red-500/60" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
                  <span className="h-2 w-2 rounded-full bg-green-500/60" />
                  <span className="ml-2 text-[10px] text-neutral-500 font-mono truncate">
                    {ss.label}
                  </span>
                </div>

                {/* Long screenshot — scrolls on hover */}
                <div className="absolute inset-0 pt-7 overflow-hidden">
                  <img
                    src={ss.src}
                    alt={ss.label}
                    className="w-full h-auto object-cover object-top transition-transform duration-[3000ms] ease-in-out group-hover:translate-y-[calc(-100%+480px)]"
                    loading="lazy"
                    style={{ minHeight: "100%" }}
                  />
                </div>

                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-neutral-900/90 to-transparent z-10 pointer-events-none" />

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-3 text-center">
                  <p className="text-xs font-medium text-neutral-300 uppercase tracking-wider">
                    {ss.label}
                  </p>
                </div>

                {/* Hover expand hint */}
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="bg-neutral-900/80 backdrop-blur-md text-neutral-200 text-xs font-semibold px-4 py-2 rounded-full border border-neutral-600/50">
                    Click to expand
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Full-Page Lightbox (scrollable) ────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <>
            <motion.div
              key="fp-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-neutral-black/90 backdrop-blur-md"
              onClick={() => setLightbox(null)}
            />
            <motion.div
              key="fp-content"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-[100] flex flex-col items-center py-4 sm:py-8 overflow-y-auto"
              onClick={() => setLightbox(null)}
            >
              {/* Navigation buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  lbPrev();
                }}
                className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[110] flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-neutral-600/50 bg-neutral-900/70 text-neutral-300 hover:text-neutral-white hover:border-neutral-400 backdrop-blur-sm transition-all cursor-pointer"
                aria-label="Previous"
              >
                <HiChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  lbNext();
                }}
                className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[110] flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-neutral-600/50 bg-neutral-900/70 text-neutral-300 hover:text-neutral-white hover:border-neutral-400 backdrop-blur-sm transition-all cursor-pointer"
                aria-label="Next"
              >
                <HiChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={() => setLightbox(null)}
                className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[110] flex h-10 w-10 items-center justify-center rounded-full border border-neutral-600/50 bg-neutral-900/70 text-neutral-400 hover:text-neutral-white hover:border-neutral-400 backdrop-blur-sm transition-all cursor-pointer"
                aria-label="Close"
              >
                <span className="text-xl leading-none">&times;</span>
              </button>

              {/* Scrollable long image */}
              <div
                className="relative w-full max-w-3xl px-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Browser frame */}
                <div className="rounded-t-xl bg-neutral-800 border border-neutral-700/50 border-b-0 px-4 py-2.5 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                  <span className="ml-3 text-xs text-neutral-400 font-mono">
                    {lightbox.label}
                    <span className="ml-3 text-neutral-600">
                      {lbIndex + 1} / {total}
                    </span>
                  </span>
                </div>
                <img
                  src={lightbox.src}
                  alt={lightbox.label}
                  className="w-full h-auto rounded-b-xl border border-t-0 border-neutral-700/50 shadow-[0_0_80px_rgba(0,0,0,0.5)]"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Showcase Navbar (for DHA page) ───────────────────────── */
const showcaseNavLinks = [
  { label: "Features", href: "#features" },
  { label: "Screenshots", href: "#screenshots" },
  { label: "Full Pages", href: "#full-pages" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Visit Site", href: "https://www.dhakhl.com", external: true },
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

function ShowcaseNavbar({ appName, liveUrl }) {
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
          {/* Left: Back + name */}
          <div className="flex items-center gap-3">
            <Link
              href="/#projects"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-700/30 bg-neutral-800/40 text-neutral-400 hover:text-primary-light hover:border-primary/30 transition-all"
            >
              <HiArrowLeft className="h-4 w-4" />
            </Link>
            <span className="text-sm font-bold text-neutral-200 tracking-tight hidden sm:block transition-all duration-300">
              {appName}
            </span>
          </div>

          {/* Center: Nav Links (desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {showcaseNavLinks.map(({ label, href, external }) =>
              external ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 group ${
                    scrolled
                      ? "text-neutral-300 hover:text-primary-light"
                      : "text-text-inverse/80 hover:text-text-inverse"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {label}
                    <HiExternalLink className="h-3 w-3 opacity-50" />
                  </span>
                  <span className="absolute bottom-0.5 left-4 right-4 h-0.5 bg-primary-light scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </a>
              ) : (
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
              ),
            )}
          </nav>

          {/* Right: CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-primary/90 px-4 py-2 text-xs font-semibold text-neutral-100 hover:bg-primary hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all duration-300"
            >
              <FaGlobe className="h-3.5 w-3.5" />
              Live Site
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

      {/* Full-screen mobile overlay */}
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
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3">
                <Link
                  href="/#projects"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary-light/20 text-neutral-400 hover:text-primary-light transition-colors"
                >
                  <HiArrowLeft className="h-4 w-4" />
                </Link>
                <span className="text-base font-bold text-neutral-100">
                  {appName}
                </span>
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

            <motion.nav
              className="flex flex-1 flex-col items-center justify-center gap-2"
              variants={mobileMenuStagger}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {showcaseNavLinks.map(({ label, href, external }, index) => (
                <motion.div key={label} variants={mobileLinkVariants}>
                  {index > 0 && (
                    <div className="mx-auto mb-2 h-px w-16 bg-primary-light/20" />
                  )}
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      className="block px-6 py-3 text-center text-4xl md:text-5xl font-bold text-text-inverse hover:text-primary-light transition-colors"
                    >
                      {label}
                    </a>
                  ) : (
                    <a
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-6 py-3 text-center text-4xl md:text-5xl font-bold text-text-inverse hover:text-primary-light transition-colors"
                    >
                      {label}
                    </a>
                  )}
                </motion.div>
              ))}

              <motion.div variants={mobileLinkVariants} className="mt-8">
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-light px-8 py-3 text-base font-semibold text-text-inverse shadow-[0_0_25px_rgba(45,212,191,0.25)] transition-all hover:scale-105"
                >
                  <FaGlobe className="h-4 w-4" />
                  Visit Live Site
                </a>
              </motion.div>
            </motion.nav>

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

/* ── Custom Footer ────────────────────────────────────────── */
function ShowcaseFooter({ appName, liveUrl }) {
  return (
    <footer className="relative border-t border-neutral-800/40 bg-neutral-950/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold text-neutral-100">{appName}</h3>
            <p className="mt-2 text-sm text-neutral-500 leading-relaxed max-w-xs">
              A complete academic management website for Islamic educational
              institutions — built by Effy Tech.
            </p>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 rounded-lg bg-primary/15 border border-primary/20 px-4 py-2 text-xs font-semibold text-primary-light hover:bg-primary/25 transition-colors"
            >
              <FaGlobe className="h-3.5 w-3.5" />
              Visit Live Site
            </a>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2.5">
              {showcaseNavLinks
                .filter((l) => !l.external)
                .map(({ label, href }) => (
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

          {/* Col 4 — Project Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">
              Project Info
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-neutral-400">
              <li className="flex items-center gap-2">
                <HiCheckCircle className="h-4 w-4 text-primary-light/60 flex-shrink-0" />
                Custom Built — No WordPress
              </li>
              <li className="flex items-center gap-2">
                <HiCheckCircle className="h-4 w-4 text-primary-light/60 flex-shrink-0" />
                Full Admin Dashboard
              </li>
              <li className="flex items-center gap-2">
                <HiCheckCircle className="h-4 w-4 text-primary-light/60 flex-shrink-0" />
                SEO Optimized
              </li>
              <li className="flex items-center gap-2">
                <HiCheckCircle className="h-4 w-4 text-primary-light/60 flex-shrink-0" />
                Mobile Responsive
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

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
export default function DHAShowcase({ data }) {
  const {
    name,
    nameBn,
    tagline,
    taglineEn,
    description,
    descriptionBn,
    liveUrl,
    category,
    techStack,
    features,
    screenshots,
    longScreenshots,
    highlights,
    client,
  } = data;

  /* Scroll to top on mount */
  useEffect(() => {
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-surface-dark text-text-inverse overflow-x-hidden">
      {/* Custom Navbar */}
      <ShowcaseNavbar appName={name} liveUrl={liveUrl} />

      {/* ─────────────────────────────────────────────────────
          SECTION 1 — HERO (Full viewport)
         ───────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 h-[700px] w-[700px] rounded-full bg-primary/8 blur-[160px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-accent/6 blur-[140px]" />
          <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/4 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(45,212,191,0.4) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/[0.04] to-transparent" />
          <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/[0.03] to-transparent" />
        </div>

        {/* Main hero content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-10 items-center">
              {/* Left — Text */}
              <motion.div initial="hidden" animate="visible" variants={stagger}>
                {/* Category badge */}
                <motion.div variants={fadeUp}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-light backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-light animate-pulse" />
                    {category} Project
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  variants={fadeUp}
                  className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]"
                >
                  <span className="bg-gradient-to-b from-neutral-50 to-neutral-300 bg-clip-text text-transparent">
                    {name}
                  </span>
                </motion.h1>

                {/* Bangla tagline */}
                <motion.p
                  variants={fadeUp}
                  className="mt-5 text-xl sm:text-2xl text-primary-light/90 font-medium"
                >
                  {tagline}
                </motion.p>

                {/* English subtitle */}
                <motion.p
                  variants={fadeUp}
                  className="mt-2 text-neutral-500 text-lg"
                >
                  {taglineEn}
                </motion.p>

                {/* Description */}
                <motion.p
                  variants={fadeUp}
                  className="mt-7 text-neutral-400 leading-relaxed max-w-lg text-[15px]"
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
                  className="mt-9 flex flex-wrap gap-4"
                >
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-xl bg-primary px-7 py-4 text-sm font-semibold text-neutral-100 transition-all hover:bg-primary-dark hover:shadow-[0_0_40px_rgba(15,118,110,0.35)] active:scale-[0.98]"
                  >
                    <FaGlobe className="h-5 w-5" />
                    <span>
                      <span className="block text-[10px] font-normal opacity-80 leading-none">
                        VISIT
                      </span>
                      <span className="block leading-tight">Live Website</span>
                    </span>
                  </a>
                  <a
                    href="#screenshots"
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-600 px-7 py-4 text-sm font-medium text-neutral-300 transition-all hover:bg-neutral-800 hover:text-neutral-100 hover:border-neutral-500"
                  >
                    View Screenshots
                  </a>
                </motion.div>

                {/* Client badge */}
                {client && (
                  <motion.div
                    variants={fadeUp}
                    className="mt-8 flex items-center gap-3"
                  >
                    <div className="h-px flex-1 max-w-[40px] bg-neutral-700/50" />
                    <p className="text-xs text-neutral-600">
                      Built for{" "}
                      <span className="text-neutral-400 font-medium">
                        {client.name}
                      </span>{" "}
                      · {client.location}
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Right — Browser mockup with hero screenshot */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.35,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-2xl">
                  {/* Ambient glow */}
                  <div className="absolute -inset-10 rounded-3xl bg-gradient-to-b from-primary/10 via-primary/4 to-transparent blur-[60px] pointer-events-none" />

                  <BrowserMockup
                    src="/images/dha/img1.png"
                    alt="Darul Hikmah Academy Homepage"
                  />

                  {/* Side glow accents */}
                  <div className="absolute top-1/4 -left-6 h-32 w-1 bg-gradient-to-b from-transparent via-primary/20 to-transparent blur-sm pointer-events-none" />
                  <div className="absolute bottom-1/4 -right-6 h-32 w-1 bg-gradient-to-b from-transparent via-accent/15 to-transparent blur-sm pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="relative z-10 pb-8 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-neutral-600"
          >
            <span className="text-[10px] uppercase tracking-[0.25em]">
              Scroll
            </span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-neutral-600 to-transparent" />
          </motion.div>
        </motion.div>

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
          SECTION 3 — FEATURES (WOW Edition — same as Amal)
         ───────────────────────────────────────────────────── */}
      <Section
        id="features"
        className="relative py-24 sm:py-32 overflow-hidden"
      >
        {/* Atmospheric background */}
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
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/[0.06] to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
          {/* Section heading */}
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
                এই ওয়েবসাইটে যা যা আছে
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-neutral-500 leading-relaxed text-lg max-w-xl mx-auto"
            >
              A complete academic management platform — no WordPress, no
              limitations, full control.
            </motion.p>
          </div>

          {/* Bento Feature Grid */}
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

                  {/* Shimmer sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-in-out bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none" />

                  {/* Card content */}
                  <div
                    className={`relative z-10 ${
                      isHero
                        ? "flex flex-col sm:flex-row sm:items-center gap-6 p-8 sm:p-10"
                        : "flex flex-col p-6 sm:p-7"
                    }`}
                  >
                    {/* Icon */}
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

                    {/* Text */}
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

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/25 transition-all duration-700 pointer-events-none" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────
          SECTION 4 — SCREENSHOTS (Full-width carousel)
         ───────────────────────────────────────────────────── */}
      <ScreenshotCarousel screenshots={screenshots} />

      {/* ─────────────────────────────────────────────────────
          SECTION 4.5 — FULL PAGE VIEWS (long screenshots)
         ───────────────────────────────────────────────────── */}
      {longScreenshots?.length > 0 && (
        <FullPageGallery longScreenshots={longScreenshots} />
      )}

      {/* ─────────────────────────────────────────────────────
          SECTION 5 — TECH STACK
         ───────────────────────────────────────────────────── */}
      <Section id="tech-stack" className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.015] to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
          <SectionHeading
            overline="Tech Stack"
            title="যে প্রযুক্তিতে তৈরি"
            subtitle="Modern, scalable technologies — no WordPress dependency."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                name: "Next.js",
                desc: "React-based framework for blazing-fast SSR & SSG performance with built-in SEO optimization.",
                color: "from-neutral-400/20 to-neutral-600/5",
              },
              {
                name: "Tailwind CSS",
                desc: "Utility-first CSS framework for pixel-perfect responsive design without bloated stylesheets.",
                color: "from-sky-500/20 to-sky-600/5",
              },
              {
                name: "Cloudinary",
                desc: "Cloud-based media management — auto-optimized images, PDF-to-image transformation, CDN delivery.",
                color: "from-blue-500/20 to-blue-600/5",
              },
              {
                name: "MongoDB",
                desc: "Flexible NoSQL database for dynamic content — assignments, results, news, events — all real-time.",
                color: "from-emerald-500/20 to-emerald-600/5",
              },
            ].map((tech, i) => (
              <motion.div
                key={tech.name}
                variants={fadeUp}
                custom={i}
                className="relative text-center group"
              >
                {/* Card */}
                <div className="rounded-2xl border border-neutral-700/30 bg-neutral-900/50 p-6 sm:p-8 backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-neutral-900/70">
                  {/* Name */}
                  <div
                    className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tech.color} border border-neutral-700/20 group-hover:border-primary/20 transition-colors`}
                  >
                    <span className="text-lg font-bold text-neutral-200">
                      {tech.name[0]}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-100">
                    {tech.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                    {tech.desc}
                  </p>
                </div>
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
            <div className="mt-6 flex flex-wrap justify-center gap-2">
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
          SECTION 7 — CTA (Want a website like this?)
         ───────────────────────────────────────────────────── */}
      <Section id="cta" className="relative py-20 sm:py-28">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[300px] w-[600px] rounded-full bg-primary/6 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <motion.div variants={fadeUp}>
            <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary-light mb-5">
              Interested?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-100 leading-tight">
              আপনার প্রতিষ্ঠানের জন্যও
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary">
                এমন ওয়েবসাইট চান?
              </span>
            </h2>
            <p className="mt-4 text-lg text-neutral-400 max-w-lg mx-auto">
              Want a custom-built website like this for your institution or
              business? Let&apos;s build it together.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-neutral-100 transition-all hover:bg-primary-dark hover:shadow-[0_0_40px_rgba(15,118,110,0.3)] active:scale-[0.98]"
            >
              <span>যোগাযোগ করুন</span>
            </Link>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-600 px-8 py-4 text-base font-medium text-neutral-300 transition-all hover:bg-neutral-800 hover:text-neutral-100"
            >
              <FaGlobe className="h-5 w-5" />
              Visit Live Site
            </a>
          </motion.div>

          {/* Checkmarks */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-neutral-500"
          >
            {[
              "No WordPress",
              "Full Admin Control",
              "SEO Optimized",
              "Mobile Responsive",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <HiCheckCircle className="h-4 w-4 text-primary-light" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Footer */}
      <ShowcaseFooter appName={name} liveUrl={liveUrl} />
    </div>
  );
}
