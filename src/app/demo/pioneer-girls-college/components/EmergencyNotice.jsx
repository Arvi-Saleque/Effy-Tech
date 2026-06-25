import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { ROUTE_BASE, urgentNotices } from "../data/college-data";

export default function EmergencyNotice() {
  return (
    <section className="pgc-urgent" aria-label="জরুরি নোটিশ">
      <div className="pgc-container pgc-urgent__inner">
        <div className="pgc-urgent__label">
          <AlertTriangle size={18} aria-hidden="true" />
          জরুরি নোটিশ
        </div>
        <div className="pgc-urgent__items">
          {urgentNotices.map((notice) => (
            <Link href={notice.href} key={`${notice.category}-${notice.title}`}>
              <span>{notice.category}</span>
              <strong>{notice.title}</strong>
              <time>{notice.date}</time>
            </Link>
          ))}
        </div>
        <Link className="pgc-urgent__all" href={`${ROUTE_BASE}/notices`}>
          সব নোটিশ
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
