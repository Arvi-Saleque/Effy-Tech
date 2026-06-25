import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";
import { admissionSteps, ROUTE_BASE, studentPayLinks } from "../data/college-data";

export default function AdmissionPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="ভর্তি"
        title="ভর্তি নির্দেশনা ও শিক্ষার্থী সেবা"
        description="ভর্তি বিজ্ঞপ্তি, প্রয়োজনীয় কাগজপত্র, অনলাইন আবেদন, আবেদন ফি এবং শিক্ষার্থী সেবার গুরুত্বপূর্ণ প্রবেশপথ।"
        breadcrumbs={[{ label: "ভর্তি" }]}
      />
      <section className="pgc-section">
        <div className="pgc-container pgc-content-grid">
          <article className="pgc-panel">
            <h2>ভর্তি প্রক্রিয়া</h2>
            <ul className="pgc-check-list">
              {admissionSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            <p>
              ভর্তি সংক্রান্ত সময়সীমা, যোগ্যতা ও বিস্তারিত নির্দেশনা নোটিশ বোর্ডে
              প্রকাশিত হলে শিক্ষার্থীরা তা অনুসরণ করবে।
            </p>
            <a className="pgc-button pgc-button--primary" href={studentPayLinks.onlineAdmission} target="_blank" rel="noopener noreferrer">
              অনলাইন ভর্তি আবেদন
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <Link className="pgc-button pgc-button--light" href={`${ROUTE_BASE}/notices`}>
              ভর্তি নোটিশ দেখুন
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </article>
          <aside className="pgc-side-panel" id="student-services">
            <h2>শিক্ষার্থী সেবা</h2>
            <p>
              StudentPay সেবার মাধ্যমে শিক্ষার্থী লগইন, অনলাইন ভর্তি ও প্রাথমিক
              আবেদন ফি সংক্রান্ত প্রবেশপথ পাওয়া যায়।
            </p>
            <p>
              <a className="pgc-text-link" href={studentPayLinks.login} target="_blank" rel="noopener noreferrer">
                শিক্ষার্থী লগইন <ArrowRight size={15} aria-hidden="true" />
              </a>
            </p>
            <h2 id="fees">ফি প্রদান</h2>
            <p>
              <a className="pgc-text-link" href={studentPayLinks.applyFees} target="_blank" rel="noopener noreferrer">
                প্রাথমিক আবেদন ফি প্রদান <ArrowRight size={15} aria-hidden="true" />
              </a>
            </p>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
