// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { Metadata } from "next";
import MaterialsClient from "./MaterialsClient";
import { getPageSection, getSectionItems } from "@/features/effy-edu-demo/features/website-cms/actions/content-actions";

export const metadata: Metadata = {
  title: "Study Materials & Resources | EduPilot Coaching Academy",
  description: "Access premium study materials, notes, and resources curated by Lead Instructor for academic excellence.",
};

export default async function MaterialsPage() {
  const heroData = await getPageSection("MATERIALS", "MATERIALS_HERO");
  const categoriesData = await getPageSection("MATERIALS", "MATERIALS_CATEGORIES");
  const materialItems = await getSectionItems("MATERIALS_ITEMS");

  const categories = categoriesData?.content?.categories || [];

  return <MaterialsClient heroData={heroData} materialItems={materialItems} categories={categories} />;
}
