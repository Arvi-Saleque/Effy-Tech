/* ============================================================
   CommandPalette — Raycast / Linear-style search overlay
   Features: backdrop blur, ring highlight, hint row,
   mocked results list, tight spacing, keyboard navigation hints.
   ============================================================ */

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSearch, HiX } from "react-icons/hi";

const MOCK_RESULTS = [
  { id: 1, label: "Home", section: "Pages", href: "#hero" },
  { id: 2, label: "About Us", section: "Pages", href: "#about" },
  { id: 3, label: "Projects", section: "Pages", href: "#projects" },
  { id: 4, label: "Contact", section: "Pages", href: "#contact" },
];

export default function CommandPalette({ isOpen, onClose, onSearch }) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? MOCK_RESULTS.filter((r) =>
        r.label.toLowerCase().includes(query.toLowerCase()),
      )
    : MOCK_RESULTS;

  /* Focus input when opened, clear on close */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery("");
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

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-neutral-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />

          {/* Palette container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[18vh]"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="w-full max-w-lg mx-4 rounded-xl bg-neutral-white ring-1 ring-neutral-black/5 shadow-xl overflow-hidden">
              {/* Search Input Row */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <HiOutlineSearch className="h-4 w-4 text-text-tertiary shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleChange}
                  placeholder="Search pages, projects..."
                  className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none focus-visible:ring-0"
                />
                <button
                  onClick={onClose}
                  className="flex h-6 w-6 items-center justify-center rounded-md text-text-tertiary hover:text-text-primary hover:bg-neutral-100 transition-colors duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
                  aria-label="Close search"
                >
                  <HiX className="h-4 w-4" />
                </button>
              </div>

              {/* Results list */}
              <div className="max-h-64 overflow-y-auto py-2">
                {filtered.length > 0 ? (
                  filtered.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between px-4 py-2 text-sm text-text-secondary hover:bg-neutral-50 hover:text-text-primary transition-colors duration-100"
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="text-xs text-text-tertiary">
                        {item.section}
                      </span>
                    </a>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-sm text-text-tertiary">
                    No results for &ldquo;{query}&rdquo;
                  </div>
                )}
              </div>

              {/* Hint row */}
              <div className="flex items-center gap-4 border-t border-border px-4 py-2 text-[11px] text-text-tertiary">
                <span className="flex items-center gap-1">
                  <kbd className="inline-flex h-4 items-center rounded border border-border px-1 font-mono text-[10px]">
                    ↵
                  </kbd>
                  Open
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="inline-flex h-4 items-center rounded border border-border px-1 font-mono text-[10px]">
                    ↑↓
                  </kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="inline-flex h-4 items-center rounded border border-border px-1 font-mono text-[10px]">
                    Esc
                  </kbd>
                  Close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
