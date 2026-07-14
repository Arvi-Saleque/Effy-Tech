import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineExternalLink,
  HiOutlineGlobe,
  HiOutlineSparkles,
  HiOutlineTag,
} from "react-icons/hi";
import Footer from "@/components/layout/Footer";
import projects from "@/data/projects";

export const metadata = {
  title: "Projects | Effy Tech",
  description:
    "Explore all Effy Tech projects, including websites, dashboards, and mobile apps built for real organizations.",
};

const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
const categories = [
  ...new Set(sortedProjects.map((project) => project.category)),
];

function ProjectCard({ project, index }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-neutral-700/55 bg-neutral-900/45 shadow-2xl shadow-neutral-950/20 transition-all duration-300 hover:-translate-y-1 hover:border-primary-light/45 hover:bg-neutral-900/70">
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary-light/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <Link
        href={`/projects/${project.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <img
          src={project.thumbnail}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/10 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-primary-light/20 bg-neutral-950/75 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary-light backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
          {project.category}
        </div>
        <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-primary-light/30 bg-primary-light/10 text-primary-light opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <HiOutlineArrowRight className="h-5 w-5" />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="font-mono text-xs text-neutral-600">
            {String(index + 1).padStart(2, "0")}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent-light">
              <HiOutlineSparkles className="h-3.5 w-3.5" />
              Featured
            </span>
          )}
        </div>

        <h2 className="font-heading text-2xl font-black leading-tight text-neutral-100 transition-colors duration-300 group-hover:text-primary-light">
          {project.title}
        </h2>

        {project.clientName && (
          <p className="mt-2 text-sm text-neutral-500">
            Client:{" "}
            <span className="font-semibold text-neutral-300">
              {project.clientName}
            </span>
          </p>
        )}

        <p className="mt-4 line-clamp-4 text-base leading-relaxed text-neutral-400">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[8px] border border-neutral-700/60 bg-neutral-950/30 px-3 py-1.5 font-mono text-xs text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[8px] border border-primary-light/35 bg-primary-light/10 px-4 py-2 text-sm font-bold text-primary-light transition-all duration-300 hover:bg-primary-light hover:text-neutral-950"
          >
            View Project
            <HiOutlineArrowRight className="h-4 w-4" />
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border border-neutral-700/80 px-4 py-2 text-sm font-bold text-neutral-300 transition-all duration-300 hover:border-accent-light/45 hover:text-accent-light"
            >
              Live
              <HiOutlineExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <main className="effy-public-page min-h-screen bg-surface-dark pt-24 text-text-inverse">
        <section className="relative overflow-hidden border-b border-neutral-800/60 pb-14 pt-8 sm:pb-16">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-primary-light/7 blur-[150px]" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(185,154,90,0.8) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-400 transition-colors hover:text-primary-light"
            >
              <HiOutlineArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary-light/20 bg-primary-light/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-primary-light">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-light" />
                  Project Library
                </span>
                <h1 className="mt-5 max-w-4xl font-heading text-4xl font-black leading-tight text-neutral-100 sm:text-5xl lg:text-6xl">
                  All projects built by Effy Tech
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-400">
                  A clear look at the websites, platforms, dashboards, and apps
                  we have designed, developed, and shipped.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <div className="rounded-[8px] border border-neutral-700/55 bg-neutral-950/25 p-4">
                  <HiOutlineGlobe className="h-6 w-6 text-primary-light" />
                  <p className="mt-3 font-heading text-3xl font-black text-primary-light">
                    {sortedProjects.length}
                  </p>
                  <p className="text-sm text-neutral-400">Total Projects</p>
                </div>
                <div className="rounded-[8px] border border-neutral-700/55 bg-neutral-950/25 p-4">
                  <HiOutlineTag className="h-6 w-6 text-primary-light" />
                  <p className="mt-3 font-heading text-3xl font-black text-primary-light">
                    {categories.length}
                  </p>
                  <p className="text-sm text-neutral-400">Categories</p>
                </div>
                <div className="rounded-[8px] border border-neutral-700/55 bg-neutral-950/25 p-4">
                  <HiOutlineSparkles className="h-6 w-6 text-primary-light" />
                  <p className="mt-3 font-heading text-3xl font-black text-primary-light">
                    {
                      sortedProjects.filter((project) => project.featured)
                        .length
                    }
                  </p>
                  <p className="text-sm text-neutral-400">Featured</p>
                </div>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-neutral-700/60 bg-neutral-900/45 px-4 py-2 text-sm font-semibold text-neutral-300"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary-light">
                Case Studies
              </p>
              <h2 className="mt-2 font-heading text-3xl font-black text-neutral-100">
                Browse every project
              </h2>
            </div>
            <Link
              href="/#contact"
              className="inline-flex w-fit items-center gap-2 rounded-[8px] border border-primary-light/35 bg-primary-light/10 px-5 py-3 text-sm font-bold text-primary-light transition-all duration-300 hover:bg-primary-light hover:text-neutral-950"
            >
              Start a project
              <HiOutlineArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {sortedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
