/* ============================================================
   useFilter — Custom hook for category filtering
   Encapsulates filtering logic for ProjectShowcase.
   Pure logic, no UI — keeps sections presentational.
   ============================================================ */

"use client";

import { useState, useMemo } from "react";

export default function useFilter(items = [], categoryKey = "category") {
  const [activeCategory, setActiveCategory] = useState("All");

  /* Extract unique categories from items */
  const categories = useMemo(() => {
    const unique = [...new Set(items.map((item) => item[categoryKey]))];
    return ["All", ...unique];
  }, [items, categoryKey]);

  /* Filter items by active category */
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((item) => item[categoryKey] === activeCategory);
  }, [items, activeCategory, categoryKey]);

  return {
    filteredItems,
    activeCategory,
    setCategory: setActiveCategory,
    categories,
  };
}
