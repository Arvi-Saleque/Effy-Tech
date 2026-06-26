import DepartmentsSection from "../components/DepartmentsSection";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";

export default function DepartmentsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="বিভাগসমূহ"
        title="অনার্স ও একাডেমিক বিভাগসমূহ"
        description="বিভাগভিত্তিক পাঠদান, শিক্ষকবৃন্দ এবং একাডেমিক সহায়তার সংক্ষিপ্ত পরিচিতি।"
        breadcrumbs={[{ label: "বিভাগসমূহ" }]}
      />
      <DepartmentsSection compact={false} />
    </SiteShell>
  );
}
