import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CircleDollarSign,
  ExternalLink,
  Film,
  Mail,
  MessageCircle,
  MonitorPlay,
  MousePointerClick,
  Sparkles,
  Target,
  Video,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Footer from "@/components/layout/Footer";
import TypingHeroTitle from "@/components/hiring/TypingHeroTitle";
import projects from "@/data/projects";
import {
  applicationLinks,
  collaborationSteps,
  faqs,
  preferredSkills,
  requiredSkills,
  roleHighlights,
  roleResponsibilities,
  selectionSteps,
  workValues,
} from "@/data/videoEditorHiring";
import siteConfig from "@/theme/siteConfig";
import "@/styles/video-editor-hiring.css";

export const metadata = {
  title: "Project-Based Product Video Editor | Effy Tech",
  description:
    "Apply to create professional product showcase and ad-ready videos for Effy Tech websites, web apps, mobile apps, and software platforms.",
  keywords: [
    "video editor job Bangladesh",
    "project based video editor",
    "CapCut video editor",
    "product video editor",
    "remote video editor Bangladesh",
    "Effy Tech hiring",
  ],
  alternates: { canonical: "/hire/project-based-video-editor" },
  openGraph: {
    title: "We’re Hiring — Project-Based Product Video Editor",
    description:
      "Create professional product videos for websites, web apps, mobile apps, and software platforms at Effy Tech.",
    url: "/hire/project-based-video-editor",
    type: "website",
    images: [
      {
        url: "/images/projects/og-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Effy Tech product and software projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "We’re Hiring — Project-Based Product Video Editor",
    description:
      "A remote, paid, project-based video editing opportunity at Effy Tech.",
    images: ["/images/projects/og-1200x630.jpg"],
  },
};

const selectedProjects = [...projects].sort((a, b) => a.order - b.order);

const roleSummary = [
  ["Work model", "Remote · Project-based"],
  ["Main focus", "Product showcase videos"],
  ["Editing tools", "CapCut or equivalent"],
  ["Campaign owner", "Effy Tech"],
];

const commissionExamples = [
  ["৳20,000", "৳1,000"],
  ["৳50,000", "৳2,500"],
  ["৳1,00,000", "৳5,000"],
];

const jobPostingJsonLd = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "Project-Based Product Video Editor",
  description:
    "Create professional product showcase and ad-ready videos for Effy Tech websites, web apps, mobile apps, and software platforms. The role is remote and paid per project.",
  datePosted: "2026-07-31",
  employmentType: "CONTRACTOR",
  jobLocationType: "TELECOMMUTE",
  applicantLocationRequirements: {
    "@type": "Country",
    name: "Bangladesh",
  },
  hiringOrganization: {
    "@type": "Organization",
    name: siteConfig.name,
    sameAs: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
  },
};

function ApplicationActions({ compact = false, location = "page" }) {
  return (
    <div
      className={`hire-application-actions ${compact ? "is-compact" : ""}`}
    >
      <a
        className="hire-button hire-button-primary"
        href={applicationLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        data-application-channel="whatsapp"
        data-application-location={location}
      >
        <MessageCircle aria-hidden="true" />
        Apply via WhatsApp
        <ArrowRight aria-hidden="true" />
      </a>
      <a
        className="hire-button hire-button-secondary"
        href={applicationLinks.email}
        data-application-channel="email"
        data-application-location={location}
      >
        <Mail aria-hidden="true" />
        Email CV
      </a>
    </div>
  );
}

function SectionHeading({ label, title, description }) {
  return (
    <div className="hire-section-heading">
      <p className="hire-eyebrow">{label}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export default function ProjectBasedVideoEditorPage() {
  return (
    <>
      <main className="hire-page">
        <section className="hire-hero">
          <div className="hire-dot-field" aria-hidden="true" />
          <div className="hire-orbit hire-orbit-one" aria-hidden="true" />
          <div className="hire-orbit hire-orbit-two" aria-hidden="true" />

          <div className="hire-shell">
            <Breadcrumb current="Video Editor Opening" />

            <div className="hire-hero-grid">
              <div className="hire-hero-copy">
                <div className="hire-status-line">
                  <span>
                    <i aria-hidden="true" />
                    APPLICATIONS OPEN
                  </span>
                  <small>Bangladesh · Remote</small>
                </div>

                <p className="hire-eyebrow">WE’RE HIRING</p>
                <TypingHeroTitle />
                <p className="hire-hero-lede">
                  Effy Tech is looking for a{" "}
                  <strong>Project-Based Product Video Editor</strong>—যিনি
                  website, web app এবং mobile app বুঝে professional showcase ও
                  ad-ready video তৈরি করতে পারবেন।
                </p>

                <div className="hire-highlight-list" aria-label="Role highlights">
                  {roleHighlights.map((item) => (
                    <span key={item}>
                      <Check aria-hidden="true" />
                      {item}
                    </span>
                  ))}
                </div>

                <ApplicationActions location="hero" />

                <p className="hire-hero-note">
                  WhatsApp button-এ click করলে structured application format
                  automatically open হবে। Only shortlisted candidates will be
                  contacted.
                </p>
              </div>

              <aside className="hire-brief-card" aria-label="Role summary">
                <div className="hire-brief-top">
                  <span>
                    <Video aria-hidden="true" />
                  </span>
                  <div>
                    <p>OPEN ROLE / 01</p>
                    <h2>Product Video Editor</h2>
                  </div>
                </div>

                <div className="hire-video-frame">
                  <div className="hire-frame-bar">
                    <span />
                    <span />
                    <span />
                    <small>PRODUCT STORY / DRAFT</small>
                  </div>
                  <div className="hire-frame-body">
                    <div className="hire-play-button">
                      <Film aria-hidden="true" />
                    </div>
                    <div className="hire-timeline" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>

                <dl className="hire-role-summary">
                  {roleSummary.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="hire-preference-note">
                  <BadgeCheck aria-hidden="true" />
                  <p>
                    এই opening-এ <strong>male candidate preferred</strong>.
                    Digital marketing knowledge থাকলে extra priority।
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="hire-intro hire-section">
          <div className="hire-shell">
            <SectionHeading
              label="THE REAL ROLE"
              title="শুধু footage cut করা নয়—product-এর value বুঝিয়ে দেখানো।"
              description="Viewer যেন কয়েক সেকেন্ডের মধ্যে বুঝতে পারে productটি কার জন্য, কোন problem solve করে এবং কেন action নেওয়া উচিত—এই clarity তৈরি করাই roleটির core responsibility."
            />

            <div className="hire-intro-grid">
              <article>
                <span>
                  <MonitorPlay aria-hidden="true" />
                </span>
                <p>01 / UNDERSTAND</p>
                <h3>Explore the actual product</h3>
                <div>
                  Demo use করা, user journey দেখা এবং strongest feature
                  identify করা।
                </div>
              </article>
              <article>
                <span>
                  <Sparkles aria-hidden="true" />
                </span>
                <p>02 / STRUCTURE</p>
                <h3>Turn features into a story</h3>
                <div>
                  Hook, problem, feature proof, benefit এবং CTA-কে short flow-তে
                  সাজানো।
                </div>
              </article>
              <article>
                <span>
                  <Target aria-hidden="true" />
                </span>
                <p>03 / CONVERT</p>
                <h3>Edit for real campaigns</h3>
                <div>
                  Scroll-stopping opening, clean pacing এবং ad-friendly format
                  দিয়ে conversion support করা।
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="hire-projects hire-section">
          <div className="hire-shell">
            <div className="hire-heading-row">
              <SectionHeading
                label="PROJECTS YOU MAY SHOWCASE"
                title="Marketing imaginary product নয়—real shipped work."
                description="Selected editor Effy Tech-এর live mobile product, coaching platform, academic system এবং institutional website নিয়ে কাজ করার সুযোগ পাবেন।"
              />
              <Link className="hire-text-link" href="/projects">
                Explore full portfolio
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>

            <div className="hire-project-grid">
              {selectedProjects.map((project, index) => (
                <article className="hire-project-card" key={project.id}>
                  <Link
                    className="hire-project-media"
                    href={project.caseStudyUrl}
                    aria-label={`Explore ${project.title} case study`}
                  >
                    <Image
                      src={project.thumbnail}
                      alt={`${project.title} project preview`}
                      fill
                      sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw"
                    />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </Link>
                  <div className="hire-project-copy">
                    <p>{project.eyebrow}</p>
                    <h3>{project.title}</h3>
                    <div>{project.description}</div>
                    <ul aria-label={`${project.title} technologies`}>
                      {project.tags.slice(0, 3).map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <Link href={project.caseStudyUrl}>
                      View case study
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="hire-scope hire-section">
          <div className="hire-shell">
            <SectionHeading
              label="WHAT YOU’LL OWN"
              title="Concept থেকে editable handover—একটি complete video workflow."
              description="Exact deliverables project brief অনুযায়ী final হবে। নিচের responsibilities editor-এর expected ownership পরিষ্কার করে।"
            />

            <div className="hire-responsibility-grid">
              {roleResponsibilities.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="hire-boundary-note">
              <div>
                <MousePointerClick aria-hidden="true" />
              </div>
              <p>
                <strong>Clear responsibility boundary:</strong> Editor video
                concept, recording, edit এবং deliverables handle করবেন। Meta
                campaign setup, targeting, ad budget, lead handling এবং sales
                follow-up <strong>Effy Tech manage করবে</strong>।
              </p>
            </div>
          </div>
        </section>

        <section className="hire-fit hire-section">
          <div className="hire-shell">
            <SectionHeading
              label="SKILLS & CHARACTER"
              title="Strong execution matters. Character and reliabilityও equally important."
            />

            <div className="hire-fit-grid">
              <article className="hire-skill-panel">
                <div className="hire-panel-heading">
                  <span>01</span>
                  <div>
                    <p>REQUIRED</p>
                    <h3>What you should already handle</h3>
                  </div>
                </div>
                <ul>
                  {requiredSkills.map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="hire-skill-panel is-preferred">
                <div className="hire-panel-heading">
                  <span>02</span>
                  <div>
                    <p>EXTRA PRIORITY</p>
                    <h3>Useful skills, but not mandatory</h3>
                  </div>
                </div>
                <ul>
                  {preferredSkills.map((item) => (
                    <li key={item}>
                      <Sparkles aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="hire-access-note">
                  প্রয়োজন অনুযায়ী Google Flow access Effy Tech থেকে দেওয়া হবে।
                </p>
              </article>
            </div>

            <div className="hire-values-grid">
              {workValues.map((value, index) => (
                <article key={value.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="hire-process hire-section">
          <div className="hire-shell">
            <SectionHeading
              label="HOW COLLABORATION WORKS"
              title="A clear route from product access to campaign-ready video."
              description="Project-based collaboration হলেও scope, feedback, ownership এবং handover শুরুতেই clear থাকবে।"
            />

            <ol className="hire-process-list">
              {collaborationSteps.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  <Check aria-hidden="true" />
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="hire-opportunity hire-section">
          <div className="hire-shell hire-opportunity-grid">
            <div className="hire-opportunity-copy">
              <p className="hire-eyebrow">PAYMENT & PERFORMANCE OPPORTUNITY</p>
              <h2>Project fee-এর বাইরে 5% performance commission.</h2>
              <p>
                প্রতিটি video-এর fee scope অনুযায়ী কাজ শুরুর আগে agree করা হবে।
                এরপর সেই specific video ব্যবহার করে Effy Tech পরিচালিত campaign
                থেকে verified new client এসে project confirm করলে, editor ওই
                client-এর <strong>first project-এর collected value-এর 5%</strong>{" "}
                commission পাবেন।
              </p>
              <div className="hire-commission-note">
                <CircleDollarSign aria-hidden="true" />
                <p>
                  Client payment receive হওয়ার পর commission payable হবে।
                  Installment এলে received amount অনুযায়ী proportionately
                  commission দেওয়া হবে।
                </p>
              </div>
            </div>

            <div className="hire-commission-card">
              <div className="hire-commission-head">
                <p>5% COMMISSION / EXAMPLES</p>
                <span>Verified first project</span>
              </div>
              <div className="hire-commission-table" role="table">
                <div role="row">
                  <span role="columnheader">Client project value</span>
                  <span role="columnheader">Editor commission</span>
                </div>
                {commissionExamples.map(([value, commission]) => (
                  <div role="row" key={value}>
                    <span role="cell">{value}</span>
                    <strong role="cell">{commission}</strong>
                  </div>
                ))}
              </div>
              <small>
                Existing lead বা campaign-এর আগে Effy Tech-এর সঙ্গে যোগাযোগে
                থাকা client এই attribution-এর মধ্যে পড়বে না।
              </small>
            </div>
          </div>
        </section>

        <section className="hire-selection hire-section">
          <div className="hire-shell hire-selection-grid">
            <div>
              <SectionHeading
                label="SELECTION PROCESS"
                title="Portfolio first. Then a focused paid pilot."
                description="Unpaid custom video sample চাওয়া হবে না। Short written concept আমাদের product understanding ও creative thinking evaluate করতে সাহায্য করবে।"
              />
              <ol className="hire-selection-list">
                {selectionSteps.map((step, index) => (
                  <li key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="hire-application-pack">
              <p className="hire-eyebrow">YOUR APPLICATION PACK</p>
              <h2>Apply করার আগে এগুলো ready রাখুন.</h2>
              <ul>
                {[
                  "Updated CV or resume",
                  "Portfolio link",
                  "Best 2 video sample links",
                  "Editing tools and relevant experience",
                  "Expected fee and delivery time",
                  "One short Effy Tech project concept",
                ].map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <ApplicationActions compact location="selection" />
              <p>
                Email application করলে send করার আগে CV attachment manually
                add করুন।
              </p>
            </aside>
          </div>
        </section>

        <section className="hire-faq hire-section">
          <div className="hire-shell">
            <SectionHeading
              label="FAQ"
              title="Apply করার আগে common প্রশ্নগুলোর clear answer."
            />
            <div className="hire-faq-grid">
              {faqs.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {item.question}
                    <i aria-hidden="true" />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="hire-apply" id="apply">
          <div className="hire-shell hire-apply-grid">
            <div>
              <p className="hire-eyebrow">READY TO APPLY?</p>
              <h2>Show us how you think, not only which tool you use.</h2>
              <p>
                Structured WhatsApp format complete করুন অথবা professional email
                application-এর সঙ্গে CV attach করুন।
              </p>
              <ApplicationActions location="final" />
            </div>
            <div className="hire-direct-contact">
              <div>
                <MessageCircle aria-hidden="true" />
                <span>
                  <small>WhatsApp</small>
                  <strong>{applicationLinks.whatsappNumber}</strong>
                </span>
              </div>
              <div>
                <Mail aria-hidden="true" />
                <span>
                  <small>Email</small>
                  <strong>{applicationLinks.emailAddress}</strong>
                </span>
              </div>
              <p>
                Direct “Hi” message-এর বদলে application template complete করলে
                review faster হবে।
              </p>
            </div>
          </div>
        </section>

        <section className="hire-client-cta">
          <div className="hire-shell">
            <div>
              <p className="hire-eyebrow">HERE AS A POTENTIAL CLIENT?</p>
              <h2>Need a website, app, or operational software?</h2>
              <p>
                Effy Tech real workflow বুঝে websites, mobile products,
                management platforms, automation এবং custom software build করে।
              </p>
            </div>
            <div>
              <Link className="hire-button hire-button-gold" href="/contact">
                Start a Project
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="hire-button hire-button-ghost" href="/projects">
                See Our Work
                <ExternalLink aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPostingJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
