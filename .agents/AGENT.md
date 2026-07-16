# Effy Tech Theme Consolidation

- Removed the legacy teal/cyan brand palette.
- Standardized the public site on ivory, graphite, warm neutral, and logo-matched gold tokens.
- Added missing Next.js path alias and PostCSS configuration.
- Preserved semantic success, warning, and error colors for operational/admin states.
- Verified with a production build.

# IAM Promotional Product Page

- Rebuilt `/projects/IAM` around two goals: app installation and Effy Tech product-engineering credibility.
- Removed all Beta/version promotional labels.
- Added verified proof: 1500+ installs, 4.77/5 rating, and 35 ratings.
- Prioritized eight core capabilities including Home Screen Widgets and Advanced Qur'anic Dua.
- Added privacy/support links, FAQ, client-facing engineering case study, and dual install/project CTAs.
- Corrected CTA analytics context and added feature/scroll-depth events.
- Replaced the 21 long app-tour JPG assets with optimized WebP copies, reducing their combined size from about 12.7 MB to 2.6 MB.
- Added a 1200×630 Open Graph image and verified a clean production build.


## Public Phase 03 - Legacy Cleanup
- The public tracking lab route has been removed. Do not re-add analytics test utilities as public routes.
- IAM, DHA, and BUEK use dedicated case-study routes; do not reintroduce the unused generic project detail route.
- Homepage project and team imagery must use the optimized case-study/profile assets.
- Public navigation must link to `/projects`, not the obsolete `/#projects` anchor.
