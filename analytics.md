# Effy Tech — Analytics Setup Guide

## Overview

The Effy Tech website uses **three analytics tools**:

| Tool | Purpose | Dashboard |
|------|---------|-----------|
| **Vercel Analytics** | Page views, unique visitors, top pages, referrers | [vercel.com/dashboard](https://vercel.com) → Project → Analytics |
| **Vercel Speed Insights** | Core Web Vitals (LCP, FID, CLS, TTFB) | [vercel.com/dashboard](https://vercel.com) → Project → Speed Insights |
| **Google Analytics 4** | Detailed user behavior, button clicks, events, demographics | [analytics.google.com](https://analytics.google.com) |

---

## 1. Enable Vercel Analytics (One-Time Setup)

Vercel Analytics is installed in the code but must be **enabled in the dashboard**.

### Steps:
1. Go to **[vercel.com](https://vercel.com)** → Sign in
2. Click on the **Effy-Tech** project
3. Click the **"Analytics"** tab in the top navigation
4. Click **"Enable"** button
5. Choose the **Free plan** (Hobby — 2,500 events/month)
6. Done! Data will start appearing within a few minutes

### What you'll see:
- **Visitors** — Unique visitors per day/week/month
- **Page Views** — Total page views
- **Top Pages** — Which pages get the most visits (/, /projects/IAM, /projects/DHA)
- **Referrers** — Where traffic comes from (facebook.com, direct, google.com)
- **Countries** — Where your visitors are located
- **Devices** — Desktop vs Mobile vs Tablet
- **OS & Browser** — Windows, Android, Chrome, Safari, etc.

---

## 2. Enable Vercel Speed Insights (One-Time Setup)

### Steps:
1. Go to **[vercel.com](https://vercel.com)** → Effy-Tech project
2. Click the **"Speed Insights"** tab
3. Click **"Enable"** button
4. Done!

### What you'll see:
- **LCP** (Largest Contentful Paint) — How fast the main content loads
- **FID** (First Input Delay) — How fast the site responds to clicks
- **CLS** (Cumulative Layout Shift) — How stable the layout is
- **TTFB** (Time to First Byte) — Server response time

---

## 3. Google Analytics 4 Setup

**Measurement ID:** `G-FVGL6NEH1T`  
**Already integrated in the website code — no additional setup needed.**

### How to Verify GA4 is Working:

#### Step 1: Open your website
1. Go to **[effy-tech.vercel.app](https://effy-tech.vercel.app)** in your browser

#### Step 2: Check Real-Time in GA4
1. Go to **[analytics.google.com](https://analytics.google.com)**
2. Sign in with the Google account that owns the GA4 property
3. Select the **Effy Tech** property
4. In the left sidebar, click **"Reports"** → **"Realtime"**
5. You should see **1 active user** (that's you!)
6. You'll see:
   - **Users in last 30 minutes**: Should show at least 1
   - **Page views**: Shows which pages you visited
   - **Event count**: Shows events firing in real-time

#### Step 3: Test Button Click Tracking
1. While keeping the GA4 Realtime tab open in one browser tab
2. In another tab, go to **[effy-tech.vercel.app](https://effy-tech.vercel.app)**
3. Click the **"View Our Work"** button on the homepage
4. Go back to GA4 Realtime → Look for event: `cta_click`
5. Click on the `cta_click` event to see parameters:
   - `button_name`: "View Our Work"
   - `page_location`: "homepage"

---

## 4. All Tracked Events

Here is every event tracked on the website:

### Homepage Events

| Action | Event Name | Parameters | Where |
|--------|-----------|------------|-------|
| Click "View Our Work" button | `cta_click` | `button_name`: "View Our Work", `page_location`: "homepage" | Hero section |
| Click "Get in Touch" button | `cta_click` | `button_name`: "Get in Touch", `page_location`: "homepage" | Hero section |
| Click any project card | `project_interaction` | `project_name`: (project title), `action`: "card_click" | Projects section |
| Submit contact form | `contact_form_submit` | — | Contact section |

### Islamic Amal Tracker Page (/projects/IAM)

| Action | Event Name | Parameters | Where |
|--------|-----------|------------|-------|
| Click hero "Download on Play Store" | `cta_click` | `button_name`: "Download - Hero", `page_location`: "IAM" | Hero section |
| Click bottom "Download on Play Store" | `cta_click` | `button_name`: "Download - CTA", `page_location`: "IAM" | CTA section |
| Submit a review | `review_submit` | `project_name`: "Islamic Amal Tracker", `rating`: (1-5) | Review section |

### Darul Hikmah Academy Page (/projects/DHA)

| Action | Event Name | Parameters | Where |
|--------|-----------|------------|-------|
| Click hero "Visit Site" | `cta_click` | `button_name`: "Visit Site - Hero", `page_location`: "DHA" | Hero section |
| Click "Contact DHA" | `cta_click` | `button_name`: "Contact - CTA", `page_location`: "DHA" | CTA section |
| Click bottom "Visit Site" | `cta_click` | `button_name`: "Visit Site - CTA", `page_location`: "DHA" | CTA section |

---

## 5. How to Check Facebook Promotion Results

After sharing your website on Facebook, here's how to see results:

### Method A: Vercel Analytics (Simple)
1. Go to **Vercel Dashboard** → **Analytics** tab
2. Look at **"Referrers"** section
3. Find **"facebook.com"** or **"l.facebook.com"** — this shows visits from Facebook
4. Check the **date range** matching when you posted

### Method B: Google Analytics (Detailed)
1. Go to **[analytics.google.com](https://analytics.google.com)**
2. Go to **Reports** → **Acquisition** → **Traffic acquisition**
3. Look for **Source = "facebook.com"** or **"l.facebook.com"**
4. You'll see:
   - **Users** — How many unique people visited from Facebook
   - **Sessions** — Total visits from Facebook
   - **Engagement rate** — How many actually interacted
   - **Average engagement time** — How long they stayed

### Method C: Check Download Button Clicks from Facebook Traffic
1. Go to **GA4** → **Reports** → **Engagement** → **Events**
2. Click on **"cta_click"** event
3. You'll see total clicks on all CTA buttons
4. To filter by button:
   - Click **"+"** to add a secondary dimension
   - Search for **"button_name"**
   - Now you can see clicks per button name (e.g., "Download - Hero", "Download - CTA")

### Pro Tip: UTM Parameters
When sharing on Facebook, add UTM parameters to your URL for better tracking:

```
https://effy-tech.vercel.app/projects/IAM?utm_source=facebook&utm_medium=social&utm_campaign=amal_tracker_promo
```

This way in GA4 → Acquisition → Traffic acquisition, you'll see:
- **Source**: facebook
- **Medium**: social
- **Campaign**: amal_tracker_promo

---

## 6. Testing Checklist

Use this checklist to verify everything is working:

### Vercel Analytics
- [ ] Go to Vercel Dashboard → Analytics tab → Click "Enable"
- [ ] Visit your website
- [ ] Wait 1-2 minutes, check Vercel Analytics shows the visit
- [ ] Confirm "Page Views" counter increases

### Vercel Speed Insights
- [ ] Go to Vercel Dashboard → Speed Insights tab → Click "Enable"
- [ ] Visit a few pages on your site
- [ ] Wait 5-10 minutes, check Speed Insights shows metrics

### Google Analytics — Page Views
- [ ] Go to [analytics.google.com](https://analytics.google.com) → Realtime
- [ ] Open [effy-tech.vercel.app](https://effy-tech.vercel.app) in another tab
- [ ] Confirm "1 active user" appears in Realtime

### Google Analytics — Event Tracking
Test each button and verify the event appears in GA4 Realtime:

- [ ] **Homepage**: Click "View Our Work" → Check for `cta_click` event
- [ ] **Homepage**: Click "Get in Touch" → Check for `cta_click` event
- [ ] **Homepage**: Click a project card → Check for `project_interaction` event
- [ ] **Homepage**: Submit contact form → Check for `contact_form_submit` event
- [ ] **IAM page**: Click hero Download button → Check for `cta_click` with "Download - Hero"
- [ ] **IAM page**: Click bottom Download button → Check for `cta_click` with "Download - CTA"
- [ ] **IAM page**: Submit a review → Check for `review_submit` event
- [ ] **DHA page**: Click hero Visit Site → Check for `cta_click` with "Visit Site - Hero"
- [ ] **DHA page**: Click Contact DHA → Check for `cta_click` with "Contact - CTA"
- [ ] **DHA page**: Click bottom Visit Site → Check for `cta_click` with "Visit Site - CTA"

### Browser DevTools Verification
You can also verify events in the browser:
1. Open your website
2. Press **F12** to open DevTools
3. Go to the **Network** tab
4. Filter by **"collect"** or **"google-analytics"**
5. Click a button on the website
6. You should see a network request to `google-analytics.com/g/collect` — that's the event firing

---

## 7. Code Files Reference

| File | Purpose |
|------|---------|
| `src/components/analytics/GoogleAnalytics.jsx` | Loads GA4 gtag.js script |
| `src/lib/analytics.js` | Event tracking helper functions |
| `src/app/layout.js` | Renders `<Analytics>`, `<SpeedInsights>`, `<GoogleAnalytics>` |
| `src/components/sections/Hero.jsx` | Tracks "View Our Work" & "Get in Touch" clicks |
| `src/components/sections/ProjectCard.jsx` | Tracks project card clicks |
| `src/components/sections/ContactForm.jsx` | Tracks contact form submits |
| `src/components/showcase/AmalTrackerShowcase.jsx` | Tracks IAM download & review events |
| `src/components/showcase/DHAShowcase.jsx` | Tracks DHA visit site & contact events |

---

## 8. Packages Installed

```json
"@vercel/analytics": "latest"
"@vercel/speed-insights": "latest"
```

No package needed for GA4 — it loads via `<Script>` tag from Google's CDN.

---

## 9. Useful GA4 Dashboard Locations

| What you want to know | Where to find it |
|----------------------|-----------------|
| How many visitors right now? | Realtime |
| How many visitors today/this week? | Reports → Engagement → Overview |
| Where do visitors come from? | Reports → Acquisition → Traffic acquisition |
| Which pages are most popular? | Reports → Engagement → Pages and screens |
| What buttons are people clicking? | Reports → Engagement → Events → cta_click |
| How many downloads from Facebook? | Reports → Acquisition → Traffic acquisition (filter facebook.com) → then Events |
| What devices do visitors use? | Reports → Tech → Tech details |
| What countries are visitors from? | Reports → Demographics → Demographic details |

---

## 10. Important Notes

- **Data delay**: Vercel Analytics shows data in ~1-2 minutes. GA4 Realtime is instant, but full reports take **24-48 hours** to populate.
- **Ad blockers**: Some users have ad blockers that block Google Analytics. Vercel Analytics is more resistant to ad blockers. That's why we use both.
- **Free limits**: Vercel Analytics free plan allows 2,500 events/month. GA4 is completely free with no limits.
- **Privacy**: No personal data is collected. Analytics tracks anonymous page views and button clicks only.
