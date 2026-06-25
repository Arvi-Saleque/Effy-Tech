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
        description="পুরোনো ওয়েবসাইট থেকে সংগৃহীত প্রাতিষ্ঠানিক ছবিগুলো পরিশীলিত গ্যালারি আকারে সাজানো হয়েছে।"
        breadcrumbs={[{ label: "গ্যালারি" }]}
      />
      <GallerySection compact={false} />
      <NewsEvents />
    </SiteShell>
  );
}
