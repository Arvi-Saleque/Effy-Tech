import GallerySection from "../components/GallerySection";
import NewsEvents from "../components/NewsEvents";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";

export default function GalleryPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="গ্যালারি"
        title="ক্যাম্পাস, অনুষ্ঠান ও শিক্ষার্থী কার্যক্রম"
        description="কলেজের ক্যাম্পাস, অনুষ্ঠান, সবুজায়ন ও শিক্ষার্থী কার্যক্রমের নির্বাচিত প্রাতিষ্ঠানিক ছবি।"
        breadcrumbs={[{ label: "গ্যালারি" }]}
      />
      <GallerySection compact={false} />
      <NewsEvents />
    </SiteShell>
  );
}
