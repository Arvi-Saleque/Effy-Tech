/* ============================================================
   ProjectModal — Cinematic dark expanding detail overlay
   ─────────────────────────────────────────────────
   Uses shared layoutId with ProjectCard for a smooth
   morph/expand animation. Dark theme matching the section.
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import { HiX, HiExternalLink, HiArrowRight } from "react-icons/hi";
import Link from "next/link";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const {
    id,
    title,
    slug,
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
        className="fixed inset-0 z-50 bg-neutral-black/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          layoutId={`project-card-${id}`}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-neutral-700/40 bg-neutral-900/95 shadow-[0_0_60px_rgba(45,212,191,0.08)] backdrop-blur-xl"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-600/50 bg-neutral-800/80 text-neutral-400 hover:text-neutral-100 hover:border-primary/40 backdrop-blur-sm transition-all cursor-pointer"
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
              <ImagePlaceholder text={title} dark />
            )}

            {/* Category chip */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-neutral-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-light backdrop-blur-sm">
                <span className="h-1 w-1 rounded-full bg-primary-light" />
                {category}
              </span>
            </div>

            {/* Bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-900/95 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Title + client */}
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-neutral-100 sm:text-3xl">
                {title}
              </h2>
              {clientName && (
                <p className="mt-1.5 text-sm text-neutral-500">
                  Client:{" "}
                  <span className="font-medium text-neutral-300">
                    {clientName}
                  </span>
                </p>
              )}
            </div>

            {/* Description */}
            <p className="leading-relaxed text-neutral-400">{description}</p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-neutral-700/50 bg-neutral-800/40 px-2.5 py-1 font-mono text-xs text-neutral-400"
                  >
                    {tag}
                  </span>
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
                  className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/15 px-5 py-2.5 text-sm font-medium text-primary-light transition-all hover:bg-primary/25 hover:shadow-[0_0_20px_rgba(45,212,191,0.15)]"
                >
                  <HiExternalLink className="h-4 w-4" />
                  View Live
                </a>
              )}
              <Link
                href={`/projects/${slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent-light transition-all hover:bg-accent/20 hover:shadow-[0_0_20px_rgba(184,168,138,0.12)]"
              >
                <HiArrowRight className="h-4 w-4" />
                View Project
              </Link>
              <button
                onClick={onClose}
                className="rounded-lg border border-neutral-700 px-5 py-2.5 text-sm font-medium text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-light/30 to-transparent" />
        </motion.div>
      </div>
    </>
  );
}
