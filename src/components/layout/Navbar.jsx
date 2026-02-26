/* ============================================================
   Navbar — Main navigation bar
   - Nav links always visible (white on hero, dark after scroll)
   - Before scroll: fully transparent background
   - After scroll (~80px): dark semi-transparent blur, shadow
   - Search: command palette overlay (click search icon)
   - Mobile: full-screen overlay with stagger-animated links
   - Fixed top-0 z-50
   ============================================================ */

"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import siteConfig from "@/theme/siteConfig";
import { Logo } from "@/components/ui";
import CommandPalette from "./CommandPalette";
import MobileMenu from "./MobileMenu";
import { HiOutlineSearch } from "react-icons/hi";
import projects from "@/data/projects";

const SCROLL_THRESHOLD = 80;

/* Pages that use their own custom navbar */
const CUSTOM_NAVBAR_ROUTES = ["/projects/IAM"];

export default function Navbar() {
  const pathname = usePathname();
  const hideGlobal = CUSTOM_NAVBAR_ROUTES.includes(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  /* Scroll listener */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ⌘K keyboard shortcut */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* Lock body scroll when overlays are open */
  useEffect(() => {
    if (mobileMenuOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, searchOpen]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  /* Hide global navbar on pages with their own navbar */
  if (hideGlobal) return null;

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          scrolled
            ? "bg-neutral-900/80 backdrop-blur-md shadow-lg border-b border-primary-darkest/30"
            : "bg-neutral-900/20 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 md:h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── Left: Logo ───────────────────────────────────── */}
          <Logo size="md" light className="transition-all duration-300" />

          {/* ── Center: Nav Links (desktop — always visible) ── */}
          <nav className="hidden md:flex items-center gap-1">
            {siteConfig.navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 group ${
                  scrolled
                    ? "text-neutral-300 hover:text-primary-light"
                    : "text-text-inverse/80 hover:text-text-inverse"
                }`}
              >
                {label}
                {/* Gold underline on hover */}
                <span className="absolute bottom-0.5 left-4 right-4 h-0.5 bg-primary-light scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            ))}
          </nav>

          {/* ── Right: Search + Hamburger ─────────────────────── */}
          <div className="flex items-center gap-3">
            {/* Search icon → opens command palette */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 cursor-pointer ${
                scrolled
                  ? "text-neutral-400 hover:text-primary-light hover:bg-neutral-white/10"
                  : "text-text-inverse/80 hover:text-text-inverse hover:bg-neutral-white/10"
              }`}
              aria-label="Search"
            >
              <HiOutlineSearch className="h-5 w-5" />
            </button>

            {/* Hamburger / Close toggle (mobile only) */}
            <button
              onClick={toggleMobileMenu}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 cursor-pointer md:hidden ${
                scrolled
                  ? "text-text-inverse hover:bg-neutral-white/10"
                  : "text-text-inverse hover:bg-neutral-white/10"
              }`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative h-5 w-5">
                <span
                  className={`absolute left-0 top-0.5 h-0.5 w-5 rounded-full transition-all duration-300 ${"bg-text-inverse"} ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                />
                <span
                  className={`absolute left-0 top-[9px] h-0.5 w-5 rounded-full transition-all duration-300 ${"bg-text-inverse"} ${mobileMenuOpen ? "opacity-0 scale-x-0" : ""}`}
                />
                <span
                  className={`absolute left-0 bottom-0.5 h-0.5 w-5 rounded-full transition-all duration-300 ${"bg-text-inverse"} ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Overlays ─────────────────────────────────────────── */}
      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        projects={projects}
        pages={siteConfig.navLinks}
      />
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
