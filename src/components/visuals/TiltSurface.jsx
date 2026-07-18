"use client";

import { m } from "framer-motion";
import usePointerTilt from "@/hooks/usePointerTilt";

export default function TiltSurface({
  children,
  className = "",
  disabled = false,
  maxTilt = 4,
  perspective = 900,
  style,
  ...props
}) {
  const { isInteractive, onPointerLeave, onPointerMove, rotateX, rotateY } =
    usePointerTilt({ disabled, maxTilt });

  return (
    <m.div
      className={`effy-tilt-surface ${className}`}
      data-tilt={isInteractive ? "active" : "static"}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      style={{
        transformPerspective: perspective,
        rotateX,
        rotateY,
        willChange: isInteractive ? "transform" : "auto",
        ...style,
      }}
      {...props}
    >
      {children}
    </m.div>
  );
}
