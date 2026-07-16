import DHAShowcase from "@/components/showcase/DHAShowcase";
import Footer from "@/components/layout/Footer";
import buek from "@/data/buek";

const canonicalUrl = "https://www.effytechbd.com/projects/BUEK";

export const metadata = {
  title: "BUEK University Website & Custom CMS Case Study | Effy Tech",
  description:
    "See how Effy Tech built the live Bangladesh University of Excellence Khulna website with a custom admin panel, publishing workflows, gallery management and responsive institutional pages.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "BUEK University Website & Custom CMS | Effy Tech",
    description:
      "A live university website and content management system designed and engineered by Effy Tech.",
    siteName: "Effy Tech",
    images: [
      {
        url: buek.ogImage,
        width: 1200,
        height: 630,
        alt: "BUEK university website and custom CMS case study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BUEK University Website & Custom CMS | Effy Tech",
    description:
      "A live university website and content management system designed and engineered by Effy Tech.",
    images: [buek.ogImage],
  },
};

export default function BUEKPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "BUEK University Website and Custom CMS",
    description:
      "A live university website and protected content management system built by Effy Tech for Bangladesh University of Excellence Khulna.",
    url: canonicalUrl,
    image: `https://www.effytechbd.com${buek.ogImage}`,
    creator: {
      "@type": "Organization",
      name: "Effy Tech",
      url: "https://www.effytechbd.com",
    },
    about: {
      "@type": "CollegeOrUniversity",
      name: buek.client.name,
      url: buek.liveUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DHAShowcase data={buek} />
      <Footer />
    </>
  );
}
