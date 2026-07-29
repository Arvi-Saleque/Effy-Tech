import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Rocket,
  ShoppingBag,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Footer from "@/components/layout/Footer";
import { teamProfiles } from "@/data/teamProfiles";
import "@/styles/corporate-pages.css";

export const metadata = {
  title: "About Effy Tech | Software Product & Systems Company",
  description:
    "Learn how Effy Tech plans, designs, engineers, deploys, and supports practical software systems for businesses, institutions, and product teams.",
  alternates: { canonical: "/about" },
};

const industries = [
  [
    "Education",
    "Academic platforms, portals, results, materials, and administration.",
    GraduationCap,
  ],
  [
    "Islamic Technology",
    "Purpose-built products for worship, learning, and community workflows.",
    Landmark,
  ],
  [
    "Business Operations",
    "Internal tools, dashboards, reporting, and workflow automation.",
    Building2,
  ],
  [
    "E-commerce",
    "Product discovery, ordering, inventory, and management systems.",
    ShoppingBag,
  ],
  [
    "Healthcare & Services",
    "Structured experiences for appointments, records, and service delivery.",
    HeartPulse,
  ],
  [
    "Startups & Product Teams",
    "MVPs, scalable product foundations, and controlled iteration.",
    Rocket,
  ],
];

const profileRoutes = {
  salek: "/team/salek-bin-hossain",
  saif: "/team/abdullah-al-saif",
  adnan: "/team/adnan-bin-wahid",
};

export default function AboutPage() {
  const founders = ["salek", "saif", "adnan"].map((slug) => teamProfiles[slug]);

  return (
    <>
      <main className="effy-public-page corporate-page bg-surface text-text-primary">
        <section className="corporate-hero">
          <div className="corporate-grid" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumb current="About" />
            <div className="corporate-hero-copy">
              <p className="corporate-eyebrow">ABOUT EFFY TECH</p>
              <h1>Practical software systems, built with direct ownership.</h1>
              <p>
                Effy Tech plans, designs, engineers, deploys, and supports
                digital products for businesses, institutions, and product
                teams. We stay close to the real workflow and build for
                maintainable ownership after launch.
              </p>
              <div className="corporate-actions">
                <Link href="/projects" className="corporate-button-primary">
                  Explore Our Work <ArrowRight size={17} />
                </Link>
                <Link href="/contact" className="corporate-button-secondary">
                  Start a Conversation <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="corporate-section">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <article className="corporate-story-card">
              <p className="corporate-eyebrow">OUR FOCUS</p>
              <h2>
                Technology shaped around the problem—not the other way around.
              </h2>
              <p>
                We turn complex operational ideas into clear product scope,
                connected architecture, usable interfaces, dependable data
                workflows, and production-ready delivery.
              </p>
            </article>
            <div className="corporate-principles">
              {[
                [
                  "Business-first planning",
                  "The workflow and outcome define the technical direction.",
                ],
                [
                  "Scalable engineering",
                  "Clear boundaries and maintainable architecture leave room for growth.",
                ],
                [
                  "Direct communication",
                  "The people making product decisions remain involved in delivery.",
                ],
                [
                  "Long-term reliability",
                  "Security, handover, support, and ownership are built into the engagement.",
                ],
              ].map(([title, text], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="corporate-section bg-surface-alt">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="corporate-section-heading">
              <p className="corporate-eyebrow">WHO WE WORK WITH</p>
              <h2>
                Focused experience across product and operational domains.
              </h2>
            </div>
            <div className="industry-page-grid">
              {industries.map(([title, text, Icon]) => (
                <article key={title}>
                  <Icon size={23} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="corporate-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="corporate-section-heading corporate-heading-row">
              <div>
                <p className="corporate-eyebrow">LEADERSHIP</p>
                <h2>The people responsible for direction and delivery.</h2>
              </div>
              <Link href="/team" className="corporate-text-link">
                Meet the full team <ArrowRight size={17} />
              </Link>
            </div>
            <div className="team-page-grid">
              {founders.map((profile) => (
                <article key={profile.slug} className="team-page-card">
                  <div className="team-page-image">
                    <Image
                      src={profile.portrait}
                      alt={profile.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="team-page-copy">
                    <h3>{profile.name}</h3>
                    <strong>{profile.role}</strong>
                    <p>{profile.intro}</p>
                    <Link href={profileRoutes[profile.slug]}>
                      View profile <ArrowRight size={16} />
                    </Link>
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
