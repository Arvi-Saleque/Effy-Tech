import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { ASSET_PATH, institution, ROUTE_BASE } from "../data/college-data";
import PrincipalMessage from "./PrincipalMessage";

export default function AboutSection() {
  return (
    <section className="pgc-section pgc-about-preview">
      <div className="pgc-container pgc-about-grid">
        <PrincipalMessage />
        <div className="pgc-about-card">
          <div className="pgc-about-card__image">
            <Image
              src={`${ASSET_PATH}/official-campus-04.jpeg`}
              alt="কলেজ ক্যাম্পাসে বৃক্ষরোপণ কর্মসূচি"
              width={760}
              height={426}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <span className="pgc-eyebrow">কলেজ পরিচিতি</span>
          <h2>ঐতিহ্য, দায়িত্ববোধ ও উচ্চশিক্ষার ধারাবাহিকতা</h2>
          <p>{institution.identityNote}</p>
          <ul className="pgc-check-list">
            <li>
              <BadgeCheck size={18} aria-hidden="true" /> প্রতিষ্ঠা: {institution.established}
            </li>
            <li>
              <BadgeCheck size={18} aria-hidden="true" /> সরকারিকরণ: {institution.governmentized}
            </li>
            <li>
              <BadgeCheck size={18} aria-hidden="true" /> {institution.board}
            </li>
            <li>
              <BadgeCheck size={18} aria-hidden="true" /> {institution.affiliation}
            </li>
          </ul>
          <Link className="pgc-text-link" href={`${ROUTE_BASE}/about`}>
            বিস্তারিত জানুন
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
