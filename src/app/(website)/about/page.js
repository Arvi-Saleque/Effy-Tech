import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  Bot,
  Check,
  CloudCog,
  Code2,
  Database,
  Layers3,
  MoveRight,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Footer from "@/components/layout/Footer";
import projects from "@/data/projects";
import "@/styles/about-process.css";

export const metadata = {
  title: "About Effy Tech | Digital Product & Software Studio",
  description:
    "Effy Tech is a product-minded, engineering-led software studio building custom platforms, mobile products, automation, cloud systems, and practical AI.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Effy Tech | Digital Product & Software Studio",
    description:
      "We translate real workflows into practical, maintainable software systems with direct product and engineering ownership.",
    url: "/about",
    images: [
      {
        url: "/images/projects/og-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Effy Tech digital products and software systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Effy Tech | Digital Product & Software Studio",
    description:
      "Product-minded, engineering-led software delivery shaped around real workflows.",
    images: ["/images/projects/og-1200x630.jpg"],
  },
};

const deliveryCapabilities = [
  {
    icon: Blocks,
    number: "01",
    label: "BUILD",
    title: "Products and platforms",
    text: "Custom websites, mobile apps, role-based platforms, dashboards, and operational software designed around the people who will use and manage them.",
    link: "/services#build",
    linkLabel: "Explore build capabilities",
  },
  {
    icon: Workflow,
    number: "02",
    label: "AUTOMATE",
    title: "Connected workflows",
    text: "Automation, APIs, reporting, integrations, and practical AI that reduce repeated work and keep operational information dependable.",
    link: "/services#automate",
    linkLabel: "Explore automation",
  },
  {
    icon: CloudCog,
    number: "03",
    label: "LAUNCH & GROW",
    title: "Production ownership",
    text: "Deployment, analytics, technical SEO, documentation, handover, maintenance, and iteration planned as part of the product—not as an afterthought.",
    link: "/services#grow",
    linkLabel: "Explore launch support",
  },
];

const engineeringLayers = [
  {
    icon: Smartphone,
    title: "Product & experience",
    text: "Scope, journeys, interface systems, responsive web, and mobile product decisions.",
    tools: "UX · Next.js · Flutter",
  },
  {
    icon: Code2,
    title: "Application engineering",
    text: "Frontend, backend, role-based administration, business rules, and dependable integrations.",
    tools: "React · APIs · Custom CMS",
  },
  {
    icon: Database,
    title: "Data & cloud",
    text: "Structured data models, authentication, local-first workflows, synchronization, and managed media.",
    tools: "PostgreSQL · MongoDB · Supabase",
  },
  {
    icon: ShieldCheck,
    title: "Quality & ownership",
    text: "Permissions, validation, testing, production verification, monitoring, documentation, and handover.",
    tools: "Security · QA · Deployment",
  },
];

const principles = [
  {
    title: "Product-minded",
    text: "Users, workflow gaps, constraints, and intended outcomes shape each decision.",
  },
  {
    title: "Engineering-led",
    text: "Maintainable foundations, explicit data flows, and controlled releases take priority over fragile shortcuts.",
  },
  {
    title: "Direct ownership",
    text: "Product direction and engineering remain close to the work from discovery through production.",
  },
  {
    title: "Built to evolve",
    text: "Clear boundaries, documentation, handover, and support leave the system ready for its next workflow.",
  },
];

const liveProjects = [...projects].sort((a, b) => a.order - b.order);

export default function AboutPage() {
  return (
    <>
      <main className="effy-public-page ap-page">
        <section className="ap-hero">
          <div className="ap-dot-field" aria-hidden="true" />
          <div className="ap-orbit ap-orbit-one" aria-hidden="true" />
          <div className="ap-orbit ap-orbit-two" aria-hidden="true" />
          <div className="ap-shell">
            <Breadcrumb current="About" />
            <div className="ap-hero-layout">
              <div className="ap-hero-copy">
                <p className="ap-eyebrow">DIGITAL PRODUCT & SOFTWARE STUDIO</p>
                <h1>
                  We turn real workflows into{" "}
                  <span>software people can operate.</span>
                </h1>
                <p className="ap-hero-lede">
                  Effy Tech plans, designs, engineers, deploys, and supports
                  custom platforms, mobile products, automation, cloud systems,
                  and practical AI. We start with the operational problem—not a
                  generic template or a predetermined stack.
                </p>
                <div className="ap-actions">
                  <Link href="/projects" className="ap-button ap-button-dark">
                    See Live Work <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                  <Link href="/contact" className="ap-button ap-button-light">
                    Discuss Your System{" "}
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </div>
                <div className="ap-hero-proof" aria-label="Effy Tech approach">
                  <span>
                    <Check size={15} aria-hidden="true" /> Product-minded
                  </span>
                  <span>
                    <Check size={15} aria-hidden="true" /> Engineering-led
                  </span>
                  <span>
                    <Check size={15} aria-hidden="true" /> Direct ownership
                  </span>
                </div>
              </div>

              <div
                className="ap-system-map"
                aria-label="Effy Tech connects workflow, product, engineering, and operations"
              >
                <div className="ap-map-grid" aria-hidden="true" />
                <div className="ap-map-label">
                  <i />
                  DELIVERY MODEL
                </div>
                <div className="ap-map-node ap-map-node-workflow">
                  <Workflow size={19} aria-hidden="true" />
                  <span>
                    <small>INPUT</small>
                    <strong>Real workflow</strong>
                  </span>
                </div>
                <div className="ap-map-node ap-map-node-product">
                  <Sparkles size={19} aria-hidden="true" />
                  <span>
                    <small>SHAPE</small>
                    <strong>Product decisions</strong>
                  </span>
                </div>
                <div className="ap-map-core">
                  <Layers3 size={27} aria-hidden="true" />
                  <span>
                    <small>CONNECTED SYSTEM</small>
                    <strong>Effy Tech</strong>
                  </span>
                </div>
                <div className="ap-map-node ap-map-node-engineering">
                  <Code2 size={19} aria-hidden="true" />
                  <span>
                    <small>BUILD</small>
                    <strong>Engineering</strong>
                  </span>
                </div>
                <div className="ap-map-node ap-map-node-operations">
                  <CloudCog size={19} aria-hidden="true" />
                  <span>
                    <small>OUTCOME</small>
                    <strong>Owned operations</strong>
                  </span>
                </div>
                <div className="ap-map-status">
                  <i /> DISCOVER → DESIGN → BUILD → OPERATE
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ap-section">
          <div className="ap-shell">
            <div className="ap-positioning">
              <div className="ap-section-heading">
                <p className="ap-eyebrow">WHO WE ARE</p>
                <h2>
                  A small, accountable team for connected software delivery.
                </h2>
              </div>
              <div className="ap-positioning-copy">
                <p>
                  We work where a public interface, internal operation, data,
                  administration, and long-term ownership need to function as
                  one system.
                </p>
                <p>
                  That may be a consumer mobile product, an institutional
                  website with its own publishing workflow, or a role-based
                  platform that replaces disconnected manual processes.
                </p>
                <Link href="/team">
                  Meet the people responsible for delivery
                  <MoveRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="ap-principle-grid">
              {principles.map((principle, index) => (
                <article key={principle.title}>
                  <span>0{index + 1}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ap-section ap-section-soft">
          <div className="ap-shell">
            <div className="ap-heading-row">
              <div className="ap-section-heading">
                <p className="ap-eyebrow">WHAT WE BUILD</p>
                <h2>
                  One delivery model across product, automation, and growth.
                </h2>
              </div>
              <Link href="/services" className="ap-inline-link">
                View all 20 capabilities
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="ap-capability-grid">
              {deliveryCapabilities.map(
                ({
                  icon: Icon,
                  number,
                  label,
                  title,
                  text,
                  link,
                  linkLabel,
                }) => (
                  <article key={title}>
                    <div className="ap-card-topline">
                      <span>{number}</span>
                      <Icon size={23} aria-hidden="true" />
                    </div>
                    <p className="ap-card-label">{label}</p>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <Link href={link}>
                      {linkLabel}
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="ap-section ap-section-dark">
          <div className="ap-shell">
            <div className="ap-dark-heading">
              <div className="ap-section-heading">
                <p className="ap-eyebrow">ENGINEERING CAPABILITY</p>
                <h2>The full system—not only the visible screen.</h2>
              </div>
              <p>
                Technology is selected around the product, existing workflow,
                data responsibility, integrations, delivery risk, and the way
                the system will be owned after launch.
              </p>
            </div>
            <div className="ap-engineering-grid">
              {engineeringLayers.map(({ icon: Icon, title, text, tools }) => (
                <article key={title}>
                  <span className="ap-icon-box">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <small>{tools}</small>
                </article>
              ))}
            </div>
            <div className="ap-ai-note">
              <Bot size={24} aria-hidden="true" />
              <div>
                <strong>Practical AI, where it earns its place.</strong>
                <p>
                  We use AI for suitable classification, retrieval, drafting,
                  support, document, and structured decision workflows—inside a
                  controlled product, not as a decorative feature.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="ap-section">
          <div className="ap-shell">
            <div className="ap-heading-row">
              <div className="ap-section-heading">
                <p className="ap-eyebrow">VERIFIED DELIVERY</p>
                <h2>
                  Different domains. The same accountable system thinking.
                </h2>
              </div>
              <Link href="/projects" className="ap-inline-link">
                Explore all case studies
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="ap-project-grid">
              {liveProjects.map((project, index) => (
                <Link href={project.caseStudyUrl} key={project.slug}>
                  <div className="ap-project-number">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <small>{project.status}</small>
                  </div>
                  <p>{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                  <div>{project.outcome}</div>
                  <span className="ap-project-action">
                    View case study
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="ap-cta">
          <div className="ap-shell">
            <div>
              <p className="ap-eyebrow">SMART SOLUTIONS. SIMPLE EXECUTION.</p>
              <h2>Bring the workflow. We will help define the system.</h2>
              <p>
                Share the current process, the operational gap, or the product
                idea. We will turn it into a clear route from discovery to
                production ownership.
              </p>
            </div>
            <div className="ap-actions">
              <Link href="/contact" className="ap-button ap-button-gold">
                Start a Conversation
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/process" className="ap-button ap-button-ghost">
                See Our Process
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
