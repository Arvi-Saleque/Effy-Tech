// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { getPageSection } from "./content-actions";
import { siteInfo as defaultSiteInfo } from "@/features/effy-edu-demo/data/site";

export async function getGlobalSettings() {
  const section = await getPageSection("GLOBAL", "GLOBAL_SETTINGS");

  if (section && section.content) {
    return { ...defaultSiteInfo, ...section.content };
  }

  return defaultSiteInfo;
}
