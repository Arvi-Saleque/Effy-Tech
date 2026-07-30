/* Effy Tech selected live project case studies.
   Keep portfolio labels, proof, routes, and filter taxonomy canonical here. */
export const projectFilters = [
  { id: "all", label: "All work" },
  { id: "mobile-product", label: "Mobile product" },
  { id: "operations-platform", label: "Operations platforms" },
  { id: "institutional-web", label: "Institutional web" },
];

const projects = [
  {
    id: "11",
    title: "Islamic Amal Tracker",
    shortTitle: "Islamic Amal Tracker",
    slug: "IAM",
    eyebrow: "Mobile Product",
    status: "Live on Google Play",
    portfolioCategory: "mobile-product",
    description:
      "An offline-first Islamic habit and worship companion for prayer, daily Amal, Dhikr, reminders, routines, progress insights, Qur'anic Dua, and home-screen widgets.",
    problem:
      "Daily worship tracking was fragmented across memory, notes, and single-purpose tools, making consistency difficult to review.",
    solution:
      "A bilingual, offline-first Android product that connects prayer, Kaza, Amal, Dhikr, routines, reminders, widgets, and progress insights.",
    outcome:
      "A complete consumer product delivered from product planning and mobile engineering to cloud sync, release, analytics, and ongoing iteration.",
    category: "Android App",
    audience: "Individual users",
    tags: ["Flutter", "Drift", "Supabase", "Offline-first"],
    deliverables: [
      "Product architecture and mobile UI",
      "Local-first data and cloud synchronization",
      "Reminders, widgets, analytics, and Play Store release",
    ],
    thumbnail: "/images/amal/iam-og-1200x630.jpg",
    caseStudyUrl: "/projects/islamic-amal-tracker",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.amaltracker.app",
    liveLabel: "Google Play",
    clientName: "Effy Tech Product",
    featured: true,
    order: 0,
  },
  {
    id: "14",
    title: "Effy Edu Management System",
    shortTitle: "Effy Edu Management System",
    slug: "EEMS",
    eyebrow: "Coaching Operations Platform",
    status: "Live Client Project",
    portfolioCategory: "operations-platform",
    description:
      "A role-based coaching management platform connecting a public website, student self-service, teacher administration, academic delivery, reporting, payments, and content management.",
    problem:
      "Public communication, student service, teaching workflows, fees, reporting, and content updates were difficult to operate as disconnected processes.",
    solution:
      "One role-aware platform connecting the public website, student centre, teacher operations, academic workflows, reporting, payments, and CMS.",
    outcome:
      "The client received one live system for public communication and recurring coaching operations, with focused experiences for students and staff.",
    category: "Web Platform",
    audience: "Students, teachers, and administrators",
    tags: ["Next.js", "TypeScript", "Role-based Portals", "Custom CMS"],
    deliverables: [
      "Public coaching website and CMS",
      "Student and teacher/admin portals",
      "Academic, exam, payment, and reporting workflows",
    ],
    thumbnail: "/images/effy-edu-management-system/case-study/hero.webp",
    caseStudyUrl: "/projects/effy-edu-management-system",
    demoUrl: "/demos/effy-edu-management-system",
    demoLabel: "Interactive Demo",
    liveUrl: "https://www.shifatstales.com",
    liveLabel: "Visit Live Client Site",
    clientName: "Shifat's Tales Academic & Admission Care",
    featured: true,
    order: 1,
  },
  {
    id: "12",
    title: "Darul Hikmah Academy",
    shortTitle: "Darul Hikmah Academy",
    slug: "DHA",
    eyebrow: "Academic Operations Platform",
    status: "Live Client Project",
    portfolioCategory: "operations-platform",
    description:
      "A bilingual academic website and operations platform connecting public information, assignments, absence records, routines, results, teachers, documents, and staff-controlled administration.",
    problem:
      "Students, parents, and staff needed recurring academic information to remain current without relying on scattered pages or developer-led updates.",
    solution:
      "A bilingual public experience connected to staff-managed assignment, attendance, routine, document, teacher, news, gallery, and communication workflows.",
    outcome:
      "The institution received one connected system for its public presence and recurring academic workflows instead of scattered pages and manual processes.",
    category: "Web Platform",
    audience: "Students, parents, and staff",
    tags: ["Next.js", "Admin System", "Cloud Media", "Responsive"],
    deliverables: [
      "Public academic website",
      "Student and parent information workflows",
      "Custom admin operations and content management",
    ],
    thumbnail: "/images/dha/case-study/og-1200x630.jpg",
    caseStudyUrl: "/projects/darul-hikmah-academy",
    liveUrl: "https://www.dhakhl.com",
    liveLabel: "Visit Live Site",
    clientName: "Darul Hikmah Academy",
    featured: true,
    order: 2,
  },
  {
    id: "13",
    title: "Bangladesh University of Excellence Khulna",
    shortTitle: "BUEK",
    slug: "BUEK",
    eyebrow: "University Website & CMS",
    status: "Live Client Project",
    portfolioCategory: "institutional-web",
    description:
      "A modern university website with a protected content-management system for academic information, news, events, galleries, media, contact content, and institutional pages.",
    problem:
      "University information and frequently updated content needed a credible public structure and a publishing workflow the internal team could operate.",
    solution:
      "A responsive institutional website backed by a protected custom CMS for pages, news, events, galleries, media, and global site content.",
    outcome:
      "BUEK gained a professional public website and an internal publishing workflow that lets its team manage recurring content without developer dependence.",
    category: "Institutional Website",
    audience: "Prospective students and university staff",
    tags: ["Next.js", "Custom CMS", "MongoDB", "Cloudinary"],
    deliverables: [
      "Multi-page institutional website",
      "Protected CMS and publishing workflows",
      "News, events, gallery, and media management",
    ],
    thumbnail: "/images/buek/case-study/og-1200x630.jpg",
    caseStudyUrl: "/projects/bangladesh-university-of-excellence-khulna",
    liveUrl: "https://buekbd.com",
    liveLabel: "Visit Live Site",
    clientName: "Bangladesh University of Excellence Khulna",
    featured: true,
    order: 3,
  },
];
export default projects;
