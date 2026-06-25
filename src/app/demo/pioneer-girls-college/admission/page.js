import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";
import { admissionSteps, ROUTE_BASE } from "../data/college-data";

export default function AdmissionPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="ভর্তি"
        title="ভর্তি নির্দেশনা ও শিক্ষার্থী সেবা"
        description="অনলাইন ভর্তি, ফি নির্দেশনা, প্রয়োজনীয় কাগজপত্র ও শিক্ষার্থী লগইন সেবার জন্য ডেমো কাঠামো।"
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
              আসল আবেদন লিংক, ফি, সময়সীমা ও নীতিমালা কলেজ কর্তৃপক্ষের যাচাই অনুযায়ী
              যুক্ত করা হবে। এই পেজে কোনো সক্রিয় পেমেন্ট URL ব্যবহার করা হয়নি।
            </p>
            <Link className="pgc-button pgc-button--primary" href={`${ROUTE_BASE}/notices`}>
              ভর্তি নোটিশ দেখুন
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </article>
          <aside className="pgc-side-panel" id="student-services">
            <h2>শিক্ষার্থী সেবা</h2>
            <p>শিক্ষার্থী লগইন, রেজিস্ট্রেশন, এডমিট কার্ড ও ফলাফল সেবার ডেমো প্রবেশপথ।</p>
            <h2 id="fees">ফি প্রদান</h2>
            <p>পেমেন্ট গেটওয়ে যাচাই না হওয়ায় এখানে নিরাপদ ডেমো নির্দেশনা রাখা হয়েছে।</p>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
