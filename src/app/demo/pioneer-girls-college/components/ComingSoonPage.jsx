import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ASSET_PATH, institution, ROUTE_BASE } from "../data/college-data";
import SiteShell from "./SiteShell";

export const comingSoonMetadata = {
  title: "পৃষ্ঠা প্রস্তুত করা হচ্ছে | সরকারি পাইওনিয়ার মহিলা কলেজ",
  description: "সরকারি পাইওনিয়ার মহিলা কলেজের এই পৃষ্ঠাটি প্রস্তুত করা হচ্ছে।",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ComingSoonPage() {
  const logoSrc = `${ASSET_PATH}/college-logo.png`;

  return (
    <SiteShell>
      <section className="pgc-coming-soon" aria-labelledby="pgc-coming-soon-title">
        <article className="pgc-coming-soon__card">
          <Image
            className="pgc-coming-soon__watermark"
            src={logoSrc}
            alt=""
            width={300}
            height={300}
            aria-hidden="true"
          />
          <div className="pgc-coming-soon__logo">
            <Image src={logoSrc} alt={`${institution.nameBn} লোগো`} width={72} height={72} />
          </div>
          <span className="pgc-coming-soon__status-icon" aria-hidden="true">
            <Sparkles size={22} />
          </span>
          <p className="pgc-coming-soon__eyebrow">পৃষ্ঠা প্রস্তুত করা হচ্ছে</p>
          <h1 className="pgc-coming-soon__title" id="pgc-coming-soon-title">
            আরও সমৃদ্ধ অভিজ্ঞতা নিয়ে
            <span>শিগগিরই আসছে</span>
          </h1>
          <p className="pgc-coming-soon__description">
            সরকারি পাইওনিয়ার মহিলা কলেজের এই বিভাগটি আরও তথ্যসমৃদ্ধ, নির্ভুল ও ব্যবহারবান্ধবভাবে
            প্রস্তুত করা হচ্ছে। খুব শিগগিরই প্রয়োজনীয় সকল তথ্যসহ পৃষ্ঠাটি উন্মুক্ত করা হবে।
          </p>
          <p className="pgc-coming-soon__note">সাময়িক অসুবিধার জন্য আমরা আন্তরিকভাবে দুঃখিত।</p>
          <div className="pgc-coming-soon__actions">
            <Link className="pgc-coming-soon__home-link" href={ROUTE_BASE}>
              হোমপেজে ফিরে যান
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="pgc-coming-soon__meta" aria-label="প্রাতিষ্ঠানিক তথ্য">
            <span>প্রতিষ্ঠিত {institution.established}</span>
            <span>EIIN {institution.eiin}</span>
            <span>{institution.boardBn}</span>
          </div>
        </article>
      </section>
    </SiteShell>
  );
}
