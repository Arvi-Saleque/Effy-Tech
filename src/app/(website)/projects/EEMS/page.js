import DHAShowcase from "@/components/showcase/DHAShowcase";
import Footer from "@/components/layout/Footer";
import effyEduManagementSystem from "@/data/effyEduManagementSystem";
import "@/styles/spatial-components.css";
import "@/styles/institutional-spatial-case-study.css";

const canonicalUrl =
  "https://www.effytechbd.com/projects/effy-edu-management-system";
const liveProductionUrl = "https://www.shifatstales.com";
const ogImageUrl = effyEduManagementSystem.ogImage.startsWith("http")
  ? effyEduManagementSystem.ogImage
  : `https://www.effytechbd.com${effyEduManagementSystem.ogImage}`;

const pageDescription =
  "Explore Effy Edu Management System, a live coaching operations and student portal case study built by Effy Tech for Shifat's Tales.";

export const metadata = {
  title: "Coaching Management System & Student Portal Case Study | Effy Tech",
  description: pageDescription,
  keywords: [
    "coaching management system",
    "education management software Bangladesh",
    "student portal",
    "class routine management",
    "academic calendar software",
    "study materials portal",
    "student results platform",
    "custom education software",
    "Effy Tech case study",
    "Shifat's Tales",
  ],
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: "Effy Edu Coaching Management System | Effy Tech",
    description:
      "A live education platform connecting batch discovery, registration, study resources, routines, academic calendars, results and protected portal access.",
    siteName: "Effy Tech",
    images: [
      {
        url: effyEduManagementSystem.ogImage,
        width: 1200,
        height: 630,
        alt: "Effy Edu coaching management system and student portal case study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Effy Edu Coaching Management System | Effy Tech",
    description:
      "A live coaching management and student portal platform designed and engineered by Effy Tech.",
    images: [effyEduManagementSystem.ogImage],
  },
};

export default function EffyEduManagementSystemCaseStudyPage() {
  const creator = {
    "@type": "Organization",
    name: "Effy Tech",
    url: "https://www.effytechbd.com",
  };

  const creativeWorkStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${canonicalUrl}#case-study`,
    name: "Effy Edu Management System Case Study",
    description: pageDescription,
    url: canonicalUrl,
    image: ogImageUrl,
    creator,
    about: {
      "@id": `${canonicalUrl}#software`,
    },
  };

  const softwareApplicationStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${canonicalUrl}#software`,
    name: "Effy Edu Management System",
    description:
      "A web-based coaching management and student portal platform created by Effy Tech for Shifat's Tales.",
    url: liveProductionUrl,
    applicationCategory: "EducationalApplication",
    applicationSubCategory: "Coaching Management System",
    operatingSystem: "Any",
    image: ogImageUrl,
    creator,
    featureList: [
      "Course and batch publishing",
      "Student registration and protected portal access",
      "Class routines and academic calendars",
      "Study materials and learning resources",
      "Results and achievement publishing",
      "News, events, galleries and reviews",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(creativeWorkStructuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationStructuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <DHAShowcase data={effyEduManagementSystem} />
      <Footer />
    </>
  );
}
