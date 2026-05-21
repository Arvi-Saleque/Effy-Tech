/* ============================================================
   BUEK - Dedicated project showcase data
   All content for the /projects/BUEK showcase page.
   ============================================================ */

const buek = {
  name: "Bangladesh University of Excellence Khulna",
  tagline: "A modern university website with complete content control",
  taglineEn: "Full-stack institution website and protected admin panel",
  description:
    "A modern, multi-page university website built for Bangladesh University of Excellence Khulna in Khulna, Bangladesh. The project combines a dynamic public site with hero sliders, academic programs, news, events, gallery, contact flows, and a fully protected admin panel for managing content without code.",
  descriptionBn:
    "BUEK is a full-stack university website where staff can manage pages, sections, news, events, galleries, media, SEO, and global site settings from one protected dashboard. The public site is fast, responsive, and structured for students, applicants, administration, and the wider public.",

  liveUrl: "https://buekbd.com",
  category: "Web",
  techStack: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "MongoDB",
    "Cloudinary",
  ],

  projectKey: "BUEK",
  heroImage: "/images/buek/img1.png",
  heroImageAlt: "BUEK university website homepage",
  browserUrl: "buekbd.com",

  featureHeading: "Everything Built Into BUEK",
  featureSubtitle:
    "A CMS-style university platform with dynamic public pages, media management, secure authentication, and staff-friendly content editing.",
  techHeading: "Technology Behind The Build",
  techSubtitle:
    "A scalable Next.js and MongoDB stack designed for dynamic institution content, secure admin workflows, and fast public pages.",
  ctaEyebrow: "Institution Website",
  ctaTitle: "Need a complete website",
  ctaTitleAccent: "for your institution?",
  ctaDescription:
    "Effy Tech builds custom websites with admin panels, media tools, SEO, and clean workflows for schools, universities, and organizations.",
  ctaButtonLabel: "Contact Us",
  footerDescription:
    "A full-stack university website and admin panel for Bangladesh University of Excellence Khulna - built by Effy Tech.",
  proofPoints: [
    "Custom CMS",
    "Protected Admin Panel",
    "SEO Optimized",
    "Mobile Responsive",
  ],

  features: [
    {
      icon: "admin",
      titleBn: "Protected Admin Dashboard",
      titleEn: "Content Management",
      descBn:
        "A secure JWT-based admin panel gives staff one place to manage pages, homepage sections, media, news, events, gallery albums, and global site settings.",
    },
    {
      icon: "academic",
      titleBn: "Academic Programs And Pages",
      titleEn: "University Content",
      descBn:
        "Public pages cover academic programs, faculties, departments, subjects, About, Mission & Vision, Chairman's Message, Committee, Contact, and more.",
    },
    {
      icon: "gallery",
      titleBn: "Cloudinary Media Library",
      titleEn: "Media Management",
      descBn:
        "Admins can upload, browse, search, and manage optimized images through Cloudinary, including support for large institutional media uploads.",
    },
    {
      icon: "layers",
      titleBn: "News, Events And Notices",
      titleEn: "Publishing Workflow",
      descBn:
        "News, events, and notice board content can be categorized, dated, featured, drafted, and published from the dashboard without developer support.",
    },
    {
      icon: "shield",
      titleBn: "Secure Session Management",
      titleEn: "Custom Auth",
      descBn:
        "The admin area uses custom JWT authentication with HTTP-only cookies and 8-hour sessions to protect sensitive content tools.",
    },
    {
      icon: "seo",
      titleBn: "SEO-Ready Public Pages",
      titleEn: "Search Friendly",
      descBn:
        "Each page is structured for search visibility with custom metadata, clean routing, fast rendering, and a responsive layout across devices.",
    },
    {
      icon: "responsive",
      titleBn: "Mobile Responsive Design",
      titleEn: "All Devices",
      descBn:
        "The public site and dashboard workflows are designed to work smoothly across desktop, tablet, and mobile screens.",
    },
    {
      icon: "language",
      titleBn: "Staff-Friendly Editing",
      titleEn: "No Code Updates",
      descBn:
        "A WYSIWYG content editor lets non-technical staff update pages and sections independently, reducing day-to-day maintenance friction.",
    },
    {
      icon: "filter",
      titleBn: "Organized Gallery Albums",
      titleEn: "Photo Gallery",
      descBn:
        "Gallery albums can be organized by year and department, with public browsing and lightbox viewing for institutional photos.",
    },
  ],

  screenshots: [
    { src: "/images/buek/img1.png", label: "Homepage" },
    { src: "/images/buek/img2.png", label: "Academic Programs" },
    { src: "/images/buek/img3.png", label: "News And Events" },
    { src: "/images/buek/img4.png", label: "Gallery" },
    { src: "/images/buek/img5.png", label: "Admin Dashboard" },
    { src: "/images/buek/img6.png", label: "Content Editor" },
  ],

  longScreenshots: [
    { src: "/images/buek/full1.png", label: "Homepage" },
    { src: "/images/buek/full2.png", label: "Academic Programs" },
    { src: "/images/buek/full3.png", label: "News And Events" },
    { src: "/images/buek/full4.png", label: "Gallery" },
    { src: "/images/buek/full5.png", label: "Admin Dashboard" },
    { src: "/images/buek/full6.png", label: "Admin Editor" },
  ],

  highlights: [
    { label: "Public Pages", value: "10+", icon: "layers" },
    { label: "Admin Sections", value: "11", icon: "admin" },
    { label: "Media Uploads", value: "30MB+", icon: "gallery" },
    { label: "Status", value: "In Dev", icon: "academic" },
  ],

  techCards: [
    {
      name: "Next.js",
      desc: "App Router, server actions, fast public rendering, and production-ready deployment paths.",
      color: "from-neutral-400/20 to-neutral-600/5",
    },
    {
      name: "TypeScript",
      desc: "Typed frontend and backend code for safer admin workflows and maintainable content models.",
      color: "from-blue-500/20 to-blue-600/5",
    },
    {
      name: "MongoDB",
      desc: "Flexible collections for pages, media, news, events, settings, contact messages, and gallery content.",
      color: "from-emerald-500/20 to-emerald-600/5",
    },
    {
      name: "Cloudinary",
      desc: "Cloud media hosting, optimized image delivery, library browsing, and large upload support.",
      color: "from-sky-500/20 to-sky-600/5",
    },
  ],

  client: {
    name: "Bangladesh University of Excellence Khulna",
    location: "Khulna, Bangladesh",
    type: "University Institution",
  },
};

export default buek;
