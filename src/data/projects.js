/* ============================================================
   Projects — Static project data
   ─────────────────────────────────────────────────
   Shape mirrors the future MongoDB model:
   { title, slug, description, category (enum), tags[],
     thumbnail, images[], clientName, liveUrl, featured, order }
   Replace with API/server-component fetch when MongoDB is set up.
   ============================================================ */

const projects = [
  {
    id: "11",
    title: "Islamic Amal Tracker",
    slug: "IAM",
    description:
      "Amal Tracker is a productivity-based Islamic habit tracking mobile application that helps users monitor daily Salah, Azkar, and spiritual activities with structured reporting and reminders.",
    category: "Android",
    tags: ["Flutter", "Dart", "Firebase"],
    thumbnail: "/images/amal.jpg",
    images: [],
    clientName: null,
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.amaltracker.app&hl=en",
    featured: true,
    order: 0,
  },
  {
    id: "12",
    title: "Darul Hikmah Academy",
    slug: "DHA",
    description:
      "A complete bilingual academic management website for Darul Hikmah Academy — featuring admin dashboard, dynamic academic system, smart PDF viewer, class-wise filtering, and mobile-first responsive design.",
    category: "Web",
    tags: ["Next.js", "Tailwind CSS", "Cloudinary", "MongoDB"],
    thumbnail: "/images/dha/img1.png",
    images: [],
    clientName: "Darul Hikmah Academy",
    liveUrl: "https://www.dhakhl.com",
    featured: true,
    order: 1,
  },
  {
    id: "13",
    title: "Bangladesh University of Engineering Knowledge (BUEK)",
    slug: "BUEK",
    description:
      "A full-featured university website with a protected admin panel, dynamic content management, media library, news, events, gallery, and 10+ public pages.",
    category: "Web",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Cloudinary",
    ],
    thumbnail: "/images/buek/img1.png",
    images: [],
    clientName: "Bangladesh University of Engineering Knowledge",
    liveUrl: "https://buekbd.com",
    featured: true,
    order: 2,
  },
];

export default projects;
