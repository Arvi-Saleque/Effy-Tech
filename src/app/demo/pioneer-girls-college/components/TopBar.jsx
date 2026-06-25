import Link from "next/link";
import { Building2, Globe2, GraduationCap, LogIn } from "lucide-react";
import { institution, ROUTE_BASE } from "../data/college-data";

export default function TopBar() {
  return (
    <div className="pgc-topbar">
      <div className="pgc-container pgc-topbar__inner">
        <div className="pgc-topbar__facts" aria-label="প্রতিষ্ঠানের মূল তথ্য">
          <span>প্রতিষ্ঠাকাল: {institution.established}</span>
          <span>EIIN: {institution.eiin}</span>
          <span>{institution.boardBn}</span>
          <span>{institution.affiliationBn}</span>
        </div>
        <div className="pgc-topbar__actions">
          <span className="pgc-lang">
            <Globe2 size={14} aria-hidden="true" /> বাংলা / English
          </span>
          <Link href={`${ROUTE_BASE}/admission#student-services`}>
            <LogIn size={14} aria-hidden="true" /> শিক্ষার্থী লগইন
          </Link>
          <Link className="pgc-topbar__primary" href={`${ROUTE_BASE}/admission`}>
            <GraduationCap size={14} aria-hidden="true" /> অনলাইন ভর্তি
          </Link>
          <span className="pgc-topbar__board">
            <Building2 size={14} aria-hidden="true" /> সরকারি কলেজ
          </span>
        </div>
      </div>
    </div>
  );
}
