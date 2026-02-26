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
    slug: "islamic-amal-tracker",
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
    id: "1",
    title: "E-Commerce Platform",
    slug: "e-commerce-platform",
    description:
      "A full-stack e-commerce solution with real-time inventory management, Stripe payment integration, and a comprehensive admin dashboard for analytics and order processing.",
    category: "Web",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    thumbnail: null,
    images: [],
    clientName: "RetailFlow Inc.",
    liveUrl: "https://retailflow.example.com",
    featured: true,
    order: 1,
  },
  {
    id: "2",
    title: "Fitness Tracker App",
    slug: "fitness-tracker-app",
    description:
      "Native Android application for tracking workouts, nutrition, and health metrics with wearable device sync and personalized AI coaching.",
    category: "Android",
    tags: ["Kotlin", "Jetpack Compose", "Firebase", "Health Connect"],
    thumbnail: null,
    images: [],
    clientName: "FitPulse",
    liveUrl: null,
    featured: true,
    order: 2,
  },
  {
    id: "3",
    title: "Portfolio Builder",
    slug: "portfolio-builder",
    description:
      "Drag-and-drop portfolio website builder with custom themes, real-time preview, analytics dashboard, and built-in SEO optimization.",
    category: "Web",
    tags: ["Next.js", "Tailwind CSS", "PostgreSQL", "Vercel"],
    thumbnail: null,
    images: [],
    clientName: "CreativeHub",
    liveUrl: "https://creativehub.example.com",
    featured: false,
    order: 3,
  },
  {
    id: "4",
    title: "Food Delivery App",
    slug: "food-delivery-app",
    description:
      "Cross-platform food delivery application with real-time GPS order tracking, restaurant management portal, and intelligent driver routing.",
    category: "iOS",
    tags: ["Swift", "SwiftUI", "MapKit", "CoreLocation"],
    thumbnail: null,
    images: [],
    clientName: "QuickBite",
    liveUrl: null,
    featured: true,
    order: 4,
  },
  {
    id: "5",
    title: "Brand Identity System",
    slug: "brand-identity-system",
    description:
      "Complete brand identity redesign including logo, color system, typography guide, motion design language, and marketing collateral templates.",
    category: "UI/UX",
    tags: ["Figma", "Illustrator", "After Effects", "Branding"],
    thumbnail: null,
    images: [],
    clientName: "NovaBrand Co.",
    liveUrl: null,
    featured: false,
    order: 5,
  },
  {
    id: "6",
    title: "Task Management Dashboard",
    slug: "task-management-dashboard",
    description:
      "Collaborative project management tool with Kanban boards, Gantt charts, time tracking, team analytics, and Slack/Jira integrations.",
    category: "Web",
    tags: ["React", "TypeScript", "Supabase", "WebSocket"],
    thumbnail: null,
    images: [],
    clientName: "TeamSync",
    liveUrl: "https://teamsync.example.com",
    featured: true,
    order: 6,
  },
  {
    id: "7",
    title: "Ride-Sharing Platform",
    slug: "ride-sharing-platform",
    description:
      "Cross-platform ride-sharing app with real-time matching, fare estimation, split payments, and an advanced driver rating system.",
    category: "Cross-Platform",
    tags: ["React Native", "Node.js", "Redis", "Google Maps"],
    thumbnail: null,
    images: [],
    clientName: "GoRide",
    liveUrl: null,
    featured: true,
    order: 7,
  },
  {
    id: "8",
    title: "Healthcare Dashboard",
    slug: "healthcare-dashboard",
    description:
      "HIPAA-compliant patient management system with appointment scheduling, EHR integration, telemedicine support, and real-time vitals monitoring.",
    category: "Web",
    tags: ["Next.js", "GraphQL", "PostgreSQL", "Docker"],
    thumbnail: null,
    images: [],
    clientName: "MedConnect",
    liveUrl: "https://medconnect.example.com",
    featured: false,
    order: 8,
  },
  {
    id: "9",
    title: "Smart Home Controller",
    slug: "smart-home-controller",
    description:
      "IoT-powered Android app for controlling smart home devices — lights, thermostats, cameras — with voice commands and automation routines.",
    category: "Android",
    tags: ["Kotlin", "IoT", "MQTT", "Material Design 3"],
    thumbnail: null,
    images: [],
    clientName: "HomeSphere",
    liveUrl: null,
    featured: false,
    order: 9,
  },
  {
    id: "10",
    title: "SaaS Design System",
    slug: "saas-design-system",
    description:
      "Scalable component library and design system for a B2B SaaS platform — 120+ components, accessibility-first, dark mode, Storybook docs.",
    category: "UI/UX",
    tags: ["Figma", "Storybook", "Design Tokens", "a11y"],
    thumbnail: null,
    images: [],
    clientName: "CloudMetrics",
    liveUrl: null,
    featured: true,
    order: 10,
  },
];

export default projects;
