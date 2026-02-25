/* ============================================================
   ProjectShowcase — Animated Masonry with Morph Filter
   ─────────────────────────────────────────────────
   • Filter tabs: All, Web, Android, iOS, UI/UX, Cross-Platform
   • AnimatePresence + layout prop for smooth card reflow
   • Cards morph-expand into modal via shared layoutId
   • Data: static import now, designed for MongoDB server fetch
   • Filter is client-side on pre-fetched array (zero network)
   ============================================================ */

"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import siteConfig from "@/theme/siteConfig";
import useFilter from "@/hooks/useFilter";
import { FilterBar } from "@/components/ui";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function ProjectShowcase({ projects = [] }) {
  const { filteredItems, activeCategory, setCategory, categories } = useFilter(
    projects,
    "category",
  );

  const [selectedProject, setSelectedProject] = useState(null);

  const handleSelect = useCallback((project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <section id="projects" className="relative bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ──────────────────────────────────── */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary mb-4">
            Our Work
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Featured <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-secondary text-lg">
            From concept to deployment — explore the products we&apos;ve built
            for startups and enterprises.
          </p>
        </motion.div>

        {/* ── Filter Tabs ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <FilterBar
            categories={siteConfig.projectCategories}
            activeCategory={activeCategory}
            onFilter={setCategory}
          />
        </motion.div>

        {/* ── Project Grid (animated masonry) ─────────────────── */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onSelect={handleSelect}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── Empty state ─── */}
          <AnimatePresence>
            {filteredItems.length === 0 && (
              <motion.p
                className="mt-16 text-center text-text-tertiary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No projects found in this category yet.
              </motion.p>
            )}
          </AnimatePresence>

          {/* ── Expanding Modal ──────────────────────────────── */}
          <AnimatePresence>
            {selectedProject && (
              <ProjectModal project={selectedProject} onClose={handleClose} />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}
