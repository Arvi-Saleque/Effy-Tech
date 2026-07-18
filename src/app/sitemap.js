import siteConfig from "@/theme/siteConfig";

const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/allservices", priority: 0.9, changeFrequency: "monthly" },
  { path: "/quickservices", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects/IAM", priority: 0.9, changeFrequency: "weekly" },
  { path: "/projects/DHA", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects/BUEK", priority: 0.8, changeFrequency: "monthly" },
  { path: "/salek", priority: 0.6, changeFrequency: "monthly" },
  { path: "/adnan", priority: 0.6, changeFrequency: "monthly" },
  { path: "/saif", priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap() {
  const lastModified = new Date("2026-07-17T00:00:00+06:00");

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
