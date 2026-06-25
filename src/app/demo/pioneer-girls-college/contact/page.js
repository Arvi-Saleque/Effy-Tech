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
        description="কলেজ অফিসের ঠিকানা, ফোন, ই-মেইল, সরকারি লিংক এবং Google Maps অবস্থান।"
        breadcrumbs={[{ label: "যোগাযোগ" }]}
      />
      <ContactSection />
      <ImportantLinks />
    </SiteShell>
  );
}
