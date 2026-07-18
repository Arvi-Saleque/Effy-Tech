"use client";

import Image from "next/image";
import { m } from "framer-motion";
import useElementVisibility from "@/hooks/useElementVisibility";
import { spatialLimits, spatialTiming } from "@/theme/spatialTokens";
import { useSpatialMotion } from "./MotionBoundary";

export default function FloatingAsset({
  alt,
  animate = true,
  className = "",
  delay = 0,
  distance = spatialLimits.maxFloatPx,
  duration = spatialTiming.idleMs / 1000,
  height = 800,
  priority = false,
  sizes = "(max-width: 768px) 82vw, 520px",
  src,
  width = 800,
}) {
  const { elementRef, isVisible } = useElementVisibility();
  const { motionAllowed } = useSpatialMotion();
  const shouldAnimate = animate && motionAllowed && isVisible;

  return (
    <m.figure
      ref={elementRef}
      className={`effy-floating-asset ${className}`}
      animate={shouldAnimate ? { y: [0, distance * -1, 0] } : { y: 0 }}
      transition={{
        delay,
        duration,
        ease: "easeInOut",
        repeat: shouldAnimate ? Infinity : 0,
      }}
      style={{ z: 24 }}
    >
      <Image
        alt={alt}
        height={height}
        priority={priority}
        sizes={sizes}
        src={src}
        width={width}
      />
    </m.figure>
  );
}
