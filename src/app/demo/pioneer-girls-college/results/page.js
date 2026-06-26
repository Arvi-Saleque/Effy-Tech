import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";
import { resultServices } from "../data/college-data";

export default function ResultsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="পরীক্ষা ও ফলাফল"
        title="রুটিন, ফলাফল, এডমিট কার্ড ও রেজিস্ট্রেশন"
        description="পরীক্ষার রুটিন, ফলাফল, এডমিট কার্ড ও রেজিস্ট্রেশন কার্ড সংক্রান্ত নির্দেশনা নোটিশ বোর্ডের সঙ্গে যুক্ত।"
        breadcrumbs={[{ label: "পরীক্ষা ও ফলাফল" }]}
      />
      <section className="pgc-section">
        <div className="pgc-container pgc-simple-grid">
          {resultServices.map((service) => (
            <article className="pgc-info-card" id={service.id} key={service.id}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
