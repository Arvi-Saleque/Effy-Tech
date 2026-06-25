"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { noticeCategories, notices, ROUTE_BASE } from "../data/college-data";
import NoticeCard from "./NoticeCard";
import SectionHeader from "./SectionHeader";

export default function NoticeBoard({ compact = false }) {
  const [activeCategory, setActiveCategory] = useState("সকল");
  const filteredNotices = useMemo(
    () =>
      activeCategory === "সকল"
        ? notices
        : notices.filter((notice) => notice.category === activeCategory),
    [activeCategory],
  );
  const visibleNotices = compact ? filteredNotices.slice(0, 6) : filteredNotices;

  return (
    <section className="pgc-section" id="notice-board">
      <div className="pgc-container">
        <SectionHeader
          eyebrow="নোটিশ বোর্ড"
          title="সাম্প্রতিক ঘোষণা ও নির্দেশনা"
          subtitle="এটি একটি ডেমো নোটিশ বোর্ড। বাস্তব নোটিশ যুক্ত হলে একই কাঠামোতে বিভাগ, তারিখ ও সংযুক্তি দেখানো যাবে।"
          action={
            compact
              ? { label: "সব নোটিশ দেখুন", href: `${ROUTE_BASE}/notices` }
              : undefined
          }
        />
        <div className="pgc-filter-tabs" role="tablist" aria-label="নোটিশ ফিল্টার">
          {noticeCategories.map((category) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              className={activeCategory === category ? "is-active" : undefined}
              key={category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="pgc-notice-grid">
          {visibleNotices.map((notice) => (
            <NoticeCard notice={notice} key={notice.id} />
          ))}
        </div>
        {!compact ? null : (
          <div className="pgc-section-action">
            <Link className="pgc-button pgc-button--primary" href={`${ROUTE_BASE}/notices`}>
              সব নোটিশ দেখুন
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
