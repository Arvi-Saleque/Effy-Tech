/* ============================================================
   Card — Project/showcase card component
   Used in ProjectShowcase section.
   Features: image, title, description, category badge, hover effect.
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import Badge from "./Badge";
import ImagePlaceholder from "./ImagePlaceholder";

export default function Card({
  image,
  title,
  description,
  category,
  tags = [],
  link,
  className = "",
}) {
  const CardContent = (
    <motion.div
      className={`group relative overflow-hidden rounded-xl bg-surface border border-border 
        hover:shadow-xl transition-shadow duration-[var(--transition-base)] ${className}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder text={title} />
        )}

        {/* Category overlay */}
        {category && (
          <div className="absolute top-3 left-3">
            <Badge label={category} variant="solid" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-text-secondary line-clamp-2">
            {description}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} label={tag} variant="outline" size="sm" />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {CardContent}
      </a>
    );
  }

  return CardContent;
}
