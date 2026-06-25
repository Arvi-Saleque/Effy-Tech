import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";
import { teacherGroups } from "../data/college-data";

export default function TeachersPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="শিক্ষক ও কর্মচারী"
        title="শিক্ষক, প্রশাসন ও শিক্ষার্থী সহায়তা কাঠামো"
        description="ব্যক্তিগত নাম ও যোগাযোগ তথ্য যাচাই না হওয়ায় এই ডেমোতে দলভিত্তিক তথ্য কাঠামো দেখানো হয়েছে।"
        breadcrumbs={[{ label: "শিক্ষক ও কর্মচারী" }]}
      />
      <section className="pgc-section">
        <div className="pgc-container pgc-simple-grid">
          {teacherGroups.map((group) => (
            <article className="pgc-info-card" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <p>
                <strong>{group.status}</strong>
              </p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
