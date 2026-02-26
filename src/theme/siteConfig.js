/* ============================================================
   Effy Tech — Site Configuration
   Centralized brand data, navigation, and social links.
   Components import from here — no hardcoded strings scattered.
   ============================================================ */

const siteConfig = {
  /* ── Brand ───────────────────────────────────────────────── */
  name: "Effy Tech",
  tagline: "Smart Solutions. Simple Execution.",
  description:
    "We craft modern, scalable, and beautiful digital products that drive growth and innovation.",
  url: "https://effytech.com",

  /* ── Navigation Links ────────────────────────────────────── */
  navLinks: [
    { label: "Home", href: "/#hero" },
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/#contact" },
  ],

  /* ── Social Media ────────────────────────────────────────── */
  socials: [
    { platform: "facebook", url: "https://www.facebook.com/profile.php?id=61588615151448" },
  ],

  /* ── Contact Info ────────────────────────────────────────── */
  contact: {
    email: "effttech@gmail.com",
    phone: "+8801730814853",
    address: "Nirala R/A, Khulna",
  },

  /* ── Project Filter Categories ───────────────────────────── */
  projectCategories: [
    "All",
    "Web",
    "Android",
    "iOS",
    "UI/UX",
    "Cross-Platform",
  ],

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
    columns: [
      {
        title: "Company",
        links: [
          { label: "About", href: "/#about" },
          { label: "Careers", href: "/coming-soon" },
          { label: "Blog", href: "/coming-soon" },
          { label: "Press", href: "/coming-soon" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Web Development", href: "/coming-soon" },
          { label: "Mobile Apps", href: "/coming-soon" },
          { label: "UI/UX Design", href: "/coming-soon" },
          { label: "Consulting", href: "/coming-soon" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "/coming-soon" },
          { label: "Support", href: "/coming-soon" },
          { label: "Privacy Policy", href: "/coming-soon" },
          { label: "Terms of Service", href: "/coming-soon" },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} Effy Tech. All rights reserved.`,
  },
};

export default siteConfig;
