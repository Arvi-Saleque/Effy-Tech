import ContactSection from "../components/ContactSection";
import ImportantLinks from "../components/ImportantLinks";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="যোগাযোগ"
        title="কলেজ অফিস, সরকারি লিংক ও অবস্থান"
        description="নির্ভুল যোগাযোগ তথ্য যাচাইয়ের আগে ফোন, ই-মেইল ও ম্যাপকে হালনাগাদযোগ্য হিসেবে রাখা হয়েছে।"
        breadcrumbs={[{ label: "যোগাযোগ" }]}
      />
      <ContactSection />
      <ImportantLinks />
    </SiteShell>
  );
}
