import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Layers3,
  Rocket,
  Search,
  ShieldCheck,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Footer from "@/components/layout/Footer";
import "@/styles/corporate-pages.css";

export const metadata = {
  title: "Software Delivery Process | Effy Tech",
  description:
    "See how Effy Tech discovers, architects, builds, launches, and supports custom software products and operational systems.",
  alternates: { canonical: "/process" },
};

const stages = [
  {
    number: "01",
    title: "Discover",
    label: "Understand",
    text: "We map the business, users, current workflow, constraints, risks, and measurable success criteria.",
    icon: Search,
  },
  {
    number: "02",
    title: "Architect",
    label: "Structure",
    text: "We define product boundaries, user journeys, data flows, integrations, release priorities, and the right technical direction.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Build",
    label: "Execute",
    text: "We design, engineer, test, review, and refine the system through focused, visible delivery cycles.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Launch",
    label: "Improve",
    text: "We deploy, verify, monitor, document, hand over, support, and improve the product after release.",
    icon: Rocket,
  },
];

const standards = [
  {
    title: "Business-first planning",
    text: "Technology choices follow the actual workflow and business objective.",
  },
  {
    title: "Secure, maintainable engineering",
    text: "Permissions, validation, clean boundaries, and understandable code are part of delivery.",
  },
  {
    title: "Responsive, tested experience",
    text: "Critical workflows are validated across devices before production release.",
  },
  {
    title: "Clear ownership and support",
    text: "Repository access, documentation, handover, and support scope are clarified before delivery closes.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <main className="effy-public-page corporate-page bg-surface text-text-primary">
        <section className="corporate-hero">
          <div className="corporate-grid" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumb current="Process" />
            <div className="corporate-hero-copy">
              <p className="corporate-eyebrow">A CONTROLLED DELIVERY SYSTEM</p>
              <h1>
                From operational complexity to a product ready for real use.
              </h1>
              <p>
                Our process keeps product decisions, engineering, quality,
                launch, and ownership connected from the first discussion
                onward.
              </p>
              <div className="corporate-actions">
                <Link href="/contact" className="corporate-button-primary">
                  Discuss Your Project <ArrowRight size={17} />
                </Link>
                <Link href="/projects" className="corporate-button-secondary">
                  See Delivered Systems <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="corporate-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="corporate-section-heading">
              <p className="corporate-eyebrow">THE FOUR STAGES</p>
              <h2>A clear path, with decisions made at the right time.</h2>
            </div>
            <div className="process-page-grid">
              {stages.map(({ number, title, label, text, icon: Icon }) => (
                <article key={title} className="process-page-card">
                  <div className="process-page-card-top">
                    <span>{number}</span>
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <p>{label}</p>
                  <h3>{title}</h3>
                  <div>{text}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="corporate-section corporate-section-dark">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
            <div className="corporate-section-heading">
              <p className="corporate-eyebrow">DELIVERY STANDARD</p>
              <h2>Quality is part of the process, not a final inspection.</h2>
              <ShieldCheck className="mt-8 text-primary-light" size={44} />
            </div>
            <div className="corporate-list">
              {standards.map((standard) => (
                <article key={standard.title}>
                  <CheckCircle2 size={20} aria-hidden="true" />
                  <div>
                    <h3>{standard.title}</h3>
                    <p>{standard.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
