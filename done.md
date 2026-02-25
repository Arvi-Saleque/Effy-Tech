# Effy Tech — Development Progress Log

> This file tracks completed sections, what was built, and which files were touched.

---

## 1. Project Setup & Scaffolding

**Status:** ✅ Completed

**What was done:**

- Initialized Next.js 15 project (App Router) with Tailwind CSS v4, Framer Motion, React Icons
- Created folder structure: `components/ui`, `components/layout`, `theme`, `hooks`, `data`
- Set up path alias `@/*` → `./src/*` via `jsconfig.json`
- Configured PostCSS with `@tailwindcss/postcss`
- Added Prettier for formatting (`.prettierrc`)
- Created `.gitignore` and `README.md`
- Pushed initial commit to GitHub

**Files created/modified:**

| File | Purpose |
|------|---------|
| `package.json` | Project deps & scripts |
| `jsconfig.json` | Path alias `@/*` |
| `postcss.config.mjs` | Tailwind v4 PostCSS plugin |
| `.prettierrc` | Code formatting rules |
| `.gitignore` | Git ignore rules |
| `README.md` | Project documentation |

---

## 2. Theme System (Centralized Design Tokens)

**Status:** ✅ Completed

**What was done:**

- Built a centralized color palette in `colors.js` — single source of truth, zero hardcoded hex values in components
- Created typography config (`typography.js`) for font families, sizes, weights
- Created site config (`siteConfig.js`) for brand data, nav links, socials, categories
- Defined all CSS custom properties via Tailwind v4 `@theme {}` block in `globals.css`
- Utility classes: `.text-gradient-primary`, `.text-gradient-accent`, `.bg-gradient-hero`, `.bg-glossy`, `.glass`, `.glass-dark`

**Current Theme: Corporate Tech — Deep Teal + Champagne**

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#0F766E` (Deep Teal) | Buttons, links, accents |
| Accent | `#B8A88A` (Champagne) | Secondary highlights, badges |
| Neutrals | Slate 50–900 | Text, borders, backgrounds |
| Surface | `#FAFAFA` clean white | Page background |
| Hero BG | Charcoal → Deep Teal gradient | Hero section |

**Files created/modified:**

| File | Purpose |
|------|---------|
| `src/theme/colors.js` | All color values (primary, accent, neutrals, semantic, surfaces, text, borders) |
| `src/theme/typography.js` | Font families, sizes, weights, line-heights |
| `src/theme/siteConfig.js` | Company name, tagline, nav links, socials, contact, categories, footer |
| `src/app/globals.css` | Tailwind v4 `@theme` tokens, base reset, utility classes |

---

## 3. Reusable UI Components

**Status:** ✅ Completed

**What was done:**

- Built 10 reusable UI components, all using theme tokens (no hardcoded colors)
- Barrel export via `index.js` for clean imports
- All components accept `className` prop for composition

**Files created/modified:**

| File | Purpose |
|------|---------|
| `src/components/ui/Button.jsx` | Variants: primary, secondary, outline, ghost, accent. Sizes: sm/md/lg. Renders `<Link>` or `<button>` |
| `src/components/ui/Badge.jsx` | Category pills. Variants: solid, outline, accent. Sizes: sm/md |
| `src/components/ui/Card.jsx` | Project card with image, title, description, category badge, tags, hover animation |
| `src/components/ui/Logo.jsx` | Brand logo using `/images/logo.png` + text. Sizes: sm/md/lg. Light/dark mode |
| `src/components/ui/FilterBar.jsx` | Category filter tabs with animated active indicator (framer-motion layoutId) |
| `src/components/ui/SearchInput.jsx` | Styled search input field |
| `src/components/ui/SectionWrapper.jsx` | Consistent section container with max-width, padding, anchor ID |
| `src/components/ui/SectionHeading.jsx` | Section title + subtitle with alignment control |
| `src/components/ui/SocialLinks.jsx` | Social media icon row (GitHub, LinkedIn, Twitter, etc.) using react-icons |
| `src/components/ui/ImagePlaceholder.jsx` | Dev placeholder for missing images |
| `src/components/ui/index.js` | Barrel export for all UI components |

---

## 4. Data & Hooks

**Status:** ✅ Completed

**What was done:**

- Created sample project data for the showcase section
- Built a custom filtering hook for category-based filtering

**Files created/modified:**

| File | Purpose |
|------|---------|
| `src/data/projects.js` | Sample project data array (title, description, category, tags, image, link) |
| `src/hooks/useFilter.js` | Custom hook: accepts items[] + categoryKey, returns filteredItems, activeCategory, setCategory, categories |

---

## 5. Navbar + Search + Mobile Menu

**Status:** ✅ Completed

**What was done:**

- Fixed navbar with transparent → solid background transition on scroll (~80px)
- Nav links always visible: white text over hero, dark text after scroll
- Search icon opens a command-palette-style overlay (⌘K shortcut supported)
- Hamburger icon on mobile opens full-screen overlay with stagger-animated links
- Uses actual `logo.png` from assets
- Body scroll locked when overlays are open

**Files created/modified:**

| File | Purpose |
|------|---------|
| `src/components/layout/Navbar.jsx` | Fixed navbar — transparent on hero, `bg-white/90 blur` after scroll. Logo + nav links + search + hamburger |
| `src/components/layout/CommandPalette.jsx` | ⌘K search overlay — centered input, cross icon to close, backdrop blur |
| `src/components/layout/MobileMenu.jsx` | Full-screen dark overlay — stagger-animated large nav links, teal gradient CTA, social links |
| `src/app/layout.js` | Root layout — imports Navbar, wraps children |
| `public/images/logo.png` | Actual company logo image |
| `src/app/icon.png` | Favicon (copy of logo) |

---

## 6. Corporate Theme Rework (Green+Gold → Deep Teal + Champagne)

**Status:** ✅ Completed

**What was done:**

- Complete palette redesign from luxury green+gold to professional corporate tech
- Inspired by Stripe/Linear/Vercel aesthetic
- Updated all `@theme` tokens, utility classes, and every component referencing accent/gold styles
- Renamed `gold` variant to `accent` in Button and Badge
- Updated hero gradient to charcoal → deep teal
- Cool slate neutrals replace warm stone tones

**Files modified:**

| File | Changes |
|------|---------|
| `src/theme/colors.js` | Full palette rewrite — Deep Teal primary, Champagne accent, cool slate neutrals |
| `src/app/globals.css` | All `@theme` token values, utility classes (gradients, glass, shadows) |
| `src/components/ui/Button.jsx` | `gold` → `accent` variant, `shadow-gold` → `shadow-accent` |
| `src/components/ui/Badge.jsx` | `gold` → `accent` variant |
| `src/components/ui/Logo.jsx` | `text-gradient-gold` → `text-gradient-accent` |
| `src/components/ui/Card.jsx` | `hover:border-accent/30` → `hover:border-primary/20` |
| `src/components/ui/SocialLinks.jsx` | Hover uses `primary` instead of `accent` |
| `src/components/ui/ImagePlaceholder.jsx` | Cool gradient (removed accent-lightest) |
| `src/components/layout/Navbar.jsx` | `border-accent/10` → `border-border` |
| `src/components/layout/MobileMenu.jsx` | Teal gradient CTA, teal link hover, subtle dividers |
| `src/app/page.js` | Updated variant names + gradient class references |

---

## Upcoming Sections

- ⬜ **Hero Section** — Full-height hero with headline, subtitle, CTA buttons
- ⬜ **About Section** — Company introduction
- ⬜ **Project Showcase** — Filtered project grid by category
- ⬜ **Contact Section** — Contact form / info
- ⬜ **Footer** — Links, socials, copyright
