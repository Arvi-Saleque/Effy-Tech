/* ============================================================
   Loading — Morphing constellation that forms "E" → dissolves
   Unique: not a spinner, not a bar. A generative node graph
   that pulses and morphs, with teal energy arcs.
   ============================================================ */

"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ── Node positions for the "E" letter (normalized 0-1) ───── */
const E_NODES = [
  // Left vertical bar
  { x: 0.2, y: 0.1 },
  { x: 0.2, y: 0.3 },
  { x: 0.2, y: 0.5 },
  { x: 0.2, y: 0.7 },
  { x: 0.2, y: 0.9 },
  // Top horizontal
  { x: 0.4, y: 0.1 },
  { x: 0.6, y: 0.1 },
  { x: 0.8, y: 0.1 },
  // Middle horizontal
  { x: 0.4, y: 0.5 },
  { x: 0.6, y: 0.5 },
  { x: 0.7, y: 0.5 },
  // Bottom horizontal
  { x: 0.4, y: 0.9 },
  { x: 0.6, y: 0.9 },
  { x: 0.8, y: 0.9 },
];

/* ── Random scatter positions ──────────────────────────────── */
const SCATTER = E_NODES.map(() => ({
  x: Math.random(),
  y: Math.random(),
}));

/* ── Connections (index pairs) for the E shape ─────────────── */
const EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4], // vertical
  [0, 5],
  [5, 6],
  [6, 7], // top
  [2, 8],
  [8, 9],
  [9, 10], // middle
  [4, 11],
  [11, 12],
  [12, 13], // bottom
  // Cross connections for visual interest
  [1, 5],
  [3, 11],
  [8, 6],
  [10, 7],
  [9, 12],
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
        ctx.strokeStyle = `rgba(45, 212, 191, ${0.15 + morph * 0.25})`;
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
        ctx.fillStyle = `rgba(45, 212, 191, ${0.4 + morph * 0.4})`;
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((n, i) => {
        // Glow
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 8);
        gradient.addColorStop(0, `rgba(45, 212, 191, ${0.2 + morph * 0.3})`);
        gradient.addColorStop(1, "rgba(45, 212, 191, 0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        const pulse = Math.sin(t * 0.003 + i * 0.5) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2 + pulse * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${0.6 + morph * 0.4})`;
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
