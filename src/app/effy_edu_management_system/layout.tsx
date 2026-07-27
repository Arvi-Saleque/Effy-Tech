// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getGlobalSettings } from "@/features/effy-edu-demo/features/website-cms/actions/global-settings";
import { SiteSettingsProvider } from "@/features/effy-edu-demo/lib/providers/SiteSettingsProvider";
import { Toaster } from "react-hot-toast";
import { InitialSplashLoader } from "@/features/effy-edu-demo/components/common/InitialSplashLoader";
import { DemoControlDock } from "@/features/effy-edu-demo/components/demo/DemoControlDock";

const inter = localFont({
  src: [
    {
      path: "../../../public/effy_edu_management_system/fonts/Inter-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/effy_edu_management_system/fonts/Inter-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/effy_edu_management_system/fonts/Inter-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});
const outfit = localFont({
  src: [
    {
      path: "../../../public/effy_edu_management_system/fonts/InterDisplay-Bold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-outfit",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteInfo = await getGlobalSettings();
  return {
    title: siteInfo.coachingCenterName,
    description: siteInfo.shortDescription,
    keywords: ["coaching management system", "student portal", "teacher dashboard", "academic management", "admission coaching"],
    authors: [{ name: siteInfo.teacherName }],
    alternates: {
      canonical: "https://www.effytechbd.com/effy_edu_management_system",
    },
    openGraph: { title: siteInfo.coachingCenterName, description: siteInfo.shortDescription, type: "website", locale: "en_US", siteName: siteInfo.coachingCenterName },
  };
}

export default async function EffyEduDemoLayout({ children }: { children: React.ReactNode }) {
  const settings = await getGlobalSettings();
  return (
    <div
      className={`${outfit.variable} ${inter.variable} effy-edu-demo min-h-screen bg-bg-soft pb-24 font-sans text-text antialiased sm:pb-20`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <SiteSettingsProvider settings={settings}>
        <InitialSplashLoader />
        {children}
        <DemoControlDock />
        <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
      </SiteSettingsProvider>
    </div>
  );
}
