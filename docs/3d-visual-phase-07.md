# Effy Tech 2.5D Visual System — Phase 07

## Scope

Phase 07 completes the shared public shell and the two remaining public utility
experiences: `/coming-soon` and `/projects/IAM/confirmed`. The homepage,
Services, Projects, project case studies, Quick Services, leadership profiles,
admin application, and college demo retain their existing content and behavior.

## Public shell

- Public routes receive one restrained translucent ivory navigation treatment
  with a clear divider, soft depth, and consistent keyboard focus rings.
- The Footer receives a lightweight grid atmosphere and subtle column depth.
- The global Back to top link now targets a layout-level `#page-top` anchor, so
  it works on every public route instead of depending on a homepage-only ID.
- The WhatsApp destination and button behavior are unchanged. Its continuous
  ping loop is replaced by a static halo to reduce distraction and idle work.
- Shell styling is scoped with public route markers and does not opt admin or
  demo routes into the spatial treatment.

## Coming Soon

- The previous perpetual orbit and pulse animation is replaced with a static
  product-development stage using the approved `ai-systems.webp` asset.
- The original heading, supporting copy, Back to Home destination, and Get
  Notified destination are preserved.
- Fine pointers receive a maximum 2.2-degree tilt; touch/coarse-pointer and
  reduced-motion presentations are fully static.
- There is no idle animation, WebGL, Three.js, video, or new dependency.

## IAM confirmation utility

- Success and error states now share a calm 2.5D verification surface with a
  maximum 1.4-degree fine-pointer tilt.
- Query parsing for `error_code`, `error`, and `error_description` remains
  unchanged, including the expired-link state.
- Google Play, IAM project, and WhatsApp support destinations are unchanged.
- Success/error labels, bilingual guidance, safety copy, and live-region
  behavior remain intact.
- Touch/coarse-pointer and reduced-motion presentations are static.

## Bundle footprint

| Compiled CSS | Raw | Gzip |
| --- | ---: | ---: |
| Coming Soon spatial integration | 5,854 B | 1,830 B |
| IAM confirmation integration | 7,881 B | 2,070 B |
| Shared public shell | 6,888 B | 1,105 B |

The two page styles remain route-specific. The public-shell stylesheet is
loaded by the website layout and activates only when a supported public route
marker is present.

## Verification

- ESLint: 0 errors; the same 29 pre-existing warnings.
- Production build: successful; 30 generated routes.
- Runtime smoke test: fifteen public routes/assets returned HTTP 200.
- Coming Soon, confirmation success, and expired-link error markers passed.
- Production server log contained no runtime error or exception.
- Homepage, Services, Projects, all project case studies, Quick Services,
  leadership profiles, Navbar, WhatsApp component, and global CSS source hashes
  remain unchanged from Phase 06.
- Only the website layout, Footer, Coming Soon, IAM confirmation, and their new
  scoped styles are changed in Phase 07.
