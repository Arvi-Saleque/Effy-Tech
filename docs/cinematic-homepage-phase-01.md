# Effy Tech — Cinematic 3D Homepage Phase 01

Date: 18 July 2026
Scope: Public homepage only; admin panel is unchanged.

## Visual direction

The homepage now uses an intentionally visible spatial system instead of subtle
micro-animation:

- A layered hero scene built from three lightweight transparent WebP assets.
- Scroll-linked hero separation: copy rises while the 3D scene moves, scales,
  and rotates at a different rate.
- Rounded overlapping sections that enter with depth, scale, and vertical slide.
- Desktop parallax surfaces on selected dark sections.
- Pointer-responsive 3D tilt for proof, capability, and founder cards.
- Raised media, copy, labels, and controls through `translateZ` layers.
- Alternating process and technology-card elevations.
- A fixed page-progress indicator and an animated hero scroll cue.

## Performance and accessibility

- Uses the existing Framer Motion dependency; no WebGL or new runtime package.
- Hero assets total about 199 KB and are served through `next/image`.
- Pointer tilt is disabled for coarse/touch pointers.
- `prefers-reduced-motion` removes scroll transforms, orbit animation, and fixed
  background behavior.
- Tablet and mobile layouts reduce scene size, hide nonessential labels, and
  convert proof cards to a horizontal snap rail.

## Changed files

- `src/components/sections/HomeExperience.jsx`
- `src/styles/home-cinematic.css`
- `docs/cinematic-homepage-phase-01.md`

## Verification

- ESLint: 0 errors; 19 existing warnings outside this phase.
- Production build: successful; all 31 routes generated or registered.
- Runtime smoke test: homepage and all three hero assets return HTTP 200.
- Compiled output contains the cinematic hero, progress, and founder-card CSS.

## Suggested review widths

- Desktop: 1440 px and 1280 px.
- Tablet: 1024 px and 768 px.
- Mobile: 430 px, 390 px, and 360 px.

Review the hero, the scroll transition into proof/services, capability-card
tilt, featured work, alternating process cards, and the founder-card depth.
