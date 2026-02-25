/* ============================================================
   FilterBar — Category filter tabs
   Used in ProjectShowcase to filter by category.
   Accepts categories array, active category, and callback.
   ============================================================ */

"use client";

import { motion } from "framer-motion";

export default function FilterBar({
  categories = [],
  activeCategory = "All",
  onFilter,
  className = "",
}) {
  return (
    <div
      className={`flex flex-wrap justify-center gap-2 md:gap-3 ${className}`}
    >
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onFilter(category)}
            className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer
              ${
                isActive
                  ? "text-text-inverse"
                  : "text-text-secondary hover:text-text-primary hover:bg-neutral-100"
              }`}
          >
            {/* Animated active background */}
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
