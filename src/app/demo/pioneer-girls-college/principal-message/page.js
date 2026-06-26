import { principal } from "../data/college-data";
import PrincipalMessage from "../components/PrincipalMessage";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";

export default function PrincipalMessagePage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="অধ্যক্ষের বাণী"
        title="শিক্ষার্থীদের আত্মবিশ্বাস ও মূল্যবোধে আলোকিত করার অঙ্গীকার"
        description={`${principal.name}, ${principal.designation}, ${principal.subject} - কলেজের একাডেমিক শৃঙ্খলা, মানবিক মূল্যবোধ ও নারীশিক্ষার অগ্রযাত্রায় নেতৃত্ব দিচ্ছেন।`}
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
