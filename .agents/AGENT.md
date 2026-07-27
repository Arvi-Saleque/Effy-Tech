# Effy Tech delivery log

## 2026-07-18 — EffyOps Finance Management V1

- Added admin-only Finance navigation and 14 Finance routes.
- Added BDT ledger, accounts, transfers, project receivables, recurring schedules, targets, charts, settings, and audit activity.
- Added migration `20260718000000_finance_management_v1.sql` with RLS, validation triggers, reporting views, defaults, and atomic recurring-payment RPC.
- Added Finance utility and migration tests.
- Verified: 10/10 Finance tests, ESLint 0 errors, Next.js production build passed, migration integration scenario passed twice/idempotently.
- Deployment prerequisite: apply the Finance V1 Supabase migration before opening Finance routes.

## 2026-07-18 — EffyOps Finance V1.1 interaction fix

- Added a visible calendar trigger and whole-field picker behavior to every Finance date input.
- Added safe live arithmetic to all monetary inputs; expressions such as `400+300+1450` save the calculated total.
- Added browser and server validation for unsafe, incomplete, zero-division, negative, and oversized calculations.
- Added a detailed Bangla route/workflow guide.
- No database migration change is required after Finance V1 is already installed.
