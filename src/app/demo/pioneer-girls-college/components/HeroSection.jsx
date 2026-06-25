import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, GraduationCap } from "lucide-react";
import { ASSET_PATH, institution, ROUTE_BASE } from "../data/college-data";

const heroFacts = [
  ["প্রতিষ্ঠিত", institution.established],
  ["সরকারিকরণ", institution.governmentized],
  ["EIIN", institution.eiin],
  ["শিক্ষা বোর্ড", "যশোর"],
];

export default function HeroSection() {
  return (
    <section className="pgc-hero">
      <Image
        className="pgc-hero__image"
        src={`${ASSET_PATH}/official-campus-04.jpeg`}
        alt="সরকারি পাইওনিয়ার মহিলা কলেজ ক্যাম্পাসে বৃক্ষরোপণ কর্মসূচি"
        fill
        priority
        sizes="100vw"
      />
      <div className="pgc-hero__overlay" />
      <div className="pgc-container pgc-hero__grid">
        <div className="pgc-hero__content">
          <span className="pgc-eyebrow pgc-eyebrow--light">প্রতিষ্ঠিত {institution.established}</span>
          <h1>{institution.tagline}</h1>
          <p>
            {institution.nameBn} জ্ঞান, মূল্যবোধ, আত্মবিশ্বাস ও দায়িত্বশীল নাগরিকত্বের
            চর্চার মাধ্যমে শিক্ষার্থীদের উচ্চশিক্ষা ও সুন্দর জীবনের জন্য প্রস্তুত করে।
          </p>
          <div className="pgc-hero__actions">
            <Link className="pgc-button pgc-button--gold" href={`${ROUTE_BASE}/about`}>
              <Building2 size={18} aria-hidden="true" /> কলেজ সম্পর্কে জানুন
            </Link>
            <Link className="pgc-button pgc-button--light" href={`${ROUTE_BASE}/admission`}>
              <GraduationCap size={18} aria-hidden="true" /> ভর্তি তথ্য
            </Link>
            <Link className="pgc-button pgc-button--outline" href={`${ROUTE_BASE}/notices`}>
              সর্বশেষ নোটিশ <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <aside className="pgc-hero-card" aria-label="প্রতিষ্ঠানের যাচাইকৃত তথ্য">
          <div className="pgc-hero-card__head">
            <BadgeCheck size={22} aria-hidden="true" />
            <span>যাচাইকৃত প্রাতিষ্ঠানিক তথ্য</span>
          </div>
          <div className="pgc-hero-card__facts">
            {heroFacts.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <p>{institution.board}</p>
          <p>{institution.affiliation}</p>
        </aside>
      </div>
    </section>
  );
}
