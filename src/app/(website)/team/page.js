import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Footer from "@/components/layout/Footer";
import { teamProfiles } from "@/data/teamProfiles";
import "@/styles/corporate-pages.css";

export const metadata = {
  title: "Leadership & Team | Effy Tech",
  description:
    "Meet the Effy Tech leaders responsible for product strategy, software architecture, engineering execution, quality, and production delivery.",
  alternates: { canonical: "/team" },
};

const routes = {
  salek: "/team/salek-bin-hossain",
  saif: "/team/abdullah-al-saif",
  adnan: "/team/adnan-bin-wahid",
};

export default function TeamPage() {
  const profiles = ["salek", "saif", "adnan"].map((slug) => teamProfiles[slug]);

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
            </div>
          </div>
        </section>

        <section className="corporate-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="team-page-grid">
              {profiles.map((profile, index) => (
                <article key={profile.slug} className="team-page-card">
                  <div className="team-page-image">
                    <span>0{index + 1}</span>
                    <Image
                      src={profile.portrait}
                      alt={`${profile.name}, ${profile.role} at Effy Tech`}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="team-page-copy">
                    <h2>{profile.name}</h2>
                    <strong>{profile.role}</strong>
                    <small>{profile.discipline}</small>
                    <p>{profile.intro}</p>
                    <Link href={routes[profile.slug]}>
                      Explore leadership profile <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
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
