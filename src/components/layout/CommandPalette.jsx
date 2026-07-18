"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HiArrowRight, HiOutlineSearch, HiX } from "react-icons/hi";
import useModalFocus from "@/hooks/useModalFocus";

const TYPE_LABELS = {
  project: "PROJECT",
  service: "SERVICE",
  page: "PAGE",
  team: "TEAM",
  caseStudy: "CASE STUDY",
};

function normalize(value = "") {
  return value.toString().toLowerCase().trim();
}

function scoreText(value, query, weight = 1) {
  const text = normalize(value);
  if (!text || !query) return 0;
  if (text === query) return 5 * weight;
  if (text.startsWith(query)) return 3 * weight;
  if (text.includes(query)) return 1 * weight;
  return 0;
}

function buildResults(query, projects, services, pages) {
  const q = normalize(query);
  if (q.length < 2) return [];

  const projectItems = projects.map((project) => ({
    id: `project-${project.id}`,
    title: project.title,
    description: project.description,
    meta: [project.category, ...(project.tags || []).slice(0, 3)].filter(Boolean).join(" · "),
    href: `/projects/${project.slug}`,
    type: "project",
    keywords: [project.slug, project.clientName, ...(project.tags || [])].filter(Boolean),
    score:
      scoreText(project.title, q, 5) +
      scoreText(project.slug, q, 4) +
      scoreText(project.category, q, 2) +
      scoreText(project.description, q, 1) +
      (project.tags || []).reduce((total, tag) => total + scoreText(tag, q, 2), 0),
  }));

  const serviceItems = services.map((service) => ({
    id: `service-${service.id}`,
    title: service.shortTitle || service.title,
    description: service.description,
    meta: "Effy Tech capability",
    href: service.href || `/#services`,
    type: "service",
    keywords: [service.title, service.shortTitle, ...(service.examples || [])].filter(Boolean),
    score:
      scoreText(service.title, q, 5) +
      scoreText(service.shortTitle, q, 4) +
      scoreText(service.description, q, 2) +
      (service.examples || []).reduce((total, item) => total + scoreText(item, q, 1), 0),
  }));

  const pageItems = pages.map((page) => ({
    id: `page-${page.href}-${page.label}`,
    title: page.label,
    description: page.description || "Effy Tech website section",
    meta: page.meta || "Website section",
    href: page.href,
    type: page.type || "page",
    keywords: page.keywords || [],
    score:
      scoreText(page.label, q, 5) +
      scoreText(page.description, q, 2) +
      (page.keywords || []).reduce((total, item) => total + scoreText(item, q, 2), 0),
  }));

  return [...projectItems, ...serviceItems, ...pageItems]
    .map((item) => ({
      ...item,
      score: item.score + item.keywords.reduce((total, keyword) => total + scoreText(keyword, q, 1), 0),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

export default function CommandPalette({ isOpen, onClose, projects = [], services = [], pages = [] }) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const reducedMotion = Boolean(useReducedMotion());
  const dialogRef = useModalFocus(isOpen, {
    initialFocusRef: inputRef,
    onDismiss: onClose,
  });

  useEffect(() => {
    if (!isOpen) return;
    setQuery("");
    const timer = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const results = useMemo(
    () => buildResults(query, projects, services, pages),
    [query, projects, services, pages],
  );
  const hasQuery = normalize(query).length >= 2;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className="fixed inset-0 z-[90] border-0 bg-[#151b15]/55 backdrop-blur-md"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="effy-search-title"
            tabIndex={-1}
            className="fixed inset-0 z-[91] flex items-start justify-center px-4 pt-[12vh] sm:pt-[17vh]"
            initial={reducedMotion ? false : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          >
            <div className="w-full max-w-2xl overflow-hidden rounded-[24px] border border-[#20261f]/15 bg-[#fbfaf4] shadow-[0_32px_90px_rgba(19,25,19,.28)]">
              <h2 id="effy-search-title" className="sr-only">Search Effy Tech</h2>
              <div className="flex items-center gap-3 px-5 py-4 sm:px-6 sm:py-5">
                <HiOutlineSearch className="h-5 w-5 shrink-0 text-[#687062]" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-label="Search projects, services, and pages"
                  autoComplete="off"
                  placeholder="Search projects, services, pages..."
                  className="min-w-0 flex-1 bg-transparent text-base font-medium text-[#20261f] outline-none placeholder:text-[#7b8275] sm:text-lg"
                />
                {query && (
                  <button type="button" onClick={() => setQuery("")} className="text-[#7b8275] hover:text-[#20261f]" aria-label="Clear search">
                    <HiX className="h-4 w-4" />
                  </button>
                )}
                <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full border border-[#20261f]/10 text-[#687062] hover:bg-[#20261f] hover:text-[#f4f2e8]" aria-label="Close search">
                  <HiX className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[58vh] overflow-y-auto border-t border-[#20261f]/10 p-2 sm:p-3" aria-live="polite">
                {!hasQuery && (
                  <div className="px-5 py-8 text-center">
                    <p className="text-sm font-medium text-[#465043]">Search by project name, service, technology, or page.</p>
                    <p className="mt-2 text-xs text-[#7b8275]">Try “mobile app”, “IAM”, “automation”, “process”, or “team”.</p>
                  </div>
                )}

                {hasQuery && results.length === 0 && (
                  <div className="px-5 py-8 text-center">
                    <p className="text-sm font-medium text-[#465043]">No matching project, service, or page found.</p>
                  </div>
                )}

                {results.map((item) => (
                  <a key={item.id} href={item.href} onClick={onClose} className="group grid grid-cols-[1fr_auto] gap-4 rounded-2xl px-4 py-3.5 transition hover:bg-[#f0eee4] sm:px-5">
                    <div className="min-w-0">
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="rounded-full border border-[#20261f]/12 bg-white/70 px-2 py-1 text-[9px] font-extrabold tracking-[.14em] text-[#687062]">
                          {TYPE_LABELS[item.type] || "PAGE"}
                        </span>
                        <span className="truncate text-xs text-[#7b8275]">{item.meta}</span>
                      </div>
                      <p className="truncate text-sm font-extrabold text-[#20261f] sm:text-base">{item.title}</p>
                      <p className="mt-1 line-clamp-1 text-xs leading-5 text-[#5d655a] sm:text-sm">{item.description}</p>
                    </div>
                    <HiArrowRight className="mt-6 h-4 w-4 text-[#7b8275] transition group-hover:translate-x-1 group-hover:text-[#20261f]" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
