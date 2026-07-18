"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail, Menu, Search, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import CommandPalette from "@/components/layout/CommandPalette";
import projects from "@/data/projects";
import siteConfig from "@/theme/siteConfig";
import useModalFocus from "@/hooks/useModalFocus";

const CUSTOM_NAVBAR_ROUTES = ["/projects/IAM", "/projects/DHA", "/projects/BUEK"];

const searchPages = [
  { label: "Homepage", href: "/", type: "page", description: "Effy Tech company homepage", keywords: ["home", "effy tech"] },
  { label: "Services", href: "/#services", type: "page", description: "Web, mobile, automation, and AI capabilities", keywords: ["capabilities", "web", "mobile", "automation", "ai"] },
  { label: "Featured Projects", href: "/#work", type: "caseStudy", description: "Selected Effy Tech product and platform case studies", keywords: ["projects", "portfolio", "work", "case studies"] },
  { label: "Client Outcomes", href: "/#outcomes", type: "page", description: "Operational value created by Effy Tech systems", keywords: ["clients", "results", "outcomes"] },
  { label: "Development Process", href: "/#process", type: "page", description: "How Effy Tech discovers, architects, builds, and launches products", keywords: ["workflow", "process", "delivery"] },
  { label: "Engineering Standards", href: "/#standards", type: "page", description: "Security, responsiveness, performance, testing, and handover standards", keywords: ["quality", "security", "testing", "documentation"] },
  { label: "Technology Stack", href: "/#technology", type: "page", description: "Frontend, mobile, backend, database, cloud, and product tools", keywords: ["next.js", "react", "flutter", "laravel", "supabase", "firebase", "postgresql", "vercel"] },
  { label: "About Effy Tech", href: "/#about", type: "page", description: "Company approach, ownership model, and industries served", keywords: ["company", "industries", "education", "startups"] },
  { label: "Team", href: "/#team", type: "team", description: "The founders responsible for strategy, engineering, and delivery", keywords: ["founders", "people"] },
  { label: "Frequently Asked Questions", href: "/#faq", type: "page", description: "Project scope, budget, ownership, deployment, and support answers", keywords: ["faq", "budget", "timeline", "support"] },
  { label: "Contact Effy Tech", href: "/#contact", type: "page", description: "Start a project or send Effy Tech a project brief", keywords: ["contact", "email", "phone", "whatsapp", "start project"] },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const mobileCloseRef = useRef(null);
  const mobileDialogRef = useModalFocus(open, {
    initialFocusRef: mobileCloseRef,
    onDismiss: () => setOpen(false),
  });
  const hideGlobal = CUSTOM_NAVBAR_ROUTES.includes(pathname) || pathname?.startsWith("/admin");
  const portalTarget = typeof document === "undefined" ? null : document.body;

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
            aria-controls="mobile-navigation-dialog"
          >
            {open ? <X size={23}/> : <Menu size={23}/>}
          </button>
        </div>

        {portalTarget && open && createPortal(
          <div className="mobile-menu-layer">
            <button
              className="mobile-menu-backdrop"
              onClick={() => setOpen(false)}
              tabIndex={-1}
              aria-hidden="true"
            />
            <div
              ref={mobileDialogRef}
              id="mobile-navigation-dialog"
              className="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-navigation-title"
              tabIndex={-1}
            >
              <div className="mobile-nav-intro">
                <div className="mobile-nav-heading-row">
                  <span id="mobile-navigation-title" className="eyebrow">Navigate Effy Tech</span>
                  <button
                    ref={mobileCloseRef}
                    type="button"
                    className="mobile-nav-close"
                    onClick={() => setOpen(false)}
                    aria-label="Close mobile navigation"
                  >
                    <X size={20} aria-hidden="true" />
                  </button>
                </div>
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
          </div>,
          portalTarget,
        )}
      </header>

      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        projects={projects}
        services={siteConfig.services}
        pages={searchPages}
      />
    </>
  );
}
