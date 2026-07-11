/* ============================================================
   /projects/IAM — Islamic Amal Tracker showcase page
   ============================================================ */

import AmalTrackerShowcase from "@/components/showcase/AmalTrackerShowcase";
import amalTracker from "@/data/amalTracker";
import Footer from "@/components/layout/Footer";


export const metadata = {
  title: "Islamic Amal Tracker (Beta) — Prayer, Amal & Dhikr App | Effy Tech",
  description: amalTracker.description,
  keywords: [
    "Islamic Amal Tracker",
    "Salah tracker",
    "Kaza prayer manager",
    "Dhikr counter",
    "Islamic routine app",
    "Islamic reminder app",
    "Bangla Islamic app",
  ],
  alternates: {
    canonical: "/projects/IAM",
  },
  openGraph: {
    title: "Islamic Amal Tracker (Beta)",
    description: amalTracker.description,
    type: "website",
    images: [
      {
        url: amalTracker.heroImage,
        width: 664,
        height: 1184,
        alt: "Islamic Amal Tracker Home Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Islamic Amal Tracker (Beta)",
    description: amalTracker.description,
    images: [amalTracker.heroImage],
  },
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Islamic Amal Tracker",
  alternateName: "Islamic Amal Tracker (Beta)",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Android",
  description: amalTracker.description,
  url: "https://www.effytechbd.com/projects/IAM",
  downloadUrl: amalTracker.playStoreUrl,
  softwareVersion: "2.0 Beta",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "Effy Tech",
    url: "https://www.effytechbd.com",
  },
};

export default function AmalTrackerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <AmalTrackerShowcase data={amalTracker} />
      <Footer />
    </>
  );
}
