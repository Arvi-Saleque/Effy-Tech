import { facilities } from "../data/college-data";
import Icon from "./Icon";
import SectionHeader from "./SectionHeader";

export default function CampusFacilities() {
  return (
    <section className="pgc-section pgc-section--soft">
      <div className="pgc-container">
        <SectionHeader
          eyebrow="সুবিধাসমূহ"
          title="শিক্ষার্থীবান্ধব ক্যাম্পাস সুবিধার বিভাগ"
          subtitle="প্রতিটি সুবিধা বিভাগ হিসেবে উপস্থাপিত; বিস্তারিত তথ্য কর্তৃপক্ষ যাচাইয়ের পর যুক্ত করা যাবে।"
        />
        <div className="pgc-facility-grid">
          {facilities.map((facility) => (
            <article className="pgc-facility-card" key={facility.title}>
              <Icon name={facility.icon} />
              <h3>{facility.title}</h3>
              <p>{facility.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
