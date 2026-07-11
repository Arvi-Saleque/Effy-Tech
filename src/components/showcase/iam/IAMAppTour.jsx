"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiPause,
  HiPlay,
  HiSpeakerWave,
  HiSpeakerXMark,
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

function PhoneTour({ appName }) {
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
    return () => cancelScrollAnimation(animationRef);
  }, []);

  const handleMouseEnter = () => {
    const element = previewRef.current;
    if (!element || window.matchMedia("(hover: none)").matches) return;

    const maxScroll = Math.max(0, element.scrollHeight - element.clientHeight);
    if (maxScroll <= 1) return;

    const duration = Math.min(12000, Math.max(2600, maxScroll * 2.5));
    animateScroll(element, maxScroll, duration, animationRef);
  };

  const handleMouseLeave = () => {
    const element = previewRef.current;
    if (!element || window.matchMedia("(hover: none)").matches) return;

    const duration = Math.min(1800, Math.max(700, element.scrollTop * 0.45));
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
    <div className="mx-auto w-full max-w-[430px]">
      <div className="mb-2.5 flex items-end justify-between gap-4 px-1">
        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-primary-light/70">
            App Tour
          </p>
          <h2 className="mt-0.5 truncate text-[15px] font-bold text-neutral-100">
            {slide.label}
          </h2>
        </div>

        <span className="shrink-0 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary-light">
          {String(current + 1).padStart(2, "0")} / {total}
        </span>
      </div>

      <div className="relative mx-auto flex w-full items-center justify-center">
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-0 z-20 grid h-10 w-10 place-items-center rounded-full border border-neutral-600/50 bg-neutral-950/85 text-neutral-200 shadow-[0_10px_28px_rgba(0,0,0,0.42)] backdrop-blur transition hover:border-primary/50 hover:text-primary-light active:scale-95 sm:left-2"
          aria-label="Previous app screen"
        >
          <HiChevronLeft className="h-5 w-5" />
        </button>

        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 14, scale: 0.99 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-[min(74vw,292px)] sm:w-[304px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative rounded-[2.25rem] border-[6px] border-[#202632] bg-[#070a10] p-[5px] shadow-[0_28px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
            <div className="absolute left-1/2 top-[9px] z-20 h-[18px] w-[78px] -translate-x-1/2 rounded-full bg-[#070a10]" />

            <div
              ref={previewRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onWheel={() => cancelScrollAnimation(animationRef)}
              className="iam-long-tour-scroll relative overflow-y-auto overscroll-contain rounded-[1.75rem] bg-[#f7f4ec] touch-pan-y"
              style={{ height: "clamp(330px, 45svh, 438px)" }}
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

            <div className="pointer-events-none absolute inset-x-4 bottom-2.5 z-10 h-12 rounded-b-[1.45rem] bg-gradient-to-t from-black/55 to-transparent" />
            <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 h-1 w-16 -translate-x-1/2 rounded-full bg-white/65" />
          </div>
        </motion.div>

        <button
          type="button"
          onClick={goNext}
          className="absolute right-0 z-20 grid h-10 w-10 place-items-center rounded-full border border-neutral-600/50 bg-neutral-950/85 text-neutral-200 shadow-[0_10px_28px_rgba(0,0,0,0.42)] backdrop-blur transition hover:border-primary/50 hover:text-primary-light active:scale-95 sm:right-2"
          aria-label="Next app screen"
        >
          <HiChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-2.5 flex items-center justify-center gap-1">
        {tourSlides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === current
                ? "w-5 bg-primary-light"
                : "w-1.5 bg-neutral-700 hover:bg-neutral-500"
            }`}
            aria-label={`View ${item.label}`}
          />
        ))}
      </div>

      <p className="mt-1.5 text-center text-[9px] font-medium text-neutral-500">
        Hover to explore · Swipe between screens · Scroll inside on mobile
      </p>

      <style>{`
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

function PromoVideo({ videoSrc = "/videos/amal/promo-web.mp4" }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
      return;
    }

    video.pause();
    setPlaying(false);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div className="mx-auto w-full max-w-[430px] overflow-hidden rounded-2xl border border-neutral-700/40 bg-neutral-950 shadow-[0_18px_55px_rgba(0,0,0,0.38)]">
      <div className="relative h-[clamp(125px,18svh,168px)] overflow-hidden bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.14),transparent_68%)]">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="h-full w-full object-contain"
          aria-label="Islamic Amal Tracker promotional video"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        <div className="absolute inset-x-3 bottom-2.5 flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/10 bg-black/55 px-3 py-1.5 text-[9px] font-semibold text-white/85 backdrop-blur">
            30-sec product preview
          </span>

          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={togglePlay}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
              aria-label={playing ? "Pause video" : "Play video"}
            >
              {playing ? <HiPause className="h-4 w-4" /> : <HiPlay className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
              aria-label={muted ? "Unmute video" : "Mute video"}
            >
              {muted ? (
                <HiSpeakerXMark className="h-4 w-4" />
              ) : (
                <HiSpeakerWave className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IAMAppTour({ appName }) {
  return (
    <div id="iam-tour" className="w-full">
      <PhoneTour appName={appName} />
      <div className="mt-2.5">
        <PromoVideo />
      </div>
    </div>
  );
}
