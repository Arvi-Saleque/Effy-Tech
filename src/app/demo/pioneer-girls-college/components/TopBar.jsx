import { Building2, CreditCard, GraduationCap, LogIn } from "lucide-react";
import { institution, studentPayLinks } from "../data/college-data";

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
          <a href={studentPayLinks.login} target="_blank" rel="noopener noreferrer">
            <LogIn size={14} aria-hidden="true" /> শিক্ষার্থী লগইন
          </a>
          <a href={studentPayLinks.applyFees} target="_blank" rel="noopener noreferrer">
            <CreditCard size={14} aria-hidden="true" /> প্রাথমিক আবেদন ফি
          </a>
          <a
            className="pgc-topbar__primary"
            href={studentPayLinks.onlineAdmission}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GraduationCap size={14} aria-hidden="true" /> অনলাইন ভর্তি
          </a>
          <span className="pgc-topbar__board">
            <Building2 size={14} aria-hidden="true" /> সরকারি কলেজ
          </span>
        </div>
      </div>
    </div>
  );
}
