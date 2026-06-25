"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { navItems } from "../data/college-data";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      panelRef.current?.querySelector("a, button, summary")?.focus();
    }
  }, [open]);

  return (
    <div className="pgc-mobile-nav">
      <button
        className="pgc-menu-button"
        type="button"
        aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
        aria-expanded={open}
        aria-controls="pgc-mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {open ? (
        <>
          <button
            className="pgc-menu-overlay"
            type="button"
            aria-label="মেনুর বাইরে ক্লিক করে বন্ধ করুন"
            onClick={() => setOpen(false)}
          />
          <aside
            className="pgc-mobile-panel"
            id="pgc-mobile-menu"
            ref={panelRef}
            aria-label="মোবাইল মেনু"
          >
            <div className="pgc-mobile-panel__head">
              <span>মেনু</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="মেনু বন্ধ করুন">
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="pgc-mobile-panel__links">
              {navItems.map((item) =>
                item.children ? (
                  <details key={item.label} className="pgc-mobile-group">
                    <summary>
                      {item.label}
                      <ChevronDown size={16} aria-hidden="true" />
                    </summary>
                    <Link href={item.href} onClick={() => setOpen(false)}>
                      {item.label} দেখুন
                    </Link>
                    {item.children.map((child) => (
                      <Link href={child.href} key={child.href} onClick={() => setOpen(false)}>
                        {child.label}
                      </Link>
                    ))}
                  </details>
                ) : (
                  <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </aside>
        </>
      ) : null}
    </div>
  );
}
