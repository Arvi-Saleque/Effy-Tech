import NoticeBoard from "../components/NoticeBoard";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";

export default function NoticesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="নোটিশ"
        title="নোটিশ বোর্ড ও ঘোষণাসমূহ"
        description="ডেমো নোটিশগুলো অফিসিয়াল বর্তমান নোটিশ হিসেবে দাবি করা হয়নি; বাস্তব নোটিশ যুক্ত হলে একই কাঠামো ব্যবহার করা যাবে।"
        breadcrumbs={[{ label: "নোটিশ" }]}
      />
      <NoticeBoard />
    </SiteShell>
  );
}
