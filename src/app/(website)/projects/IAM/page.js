/* ============================================================
   /projects/IAM — Islamic Amal Tracker promotional case study
   ============================================================ */

import AmalTrackerShowcase from "@/components/showcase/AmalTrackerShowcase";
import amalTracker from "@/data/amalTracker";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Islamic Amal Tracker — Prayer, Kaza, Dhikr & Amal App | Effy Tech",
  description: amalTracker.description,
  keywords: [
    "Islamic Amal Tracker",
    "Salah tracker",
    "Kaza prayer manager",
    "Dhikr counter",
    "Islamic routine app",
    "Quranic dua app",
    "Islamic home widgets",
    "Bangla Islamic app",
  ],
  alternates: {
    canonical: "/projects/IAM",
  },
  openGraph: {
    title: "Islamic Amal Tracker — Remember More. Miss Less. Grow Daily.",
    description: amalTracker.description,
    type: "website",
    images: [
      {
        url: amalTracker.ogImage,
        width: 1200,
        height: 630,
        alt: "Islamic Amal Tracker app by Effy Tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Islamic Amal Tracker",
    description: amalTracker.description,
    images: [amalTracker.ogImage],
  },
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Islamic Amal Tracker",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Android",
  description: amalTracker.description,
  url: "https://www.effytechbd.com/projects/IAM",
  downloadUrl: amalTracker.playStoreUrl,
  softwareVersion: "2.0",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.777",
    bestRating: "5",
    ratingCount: "35",
  },
  interactionStatistic: {
    "@type": "InteractionCounter",
    interactionType: "https://schema.org/DownloadAction",
    userInteractionCount: 1500,
  },
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
