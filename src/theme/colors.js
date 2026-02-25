/* ============================================================
   Effy Tech — Color Palette
   Single source of truth for ALL colors in the application.
   Never hardcode hex/rgb values in components.
   Import this in Tailwind config & reference via CSS variables.
   ============================================================ */

const colors = {
  /* ── Brand / Primary (Emerald) ───────────────────────────── */
  primary: {
    lightest: "#D1FAE5",
    light: "#34D399",
    DEFAULT: "#10B981",
    dark: "#059669",
    darkest: "#065F46",
  },

  /* ── Accent (Deep Indigo — contrast complement) ──────────── */
  accent: {
    light: "#818CF8",
    DEFAULT: "#4F46E5",
    dark: "#3730A3",
  },

  /* ── Neutrals ────────────────────────────────────────────── */
  neutral: {
    white: "#FFFFFF",
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
    black: "#000000",
  },

  /* ── Semantic ────────────────────────────────────────────── */
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",

  /* ── Surfaces & Backgrounds ──────────────────────────────── */
  bg: {
    DEFAULT: "#FFFFFF",
    alt: "#F9FAFB",
    dark: "#111827",
    overlay: "rgba(0, 0, 0, 0.5)",
  },

  /* ── Text ────────────────────────────────────────────────── */
  text: {
    DEFAULT: "#111827",
    secondary: "#6B7280",
    tertiary: "#9CA3AF",
    inverse: "#FFFFFF",
  },

  /* ── Borders ─────────────────────────────────────────────── */
  border: {
    DEFAULT: "#E5E7EB",
    light: "#F3F4F6",
    dark: "#D1D5DB",
  },
};

export default colors;
