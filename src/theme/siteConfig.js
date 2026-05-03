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
    { label: "Services", href: "/#services" },
    { label: "Projects", href: "/#projects" },
    { label: "Team", href: "/#team" },
    { label: "Contact", href: "/#contact" },
  ],

  /* ── Social Media ────────────────────────────────────────── */
  socials: [
    { platform: "facebook", url: "https://www.facebook.com/profile.php?id=61588615151448" },
    { platform: "linkedin", url: "https://www.linkedin.com/company/effy-tech" },
    { platform: "instagram", url: "https://www.instagram.com/effy__tech/" },
  ],

  /* ── Contact Info ────────────────────────────────────────── */
  contact: {
    email: "effttech@gmail.com",
    phone: "+8801730814853",
    address: "Nirala R/A, Khulna",
  },

  /* ── Project Filter Categories ───────────────────────────── */
  projectCategories: ["All", "Web", "Android"],

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
  /* Services Section */
  services: [
    {
      title: "Website Development",
      description:
        "Build modern, responsive websites for companies, institutions, portfolios, and organizations.",
      icon: "website",
    },
    {
      title: "Web Application Development",
      description:
        "Create dashboards, admin panels, management systems, SaaS tools, and client portals.",
      icon: "webapp",
    },
    {
      title: "Mobile App Development",
      description:
        "Develop Android and cross-platform apps with clean UI, smooth performance, and backend integration.",
      icon: "mobile",
    },
    {
      title: "UI/UX Design",
      description:
        "Design professional interfaces, landing pages, app screens, wireframes, and design systems.",
      icon: "design",
    },
    {
      title: "Backend & API Development",
      description:
        "Build secure APIs, authentication, databases, admin logic, and server-side business features.",
      icon: "backend",
    },
    {
      title: "Maintenance & Support",
      description:
        "Provide bug fixing, feature updates, hosting support, optimization, and long-term assistance.",
      icon: "support",
    },
  ],

  /* Why Choose Section */
  whyChoose: [
    {
      title: "Business-Focused Approach",
      description:
        "We first understand your goal, audience, and workflow before starting development.",
      icon: "business",
    },
    {
      title: "Clean & Scalable Code",
      description:
        "We build with organized structure so future updates are easier and safer.",
      icon: "code",
    },
    {
      title: "Modern UI Experience",
      description:
        "We create smooth, responsive, and professional interfaces for web and mobile users.",
      icon: "ui",
    },
    {
      title: "Long-Term Support",
      description:
        "We help after launch with updates, improvements, bug fixing, and technical support.",
      icon: "support",
    },
  ],

  /* Team Section */
  team: [
    {
      name: "Salek Bin Hossain",
      role: "Founder & CEO",
      initials: "SH",
      bio: "Leads Effy Tech's product vision, client strategy, and company direction.",
      photo: "/images/salek.png",
      detailsUrl: "/salek",
      socials: [
        {
          platform: "facebook",
          url: "https://www.facebook.com/profile.php?id=61588615151448",
        },
        { platform: "github", url: "/coming-soon" },
        { platform: "linkedin", url: "/coming-soon" },
        { platform: "mail", url: "mailto:effttech@gmail.com" },
      ],
    },
    {
      name: "Adnan Bin Wahid",
      role: "Co-Founder & Lead Software Engineer",
      initials: "AW",
      bio: "Builds full-stack systems, developer tools, and scalable product features across modern web and backend stacks.",
      photo: "/images/adnan.png",
      detailsUrl: "/adnan",
      socials: [
        { platform: "github", url: "https://github.com/adnan-bin-wahid" },
        {
          platform: "linkedin",
          url: "https://www.linkedin.com/in/adnan-bin-wahid/",
        },
        { platform: "mail", url: "mailto:bsse1442@iit.du.ac.bd" },
      ],
    },
    {
      name: "Abdullah Al Saif",
      role: "Co-Founder & Head of Engineering",
      initials: "AS",
      bio: "Guides engineering standards, technical planning, and smooth delivery across projects.",
      photo: "/images/saif.png",
      detailsUrl: "/saif",
      socials: [
        {
          platform: "facebook",
          url: "https://www.facebook.com/profile.php?id=61588615151448",
        },
        { platform: "github", url: "/coming-soon" },
        { platform: "linkedin", url: "/coming-soon" },
        { platform: "mail", url: "mailto:effttech@gmail.com" },
      ],
    },
  ],

  /* Footer */
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
