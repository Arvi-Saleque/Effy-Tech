import siteConfig from "@/theme/siteConfig";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/coming-soon",
        "/projects/IAM/confirmed",
        "/spatial-lab",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
