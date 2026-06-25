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
          title="বিভাগভিত্তিক শিক্ষা ও নোটিশ কাঠামো"
          subtitle="প্রতিটি বিভাগ ভবিষ্যতে শিক্ষক তালিকা, বিভাগীয় নোটিশ ও পাঠক্রম তথ্যের সঙ্গে যুক্ত করা যাবে।"
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
                <Link href={`${ROUTE_BASE}/notices`}>বিভাগীয় নোটিশ</Link>
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
