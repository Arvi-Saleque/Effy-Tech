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
];

export default projects;
