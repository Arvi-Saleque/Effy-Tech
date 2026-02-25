/* ============================================================
   MobileMenu — Full-screen overlay with stagger-animated links
   Large text links, gold accent dividers, cinematic feel.
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
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const linkVariants = {
  closed: { opacity: 0, y: 30, filter: "blur(4px)" },
  open: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: "easeOut" },
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
          transition={{ duration: 0.3 }}
        >
          {/* Top bar — logo + close */}
          <div className="flex items-center justify-between px-6 py-5">
            <Logo light size="md" />
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-light/20 text-text-inverse hover:bg-primary-light/10 transition-colors cursor-pointer"
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

          {/* Navigation links — large stagger animated */}
          <motion.nav
            className="flex flex-1 flex-col items-center justify-center gap-2"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {siteConfig.navLinks.map(({ label, href }, index) => (
              <motion.div key={label} variants={linkVariants}>
                {/* Gold divider line before each link (except first) */}
                {index > 0 && (
                  <div className="mx-auto mb-2 h-px w-16 bg-primary-light/20" />
                )}
                <a
                  href={href}
                  onClick={onClose}
                  className="block px-6 py-3 text-center text-4xl md:text-5xl font-bold text-text-inverse hover:text-primary-light transition-colors"
                >
                  {label}
                </a>
              </motion.div>
            ))}

            {/* CTA */}
            <motion.div variants={linkVariants} className="mt-8">
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full bg-gradient-primary px-8 py-3 text-base font-semibold text-text-inverse shadow-accent transition-all hover:scale-105"
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.nav>

          {/* Bottom — social links */}
          <div className="flex justify-center pb-8">
            <SocialLinks links={siteConfig.socials} light size="md" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
