import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";
import { resultServices } from "../data/college-data";

export default function ResultsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="পরীক্ষা ও ফলাফল"
        title="রুটিন, ফলাফল, এডমিট কার্ড ও রেজিস্ট্রেশন"
        description="পরীক্ষা-সম্পর্কিত সেবাগুলোকে আলাদা মডিউল হিসেবে সাজানো হয়েছে।"
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
