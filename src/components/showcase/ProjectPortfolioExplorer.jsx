"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, CircleDot } from "lucide-react";
import {
  BrowserMockup,
  MotionBoundary,
  TiltSurface,
} from "@/components/visuals";
import projects, { projectFilters } from "@/data/projects";

const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

const projectPreviewTitles = {
  IAM: "play.google.com · Islamic Amal Tracker",
  EEMS: "shifatstales.com · Coaching management",
  DHA: "dhakhl.com · Darul Hikmah Academy",
  BUEK: "buekbd.com · University platform",
};

function ProjectCaseStudy({ project, index }) {
  const reversed = index % 2 === 1;

  return (
    <article
      id={project.slug.toLowerCase()}
      className="scroll-mt-36 border-t border-border py-14 sm:py-20 lg:py-24"
    >
      <div
        className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
          reversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="project-case-media relative">
          <MotionBoundary className="project-case-motion">
            <TiltSurface
              className="project-case-tilt"
              maxTilt={2.4}
              perspective={1200}
            >
              <div className="project-case-plinth" aria-hidden="true" />
              <Link
                href={project.caseStudyUrl}
                className="project-case-link group relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                aria-label={`View ${project.title} case study`}
              >
                <BrowserMockup
                  className="projects-case-browser"
                  label={`${project.title} case study preview`}
                  title={projectPreviewTitles[project.slug]}
                >
                  <div className="projects-case-screen">
                    <Image
                      src={project.thumbnail}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/35 via-transparent to-transparent" />
                  </div>
                </BrowserMockup>
                <div className="absolute bottom-4 right-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-neutral-white/35 bg-neutral-900/80 text-neutral-white backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </div>
              </Link>
            </TiltSurface>
          </MotionBoundary>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {String(project.order + 1).padStart(2, "0")} - {project.eyebrow}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-neutral-white px-3 py-1 text-xs font-bold text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-success" />
              {project.status}
            </span>
          </div>

          <h2 className="mt-5 max-w-2xl font-heading text-3xl font-black leading-tight text-text-primary sm:text-4xl lg:text-5xl">
            {project.title}
          </h2>
          <p className="mt-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-text-muted">
            {project.clientName} · {project.category}
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
            {project.description}
          </p>

          <div className="mt-7 grid overflow-hidden rounded-[8px] border border-border bg-neutral-white shadow-sm sm:grid-cols-2">
            <div className="p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Problem
              </p>
              <p className="mt-3 text-sm leading-7 text-text-secondary">
                {project.problem}
              </p>
            </div>
            <div className="border-t border-border p-5 sm:border-l sm:border-t-0 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Solution
              </p>
              <p className="mt-3 text-sm leading-7 text-text-secondary">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[8px] border border-primary/15 bg-primary-lightest/55 p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Delivered value
            </p>
            <p className="mt-3 leading-relaxed text-text-secondary">
              {project.outcome}
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {project.deliverables.map((item) => (
              <div
                key={item}
                className="flex gap-3 border-t border-border pt-3 text-sm leading-relaxed text-text-secondary"
              >
                <Check
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface-alt px-3 py-1.5 font-mono text-xs text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={project.caseStudyUrl}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-surface-dark px-6 py-3 text-sm font-bold text-text-inverse transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              View Case Study
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {project.demoUrl ? (
              <Link
                href={project.demoUrl}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-primary/35 bg-primary-lightest px-6 py-3 text-sm font-bold text-primary-dark transition-colors hover:border-primary hover:bg-primary-light/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {project.demoLabel || "Interactive Demo"}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-primary/35 bg-primary-lightest px-6 py-3 text-sm font-bold text-primary-dark transition-colors hover:border-primary hover:bg-primary-light/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {project.liveLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectPortfolioExplorer() {
  const [activeFilter, setActiveFilter] = useState("all");
  const filterRefs = useRef([]);
  const activeFilterIndex = projectFilters.findIndex(
    (filter) => filter.id === activeFilter,
  );
  const visibleProjects =
    activeFilter === "all"
      ? sortedProjects
      : sortedProjects.filter(
          (project) => project.portfolioCategory === activeFilter,
        );

  const selectFilter = (index) => {
    const nextFilter = projectFilters[index];
    if (!nextFilter) return;
    setActiveFilter(nextFilter.id);
    filterRefs.current[index]?.focus();
  };

  const handleFilterKeyDown = (event) => {
    let nextIndex = activeFilterIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (activeFilterIndex + 1) % projectFilters.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex =
        (activeFilterIndex - 1 + projectFilters.length) % projectFilters.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = projectFilters.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    selectFilter(nextIndex);
  };

  return (
    <section id="case-studies" aria-labelledby="project-explorer-heading">
      <div className="relative z-10 border-y border-border bg-surface/95 shadow-[0_10px_30px_rgba(32,38,31,0.06)] backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Portfolio explorer
              </p>
              <h2
                id="project-explorer-heading"
                className="mt-1 text-lg font-black text-text-primary"
              >
                Filter by delivery type
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Filter project case studies by delivery type"
              onKeyDown={handleFilterKeyDown}
              className="flex max-w-full gap-2 overflow-x-auto pb-1 lg:justify-end"
            >
              {projectFilters.map((filter, index) => {
                const count =
                  filter.id === "all"
                    ? sortedProjects.length
                    : sortedProjects.filter(
                        (project) => project.portfolioCategory === filter.id,
                      ).length;
                const selected = activeFilter === filter.id;

                return (
                  <button
                    key={filter.id}
                    ref={(node) => {
                      filterRefs.current[index] = node;
                    }}
                    id={`project-filter-${filter.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="project-filter-results"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectFilter(index)}
                    className={`inline-flex min-h-11 flex-none items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      selected
                        ? "border-surface-dark bg-surface-dark text-text-inverse"
                        : "border-border bg-neutral-white text-text-secondary hover:border-primary/40 hover:text-text-primary"
                    }`}
                  >
                    {selected ? (
                      <CircleDot className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : null}
                    {filter.label}
                    <span
                      className={`font-mono text-[10px] ${
                        selected ? "text-neutral-300" : "text-text-muted"
                      }`}
                    >
                      {String(count).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            Showing {visibleProjects.length}{" "}
            {visibleProjects.length === 1 ? "project" : "projects"}.
          </p>
        </div>
      </div>

      <div
        id="project-filter-results"
        role="tabpanel"
        aria-labelledby={`project-filter-${activeFilter}`}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {visibleProjects.map((project, index) => (
          <ProjectCaseStudy
            key={project.slug}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
