import { quickServices } from "../data/college-data";
import SectionHeader from "./SectionHeader";
import ServiceCard from "./ServiceCard";

export default function QuickServices() {
  return (
    <section className="pgc-section pgc-section--soft">
      <div className="pgc-container">
        <SectionHeader
          eyebrow="দ্রুত সেবা"
          title="শিক্ষার্থী ও অভিভাবকদের প্রয়োজনীয় সেবা"
          subtitle="ভর্তি, ফলাফল, রুটিন, রেজিস্ট্রেশন ও শিক্ষার্থী সেবা এক জায়গায় সাজানো হয়েছে।"
        />
        <div className="pgc-service-grid">
          {quickServices.map((service) => (
            <ServiceCard service={service} key={service.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
