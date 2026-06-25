import { institutionalFacts } from "../data/college-data";
import Icon from "./Icon";

export default function StatisticsSection() {
  return (
    <section className="pgc-facts" aria-label="প্রাতিষ্ঠানিক তথ্য">
      <div className="pgc-container pgc-facts__grid">
        {institutionalFacts.map((fact) => (
          <div className="pgc-fact-card" key={fact.label}>
            <Icon name={fact.icon} size={24} />
            <span>{fact.label}</span>
            <strong>{fact.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
