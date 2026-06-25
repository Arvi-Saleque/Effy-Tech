import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { ROUTE_BASE } from "../data/college-data";

export default function PageHero({ eyebrow, title, description, breadcrumbs = [] }) {
  return (
    <section className="pgc-page-hero">
      <div className="pgc-container">
        <nav className="pgc-breadcrumb" aria-label="Breadcrumb">
          <Link href={ROUTE_BASE}>
            <Home size={15} aria-hidden="true" /> হোম
          </Link>
          {breadcrumbs.map((item) => (
            <span key={item.label}>
              <ChevronRight size={14} aria-hidden="true" />
              {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
            </span>
          ))}
        </nav>
        {eyebrow ? <span className="pgc-eyebrow pgc-eyebrow--light">{eyebrow}</span> : null}
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
    </section>
  );
}
