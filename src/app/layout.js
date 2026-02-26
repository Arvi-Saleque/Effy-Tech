import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import siteConfig from "@/theme/siteConfig";
import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/ui/Preloader";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const banglaborno = localFont({
  src: [
    {
      path: "../../public/fonts/Li Alinur Banglaborno Unicode.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Li Alinur Banglaborno Unicode Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-body",
});

const nakhatra = localFont({
  src: [
    {
      path: "../../public/fonts/Li Alinur Nakkhatra Unicode.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Li Alinur Nakkhatra Unicode Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-heading",
});

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${banglaborno.variable} ${nakhatra.variable}`}>
      <body>
        <Preloader />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
