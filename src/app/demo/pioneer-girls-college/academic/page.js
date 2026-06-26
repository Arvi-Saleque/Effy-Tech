import AcademicPrograms from "../components/AcademicPrograms";
import PageHero from "../components/PageHero";
import SiteShell from "../components/SiteShell";
import {
  degreeCourses,
  departments,
  higherSecondary,
  honoursSeats,
  institution,
  libraryInfo,
} from "../data/college-data";

export default function AcademicPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="একাডেমিক"
        title="উচ্চমাধ্যমিক, ডিগ্রি ও অনার্স কার্যক্রম"
        description={`${institution.boardBn} ও ${institution.affiliationBn}-এর অধীনে কলেজের পাঠদান, বিষয় নির্বাচন, আসনসংখ্যা ও লাইব্রেরি সেবা।`}
        breadcrumbs={[{ label: "একাডেমিক" }]}
      />
      <AcademicPrograms />
      <section className="pgc-section" id="higher-secondary">
        <div className="pgc-container pgc-content-grid">
          <article className="pgc-panel">
            <h2>উচ্চমাধ্যমিক আসনসংখ্যা</h2>
            <ResponsiveTable
              headers={["শাখা", "আসন"]}
              rows={higherSecondary.seats.map((item) => [item.group, item.seats])}
            />
            <h2>আবশ্যিক বিষয়</h2>
            <SubjectList items={higherSecondary.compulsorySubjects} />
            <h2>বিষয় নির্বাচন</h2>
            <div className="pgc-academic-subjects">
              {[
                { name: "বিজ্ঞান", subjects: higherSecondary.scienceSubjects },
                { name: "ব্যবসায় শিক্ষা", subjects: higherSecondary.businessSubjects },
                { name: "মানবিক", subjects: higherSecondary.humanitiesSubjects },
              ].map((group) => (
                <div className="pgc-info-card" key={group.name}>
                  <h3>{group.name}</h3>
                  <SubjectList items={group.subjects} />
                </div>
              ))}
            </div>
          </article>
          <aside className="pgc-side-panel">
            <h2>অধিভুক্তি</h2>
            <p>{institution.boardBn}</p>
            <p>{institution.affiliationBn}</p>
            <h2>অনার্স বিভাগসমূহ</h2>
            {departments.map((department) => (
              <p key={department.name}>{department.name}</p>
            ))}
          </aside>
        </div>
      </section>
      <section className="pgc-section pgc-section--soft" id="degree">
        <div className="pgc-container">
          <div className="pgc-section-header">
            <div>
              <span className="pgc-eyebrow">ডিগ্রি</span>
              <h2>ডিগ্রি পাস কোর্স</h2>
              <p>জাতীয় বিশ্ববিদ্যালয়ের অধীনে পরিচালিত স্নাতক পাস কোর্সসমূহ।</p>
            </div>
          </div>
          <div className="pgc-simple-grid">
            {degreeCourses.map((course) => (
              <article className="pgc-info-card" key={course.course}>
                <h3>{course.course}</h3>
                <p>অধিভুক্তির তারিখ: {course.affiliatedAt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="pgc-section" id="honours">
        <div className="pgc-container">
          <div className="pgc-section-header">
            <div>
              <span className="pgc-eyebrow">অনার্স</span>
              <h2>অনার্স আসনসংখ্যা</h2>
              <p>বিভাগভিত্তিক আসনসংখ্যা শিক্ষার্থীদের বিষয় নির্বাচন ও ভর্তি পরিকল্পনায় সহায়তা করে।</p>
            </div>
          </div>
          <ResponsiveTable
            headers={["বিভাগ", "আসন"]}
            rows={honoursSeats.map((item) => [item.department, item.seats])}
          />
        </div>
      </section>
      <section className="pgc-section pgc-section--soft" id="library">
        <div className="pgc-container pgc-content-grid">
          <article className="pgc-panel">
            <h2>লাইব্রেরি</h2>
            <p>
              কলেজ লাইব্রেরি একাডেমিক বই, সাধারণ বই, দৈনিক পত্রিকা এবং রেফারেন্স
              ব্যবহারের মাধ্যমে শিক্ষার্থীদের পাঠাভ্যাসে সহায়তা করে।
            </p>
            <ul className="pgc-library-list">
              {libraryInfo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <aside className="pgc-side-panel">
            <h2>ব্যবহারের নিয়ম</h2>
            <p>লাইব্রেরি কার্ড সংগ্রহ, বই ধার, বই ফেরত এবং হারানো বইয়ের নিয়ম কলেজের প্রচলিত বিধি অনুযায়ী প্রযোজ্য।</p>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}

function SubjectList({ items }) {
  return (
    <ul className="pgc-check-list">
      {items.map((item) => (
        <li key={typeof item === "string" ? item : item.subject}>
          {typeof item === "string" ? item : `${item.subject} (${item.code})`}
        </li>
      ))}
    </ul>
  );
}

function ResponsiveTable({ headers, rows }) {
  return (
    <div className="pgc-table-wrap">
      <table className="pgc-data-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell) => (
                <td key={cell}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
