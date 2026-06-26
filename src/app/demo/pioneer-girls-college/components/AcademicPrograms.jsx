import { academicPrograms, ROUTE_BASE } from "../data/college-data";
import ProgramCard from "./ProgramCard";
import SectionHeader from "./SectionHeader";

export default function AcademicPrograms() {
  return (
    <section className="pgc-section pgc-section--soft" id="academic-programs">
      <div className="pgc-container">
        <SectionHeader
          eyebrow="একাডেমিক"
          title="পর্যায়ভিত্তিক শিক্ষা কার্যক্রম"
          subtitle="উচ্চমাধ্যমিক, ডিগ্রি ও অনার্স পর্যায়ে বোর্ড ও জাতীয় বিশ্ববিদ্যালয়ের অধিভুক্ত পাঠ্যক্রম অনুসারে শিক্ষা কার্যক্রম পরিচালিত হয়।"
          action={{ label: "একাডেমিক পেজ", href: `${ROUTE_BASE}/academic` }}
        />
        <div className="pgc-program-grid">
          {academicPrograms.map((program) => (
            <ProgramCard program={program} key={program.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
