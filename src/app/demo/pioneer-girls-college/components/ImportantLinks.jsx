import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { importantLinks } from "../data/college-data";
import SectionHeader from "./SectionHeader";

export default function ImportantLinks() {
  return (
    <section className="pgc-section">
      <div className="pgc-container">
        <SectionHeader
          eyebrow="গুরুত্বপূর্ণ লিংক"
          title="সরকারি ও শিক্ষার্থী সেবা"
          subtitle="যশোর শিক্ষা বোর্ডের সঠিক লিংকসহ প্রয়োজনীয় সরকারি সেবা এক জায়গায়।"
        />
        <div className="pgc-link-grid">
          {importantLinks.map((link) =>
            link.internal ? (
              <Link className="pgc-link-card" href={link.href} key={link.href}>
                {link.label}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            ) : (
              <a
                className="pgc-link-card"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                key={link.href}
              >
                {link.label}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
