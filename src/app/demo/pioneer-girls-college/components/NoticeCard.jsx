import Link from "next/link";
import { AlertCircle, ArrowRight, FileText } from "lucide-react";
import { ROUTE_BASE } from "../data/college-data";

export default function NoticeCard({ notice }) {
  return (
    <article className={notice.urgent ? "pgc-notice-card is-urgent" : "pgc-notice-card"}>
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
          <dd>{notice.date}</dd>
        </div>
        {notice.deadline ? (
          <div>
            <dt>শেষ তারিখ</dt>
            <dd>{notice.deadline}</dd>
          </div>
        ) : null}
      </dl>
      <div className="pgc-notice-card__footer">
        {notice.attachment ? (
          <span>
            <FileText size={15} aria-hidden="true" /> সংযুক্তি
          </span>
        ) : (
          <span>বিস্তারিত দেখুন</span>
        )}
        <Link href={`${ROUTE_BASE}/notices#${notice.id}`}>
          বিস্তারিত
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
