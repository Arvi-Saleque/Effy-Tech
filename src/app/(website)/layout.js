import Navbar from "@/components/layout/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import {
  GoogleTagManagerScript,
  GoogleTagManagerNoscript,
} from "@/components/analytics/GoogleTagManager";
import "@/styles/public-shell-spatial.css";

export default function WebsiteLayout({ children }) {
  return (
    <>
      <span id="page-top" className="public-page-top-anchor" aria-hidden="true" />
      <a className="public-skip-link" href="#main-content">
        Skip to main content
      </a>
      <GoogleTagManagerScript />
      <GoogleTagManagerNoscript />
      <Navbar />
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
      <WhatsAppButton />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
