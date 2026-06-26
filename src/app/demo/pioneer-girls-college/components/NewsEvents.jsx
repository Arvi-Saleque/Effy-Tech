import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { newsEvents, ROUTE_BASE } from "../data/college-data";
import SectionHeader from "./SectionHeader";

export default function NewsEvents() {
  return (
    <section className="pgc-section">
      <div className="pgc-container">
        <SectionHeader
          eyebrow="খবর ও আয়োজন"
          title="ক্যাম্পাস কার্যক্রম ও শিক্ষার্থী অংশগ্রহণ"
          subtitle="সাংস্কৃতিক আয়োজন, পরিবেশ কার্যক্রম ও শিক্ষার্থী অংশগ্রহণের উল্লেখযোগ্য মুহূর্ত।"
        />
        <div className="pgc-news-grid">
          {newsEvents.map((event) => (
            <article className="pgc-news-card" key={event.title}>
              <Image
                src={event.image}
                alt={event.title}
                width={640}
                height={360}
                sizes="(max-width: 760px) 100vw, 33vw"
              />
              <div>
                <span className="pgc-category pgc-category--event">{event.category}</span>
                <time>{event.date}</time>
                <h3>{event.title}</h3>
                <p>{event.summary}</p>
                <Link href={`${ROUTE_BASE}/gallery`}>
                  বিস্তারিত
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
