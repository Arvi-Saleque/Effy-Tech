# Effy Tech 2.5D Visual System — Phase 05

## Scope

Phase 05 applies the approved spatial language to the three conversion-critical
case studies: `/projects/IAM`, `/projects/DHA`, and `/projects/BUEK`. Existing
content, metadata, screenshots, galleries, lightboxes, external links, analytics,
and business logic remain unchanged.

## IAM product case study

- The existing 21-screen interactive app tour is retained as the hero's primary
  product proof.
- The tour now sits on a CSS-only grid stage with a backing plane, soft plinth,
  and a fine-pointer tilt surface capped at 2.2 degrees.
- The existing Framer Motion carousel remains compatible through a non-strict
  reusable motion boundary.
- The proof strip receives restrained glass depth and the three product promise
  cards receive static editorial geometry.
- No new image, idle animation, or content block was added.

## DHA and BUEK institutional case studies

- Both routes reuse one project-aware component and one shared route-only CSS
  system.
- The existing live homepage screenshot remains the hero's primary proof inside
  a 2.4-degree browser stage.
- DHA uses the established graphite, sage, and warm-gold atmosphere.
- BUEK uses a slightly cooler institutional graphite atmosphere while retaining
  the shared Effy Tech visual system.
- Proof, overview, deliverable, connected-system, capability, engineering,
  outcome, and CTA surfaces receive CSS-only depth hierarchy.
- Screenshot carousel controls, full-page hover previews, keyboard navigation,
  lightboxes, live-site links, and analytics are unchanged.

## Motion and accessibility

- IAM hero tilt: maximum 2.2 degrees.
- DHA/BUEK browser tilt: maximum 2.4 degrees.
- No idle motion was added in Phase 05.
- Touch/coarse-pointer and reduced-motion presentations are static.
- Existing carousel and lightbox interaction is preserved.
- No WebGL, Three.js, video background, or package dependency was introduced.

## Bundle isolation

| Route-only CSS | Compiled raw | Gzip |
| --- | ---: | ---: |
| IAM spatial case study | 1,999 B | 742 B |
| DHA/BUEK institutional case studies | 6,194 B | 1,556 B |

The IAM CSS chunk is referenced only by `/projects/IAM`. The institutional CSS
chunk is referenced only by `/projects/DHA` and `/projects/BUEK`. Homepage,
Services, Projects index, and other public routes do not reference either chunk.

## Verification

- ESLint: 0 errors; the same 29 pre-existing warnings.
- Production build: successful; 30 generated routes.
- Runtime smoke test: nine public routes/assets returned HTTP 200.
- Runtime spatial markers were confirmed on all three target routes.
- Homepage, All Services, Projects index, Navbar, Footer, ContactForm, and global
  CSS source hashes remain unchanged from Phase 04.
