"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, BellRing, X } from "lucide-react";
import { ROUTE_BASE, urgentNotices } from "../data/college-data";

export default function EmergencyNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <aside className={open ? "pgc-sticky-announcement is-open" : "pgc-sticky-announcement"}>
      <button
        className="pgc-sticky-announcement__trigger"
        type="button"
        aria-label={open ? "জরুরি নোটিশ বন্ধ করুন" : "জরুরি নোটিশ খুলুন"}
        aria-expanded={open}
        aria-controls="pgc-sticky-announcement-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <BellRing size={19} aria-hidden="true" />
        <span>জরুরি নোটিশ</span>
      </button>

      <div
        className="pgc-sticky-announcement__panel"
        id="pgc-sticky-announcement-panel"
        aria-hidden={!open}
      >
        <div className="pgc-sticky-announcement__head">
          <span>
            <AlertTriangle size={18} aria-hidden="true" /> জরুরি নোটিশ
          </span>
          <button type="button" onClick={() => setOpen(false)} aria-label="জরুরি নোটিশ বন্ধ করুন">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="pgc-sticky-announcement__list">
          {urgentNotices.map((notice) => (
            <Link
              href={notice.href}
              key={`${notice.category}-${notice.title}`}
              onClick={() => setOpen(false)}
            >
              <span>{notice.category}</span>
              <strong>{notice.title}</strong>
              <time>{notice.date}</time>
            </Link>
          ))}
        </div>
        <Link
          className="pgc-sticky-announcement__all"
          href={`${ROUTE_BASE}/notices`}
          onClick={() => setOpen(false)}
        >
          সব নোটিশ দেখুন
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
