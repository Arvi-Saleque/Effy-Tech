/* ============================================================
   CommandPalette — Search overlay with live results
   Searches projects (title, description, tags, category)
   and page sections (nav links). Triggered from Navbar ⌘K.
   ============================================================ */

"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSearch, HiX, HiArrowRight } from "react-icons/hi";

/* ── Helpers ────────────────────────────────────────────────── */
function matchScore(text, query) {
  if (!text || !query) return 0;
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  if (lower === q) return 3;
  if (lower.startsWith(q)) return 2;
  if (lower.includes(q)) return 1;
  return 0;
}

function searchItems(query, projects, pages) {
  if (!query || query.trim().length < 2)
    return { projectResults: [], pageResults: [] };

  const q = query.trim().toLowerCase();

  /* Search projects */
  const projectResults = projects
    .map((p) => {
      const score =
        matchScore(p.title, q) * 4 +
        matchScore(p.category, q) * 2 +
        matchScore(p.description, q) +
        (p.tags || []).reduce((s, t) => s + matchScore(t, q) * 2, 0);
      return { ...p, score, type: "project" };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  /* Search pages / sections */
  const pageResults = pages
    .map((p) => {
      const score = matchScore(p.label, q) * 3;
      return { ...p, score, type: "page" };
    })
    .filter((p) => p.score > 0);

  return { projectResults, pageResults };
}

/* ── Component ──────────────────────────────────────────────── */
export default function CommandPalette({
  isOpen,
  onClose,
  projects = [],
  pages = [],
}) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  /* Focus input when opened, clear query when closed */
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  /* Escape to close */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  /* Live search results */
  const { projectResults, pageResults } = useMemo(
    () => searchItems(query, projects, pages),
    [query, projects, pages],
  );

  const hasResults = projectResults.length > 0 || pageResults.length > 0;
  const hasQuery = query.trim().length >= 2;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-neutral-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Palette */}
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh] sm:pt-[20vh]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="w-full max-w-xl rounded-2xl bg-neutral-900/90 border border-primary-darkest/30 shadow-xl backdrop-blur-md overflow-hidden">
              {/* Mobile close bar — visible only on small screens */}
              <div className="flex items-center justify-between px-5 pt-4 pb-2 sm:hidden">
                <span className="text-sm font-medium text-neutral-400">
                  Search
                </span>
                <button
                  onClick={onClose}
                  className="flex items-center gap-1.5 rounded-full border border-neutral-600 bg-neutral-800 px-3.5 py-2 text-sm font-medium text-neutral-300 active:bg-neutral-700 transition-colors cursor-pointer"
                  aria-label="Close search"
                >
                  <HiX className="h-4 w-4" />
                  Close
                </button>
              </div>

              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4">
                <HiOutlineSearch className="h-5 w-5 text-primary-light shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  placeholder="Search projects, pages..."
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 min-w-0 bg-transparent text-lg text-text-inverse placeholder:text-neutral-500 outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="shrink-0 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <HiX className="h-4 w-4" />
                  </button>
                )}
                {/* Desktop close button */}
                <button
                  onClick={onClose}
                  className="hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-500 hover:text-text-inverse hover:bg-neutral-white/10 transition-colors cursor-pointer"
                  aria-label="Close search"
                >
                  <HiX className="h-5 w-5" />
                </button>
              </div>

              {/* Results area */}
              <div className="border-t border-neutral-700/50 max-h-[40vh] overflow-y-auto">
                {!hasQuery && (
                  <div className="px-5 py-6 text-center">
                    <p className="text-sm text-neutral-500">
                      Type to search across projects and pages
                    </p>
                  </div>
                )}

                {hasQuery && !hasResults && (
                  <div className="px-5 py-6 text-center">
                    <p className="text-sm text-neutral-500">
                      No results found for &ldquo;{query}&rdquo;
                    </p>
                  </div>
                )}

                {/* Page / section results */}
                {pageResults.length > 0 && (
                  <div className="px-2 py-2">
                    <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                      Pages
                    </p>
                    {pageResults.map((page) => (
                      <a
                        key={page.href}
                        href={page.href}
                        onClick={onClose}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-neutral-300 transition-colors hover:bg-neutral-white/5 hover:text-primary-light"
                      >
                        {page.label}
                        <HiArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                )}

                {/* Project results */}
                {projectResults.length > 0 && (
                  <div className="px-2 py-2">
                    <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                      Projects
                    </p>
                    {projectResults.map((project) => (
                      <a
                        key={project.id}
                        href="#projects"
                        onClick={onClose}
                        className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-neutral-white/5"
                      >
                        {/* Color dot for category */}
                        <span className="h-2 w-2 shrink-0 rounded-full bg-primary-light" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-neutral-200 group-hover:text-primary-light transition-colors">
                            {project.title}
                          </p>
                          <p className="truncate text-xs text-neutral-500">
                            {project.category}
                            {project.tags?.length > 0 &&
                              ` · ${project.tags.slice(0, 3).join(", ")}`}
                          </p>
                        </div>
                        <HiArrowRight className="h-3.5 w-3.5 shrink-0 text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
