import PrincipalMessage from "../components/PrincipalMessage";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";

export default function PrincipalMessagePage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="অধ্যক্ষের বাণী"
        title="শিক্ষার্থীদের আত্মবিশ্বাস ও মূল্যবোধে আলোকিত করার অঙ্গীকার"
        description="বর্তমান অধ্যক্ষের নাম যাচাই না হওয়ায় এই ডেমোতে ব্যক্তিগত নাম ব্যবহার করা হয়নি।"
        breadcrumbs={[{ label: "অধ্যক্ষের বাণী" }]}
      />
      <section className="pgc-section">
        <div className="pgc-container">
          <PrincipalMessage />
        </div>
      </section>
    </SiteShell>
  );
}
