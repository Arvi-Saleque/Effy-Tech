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

/* ── Deep-dive feature data ───────────────────────────────── */
const deepDiveCategories = [
  {
    id: "salah",
    icon: FaMosque,
    titleBn: "নামাজ ট্রাকিং",
    titleEn: "Salah Tracking",
    color: "from-teal-500/20 to-teal-600/5",
    accent: "teal",
    points: [
      "প্রতিদিনের নামাজ ট্রাক রাখা যাবে।",
      "জামাতে / আউয়াল ওয়াক্তে নাকি দেরী করে সেটা দেখা যাবে।",
      "শেষ ৭ দিন / ৩০ দিনে কয় ওয়াক্ত নামাজ জামাতে পড়ছেন দেখা যাবে।",
      "শেষ ৩০ দিনে কোন কোন নামাজ কাজা হইছে সেগুলা বিস্তারিত দেখা যাবে এবং আপডেট করা যাবে।",
    ],
  },
  {
    id: "amal",
    icon: FaCheckCircle,
    titleBn: "প্রতিদিনের আমল ট্রাকিং",
    titleEn: "Daily Amal Tracking",
    color: "from-emerald-500/20 to-emerald-600/5",
    accent: "emerald",
    points: [
      "প্রতিদিনের আমল সেকশনে বেসিক ১৮ টা আমল আছে — এইগুলা চেঞ্জ বা এডিট করা যাবে না।",
      "ইউজার প্রয়োজন হলে কাস্টম যে কোনো আমল নিজের ইচ্ছা মত যুক্ত করে নিতে পারবে।",
      "একবার যুক্ত করলেই হবে — পরবর্তীতে যুক্ত করা লাগবে না যদি না ডিলেট করে।",
      "আমল পেজের উপর ইনফো আইকন থেকে সকাল-সন্ধ্যার সকল দোয়া পাওয়া যাবে।",
      "দোয়া সেকশনে শায়খ আহমাদুল্লাহ এর সকাল-সন্ধ্যার দোয়া যুক্ত করা হয়েছে।",
    ],
  },
  {
    id: "zikir",
    icon: FaPrayingHands,
    titleBn: "যিকির ট্রাকিং",
    titleEn: "Zikir Tracking",
    color: "from-amber-500/20 to-amber-600/5",
    accent: "amber",
    points: [
      "বেসিক যিকির হিসেবে ৬ তাসবিহ যুক্ত করা আছে।",
      "১০০ বার করে আলহামদুলিল্লাহ, সুবহানাল্লাহ, আল্লাহু আকবার, লা ইলাহা ইল্লাল্লাহ, আসতাগফিরুল্লাহ, দুরূদ শরীফ।",
      "ইউজার প্রয়োজন হলে কাস্টম যে কোনো যিকির নিজের ইচ্ছা মত টার্গেট সেট করে যুক্ত করে নিতে পারবে।",
    ],
  },
  {
    id: "study",
    icon: FaQuran,
    titleBn: "পড়াশোনা ট্রাকিং",
    titleEn: "Study Tracking",
    color: "from-sky-500/20 to-sky-600/5",
    accent: "sky",
    points: [
      "কুরআন, হাদীস ও তাফসীর — এই ৩ টি বিষয় রাখা হয়েছে।",
      "কোন বিষয়ে ইউজার কত সময় রেগুলার পড়তে চায় সেটা নিজের মত করে সেট করে নিতে পারবে।",
    ],
  },
  {
    id: "gunah",
    icon: FaShieldAlt,
    titleBn: "গুনাহ ট্রাকিং",
    titleEn: "Sin & Kaffara Tracking",
    color: "from-rose-500/20 to-rose-600/5",
    accent: "rose",
    points: [
      "গুনাহ ট্রাকিং এ ডিফল্ট ৪ টা গুনাহ আছে — ইউজার ইচ্ছা মত গুনাহ অ্যাড করতে পারবে।",
      "কোন কোন গুনাহের কাফফারা বাকি সেটা দেখতে পারবে।",
      "কাফফারার জন্য ৪ টি বিষয় রাখা হয়েছে — যিকির, দান, কুরআন, নামাজ।",
    ],
  },
  {
    id: "stats",
    icon: FaFire,
    titleBn: "স্ট্যাট",
    titleEn: "Statistics & Progress",
    color: "from-orange-500/20 to-orange-600/5",
    accent: "orange",
    points: [
      "প্রতিদিনের প্রোগ্রেস ন্যুনতম ৬০% হলে স্ট্রিক কাউন্ট হবে।",
      "সাপ্তাহিক চার্টে শেষ ৭ দিনের সামারি দেখা যাবে — মোট আমল, মোট যিকির ইত্যাদি।",
      "মাসিক চার্টে শেষ ৩০ দিনের সামারি দেখা যাবে — মোট আমল, মোট যিকির ইত্যাদি।",
      "মাসিক চার্টের ক্যালেন্ডারে কোনো দিনে ক্লিক করলে বিস্তারিত দেখা যাবে — ঐ দিনের আমল/টার্গেট, কি করা হয়েছে, গুনাহ ও কাফফারা সব।",
    ],
  },
  {
    id: "reminder",
    icon: FaBell,
    titleBn: "রিমাইন্ডার সিস্টেম",
    titleEn: "Smart Reminders",
    color: "from-violet-500/20 to-violet-600/5",
    accent: "violet",
    points: [
      "প্রতি ওয়াক্তে নামাজের রিমাইন্ডার দিবে।",
      "সকাল ও সন্ধ্যার যিকিরে রিমাইন্ডার দিবে।",
      "দৈনিক আমলের রিমাইন্ডার দিবে।",
      "ইউজার চাইলে নিজের মত কাস্টম রিমাইন্ডার অ্যাড করে নিতে পারবে।",
    ],
  },
];

/* ── Feature Deep Dive — Interactive accordion ────────────── */
function FeatureDeepDive() {
  const [openId, setOpenId] = useState("salah");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
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
              বিস্তারিত ফিচার সমূহ
            </span>
          </h2>
          <p className="mt-5 text-neutral-500 leading-relaxed text-lg max-w-xl mx-auto">
            Explore every feature in detail — tap each section to learn more.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          {deepDiveCategories.map((cat, i) => {
            const Icon = cat.icon;
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
                className="flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/4 relative overflow-hidden group cursor-pointer"
                style={{ aspectRatio: "4 / 3" }}
                onClick={() => setLightbox(ss)}
              >
                <img
                  src={ss.src}
                  alt={ss.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-neutral-black/0 group-hover:bg-neutral-black/15 transition-all duration-300" />
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

  /* Scroll to top on client-side navigation */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-surface-dark text-text-inverse overflow-x-hidden">
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
          {/* Horizontal accent lines */}
          <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/[0.04] to-transparent" />
          <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/[0.03] to-transparent" />
        </div>

        {/* Back link pinned top */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-10 pt-8 sm:pt-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-light transition-colors group"
            >
              <HiArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </motion.div>
        </div>

        {/* Main hero content — vertically centered */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-10 items-center">
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
                  className="mt-7 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]"
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
                    href={playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-xl bg-primary px-7 py-4 text-sm font-semibold text-neutral-100 transition-all hover:bg-primary-dark hover:shadow-[0_0_40px_rgba(15,118,110,0.35)] active:scale-[0.98]"
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
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-600 px-7 py-4 text-sm font-medium text-neutral-300 transition-all hover:bg-neutral-800 hover:text-neutral-100 hover:border-neutral-500"
                  >
                    View Screenshots
                  </a>
                </motion.div>
              </motion.div>

              {/* Right — Single phone, full hero height */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.35,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="flex justify-center lg:justify-end h-[70vh] sm:h-[75vh] lg:h-[80vh]"
              >
                <div className="relative h-full w-auto">
                  {/* Ambient glow */}
                  <div className="absolute -inset-10 rounded-[3rem] bg-gradient-to-b from-primary/10 via-primary/4 to-transparent blur-[60px] pointer-events-none" />

                  {/* Phone frame */}
                  <div className="relative h-full rounded-[2.5rem] sm:rounded-[3rem] border-[4px] border-neutral-700/40 bg-neutral-950 p-1.5 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
                    {/* Dynamic island */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 h-5 w-24 rounded-full bg-neutral-950" />

                    {/* Screen */}
                    <div className="relative h-full overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-neutral-900">
                      <img
                        src="/images/amal/hero.jpeg"
                        alt="Amal Tracker Home Screen"
                        className="h-full w-auto object-cover object-top block"
                        loading="eager"
                      />
                    </div>

                    {/* Home indicator */}
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 h-1 w-14 rounded-full bg-neutral-600/30" />
                  </div>

                  {/* Side glow accents */}
                  <div className="absolute top-1/4 -left-6 h-32 w-1 bg-gradient-to-b from-transparent via-primary/20 to-transparent blur-sm pointer-events-none" />
                  <div className="absolute bottom-1/4 -right-6 h-32 w-1 bg-gradient-to-b from-transparent via-accent/15 to-transparent blur-sm pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator at bottom */}
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
          SECTION 3 — FEATURES  (WOW Edition)
         ───────────────────────────────────────────────────── */}
      <Section className="relative py-24 sm:py-32 overflow-hidden">
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
              Everything you need to stay consistent with your daily Islamic
              practices — all in one beautiful app.
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
      <FeatureDeepDive />

      {/* ─────────────────────────────────────────────────────
          SECTION 4 — SCREENSHOTS (Full-width carousel)
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
