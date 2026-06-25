import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";
import { institution } from "../data/college-data";

export default function HistoryPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="ইতিহাস"
        title="১৯৬৯ থেকে আজকের প্রাতিষ্ঠানিক পথচলা"
        description="এই অংশে যাচাইকৃত ঐতিহাসিক তথ্যকে সংক্ষিপ্ত ও মর্যাদাপূর্ণভাবে উপস্থাপন করা হয়েছে।"
        breadcrumbs={[{ label: "ইতিহাস" }]}
      />
      <section className="pgc-section">
        <div className="pgc-container pgc-simple-grid">
          <article className="pgc-info-card">
            <h3>প্রতিষ্ঠা</h3>
            <p>{institution.established} সালে নারীশিক্ষার উদ্দেশ্যে প্রতিষ্ঠানের যাত্রা শুরু।</p>
          </article>
          <article className="pgc-info-card">
            <h3>সরকারিকরণ</h3>
            <p>{institution.governmentized} সালে সরকারিকরণের মাধ্যমে প্রতিষ্ঠানটি নতুন প্রাতিষ্ঠানিক কাঠামো পায়।</p>
          </article>
          <article className="pgc-info-card">
            <h3>অধিভুক্তি</h3>
            <p>{institution.boardBn} ও {institution.affiliationBn}-এর একাডেমিক কাঠামো অনুসরণ।</p>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
