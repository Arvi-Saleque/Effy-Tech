"use client";

import { useCallback, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { spatialLimits } from "@/theme/spatialTokens";
import { useSpatialMotion } from "@/components/visuals/MotionBoundary";

const spring = { stiffness: 180, damping: 24, mass: 0.7 };

export default function usePointerTilt({
  maxTilt = spatialLimits.maxTiltDegrees,
  disabled = false,
} = {}) {
  const { motionAllowed } = useSpatialMotion();
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, spring);
  const rotateY = useSpring(rotateYValue, spring);
  const isInteractive = motionAllowed && !disabled;

  const reset = useCallback(() => {
    rotateXValue.set(0);
    rotateYValue.set(0);
  }, [rotateXValue, rotateYValue]);

  const onPointerMove = useCallback(
    (event) => {
      if (!isInteractive || event.pointerType === "touch") return;

      const bounds = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      rotateXValue.set(y * maxTilt * -2);
      rotateYValue.set(x * maxTilt * 2);
    },
    [isInteractive, maxTilt, rotateXValue, rotateYValue],
  );

  useEffect(() => {
    if (!isInteractive) reset();
  }, [isInteractive, reset]);

  return {
    isInteractive,
    onPointerMove,
    onPointerLeave: reset,
    rotateX,
    rotateY,
  };
}
