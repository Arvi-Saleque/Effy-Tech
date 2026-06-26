import HeroSection from "./components/HeroSection";
import HomeDashboardSections from "./components/HomeDashboardSections";
import QuickServices from "./components/QuickServices";
import SiteShell from "./components/SiteShell";

export default function PioneerGirlsCollegeHome() {
  return (
    <SiteShell>
      <HeroSection />
      <QuickServices />
      <HomeDashboardSections />
    </SiteShell>
  );
}
