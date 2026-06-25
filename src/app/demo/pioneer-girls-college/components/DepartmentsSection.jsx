import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { departments, ROUTE_BASE } from "../data/college-data";
import Icon from "./Icon";
import SectionHeader from "./SectionHeader";

export default function DepartmentsSection({ compact = true }) {
  const visibleDepartments = compact ? departments.slice(0, 8) : departments;

  return (
    <section className="pgc-section">
      <div className="pgc-container">
        <SectionHeader
          eyebrow="বিভাগসমূহ"
          title="বিভাগভিত্তিক শিক্ষা ও শিক্ষক তালিকা"
          subtitle="অনার্স ও উচ্চশিক্ষা কার্যক্রমের বিভাগগুলো শিক্ষার্থীদের বিষয়ভিত্তিক পাঠদান, পরামর্শ ও একাডেমিক সহায়তা দেয়।"
          action={
            compact ? { label: "সব বিভাগ দেখুন", href: `${ROUTE_BASE}/departments` } : undefined
          }
        />
        <div className="pgc-department-grid">
          {visibleDepartments.map((department) => (
            <article className="pgc-department-card" key={department.name}>
              <span className="pgc-department-card__icon">
                <Icon name={department.icon} />
              </span>
              <h3>{department.name}</h3>
              <p>{department.description}</p>
              <div>
                <Link href={`${ROUTE_BASE}/teachers`}>শিক্ষকবৃন্দ</Link>
                <Link href={`${ROUTE_BASE}/academic`}>পাঠ্যক্রম</Link>
              </div>
            </article>
          ))}
        </div>
        {compact ? null : (
          <div className="pgc-section-action">
            <Link className="pgc-button pgc-button--primary" href={`${ROUTE_BASE}/academic`}>
              একাডেমিক কার্যক্রম দেখুন
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
