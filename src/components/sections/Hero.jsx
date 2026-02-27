/* ============================================================
   Hero — Full-viewport cinematic landing section
   ─────────────────────────────────────────────────
   • h-screen dark background with diagonal gradient overlay
   • Parallax background image (useScroll + useTransform)
   • Floating geometric shapes at different parallax speeds
   • Stagger-reveal text animations (variants + staggerChildren)
   • Magnetic hover CTA button
   • Bouncing scroll-indicator chevron
   • next/image priority for fast LCP
   • Parallax disabled on mobile / prefers-reduced-motion
   ============================================================ */

"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import siteConfig from "@/theme/siteConfig";
import MagneticButton from "./MagneticButton";

/* ── Animation variants ─────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Component ──────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  /* Detect mobile (disable parallax on small screens) */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const disableParallax = prefersReduced || isMobile;

  /* Scroll-linked parallax values */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Background image moves at 0.5× scroll speed
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Geometric shape moves at 0.3× speed (different layer)
  const shapeY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const shapeRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  // Second shape — opposite direction
  const shape2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const shape2Rotate = useTransform(scrollYProgress, [0, 1], [0, -30]);

  /* Split headline into words for stagger reveal */
  const headlineWords = ["We", "Build", "Digital", "Products", "That", "Scale"];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen overflow-hidden"
    >
      {/* ── Background Image + Gradient Overlay ─────────────── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={disableParallax ? {} : { y: bgY }}
      >
        {/* Dark hero background image — replace hero-bg.svg with a real .jpg/.webp for production */}
        <Image
          src="/images/hero-bg.svg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
          unoptimized
        />

        {/* Diagonal gradient overlay (dark ← teal tint) */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-black/95 via-neutral-900/90 to-primary-darkest/80" />

        {/* Extra dim layer for text contrast */}
        <div className="absolute inset-0 bg-neutral-black/30" />
      </motion.div>

      {/* ── Floating Geometric Shapes (parallax depth) ──────── */}
      {/* Shape 1: large teal ring — top-right */}
      <motion.div
        className="pointer-events-none absolute -top-20 right-[10%] z-[1] h-[200px] w-[200px] sm:h-[420px] sm:w-[420px] rounded-full border border-primary-light/10 opacity-40 md:opacity-60"
        style={disableParallax ? {} : { y: shapeY, rotate: shapeRotate }}
      />

      {/* Shape 2: smaller champagne diamond — bottom-left */}
      <motion.div
        className="pointer-events-none absolute bottom-[15%] -left-16 z-[1] h-24 w-24 sm:h-48 sm:w-48 rotate-45 rounded-2xl border border-accent/15 opacity-30 md:opacity-50"
        style={disableParallax ? {} : { y: shape2Y, rotate: shape2Rotate }}
      />

      {/* Shape 3: tiny teal dot cluster — mid-left */}
      <div className="pointer-events-none absolute left-[8%] top-[40%] z-[1] flex gap-3 opacity-20 md:opacity-40">
        <span className="block h-2 w-2 rounded-full bg-primary-light" />
        <span className="block h-3 w-3 rounded-full bg-primary-light/60" />
        <span className="block h-1.5 w-1.5 rounded-full bg-primary-light/40" />
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6">
        <motion.div
          className="max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow badge */}
          <motion.div variants={fadeUp} className="mb-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-light/20 bg-primary-light/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary-light backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-light animate-pulse" />
              Effy Tech
            </span>
          </motion.div>

          {/* Tagline — prominent display */}
          <motion.p
            variants={fadeUp}
            className="mb-8 text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide"
          >
            <span className="text-gradient-primary">{siteConfig.tagline}</span>
          </motion.p>

          {/* Headline — word-by-word stagger */}
          <motion.h1
            className="text-hero font-bold leading-[1.1] tracking-tight"
            variants={containerVariants}
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className={`inline-block mr-[0.3em] ${
                  word === "Digital" || word === "Products"
                    ? "text-gradient-primary"
                    : "text-text-inverse"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl"
          >
            {siteConfig.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <MagneticButton href="#projects" variant="primary" size="lg">
              View Our Work
            </MagneticButton>

            <MagneticButton href="#contact" variant="heroOutline" size="lg">
              Get in Touch
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* ── Scroll Indicator ────────────────────────────────── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <a
            href="#about"
            aria-label="Scroll to next section"
            className="flex flex-col items-center gap-2 text-neutral-500 hover:text-primary-light transition-colors"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
              Scroll
            </span>
            <motion.svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
