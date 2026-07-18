# Effy Tech 2.5D Visual System — Phase 02

## Scope

Phase 02 creates production assets and reusable spatial primitives without
changing the public homepage. The implementation is available only on the
unlisted, no-index preview route `/spatial-lab`.

## Production assets

| File | Intended use | Dimensions | Size |
| --- | --- | ---: | ---: |
| `web-application.webp` | Web application development | 1254 × 1254 | 59,918 B |
| `mobile-product.webp` | Mobile product development | 1254 × 1254 | 49,666 B |
| `automation-systems.webp` | Custom software and automation | 1254 × 1254 | 54,196 B |
| `ai-systems.webp` | AI and intelligent systems | 1254 × 1254 | 49,268 B |
| `ecommerce-platform.webp` | E-commerce platforms | 1254 × 1254 | 46,994 B |
| `business-systems.webp` | Business operations and analytics | 1448 × 1086 | 89,014 B |

All assets use alpha-enabled WebP, transparent corners, restrained warm
pedestal accents, and semantic lowercase filenames. The original JPEG files
remain untouched.

## Image editing prompt set

The built-in image editing path was used once per source image. Every prompt
locked the original composition, camera angle, olive/warm-ivory clay material,
subject, proportions, pedestal, and padding. Each edit requested a flat
`#ff00ff` chroma-key outer background, no external shadow or reflection, no
magenta in the subject, and a restrained warm ivory/gold-green pedestal rim.

Asset-specific instructions:

- Web application: preserve browser, code panel, globe, and cursor objects.
- Mobile product: preserve phone and floating interface controls.
- Automation: preserve workflow frame, gears, panels, checklist, and hierarchy.
- AI systems: preserve robot, speech bubbles, and the exact `AI` chip label.
- E-commerce: replace `BUY NOW` with a text-free olive action bar.
- Business systems: remove the red ERP gear, use an olive/warm-gold module, and
  replace malformed dashboard copy with text-free data shapes.

The chroma-key sources were converted locally with a soft matte and despill;
alpha coverage was then validated before the assets were added to `public`.

## Reusable components

| Component | Responsibility |
| --- | --- |
| `MotionBoundary` | Shared reduced-motion and coarse-pointer policy; LazyMotion boundary |
| `SpatialStage` / `SpatialLayer` | Background, midground, and foreground depth structure |
| `TiltSurface` | Fine-pointer tilt capped by the shared limit |
| `FloatingAsset` | Visibility-aware idle motion with `next/image` |
| `DepthCard` | Named flat/raised/floating/focus/highlight elevation levels |
| `BrowserMockup` | Lightweight CSS browser frame for real product UI |
| `DeviceMockup` | Lightweight CSS phone/tablet frame for real product UI |

## Interaction behavior

- Pointer movement updates Framer Motion values rather than React state.
- Maximum tilt is 4 degrees.
- Idle movement pauses when the element is offscreen.
- Coarse-pointer and touch devices receive static presentation.
- `prefers-reduced-motion` receives static presentation.
- Spatial components animate only transform values.
- Preview idle motion is limited to one object.

## Bundle isolation

`spatial-components.css` and `spatial-lab.css` are imported only by the preview
route. The main compiled CSS remains 255,496 bytes raw / 41,285 bytes gzip,
identical to Phase 01. The preview-only CSS chunk is 9,927 bytes raw / 2,593
bytes gzip.

## Verification

- ESLint: 0 errors; the same 29 pre-existing warnings.
- Production build: successful; 30 generated routes including `/spatial-lab`.
- Runtime smoke test: homepage, preview, eight additional public routes, and
  all six WebP files returned HTTP 200.
- Preview metadata: `noindex, nofollow`.
- Homepage, Navbar, Footer, ContactForm, and global CSS source hashes are
  identical to Phase 01.

## Phase 03 entry criteria

Review `/spatial-lab` at desktop, tablet, and mobile widths. Once the asset set,
tilt intensity, and depth language are approved, integrate the system into the
homepage hero, capabilities, selected work frames, process, standards,
technology, and contact sections in small verified increments.
