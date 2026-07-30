import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  GitPullRequestArrow,
  LockKeyhole,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Footer from "@/components/layout/Footer";
import ProcessExplorer from "@/components/showcase/ProcessExplorer";
import "@/styles/about-process.css";

export const metadata = {
  title: "Software Delivery Process | Effy Tech",
  description:
    "Explore Effy Tech's seven-phase software delivery process from discovery and architecture through development, verification, deployment, handover, and iteration.",
  alternates: { canonical: "/process" },
  openGraph: {
    title: "Software Delivery Process | Effy Tech",
    description:
      "A controlled, reviewable path from operational problem to maintainable production system.",
    url: "/process",
    images: [
      {
        url: "/images/services/og-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Effy Tech software delivery capabilities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Delivery Process | Effy Tech",
    description:
      "Discovery, scope, architecture, development, review, deployment, and iteration connected in one delivery system.",
    images: ["/images/services/og-1200x630.jpg"],
  },
};

const deliveryControls = [
  {
    icon: ClipboardCheck,
    title: "Decision clarity",
    text: "Scope, priorities, assumptions, responsibilities, and open decisions stay visible before they become code.",
  },
  {
    icon: GitPullRequestArrow,
    title: "Review checkpoints",
    text: "The client reviews the right evidence at each phase instead of waiting for a final reveal.",
  },
  {
    icon: LockKeyhole,
    title: "Production discipline",
    text: "Permissions, data integrity, critical paths, deployment, and rollback readiness are verified deliberately.",
  },
  {
    icon: FileCheck2,
    title: "Maintainable handover",
    text: "Access, documentation, ownership, known limitations, and support scope are explicit at release.",
  },
];

const processLabels = [
  "Discovery",
  "Scope",
  "Architecture",
  "Development",
  "Review",
  "Deployment",
  "Iteration",
];

export default function ProcessPage() {
  return (
    <>
      <main className="effy-public-page ap-page">
        <section className="ap-hero process-hero">
          <div className="ap-dot-field" aria-hidden="true" />
          <div className="ap-orbit ap-orbit-one" aria-hidden="true" />
          <div className="ap-shell">
            <Breadcrumb current="Process" />
            <div className="ap-hero-layout">
              <div className="ap-hero-copy">
                <p className="ap-eyebrow">A CONTROLLED DELIVERY SYSTEM</p>
                <h1>
                  Every phase ends with{" "}
                  <span>evidence, a decision, or approval.</span>
                </h1>
                <p className="ap-hero-lede">
                  Our process connects the operational problem, product scope,
                  architecture, implementation, quality, release, and ownership.
                  Clients can see what is being decided, what is being built,
                  and what is ready to approve.
                </p>
                <div className="ap-actions">
                  <a
                    href="#delivery-process"
                    className="ap-button ap-button-dark"
                  >
                    Explore the 7 Phases
                    <ArrowRight size={17} aria-hidden="true" />
                  </a>
                  <Link href="/contact" className="ap-button ap-button-light">
                    Discuss Your Project
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div
                className="process-route-map"
                aria-label="Seven phases from discovery to iteration"
              >
                <div className="process-map-heading">
                  <span>
                    <i />
                    DELIVERY ROUTE
                  </span>
                  <strong>7 reviewable phases</strong>
                </div>
                <ol>
                  {processLabels.map((label, index) => (
                    <li key={label}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <strong>{label}</strong>
                        <small>
                          {index === processLabels.length - 1
                            ? "Operate & improve"
                            : "Decision checkpoint"}
                        </small>
                      </div>
                      <CheckCircle2 size={16} aria-hidden="true" />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <ProcessExplorer />

        <section className="ap-section ap-section-dark">
          <div className="ap-shell">
            <div className="ap-dark-heading">
              <div className="ap-section-heading">
                <p className="ap-eyebrow">DELIVERY CONTROLS</p>
                <h2>
                  Quality is designed into the route, not added at the end.
                </h2>
              </div>
              <p>
                The exact tools and ceremonies change with the project. The
                controls do not: important decisions remain explicit, work is
                reviewable, and production ownership is clear.
              </p>
            </div>
            <div className="process-control-grid">
              {deliveryControls.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <span className="ap-icon-box">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ap-section">
          <div className="ap-shell process-ownership">
            <div className="process-ownership-copy">
              <p className="ap-eyebrow">AFTER RELEASE</p>
              <h2>
                Launch is a transfer into real ownership—not the finish line.
              </h2>
              <p>
                The production system, administrative access, repository,
                deployment path, documentation, known decisions, and support
                scope are brought together so the product can be operated and
                improved deliberately.
              </p>
              <Link href="/projects" className="ap-inline-link">
                See systems delivered this way
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="process-ownership-list">
              {[
                "Production and administrative access clarified",
                "Critical release paths verified",
                "Repository and technical ownership documented",
                "Known limitations and next priorities recorded",
                "Support and iteration scope agreed",
              ].map((item) => (
                <div key={item}>
                  <CheckCircle2 size={19} aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ap-cta">
          <div className="ap-shell">
            <div>
              <p className="ap-eyebrow">START WITH THE REAL PROBLEM</p>
              <h2>Tell us what must work better.</h2>
              <p>
                You do not need a finished feature list. Bring the current
                workflow, the users involved, and the result you need. Discovery
                will turn that context into the first controlled decisions.
              </p>
            </div>
            <div className="ap-actions">
              <Link href="/contact" className="ap-button ap-button-gold">
                Start Discovery
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/services" className="ap-button ap-button-ghost">
                Explore Capabilities
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
