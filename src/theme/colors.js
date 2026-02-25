/* ============================================================
   Effy Tech — Color Palette
   Single source of truth for ALL colors in the application.
   Never hardcode hex/rgb values in components.
   Import this in Tailwind config & reference via CSS variables.

   Theme: Premium Emerald Green + Royal Gold on warm glossy white
   ============================================================ */

const colors = {
  /* ── Brand / Primary (Deep Emerald Green) ────────────────── */
  primary: {
    lightest: "#E6F5EC",
    light: "#5DAE8B",
    DEFAULT: "#1B6B4A",
    dark: "#145A3C",
    darkest: "#0D3D29",
  },

  /* ── Accent (Royal Gold — premium complement) ────────────── */
  accent: {
    lightest: "#FDF7E8",
    light: "#E8C96D",
    DEFAULT: "#C5A54E",
    dark: "#A68A3A",
    darkest: "#7A6528",
  },

  /* ── Neutrals (warm-tinted for glossy premium feel) ──────── */
  neutral: {
    white: "#FFFEF9",
    50: "#FAF9F6",
    100: "#F5F3EF",
    200: "#EBE8E2",
    300: "#D8D4CC",
    400: "#A8A29E",
    500: "#78716C",
    600: "#57534E",
    700: "#44403C",
    800: "#292524",
    900: "#1C1917",
    black: "#0C0A09",
  },

  /* ── Semantic ────────────────────────────────────────────── */
  success: "#22C55E",
  warning: "#E8C96D",
  error: "#DC2626",
  info: "#1B6B4A",

  /* ── Surfaces & Backgrounds (warm glossy whites) ─────────── */
  bg: {
    DEFAULT: "#FAFAF7",
    alt: "#F5F3EF",
    dark: "#0D3D29",
    overlay: "rgba(13, 61, 41, 0.6)",
  },

  /* ── Text ────────────────────────────────────────────────── */
  text: {
    DEFAULT: "#1C1917",
    secondary: "#57534E",
    tertiary: "#A8A29E",
    inverse: "#FFFEF9",
  },

  /* ── Borders ─────────────────────────────────────────────── */
  border: {
    DEFAULT: "#EBE8E2",
    light: "#F5F3EF",
    dark: "#D8D4CC",
  },
};

export default colors;
