import Link from "next/link";
import { CalendarDays, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
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

const socialLinks = [
  { label: "Facebook", href: "#", icon: FaFacebookF },
  { label: "YouTube", href: "#", icon: FaYoutube },
  { label: "Twitter", href: "#", icon: FaTwitter },
  { label: "Instagram", href: "#", icon: FaInstagram },
  { label: "LinkedIn", href: "#", icon: FaLinkedinIn },
];

export default function Footer() {
  const quickLinks = navItems.filter((item) => !item.children).slice(0, 6);
  const governmentLinks = importantLinks.filter((item) => !item.internal).slice(0, 5);

  return (
    <footer className="pgc-footer">
      <div className="pgc-container pgc-footer__main">
        <FooterColumn title="দ্রুত লিংক" links={quickLinks} />
        <FooterColumn title="গুরুত্বপূর্ণ লিংক" links={[...footerAcademicLinks, ...governmentLinks].slice(0, 7)} />
        <div className="pgc-footer__column pgc-footer__contact">
          <h2>যোগাযোগ</h2>
          <span>
            <MapPin size={15} aria-hidden="true" /> {institution.nameEn}
          </span>
          <span>{institution.contact.address}</span>
          <span>
            <Phone size={15} aria-hidden="true" /> {institution.contact.phone}
          </span>
          <span>
            <Mail size={15} aria-hidden="true" /> {institution.contact.email}
          </span>
          <span>
            <CalendarDays size={15} aria-hidden="true" /> রবি - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৪:০০
          </span>
        </div>
        <div className="pgc-footer__map-column">
          <h2>আমাদের অবস্থান</h2>
          <div className="pgc-footer__map-frame">
            <iframe
              title="Government Pioneer Women's College, Khulna map"
              src={institution.contact.mapEmbedUrl}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <a className="pgc-footer__map-link" href={institution.contact.mapUrl} target="_blank" rel="noopener noreferrer">
            Google Maps এ দেখুন
            <ExternalLink size={13} aria-hidden="true" />
          </a>
          <div className="pgc-footer__social" aria-label="সামাজিক যোগাযোগ">
            {socialLinks.map(({ label, href, icon: IconComponent }) => (
              <a className="pgc-footer__social-link" href={href} aria-label={label} key={label}>
                <IconComponent aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="pgc-container pgc-footer__bottom">
        <div className="pgc-footer__identity">
          <Brand compact />
          <span>
            {institution.address} | EIIN: {institution.eiin}
          </span>
          <span>© ২০২৬ সকল স্বত্ব সংরক্ষিত</span>
        </div>
        <span>Developed by Effy Tech</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className="pgc-footer__column">
      <h2>{title}</h2>
      {links.map((link) =>
        link.internal === false || link.href?.startsWith("http") ? (
          <a href={link.href} key={`${title}-${link.href}`} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        ) : (
          <Link href={link.href} key={`${title}-${link.href}`}>
            {link.label}
          </Link>
        ),
      )}
      {title === "দ্রুত লিংক"
        ? footerServiceLinks.map((link) => (
            <Link href={link.href} key={`${title}-${link.href}`}>
              {link.label}
            </Link>
          ))
        : null}
    </div>
  );
}
