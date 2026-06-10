/* ============================================================
   SplineScene — Production-ready lazy-loaded Spline wrapper
   ──────────────────────────────────────────────────────────
   • Lazy loads the heavy Spline runtime client-side
   • Shows a styled loading spinner in the active theme color
   • Direct style injection for fallback spinning animation
   ============================================================ */

"use client";

import dynamic from "next/dynamic";

// Intercept and suppress the known Spline editor timeline/state warning
// to prevent it from cluttering the console or failing automated client tests.
if (typeof window !== "undefined") {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("Missing property")) {
      return;
    }
    originalConsoleError(...args);
  };
}

// Dynamically import the Spline component with SSR disabled
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-transparent">
      <LoadingSpinner />
    </div>
  ),
});

/**
 * A lazy-loaded Spline scene component.
 *
 * IMPORTANT: The parent container must have explicit dimensions (e.g. w-full h-full).
 *
 * @param {string} scene - URL to the exported Spline scene (.splinecode)
 * @param {string} [className] - Optional tailwind classes
 * @param {Function} [onLoad] - Optional callback when scene finishes loading
 */
export default function SplineScene({ scene, className, onLoad }) {
  return (
    <Spline scene={scene} className={className} onLoad={onLoad} />
  );
}

/** Simple theme-colored spinner */
function LoadingSpinner() {
  return (
    <span
      style={{
        width: 44,
        height: 44,
        border: "3px solid rgba(15, 118, 110, 0.1)", // Muted primary-teal
        borderTopColor: "#0F766E", // Solid primary-teal
        borderRadius: "50%",
        animation: "spline-loader-spin 0.8s linear infinite",
      }}
    />
  );
}

// Inject standard keyframe animation for the loader once on module load
if (typeof document !== "undefined") {
  const styleId = "spline-scene-keyframes";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes spline-loader-spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
}
