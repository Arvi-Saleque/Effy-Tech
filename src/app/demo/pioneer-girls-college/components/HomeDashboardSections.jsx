import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import {
  academicPrograms,
  facilities,
  galleryItems,
  importantLinks,
  institutionalFacts,
  newsEvents,
  notices,
  ROUTE_BASE,
} from "../data/college-data";
import Icon from "./Icon";

const visibleImportantLinks = importantLinks.slice(0, 6);
const visibleNotices = notices.slice(0, 5);
const visibleFacts = institutionalFacts.slice(0, 6);
const visibleFacilities = facilities.slice(0, 8);
const visibleNews = newsEvents.slice(0, 4);
const visibleGallery = galleryItems.slice(0, 4);

export default function HomeDashboardSections() {
  return (
    <div className="pgc-home-dashboard">
      <section className="pgc-home-overview" aria-label="কলেজ তথ্য ও সেবা">
        <div className="pgc-container pgc-home-overview__grid">
          <NoticeSummaryCard />
          <InstitutionSummaryCard />
          <ImportantLinksCard />
        </div>
      </section>
      <FacilitiesStrip />
      <section className="pgc-home-media" aria-label="সংবাদ ও গ্যালারি">
        <div className="pgc-container pgc-home-media__grid">
          <NewsPanel />
          <GalleryPanel />
        </div>
      </section>
    </div>
  );
}

function NoticeSummaryCard() {
  return (
    <article className="pgc-home-card pgc-home-notices">
      <DashboardHeader title="নোটিশ বোর্ড" />
      <div className="pgc-home-notice-list">
        {visibleNotices.map((notice) => {
          const date = getNoticeDateParts(notice.publishedAt);

          return (
            <Link className="pgc-home-notice-row" href={`${ROUTE_BASE}/notices#${notice.id}`} key={notice.id}>
              <span className="pgc-home-notice-date">
                <strong>{date.day}</strong>
                <small>{date.monthYear}</small>
              </span>
              <span className="pgc-home-notice-text">
                <span>
                  {notice.title}
                  {notice.urgent ? <b>নতুন</b> : null}
                </span>
              </span>
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          );
        })}
      </div>
      <Link className="pgc-home-card__footer" href={`${ROUTE_BASE}/notices`}>
        সব নোটিশ দেখুন
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}

function InstitutionSummaryCard() {
  return (
    <article className="pgc-home-card pgc-home-institution">
      <DashboardHeader title="একাডেমিক সংক্ষিপ্ত" />
      <div className="pgc-home-fact-grid">
        {visibleFacts.map((fact) => (
          <div className="pgc-home-fact" key={fact.label}>
            <span>{fact.label}</span>
            <strong>{fact.value}</strong>
          </div>
        ))}
      </div>
      <h3>প্রোগ্রামসমূহ</h3>
      <div className="pgc-home-program-pills">
        {academicPrograms.flatMap((program) => program.points).slice(0, 6).map((point) => (
          <span key={point}>{point}</span>
        ))}
      </div>
    </article>
  );
}

function ImportantLinksCard() {
  return (
    <article className="pgc-home-card pgc-home-services">
      <DashboardHeader title="গুরুত্বপূর্ণ লিঙ্ক" />
      <div className="pgc-home-service-list">
        {visibleImportantLinks.map((link) => (
          <a className="pgc-home-service-row" href={link.href} target="_blank" rel="noopener noreferrer" key={link.href}>
            <span>
              <Icon name="ExternalLink" size={19} />
            </span>
            <strong>{link.label}</strong>
            <ChevronRight size={17} aria-hidden="true" />
          </a>
        ))}
      </div>
      <a className="pgc-home-card__footer" href="https://www.pioneergirlscollege.edu.bd/" target="_blank" rel="noopener noreferrer">
        সকল গুরুত্বপূর্ণ লিঙ্ক
        <ArrowRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
}

function FacilitiesStrip() {
  return (
    <section className="pgc-home-facilities" aria-labelledby="pgc-home-facilities-title">
      <div className="pgc-container pgc-home-card">
        <DashboardHeader title="আমাদের সুবিধাসমূহ" id="pgc-home-facilities-title" />
        <div className="pgc-home-facility-grid">
          {visibleFacilities.map((facility) => (
            <Link
              className="pgc-home-facility"
              href={facility.href || `${ROUTE_BASE}/academic`}
              key={facility.title}
            >
              <Icon name={facility.icon} size={25} />
              <strong>{facility.title}</strong>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsPanel() {
  const [featured, ...otherNews] = visibleNews;

  return (
    <article className="pgc-home-card pgc-home-news-panel">
      <DashboardHeader title="সংবাদ ও আপডেট" href={`${ROUTE_BASE}/gallery`} action="সব সংবাদ" />
      <div className={`pgc-home-news-content pgc-home-news-content--items-${visibleNews.length}`}>
        {featured ? (
          <Link className="pgc-home-feature-news" href={`${ROUTE_BASE}/gallery`}>
            <Image src={featured.image} alt={featured.title} width={620} height={410} sizes="(max-width: 760px) 100vw, 28vw" />
            <span className="pgc-home-news-date">
              <strong>{getNoticeDateParts(featured.date).day}</strong>
              <small>{getNoticeDateParts(featured.date).monthYear}</small>
            </span>
            <span className="pgc-home-feature-news__text">
              <strong>{featured.title}</strong>
              <small>{featured.summary}</small>
            </span>
          </Link>
        ) : null}
        {otherNews.length ? (
          <div className="pgc-home-news-list">
            {otherNews.map((event) => (
              <Link className="pgc-home-news-row" href={`${ROUTE_BASE}/gallery`} key={event.title}>
                <Image src={event.image} alt={event.title} width={76} height={58} sizes="76px" />
                <span>
                  <time>{event.date}</time>
                  <strong>{event.title}</strong>
                </span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function GalleryPanel() {
  const featuredNews = visibleNews[0];
  const orderedGallery = [
    ...visibleGallery.filter((item) => item.image !== featuredNews?.image),
    ...visibleGallery.filter((item) => item.image === featuredNews?.image),
  ];
  const [featured, ...otherItems] = orderedGallery;

  return (
    <article className="pgc-home-card pgc-home-gallery-panel">
      <DashboardHeader title="গ্যালারি" href={`${ROUTE_BASE}/gallery`} action="সব গ্যালারি" />
      {featured ? <GalleryTile item={featured} featured /> : null}
      <div className={`pgc-home-gallery-thumbs is-count-${otherItems.length}`}>
        {otherItems.map((item) => (
          <GalleryTile item={item} key={item.image} />
        ))}
      </div>
    </article>
  );
}

function GalleryTile({ item, featured = false }) {
  return (
    <Link className={featured ? "pgc-home-gallery-tile is-featured" : "pgc-home-gallery-tile"} href={`${ROUTE_BASE}/gallery`}>
      <Image src={item.image} alt={item.alt} width={featured ? 680 : 240} height={featured ? 320 : 150} sizes={featured ? "(max-width: 760px) 100vw, 48vw" : "(max-width: 760px) 33vw, 12vw"} />
      <span>
        <strong>{item.caption}</strong>
        <ArrowRight size={14} aria-hidden="true" />
      </span>
    </Link>
  );
}

function DashboardHeader({ title, href, action, id }) {
  const titleNode = (
    <h2 id={id}>
      <span aria-hidden="true" />
      {title}
    </h2>
  );

  return (
    <div className="pgc-home-card__header">
      {titleNode}
      {href && action ? (
        <Link href={href}>
          {action}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}

function getNoticeDateParts(dateText) {
  const parts = dateText.split(" ");
  return {
    day: parts[0] || "",
    monthYear: parts.slice(1).join(" "),
  };
}
