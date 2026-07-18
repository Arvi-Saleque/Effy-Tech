# Effy Tech Experience Hardening — Phase 09

## Scope

Phase 09 hardens the completed public 2.5D system for keyboard access and route-transition performance. It replaces the global canvas loader, adds a public skip path, and completes modal focus behavior for the mobile navigation and command search. Public page content, route metadata, spatial compositions, contact behavior, analytics, admin routes, and the college demo remain unchanged.

## Lightweight 2.5D route loader

- The previous client component, Framer Motion import, canvas context, random node field, and perpetual `requestAnimationFrame` loop are removed.
- The replacement is a server-rendered graphite-and-gold 2.5D stage built from semantic markup and CSS.
- Its only motion uses compositor-friendly `transform` and `opacity` on three small logo bars.
- `prefers-reduced-motion` receives a fully static mark.
- The status exposes a polite, labelled loading announcement without duplicating decorative content.
- Loader component source is reduced from 7,427 B to 707 B (90.5%).

## Keyboard navigation

- Every public layout now starts with a high-contrast “Skip to main content” link.
- The skip destination is consistent across all website routes and can receive programmatic focus without adding a visible outline to the layout wrapper.
- Mobile navigation now has an in-dialog close control, `aria-controls`, a labelled modal, initial focus, Tab/Shift+Tab containment, Escape dismissal, scroll locking, and focus restoration.
- Command search now shares the same modal focus policy.
- Search has a programmatic heading and input label, polite result updates, and reduced-motion-aware entry/exit behavior.
- Pointer/backdrop dismissal remains available.

## Protected behavior

- Public copy, CTA destinations, service data, project data, profile data, forms, analytics, and WhatsApp destination are unchanged.
- Existing 2.5D assets, tilt limits, route-specific motion boundaries, and image behavior are unchanged.
- Admin application, Supabase code, and Pioneer Girls College demo are unchanged.
- No package or runtime dependency is added.

## Verification

- ESLint: 0 errors; the same 19 pre-existing warnings and no new warning.
- Production build: successful; 31 prerender operations.
- Runtime: thirteen expected public routes/endpoints returned HTTP 200.
- Arbitrary unknown route returned HTTP 404.
- Production server started cleanly with no runtime exception.
- Homepage production HTML contains the skip link, `#main-content` destination, and focusable target.
- Loader source contains no client directive, canvas, `requestAnimationFrame`, or Framer Motion import.
- Source isolation check found only the seven intended implementation files plus this report.

## Review checklist

- Press Tab immediately after loading any public route; the skip link should appear.
- Activate the skip link; focus should move past navigation to page content.
- At mobile width, open navigation and cycle forward/backward with Tab and Shift+Tab.
- Press Escape from mobile navigation; focus should return to the menu trigger.
- Open search with Ctrl+K or Cmd+K, cycle focus, and press Escape.
- Enable reduced motion and confirm the route loader is static.
