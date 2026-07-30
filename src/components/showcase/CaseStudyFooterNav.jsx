import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import projects from "@/data/projects";

const orderedProjects = [...projects].sort((a, b) => a.order - b.order);

export default function CaseStudyFooterNav({ currentSlug }) {
  const currentProject = orderedProjects.find(
    (project) => project.slug === currentSlug,
  );
  const relatedProjects = orderedProjects.filter(
    (project) => project.slug !== currentSlug,
  );

  return (
    <section
      className="border-t border-border bg-surface py-16 text-text-primary sm:py-20"
      aria-labelledby={`related-projects-${currentSlug}`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Continue exploring
            </p>
            <h2
              id={`related-projects-${currentSlug}`}
              className="mt-3 max-w-3xl font-heading text-3xl font-black leading-tight sm:text-4xl"
            >
              More live work from Effy Tech.
            </h2>
            {currentProject ? (
              <p className="mt-3 max-w-2xl leading-relaxed text-text-secondary">
                You are viewing {currentProject.title}. Compare the product,
                operations, and institutional systems delivered across the rest
                of the portfolio.
              </p>
            ) : null}
          </div>
          <Link
            href="/projects"
            className="inline-flex min-h-12 flex-none items-center justify-center gap-2 rounded-[8px] border border-border bg-neutral-white px-5 py-3 text-sm font-bold transition-colors hover:border-primary/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {relatedProjects.map((project) => (
            <article
              key={project.slug}
              className="group overflow-hidden rounded-[8px] border border-border bg-neutral-white shadow-[0_18px_48px_rgba(32,38,31,0.07)]"
            >
              <Link
                href={project.caseStudyUrl}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                aria-label={`View ${project.title} case study`}
              >
                <div className="relative aspect-[1200/630] overflow-hidden bg-surface-alt">
                  <Image
                    src={project.thumbnail}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/45 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-neutral-900/75 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {project.status}
                  </span>
                </div>
                <div className="p-5">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                    {project.eyebrow}
                  </p>
                  <div className="mt-3 flex items-start justify-between gap-4">
                    <h3 className="text-xl font-black leading-tight text-text-primary">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      className="mt-0.5 h-5 w-5 flex-none text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-text-secondary">
                    {project.solution}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
