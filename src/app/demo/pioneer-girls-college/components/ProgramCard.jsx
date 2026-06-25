import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTE_BASE } from "../data/college-data";

export default function ProgramCard({ program }) {
  return (
    <article className="pgc-program-card" id={program.id}>
      <div className="pgc-program-card__top">
        <span>{program.authority}</span>
        <strong>{program.title}</strong>
      </div>
      <p>{program.description}</p>
      <ul>
        {program.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <Link href={`${ROUTE_BASE}/academic#${program.id}`}>
        বিস্তারিত
        <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </article>
  );
}
