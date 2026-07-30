import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Footer from "@/components/layout/Footer";
import ContactInquiryForm from "@/components/contact/ContactInquiryForm";
import {
  contactChannels,
  inquirySteps,
  projectBriefChecklist,
  socialLinks,
} from "@/data/contactPage";
import "@/styles/contact-step6.css";

export const metadata = {
  title: "Contact Effy Tech | Start a Software Project",
  description:
    "Share your workflow, users, constraints, and desired outcome with Effy Tech to begin a focused software-project discussion.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Start a Project with Effy Tech",
    description:
      "Share the operational problem, users, constraints, and delivery context behind your software requirement.",
    url: "/contact",
    type: "website",
  },
};

const channelIcons = {
  email: Mail,
  phone: Phone,
  whatsapp: MessageCircle,
  location: Building2,
};

function ContactChannel({ channel }) {
  const Icon = channelIcons[channel.id];
  const content = (
    <>
      <span className="contact6-channel-icon">
        <Icon aria-hidden="true" />
      </span>
      <span className="contact6-channel-text">
        <small>{channel.label}</small>
        <strong>{channel.value}</strong>
      </span>
      {channel.href && <ArrowRight aria-hidden="true" />}
    </>
  );

  if (!channel.href) {
    return <div className="contact6-channel">{content}</div>;
  }

  return (
    <a
      className="contact6-channel"
      href={channel.href}
      target={channel.external ? "_blank" : undefined}
      rel={channel.external ? "noopener noreferrer" : undefined}
    >
      {content}
    </a>
  );
}

export default function ContactPage() {
  return (
    <>
      <main className="contact6-page">
        <section className="contact6-hero">
          <div className="contact6-grid" aria-hidden="true" />
          <div className="contact6-shell">
            <Breadcrumb current="Contact" />

            <div className="contact6-hero-grid">
              <div className="contact6-hero-copy">
                <p className="contact6-eyebrow">START A PROJECT</p>
                <h1>Start with the problem. Build the right system.</h1>
                <p>
                  Share the workflow, users, constraints, and outcome behind the
                  requirement. A useful first discussion should clarify the real
                  problem before it turns into a feature list.
                </p>
                <div className="contact6-hero-actions">
                  <a className="contact6-primary-action" href="#project-brief">
                    Share project brief
                    <ArrowRight aria-hidden="true" />
                  </a>
                  <Link className="contact6-secondary-action" href="/process">
                    Review delivery process
                  </Link>
                </div>
              </div>

              <aside
                className="contact6-brief-card"
                aria-labelledby="brief-checklist-title"
              >
                <p id="brief-checklist-title">A useful brief includes</p>
                <ul>
                  {projectBriefChecklist.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className="contact6-conversion" id="project-brief">
          <div className="contact6-shell contact6-conversion-grid">
            <div className="contact6-channel-copy">
              <p className="contact6-eyebrow">DIRECT CONTACT</p>
              <h2>Choose the clearest way to reach us.</h2>
              <p>
                Use the structured brief for a new project. Email and WhatsApp
                remain available for references, documents, and direct context.
              </p>

              <div className="contact6-channels">
                {contactChannels.map((channel) => (
                  <ContactChannel key={channel.id} channel={channel} />
                ))}
              </div>

              <div className="contact6-socials" aria-label="Effy Tech socials">
                <span>Follow:</span>
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            </div>

            <div className="contact6-form-card">
              <div className="contact6-form-head">
                <div>
                  <p className="contact6-eyebrow">PROJECT BRIEF</p>
                  <h2>Describe the requirement.</h2>
                </div>
                <p>
                  Focus on the current workflow and required outcome. Technical
                  details can be clarified afterward.
                </p>
              </div>
              <ContactInquiryForm />
            </div>
          </div>
        </section>

        <section className="contact6-next" aria-labelledby="contact-next-title">
          <div className="contact6-shell">
            <p className="contact6-eyebrow">AFTER THE INQUIRY</p>
            <h2 id="contact-next-title">
              A clear path from context to the next decision.
            </h2>
            <div className="contact6-step-grid">
              {inquirySteps.map((step) => (
                <article className="contact6-step" key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
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
