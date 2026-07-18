/*
 * JavaScript-side limits for the Phase 02 spatial components and hooks.
 * CSS presentation values live in src/styles/spatial-foundation.css.
 */

export const spatialLimits = Object.freeze({
  maxTiltDegrees: 4,
  maxParallaxPx: 14,
  maxFloatPx: 8,
  maxAnimatedObjects: Object.freeze({ desktop: 3, mobile: 1 }),
});

export const spatialTiming = Object.freeze({
  fastMs: 160,
  baseMs: 280,
  slowMs: 520,
  idleMs: 6000,
});

export const spatialPerformanceBudget = Object.freeze({
  mobileLcpMs: 2500,
  interactionLatencyMs: 200,
  maxCumulativeLayoutShift: 0.1,
  homepageJavaScriptGzipKb: 145,
  firstViewportAssetKb: Object.freeze({ desktop: 220, mobile: 120 }),
});
