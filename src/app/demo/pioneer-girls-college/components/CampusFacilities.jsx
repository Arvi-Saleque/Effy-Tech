import Link from "next/link";
import { facilities } from "../data/college-data";
import Icon from "./Icon";
import SectionHeader from "./SectionHeader";

export default function CampusFacilities() {
  return (
    <section className="pgc-section pgc-section--soft">
      <div className="pgc-container">
        <SectionHeader
          eyebrow="সুবিধাসমূহ"
          title="শিক্ষার্থীবান্ধব ক্যাম্পাস সুবিধা"
          subtitle="পাঠদান, পাঠাগার, ব্যবহারিক শিক্ষা, সহশিক্ষা ও নিরাপদ পরিবেশ শিক্ষার্থীদের দৈনন্দিন শিক্ষাজীবনকে সহায়ক করে।"
        />
        <div className="pgc-facility-grid">
          {facilities.map((facility) => (
            <article className="pgc-facility-card" key={facility.title}>
              <Icon name={facility.icon} />
              <h3>{facility.title}</h3>
              <p>{facility.description}</p>
              {facility.href ? <Link className="pgc-text-link" href={facility.href}>বিস্তারিত দেখুন</Link> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
