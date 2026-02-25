/* ============================================================
   ProjectModal — Expanding card detail overlay
   ─────────────────────────────────────────────────
   Uses shared layoutId with ProjectCard for a smooth
   morph/expand animation when opening/closing.
   Shows full project details: description, tags, client,
   images, and external link.
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import { HiX, HiExternalLink } from "react-icons/hi";
import { Badge, ImagePlaceholder } from "@/components/ui";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const {
    id,
    title,
    description,
    category,
    tags,
    thumbnail,
    clientName,
    liveUrl,
  } = project;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-50 bg-neutral-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          layoutId={`project-card-${id}`}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-neutral-white shadow-xl"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900/50 text-text-inverse hover:bg-neutral-900/70 backdrop-blur-sm transition-colors cursor-pointer"
            aria-label="Close"
          >
            <HiX className="h-4 w-4" />
          </button>

          {/* Hero image */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={title}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImagePlaceholder text={title} />
            )}

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <Badge label={category} variant="solid" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Title + client */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
                {title}
              </h2>
              {clientName && (
                <p className="mt-1 text-sm text-text-tertiary">
                  Client:{" "}
                  <span className="font-medium text-text-secondary">
                    {clientName}
                  </span>
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-text-secondary leading-relaxed">{description}</p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} label={tag} variant="outline" size="sm" />
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-3">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-text-inverse hover:bg-primary-dark transition-colors"
                >
                  <HiExternalLink className="h-4 w-4" />
                  View Live
                </a>
              )}
              <button
                onClick={onClose}
                className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-alt transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
