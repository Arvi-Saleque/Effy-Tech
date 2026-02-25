/* ============================================================
   Effy Tech — Color Palette
   Single source of truth for ALL colors in the application.
   Never hardcode hex/rgb values in components.
   Import this in Tailwind config & reference via CSS variables.

   Theme: Premium Corporate Tech — Deep Teal + Champagne accent
   ============================================================ */

const colors = {
  /* ── Brand / Primary (Deep Teal) ─────────────────────────── */
  primary: {
    lightest: "#CCFBF1",
    light: "#2DD4BF",
    DEFAULT: "#0F766E",
    dark: "#0D6560",
    darkest: "#134E4A",
  },

  /* ── Accent (Champagne / Warm Silver — subtle premium) ───── */
  accent: {
    lightest: "#F9F5F0",
    light: "#D4C5B0",
    DEFAULT: "#B8A88A",
    dark: "#9C8D72",
    darkest: "#7A6E58",
  },

  /* ── Neutrals (cool-toned, crisp corporate) ──────────────── */
  neutral: {
    white: "#FFFFFF",
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
    black: "#020617",
  },

  /* ── Semantic ────────────────────────────────────────────── */
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#0EA5E9",

  /* ── Surfaces & Backgrounds ──────────────────────────────── */
  bg: {
    DEFAULT: "#FAFAFA",
    alt: "#F1F5F9",
    dark: "#0F172A",
    overlay: "rgba(15, 23, 42, 0.6)",
  },

  /* ── Text ────────────────────────────────────────────────── */
  text: {
    DEFAULT: "#0F172A",
    secondary: "#475569",
    tertiary: "#94A3B8",
    inverse: "#FFFFFF",
  },

  /* ── Borders ─────────────────────────────────────────────── */
  border: {
    DEFAULT: "#E2E8F0",
    light: "#F1F5F9",
    dark: "#CBD5E1",
  },
};

export default colors;
