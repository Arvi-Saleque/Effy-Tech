import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Workflow } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Footer from "@/components/layout/Footer";
import LeadershipRoster from "@/components/team/LeadershipRoster";
import { teamProfileOrder, teamProfiles } from "@/data/teamProfiles";
import "@/styles/corporate-pages.css";
import "@/styles/team-leadership-step5.css";

export const metadata = {
  title: "Leadership & Team | Effy Tech",
  description:
    "Meet the Effy Tech leaders responsible for product strategy, software architecture, engineering execution, quality, and production delivery.",
  alternates: { canonical: "/team" },
};

const accountabilityPrinciples = [
  {
    icon: Workflow,
    number: "01",
    title: "Direct decision path",
    description:
      "Product, architecture, implementation, and release questions stay connected to the people responsible for the outcome.",
  },
  {
    icon: CheckCircle2,
    number: "02",
    title: "Visible responsibility",
    description:
      "Each profile states the work owned, the systems contributed to, and the engineering strengths brought into delivery.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Review through launch",
    description:
      "Scope, technical quality, responsive behavior, data workflows, and release readiness are reviewed as one delivery system.",
  },
];

export default function TeamPage() {
  const profiles = teamProfileOrder.map((slug) => teamProfiles[slug]);

  return (
    <>
      <main className="effy-public-page corporate-page bg-surface text-text-primary">
        <section className="corporate-hero">
          <div className="corporate-grid" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumb
              items={[{ label: "Company", href: "/about" }]}
              current="Team"
            />
            <div className="corporate-hero-copy">
              <p className="corporate-eyebrow">LEADERSHIP & TEAM</p>
              <h1>Small team. Direct ownership. Clear accountability.</h1>
              <p>
                The people shaping scope and architecture remain close to
                implementation, quality, launch, and long-term product
                decisions.
              </p>
              <div className="corporate-actions">
                <a href="#leadership" className="corporate-button-primary">
                  Explore leadership roles <ArrowRight size={17} />
                </a>
                <Link href="/process" className="corporate-button-secondary">
                  See our delivery process
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="leadership"
          aria-labelledby="leadership-title"
          className="corporate-section team-leadership-section"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="corporate-section-heading corporate-heading-row">
              <div>
                <p className="corporate-eyebrow">WHO OWNS WHAT</p>
                <h2 id="leadership-title">
                  Leadership responsibilities, not decorative titles.
                </h2>
              </div>
              <p className="team-leadership-guidance">
                Select a profile to inspect its delivery role. Use the arrow
                keys, Home, or End when navigating by keyboard.
              </p>
            </div>
            <LeadershipRoster profiles={profiles} />
          </div>
        </section>

        <section className="team-accountability-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="team-accountability-heading">
              <div>
                <p className="corporate-eyebrow">HOW THE TEAM OPERATES</p>
                <h2>Accountability follows the work from scope to release.</h2>
              </div>
              <p>
                Effy Tech keeps ownership visible across the decisions that
                shape a production system. Individual profiles show the specific
                responsibilities and evidence behind each role.
              </p>
            </div>

            <div className="team-accountability-grid">
              {accountabilityPrinciples.map(
                ({ icon: Icon, number, title, description }) => (
                  <article key={number}>
                    <div>
                      <span>{number}</span>
                      <Icon aria-hidden="true" size={22} />
                    </div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="corporate-cta">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8">
            <div>
              <p className="corporate-eyebrow">WORK WITH EFFY TECH</p>
              <h2>Bring us the workflow, problem, or product idea.</h2>
            </div>
            <Link href="/contact" className="corporate-button-gold">
              Start a Project <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
