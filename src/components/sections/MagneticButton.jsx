/* ============================================================
   MagneticButton — CTA button with magnetic cursor-follow effect
   ─────────────────────────────────────────────────
   On hover the button subtly shifts toward the cursor position.
   Built on Framer Motion's useMotionValue + useSpring.
   Falls back to static on touch devices / prefers-reduced-motion.
   Supports same variants as Button (+ heroOutline for dark BG).
   ============================================================ */

"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";

const variantStyles = {
  primary:
    "bg-primary text-text-inverse hover:bg-primary-dark active:bg-primary-darkest shadow-md hover:shadow-lg",
  heroOutline:
    "bg-transparent border-2 border-neutral-400/40 text-text-inverse hover:border-primary-light hover:text-primary-light",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3.5 text-lg",
};

const MAGNETIC_STRENGTH = 0.35; // 0 = none, 1 = follows cursor entirely

export default function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  ...props
}) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * MAGNETIC_STRENGTH);
    y.set(dy * MAGNETIC_STRENGTH);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-[var(--transition-base)] cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2";

  const classes = `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size]} ${className}`;

  const motionProps = {
    ref,
    className: classes,
    style: prefersReduced ? {} : { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: handleMouseLeave,
    whileTap: { scale: 0.97 },
  };

  if (href) {
    return (
      <motion.a href={href} {...motionProps} {...props}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}
