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
import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { trackCTAClick } from "@/lib/analytics";
import IAMAppTour from "@/components/showcase/iam/IAMAppTour";
import {
  HiArrowLeft,
  HiExternalLink,
  HiCheckCircle,
  HiChevronLeft,
  HiChevronRight,
  HiChevronDown,
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
      <div className="relative rounded-[2.5rem] border-[6px] border-neutral-700/60 bg-neutral-900 p-1.5 shadow-[0_0_60px_rgba(185,154,90,0.10)]">
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

/* ── Feature Deep Dive — Premium product module explorer ───── */
function FeatureDeepDive({ categories, screenshots }) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const activeIndex = Math.max(0, categories.findIndex((category) => category.id === activeId));
  const active = categories[activeIndex] ?? categories[0];
  const ActiveIcon = active ? iconMap[active.icon] || FaLayerGroup : FaLayerGroup;
  const visual = active.imageSrc
    ? { src: active.imageSrc, label: active.imageLabel }
    : screenshots[activeIndex % screenshots.length];
  const featuredTabs = categories.slice(0, 8);

  return (
    <section ref={ref} id="deep-dive" className="iam-deep-dive relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-36 top-16 h-[520px] w-[520px] rounded-full bg-primary/[0.05] blur-[140px]" />
        <div className="absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-accent/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55 }} className="mb-12 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#727867]">Interactive product tour</p>
            <h2 className="text-4xl font-black leading-[1.02] text-[var(--iam-ink)] sm:text-6xl">একটি feature বেছে নিন।<br />কাজটি দেখুন।</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-[#5f665d] sm:text-lg">প্রতিটি গুরুত্বপূর্ণ module কীভাবে দৈনিক tracking সহজ করে—পরিষ্কার ব্যাখ্যা, বাস্তব interface এবং focused workflow-সহ দেখুন।</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.5fr_1.5fr]">
          <motion.div initial={{ opacity: 0, x: -18 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.06 }} className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {featuredTabs.map((category, index) => {
              const Icon = iconMap[category.icon] || FaLayerGroup;
              const selected = category.id === active?.id;
              return (
                <button key={category.id} type="button" onClick={() => setActiveId(category.id)} className={`group min-w-[225px] rounded-[1.25rem] border px-4 py-3.5 text-left transition-all duration-300 lg:min-w-0 ${selected ? "border-[#727867]/35 bg-[var(--iam-ink)] text-[#fbf8ef] shadow-[0_18px_42px_rgba(23,32,25,0.16)]" : "border-black/[0.08] bg-white/70 text-[var(--iam-ink)] hover:-translate-y-0.5 hover:bg-white"}`}>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${selected ? "border-[#b69b5f]/20 bg-[#727867]/20 text-[#d2bd86]" : "border-black/[0.06] bg-[#efede3] text-[#727867]"}`}><Icon className="h-4 w-4" /></span>
                    <div className="min-w-0"><span className="block truncate text-sm font-black">{category.titleBn}</span><span className={`mt-1 block truncate text-[9px] font-bold uppercase tracking-[0.15em] ${selected ? "text-[#d2bd86]" : "text-[#676e64]"}`}>{category.titleEn}</span></div>
                    <span className={`ml-auto text-[10px] font-mono ${selected ? "text-white/45" : "text-black/30"}`}>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                </button>
              );
            })}
          </motion.div>

          <motion.div key={active?.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="relative overflow-hidden rounded-[2.2rem] border border-black/[0.07] bg-[#f6f3e9] shadow-[0_32px_90px_rgba(23,32,25,0.14)]">
            <div className="grid min-h-[610px] lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative overflow-hidden bg-[var(--iam-ink)] p-7 text-[#fbf8ef] sm:p-10">
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#727867]/20 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-64 w-64 opacity-[0.08] [background:linear-gradient(135deg,transparent_36%,white_37%,white_40%,transparent_41%)]" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-8 flex items-start gap-4 border-b border-white/12 pb-8">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#b69b5f]/20 bg-[#727867]/20 text-[#d2bd86]"><ActiveIcon className="h-6 w-6" /></div>
                    <div><h3 className="text-2xl font-black leading-tight text-[#fffdf7] sm:text-3xl">{active?.titleBn}</h3><p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#cdbb82]">{active?.titleEn}</p></div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {active?.points.map((point, index) => (
                      <motion.div key={point} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#727867]/35 text-[10px] font-black text-[#dfcf9b]">{index + 1}</span>
                        <p className="text-sm font-medium leading-6 text-[#f3f1e7]">{point}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-auto pt-8"><span className="inline-flex rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.17em] text-white/65">Real app workflow</span></div>
                </div>
              </div>

              <div className="relative flex items-center justify-center overflow-hidden bg-[linear-gradient(145deg,#ece7da,#f4f1e7)] p-8 sm:p-10">
                <div className="absolute inset-x-8 top-7 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.18em] text-[#676e64]"><span>Live interface</span><span>{String(activeIndex + 1).padStart(2, "0")}</span></div>
                <div className="absolute h-[410px] w-[260px] rotate-6 rounded-[2.7rem] border border-[#727867]/10 bg-[#727867]/5" />
                <div className="relative mt-8 w-[245px] max-w-full rounded-[2.5rem] border-[7px] border-[#252d25] bg-[#252d25] p-1.5 shadow-[0_35px_80px_rgba(23,32,25,0.28)]">
                  <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#252d25]" />
                  <img src={visual?.src} alt={visual?.label || active?.titleEn} className="block w-full rounded-[1.85rem] bg-white" loading="lazy" />
                </div>
                <div className="absolute bottom-6 left-7 right-7 rounded-2xl border border-black/[0.07] bg-white/88 px-4 py-3 text-center text-xs font-bold text-[#545b50] shadow-sm backdrop-blur">{visual?.label}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── App Interface — cinematic multi-screen rail ─────────── */
function ScreenshotCarousel({ screenshots }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const total = screenshots.length;
  const goNext = useCallback(() => setCurrent((prev) => (prev + 1) % total), [total]);
  const goPrev = useCallback(() => setCurrent((prev) => (prev - 1 + total) % total), [total]);

  useEffect(() => {
    if (!inView) return;
    const timer = window.setInterval(goNext, 6200);
    return () => window.clearInterval(timer);
  }, [goNext, inView]);

  const visible = [-1, 0, 1, 2].map((offset) => ({
    offset,
    index: (current + offset + total) % total,
    shot: screenshots[(current + offset + total) % total],
  }));

  return (
    <>
      <section id="screenshots" ref={ref} className="iam-screenshots relative overflow-hidden py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[640px] w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#727867]/[0.08] blur-[160px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
            <div><p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#b69b5f]">App interface</p><h2 className="mt-3 text-4xl font-black leading-[1.02] text-[#fffdf7] sm:text-6xl">শান্ত, পরিষ্কার এবং<br />দৈনিক ব্যবহারের জন্য তৈরি।</h2></div>
            <p className="max-w-xl text-base leading-8 text-[#c7c9bf]">Dashboard থেকে prayer, amal, dhikr, routine ও insights—প্রতিটি screen একই visual system-এ তৈরি, যাতে প্রয়োজনীয় কাজ দ্রুত বোঝা ও সম্পন্ন করা যায়।</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.62 }} className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-[#22271f] px-4 py-8 shadow-[0_38px_100px_rgba(0,0,0,0.34)] sm:px-8 sm:py-12">
            <div className="absolute inset-0 opacity-35 [background:radial-gradient(circle_at_50%_35%,rgba(104,112,95,0.24),transparent_42%)]" />
            <div className="relative grid min-h-[610px] grid-cols-1 items-center gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {visible.map(({ offset, index, shot }) => {
                const active = offset === 0;
                return (
                  <button key={`${shot.src}-${offset}`} type="button" onClick={() => active ? setLightbox(shot) : setCurrent(index)} className={`group relative mx-auto w-full max-w-[280px] transition-all duration-500 ${active ? "z-10 lg:-translate-y-5 lg:scale-[1.06]" : "opacity-65 hover:opacity-100"}`}>
                    <div className={`relative overflow-hidden rounded-[2.4rem] border-[6px] bg-[#252d25] p-1.5 transition-all duration-500 ${active ? "border-[#2f3932] shadow-[0_35px_90px_rgba(0,0,0,0.5)]" : "border-[#343b31] shadow-[0_20px_50px_rgba(0,0,0,0.28)]"}`}>
                      <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#252d25]" />
                      <img src={shot.src} alt={shot.label} className="block w-full rounded-[1.85rem] bg-white object-contain" loading="lazy" />
                      {!active && <div className="absolute inset-0 rounded-[1.85rem] bg-[#1a201b]/20 transition group-hover:bg-transparent" />}
                    </div>
                    <div className={`mx-auto mt-4 max-w-[240px] rounded-2xl border px-4 py-3 text-left transition ${active ? "border-[#b69b5f]/20 bg-[#727867]/18" : "border-white/8 bg-white/[0.035]"}`}>
                      <p className={`text-sm font-black ${active ? "text-[#fffdf7]" : "text-[#c7c9bf]"}`}>{shot.label}</p>
                      <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#d2bd86]">{active ? "Selected screen" : "View screen"}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <button onClick={goPrev} aria-label="Previous screenshot" className="absolute left-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-[#2c332b]/90 text-white shadow-lg backdrop-blur transition hover:bg-[#727867]"><HiChevronLeft className="h-6 w-6" /></button>
            <button onClick={goNext} aria-label="Next screenshot" className="absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-[#2c332b]/90 text-white shadow-lg backdrop-blur transition hover:bg-[#727867]"><HiChevronRight className="h-6 w-6" /></button>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {screenshots.map((shot, index) => <button key={shot.src} onClick={() => setCurrent(index)} aria-label={`Show screenshot ${index + 1}`} className={`h-1.5 rounded-full transition-all ${index === current ? "w-9 bg-[#b69b5f]" : "w-2 bg-white/20 hover:bg-white/40"}`} />)}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-xl" onClick={() => setLightbox(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative flex max-h-[92vh] max-w-[94vw] flex-col items-center" onClick={(event) => event.stopPropagation()}>
              <img src={lightbox.src} alt={lightbox.label} className="max-h-[84vh] rounded-[2rem] object-contain shadow-2xl" />
              <p className="mt-4 rounded-full border border-white/12 bg-white/8 px-5 py-2 text-sm font-bold text-white">{lightbox.label}</p>
            </motion.div>
            <button onClick={() => setLightbox(null)} className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xl text-white">×</button>
          </motion.div>
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
        className={`project-showcase-navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
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
              className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-primary px-3 text-[11px] font-bold text-white shadow-[0_8px_24px_rgba(55,66,55,0.30)] transition-all duration-300 hover:bg-primary-dark hover:shadow-[0_0_24px_rgba(185,154,90,0.22)] active:scale-[0.98] sm:h-10 sm:gap-2 sm:px-4 sm:text-xs"
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
            className="project-showcase-mobile-menu fixed inset-0 z-40 flex flex-col bg-surface-dark md:hidden"
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
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-light px-8 py-3 text-base font-semibold text-text-inverse shadow-[0_0_25px_rgba(185,154,90,0.22)] transition-all hover:scale-105"
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

export default function AmalTrackerShowcase({ data }) {
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
    <div className="effy-project-page effy-project-page--iam min-h-screen overflow-x-hidden">
      {/* Custom Navbar for this page */}
      <ShowcaseNavbar
        appName={name}
        logoImage={logoImage}
        playStoreUrl={playStoreUrl}
      />

      {/* ─────────────────────────────────────────────────────
          SECTION 1 — MOBILE-FIRST CONVERSION HERO
         ───────────────────────────────────────────────────── */}
      <section ref={heroRef} className="project-showcase-hero project-showcase-hero--iam relative overflow-hidden pt-16 md:pt-[72px]">
        {/* Quiet Effy geometry — restrained, no glow haze */}
        <div className="iam-hero-geometry absolute inset-0 pointer-events-none" aria-hidden="true">
          <span className="iam-hero-shape iam-hero-shape--one" />
          <span className="iam-hero-shape iam-hero-shape--two" />
          <span className="iam-hero-shape iam-hero-shape--three" />
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
                className="h-20 w-20 rounded-[1.4rem] border border-primary/20 bg-neutral-900 object-cover shadow-[0_12px_30px_rgba(34,39,31,0.16)]"
                loading="eager"
              />

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.26em] text-primary-light/80">
                Your Daily Worship Companion
              </p>

              <h1 className="project-hero-title mt-3 text-[38px] font-black leading-[1.04] tracking-[-0.045em]">
                Islamic Amal Tracker
              </h1>

              <p className="project-hero-copy mx-auto mt-5 max-w-[360px] text-[15px] font-medium leading-7">
                নামাজ, কাযা, যিকির, দৈনিক আমল ও ইসলামিক রুটিন—সবকিছু গুছিয়ে রাখুন এক অ্যাপে।
              </p>

              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("Download - Hero", "IAM")}
                className="mt-7 inline-flex min-h-16 w-full items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-4 text-[15px] font-bold text-white shadow-[0_18px_48px_rgba(55,66,55,0.34)] transition active:scale-[0.985]"
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
                    className="h-20 w-20 rounded-2xl border border-primary/20 bg-neutral-900 object-cover shadow-[0_12px_28px_rgba(34,39,31,0.14)]"
                    loading="eager"
                  />
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-light">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-light animate-pulse" />
                    {category} App{versionLabel ? ` • ${versionLabel}` : ""}
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="project-hero-title mt-7 text-6xl font-bold leading-[1.04]"
                >
                  <span className="project-hero-gradient">
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
                  className="project-hero-copy mt-4 max-w-lg text-base leading-relaxed"
                >
                  {description}
                </motion.p>

                <motion.div variants={fadeUp} className="iam-hero-proof mt-6 grid grid-cols-3 gap-2 max-w-lg">
                  <span>Offline-first</span>
                  <span>বাংলা + English</span>
                  <span>Free on Android</span>
                </motion.div>

                <motion.a
                  variants={fadeUp}
                  href={playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTAClick("Download - Hero", "IAM")}
                  className="mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(55,66,55,0.30)] transition hover:bg-primary-dark hover:shadow-[0_0_42px_rgba(55,66,55,0.34)] active:scale-[0.985]"
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
          SECTION 2 — PRODUCT PROMISES
         ───────────────────────────────────────────────────── */}
      <Section className="iam-highlights relative mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: FaMosque, title: "Track the essentials", copy: "নামাজ, কাযা, যিকির, আমল ও Reading—এক জায়গায়।" },
            { icon: FaShieldAlt, title: "Works offline", copy: "ইন্টারনেট ছাড়াই মূল tracking ব্যবহার করুন।" },
            { icon: FaBell, title: "Stay consistent", copy: "Routine, reminders ও Strong Alarm দিয়ে ধারাবাহিক থাকুন।" },
            { icon: FaChartLine, title: "Understand progress", copy: "Insights, calendar ও reflection থেকে নিজের gap বুঝুন।" },
          ].map((item, index) => (
            <motion.div key={item.title} variants={fadeUp} custom={index} className="group rounded-[1.5rem] border border-black/[0.07] bg-white/62 p-6 shadow-[0_18px_50px_rgba(23,32,25,0.06)] backdrop-blur transition hover:-translate-y-1 hover:bg-white">
              <div className="mb-8 flex items-center justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--iam-ink)] text-primary-light"><item.icon className="h-5 w-5" /></span><span className="text-[10px] font-mono text-black/25">0{index + 1}</span></div>
              <h3 className="text-xl font-black text-[var(--iam-ink)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--iam-copy)]">{item.copy}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────
          SECTION 3 — FEATURES  (WOW Edition)
         ───────────────────────────────────────────────────── */}
      <Section
        id="features"
        className="iam-features relative py-24 sm:py-32 overflow-hidden"
      >
        {/* ── Atmospheric background layers ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 h-[600px] w-[800px] rounded-full bg-primary/[0.04] blur-[160px]" />
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-accent/[0.03] blur-[130px]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(185,154,90,0.4) 1px, transparent 1px)",
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
                        className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/[0.03] border border-primary/10 group-hover:border-primary/25 group-hover:shadow-[0_0_30px_rgba(185,154,90,0.10)] transition-all duration-500 ${
                          isHero ? "h-16 w-16" : "h-12 w-12"
                        }`}
                      >
                        <Icon
                          className={`text-primary-light transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(185,154,90,0.45)] ${
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
      <FeatureDeepDive categories={deepDiveCategories} screenshots={screenshots} />

      {/* ─────────────────────────────────────────────────────
          SECTION 4 — SCREENSHOTS (Full-width carousel)
         ───────────────────────────────────────────────────── */}
      <ScreenshotCarousel screenshots={screenshots} />

      {/* ─────────────────────────────────────────────────────
          SECTION 5 — HOW IT WORKS
         ───────────────────────────────────────────────────── */}
      <Section id="how-it-works" className="iam-how-it-works relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-primary/[0.04] blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
          <div className="mb-12 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
            <div>
              <motion.p variants={fadeUp} className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-primary-light/75">
                How It Works
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-black leading-[1.03] text-[var(--iam-ink)] sm:text-5xl">
                শুরু করা সহজ।<br />ধারাবাহিক থাকা আরও সহজ।
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} className="max-w-2xl text-base leading-7 text-[var(--iam-copy)] sm:text-lg">
              কোনো জটিল setup নেই। App install করুন, নিজের tracking সাজান, আর প্রতিদিনের অগ্রগতি এক নজরে দেখুন।
            </motion.p>
          </div>

          <div className="iam-steps relative grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-[8%] right-[8%] top-10 hidden h-px bg-black/10 lg:block" />
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                custom={i}
                className="group relative rounded-[1.5rem] border border-black/[0.07] bg-white/55 p-5 shadow-[0_18px_50px_rgba(23,32,25,0.05)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 sm:p-6"
              >
                <div className="relative z-10 mb-8 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-primary/[0.08] text-lg font-black text-primary-dark">
                    {step.step}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/30">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-xl font-black text-[var(--iam-ink)]">{step.titleBn}</h3>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary-dark/60">{step.titleEn}</p>
                <p className="mt-4 text-sm leading-6 text-[var(--iam-copy)]">{step.descBn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────
          SECTION 6 — PRODUCT PRINCIPLES
         ───────────────────────────────────────────────────── */}
      <Section className="iam-testimonial relative overflow-hidden py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <motion.div variants={fadeUp} className="relative overflow-hidden rounded-[2.2rem] bg-[var(--iam-ink)] px-7 py-10 text-[#fbf8ef] shadow-[0_32px_90px_rgba(23,32,25,0.18)] sm:px-12 sm:py-14">
            <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div><p className="text-[11px] font-bold uppercase tracking-[0.26em] text-primary-light/70">Built for real daily use</p><h2 className="mt-4 text-4xl font-black leading-[1.04] sm:text-5xl">আপনার ইবাদতের হিসাব।<br />আপনার নিয়ন্ত্রণে।</h2><p className="mt-5 max-w-xl text-base leading-8 text-[#cbd3cb]">শুধু checklist নয়—এটি এমন একটি personal system, যা আপনাকে নিয়মিত থাকতে, নিজের gap বুঝতে এবং ধীরে ধীরে উন্নতি করতে সাহায্য করে।</p></div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["01", "Private by design", "ব্যক্তিগত tracking data আপনার নিয়ন্ত্রণে থাকে।"],
                  ["02", "Flexible, not rigid", "নিজের প্রয়োজন অনুযায়ী goals, routines ও reminders সাজান।"],
                  ["03", "Progress over pressure", "ছোট ছোট ধারাবাহিক উন্নতিকে সামনে রাখুন।"],
                ].map(([number, title, copy]) => <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><span className="text-[10px] font-mono text-primary-light/55">{number}</span><h3 className="mt-7 text-base font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-[#abb6ac]">{copy}</p></div>)}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────
          SECTION 7 — DOWNLOAD CTA
         ───────────────────────────────────────────────────── */}
      <Section id="download" className="iam-download relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 pointer-events-none"><div className="absolute left-1/2 top-1/2 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[130px]" /></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
          <motion.div variants={fadeUp} className="grid overflow-hidden rounded-[2.2rem] border border-black/[0.07] bg-white/65 shadow-[0_30px_90px_rgba(23,32,25,0.12)] backdrop-blur lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-7 sm:p-12">
              <div className="flex items-center gap-4"><img src={logoImage} alt={`${name} logo`} className="h-16 w-16 rounded-2xl object-cover shadow-lg" /><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-dark/65">Free Android app</p><p className="mt-1 text-sm font-semibold text-[var(--iam-copy)]">No payment required</p></div></div>
              <h2 className="mt-8 text-4xl font-black leading-[1.04] text-[var(--iam-ink)] sm:text-6xl">আজ থেকেই ধারাবাহিকতা গড়ে তুলুন।</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--iam-copy)] sm:text-lg">Islamic Amal Tracker install করুন এবং নামাজ, আমল, যিকির, Reading ও routine—সবকিছু একটি focused system-এ গুছিয়ে নিন।</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackCTAClick("Download - CTA", "IAM")} className="inline-flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-4 text-base font-bold text-white shadow-[0_18px_45px_rgba(55,66,55,0.30)] transition hover:bg-primary-dark"><FaGooglePlay className="h-6 w-6" /><span className="text-left"><span className="block text-[9px] font-medium uppercase tracking-[0.1em] opacity-75">Get it on</span><span className="block text-lg leading-tight">Google Play</span></span></a>
                <a href="#screenshots" className="inline-flex min-h-16 items-center justify-center rounded-2xl border border-black/10 px-7 py-4 text-sm font-bold text-[var(--iam-ink)] transition hover:bg-white">View App Screens</a>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[var(--iam-copy)]">{["Free to use", "Works offline", "Bangla & English", "Optional cloud sync"].map(item => <span key={item} className="flex items-center gap-1.5"><HiCheckCircle className="h-4 w-4 text-primary" />{item}</span>)}</div>
            </div>
            <div className="relative flex min-h-[360px] items-center justify-center bg-[var(--iam-ink)] p-8 text-center">
              <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(135deg,transparent_35%,white_36%,white_39%,transparent_40%)]" />
              <div className="relative z-10 rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl backdrop-blur"><img src="/images/amal/play-store-qr.png" alt="Scan to download Islamic Amal Tracker from Google Play" className="mx-auto h-44 w-44 rounded-xl bg-white p-2" /><p className="mt-5 text-lg font-black text-white">Scan to install</p><p className="mt-2 max-w-[240px] text-sm leading-6 text-[#aeb8af]">Phone camera দিয়ে QR code scan করে সরাসরি Google Play page খুলুন।</p></div>
            </div>
          </motion.div>
        </div>
      </Section>

    </div>
  );
}

