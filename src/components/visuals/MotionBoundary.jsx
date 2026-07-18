"use client";

import { createContext, useContext } from "react";
import { domAnimation, LazyMotion, useReducedMotion } from "framer-motion";
import useCoarsePointer from "@/hooks/useCoarsePointer";

const SpatialMotionContext = createContext(null);

export function useSpatialMotion() {
  const context = useContext(SpatialMotionContext);
  const reducedMotion = Boolean(useReducedMotion());
  const coarsePointer = useCoarsePointer();

  return (
    context ?? {
      coarsePointer,
      reducedMotion,
      motionAllowed: !reducedMotion && !coarsePointer,
    }
  );
}

export default function MotionBoundary({
  children,
  className = "",
  allowTouchMotion = false,
  strict = true,
}) {
  const reducedMotion = Boolean(useReducedMotion());
  const coarsePointer = useCoarsePointer();
  const motionAllowed = !reducedMotion && (allowTouchMotion || !coarsePointer);
  const value = { coarsePointer, reducedMotion, motionAllowed };

  return (
    <LazyMotion features={domAnimation} strict={strict}>
      <SpatialMotionContext.Provider value={value}>
        <div
          className={`effy-motion-boundary ${className}`}
          data-motion={motionAllowed ? "active" : "static"}
          data-pointer={coarsePointer ? "coarse" : "fine"}
        >
          {children}
        </div>
      </SpatialMotionContext.Provider>
    </LazyMotion>
  );
}
