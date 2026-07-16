import DHAShowcase from "@/components/showcase/DHAShowcase";
import Footer from "@/components/layout/Footer";
import dha from "@/data/dha";

const canonicalUrl = "https://www.effytechbd.com/projects/DHA";

export const metadata = {
  title: "Darul Hikmah Academy Website & Academic Platform | Effy Tech",
  description:
    "Explore the live Darul Hikmah Academy website and academic operations platform built by Effy Tech with assignments, attendance, routines, teacher management, gallery and a custom admin system.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Darul Hikmah Academy Academic Platform | Effy Tech",
    description:
      "A live bilingual institutional website and academic operations system designed and engineered by Effy Tech.",
    siteName: "Effy Tech",
    images: [
      {
        url: dha.ogImage,
        width: 1200,
        height: 630,
        alt: "Darul Hikmah Academy website and academic management platform case study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Darul Hikmah Academy Academic Platform | Effy Tech",
    description:
      "A live bilingual institutional website and academic operations system designed and engineered by Effy Tech.",
    images: [dha.ogImage],
  },
};

export default function DHAPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Darul Hikmah Academy Website and Academic Operations Platform",
    description:
      "A live bilingual public website and academic operations platform built by Effy Tech for Darul Hikmah Academy.",
    url: canonicalUrl,
    image: `https://www.effytechbd.com${dha.ogImage}`,
    creator: {
      "@type": "Organization",
      name: "Effy Tech",
      url: "https://www.effytechbd.com",
    },
    about: {
      "@type": "EducationalOrganization",
      name: dha.client.name,
      url: dha.liveUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DHAShowcase data={dha} />
      <Footer />
    </>
  );
}
