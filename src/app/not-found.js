/* ============================================================
   404 — Page not found
   Cinematic glitch + floating particles, dark teal theme.
   ============================================================ */

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ── Tiny floating particle canvas ─────────────────────────── */
function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.2,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        hue: 160 + Math.random() * 20, // teal range
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.opacity})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });

      // Draw faint connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(45, 212, 191, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

/* ── Glitch text keyframes (inline style) ──────────────────── */
const glitchKeyframes = `
@keyframes glitch-1 {
  0%, 100% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 2px); }
  20%      { clip-path: inset(92% 0 1% 0);  transform: translate(1px, -1px); }
  40%      { clip-path: inset(43% 0 1% 0);  transform: translate(-1px, 3px); }
  60%      { clip-path: inset(25% 0 58% 0); transform: translate(2px, 1px); }
  80%      { clip-path: inset(54% 0 7% 0);  transform: translate(-2px, -3px); }
}
@keyframes glitch-2 {
  0%, 100% { clip-path: inset(65% 0 13% 0); transform: translate(2px, -1px); }
  20%      { clip-path: inset(8% 0 76% 0);  transform: translate(-1px, 2px); }
  40%      { clip-path: inset(30% 0 35% 0); transform: translate(1px, -2px); }
  60%      { clip-path: inset(75% 0 2% 0);  transform: translate(-2px, 1px); }
  80%      { clip-path: inset(12% 0 59% 0); transform: translate(2px, 3px); }
}
`;

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-surface-dark">
      <style dangerouslySetInnerHTML={{ __html: glitchKeyframes }} />

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary/8 blur-[180px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-error/5 blur-[120px]" />
      </div>

      <ParticleField />

      {/* Glitch 404 */}
      <div className="relative z-10 select-none">
        <motion.h1
          className="text-[10rem] sm:text-[14rem] md:text-[18rem] font-black leading-none tracking-tighter text-transparent"
          style={{
            WebkitTextStroke: "2px rgba(45, 212, 191, 0.3)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          404
        </motion.h1>

        {/* Glitch layers */}
        <span
          className="absolute inset-0 text-[10rem] sm:text-[14rem] md:text-[18rem] font-black leading-none tracking-tighter text-primary-light/20"
          style={{ animation: "glitch-1 3s infinite linear alternate-reverse" }}
          aria-hidden="true"
        >
          404
        </span>
        <span
          className="absolute inset-0 text-[10rem] sm:text-[14rem] md:text-[18rem] font-black leading-none tracking-tighter text-error/15"
          style={{
            animation: "glitch-2 2.5s infinite linear alternate-reverse",
          }}
          aria-hidden="true"
        >
          404
        </span>
      </div>

      {/* Message */}
      <motion.div
        className="relative z-10 mt-4 text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-lg sm:text-xl font-medium text-neutral-300">
          This page has drifted into the void
        </p>
        <p className="mt-2 text-sm text-neutral-500 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved
          to a different dimension.
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Link
          href="/"
          className="group relative inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-neutral-100 transition-all hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(45,212,191,0.2)]"
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Go Home
        </Link>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-400 transition-all hover:border-neutral-600 hover:text-neutral-200 hover:bg-neutral-800/50"
        >
          View Projects
        </Link>
      </motion.div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-light/20 to-transparent" />
    </div>
  );
}
