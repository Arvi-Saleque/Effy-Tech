import NoticeBoard from "../components/NoticeBoard";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";

export default function NoticesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="নোটিশ"
        title="নোটিশ বোর্ড ও ঘোষণাসমূহ"
        description="পুরোনো অফিসিয়াল ওয়েবসাইটের প্রকাশিত নোটিশ শিরোনাম ও তারিখ থেকে সাজানো সাম্প্রতিক ঘোষণা।"
        breadcrumbs={[{ label: "নোটিশ" }]}
      />
      <NoticeBoard />
    </SiteShell>
  );
}
