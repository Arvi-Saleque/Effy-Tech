import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { ROUTE_BASE, urgentNotices } from "../data/college-data";

export default function EmergencyNotice() {
  const tickerItems = [...urgentNotices, ...urgentNotices];

  return (
    <section className="pgc-announcement-ticker" aria-label="জরুরি নোটিশ">
      <div className="pgc-announcement-ticker__label">
        <AlertTriangle size={16} aria-hidden="true" />
        <span>জরুরি নোটিশ</span>
      </div>
      <div className="pgc-announcement-ticker__viewport">
        <div className="pgc-announcement-ticker__track">
          {tickerItems.map((notice, index) => (
            <Link href={`${ROUTE_BASE}/notices#${notice.id}`} key={`${notice.title}-${index}`}>
              <strong>{notice.category}</strong>
              <span>{notice.title}</span>
              <time>{notice.publishedAt}</time>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
