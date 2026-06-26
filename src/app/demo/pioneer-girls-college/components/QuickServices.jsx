import { quickServices } from "../data/college-data";
import ServiceCard from "./ServiceCard";

export default function QuickServices() {
  return (
    <section className="pgc-quick-services" aria-label="দ্রুত সেবা">
      <div className="pgc-container">
        <div className="pgc-service-grid">
          {quickServices.map((service) => (
            <ServiceCard service={service} key={service.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
