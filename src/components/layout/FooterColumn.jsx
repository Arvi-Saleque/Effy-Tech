/* ============================================================
   FooterColumn — Reusable nav-link column for the footer
   Server component — zero client JS.
   ============================================================ */

export default function FooterColumn({ title, links = [] }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-400">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="group relative inline-block text-sm text-neutral-500 transition-colors duration-300 hover:text-primary-light"
            >
              {label}
              {/* Animated underline on hover */}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary-light transition-all duration-300 group-hover:w-full"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
