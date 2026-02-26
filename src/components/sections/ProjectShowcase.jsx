/* ============================================================
   ProjectShowcase — Dark cinematic project gallery
   ─────────────────────────────────────────────────
   • Dark section with animated scan-line + grid-dot overlay
   • Glowing neon filter tabs
   • Cards with glassmorphic borders, holographic tilt, glow
   • AnimatePresence + layout for smooth category morph
   • Shared layoutId → cinematic modal expansion
   ============================================================ */

"use client";

import { useState, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useScroll,
  useTransform,
} from "framer-motion";
import siteConfig from "@/theme/siteConfig";
import useFilter from "@/hooks/useFilter";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

/* ── Animated filter pills ─────────────────────────────────── */
function FilterPill({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-all duration-300
        ${
          isActive
            ? "text-primary-light"
            : "text-neutral-400 hover:text-neutral-200"
        }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeProjectFilter"
          className="absolute inset-0 rounded-full border border-primary/40 bg-primary/10 shadow-[0_0_20px_rgba(45,212,191,0.15)]"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}

/* ── Stagger animation variants ────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/* ── Component ──────────────────────────────────────────────── */
export default function ProjectShowcase({ projects = [] }) {
  const sectionRef = useRef(null);
  const { filteredItems, activeCategory, setCategory } = useFilter(
    projects,
    "category",
  );
  const [selectedProject, setSelectedProject] = useState(null);

  /* Parallax for decorative elements */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const handleSelect = useCallback((project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden bg-surface-dark py-28 sm:py-36"
    >
      {/* ── Background layers ─────────────────────────────────── */}
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(45,212,191,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Floating orbs */}
      <motion.div
        className="pointer-events-none absolute -left-40 top-[20%] h-[500px] w-[500px] rounded-full bg-primary/[0.06] blur-[120px]"
        style={{ y: orbY }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -right-32 bottom-[10%] h-[400px] w-[400px] rounded-full bg-accent/[0.04] blur-[100px]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-60, 60]) }}
        aria-hidden="true"
      />

      {/* Scan line sweep */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary-light/[0.03] to-transparent"
        style={{ backgroundSize: "100% 300%", animation: "scanLine 6s ease-in-out infinite" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ──────────────────────────────────── */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary-light backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-light" />
            Our Work
          </span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-text-inverse sm:text-5xl lg:text-6xl">
            Featured{" "}
            <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-neutral-400">
            From concept to deployment — explore the products we&apos;ve built
            for startups and enterprises.
          </p>
        </motion.div>

        {/* ── Filter Tabs ─────────────────────────────────────── */}
        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {siteConfig.projectCategories.map((cat) => (
            <FilterPill
              key={cat}
              label={cat}
              isActive={activeCategory === cat}
              onClick={() => setCategory(cat)}
            />
          ))}
        </motion.div>

        {/* ── Project Grid ────────────────────────────────────── */}
        <LayoutGroup>
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
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

          {/* Empty state */}
          <AnimatePresence>
            {filteredItems.length === 0 && (
              <motion.p
                className="mt-16 text-center text-neutral-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No projects found in this category yet.
              </motion.p>
            )}
          </AnimatePresence>

          {/* Modal */}
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
