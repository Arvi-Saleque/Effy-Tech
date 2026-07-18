"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FaBell,
  FaBookOpen,
  FaChartLine,
  FaCheckCircle,
  FaClipboardList,
  FaCode,
  FaGooglePlay,
  FaLayerGroup,
  FaMobileAlt,
  FaMosque,
  FaPrayingHands,
  FaShieldAlt,
  FaStar,
  FaWhatsapp,
} from "react-icons/fa";
import {
  HiArrowLeft,
  HiArrowRight,
  HiCheckCircle,
  HiChevronDown,
  HiExternalLink,
  HiMenu,
  HiX,
} from "react-icons/hi";
import IAMAppTour from "@/components/showcase/iam/IAMAppTour";
import { MotionBoundary, TiltSurface } from "@/components/visuals";
import { trackCTAClick, trackEvent } from "@/lib/analytics";

const SCROLL_THRESHOLD = 64;

const iconMap = {
  mosque: FaMosque,
  clipboard: FaClipboardList,
  check: FaCheckCircle,
  praying: FaPrayingHands,
  bell: FaBell,
  trending: FaChartLine,
  widgets: FaLayerGroup,
  book: FaBookOpen,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: index * 0.07,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Engineering", href: "#engineering" },
  { label: "FAQ", href: "#faq" },
];

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

function trackIamCta(buttonName, position, destination) {
  trackCTAClick(buttonName, {
    page_name: "IAM",
    page_location: "/projects/IAM",
    button_position: position,
    destination,
  });
}

function ShowcaseNavbar({ logoImage, name, playStoreUrl }) {
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
        initial={{ y: -72 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45 }}
        className={`project-showcase-navbar fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-black/10 bg-[#f3f0e6]/95 shadow-[0_10px_30px_rgba(34,39,31,0.08)]"
            : "border-transparent bg-[#f3f0e6]/82"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
          <div className="flex min-w-0 items-center gap-2.5">
            <Link
              href="/projects"
              aria-label="Back to Effy Tech projects"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-[0.75rem] border border-black/10 bg-white/55 text-[var(--iam-ink)] transition hover:bg-white"
            >
              <HiArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex min-w-0 items-center gap-2.5">
              <Image
                src={logoImage}
                alt={`${name} logo`}
                width={36}
                height={36}
                className="h-9 w-9 shrink-0 rounded-[0.7rem] object-cover"
                priority
              />
              <span className="hidden truncate text-sm font-black text-[var(--iam-ink)] sm:inline">
                {name}
              </span>
              <span className="text-xs font-black tracking-[0.14em] text-[var(--iam-ink)] sm:hidden">
                IAM
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-[0.65rem] px-3 py-2 text-sm font-semibold text-[#5f665d] transition hover:bg-white/65 hover:text-[var(--iam-ink)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackIamCta("Install - Navbar", "navbar", "google_play")}
              className="iam-navbar-install inline-flex h-10 items-center gap-2 rounded-[0.75rem] bg-[var(--iam-ink)] px-3.5 text-xs font-black text-[#fbf8ef] shadow-[0_10px_24px_rgba(34,39,31,0.18)] transition hover:-translate-y-0.5 sm:px-4"
            >
              <FaGooglePlay className="h-4 w-4" />
              <span className="hidden sm:inline">Install on Google Play</span>
              <span className="sm:hidden">Install</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-[0.75rem] border border-black/10 bg-white/55 text-[var(--iam-ink)] md:hidden"
            >
              {mobileOpen ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="iam-mobile-menu fixed inset-0 z-40 flex flex-col bg-[var(--iam-ink)] px-6 pb-8 pt-24 text-[#fbf8ef] md:hidden"
          >
            <nav className="flex flex-1 flex-col justify-center gap-1">
              {navLinks.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index }}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-white/10 py-5 text-4xl font-black tracking-[-0.04em]"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div className="grid gap-3">
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackIamCta("Install - Mobile Menu", "mobile_menu", "google_play")}
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-[0.9rem] bg-[#d8c9a4] px-5 font-black text-[var(--iam-ink)]"
              >
                <FaGooglePlay className="h-5 w-5" />
                Google Play থেকে ইনস্টল করুন
              </a>
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="text-center text-sm font-semibold text-white/55"
              >
                Effy Tech-এ ফিরে যান
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FeatureDeepDive({ categories }) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const activeIndex = Math.max(0, categories.findIndex((item) => item.id === activeId));
  const active = categories[activeIndex] ?? categories[0];
  const ActiveIcon = iconMap[active?.icon] || FaLayerGroup;

  const selectFeature = (item) => {
    setActiveId(item.id);
    trackEvent("iam_feature_view", {
      page_name: "IAM",
      page_location: "/projects/IAM",
      feature_id: item.id,
      feature_name: item.titleEn,
    });
  };

  return (
    <section ref={ref} id="product" className="iam-deep-dive relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-10 grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16"
        >
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#727867]">
              Interactive product tour
            </p>
            <h2 className="mt-3 text-4xl font-black leading-[1.02] tracking-[-0.045em] text-[var(--iam-ink)] sm:text-6xl">
              Feature বেছে নিন।<br />বাস্তব workflow দেখুন।
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-[var(--iam-copy)] sm:text-lg">
            গুরুত্বপূর্ণ আটটি module কীভাবে দৈনিক tracking সহজ করে—বাস্তব interface, focused workflow এবং পরিষ্কার ব্যাখ্যাসহ দেখুন।
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[0.52fr_1.48fr]">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible"
          >
            {categories.map((item, index) => {
              const Icon = iconMap[item.icon] || FaLayerGroup;
              const selected = item.id === active?.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectFeature(item)}
                  className={`min-w-[230px] rounded-[1rem] border px-4 py-3.5 text-left transition lg:min-w-0 ${
                    selected
                      ? "border-[#aa9158]/35 bg-[var(--iam-ink)] text-[#fbf8ef] shadow-[0_16px_38px_rgba(34,39,31,0.15)]"
                      : "border-black/[0.08] bg-white/65 text-[var(--iam-ink)] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-[0.75rem] border ${
                        selected
                          ? "border-white/10 bg-white/[0.07] text-[#d8c9a4]"
                          : "border-black/[0.06] bg-[#ebe6da] text-[#727867]"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-black">{item.titleBn}</span>
                      <span className={`mt-1 block truncate text-[9px] font-black uppercase tracking-[0.13em] ${selected ? "text-[#d8c9a4]" : "text-[#727867]"}`}>
                        {item.titleEn}
                      </span>
                    </div>
                    <span className={`text-[9px] font-mono ${selected ? "text-white/40" : "text-black/25"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </button>
              );
            })}
          </motion.div>

          <motion.div
            key={active?.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden rounded-[1.8rem] border border-black/[0.08] bg-[#f6f3e9] shadow-[0_22px_58px_rgba(34,39,31,0.11)]"
          >
            <div className="grid min-h-[580px] lg:grid-cols-[1.04fr_0.96fr]">
              <div className="iam-feature-detail relative overflow-hidden bg-[var(--iam-ink)] p-7 text-[#fbf8ef] sm:p-10">
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start gap-4 border-b border-white/10 pb-7">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[1rem] border border-white/10 bg-white/[0.06] text-[#d8c9a4]">
                      <ActiveIcon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-2xl font-black leading-tight sm:text-3xl">{active?.titleBn}</h3>
                      <p className="mt-2 text-[10px] font-black uppercase tracking-[0.17em] text-[#d8c9a4]">
                        {active?.titleEn}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 grid gap-3">
                    {active?.points.map((point, index) => (
                      <div key={point} className="flex gap-3 rounded-[1rem] border border-white/10 bg-white/[0.045] p-4">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#727867]/35 text-[10px] font-black text-[#dfcf9b]">
                          {index + 1}
                        </span>
                        <p className="text-sm font-medium leading-6 text-[#e4e6df]">{point}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-8">
                    <span className="inline-flex rounded-full border border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/55">
                      Real app workflow
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-center overflow-hidden bg-[linear-gradient(145deg,#ece7da,#f5f2e9)] p-8 sm:p-10">
                <div className="absolute inset-x-7 top-6 flex items-center justify-between text-[9px] font-black uppercase tracking-[0.18em] text-[#727867]">
                  <span>Live interface</span>
                  <span>{String(activeIndex + 1).padStart(2, "0")}</span>
                </div>
                <div className="relative mt-8 w-[245px] max-w-full rounded-[2.35rem] border-[7px] border-[#252d25] bg-[#252d25] p-1.5 shadow-[0_28px_68px_rgba(34,39,31,0.25)]">
                  <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#252d25]" />
                  <Image
                    src={active?.imageSrc}
                    alt={active?.imageLabel || active?.titleEn}
                    width={664}
                    height={1184}
                    sizes="(max-width: 1023px) 245px, 245px"
                    className="block h-auto w-full rounded-[1.75rem] bg-white"
                  />
                </div>
                <div className="absolute bottom-6 left-7 right-7 rounded-[0.9rem] border border-black/[0.07] bg-white/90 px-4 py-3 text-center text-xs font-black text-[#545b50]">
                  {active?.imageLabel}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
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
        if (window.getComputedStyle(element).position === "fixed") return element;
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
      const heroVisible = Boolean(rect) && rect.bottom > 72 && rect.top < window.innerHeight * 0.82;
      const launchers = new Set(Array.from(document.querySelectorAll(selector)).map(findFixedContainer).filter(Boolean));

      launchers.forEach((element) => {
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
        if (!launchers.has(element) || !isMobile || !heroVisible) restore(element);
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
    tagline,
    descriptionBn,
    playStoreUrl,
    privacyPolicyUrl,
    supportUrl,
    projectInquiryUrl,
    category,
    techStack,
    logoImage,
    socialProof,
    features,
    deepDiveCategories,
    engineeringHighlights,
    howItWorks,
    faqs,
  } = data;

  const heroRef = useRef(null);
  useHideFixedWhatsAppInHero(heroRef);

  useEffect(() => {
    document.body.style.overflow = "";
    window.scrollTo(0, 0);

    const sent = new Set();
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percentage = Math.round((window.scrollY / scrollable) * 100);
      [50, 90].forEach((threshold) => {
        if (percentage >= threshold && !sent.has(threshold)) {
          sent.add(threshold);
          trackEvent("iam_scroll_depth", {
            page_name: "IAM",
            page_location: "/projects/IAM",
            percent_scrolled: threshold,
          });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="effy-project-page effy-project-page--iam min-h-screen overflow-x-hidden">
      <ShowcaseNavbar logoImage={logoImage} name={name} playStoreUrl={playStoreUrl} />

      <section
        ref={heroRef}
        className="project-showcase-hero project-showcase-hero--iam relative overflow-hidden pb-20 pt-24 sm:pb-24 lg:min-h-[calc(100vh-72px)] lg:pt-[104px]"
      >
        <div className="iam-hero-geometry pointer-events-none absolute inset-0" aria-hidden="true">
          <span className="iam-hero-shape iam-hero-shape--one" />
          <span className="iam-hero-shape iam-hero-shape--two" />
          <span className="iam-hero-shape iam-hero-shape--three" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16 lg:px-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-xl">
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <Image
                src={logoImage}
                alt={`${name} logo`}
                width={80}
                height={80}
                priority
                className="h-20 w-20 rounded-[1.2rem] border border-black/10 object-cover shadow-[0_12px_28px_rgba(34,39,31,0.13)]"
              />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#727867]">
                  {category} · Free · Offline-first
                </p>
                <p className="mt-2 text-sm font-black text-[var(--iam-ink)]">Designed & engineered by Effy Tech</p>
              </div>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-8 text-xs font-black uppercase tracking-[0.24em] text-[#aa9158]">
              {nameBn}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="project-hero-title mt-3 text-[clamp(3.15rem,8vw,6.2rem)] font-black leading-[0.93] tracking-[-0.06em] text-[var(--iam-ink)]"
            >
              আপনার দৈনিক ইবাদত<br />একটি focused system-এ।
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 text-xl font-black text-[#727867]">
              {tagline}
            </motion.p>
            <motion.p variants={fadeUp} className="project-hero-copy mt-5 max-w-xl text-base leading-8 text-[var(--iam-copy)] sm:text-lg">
              {descriptionBn}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackIamCta("Install - Hero", "hero", "google_play")}
                className="inline-flex min-h-16 items-center justify-center gap-3 rounded-[0.95rem] bg-[var(--iam-ink)] px-7 py-4 font-black text-[#fbf8ef] shadow-[0_16px_38px_rgba(34,39,31,0.2)] transition hover:-translate-y-0.5"
              >
                <FaGooglePlay className="h-6 w-6" />
                <span className="text-left">
                  <span className="block text-[9px] uppercase tracking-[0.14em] text-white/55">Get it on</span>
                  <span className="block text-lg leading-tight">Google Play</span>
                </span>
              </a>
              <a
                href="#product"
                className="inline-flex min-h-16 items-center justify-center gap-2 rounded-[0.95rem] border border-black/10 bg-white/55 px-7 py-4 text-sm font-black text-[var(--iam-ink)] transition hover:bg-white"
              >
                Product tour দেখুন
                <HiArrowRight className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs font-bold text-[#626a60]">
              <span className="flex items-center gap-1.5"><HiCheckCircle className="h-4 w-4 text-[#aa9158]" />বিজ্ঞাপনমুক্ত</span>
              <span className="flex items-center gap-1.5"><HiCheckCircle className="h-4 w-4 text-[#aa9158]" />বাংলা + English</span>
              <a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition hover:text-[var(--iam-ink)]">
                <FaShieldAlt className="h-3.5 w-3.5 text-[#aa9158]" />Privacy Policy
              </a>
              <a href={supportUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackIamCta("Support - Hero", "hero", "whatsapp_support")} className="flex items-center gap-1.5 transition hover:text-[var(--iam-ink)]">
                <FaWhatsapp className="h-4 w-4 text-[#aa9158]" />WhatsApp Support
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.78, delay: 0.14 }}
            className="iam-hero-preview mx-auto w-full max-w-[620px]"
          >
            <div className="mb-5 flex items-center justify-between px-1">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#727867]">Live app preview</p>
                <p className="mt-1 text-sm font-black text-[var(--iam-ink)]">২১টি complete screen explore করুন</p>
              </div>
              <span className="hidden rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-[10px] font-black text-[#727867] sm:inline">Swipe · Scroll</span>
            </div>
            <MotionBoundary className="iam-hero-motion" strict={false}>
              <TiltSurface className="iam-hero-tilt" maxTilt={2.2} perspective={1250}>
                <div className="iam-spatial-preview">
                  <IAMAppTour appName={name} />
                </div>
              </TiltSurface>
            </MotionBoundary>
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto mt-16 max-w-7xl px-5 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.36 }}
            className="iam-proof-strip grid overflow-hidden rounded-[1.2rem] border border-black/[0.08] bg-white/55 sm:grid-cols-3"
          >
            {socialProof.map((item, index) => (
              <div key={item.label} className={`p-5 text-center sm:p-6 ${index > 0 ? "border-t border-black/[0.08] sm:border-l sm:border-t-0" : ""}`}>
                <div className="flex items-center justify-center gap-2">
                  {index === 1 && <FaStar className="h-4 w-4 text-[#aa9158]" />}
                  <strong className="text-2xl font-black text-[var(--iam-ink)] sm:text-3xl">{item.value}</strong>
                </div>
                <span className="mt-1 block text-[10px] font-black uppercase tracking-[0.16em] text-[#727867]">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Section className="iam-highlights relative mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: FaMobileAlt, title: "Daily use first", copy: "দ্রুত logging, পরিষ্কার hierarchy এবং প্রয়োজনীয় তথ্য এক জায়গায়।" },
            { icon: FaShieldAlt, title: "Offline-first reliability", copy: "Internet ছাড়াই core tracking; প্রয়োজন হলে optional cloud backup ও sync।" },
            { icon: FaChartLine, title: "Progress you can understand", copy: "Daily, weekly ও monthly insights থেকে নিজের consistency ও gap বুঝুন।" },
          ].map((item, index) => (
            <motion.div key={item.title} variants={fadeUp} custom={index} className="iam-highlight-card rounded-[1.25rem] border border-black/[0.07] bg-[var(--iam-ink)] p-6 text-[#fbf8ef] shadow-[0_14px_34px_rgba(34,39,31,0.11)]">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-[0.9rem] border border-white/10 bg-white/[0.06] text-[#d8c9a4]"><item.icon className="h-5 w-5" /></span>
                <span className="text-[10px] font-mono text-white/30">0{index + 1}</span>
              </div>
              <h2 className="mt-8 text-xl font-black">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#cfd4cb]">{item.copy}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="features" className="iam-features relative overflow-hidden py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="mb-12 grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16">
            <div>
              <motion.p variants={fadeUp} className="text-[11px] font-black uppercase tracking-[0.26em] text-[#d8c9a4]">Core capabilities</motion.p>
              <motion.h2 variants={fadeUp} className="mt-3 text-4xl font-black leading-[1.02] tracking-[-0.045em] text-[#fbf8ef] sm:text-6xl">
                দৈনিক ব্যবহারের জন্য<br />সবচেয়ে গুরুত্বপূর্ণ আটটি feature।
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} className="max-w-2xl text-base leading-8 text-[#d2d6ce] sm:text-lg">
              Feature count বাড়ানোর জন্য নয়—নিয়মিত tracking, accountability এবং meaningful improvement সহজ করার জন্য প্রতিটি module তৈরি।
            </motion.p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || FaCheckCircle;
              return (
                <motion.article key={feature.id} variants={fadeUp} custom={index} className="group rounded-[1.2rem] border border-white/[0.09] bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:bg-white/[0.055] sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-[0.8rem] border border-white/10 bg-[#2c332b] text-[#d8c9a4]"><Icon className="h-5 w-5" /></span>
                    <span className="text-[10px] font-mono text-white/25">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-7 text-xl font-black text-[#fbf8ef]">{feature.titleBn}</h3>
                  <p className="mt-2 text-[9px] font-black uppercase tracking-[0.15em] text-[#d8c9a4]">{feature.titleEn}</p>
                  <p className="mt-4 text-sm leading-6 text-[#cfd4cb]">{feature.descBn}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </Section>

      <FeatureDeepDive categories={deepDiveCategories} />

      <Section id="how-it-works" className="iam-how-it-works relative overflow-hidden py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="mb-12 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
            <div>
              <motion.p variants={fadeUp} className="text-[11px] font-black uppercase tracking-[0.26em] text-[#727867]">How it works</motion.p>
              <motion.h2 variants={fadeUp} className="mt-3 text-4xl font-black leading-[1.03] tracking-[-0.045em] text-[var(--iam-ink)] sm:text-5xl">
                শুরু করা সহজ।<br />ধারাবাহিক থাকা আরও সহজ।
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} className="max-w-2xl text-base leading-8 text-[var(--iam-copy)] sm:text-lg">
              App install করুন, নিজের tracking সাজান এবং প্রতিদিনের অগ্রগতি একটি পরিচিত flow-এর মধ্যে অনুসরণ করুন।
            </motion.p>
          </div>

          <div className="iam-steps grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, index) => (
              <motion.article key={step.step} variants={fadeUp} custom={index} className="rounded-[1.2rem] border border-black/[0.08] bg-white/55 p-5 shadow-[0_10px_28px_rgba(34,39,31,0.045)] sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-[0.8rem] border border-[#aa9158]/20 bg-[#aa9158]/10 text-lg font-black text-[var(--iam-ink)]">{step.step}</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.16em] text-black/30">Step {String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-8 text-xl font-black text-[var(--iam-ink)]">{step.titleBn}</h3>
                <p className="mt-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#727867]">{step.titleEn}</p>
                <p className="mt-4 text-sm leading-6 text-[var(--iam-copy)]">{step.descBn}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="engineering" className="iam-engineering relative overflow-hidden py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <motion.div variants={fadeUp} className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[var(--iam-ink)] text-[#fbf8ef] shadow-[0_24px_68px_rgba(34,39,31,0.16)]">
            <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
              <div className="border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r">
                <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#d8c9a4]">Effy Tech product engineering</p>
                <h2 className="mt-4 text-4xl font-black leading-[1.03] tracking-[-0.045em] sm:text-5xl">
                  শুধু একটি app নয়।<br />একটি complete product case study।
                </h2>
                <p className="mt-5 text-base leading-8 text-[#cfd4cb]">
                  Islamic Amal Tracker দেখায় Effy Tech কীভাবে real workflow বুঝে product plan, interface design, mobile engineering, backend, native integration এবং production release একসঙ্গে পরিচালনা করে।
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {techStack.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white/65">{item}</span>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <a
                    href={projectInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackIamCta("Build App - Engineering", "engineering", "whatsapp_project")}
                    className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[0.9rem] bg-[#d8c9a4] px-5 font-black text-[var(--iam-ink)] transition hover:-translate-y-0.5"
                  >
                    <FaWhatsapp className="h-5 w-5" />
                    এমন একটি app বানাতে কথা বলুন
                  </a>
                  <Link href="/#contact" onClick={() => trackIamCta("Start Project - Engineering", "engineering", "contact_section")} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[0.9rem] border border-white/15 px-5 font-black text-[#fbf8ef] transition hover:bg-white/[0.05]">
                    Start a Project
                    <HiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                {engineeringHighlights.map((item) => (
                  <article key={item.number} className="bg-[var(--iam-ink)] p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#d8c9a4]">{item.number}</span>
                      {item.number === "01" ? <FaShieldAlt className="h-4 w-4 text-white/30" /> : item.number === "02" ? <FaMobileAlt className="h-4 w-4 text-white/30" /> : item.number === "03" ? <FaCode className="h-4 w-4 text-white/30" /> : <FaCheckCircle className="h-4 w-4 text-white/30" />}
                    </div>
                    <h3 className="mt-8 text-xl font-black">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#bfc7bf]">{item.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section className="iam-trust relative overflow-hidden py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div variants={fadeUp} className="rounded-[1.4rem] border border-black/[0.08] bg-white/55 p-6 sm:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#727867]">Transparent and supportable</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[var(--iam-ink)]">আপনার data, privacy এবং support—সবকিছুর পরিষ্কার পথ আছে।</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--iam-copy)]">Privacy Policy থেকে data handling পড়ুন, আর app ব্যবহার বা technical সমস্যায় সরাসরি WhatsApp support নিন।</p>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <motion.a variants={fadeUp} href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackIamCta("Privacy Policy", "trust", "privacy_policy")} className="flex items-center justify-between rounded-[1.2rem] border border-black/[0.08] bg-white/55 p-5 transition hover:bg-white">
                <span className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-[0.7rem] bg-[#ebe6da] text-[#727867]"><FaShieldAlt className="h-4 w-4" /></span><span><strong className="block text-sm text-[var(--iam-ink)]">Privacy Policy</strong><small className="mt-1 block text-[#727867]">Data handling ও controls</small></span></span>
                <HiExternalLink className="h-4 w-4 text-[#727867]" />
              </motion.a>
              <motion.a variants={fadeUp} href={supportUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackIamCta("WhatsApp Support", "trust", "whatsapp_support")} className="flex items-center justify-between rounded-[1.2rem] border border-black/[0.08] bg-white/55 p-5 transition hover:bg-white">
                <span className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-[0.7rem] bg-[#ebe6da] text-[#727867]"><FaWhatsapp className="h-5 w-5" /></span><span><strong className="block text-sm text-[var(--iam-ink)]">WhatsApp Support</strong><small className="mt-1 block text-[#727867]">সরাসরি Effy Tech support</small></span></span>
                <HiExternalLink className="h-4 w-4 text-[#727867]" />
              </motion.a>
            </div>
          </div>
        </div>
      </Section>

      <Section id="faq" className="iam-faq relative overflow-hidden py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <motion.p variants={fadeUp} className="text-[11px] font-black uppercase tracking-[0.25em] text-[#727867]">Frequently asked questions</motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 text-4xl font-black tracking-[-0.045em] text-[var(--iam-ink)] sm:text-5xl">Install করার আগে যা জানা দরকার।</motion.h2>
          </div>
          <div className="grid gap-3">
            {faqs.map((item, index) => (
              <motion.details key={item.question} variants={fadeUp} custom={index} className="group rounded-[1rem] border border-black/[0.08] bg-white/55 px-5 py-1 open:bg-white sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-black text-[var(--iam-ink)] sm:text-lg">
                  {item.question}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/10 text-[#727867] transition group-open:rotate-180"><HiChevronDown className="h-4 w-4" /></span>
                </summary>
                <p className="border-t border-black/[0.07] pb-5 pt-4 text-sm leading-7 text-[var(--iam-copy)]">{item.answer}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </Section>

      <Section id="download" className="iam-download relative overflow-hidden py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <motion.div variants={fadeUp} className="grid overflow-hidden rounded-[1.8rem] border border-black/[0.08] bg-white/65 shadow-[0_18px_46px_rgba(34,39,31,0.1)] lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-7 sm:p-12">
              <div className="flex items-center gap-4">
                <Image src={logoImage} alt={`${name} logo`} width={64} height={64} className="h-16 w-16 rounded-[1rem] object-cover" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#727867]">Free Android app</p>
                  <p className="mt-1 text-sm font-black text-[var(--iam-copy)]">1500+ installs · 4.77/5 rating</p>
                </div>
              </div>
              <h2 className="mt-8 text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[var(--iam-ink)] sm:text-6xl">আজ থেকেই ধারাবাহিকতা গড়ে তুলুন।</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--iam-copy)] sm:text-lg">Islamic Amal Tracker install করুন এবং নামাজ, আমল, যিকির, Routine, Dua ও progress—সবকিছু একটি focused system-এ গুছিয়ে নিন।</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={playStoreUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackIamCta("Install - Final CTA", "final_cta", "google_play")} className="inline-flex min-h-16 items-center justify-center gap-3 rounded-[0.95rem] bg-[var(--iam-ink)] px-8 py-4 font-black text-[#fbf8ef] transition hover:-translate-y-0.5">
                  <FaGooglePlay className="h-6 w-6" />
                  <span className="text-left"><span className="block text-[9px] uppercase tracking-[0.13em] text-white/55">Get it on</span><span className="block text-lg leading-tight">Google Play</span></span>
                </a>
                <a href={projectInquiryUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackIamCta("Build App - Final CTA", "final_cta", "whatsapp_project")} className="inline-flex min-h-16 items-center justify-center gap-2 rounded-[0.95rem] border border-black/10 px-7 py-4 text-sm font-black text-[var(--iam-ink)] transition hover:bg-white">
                  <FaWhatsapp className="h-5 w-5" />
                  এমন একটি app বানাতে কথা বলুন
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-[var(--iam-copy)]">
                {["Free to use", "Works offline", "Bangla & English", "Optional cloud sync"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5"><HiCheckCircle className="h-4 w-4 text-[#aa9158]" />{item}</span>
                ))}
              </div>
            </div>

            <div className="relative hidden min-h-[360px] items-center justify-center bg-[var(--iam-ink)] p-8 text-center lg:flex">
              <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.05] p-6">
                <Image src="/images/amal/play-store-qr.png" alt="Scan to install Islamic Amal Tracker" width={176} height={176} className="mx-auto h-44 w-44 rounded-[0.75rem] bg-white p-2" />
                <p className="mt-5 text-lg font-black text-white">Scan to install</p>
                <p className="mt-2 max-w-[240px] text-sm leading-6 text-[#aeb8af]">Phone camera দিয়ে QR code scan করে সরাসরি Google Play page খুলুন।</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
