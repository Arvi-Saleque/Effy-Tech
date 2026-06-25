import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";
import TeacherDirectory from "../components/TeacherDirectory";
import { teachers } from "../data/college-data";

export default function TeachersPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="শিক্ষক ও কর্মচারী"
        title="শিক্ষকবৃন্দ"
        description="কলেজের পুরোনো অফিসিয়াল ওয়েবসাইটে প্রকাশিত শিক্ষক তালিকা থেকে নাম, পদবি ও বিভাগভিত্তিক ডিরেক্টরি। ব্যক্তিগত ফোন বা ই-মেইল প্রকাশ করা হয়নি।"
        breadcrumbs={[{ label: "শিক্ষক ও কর্মচারী" }]}
      />
      <TeacherDirectory teachers={teachers} />
    </SiteShell>
  );
}
