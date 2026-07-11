import Navbar from "@/components/layout/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import {
  GoogleTagManagerScript,
  GoogleTagManagerNoscript,
} from "@/components/analytics/GoogleTagManager";

export default function WebsiteLayout({ children }) {
  return (
    <>
      <GoogleTagManagerScript />
      <GoogleTagManagerNoscript />
      <Navbar />
      {children}
      <WhatsAppButton />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
