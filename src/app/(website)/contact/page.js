import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/sections/ContactForm";
import siteConfig from "@/theme/siteConfig";
import "@/styles/corporate-pages.css";

export const metadata = {
  title: "Contact Effy Tech | Start a Software Project",
  description:
    "Share your software product, website, mobile app, automation, AI, or operational-system requirement with Effy Tech.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const whatsappUrl =
    "https://wa.me/8801511190270?text=" +
    encodeURIComponent(
      "Hello Effy Tech, I would like to discuss a software project.",
    );

  return (
    <>
      <main className="effy-public-page corporate-page contact-page bg-surface text-text-primary">
        <section className="contact-page-section">
          <div className="corporate-grid" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumb current="Contact" />
            <div className="contact-page-layout">
              <div className="contact-page-copy">
                <p className="corporate-eyebrow">START A PROJECT</p>
                <h1>Tell us what needs to work better.</h1>
                <p>
                  Share the problem, current workflow, target users, deadline,
                  and outcome you need. We will help define a practical product
                  and technical direction.
                </p>

                <div className="contact-page-details">
                  <a href={`mailto:${siteConfig.contact.email}`}>
                    <Mail size={20} aria-hidden="true" />
                    <span>
                      <small>Business email</small>
                      <strong>{siteConfig.contact.email}</strong>
                    </span>
                  </a>
                  <a href={`tel:${siteConfig.contact.phone}`}>
                    <Phone size={20} aria-hidden="true" />
                    <span>
                      <small>Phone</small>
                      <strong>{siteConfig.contact.phone}</strong>
                    </span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={20} aria-hidden="true" />
                    <span>
                      <small>WhatsApp</small>
                      <strong>Direct project discussion</strong>
                    </span>
                  </a>
                  <div>
                    <Building2 size={20} aria-hidden="true" />
                    <span>
                      <small>Location</small>
                      <strong>{siteConfig.contact.address}</strong>
                    </span>
                  </div>
                </div>

                <div className="contact-response-note">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  Usually responds within one business day.
                </div>
                <Link href="/process" className="corporate-text-link">
                  See how delivery works
                </Link>
              </div>

              <div className="contact-page-form">
                <div>
                  <p className="corporate-eyebrow">PROJECT BRIEF</p>
                  <h2>Share the requirement.</h2>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
