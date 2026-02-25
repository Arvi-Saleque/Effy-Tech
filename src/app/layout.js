import { Inter } from "next/font/google";
import "./globals.css";
import siteConfig from "@/theme/siteConfig";
import Navbar from "@/components/layout/Navbar";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
