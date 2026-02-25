/* ============================================================
   useCountUp — Animated number counter hook
   ─────────────────────────────────────────────────
   Counts from 0 → target when the element enters the viewport.
   Uses requestAnimationFrame for smooth 60fps animation.
   Fires only once (IntersectionObserver + once flag).
   ============================================================ */

"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef(null);

  const animate = useCallback(() => {
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration]);

  useEffect(() => {
    const node = ref.current;
    if (!node || hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [animate, hasTriggered]);

  return { count, ref };
}
