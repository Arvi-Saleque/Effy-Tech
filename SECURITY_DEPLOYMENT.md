# Security & Deployment Hardening (Vercel + GitHub)

This project is deployed on Vercel and should keep all credentials in environment variables, never in source control.

## Required environment variables

Use placeholders in `.env.example` and set real values in:
- Vercel Project Settings → Environment Variables
- Local `.env.local` (never committed)

Variables used by this app:
- `ADMIN_SECRET`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

## Vercel security best practices

1. **Keep secrets in Vercel env vars only**
   - Separate values for Production / Preview / Development.
   - Never paste real credentials into code, docs, issues, or PR comments.
2. **Restrict Vercel GitHub integration scope**
   - Connect only selected repositories, not all repos.
3. **Rotate secrets if exposure is suspected**
   - Rotate `ADMIN_SECRET`, Upstash token, and any related deployment tokens immediately.
4. **Use branch protection for `main`**
   - Require PR review and status checks before merge.
5. **Enable GitHub security features**
   - Secret scanning, Dependabot alerts, and 2FA on maintainer accounts.

## Security headers in this project

Global headers are set in `next.config.mjs`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`

### CSP note

A strict global CSP is **not enabled yet** because the current implementation uses inline analytics scripts (GA/GTM) and external Google-hosted assets. Rolling out CSP safely should be done with per-route/script nonce or hash support and staged testing to avoid breaking analytics or rendering.

## Public form abuse protection (reviews)

`submitReview` currently validates payload fields but does not enforce a server-side rate limit yet.

Recommended next step:
- Add Upstash-based rate limiting and/or bot protection (e.g., CAPTCHA/Turnstile) on review submission actions to reduce spam and abuse.
