import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import {
  importantLinks,
  institution,
  navItems,
  ROUTE_BASE,
} from "../data/college-data";
import Brand from "./Brand";

const footerAcademicLinks = [
  { label: "উচ্চমাধ্যমিক", href: `${ROUTE_BASE}/academic#higher-secondary` },
  { label: "ডিগ্রি", href: `${ROUTE_BASE}/academic#degree` },
  { label: "অনার্স", href: `${ROUTE_BASE}/academic#honours` },
  { label: "বিভাগসমূহ", href: `${ROUTE_BASE}/departments` },
];

const footerServiceLinks = [
  { label: "ভর্তি", href: `${ROUTE_BASE}/admission` },
  { label: "নোটিশ", href: `${ROUTE_BASE}/notices` },
  { label: "ফলাফল", href: `${ROUTE_BASE}/results` },
  { label: "গ্যালারি", href: `${ROUTE_BASE}/gallery` },
];

export default function Footer() {
  const quickLinks = navItems.filter((item) => !item.children).slice(0, 7);
  const governmentLinks = importantLinks.filter((item) => !item.internal).slice(0, 4);

  return (
    <footer className="pgc-footer">
      <div className="pgc-container pgc-footer__grid">
        <div className="pgc-footer__identity">
          <Brand compact />
          <p>{institution.identityNote}</p>
          <Link className="pgc-footer__credit" href="/">
            ওয়েবসাইট ডিজাইন ও উন্নয়ন: Effy Tech
          </Link>
        </div>
        <FooterColumn title="দ্রুত লিংক" links={quickLinks} />
        <FooterColumn title="একাডেমিক" links={footerAcademicLinks} />
        <FooterColumn title="শিক্ষার্থী সেবা" links={footerServiceLinks} />
        <div className="pgc-footer__column">
          <h2>সরকারি লিংক</h2>
          {governmentLinks.map((link) => (
            <a href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="pgc-footer__column">
          <h2>যোগাযোগ</h2>
          <span>
            <MapPin size={15} aria-hidden="true" /> {institution.contact.address}
          </span>
          <span>
            <Phone size={15} aria-hidden="true" /> অফিস ফোন: {institution.contact.phone}
          </span>
          <span>
            <Mail size={15} aria-hidden="true" /> {institution.contact.email}
          </span>
        </div>
      </div>
      <div className="pgc-container pgc-footer__bottom">
        <span>© ২০২৬ {institution.nameBn}. সর্বস্বত্ব সংরক্ষিত।</span>
        <span>ওয়েবসাইট ডিজাইন ও উন্নয়ন: Effy Tech</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className="pgc-footer__column">
      <h2>{title}</h2>
      {links.map((link) => (
        <Link href={link.href} key={`${title}-${link.href}`}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}
