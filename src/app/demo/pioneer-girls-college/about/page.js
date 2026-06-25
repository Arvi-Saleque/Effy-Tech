import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";
import StatisticsSection from "../components/StatisticsSection";
import { institution } from "../data/college-data";

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="কলেজ পরিচিতি"
        title="ঐতিহ্য, নারীশিক্ষা ও দায়িত্বশীল নাগরিকত্ব"
        description={`${institution.nameBn} প্রতিষ্ঠার পর থেকে শিক্ষার্থীদের জ্ঞান, মূল্যবোধ, আত্মবিশ্বাস ও উচ্চশিক্ষার পথে এগিয়ে নিতে কাজ করছে।`}
        breadcrumbs={[{ label: "আমাদের সম্পর্কে" }]}
      />
      <section className="pgc-section">
        <div className="pgc-container pgc-content-grid">
          <article className="pgc-panel">
            <h2>প্রাতিষ্ঠানিক পরিচিতি</h2>
            <p>{institution.identityNote}</p>
            <p>
              এই ডেমো ওয়েবসাইটে কলেজের পরিচিতি, নোটিশ, ভর্তি, পরীক্ষা, ফলাফল,
              বিভাগ, গ্যালারি ও শিক্ষার্থী সেবাকে এমনভাবে সাজানো হয়েছে যাতে ভবিষ্যতে
              প্রশাসনিক প্যানেল বা ডাটাবেজ থেকে তথ্য নিয়ন্ত্রণ করা যায়।
            </p>
            <h2 id="mission">লক্ষ্য ও উদ্দেশ্য</h2>
            <p>
              নারীশিক্ষার প্রসার, মানবিক মূল্যবোধ, একাডেমিক শৃঙ্খলা, সহশিক্ষা
              কার্যক্রম এবং সমাজসচেতন নেতৃত্ব গড়ে তোলাই এই প্রতিষ্ঠানের মূল ভাবনা।
            </p>
          </article>
          <aside className="pgc-side-panel">
            <h2>যাচাইকৃত তথ্য</h2>
            <p>প্রতিষ্ঠা: {institution.established}</p>
            <p>সরকারিকরণ: {institution.governmentized}</p>
            <p>EIIN: {institution.eiin}</p>
            <p>{institution.board}</p>
            <p>{institution.affiliation}</p>
          </aside>
        </div>
      </section>
      <StatisticsSection />
    </SiteShell>
  );
}
