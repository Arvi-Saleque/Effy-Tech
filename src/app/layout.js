import { Inter } from "next/font/google";
import "./globals.css";
import siteConfig from "@/theme/siteConfig";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* ── Content wrapper — sits above the sticky footer (curtain effect) */}
        <div className="relative z-10 bg-surface">
          <Navbar />
          {children}
        </div>

        {/* ── Footer — sticky behind content, revealed on scroll */}
        <div className="sticky bottom-0 z-0">
          <Footer />
        </div>
      </body>
    </html>
  );
}
