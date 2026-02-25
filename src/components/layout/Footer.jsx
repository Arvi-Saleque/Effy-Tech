/* ============================================================
   Footer — Architectural grid footer with curtain-reveal effect
   ─────────────────────────────────────────────────
   Server component (zero client JS).

   Curtain-pull mechanic:
     layout.js wraps <main> in a div with `relative z-10 bg-surface`,
     and the <Footer /> sits below with `sticky bottom-0 z-0`.
     As the user scrolls past the content, the footer "reveals"
     from behind the last section like a curtain being pulled up.

   Structure:
     1. Gradient divider line (teal → champagne → transparent)
     2. Main grid — Brand column + 3 link columns
     3. Divider
     4. Bottom bar — Copyright + Back-to-Top link
   ============================================================ */

import siteConfig from "@/theme/siteConfig";
import Logo from "@/components/ui/Logo";
import SocialLinks from "@/components/ui/SocialLinks";
import FooterColumn from "./FooterColumn";
import { HiArrowUp } from "react-icons/hi";

export default function Footer() {
  const { footer, socials, tagline } = siteConfig;

  return (
    <footer
      className="bg-dot-grid relative z-0 bg-surface-dark text-neutral-400"
      role="contentinfo"
    >
      {/* ── Gradient divider line ─────────────────────────────── */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-primary) 30%, var(--color-accent) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Main content ──────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">
        {/* Top grid: Brand + Link columns */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* ── Brand column (spans 2 on lg) ───────────────────── */}
          <div className="lg:col-span-2">
            <Logo size="md" light className="mb-4" />

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-neutral-500">
              {tagline}
            </p>

            <SocialLinks links={socials} size="md" light className="gap-2" />
          </div>

          {/* ── Link columns ───────────────────────────────────── */}
          {footer.columns.map((col) => (
            <FooterColumn key={col.title} title={col.title} links={col.links} />
          ))}
        </div>

        {/* ── Divider ──────────────────────────────────────────── */}
        <div className="my-10 h-px w-full bg-neutral-800" aria-hidden="true" />

        {/* ── Bottom bar ───────────────────────────────────────── */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-neutral-600">{footer.copyright}</p>

          {/* Back to Top — plain anchor, smooth-scrolls via CSS */}
          <a
            href="#"
            aria-label="Back to top"
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 transition-colors duration-300 hover:text-primary-light"
          >
            Back to top
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-neutral-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary-light group-hover:text-primary-light">
              <HiArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
