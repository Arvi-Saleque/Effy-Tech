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

  /* ── About Section ───────────────────────────────────────── */
  about: {
    story: {
      title: "Our Story",
      text: "Founded with a vision to bridge the gap between cutting-edge technology and business growth, Effy Tech has evolved from a small dev studio into a full-service digital product company. We partner with startups and enterprises alike to turn ambitious ideas into polished, scalable products.",
    },
    mission: {
      title: "Our Mission",
      text: "To empower businesses with technology that is beautiful, performant, and built to last. Every line of code we write is driven by clarity, scalability, and purpose.",
    },
    values: [
      {
        label: "Quality First",
        desc: "We ship code we're proud of — tested, reviewed, and refined.",
      },
      {
        label: "User Obsessed",
        desc: "Every decision starts with the end user experience.",
      },
      {
        label: "Transparent",
        desc: "Open communication, honest timelines, no surprises.",
      },
    ],
    techStack: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Figma",
      "Tailwind CSS",
      "GraphQL",
      "Redis",
    ],
    stats: [
      { value: 50, suffix: "+", label: "Projects Delivered" },
      { value: 30, suffix: "+", label: "Happy Clients" },
      { value: 5, suffix: "+", label: "Years Experience" },
      { value: 99, suffix: "%", label: "Client Retention" },
    ],
  },

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
