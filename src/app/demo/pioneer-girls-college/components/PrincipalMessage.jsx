import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { institution, principal, ROUTE_BASE } from "../data/college-data";

export default function PrincipalMessage() {
  return (
    <article className="pgc-principal-card">
      <div className="pgc-principal-card__media">
        <Image
          src={principal.image}
          alt={`${principal.name}, ${principal.designation}`}
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
        <p>{principal.message}</p>
        <div className="pgc-principal-card__sign">
          <strong>{principal.name}</strong>
          <span>{principal.designation}</span>
          <span>{principal.subject}</span>
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
