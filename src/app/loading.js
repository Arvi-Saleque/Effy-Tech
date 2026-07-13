/* ============================================================
   Loading — Morphing constellation that forms the Effy Tech
   logo (three slanted bars with a hooked middle) → dissolves.
   Unique: not a spinner, not a bar. A generative node graph
   that pulses and morphs, with teal energy arcs.
   ============================================================ */

"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ── Node positions tracing the Effy Tech logo (normalized) ──
   Three slanted parallelogram bars. Top and bottom are
   identical parallelograms (sheared so the top edge sits
   slightly right of the bottom edge). The middle bar has a
   triangular hook extending DOWN-LEFT from its left side.
   ──────────────────────────────────────────────────────────── */
const E_NODES = [
  // ── Top bar (parallelogram outline, clockwise) ──
  { x: 0.32, y: 0.06 }, // 0  TL
  { x: 0.62, y: 0.06 }, // 1  T-mid
  { x: 0.94, y: 0.06 }, // 2  TR
  { x: 0.89, y: 0.24 }, // 3  BR
  { x: 0.57, y: 0.24 }, // 4  B-mid
  { x: 0.27, y: 0.24 }, // 5  BL

  // ── Middle bar with down-left hook ──
  { x: 0.42, y: 0.40 }, // 6  Body TL
  { x: 0.68, y: 0.40 }, // 7  Body T-mid
  { x: 0.94, y: 0.40 }, // 8  Body TR
  { x: 0.89, y: 0.58 }, // 9  Body BR
  { x: 0.62, y: 0.58 }, // 10 Body B-mid
  { x: 0.40, y: 0.58 }, // 11 Hook inner corner (where hook meets body bottom)
  { x: 0.25, y: 0.66 }, // 12 Hook mid-edge
  { x: 0.08, y: 0.74 }, // 13 Hook apex (down-left point)
  { x: 0.25, y: 0.57 }, // 14 Hook upper-edge mid (along slanted edge back to body TL)

  // ── Bottom bar (parallelogram outline, clockwise) ──
  { x: 0.32, y: 0.74 }, // 15 TL
  { x: 0.62, y: 0.74 }, // 16 T-mid
  { x: 0.94, y: 0.74 }, // 17 TR
  { x: 0.89, y: 0.92 }, // 18 BR
  { x: 0.57, y: 0.92 }, // 19 B-mid
  { x: 0.27, y: 0.92 }, // 20 BL
];

/* ── Random scatter positions ──────────────────────────────── */
const SCATTER = E_NODES.map(() => ({
  x: Math.random(),
  y: Math.random(),
}));

/* ── Connections (index pairs) tracing the logo outline ────── */
const EDGES = [
  // Top bar outline
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],

  // Middle bar body outline
  [6, 7], [7, 8], [8, 9], [9, 10], [10, 11],
  // Hook outline (down-left)
  [11, 12], [12, 13], [13, 14], [14, 6],

  // Bottom bar outline
  [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 15],
];

function MorphingConstellation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    const DPR = window.devicePixelRatio || 1;
    const SIZE = 200;

    canvas.width = SIZE * DPR;
    canvas.height = SIZE * DPR;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    ctx.scale(DPR, DPR);

    const PAD = 30;
    const W = SIZE - PAD * 2;
    const H = SIZE - PAD * 2;

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Phase cycles: scatter → form E → hold → scatter (4s loop)
      const cycle = (t % 4000) / 4000; // 0 → 1
      let morph;
      if (cycle < 0.3) {
        // Scatter → E (ease in)
        morph = easeInOutCubic(cycle / 0.3);
      } else if (cycle < 0.7) {
        // Hold E
        morph = 1;
      } else {
        // E → scatter (ease out)
        morph = 1 - easeInOutCubic((cycle - 0.7) / 0.3);
      }

      // Compute current positions
      const nodes = E_NODES.map((target, i) => {
        const scatter = SCATTER[i];
        return {
          x: PAD + (scatter.x + (target.x - scatter.x) * morph) * W,
          y: PAD + (scatter.y + (target.y - scatter.y) * morph) * H,
        };
      });

      // Draw edges
      EDGES.forEach(([a, b]) => {
        const na = nodes[a];
        const nb = nodes[b];
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `rgba(185,154,90, ${0.15 + morph * 0.25})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw energy pulse along edges
      const pulsePos = (t % 2000) / 2000;
      EDGES.forEach(([a, b], idx) => {
        if (idx % 3 !== Math.floor(t / 800) % 3) return;
        const na = nodes[a];
        const nb = nodes[b];
        const px = na.x + (nb.x - na.x) * pulsePos;
        const py = na.y + (nb.y - na.y) * pulsePos;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(185,154,90, ${0.4 + morph * 0.4})`;
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((n, i) => {
        // Glow
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 8);
        gradient.addColorStop(0, `rgba(185,154,90, ${0.2 + morph * 0.3})`);
        gradient.addColorStop(1, "rgba(185,154,90, 0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        const pulse = Math.sin(t * 0.003 + i * 0.5) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2 + pulse * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(185,154,90, ${0.6 + morph * 0.4})`;
        ctx.fill();
      });

      t += 16;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="block" aria-hidden="true" />;
}

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-surface-dark">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      {/* Morphing constellation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <MorphingConstellation />
      </motion.div>

      {/* Brand text */}
      <motion.div
        className="relative z-10 mt-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-sm font-medium text-neutral-500 tracking-[0.15em] uppercase">
          Loading
        </p>
        {/* Animated dots */}
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-1 w-1 rounded-full bg-primary-light"
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

