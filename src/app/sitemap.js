import siteConfig from "@/theme/siteConfig";

const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
  {
    path: "/projects/islamic-amal-tracker",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/projects/effy-edu-management-system",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/projects/darul-hikmah-academy",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/projects/bangladesh-university-of-excellence-khulna",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  { path: "/process", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/team", priority: 0.7, changeFrequency: "monthly" },
  {
    path: "/team/salek-bin-hossain",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  { path: "/team/abdullah-al-saif", priority: 0.6, changeFrequency: "monthly" },
  { path: "/team/adnan-bin-wahid", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
];

export default function sitemap() {
  const lastModified = new Date("2026-07-29T00:00:00+06:00");

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
