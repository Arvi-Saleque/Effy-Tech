/* ============================================================
   Effy Tech — Site Configuration
   Centralized brand data, navigation, and social links.
   Components import from here — no hardcoded strings scattered.
   ============================================================ */

const siteConfig = {
  /* ── Brand ───────────────────────────────────────────────── */
  name: "Effy Tech",
  tagline: "Building Tomorrow's Digital Solutions",
  description:
    "We craft modern, scalable, and beautiful digital products that drive growth and innovation.",
  url: "https://effytech.com",

  /* ── Navigation Links ────────────────────────────────────── */
  navLinks: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],

  /* ── Social Media ────────────────────────────────────────── */
  socials: [
    { platform: "github", url: "https://github.com/effytech" },
    { platform: "linkedin", url: "https://linkedin.com/company/effytech" },
    { platform: "twitter", url: "https://twitter.com/effytech" },
    { platform: "instagram", url: "https://instagram.com/effytech" },
  ],

  /* ── Contact Info ────────────────────────────────────────── */
  contact: {
    email: "hello@effytech.com",
    phone: "+1 (555) 123-4567",
    address: "123 Innovation Drive, Tech City, TC 10001",
  },

  /* ── Project Filter Categories ───────────────────────────── */
  projectCategories: ["All", "Web", "Android", "iOS", "UI/UX"],

  /* ── Footer ──────────────────────────────────────────────── */
  footer: {
    quickLinks: [
      { label: "Home", href: "#hero" },
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
    copyright: `© ${new Date().getFullYear()} Effy Tech. All rights reserved.`,
  },
};

export default siteConfig;
