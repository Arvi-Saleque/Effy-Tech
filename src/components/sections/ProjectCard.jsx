/* ============================================================
   ProjectCard — Glassmorphic dark card with glow border
   ─────────────────────────────────────────────────
   • Dark glass background with subtle border glow on hover
   • Thumbnail with diagonal clip + hover zoom
   • Animated gradient stripe on the left edge
   • Tech-tag pills with monospace style
   • 3D tilt-lift on hover, stagger fade-in
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: { opacity: 0, y: 30, scale: 0.93, transition: { duration: 0.25 } },
};

export default function ProjectCard({ project, onSelect, index }) {
  const { id, title, description, category, tags, thumbnail } = project;

  return (
    <motion.article
      layoutId={`project-card-${id}`}
      variants={cardVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      onClick={() => onSelect(project)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-700/40 bg-neutral-900/60 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(45,212,191,0.08)] hover:border-primary/30"
      style={{ originX: 0.5, originY: 0.5 }}
    >
      {/* ── Left edge accent stripe ───────────────────────────── */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-light/0 via-primary-light/50 to-accent/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* ── Thumbnail ─────────────────────────────────────────── */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <ImagePlaceholder text={title} dark />
        )}

        {/* Top gradient fade */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-neutral-900/50 to-transparent" />

        {/* Category chip — top-left */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-neutral-900/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-light backdrop-blur-sm">
            <span className="h-1 w-1 rounded-full bg-primary-light" />
            {category}
          </span>
        </div>

        {/* Hover overlay — call-to-action */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-900/0 transition-all duration-500 group-hover:bg-neutral-900/70">
          <span className="flex translate-y-5 items-center gap-2 rounded-full border border-primary-light/30 bg-primary/20 px-6 py-2.5 text-sm font-medium text-primary-light opacity-0 backdrop-blur-md transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </span>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-neutral-100 transition-colors duration-300 group-hover:text-primary-light line-clamp-1">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500 line-clamp-2">
          {description}
        </p>

        {/* Tech tags — monospace style */}
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-neutral-700/50 bg-neutral-800/40 px-2 py-0.5 font-mono text-[11px] text-neutral-400 transition-colors duration-300 group-hover:border-primary/20 group-hover:text-primary-light/70"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="rounded-md border border-neutral-700/50 bg-neutral-800/40 px-2 py-0.5 font-mono text-[11px] text-neutral-500">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Bottom glow bar ───────────────────────────────────── */}
      <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary-light/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.article>
  );
}
