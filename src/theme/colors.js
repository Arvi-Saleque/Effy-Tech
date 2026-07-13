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
    lightest: "#faf6eb",
    light: "#d2bd86",
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

  /* ── Neutrals (warm graphite green — premium corporate) ──── */
  neutral: {
    white: "#FFFFFF",
    50: "#fafbf9",
    100: "#f0f2ee",
    200: "#e2e4e0",
    300: "#c2c6be",
    400: "#8c9388",
    500: "#676e64",
    600: "#4a5247",
    700: "#343b31",
    800: "#2c332b",
    900: "#22271f",
    black: "#171c15",
  },

  /* ── Semantic ────────────────────────────────────────────── */
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#0EA5E9",

  /* ── Surfaces & Backgrounds ──────────────────────────────── */
  bg: {
    DEFAULT: "#faf8f2",
    alt: "#f3f0e6",
    dark: "#22271f",
    overlay: "rgba(34, 39, 31, 0.6)",
  },

  /* ── Text ────────────────────────────────────────────────── */
  text: {
    DEFAULT: "#22271f",
    secondary: "#5f665d",
    tertiary: "#7a8175",
    inverse: "#FFFFFF",
  },

  /* ── Borders ─────────────────────────────────────────────── */
  border: {
    DEFAULT: "#e2e4e0",
    light: "#f0f2ee",
    dark: "#c2c6be",
  },
};

export default colors;
