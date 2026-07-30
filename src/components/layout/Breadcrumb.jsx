import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({
  items = [],
  current,
  dark = false,
  className = "",
}) {
  const tone = dark ? "breadcrumb-dark" : "breadcrumb-light";

  return (
    <nav
      aria-label="Breadcrumb"
      className={`effy-breadcrumb ${tone} ${className}`.trim()}
    >
      <ol>
        <li>
          <Link href="/" aria-label="Effy Tech homepage">
            <Home size={14} aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.href}>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
        {current ? (
          <li aria-current="page">
            <ChevronRight size={14} aria-hidden="true" />
            <span>{current}</span>
          </li>
        ) : null}
      </ol>
    </nav>
  );
}
