/* ============================================================
   Preloader — Initial splash screen on first site visit
   ─────────────────────────────────────────────────
   Morphing constellation: scattered nodes → form "E" → hold →
   text reveal → cinematic fade-out & scale-up exit.
   Shows once per session (sessionStorage guard).
   ============================================================ */

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Node positions for the "E" letter (normalized 0-1) ───── */
const E_NODES = [
  { x: 0.15, y: 0.08 },
  { x: 0.15, y: 0.28 },
  { x: 0.15, y: 0.5 },
  { x: 0.15, y: 0.72 },
  { x: 0.15, y: 0.92 },
  { x: 0.38, y: 0.08 },
  { x: 0.6, y: 0.08 },
  { x: 0.82, y: 0.08 },
  { x: 0.38, y: 0.5 },
  { x: 0.6, y: 0.5 },
  { x: 0.72, y: 0.5 },
  { x: 0.38, y: 0.92 },
  { x: 0.6, y: 0.92 },
  { x: 0.82, y: 0.92 },
];

const SCATTER = E_NODES.map(() => ({
  x: 0.5 + (Math.random() - 0.5) * 1.8,
  y: 0.5 + (Math.random() - 0.5) * 1.8,
}));

const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7],
  [2, 8], [8, 9], [9, 10],
  [4, 11], [11, 12], [12, 13],
  [1, 5], [3, 11], [8, 6], [10, 7], [9, 12],
  [0, 7], [4, 13], [2, 10],
];

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/* ── Canvas animation ──────────────────────────────────────── */
function ConstellationCanvas({ phase }) {
  const canvasRef = useRef(null);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const DPR = window.devicePixelRatio || 1;
    const SIZE = 240;
    canvas.width = SIZE * DPR;
    canvas.height = SIZE * DPR;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    ctx.scale(DPR, DPR);

    const PAD = 35;
    const W = SIZE - PAD * 2;
    const H = SIZE - PAD * 2;

    const draw = () => {
      const elapsed = Date.now() - startTime.current;
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Morph: 0→1 over 2 seconds
      const morph = Math.min(1, easeInOutCubic(Math.min(elapsed / 2000, 1)));

      // Compute current positions
      const nodes = E_NODES.map((target, i) => {
        const scatter = SCATTER[i];
        return {
          x: PAD + (scatter.x + (target.x - scatter.x) * morph) * W,
          y: PAD + (scatter.y + (target.y - scatter.y) * morph) * H,
        };
      });

      // Draw edges with glow
      EDGES.forEach(([a, b]) => {
        const na = nodes[a];
        const nb = nodes[b];

        // Glow line
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `rgba(45, 212, 191, ${0.04 + morph * 0.08})`;
        ctx.lineWidth = 4;
        ctx.stroke();

        // Crisp line
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `rgba(45, 212, 191, ${0.12 + morph * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Energy pulses traveling along edges
      const pulseT = (elapsed % 1500) / 1500;
      EDGES.forEach(([a, b], idx) => {
        const stagger = (idx * 0.07) % 1;
        const pos = (pulseT + stagger) % 1;
        const na = nodes[a];
        const nb = nodes[b];
        const px = na.x + (nb.x - na.x) * pos;
        const py = na.y + (nb.y - na.y) * pos;

        const grad = ctx.createRadialGradient(px, py, 0, px, py, 5);
        grad.addColorStop(0, `rgba(45, 212, 191, ${0.6 * morph})`);
        grad.addColorStop(1, "rgba(45, 212, 191, 0)");
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((n, i) => {
        // Outer glow
        const glowGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 14);
        glowGrad.addColorStop(0, `rgba(45, 212, 191, ${0.15 + morph * 0.2})`);
        glowGrad.addColorStop(1, "rgba(45, 212, 191, 0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Core dot — pulse
        const pulse = Math.sin(elapsed * 0.004 + i * 0.7) * 0.5 + 0.5;
        const radius = 2.5 + pulse * 1.5 + morph * 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${0.5 + morph * 0.5})`;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + morph * 0.5})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  return <canvas ref={canvasRef} className="block" aria-hidden="true" />;
}

/* ── Main Preloader ────────────────────────────────────────── */
export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState("morph"); // morph → reveal → exit
  const MIN_DISPLAY = 3200; // minimum ms to show
  const mountTime = useRef(Date.now());

  useEffect(() => {
    // Skip if already shown this session
    if (typeof window !== "undefined" && sessionStorage.getItem("preloaderShown")) {
      setVisible(false);
      return;
    }

    // Lock scroll
    document.body.style.overflow = "hidden";

    // Phase 1: constellation morphs into E (2s)
    // Phase 2: text reveals (1s)
    // Phase 3: exit after page is ready + minimum display

    const revealTimer = setTimeout(() => setPhase("reveal"), 2000);

    const handleReady = () => {
      const elapsed = Date.now() - mountTime.current;
      const remaining = Math.max(0, MIN_DISPLAY - elapsed);
      setTimeout(() => {
        setPhase("exit");
        setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = "";
          sessionStorage.setItem("preloaderShown", "1");
        }, 800); // exit animation duration
      }, remaining);
    };

    // Wait for window load
    if (document.readyState === "complete") {
      handleReady();
    } else {
      window.addEventListener("load", handleReady);
    }

    return () => {
      clearTimeout(revealTimer);
      window.removeEventListener("load", handleReady);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        key="preloader"
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-surface-dark"
        initial={{ opacity: 1 }}
        animate={
          phase === "exit"
            ? { opacity: 0, scale: 1.05 }
            : { opacity: 1, scale: 1 }
        }
        transition={
          phase === "exit"
            ? { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0 }
        }
      >
        {/* Deep background ambient */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/4 blur-[200px]" />
          <div className="absolute top-1/4 right-1/3 h-[300px] w-[300px] rounded-full bg-primary-light/3 blur-[150px]" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(45,212,191,0.5) 1px, transparent 0)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        {/* Constellation */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <ConstellationCanvas phase={phase} />
        </motion.div>

        {/* Brand text — appears in "reveal" phase */}
        <motion.div
          className="relative z-10 mt-8 text-center"
          initial={{ opacity: 0, y: 15 }}
          animate={
            phase === "reveal" || phase === "exit"
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 15 }
          }
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-inverse">
            Effy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary">
              Tech
            </span>
          </h1>
          <motion.p
            className="mt-2 text-sm text-neutral-500 tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            animate={
              phase === "reveal" || phase === "exit"
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Crafting Digital Excellence
          </motion.p>
        </motion.div>

        {/* Pulsing energy bar at bottom */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="h-1 w-6 sm:w-8 rounded-full bg-primary-light/30"
                animate={{
                  backgroundColor: [
                    "rgba(45,212,191,0.15)",
                    "rgba(45,212,191,0.6)",
                    "rgba(45,212,191,0.15)",
                  ],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Corner accents */}
        <div className="absolute top-6 left-6 h-8 w-8 border-l border-t border-primary-light/10" />
        <div className="absolute top-6 right-6 h-8 w-8 border-r border-t border-primary-light/10" />
        <div className="absolute bottom-6 left-6 h-8 w-8 border-l border-b border-primary-light/10" />
        <div className="absolute bottom-6 right-6 h-8 w-8 border-r border-b border-primary-light/10" />
      </motion.div>
    </AnimatePresence>
  );
}
