import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { ASSET_PATH, institution, ROUTE_BASE } from "../data/college-data";

export default function PrincipalMessage() {
  return (
    <article className="pgc-principal-card">
      <div className="pgc-principal-card__media">
        <Image
          src={`${ASSET_PATH}/official-campus-03.jpg`}
          alt="অধ্যক্ষের কার্যালয়ের প্রাতিষ্ঠানিক দৃশ্য"
          width={720}
          height={360}
          sizes="(max-width: 900px) 100vw, 50vw"
        />
        <span>
          <Quote size={18} aria-hidden="true" /> অধ্যক্ষের বাণী
        </span>
      </div>
      <div className="pgc-principal-card__body">
        <h2>জ্ঞান, মূল্যবোধ ও আত্মবিশ্বাসে আলোকিত শিক্ষার্থী গড়ে তোলা আমাদের অঙ্গীকার।</h2>
        <p>
          নারীশিক্ষার অগ্রযাত্রায় {institution.nameBn} শিক্ষার্থীদের আত্মমর্যাদা,
          শৃঙ্খলা, সহমর্মিতা এবং দায়িত্বশীল নেতৃত্বের চর্চায় উৎসাহিত করে। আধুনিক
          শিক্ষার সঙ্গে মানবিক মূল্যবোধের সমন্বয়ই আমাদের শিক্ষাদর্শনের কেন্দ্রবিন্দু।
        </p>
        <div className="pgc-principal-card__sign">
          <strong>অধ্যক্ষ</strong>
          <span>{institution.nameBn}</span>
        </div>
        <Link className="pgc-text-link" href={`${ROUTE_BASE}/principal-message`}>
          পূর্ণ বাণী পড়ুন
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
