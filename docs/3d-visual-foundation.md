# Effy Tech 2.5D Visual Foundation

## Phase 01 scope

This phase prepares the design and performance contract without changing the
current public interface. It does not add WebGL, Three.js, pointer handlers,
new images, or animation to any route.

## Brand layers

1. Warm ivory is the canvas.
2. Graphite provides structure and readable contrast.
3. Olive product illustrations become the foreground objects in Phase 02.
4. Gold is reserved for highlights, focus, and conversion moments.

## Depth contract

- `flat`: editorial copy, FAQ content, dense forms, and galleries.
- `raised`: standard cards and lightweight browser frames.
- `floating`: hero modules and featured product devices.
- `focus`: one primary object inside a visual stage.
- `highlight`: gold-tinted conversion emphasis only.

The CSS variables are defined in `src/styles/spatial-foundation.css`. Motion
and performance limits needed by JavaScript are defined in
`src/theme/spatialTokens.js`.

## Interaction contract

- Pointer tilt is limited to 4 degrees.
- Parallax travel is limited to 14 pixels.
- Idle float travel is limited to 8 pixels over roughly 6 seconds.
- Touch devices receive static depth and no pointer tilt.
- Reduced-motion users receive static spatial presentation.
- Only `transform` and `opacity` may be animated by spatial components.
- Offscreen idle animation must pause.

## Performance gates

- Mobile LCP: 2.5 seconds or faster.
- INP or equivalent interaction latency: below 200 milliseconds.
- CLS: below 0.1.
- Homepage JavaScript target: 145 KB gzip or lower.
- First-viewport visual asset: 220 KB desktop, 120 KB mobile.
- Concurrent moving objects: at most 3 desktop and 1 mobile.
- No WebGL dependency during Phases 01–06.

## Protected behavior

The following areas are outside this phase and must remain unchanged:

- contact submission and validation;
- navigation, command palette, and mobile menu;
- admin routes, authentication, and Supabase operations;
- analytics and speed-insight integrations;
- IAM, DHA, BUEK, and Pioneer College demo behavior;
- current homepage content, layout, and motion.

## Phase 02 entry criteria

Phase 02 can start after lint and production build pass with the same route
inventory and no new errors. Its first work should be the six illustration
assets plus isolated previews of `DepthCard`, `TiltSurface`, `FloatingAsset`,
and device/browser mockups.
