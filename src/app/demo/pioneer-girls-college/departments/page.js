import DepartmentsSection from "../components/DepartmentsSection";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";

export default function DepartmentsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="বিভাগসমূহ"
        title="অনার্স ও একাডেমিক বিভাগের তথ্য কাঠামো"
        description="বিভাগভিত্তিক শিক্ষক, নোটিশ ও পাঠক্রম ভবিষ্যতে একই ডেটা কাঠামোতে যুক্ত করা যাবে।"
        breadcrumbs={[{ label: "বিভাগসমূহ" }]}
      />
      <DepartmentsSection compact={false} />
    </SiteShell>
  );
}
