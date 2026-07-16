# Effy Tech Public Website - Phase 02 Report

## Scope

This phase completes the remaining public utility-page work outside the admin panel.

## 1. Islamic Amal Tracker email confirmation

Route: `/projects/IAM/confirmed`

- Replaced the generic white SaaS card with an IAM-branded ivory, graphite and muted-gold experience.
- Added the Islamic Amal Tracker logo and Effy Tech attribution.
- Added separate success and error states.
- Expired verification links receive specific recovery instructions.
- Added Google Play, IAM product-page and WhatsApp support actions.
- Added short Bangla guidance for app users.
- Added offline-first, privacy and optional-sync context.
- Kept the route excluded from indexing and previews.
- Converted the page to server rendering so success and error content are present in the initial response.

## 2. Tracking Lab production protection

Route: `/tracking-lab`

- Removed the unnecessary full-screen spacer.
- Rebuilt the local test interface with a visible development-only warning.
- Added live dataLayer payload preview and reset control.
- Test payloads include `debug_mode` and `test_environment` markers.
- Added `src/proxy.js` with an exact matcher for `/tracking-lab`.
- Local development continues to expose the testing utility.
- Production requests are rewritten to the branded not-found page with a real HTTP 404 response.
- Added `X-Robots-Tag` blocking and no-store behavior for the protected route.

## Verification

- `npm ci`: passed.
- `npm run build`: passed.
- 30/30 static pages generated successfully.
- `/projects/IAM/confirmed`: HTTP 200.
- Success-state server content verified.
- Expired-link server content verified.
- `/tracking-lab` under production server: HTTP 404.
- Existing IAM, BUEK, DHA, project, service and leadership routes remained build-safe.

## Files changed

- `src/app/(website)/projects/IAM/confirmed/page.jsx`
- `src/app/(website)/projects/IAM/confirmed/layout.js`
- `src/app/(website)/projects/IAM/confirmed/confirmed.module.css`
- `src/app/(website)/tracking-lab/page.jsx`
- `src/app/(website)/tracking-lab/TrackingLabClient.jsx`
- `src/app/(website)/tracking-lab/tracking-lab.module.css`
- `src/proxy.js`
