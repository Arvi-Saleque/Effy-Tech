/* ============================================================
   Google Analytics 4 — Script loader
   ─────────────────────────────────────────────────
   Loads gtag.js via next/script. The GA_MEASUREMENT_ID
   is hardcoded here but can be moved to env vars if needed.
   ============================================================ */

"use client";

import Script from "next/script";

const GA_MEASUREMENT_ID = "G-FVGL6NEH1T";

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}
