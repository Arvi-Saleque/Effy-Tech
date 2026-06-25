import NoticeBoard from "../components/NoticeBoard";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";

export default function NoticesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="নোটিশ"
        title="নোটিশ বোর্ড ও ঘোষণাসমূহ"
        description="কলেজের সাম্প্রতিক নোটিশ, পরীক্ষার নির্দেশনা, ফলাফল, বৃত্তি ও অনুষ্ঠানসংক্রান্ত ঘোষণা।"
        breadcrumbs={[{ label: "নোটিশ" }]}
      />
      <NoticeBoard />
    </SiteShell>
  );
}
