"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Mail, Menu, Search, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import CommandPalette from "@/components/layout/CommandPalette";
import projects from "@/data/projects";
import siteConfig from "@/theme/siteConfig";
import useModalFocus from "@/hooks/useModalFocus";

const searchPages = [
  {
    label: "Homepage",
    href: "/",
    type: "page",
    description: "Effy Tech company homepage",
    keywords: ["home", "effy tech"],
  },
  {
    label: "Services",
    href: "/services",
    type: "page",
    description: "Web, mobile, automation, and AI capabilities",
    keywords: ["capabilities", "web", "mobile", "automation", "ai"],
  },
  {
    label: "Projects",
    href: "/projects",
    type: "caseStudy",
    description: "Selected Effy Tech product and platform case studies",
    keywords: ["projects", "portfolio", "work", "case studies"],
  },
  {
    label: "Development Process",
    href: "/process",
    type: "page",
    description:
      "How Effy Tech discovers, architects, builds, and launches products",
    keywords: ["workflow", "process", "delivery"],
  },
  {
    label: "About Effy Tech",
    href: "/about",
    type: "page",
    description: "Company approach, ownership model, and industries served",
    keywords: ["company", "industries", "education", "startups"],
  },
  {
    label: "Leadership & Team",
    href: "/team",
    type: "team",
    description:
      "The founders responsible for strategy, engineering, and delivery",
    keywords: ["founders", "people"],
  },
  {
    label: "Salek Bin Hossain",
    href: "/team/salek-bin-hossain",
    type: "team",
    description: "Founder & CEO of Effy Tech",
    keywords: ["salek", "leadership", "engineering"],
  },
  {
    label: "Abdullah Al Saif",
    href: "/team/abdullah-al-saif",
    type: "team",
    description: "Co-Founder & Head of Engineering at Effy Tech",
    keywords: ["saif", "leadership", "engineering"],
  },
  {
    label: "Adnan Bin Wahid",
    href: "/team/adnan-bin-wahid",
    type: "team",
    description: "Co-Founder & Lead Software Engineer at Effy Tech",
    keywords: ["adnan", "leadership", "engineering"],
  },
  {
    label: "Contact Effy Tech",
    href: "/contact",
    type: "page",
    description: "Start a project or send Effy Tech a project brief",
    keywords: ["contact", "email", "phone", "whatsapp", "start project"],
  },
  {
    label: "Project-Based Product Video Editor",
    href: "/hire/project-based-video-editor",
    type: "page",
    description:
      "Remote, paid, project-based product video editing opportunity at Effy Tech",
    keywords: [
      "hiring",
      "video editor",
      "capcut",
      "remote job",
      "career",
      "apply",
    ],
  },
];

function isPathActive(pathname, item) {
  const candidates = [
    item.href,
    ...(item.children || []).map((child) => child.href),
  ];

  return candidates.some((href) => {
    if (href === "/") return pathname === "/";
    if (href === "/projects" && pathname?.startsWith("/demos/")) return true;
    return pathname === href || pathname?.startsWith(`${href}/`);
  });
}

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
  const hideGlobal = pathname?.startsWith("/admin");
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
      <header
        className={`effy-navbar ${scrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}
      >
        <div className="home-shell navbar-inner">
          <Logo size="md" />

          <nav className="desktop-nav" aria-label="Primary navigation">
            {siteConfig.navLinks.map((item) => {
              const active = isPathActive(pathname, item);

              return (
                <div
                  key={item.label}
                  className={`desktop-nav-item ${item.children ? "has-dropdown" : ""} ${active ? "is-active" : ""}`}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                    {item.children ? (
                      <ChevronDown size={14} aria-hidden="true" />
                    ) : null}
                  </Link>
                  {item.children ? (
                    <div className="desktop-nav-dropdown">
                      {item.children.map((child) => {
                        const childActive =
                          pathname === child.href ||
                          pathname?.startsWith(`${child.href}/`);

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            aria-current={childActive ? "page" : undefined}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <button
            className="nav-search"
            onClick={openSearch}
            aria-label="Search the website"
          >
            <Search size={17} />
            <span>Search</span>
            <kbd>⌘K</kbd>
          </button>

          <Link href="/contact" className="nav-cta">
            Start a Project <ArrowRight size={16} />
          </Link>

          <button
            className="mobile-trigger"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation-dialog"
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {portalTarget &&
          open &&
          createPortal(
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
                    <span id="mobile-navigation-title" className="eyebrow">
                      Navigate Effy Tech
                    </span>
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
                  <p>
                    Explore our capabilities, selected work, and the way we
                    build connected digital systems.
                  </p>
                </div>

                <button className="mobile-search-card" onClick={openSearch}>
                  <span className="mobile-search-icon">
                    <Search size={20} />
                  </span>
                  <span>
                    <strong>Search Effy Tech</strong>
                    <small>Projects, services and pages</small>
                  </span>
                  <kbd>⌘K</kbd>
                </button>

                <nav
                  className="mobile-nav-links"
                  aria-label="Mobile primary navigation"
                >
                  {siteConfig.navLinks.map((item, index) => {
                    const active = isPathActive(pathname, item);

                    return (
                      <div className="mobile-nav-group" key={item.label}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                        >
                          <span className="mobile-nav-index">0{index + 1}</span>
                          <span>{item.label}</span>
                          <ArrowRight size={18} />
                        </Link>
                        {item.children ? (
                          <div className="mobile-nav-sublinks">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setOpen(false)}
                                aria-current={
                                  pathname === child.href ||
                                  pathname?.startsWith(`${child.href}/`)
                                    ? "page"
                                    : undefined
                                }
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </nav>

                <div className="mobile-nav-footer">
                  <Link
                    className="mobile-primary-cta"
                    href="/contact"
                    onClick={() => setOpen(false)}
                  >
                    Start a Project <ArrowRight size={18} />
                  </Link>
                  <a
                    className="mobile-email-link"
                    href={`mailto:${siteConfig.contact.email}`}
                  >
                    <Mail size={17} /> {siteConfig.contact.email}
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
