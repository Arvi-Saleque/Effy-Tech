"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Globe2,
  GraduationCap,
  Images,
  Languages,
  LayoutDashboard,
  LayoutTemplate,
  ListFilter,
  MessageCircle,
  MonitorSmartphone,
  Newspaper,
  PanelTop,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { MotionBoundary, TiltSurface } from "@/components/visuals";
import { trackCTAClick, trackEvent, trackExternalLink } from "@/lib/analytics";

const iconMap = {
  layout: LayoutTemplate,
  cms: LayoutDashboard,
  publishing: Newspaper,
  responsive: MonitorSmartphone,
  academic: GraduationCap,
  pdf: FileText,
  shield: ShieldCheck,
  media: Images,
  search: Search,
  workflow: Workflow,
  mobile: MonitorSmartphone,
  scalable: Database,
  language: Languages,
  filter: ListFilter,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: fadeUp.hidden,
        visible: {
          ...fadeUp.visible,
          transition: { ...fadeUp.visible.transition, delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, description, align = "left", dark = false }) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <p
        className={`text-xs font-black uppercase tracking-[0.24em] ${
          dark ? "text-primary-light" : "text-primary"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-3xl font-black leading-[1.08] sm:text-4xl lg:text-5xl ${
          dark ? "text-neutral-50" : "text-neutral-900"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-base leading-8 sm:text-lg ${
            dark ? "text-neutral-400" : "text-neutral-600"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function BrowserPreview({ data }) {
  return (
    <MotionBoundary className="institutional-browser-motion">
      <TiltSurface className="institutional-browser-tilt" maxTilt={2.4} perspective={1350}>
        <div className="institutional-browser-stage">
          <div className="institutional-browser-grid" aria-hidden="true" />
          <div className="institutional-browser-glow" aria-hidden="true" />
          <div className="institutional-browser-frame relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-black shadow-[0_28px_90px_rgba(0,0,0,0.42)]">
            <div className="flex items-center gap-3 border-b border-white/10 bg-neutral-800 px-4 py-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-error/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/90" />
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg bg-neutral-900/80 px-3 py-2 text-[11px] text-neutral-400">
                <ShieldCheck className="h-3.5 w-3.5 flex-none text-primary-light" />
                <span className="truncate">{data.browserUrl}</span>
              </div>
            </div>
            <div className="relative aspect-[16/10] bg-neutral-100">
              <Image
                src={data.heroImage}
                alt={data.heroImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover object-top"
              />
            </div>
          </div>
          <div className="institutional-browser-status" aria-hidden="true">
            <span />
            Production system
          </div>
        </div>
      </TiltSurface>
    </MotionBoundary>
  );
}

function Lightbox({ images, index, onClose, onChange }) {
  const current = images[index];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        onChange((index - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        onChange((index + 1) % images.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [images.length, index, onChange, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] bg-neutral-black/90 p-3 backdrop-blur-md sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${current.label} screenshot`}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <div className="mx-auto flex h-full max-w-7xl flex-col">
        <div className="mb-3 flex items-center justify-between gap-4 text-neutral-50">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold sm:text-base">{current.label}</p>
            <p className="hidden truncate text-xs text-neutral-400 sm:block">{current.detail}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white/15"
            aria-label="Close screenshot"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-y-auto rounded-2xl bg-neutral-white shadow-2xl">
          <img src={current.src} alt={current.label} className="h-auto w-full" />
        </div>

        {images.length > 1 ? (
          <div className="mt-3 flex items-center justify-between text-neutral-50">
            <button
              type="button"
              onClick={() => onChange((index - 1 + images.length) % images.length)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold transition hover:bg-white/15"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <span className="text-xs font-bold tracking-[0.16em] text-neutral-400">
              {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => onChange((index + 1) % images.length)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold transition hover:bg-white/15"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

function ScreenshotCarousel({ screenshots, projectKey }) {
  const total = screenshots.length;
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const goNext = useCallback(() => {
    setCurrent((previous) => (previous + 1) % total);
  }, [total]);

  const goPrevious = useCallback(() => {
    setCurrent((previous) => (previous - 1 + total) % total);
  }, [total]);

  const lightboxIndex = lightbox
    ? screenshots.findIndex((screenshot) => screenshot.src === lightbox.src)
    : -1;

  const lightboxPrevious = useCallback(() => {
    if (lightboxIndex < 0) return;
    setLightbox(screenshots[(lightboxIndex - 1 + total) % total]);
  }, [lightboxIndex, screenshots, total]);

  const lightboxNext = useCallback(() => {
    if (lightboxIndex < 0) return;
    setLightbox(screenshots[(lightboxIndex + 1) % total]);
  }, [lightboxIndex, screenshots, total]);

  useEffect(() => {
    if (!lightbox) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowLeft") lightboxPrevious();
      if (event.key === "ArrowRight") lightboxNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightbox, lightboxNext, lightboxPrevious]);

  const extended = [...screenshots, ...screenshots, ...screenshots];
  const offset = total;

  const openScreenshot = (screenshot) => {
    setLightbox(screenshot);
    trackEvent("case_study_gallery_open", {
      project_name: projectKey,
      gallery_type: "interface_carousel",
      image_label: screenshot.label,
      page_location: window.location.pathname,
    });
  };

  return (
    <>
      <section id="screenshots" ref={ref} className="institutional-screenshots relative bg-neutral-900 py-16 sm:py-24">
        <div className="mx-auto mb-10 max-w-2xl px-6 text-center sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-light"
          >
            Screenshots
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold leading-tight text-neutral-100 sm:text-4xl"
          >
            Web Interface
          </motion.h2>
        </div>

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
            {extended.map((screenshot, index) => (
              <button
                key={`${screenshot.src}-${index}`}
                type="button"
                className="group relative aspect-[16/10] w-full flex-shrink-0 cursor-pointer overflow-hidden text-left md:w-1/2 lg:w-1/3"
                onClick={() => openScreenshot(screenshot)}
                aria-label={`Open ${screenshot.label} screenshot`}
              >
                <Image
                  src={screenshot.thumb || screenshot.src}
                  alt={screenshot.label}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-neutral-black/0 transition-all duration-300 group-hover:bg-neutral-black/15" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-center text-xs font-medium uppercase tracking-wider text-neutral-200">
                    {screenshot.label}
                  </p>
                </div>
              </button>
            ))}
          </div>
          <style>{`
            @media (min-width: 768px) {
              .dha-screenshot-strip { --cols: 2 !important; }
            }
            @media (min-width: 1024px) {
              .dha-screenshot-strip { --cols: 3 !important; }
            }
          `}</style>
        </motion.div>

        <div className="mt-8 flex items-center justify-center gap-8 sm:mt-10">
          <button
            type="button"
            onClick={goPrevious}
            className="flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:text-neutral-100 sm:text-sm"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          <button
            type="button"
            onClick={goNext}
            className="flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:text-neutral-100 sm:text-sm"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <AnimatePresence>
        {lightbox ? (
          <>
            <motion.div
              key="screenshot-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-neutral-black/90 backdrop-blur-md"
              onClick={() => setLightbox(null)}
            />
            <motion.div
              key="screenshot-content"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-8"
              onClick={() => setLightbox(null)}
              role="dialog"
              aria-modal="true"
              aria-label={lightbox.label}
            >
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  lightboxPrevious();
                }}
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-600/50 bg-neutral-900/70 text-neutral-300 backdrop-blur-sm transition-all hover:border-neutral-400 hover:text-neutral-50 sm:left-6 sm:h-12 sm:w-12"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <div className="relative w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
                <img
                  src={lightbox.src}
                  alt={lightbox.label}
                  className="h-auto w-full rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.5)]"
                />
                <p className="mt-4 text-center text-sm uppercase tracking-wider text-neutral-400">
                  {lightbox.label}
                  <span className="ml-2 text-neutral-600">
                    {lightboxIndex + 1} / {total}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  lightboxNext();
                }}
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-600/50 bg-neutral-900/70 text-neutral-300 backdrop-blur-sm transition-all hover:border-neutral-400 hover:text-neutral-50 sm:right-6 sm:h-12 sm:w-12"
                aria-label="Next screenshot"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-600/50 bg-neutral-900/70 text-neutral-400 backdrop-blur-sm transition-all hover:border-neutral-400 hover:text-neutral-50 sm:right-6 sm:top-6"
                aria-label="Close screenshot"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function FullPageGallery({ longScreenshots, projectKey, isBangla }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState(null);
  const total = longScreenshots.length;

  const lightboxIndex = lightbox
    ? longScreenshots.findIndex((screenshot) => screenshot.src === lightbox.src)
    : -1;

  const lightboxPrevious = useCallback(() => {
    if (lightboxIndex < 0) return;
    setLightbox(longScreenshots[(lightboxIndex - 1 + total) % total]);
  }, [lightboxIndex, longScreenshots, total]);

  const lightboxNext = useCallback(() => {
    if (lightboxIndex < 0) return;
    setLightbox(longScreenshots[(lightboxIndex + 1) % total]);
  }, [lightboxIndex, longScreenshots, total]);

  useEffect(() => {
    if (!lightbox) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowLeft") lightboxPrevious();
      if (event.key === "ArrowRight") lightboxNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightbox, lightboxNext, lightboxPrevious]);

  const openScreenshot = (screenshot) => {
    setLightbox(screenshot);
    trackEvent("case_study_gallery_open", {
      project_name: projectKey,
      gallery_type: "full_page_preview",
      image_label: screenshot.label,
      page_location: window.location.pathname,
    });
  };

  return (
    <>
      <section id="full-pages" ref={ref} className="institutional-full-pages relative overflow-hidden bg-neutral-900 py-16 sm:py-24">
        <div className="mx-auto mb-10 max-w-2xl px-6 text-center sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-light"
          >
            Full Page Views
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold leading-tight text-neutral-100 sm:text-4xl"
          >
            {isBangla ? "সম্পূর্ণ পেজ প্রিভিউ" : "Complete page previews"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-3 max-w-md text-sm text-neutral-500"
          >
            {isBangla
              ? "Desktop-এ hover করলে পুরো page scroll হবে—click করলে full view খুলবে।"
              : "Hover on desktop to scroll through the complete page, or click to open the full view."}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto max-w-7xl px-6 sm:px-10"
        >
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:gap-5">
            {longScreenshots.map((screenshot) => (
              <button
                key={screenshot.src}
                type="button"
                className="group relative h-[420px] w-[260px] flex-shrink-0 cursor-pointer snap-center overflow-hidden rounded-2xl border border-neutral-700/30 bg-neutral-900/50 text-left transition-all hover:border-primary/35 hover:shadow-[0_0_40px_rgba(196,164,92,0.12)] sm:h-[480px] sm:w-[300px] lg:w-[340px]"
                onClick={() => openScreenshot(screenshot)}
                aria-label={`Open full page preview: ${screenshot.label}`}
              >
                <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-1.5 border-b border-neutral-700/40 bg-neutral-900/95 px-3 py-2 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-red-500/60" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
                  <span className="h-2 w-2 rounded-full bg-green-500/60" />
                  <span className="ml-2 truncate font-mono text-[10px] text-neutral-500">
                    {screenshot.label}
                  </span>
                </div>
                <div className="absolute inset-0 overflow-hidden pt-7">
                  <img
                    src={screenshot.src}
                    alt={screenshot.label}
                    className="h-auto min-h-full w-full object-cover object-top transition-transform duration-[3000ms] ease-in-out group-hover:translate-y-[calc(-100%+480px)]"
                    loading="lazy"
                  />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-neutral-900/90 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-3 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-neutral-300">
                    {screenshot.label}
                  </p>
                </div>
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-full border border-neutral-600/50 bg-neutral-900/80 px-4 py-2 text-xs font-semibold text-neutral-200 backdrop-blur-md">
                    Click to expand
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {lightbox ? (
          <>
            <motion.div
              key="full-page-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-neutral-black/90 backdrop-blur-md"
              onClick={() => setLightbox(null)}
            />
            <motion.div
              key="full-page-content"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-[101] flex flex-col items-center overflow-y-auto py-4 sm:py-8"
              onClick={() => setLightbox(null)}
              role="dialog"
              aria-modal="true"
              aria-label={lightbox.label}
            >
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  lightboxPrevious();
                }}
                className="fixed left-3 top-1/2 z-[110] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-600/50 bg-neutral-900/70 text-neutral-300 backdrop-blur-sm transition-all hover:border-neutral-400 hover:text-neutral-50 sm:left-6 sm:h-12 sm:w-12"
                aria-label="Previous full page"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  lightboxNext();
                }}
                className="fixed right-3 top-1/2 z-[110] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-600/50 bg-neutral-900/70 text-neutral-300 backdrop-blur-sm transition-all hover:border-neutral-400 hover:text-neutral-50 sm:right-6 sm:h-12 sm:w-12"
                aria-label="Next full page"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="fixed right-4 top-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full border border-neutral-600/50 bg-neutral-900/70 text-neutral-400 backdrop-blur-sm transition-all hover:border-neutral-400 hover:text-neutral-50 sm:right-6 sm:top-6"
                aria-label="Close full page"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative w-full max-w-3xl px-4" onClick={(event) => event.stopPropagation()}>
                <div className="flex items-center gap-2 rounded-t-xl border border-b-0 border-neutral-700/50 bg-neutral-800 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                  <span className="ml-3 font-mono text-xs text-neutral-400">
                    {lightbox.label}
                    <span className="ml-3 text-neutral-600">
                      {lightboxIndex + 1} / {total}
                    </span>
                  </span>
                </div>
                <img
                  src={lightbox.src}
                  alt={lightbox.label}
                  className="h-auto w-full rounded-b-xl border border-t-0 border-neutral-700/50 shadow-[0_0_80px_rgba(0,0,0,0.5)]"
                />
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default function DHAShowcase({ data }) {
  const isBangla = data.locale === "bn";
  const screenshots = useMemo(
    () => [...data.galleries.public.images, ...data.galleries.admin.images],
    [data.galleries],
  );
  const longScreenshots = useMemo(
    () => screenshots.filter((image) => /\/(full|longimg)\d+\./.test(image.src)),
    [screenshots],
  );
  const trackedDepths = useRef(new Set());

  const inquiryContext = useMemo(
    () => ({
      page_name: data.projectKey,
      project_name: data.name,
      page_location: `/projects/${data.projectKey}`,
    }),
    [data],
  );

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const percentage = Math.round((window.scrollY / maxScroll) * 100);

      [50, 90].forEach((depth) => {
        if (percentage >= depth && !trackedDepths.current.has(depth)) {
          trackedDepths.current.add(depth);
          trackEvent("case_study_scroll", {
            project_name: data.projectKey,
            depth_percent: depth,
            page_location: window.location.pathname,
          });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [data.projectKey]);

  const visitLive = (position) => {
    trackCTAClick(`Visit Live Site - ${position}`, {
      ...inquiryContext,
      button_position: position,
      destination: data.liveUrl,
    });
    trackExternalLink(data.liveUrl, `${data.projectKey}_${position}`);
  };

  const discussProject = (position) => {
    trackCTAClick(`Discuss Project - ${position}`, {
      ...inquiryContext,
      button_position: position,
      destination: "whatsapp_project_inquiry",
    });
  };

  return (
    <main className={`effy-project-page effy-institutional-case effy-project-page--${data.projectKey.toLowerCase()} overflow-hidden bg-neutral-50 text-neutral-900`}>
      <section className="institutional-case-hero relative bg-neutral-900 pb-24 pt-32 text-neutral-50 sm:pb-28 sm:pt-36 lg:pb-32">
        <div className="absolute inset-0 bg-dot-grid opacity-30" />
        <div className="absolute -left-28 top-24 h-72 w-72 rounded-full bg-primary/20 blur-[110px]" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-primary-light/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold text-neutral-400 transition hover:text-neutral-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-neutral-300">
              <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_0_4px_rgba(39,145,89,0.15)]" />
              {data.status} client project
            </div>
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-primary-light">
                {data.heroEyebrow} / {data.category}
              </p>
              <h1 className="mt-5 text-4xl font-black leading-[1.03] sm:text-5xl lg:text-[4.35rem]">
                {data.heroTitle}
                <span className="mt-2 block text-primary-light">{data.heroAccent}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
                {data.heroDescription}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {data.heroPoints.map((point) => (
                  <div key={point} className="flex items-start gap-2.5 text-sm font-semibold text-neutral-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary-light" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={data.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => visitLive("hero")}
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-primary-light px-6 py-3.5 text-sm font-black text-neutral-900 transition hover:-translate-y-0.5 hover:bg-primary-light/90 hover:shadow-accent"
                >
                  Visit Live Website
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={data.cta.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => discussProject("hero")}
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-black text-neutral-50 transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  {isBangla ? "এমন Project নিয়ে কথা বলুন" : "Discuss a Similar Project"}
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6 text-sm text-neutral-400">
                <Building2 className="h-4 w-4 text-primary-light" />
                <span>
                  {data.client.name} · {data.client.location}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <BrowserPreview data={data} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="institutional-proof relative z-10 -mt-10 px-5 sm:px-8 lg:px-10">
        <div className="institutional-proof-grid mx-auto grid max-w-7xl gap-px overflow-hidden rounded-2xl border border-neutral-300 bg-neutral-300 shadow-xl sm:grid-cols-2 lg:grid-cols-4">
          {data.highlights.map((item) => (
            <div key={item.label} className="bg-neutral-50 px-5 py-6 sm:px-6">
              <p className="text-base font-black text-neutral-900">{item.value}</p>
              <p className="mt-1 text-sm text-neutral-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="overview" className="institutional-overview py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow={data.overview.overline}
                title={data.overview.title}
                description={data.overview.intro}
              />
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2">
              <Reveal className="rounded-2xl border border-neutral-300 bg-neutral-100 p-7 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-primary-light">
                  <ListFilter className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl font-black text-neutral-900">{data.overview.challengeTitle}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{data.overview.challenge}</p>
              </Reveal>
              <Reveal delay={0.08} className="rounded-2xl border border-primary/25 bg-primary-lightest p-7 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-neutral-50">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-xl font-black text-neutral-900">{data.overview.solutionTitle}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{data.overview.solution}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="institutional-deliverables border-y border-neutral-300 bg-neutral-100 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Scope delivered"
              title={isBangla ? "Project-এর জন্য যা যা তৈরি করা হয়েছে" : "What Effy Tech delivered"}
              description={
                isBangla
                  ? "Design থেকে operational workflow পর্যন্ত project-টিকে একটি complete, maintainable system হিসেবে তৈরি করা হয়েছে।"
                  : "From information architecture to operational content tools, the project was delivered as a complete and maintainable web system."
              }
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {data.deliverables.map((item, index) => {
              const Icon = iconMap[item.icon] || Code2;
              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <div className="h-full rounded-2xl border border-neutral-300 bg-neutral-50 p-7 transition hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg sm:p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-primary-light">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-6 text-xl font-black text-neutral-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-neutral-600">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="solution" className="institutional-systems py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Connected system"
              title={
                isBangla
                  ? "একটি public experience, একটি operational back office"
                  : "One public experience, one operational back office"
              }
              description={
                isBangla
                  ? "Visitor-facing website এবং staff-facing management system আলাদা interface হলেও একই content operation-এর অংশ।"
                  : "The visitor-facing website and staff-facing management system are separate experiences built around the same content operation."
              }
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {data.systems.map((system, index) => (
              <Reveal key={system.label} delay={index * 0.08}>
                <article
                  className={`h-full rounded-[1.6rem] border p-7 sm:p-9 ${
                    index === 0
                      ? "border-neutral-300 bg-neutral-100"
                      : "border-neutral-700 bg-neutral-900 text-neutral-50"
                  }`}
                >
                  <p className={`text-xs font-black uppercase tracking-[0.22em] ${index === 0 ? "text-primary" : "text-primary-light"}`}>
                    {system.label}
                  </p>
                  <h3 className={`mt-4 text-2xl font-black leading-tight sm:text-3xl ${index === 0 ? "text-neutral-900" : "text-neutral-50"}`}>
                    {system.title}
                  </h3>
                  <p className={`mt-4 text-sm leading-7 ${index === 0 ? "text-neutral-600" : "text-neutral-400"}`}>
                    {system.description}
                  </p>
                  <ul className="mt-7 space-y-3">
                    {system.items.map((item) => (
                      <li key={item} className={`flex items-start gap-3 text-sm font-semibold ${index === 0 ? "text-neutral-700" : "text-neutral-300"}`}>
                        <span className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full ${index === 0 ? "bg-primary/10 text-primary" : "bg-primary-light/10 text-primary-light"}`}>
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ScreenshotCarousel screenshots={screenshots} projectKey={data.projectKey} />

      {longScreenshots.length > 0 ? (
        <FullPageGallery
          longScreenshots={longScreenshots}
          projectKey={data.projectKey}
          isBangla={isBangla}
        />
      ) : null}

      <section className="institutional-capabilities py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Core capabilities"
              title={isBangla ? "দেখতে ভালো—কিন্তু মূল শক্তি workflow-এ" : "Designed well, engineered around real workflows"}
              description={
                isBangla
                  ? "এই project-এর value শুধু visual design-এ নয়; content structure, access control, maintainability এবং recurring operations-এর মধ্যেও।"
                  : "The value of the project is not limited to visual design. It also comes from content structure, access control, maintainability and recurring operational workflows."
              }
              align="center"
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.capabilities.map((item, index) => {
              const Icon = iconMap[item.icon] || Settings2;
              return (
                <Reveal key={item.title} delay={index * 0.04}>
                  <div className="h-full rounded-2xl border border-neutral-300 bg-neutral-50 p-6 transition hover:border-primary/35 hover:shadow-md">
                    <Icon className="h-6 w-6 text-primary" />
                    <h3 className="mt-5 text-lg font-black text-neutral-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-neutral-600">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="engineering" className="institutional-engineering relative bg-neutral-900 py-20 text-neutral-50 sm:py-28">
        <div className="absolute inset-0 bg-dot-grid opacity-20" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow={data.engineering.overline}
                title={data.engineering.title}
                description={data.engineering.description}
                dark
              />

              <div className="mt-8 flex flex-wrap gap-2.5">
                {data.engineering.stack.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black text-neutral-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </Reveal>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {data.engineering.layers.map((layer, index) => {
                const icons = [PanelTop, LayoutDashboard, Database, Cloud];
                const Icon = icons[index] || Code2;
                return (
                  <Reveal key={layer.title} delay={index * 0.06}>
                    <div className="h-full bg-neutral-900 p-7 sm:p-8">
                      <Icon className="h-6 w-6 text-primary-light" />
                      <h3 className="mt-5 text-lg font-black text-neutral-50">{layer.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-neutral-400">{layer.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="institutional-outcomes bg-neutral-100 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Project outcome"
                title={isBangla ? "একটি live system, যা ভবিষ্যতেও expand করা যাবে" : "A live foundation built for long-term institutional growth"}
                description={
                  isBangla
                    ? "Fake vanity metrics ছাড়াই project-এর বাস্তব value হলো—public communication এবং content operations এখন একটি maintainable system-এর মধ্যে রয়েছে।"
                    : "Without relying on vanity metrics, the practical value is clear: public communication and content operations now live within one maintainable system."
                }
              />
            </Reveal>

            <div className="grid gap-4">
              {data.outcomes.map((outcome, index) => (
                <Reveal key={outcome} delay={index * 0.05}>
                  <div className="flex gap-4 rounded-2xl border border-neutral-300 bg-neutral-50 p-6">
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary-lightest text-sm font-black text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-1 text-sm font-semibold leading-7 text-neutral-700 sm:text-base">{outcome}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="institutional-contact px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
        <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-neutral-900 text-neutral-50 shadow-2xl">
          <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
            <div className="p-8 sm:p-12 lg:p-14">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-primary-light">{data.cta.overline}</p>
              <h2 className="mt-5 max-w-3xl text-3xl font-black leading-[1.08] sm:text-4xl lg:text-5xl">{data.cta.title}</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">{data.cta.description}</p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={data.cta.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => discussProject("final_cta")}
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-primary-light px-6 py-3.5 text-sm font-black text-neutral-900 transition hover:-translate-y-0.5 hover:bg-primary-light/90 hover:shadow-accent"
                >
                  {data.cta.primaryLabel}
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href={data.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => visitLive("final_cta")}
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-black text-neutral-50 transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  {data.cta.secondaryLabel}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="border-t border-white/10 bg-primary-lightest p-8 text-neutral-900 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <Globe2 className="h-8 w-8 text-primary" />
              <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-primary">Live reference</p>
              <h3 className="mt-3 text-2xl font-black">{data.name}</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{data.client.type}</p>
              <a
                href={data.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => visitLive("reference_card")}
                className="mt-8 inline-flex items-center gap-2 text-sm font-black text-primary transition hover:text-primary-dark"
              >
                Open {data.browserUrl}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
