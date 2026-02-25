/* ============================================================
   ProjectCard — Showcase card with hover overlay + layoutId
   ─────────────────────────────────────────────────
   • Thumbnail with clipped hover-zoom
   • Category badge, title, short description
   • On hover: scale-up + shadow + translucent "View Details" overlay
   • Clicking opens expanding modal via shared layoutId
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import { Badge, ImagePlaceholder } from "@/components/ui";

export default function ProjectCard({ project, onSelect, index }) {
  const { id, title, description, category, tags, thumbnail } = project;

  return (
    <motion.article
      layoutId={`project-card-${id}`}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-neutral-white shadow-sm"
      onClick={() => onSelect(project)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      // Stagger based on index
      custom={index}
      style={{ originX: 0.5, originY: 0.5 }}
    >
      {/* ── Thumbnail ─────────────────────────────────────────── */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <ImagePlaceholder text={title} />
        )}

        {/* Category badge — top-left */}
        <div className="absolute top-3 left-3 z-10">
          <Badge label={category} variant="solid" size="sm" />
        </div>

        {/* Hover overlay — translucent "View Details" */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-900/0 transition-all duration-300 group-hover:bg-neutral-900/60">
          <span className="translate-y-4 rounded-full border border-neutral-white/30 bg-neutral-white/10 px-5 py-2 text-sm font-medium text-text-inverse opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View Details →
          </span>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-text-secondary line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-surface-alt px-2 py-0.5 text-[11px] font-medium text-text-tertiary"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="rounded-md bg-surface-alt px-2 py-0.5 text-[11px] font-medium text-text-tertiary">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Top accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary-light to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.article>
  );
}
