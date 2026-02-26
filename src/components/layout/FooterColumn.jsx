/* ============================================================
   FooterColumn — Reusable nav-link column for the footer
   Server component — zero client JS.
   ============================================================ */

import Link from "next/link";

export default function FooterColumn({ title, links = [] }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-400">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map(({ label, href }) => {
          const isInternal = href.startsWith("/");
          const Tag = isInternal ? Link : "a";
          return (
            <li key={label}>
              <Tag
                href={href}
                className="group relative inline-block text-sm text-neutral-500 transition-colors duration-300 hover:text-primary-light"
              >
                {label}
                {/* Animated underline on hover */}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary-light transition-all duration-300 group-hover:w-full"
                  aria-hidden="true"
                />
              </Tag>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
