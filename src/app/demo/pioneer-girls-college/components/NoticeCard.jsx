import Link from "next/link";
import { AlertCircle, ArrowRight, ExternalLink, FileText } from "lucide-react";
import { ROUTE_BASE } from "../data/college-data";

export default function NoticeCard({ notice }) {
  const actionUrl = notice.attachmentUrl || notice.sourceUrl || `${ROUTE_BASE}/notices#${notice.id}`;
  const isExternal = actionUrl.startsWith("http");

  return (
    <article
      className={notice.urgent ? "pgc-notice-card is-urgent" : "pgc-notice-card"}
      id={notice.id}
    >
      <div className="pgc-notice-card__meta">
        <span className={`pgc-category pgc-category--${categoryClass(notice.category)}`}>
          {notice.category}
        </span>
        {notice.urgent ? (
          <span className="pgc-urgent-badge">
            <AlertCircle size={14} aria-hidden="true" /> জরুরি
          </span>
        ) : null}
      </div>
      <h3>{notice.title}</h3>
      <dl>
        <div>
          <dt>প্রকাশ</dt>
          <dd>{notice.publishedAt}</dd>
        </div>
      </dl>
      <div className="pgc-notice-card__footer">
        {notice.attachmentUrl ? (
          <span>
            <FileText size={15} aria-hidden="true" /> সংযুক্তি
          </span>
        ) : (
          <span>
            <ExternalLink size={15} aria-hidden="true" /> পুরোনো ওয়েবসাইটে দেখুন
          </span>
        )}
        <Link
          href={actionUrl}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {notice.attachmentUrl ? "ডাউনলোড" : "দেখুন"}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function categoryClass(category) {
  const map = {
    ভর্তি: "admission",
    পরীক্ষা: "exam",
    ফলাফল: "result",
    বৃত্তি: "scholarship",
    প্রশাসনিক: "admin",
    অনুষ্ঠান: "event",
  };

  return map[category] || "all";
}
