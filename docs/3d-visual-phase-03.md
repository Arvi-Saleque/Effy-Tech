# Effy Tech 2.5D Visual System — Phase 03

## Scope

Phase 03 integrates the approved Phase 02 spatial system into the public
homepage. The integration is deliberately route-scoped: shared global styles,
the navbar, footer, contact form, and application logic remain unchanged.

## Homepage integration

### Hero

- The existing connected-system illustration is wrapped in one fine-pointer
  tilt surface capped at 3 degrees.
- The second orbit and AI module are static, limiting simultaneous continuous
  hero animations to three.
- Coarse-pointer and reduced-motion users receive a static presentation.

### Capabilities

- Four production transparent WebP assets are used as functional service
  previews: web applications, mobile products, automation, and AI systems.
- The assets use `next/image`, remain static, and are lazy-loaded below the
  fold.
- Existing titles, descriptions, links, and service hierarchy are unchanged.

### Featured work

- The IAM phone composition uses one restrained 2.5-degree tilt boundary.
- DHA and BUEK production screenshots use the reusable CSS-only
  `BrowserMockup` component.
- Project copy, links, and real screenshots remain unchanged.

### Process, standards, technology, and contact

- Process, standards, and technology cards use CSS-only elevation and
  fine-pointer hover depth. There is no new idle animation.
- The contact section adds a static connected-system marker. `ContactForm`
  source and behavior are byte-for-byte unchanged.

## Motion and accessibility policy

- Hero pointer tilt: maximum 3 degrees.
- Featured IAM pointer tilt: maximum 2.5 degrees.
- Continuous hero animation: three elements maximum.
- No new continuous animation below the hero.
- Touch/coarse-pointer hover and tilt transforms are disabled.
- `prefers-reduced-motion` disables component motion and transitions.
- No WebGL, Three.js, video background, or new runtime dependency.

## Bundle impact

The homepage now loads two route-only CSS files after the unchanged global CSS:

| CSS | Raw | Gzip |
| --- | ---: | ---: |
| Reusable spatial components | 3,474 B | 1,143 B |
| Homepage integration | 9,220 B | 2,336 B |
| Total route-only CSS | 12,694 B | 3,479 B |

The homepage JavaScript reference set remains at 23 files. The Phase 03
integration adds approximately 8.6 KB raw / 3.4 KB gzip to the referenced
JavaScript, primarily for the already-approved reusable pointer and visibility
hooks. No package dependency was added.

## Verification

- ESLint: 0 errors; the same 29 pre-existing warnings.
- Production build: successful; 30 generated routes.
- Runtime smoke test: seven public routes and four integrated WebP assets
  returned HTTP 200.
- Global CSS, Navbar, Footer, and ContactForm hashes match Phase 02.
- The homepage integration CSS is isolated from other public routes.

## Review checklist

- Check the hero at desktop, tablet, and mobile widths.
- Confirm capability assets have transparent edges and remain legible.
- Confirm IAM tilt is subtle and phone screenshots are not clipped.
- Confirm DHA/BUEK browser frames preserve screenshot readability.
- Confirm touch and reduced-motion presentations remain static.
- Submit a test contact form and verify the existing flow is unchanged.
