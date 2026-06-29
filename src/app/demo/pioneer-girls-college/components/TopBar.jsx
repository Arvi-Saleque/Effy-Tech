import { institution } from "../data/college-data";

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
      </div>
    </div>
  );
}
