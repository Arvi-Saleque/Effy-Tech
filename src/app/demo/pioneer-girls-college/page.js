import AboutSection from "./components/AboutSection";
import AcademicPrograms from "./components/AcademicPrograms";
import CampusFacilities from "./components/CampusFacilities";
import ContactSection from "./components/ContactSection";
import DepartmentsSection from "./components/DepartmentsSection";
import GallerySection from "./components/GallerySection";
import HeroSection from "./components/HeroSection";
import ImportantLinks from "./components/ImportantLinks";
import NewsEvents from "./components/NewsEvents";
import NoticeBoard from "./components/NoticeBoard";
import QuickServices from "./components/QuickServices";
import SiteShell from "./components/SiteShell";
import StatisticsSection from "./components/StatisticsSection";

export default function PioneerGirlsCollegeHome() {
  return (
    <SiteShell>
      <HeroSection />
      <QuickServices />
      <NoticeBoard compact />
      <AboutSection />
      <AcademicPrograms />
      <DepartmentsSection />
      <StatisticsSection />
      <CampusFacilities />
      <NewsEvents />
      <GallerySection />
      <ImportantLinks />
      <ContactSection />
    </SiteShell>
  );
}
