/* ============================================================
   MobileMenu — Full-screen corporate mobile navigation
   Product-style UI: grouped sections, normal typography,
   clear CTA, tighter motion, focus states.
   ============================================================ */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import siteConfig from "@/theme/siteConfig";
import { Logo, SocialLinks } from "@/components/ui";

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const menuVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const linkVariants = {
  closed: { opacity: 0, y: 12 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col bg-surface-dark"
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ duration: 0.2 }}
        >
          {/* Top bar — logo + close */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
            <Logo light size="md" />
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-text-inverse/70 hover:text-text-inverse hover:bg-white/10 transition-colors duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
              aria-label="Close menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <motion.nav
            className="flex flex-1 flex-col px-6 pt-8 pb-4 overflow-y-auto"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Section label */}
            <motion.p
              variants={linkVariants}
              className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-3"
            >
              Navigation
            </motion.p>

            {/* Nav links */}
            {siteConfig.navLinks.map(({ label, href }) => (
              <motion.div key={label} variants={linkVariants}>
                <a
                  href={href}
                  onClick={onClose}
                  className="block rounded-lg px-3 py-2.5 text-lg font-medium text-text-inverse/90 hover:text-text-inverse hover:bg-white/5 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
                >
                  {label}
                </a>
              </motion.div>
            ))}

            {/* Divider */}
            <motion.div
              variants={linkVariants}
              className="my-6 h-px bg-neutral-800"
            />

            {/* CTA group */}
            <motion.div variants={linkVariants} className="space-y-3">
              <a
                href="#contact"
                onClick={onClose}
                className="flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-text-inverse hover:bg-primary-dark transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark focus-visible:outline-none"
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.nav>

          {/* Bottom — social links */}
          <div className="flex justify-center border-t border-neutral-800 px-6 py-6">
            <SocialLinks links={siteConfig.socials} light size="md" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
