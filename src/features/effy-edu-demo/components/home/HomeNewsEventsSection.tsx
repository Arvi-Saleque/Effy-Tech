// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Bell,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function HomeNewsEventsSection({
  headerData,
  newsItems = [],
}: {
  headerData?: any;
  newsItems?: any[];
}) {
  const eyebrowText = headerData?.eyebrow || "Latest Updates";
  const titleText = headerData?.title || "News & Academic Events";
  const descriptionText =
    headerData?.description ||
    "Stay informed with our orientation schedules, scholarship model tests, revision plans, and success celebrations.";

  // Extract primary title word and highlight word
  const titleParts = titleText.split(" ");
  const firstWord = titleParts[0];
  const restWords = titleParts.slice(1).join(" ");

  // Selected IDs by admin
  const featuredId = headerData?.content?.featuredId;
  const selectedRightIds: string[] =
    headerData?.content?.selectedRightIds || [];

  // Determine the featured item
  let featuredItem = newsItems.find((item) => item.id === featuredId);
  if (!featuredItem && newsItems.length > 0) {
    featuredItem =
      newsItems.find((item) => item.metadata?.isFeatured || item.isFeatured) ||
      newsItems[0];
  }

  // Respect the admin selection, then fill any remaining card slots from available news.
  const rightItems = selectedRightIds
    .map((id) => newsItems.find((item) => item.id === id))
    .filter(Boolean);

  const cardItems = [featuredItem, ...rightItems, ...newsItems]
    .filter(
      (item, index, items) =>
        item &&
        items.findIndex((candidate) => candidate?.id === item.id) === index,
    )
    .slice(0, 3);

  if (cardItems.length === 0) {
    return null; // Nothing to show if no items exist at all
  }

  const formatItem = (item: any) => {
    const meta = item.metadata || {};
    return {
      id: item.id || "",
      title: item.title || meta.title || "Untitled Announcement",
      category: item.subtitle || meta.category || "NOTICE",
      date: meta.date || item.date || "15",
      month: meta.month || item.month || "AUG",
      time: meta.time || item.time || "",
      location: meta.location || item.location || "",
      excerpt: item.body || meta.excerpt || item.excerpt || "",
      imageUrl:
        item.mediaUrl ||
        meta.imageUrl ||
        item.imageUrl ||
        "/effy_edu_management_system/images/gallery-event.png",
    };
  };

  const cards = cardItems.map(formatItem);

  const getCategoryColor = (cat: string) => {
    const upper = (cat || "").toUpperCase();
    if (upper === "EVENT")
      return "bg-teal-500/15 text-teal-700 border-teal-500/30";
    if (upper === "NOTICE")
      return "bg-amber-500/15 text-amber-700 border-amber-500/30";
    if (upper === "NEWS")
      return "bg-[#010E62]/15 text-[#010E62] border-[#010E62]/30";
    return "bg-indigo-500/15 text-indigo-700 border-indigo-500/30";
  };

  return (
    <section className="py-16 md:py-20 bg-[#FFF8E6] dark:bg-[#08122B] relative overflow-hidden transition-colors duration-300 border-t border-[#E8DDBF]/40">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-[#010E62]/5 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/4 h-1/3 bg-[#FBB503]/5 dark:bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBB503]/15 border border-[#FBB503]/30 text-[#010E62] dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Bell className="w-3.5 h-3.5 text-accent" />
            <span>{eyebrowText}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#010E62] dark:text-white tracking-tight mb-4">
            {firstWord}{" "}
            {restWords && <span className="text-accent">{restWords}</span>}
          </h2>
          <p className="text-[#4A5568] dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-medium">
            {descriptionText}
          </p>
        </div>

        {/* Three balanced cards keep the section compact and easy to scan. */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {cards.map((card, idx) => {
            const isFeatured = idx === 0;

            return (
              <motion.article
                key={card.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex h-full"
              >
                <Link
                  href={`/effy_edu_management_system/news-events/${card.id}`}
                  className={`group flex h-full w-full flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl dark:bg-slate-900 dark:border-slate-800 ${
                    isFeatured
                      ? "border-[#FBB503]/60 ring-1 ring-[#FBB503]/20"
                      : "border-[#E8DDBF]/80"
                  }`}
                >
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#08132E]">
                    <Image
                      src={card.imageUrl}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08132E]/75 via-[#08132E]/5 to-transparent" />

                    <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-md backdrop-blur-md ${getCategoryColor(
                          card.category,
                        )}`}
                      >
                        <Sparkles className="h-3 w-3" />
                        <span>{card.category}</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#08132E]/90 px-3 py-1 text-[10px] font-black text-white shadow-md backdrop-blur-md">
                        <Calendar className="h-3.5 w-3.5 text-accent" />
                        {card.date} {card.month}
                      </span>
                    </div>

                    {isFeatured && (
                      <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#010E62] shadow-md">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="mb-4 flex min-h-5 flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-[#4A5568] dark:text-slate-400">
                      {card.time && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-[#010E62] dark:text-accent" />
                          {card.time}
                        </span>
                      )}
                      {card.location && (
                        <span className="inline-flex min-w-0 items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#010E62] dark:text-accent" />
                          <span className="truncate">{card.location}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="line-clamp-2 text-xl font-black leading-snug text-[#010E62] transition-colors group-hover:text-accent dark:text-white">
                      {card.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm font-medium leading-relaxed text-[#4A5568] dark:text-slate-300">
                      {card.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-[#E8DDBF]/60 pt-5 dark:border-slate-800">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7A6844] dark:text-slate-400">
                        {isFeatured ? "Featured Spotlight" : "Latest Update"}
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-black text-[#010E62] transition-colors group-hover:text-accent dark:text-white">
                        Read Details
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* View All CTA (Exact same style as GallerySection) */}
        <div className="mt-10 md:mt-12 text-center">
          <Link
            href="/effy_edu_management_system/news-events"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-900 border border-[#E8DDBF] dark:border-slate-700 text-[#010E62] dark:text-white font-extrabold text-sm uppercase tracking-widest rounded-xl hover:bg-[#FBB503] hover:text-[#010E62] hover:border-[#FBB503] dark:hover:bg-[#FBB503] dark:hover:text-[#010E62] transition-all shadow-sm hover:shadow-lg group"
          >
            <span>View All News & Events</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
