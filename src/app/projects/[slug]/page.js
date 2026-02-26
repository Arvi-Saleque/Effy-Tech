/* ============================================================
   Project Detail Page — /projects/[slug]
   ─────────────────────────────────────────────────
   Dark cinematic full-page project view.
   Statically generated from the projects data array.
   ============================================================ */

import { notFound } from "next/navigation";
import Link from "next/link";
import { HiArrowLeft, HiExternalLink } from "react-icons/hi";
import projects from "@/data/projects";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

/* ---------- Static params for SSG ---------- */
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/* ---------- Dynamic metadata ---------- */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Effy Tech`,
    description: project.description,
  };
}

/* ---------- Page Component ---------- */
export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const {
    title,
    description,
    category,
    tags,
    thumbnail,
    images,
    clientName,
    liveUrl,
  } = project;

  return (
    <main className="min-h-screen bg-surface-dark text-text-inverse">
      {/* ── Back Navigation ─────────────────────────────────── */}
      <div className="relative z-10 pt-24 pb-6 px-6 sm:px-10 max-w-6xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-primary-light transition-colors group"
        >
          <HiArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>
      </div>

      {/* ── Hero Image ──────────────────────────────────────── */}
      <div className="relative max-w-6xl mx-auto px-6 sm:px-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-neutral-700/30">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <ImagePlaceholder text={title} dark />
          )}

          {/* Category chip */}
          <div className="absolute top-5 left-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-neutral-900/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-light backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
              {category}
            </span>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface-dark to-transparent" />
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left — Main info */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-100 leading-tight">
              {title}
            </h1>

            {clientName && (
              <p className="mt-3 text-neutral-500">
                Client:{" "}
                <span className="font-medium text-neutral-300">
                  {clientName}
                </span>
              </p>
            )}

            <div className="mt-8">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4">
                About This Project
              </h2>
              <p className="text-lg leading-relaxed text-neutral-400">
                {description}
              </p>
            </div>

            {/* Extra images gallery */}
            {images && images.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4">
                  Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-[16/10] overflow-hidden rounded-xl border border-neutral-700/30"
                    >
                      <img
                        src={img}
                        alt={`${title} screenshot ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              {/* Tech stack */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-neutral-700/50 bg-neutral-800/40 px-3 py-1.5 font-mono text-xs text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-3">
                  Category
                </h3>
                <p className="text-neutral-300">{category}</p>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-neutral-700/30">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-lg border border-primary/30 bg-primary/15 px-5 py-3 text-sm font-medium text-primary-light transition-all hover:bg-primary/25 hover:shadow-[0_0_20px_rgba(45,212,191,0.15)]"
                  >
                    <HiExternalLink className="h-4 w-4" />
                    View Live
                  </a>
                )}
                <Link
                  href="/#projects"
                  className="flex items-center justify-center gap-2 w-full rounded-lg border border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200"
                >
                  <HiArrowLeft className="h-4 w-4" />
                  All Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom accent line ──────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-primary-light/20 to-transparent" />
      </div>
    </main>
  );
}
