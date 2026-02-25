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
            <div className="w-full max-w-xl mx-4 rounded-2xl bg-neutral-900/90 border border-primary-darkest/30 shadow-xl backdrop-blur-md overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4">
                <HiOutlineSearch className="h-5 w-5 text-primary-light shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search projects, pages, anything..."
                  onChange={(e) => onSearch?.(e.target.value)}
                  className="flex-1 bg-transparent text-lg text-text-inverse placeholder:text-neutral-500 outline-none"
                />
                <button
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-neutral-400 hover:text-text-inverse hover:bg-neutral-white/10 border border-neutral-700 transition-colors cursor-pointer sm:h-8 sm:w-8 sm:px-0 sm:py-0 sm:border-0"
                  aria-label="Close search"
                >
                  <HiX className="h-5 w-5" />
                  <span className="sm:hidden">Close</span>
                </button>
              </div>

              {/* Results area */}
              <div className="border-t border-neutral-700/50 px-5 py-6 text-center">
                <p className="text-sm text-neutral-500">
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
