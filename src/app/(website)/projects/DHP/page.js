import DHAShowcase from "@/components/showcase/DHAShowcase";
import CaseStudyFooterNav from "@/components/showcase/CaseStudyFooterNav";
import Footer from "@/components/layout/Footer";
import dhakaHeights from "@/data/dhakaHeights";
import "@/styles/spatial-components.css";
import "@/styles/institutional-spatial-case-study.css";

const canonicalUrl = "https://www.effytechbd.com/projects/dhaka-heights";

export const metadata = {
  title: "Dhaka Heights Real Estate Website & Custom CMS Case Study | Effy Tech",
  description:
    "See how Effy Tech built the live Dhaka Heights Properties website with a filterable property catalog, buyer and landowner lead workflows, and a custom admin CMS.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Dhaka Heights Real Estate Website & Custom CMS | Effy Tech",
    description:
      "A live real estate developer website and operations platform designed and engineered by Effy Tech.",
    siteName: "Effy Tech",
    images: [
      {
        url: dhakaHeights.ogImage,
        width: 1200,
        height: 630,
        alt: "Dhaka Heights real estate website and custom CMS case study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhaka Heights Real Estate Website & Custom CMS | Effy Tech",
    description:
      "A live real estate developer website and operations platform designed and engineered by Effy Tech.",
    images: [dhakaHeights.ogImage],
  },
};

export default function DHPPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Dhaka Heights Real Estate Website and Custom CMS",
    description:
      "A live real estate developer website and protected operations platform built by Effy Tech for Dhaka Heights Properties Limited.",
    url: canonicalUrl,
    image: `https://www.effytechbd.com${dhakaHeights.ogImage}`,
    creator: {
      "@type": "Organization",
      name: "Effy Tech",
      url: "https://www.effytechbd.com",
    },
    about: {
      "@type": "Organization",
      name: dhakaHeights.client.name,
      url: dhakaHeights.liveUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DHAShowcase data={dhakaHeights} />
      <CaseStudyFooterNav currentSlug="DHP" />
      <Footer />
    </>
  );
}
