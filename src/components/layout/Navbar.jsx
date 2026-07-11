"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail, Menu, Search, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import CommandPalette from "@/components/layout/CommandPalette";
import projects from "@/data/projects";
import siteConfig from "@/theme/siteConfig";

const CUSTOM_NAVBAR_ROUTES = ["/projects/IAM", "/projects/DHA", "/projects/BUEK"];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const hideGlobal = CUSTOM_NAVBAR_ROUTES.includes(pathname) || pathname?.startsWith("/admin");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(false);
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (hideGlobal) return null;

  const openSearch = () => {
    setOpen(false);
    setSearchOpen(true);
  };

  return (
    <>
      <header className={`effy-navbar ${scrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}>
        <div className="home-shell navbar-inner">
          <Logo size="md" />

          <nav className="desktop-nav" aria-label="Primary navigation">
            {siteConfig.navLinks.map((item) => (
              <a key={item.label} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <button className="nav-search" onClick={openSearch} aria-label="Search the website">
            <Search size={17} />
            <span>Search</span>
            <kbd>⌘K</kbd>
          </button>

          <a href="/#contact" className="nav-cta">Start a Project <ArrowRight size={16}/></a>

          <button
            className="mobile-trigger"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={23}/> : <Menu size={23}/>} 
          </button>
        </div>

        {open && (
          <div className="mobile-menu-layer">
            <button className="mobile-menu-backdrop" onClick={() => setOpen(false)} aria-label="Close menu" />
            <div className="mobile-nav" role="dialog" aria-modal="true" aria-label="Mobile navigation">
              <div className="mobile-nav-intro">
                <span className="eyebrow">Navigate Effy Tech</span>
                <p>Explore our capabilities, selected work, and the way we build connected digital systems.</p>
              </div>

              <button className="mobile-search-card" onClick={openSearch}>
                <span className="mobile-search-icon"><Search size={20}/></span>
                <span>
                  <strong>Search Effy Tech</strong>
                  <small>Projects, services and pages</small>
                </span>
                <kbd>⌘K</kbd>
              </button>

              <nav className="mobile-nav-links" aria-label="Mobile primary navigation">
                {siteConfig.navLinks.map((item, index) => (
                  <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
                    <span className="mobile-nav-index">0{index + 1}</span>
                    <span>{item.label}</span>
                    <ArrowRight size={18}/>
                  </a>
                ))}
              </nav>

              <div className="mobile-nav-footer">
                <a className="mobile-primary-cta" href="/#contact" onClick={() => setOpen(false)}>
                  Start a Project <ArrowRight size={18}/>
                </a>
                <a className="mobile-email-link" href={`mailto:${siteConfig.contact.email}`}>
                  <Mail size={17}/> {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        projects={projects}
        pages={siteConfig.navLinks}
      />
    </>
  );
}
