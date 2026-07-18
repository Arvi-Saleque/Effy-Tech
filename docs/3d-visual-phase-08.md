# Effy Tech Production Readiness — Phase 08

## Scope

Phase 08 completes the public-site production-readiness pass after the approved
2.5D rollout. It addresses search metadata, crawl control, the public sitemap,
404 performance, development-route exposure, and reliable leadership routing.
Homepage content, Services, Projects, case studies, leadership content, Navbar,
Footer, WhatsApp, admin application, and college demo source remain unchanged.

## Search and sharing

- The root metadata description now matches Effy Tech's current positioning:
  custom websites, mobile apps, operational platforms, automation, AI
  workflows, and launch-ready digital products.
- Default Open Graph and Twitter sharing metadata use the approved 1200×630
  Effy Tech service graphic.
- Organisation structured data includes the official URL, logo, contact
  details, address, and social profiles.
- `/robots.txt` now publishes five explicit exclusions and the canonical
  sitemap location.
- `/sitemap.xml` contains the ten indexable public pages with intentional
  priority and change-frequency values.
- `/coming-soon` is explicitly `noindex`, `nofollow`, `noarchive`, and
  `nosnippet`.

## Route cleanup

- The unlisted `/spatial-lab` development route is removed from production and
  now returns a real HTTP 404.
- Its reusable visual components remain available internally and are not loaded
  by public production routes.
- `/salek`, `/adnan`, and `/saif` are explicit static routes using one shared
  profile component and one shared metadata helper.
- This preserves all three URLs, content, metadata, visuals, CV downloads, and
  CTAs while ensuring unknown one-segment paths return a real HTTP 404 without
  a server fallback error.

## 404 experience

- The previous client-side canvas particle field and perpetual glitch
  animation are removed.
- The replacement is a static, responsive 2.5D recovery scene using the
  approved `tools.webp` asset and the ivory/graphite/gold visual system.
- Home and Projects recovery actions remain immediately available.
- The page adds no client animation loop, WebGL, video, or dependency.
- Compiled 404 CSS: 5,185 B raw / 1,718 B gzip.

## Verification

- ESLint: 0 errors; 19 remaining pre-existing warnings and no new warning.
- Production build: successful; 31 prerender operations including robots and
  sitemap endpoints.
- Runtime: sixteen expected public routes/endpoints returned HTTP 200.
- `/spatial-lab` and an arbitrary unknown route returned HTTP 404.
- Production server log contained no runtime error or exception.
- Sitemap contains ten intended public URLs and excludes admin, temporary,
  utility, and removed routes.
- Homepage SEO/share markers, organisation JSON-LD, Coming Soon noindex, and
  static 404 markers were confirmed in production HTML.
