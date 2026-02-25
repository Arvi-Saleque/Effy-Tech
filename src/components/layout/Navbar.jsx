/* ============================================================
   Navbar — Main navigation bar
   - 3-column grid layout for perfect center alignment
   - Transparent → solid on scroll (~80px)
   - Corporate pill-hover nav links with focus states
   - ⌘K hint badge on desktop
   - Fixed top-0 z-50
   ============================================================ */

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import siteConfig from "@/theme/siteConfig";
import { Logo } from "@/components/ui";
import CommandPalette from "./CommandPalette";
import MobileMenu from "./MobileMenu";
import { HiOutlineSearch } from "react-icons/hi";

const SCROLL_THRESHOLD = 80;

export default function Navbar() {
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

  const handleSearch = useCallback((query) => {
    console.log("Search:", query);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-out ${
          scrolled
            ? "bg-neutral-white/80 backdrop-blur-xl shadow-sm border-b border-border"
            : "bg-transparent"
        }`}
      >
        {/* ── 3-column grid: logo | nav | actions ── */}
        <div className="mx-auto grid h-16 md:h-[72px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8">
          {/* ── Left: Logo ── */}
          <div className="justify-self-start">
            <Logo
              size="md"
              light={!scrolled}
              className="transition-all duration-200"
            />
          </div>

          {/* ── Center: Nav Links (desktop — always visible) ── */}
          <nav className="hidden md:flex justify-self-center items-center gap-1">
            {siteConfig.navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:outline-none ${
                  scrolled
                    ? "text-text-secondary hover:text-text-primary hover:bg-neutral-100"
                    : "text-text-inverse/80 hover:text-text-inverse hover:bg-white/10"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* ── Right: Search + ⌘K hint + Hamburger ── */}
          <div className="justify-self-end flex items-center gap-2">
            {/* Search button with ⌘K hint (desktop) */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`flex items-center gap-2 rounded-lg transition-colors duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:outline-none ${
                scrolled
                  ? "text-text-tertiary hover:text-text-secondary hover:bg-neutral-100"
                  : "text-text-inverse/70 hover:text-text-inverse hover:bg-white/10"
              } h-9 px-2`}
              aria-label="Search (⌘K)"
            >
              <HiOutlineSearch className="h-4 w-4" />
              {/* ⌘K badge — desktop only */}
              <kbd
                className={`hidden md:inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-medium leading-none ${
                  scrolled
                    ? "bg-neutral-100 text-text-tertiary border border-border"
                    : "bg-white/10 text-text-inverse/60 border border-white/15"
                }`}
              >
                ⌘K
              </kbd>
            </button>

            {/* Hamburger / Close toggle (mobile only) */}
            <button
              onClick={toggleMobileMenu}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-150 cursor-pointer md:hidden focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:outline-none ${
                scrolled
                  ? "text-text-primary hover:bg-neutral-100"
                  : "text-text-inverse hover:bg-white/10"
              }`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative h-5 w-5">
                <span
                  className={`absolute left-0 top-0.5 h-0.5 w-5 rounded-full transition-all duration-200 ${
                    scrolled ? "bg-text-primary" : "bg-text-inverse"
                  } ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                />
                <span
                  className={`absolute left-0 top-[9px] h-0.5 w-5 rounded-full transition-all duration-200 ${
                    scrolled ? "bg-text-primary" : "bg-text-inverse"
                  } ${mobileMenuOpen ? "opacity-0 scale-x-0" : ""}`}
                />
                <span
                  className={`absolute left-0 bottom-0.5 h-0.5 w-5 rounded-full transition-all duration-200 ${
                    scrolled ? "bg-text-primary" : "bg-text-inverse"
                  } ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Overlays ── */}
      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSearch={handleSearch}
      />
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
