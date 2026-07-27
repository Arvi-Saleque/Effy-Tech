// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { Metadata } from "next";
import GalleryClient from "./GalleryClient";
import { getPageSection } from "@/features/effy-edu-demo/features/website-cms/actions/content-actions";

export const metadata: Metadata = {
  title: "Photo Gallery | EduPilot Coaching Academy",
  description: "A glimpse into our classrooms, events, and the vibrant life at EduPilot Coaching Academy.",
};

export default async function GalleryPage() {
  const heroData = await getPageSection("GALLERY", "GALLERY_HERO");
  const albumsData = await getPageSection("GALLERY", "GALLERY_ALBUMS");

  return <GalleryClient heroData={heroData} albumsData={albumsData} />;
}
