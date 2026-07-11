"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";

const tourSlides = [
  { id: "home", label: "Home", src: "/images/amal/long-images/01_home.jpg" },
  { id: "prayer", label: "Prayer Tracker", src: "/images/amal/long-images/02_prayer.jpg" },
  { id: "kaza-1", label: "Kaza Overview", src: "/images/amal/long-images/03_kaza_1.jpg" },
  { id: "kaza-2", label: "Kaza Details", src: "/images/amal/long-images/04_kaza_2.jpg" },
  { id: "kaza-3", label: "Kaza Progress", src: "/images/amal/long-images/05_kaza_3.jpg" },
  { id: "amal", label: "Daily Amal", src: "/images/amal/long-images/06_amal.jpg" },
  { id: "dhikr", label: "Dhikr Tracker", src: "/images/amal/long-images/07_dhikir.jpg" },
  { id: "reading", label: "Reading Tracker", src: "/images/amal/long-images/08_reading.jpg" },
  { id: "dua-1", label: "Dua Library", src: "/images/amal/long-images/09_dua_1.jpg" },
  { id: "dua-2", label: "Dua Index", src: "/images/amal/long-images/10_dua_2.jpg" },
  { id: "dua-3", label: "Dua Details", src: "/images/amal/long-images/11_dua_3.jpg" },
  { id: "reflection", label: "Reflection", src: "/images/amal/long-images/12_reflection.jpg" },
  { id: "stat-daily", label: "Daily Insights", src: "/images/amal/long-images/13_stat_daily.jpg" },
  { id: "stat-weekly", label: "Weekly Insights", src: "/images/amal/long-images/14_stat_weekly.jpg" },
  { id: "stat-monthly", label: "Monthly Insights", src: "/images/amal/long-images/15_stat_monthly.jpg" },
  { id: "reminder-1", label: "Smart Reminders", src: "/images/amal/long-images/16_rem_1.jpg" },
  { id: "reminder-2", label: "Reminder Setup", src: "/images/amal/long-images/17_rem_2.jpg" },
  { id: "reminder-3", label: "Reminder Modes", src: "/images/amal/long-images/18_rem_3.jpg" },
  { id: "reminder-4", label: "Reminder Mission", src: "/images/amal/long-images/19_rem_4.jpg" },
  { id: "routine", label: "Smart Routine", src: "/images/amal/long-images/20_routine.jpg" },
  { id: "app-guide", label: "App Guide", src: "/images/amal/long-images/21_appguide.jpg" },
];

function cancelScrollAnimation(animationRef) {
  if (!animationRef.current) return;
  cancelAnimationFrame(animationRef.current);
  animationRef.current = null;
}

function animateScroll(element, target, duration, animationRef) {
  cancelScrollAnimation(animationRef);

  const start = element.scrollTop;
  const distance = target - start;

  if (Math.abs(distance) < 2) return;

  const startedAt = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    element.scrollTop = start + distance * eased;

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(tick);
    } else {
      animationRef.current = null;
    }
  };

  animationRef.current = requestAnimationFrame(tick);
}

export default function IAMAppTour({ appName }) {
  const [current, setCurrent] = useState(0);
  const previewRef = useRef(null);
  const animationRef = useRef(null);
  const gestureStart = useRef(null);

  const total = tourSlides.length;
  const slide = tourSlides[current];

  const resetPreview = useCallback(() => {
    cancelScrollAnimation(animationRef);
    if (previewRef.current) previewRef.current.scrollTop = 0;
  }, []);

  const goTo = useCallback(
    (index) => {
      setCurrent((index + total) % total);
      requestAnimationFrame(resetPreview);
    },
    [resetPreview, total],
  );

  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);
  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const adjacent = [
      tourSlides[(current + 1) % total],
      tourSlides[(current - 1 + total) % total],
    ];

    adjacent.forEach((item) => {
      const image = new Image();
      image.src = item.src;
    });
  }, [current, total]);

  useEffect(() => {
    return () => cancelScrollAnimation(animationRef);
  }, []);

  const handleMouseEnter = () => {
    const element = previewRef.current;
    if (!element || window.matchMedia("(hover: none)").matches) return;

    const maxScroll = Math.max(0, element.scrollHeight - element.clientHeight);
    if (maxScroll <= 1) return;

    const duration = Math.min(16000, Math.max(3200, maxScroll * 2.4));
    animateScroll(element, maxScroll, duration, animationRef);
  };

  const handleMouseLeave = () => {
    const element = previewRef.current;
    if (!element || window.matchMedia("(hover: none)").matches) return;

    const duration = Math.min(2200, Math.max(800, element.scrollTop * 0.42));
    animateScroll(element, 0, duration, animationRef);
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    gestureStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    const start = gestureStart.current;
    const touch = event.changedTouches[0];
    gestureStart.current = null;

    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) < 55 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) {
      return;
    }

    if (deltaX > 0) goPrev();
    else goNext();
  };

  return (
    <div id="iam-tour" className="mx-auto w-full max-w-[500px]">
      <div className="mb-5 flex items-stretch gap-2.5 px-0.5">
        <label className="relative min-w-0 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/80 shadow-[0_12px_34px_rgba(0,0,0,0.24)] backdrop-blur">
          <span className="pointer-events-none absolute left-4 top-2 text-[8px] font-bold uppercase tracking-[0.2em] text-primary-light/70">
            Explore App Screens
          </span>
          <select
            value={current}
            onChange={(event) => goTo(Number(event.target.value))}
            className="h-[54px] w-full appearance-none bg-transparent pb-1 pl-4 pr-11 pt-5 text-[12px] font-bold text-neutral-100 outline-none"
            aria-label="Choose an app screen"
          >
            {tourSlides.map((item, index) => (
              <option key={item.id} value={index}>
                {String(index + 1).padStart(2, "0")} — {item.label}
              </option>
            ))}
          </select>
          <HiChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-light" />
        </label>

        <div className="flex h-[54px] shrink-0 flex-col items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 px-3.5 text-primary-light">
          <span className="text-[13px] font-black leading-none">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[8px] font-bold tracking-[0.14em] text-primary-light/60">
            OF {total}
          </span>
        </div>
      </div>

      <div className="relative isolate flex justify-center">
        <div className="pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[58%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[70px]" />
        <div className="pointer-events-none absolute inset-x-[16%] bottom-[2%] -z-10 h-16 rounded-full bg-black/65 blur-2xl" />

        <button
          type="button"
          onClick={goPrev}
          className="absolute left-0 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-neutral-950/88 text-neutral-100 shadow-[0_12px_30px_rgba(0,0,0,0.5)] backdrop-blur transition hover:border-primary/50 hover:text-primary-light active:scale-95 sm:left-1"
          aria-label="Previous app screen"
        >
          <HiChevronLeft className="h-5 w-5" />
        </button>

        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 16, scale: 0.992 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-[min(92vw,410px)]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative rounded-[2.4rem] border-[7px] border-[#202631] bg-[#080b10] p-[5px] shadow-[0_30px_90px_rgba(0,0,0,0.58)] ring-1 ring-white/10">
            <div className="absolute left-1/2 top-[9px] z-20 h-[19px] w-[82px] -translate-x-1/2 rounded-full bg-[#080b10] shadow-[0_1px_0_rgba(255,255,255,0.04)]" />

            <div
              ref={previewRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onWheel={() => cancelScrollAnimation(animationRef)}
              className="iam-long-tour-scroll relative overflow-y-auto overscroll-contain rounded-[1.82rem] bg-[#f7f4ec] touch-pan-y"
              style={{
                aspectRatio: "9 / 19.5",
              }}
              aria-label={`${appName} ${slide.label} preview`}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") goPrev();
                if (event.key === "ArrowRight") goNext();
              }}
            >
              <img
                src={slide.src}
                alt={`${appName} — ${slide.label}`}
                className="block h-auto w-full select-none"
                draggable="false"
                loading={current < 2 ? "eager" : "lazy"}
              />
            </div>

            <div className="pointer-events-none absolute inset-x-4 bottom-2.5 z-10 h-12 rounded-b-[1.55rem] bg-gradient-to-t from-black/50 to-transparent" />
            <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 h-1 w-16 -translate-x-1/2 rounded-full bg-white/70" />
          </div>
        </motion.div>

        <button
          type="button"
          onClick={goNext}
          className="absolute right-0 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-neutral-950/88 text-neutral-100 shadow-[0_12px_30px_rgba(0,0,0,0.5)] backdrop-blur transition hover:border-primary/50 hover:text-primary-light active:scale-95 sm:right-1"
          aria-label="Next app screen"
        >
          <HiChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto mt-3 flex w-[min(78vw,330px)] items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
            animate={{ width: `${((current + 1) / total) * 100}%` }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          />
        </div>
        <span className="shrink-0 text-[9px] font-medium text-neutral-500">
          Swipe · Scroll
        </span>
      </div>

      <style>{`
        #iam-tour {
          scroll-margin-top: 88px;
        }

        .iam-long-tour-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .iam-long-tour-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
