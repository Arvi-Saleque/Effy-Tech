// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSectionItems } from "@/features/effy-edu-demo/features/website-cms/actions/content-actions";
import { formatAllNewsEventItems, NewsEventItem } from "../news-events-data";
import NewsEventDetailClient from "./NewsEventDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const items = await getSectionItems("NEWS_EVENTS_ITEMS");
  const allItems = formatAllNewsEventItems(items);
  const item = allItems.find((i) => i.id === resolvedParams.id);

  if (!item) {
    return {
      title: "Item Not Found | EduPilot Coaching Academy",
    };
  }

  return {
    title: `${item.title} | News & Events | EduPilot Coaching Academy`,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: item.imageUrl ? [item.imageUrl] : ["/effy_edu_management_system/images/gallery-event.png"],
    },
  };
}

export default async function NewsEventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const items = await getSectionItems("NEWS_EVENTS_ITEMS");
  const allItems = formatAllNewsEventItems(items);
  const item = allItems.find((i) => i.id === resolvedParams.id);

  if (!item) {
    return notFound();
  }

  // Get related / recent items (excluding the current one)
  const relatedItems = allItems.filter((i) => i.id !== item.id).slice(0, 3);

  return <NewsEventDetailClient item={item} relatedItems={relatedItems} />;
}
