# Effy Tech 2.5D Visual System — Phase 04

## Scope

Phase 04 extends the approved spatial system from the homepage to the two most
important conversion indexes: `/allservices` and `/projects`. Project detail
pages, admin routes, shared global styles, navigation, footer, and contact form
remain unchanged.

## All Services

- The hero uses the approved transparent `business-systems.webp` asset inside
  one connected-system stage.
- A single visibility-aware idle float is allowed in the hero; touch,
  coarse-pointer, and reduced-motion presentations remain static.
- The original delivery-model information is preserved inside the stage.
- Build, Automate, and Launch & Grow overview cards receive CSS-only elevation.
- Existing interactive service explorers keep their logic and content, with a
  restrained backing plane to improve section depth.
- Engineering principles and the final CTA use static spatial hierarchy only.

## Projects Index

- The hero presents real IAM, DHA, and BUEK case-study images as three layered
  CSS browser frames.
- The proof content previously in the hero is retained as a dedicated
  capability strip immediately below the hero composition.
- Every project case-study image uses a reusable browser frame inside a
  fine-pointer tilt surface capped at 2.4 degrees.
- There is no idle animation on the projects page.
- Only the first hero preview is prioritized; below-the-fold case-study images
  remain lazy-loaded.

## Motion and accessibility

- Services hero tilt: maximum 3 degrees.
- Services hero: one visibility-aware floating asset.
- Projects hero tilt: maximum 2.8 degrees.
- Project case-study tilt: maximum 2.4 degrees.
- Touch/coarse-pointer tilt and hover transforms are disabled.
- Reduced-motion transitions and idle motion are disabled.
- No WebGL, Three.js, video background, or new package dependency.

## Bundle isolation

| Route-only CSS | Raw | Gzip |
| --- | ---: | ---: |
| All Services spatial integration | 6,450 B | 1,768 B |
| Projects spatial integration | 6,667 B | 1,719 B |

Both pages also reuse the existing spatial-components chunk. Phase 04 CSS is
not referenced by the homepage or project detail routes.

## Verification

- ESLint: 0 errors; the same 29 pre-existing warnings.
- Production build: successful; 30 generated routes.
- Runtime smoke test: nine public routes/assets returned HTTP 200.
- Runtime markup markers were confirmed for both target pages.
- Homepage, project detail pages, Navbar, Footer, ContactForm, and global CSS
  source hashes remain unchanged from Phase 03.
