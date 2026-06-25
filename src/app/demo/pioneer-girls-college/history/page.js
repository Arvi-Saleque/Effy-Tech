import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";
import { historyTimeline } from "../data/college-data";

export default function HistoryPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="ইতিহাস"
        title="১৯৬৯ থেকে আজকের প্রাতিষ্ঠানিক পথচলা"
        description="নারীশিক্ষার প্রসার, সরকারি প্রতিষ্ঠানে রূপান্তর এবং উচ্চশিক্ষার ধারাবাহিকতায় কলেজের পথচলার গুরুত্বপূর্ণ অধ্যায়।"
        breadcrumbs={[{ label: "ইতিহাস" }]}
      />
      <section className="pgc-section">
        <div className="pgc-container">
          <div className="pgc-timeline">
            {historyTimeline.map((item) => (
              <article className="pgc-timeline__item" key={`${item.year}-${item.title}`}>
                <span>{item.year}</span>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
