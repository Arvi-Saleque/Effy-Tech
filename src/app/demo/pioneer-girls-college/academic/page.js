import AcademicPrograms from "../components/AcademicPrograms";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";
import { departments } from "../data/college-data";

export default function AcademicPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="একাডেমিক"
        title="উচ্চমাধ্যমিক, ডিগ্রি ও অনার্স কার্যক্রম"
        description="যশোর শিক্ষা বোর্ড ও জাতীয় বিশ্ববিদ্যালয়ের কাঠামোর সঙ্গে সামঞ্জস্য রেখে একাডেমিক তথ্য সাজানো হয়েছে।"
        breadcrumbs={[{ label: "একাডেমিক" }]}
      />
      <AcademicPrograms />
      <section className="pgc-section" id="curriculum">
        <div className="pgc-container pgc-content-grid">
          <article className="pgc-panel">
            <h2 id="calendar">একাডেমিক ক্যালেন্ডার</h2>
            <p>
              ভর্তি, ক্লাস, পরীক্ষা, ফলাফল ও ছুটির সময়সূচি পরবর্তীতে কর্তৃপক্ষের
              যাচাই অনুযায়ী ক্যালেন্ডার আকারে যুক্ত করা যাবে।
            </p>
            <h2>পাঠ্যক্রম</h2>
            <p>
              উচ্চমাধ্যমিক পর্যায়ে বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা; অনার্স পর্যায়ে
              বিভাগভিত্তিক পাঠক্রম প্রদর্শনের জন্য এই অংশ প্রস্তুত।
            </p>
          </article>
          <aside className="pgc-side-panel">
            <h2>অনার্স বিভাগসমূহ</h2>
            {departments.map((department) => (
              <p key={department.name}>{department.name}</p>
            ))}
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
