# Effy Tech 2.5D Visual System — Phase 06

## Scope

Phase 06 applies the approved spatial language to the remaining high-value
public decision and trust routes: `/quickservices`, `/salek`, `/adnan`, and
`/saif`. Admin routes, the college demo, homepage, Services, Projects, and all
project case studies remain unchanged.

## Quick Services

- The hero now presents one outcome-selection stage using the approved
  transparent `ecommerce-platform.webp` asset.
- The original first-conversation guidance remains inside the stage.
- The stage uses a fine-pointer tilt capped at 2.6 degrees and has no idle
  animation.
- All six original solution paths, fit signals, service links, and proof links
  are preserved.
- Solution cards receive CSS-only depth, while the engagement steps use a
  restrained production timeline treatment.

## Leadership profiles

- Salek, Adnan, and Saif continue to use one shared profile component.
- Each real portrait is presented inside a shared grid stage with a subtle
  1.9-degree fine-pointer tilt.
- Each profile receives a small identity-aware atmospheric variation without
  changing the brand palette or content hierarchy.
- Leadership responsibilities, client work, expertise, experience, technical
  projects, education, social links, contact links, and CV downloads remain
  unchanged.
- Proof cards use static CSS depth; no profile section receives idle motion.

## Motion and accessibility

- Quick Services hero tilt: maximum 2.6 degrees.
- Profile portrait tilt: maximum 1.9 degrees.
- No idle animation was added in Phase 06.
- Touch/coarse-pointer and reduced-motion presentations are static.
- No WebGL, Three.js, video background, or package dependency was introduced.

## Bundle isolation

| Route-only CSS | Compiled raw | Gzip |
| --- | ---: | ---: |
| Quick Services spatial integration | 4,747 B | 1,309 B |
| Shared leadership profile integration | 6,255 B | 1,611 B |

The Quick Services CSS chunk is referenced only by `/quickservices`. The
profile CSS chunk is referenced only by `/salek`, `/adnan`, and `/saif`.

## Verification

- ESLint: 0 errors; the same 29 pre-existing warnings.
- Production build: successful; 30 generated routes.
- Runtime smoke test: fifteen public routes/assets returned HTTP 200.
- Runtime spatial markers were confirmed on all four target routes.
- All three CV downloads returned HTTP 200.
- Homepage, All Services, Projects index, all project case studies, Navbar,
  Footer, ContactForm, and global CSS source hashes remain unchanged from
  Phase 05.
