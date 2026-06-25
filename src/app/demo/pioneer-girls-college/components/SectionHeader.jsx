import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SectionHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div className="pgc-section-header">
      <div>
        {eyebrow ? <span className="pgc-eyebrow">{eyebrow}</span> : null}
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {action ? (
        <Link className="pgc-text-link" href={action.href}>
          {action.label}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
