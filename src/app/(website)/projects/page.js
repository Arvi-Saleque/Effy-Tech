import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Layers3,
  MoveRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Footer from "@/components/layout/Footer";
import ProjectPortfolioExplorer from "@/components/showcase/ProjectPortfolioExplorer";
import {
  BrowserMockup,
  MotionBoundary,
  TiltSurface,
} from "@/components/visuals";
import projects from "@/data/projects";
import "@/styles/spatial-components.css";
import "@/styles/projects-spatial.css";

export const metadata = {
  title: "Live Project Case Studies | Effy Tech",
  description:
    "Explore live Effy Tech products and client platforms across mobile, coaching management, academic operations, institutional websites, and custom content systems.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Live Project Case Studies | Effy Tech",
    description:
      "Real products and operational systems designed, engineered, launched, and supported by Effy Tech.",
    url: "/projects",
    images: [
      {
        url: "/images/projects/og-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Effy Tech live project case studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Project Case Studies | Effy Tech",
    description:
      "Real products and operational systems designed, engineered, launched, and supported by Effy Tech.",
    images: ["/images/projects/og-1200x630.jpg"],
  },
};

const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
const capabilities = [
  {
    icon: Layers3,
    title: "Connected systems",
    description:
      "Public experiences, internal workflows, data, content, and administration designed as one product.",
  },
  {
    icon: ShieldCheck,
    title: "Production ownership",
    description:
      "Planning, engineering, deployment, analytics, handover, and post-launch support handled end to end.",
  },
  {
    icon: Sparkles,
    title: "Purpose-built delivery",
    description:
      "Each system is shaped around the organisation, audience, and operational problem - not a generic template.",
  },
];

const projectPreviewTitles = {
  IAM: "play.google.com · Islamic Amal Tracker",
  EEMS: "shifatstales.com · Coaching management",
  DHA: "dhakhl.com · Darul Hikmah Academy",
  BUEK: "buekbd.com · University platform",
};

function ProjectsHeroVisual() {
  return (
    <MotionBoundary className="projects-hero-motion">
      <TiltSurface
        className="projects-hero-tilt"
        maxTilt={2.8}
        perspective={1300}
      >
        <div
          className="projects-spatial-stage"
          aria-label={`${sortedProjects.length} live Effy Tech product and platform previews`}
        >
          <div className="projects-stage-grid" aria-hidden="true" />
          {sortedProjects.map((project, index) => (
            <div
              className={`projects-hero-layer projects-hero-layer-${index + 1}`}
              key={project.slug}
            >
              <BrowserMockup
                label={`${project.title} live project preview`}
                title={projectPreviewTitles[project.slug]}
              >
                <div className="projects-hero-screen">
                  <Image
                    src={project.thumbnail}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 80vw, 460px"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </BrowserMockup>
            </div>
          ))}
          <div className="projects-stage-core">
            <span>{String(sortedProjects.length).padStart(2, "0")}</span>
            <div>
              <small>LIVE SYSTEMS</small>
              <strong>Product · Platforms · CMS</strong>
            </div>
          </div>
        </div>
      </TiltSurface>
    </MotionBoundary>
  );
}

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Effy Tech live project case studies",
    itemListElement: sortedProjects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: `https://www.effytechbd.com${project.caseStudyUrl}`,
        image: `https://www.effytechbd.com${project.thumbnail}`,
      },
    })),
  };
  return (
    <>
      <main className="effy-public-page effy-projects-index min-h-screen bg-surface pt-24 text-text-primary">
        <section className="projects-spatial-hero relative overflow-hidden border-b border-border bg-surface pb-16 pt-10 sm:pb-20 lg:pb-24">
          <div className="pointer-events-none absolute inset-0 opacity-50">
            <div className="absolute -right-24 top-16 h-72 w-72 rounded-full border border-primary-light/30" />
            <div className="absolute -right-10 top-32 h-72 w-72 rounded-full border border-neutral-300/65" />
            <div
              className="absolute inset-0 opacity-[0.28]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(123,102,58,0.22) 1px, transparent 1px)",
                backgroundSize: "34px 34px",
                maskImage: "linear-gradient(to bottom, black, transparent 82%)",
              }}
            />
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8">
            <Breadcrumb current="Projects" />
            <div className="mt-11 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Selected live work
                </p>
                <h1 className="mt-5 max-w-5xl font-heading text-4xl font-black leading-[1.02] tracking-[-0.04em] text-text-primary sm:text-6xl lg:text-7xl">
                  Products and platforms built for the real world.
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary sm:text-xl">
                  These are not design concepts. They are live products and
                  client systems planned, engineered, deployed, and supported by
                  Effy Tech.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-surface-dark px-6 py-3 text-sm font-bold text-text-inverse transition-transform hover:-translate-y-0.5"
                  >
                    Start a Project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="#case-studies"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-border bg-neutral-white px-6 py-3 text-sm font-bold text-text-primary transition-colors hover:border-primary/45"
                  >
                    Explore Case Studies
                    <MoveRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <ProjectsHeroVisual />
            </div>
            <div className="projects-capability-strip">
              <p>WHAT THIS WORK DEMONSTRATES</p>
              <div>
                {capabilities.map(({ icon: Icon, title, description }) => (
                  <article key={title}>
                    <span>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2>{title}</h2>
                      <p>{description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        <ProjectPortfolioExplorer />
        <section className="bg-surface-alt py-16 sm:py-20">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 border-y border-border py-8 sm:grid-cols-3">
              {[
                {
                  k: "Discovery",
                  t: "We clarify the operational problem, audience, scope, risks, and launch priorities before development begins.",
                },
                {
                  k: "Engineering",
                  t: "Architecture, interface, backend, data, deployment, and quality are designed as one connected delivery.",
                },
                {
                  k: "Ownership",
                  t: "Clients receive a maintainable system, clear handover, and a team that remains accountable after launch.",
                },
              ].map((item) => (
                <div key={item.k}>
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    {item.k}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {item.t}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-surface-dark py-16 text-text-inverse sm:py-20">
          <div className="grid gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary-light">
                Your system can be next
              </p>
              <h2 className="mt-4 max-w-3xl font-heading text-3xl font-black leading-tight text-neutral-100 sm:text-5xl">
                Have a website, platform, or product that needs serious
                engineering?
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-neutral-400">
                Share the problem, current workflow, or product idea. We will
                help define the right system and a practical route to launch.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-primary-light px-7 py-3 text-sm font-black text-neutral-900 transition-transform hover:-translate-y-0.5"
            >
              Discuss Your Project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
