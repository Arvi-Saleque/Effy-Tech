/* ============================================================
   CommandPalette — Search overlay
   Centered large input with backdrop blur.
   Triggered from Navbar search icon or ⌘K shortcut.
   ============================================================ */

"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSearch, HiX } from "react-icons/hi";

export default function CommandPalette({ isOpen, onClose, onSearch }) {
  const inputRef = useRef(null);

  /* Focus input when opened */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  /* Escape to close */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-neutral-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Palette */}
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="w-full max-w-xl mx-4 rounded-2xl bg-neutral-white border border-border shadow-xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4">
                <HiOutlineSearch className="h-5 w-5 text-primary-light shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search projects, pages, anything..."
                  onChange={(e) => onSearch?.(e.target.value)}
                  className="flex-1 bg-transparent text-lg text-text-primary placeholder:text-text-tertiary outline-none"
                />
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-text-tertiary hover:text-text-primary hover:bg-neutral-100 transition-colors cursor-pointer"
                  aria-label="Close search"
                >
                  <HiX className="h-5 w-5" />
                </button>
              </div>

              {/* Results area */}
              <div className="border-t border-border px-5 py-6 text-center">
                <p className="text-sm text-text-tertiary">
                  Type to search across projects and pages
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
