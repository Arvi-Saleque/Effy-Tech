/* ============================================================
   Darul Hikmah Academy — Dedicated project showcase data
   ─────────────────────────────────────────────────
   All content for the /projects/DHA showcase page.
   Edit this file to update any text, features, or screenshots.
   ============================================================ */

const dha = {
  /* ── Basic Info ──────────────────────────────────────────── */
  name: "Darul Hikmah Academy",
  nameBn: "দারুল হিকমাহ একাডেমি",
  tagline: "ইসলামি শিক্ষা ও আধুনিক একাডেমিক ম্যানেজমেন্ট — এক প্ল্যাটফর্মে",
  taglineEn: "Islamic Education Meets Modern Academic Management",
  description:
    "A complete bilingual (Bengali & English) academic management website built for Darul Hikmah Academy — featuring a full admin dashboard, dynamic academic system with assignments, exams, results, routines, smart PDF-to-image viewer, class-wise filtering, SEO optimization, and a fully responsive mobile-first design.",
  descriptionBn:
    "দারুল হিকমাহ একাডেমি'র জন্য তৈরি একটি পূর্ণাঙ্গ দ্বিভাষী (বাংলা ও ইংরেজি) একাডেমিক ম্যানেজমেন্ট ওয়েবসাইট — যেখানে আছে অ্যাডমিন ড্যাশবোর্ড, অ্যাসাইনমেন্ট, পরীক্ষা, রেজাল্ট, রুটিন, স্মার্ট PDF ভিউয়ার, ক্লাস-ভিত্তিক ফিল্টার এবং মোবাইল-ফ্রেন্ডলি ডিজাইন।",

  liveUrl: "https://www.dhakhl.com",
  category: "Web",
  techStack: ["Next.js", "Tailwind CSS", "Cloudinary", "MongoDB"],

  /* ── Features ───────────────────────────────────────────── */
  features: [
    {
      icon: "admin",
      titleBn: "শক্তিশালী অ্যাডমিন ড্যাশবোর্ড",
      titleEn: "Powerful Admin Dashboard",
      descBn:
        "সম্পূর্ণ কাস্টম অ্যাডমিন প্যানেল — অ্যাসাইনমেন্ট, পরীক্ষা, রেজাল্ট, রুটিন, নিউজ, ইভেন্ট, গ্যালারি সবকিছু এক জায়গা থেকে ম্যানেজ করুন। কোনো কোডিং জ্ঞান লাগবে না।",
      descEn:
        "Manage everything — assignments, exams, results, routines, news, events, gallery — from one custom CMS panel. Zero coding required.",
    },
    {
      icon: "language",
      titleBn: "বাংলা ও ইংরেজি দ্বিভাষী সাপোর্ট",
      titleEn: "Bilingual Bengali & English",
      descBn:
        "সম্পূর্ণ সাইট বাংলা ও ইংরেজিতে — অভিভাবক, শিক্ষার্থী ও শিক্ষক সবার জন্য সহজবোধ্য।",
      descEn:
        "Full site in Bengali and English — accessible for parents, students, and teachers alike.",
    },
    {
      icon: "academic",
      titleBn: "ডায়নামিক একাডেমিক সিস্টেম",
      titleEn: "Dynamic Academic System",
      descBn:
        "দৈনিক অ্যাসাইনমেন্ট, পরীক্ষার রুটিন, ক্লাস রুটিন, রেজাল্ট, সিলেবাস — সবকিছু রিয়েল-টাইমে আপডেট হয়।",
      descEn:
        "Daily homework, exam schedules, class routines, results, syllabus — all updated in real-time from admin.",
    },
    {
      icon: "pdf",
      titleBn: "স্মার্ট PDF ভিউয়ার — ডাউনলোড ছাড়াই দেখুন",
      titleEn: "Smart PDF Viewer — No Downloads",
      descBn:
        "সিলেবাস, রুটিন, ক্যালেন্ডার — সব PDF পেজ-বাই-পেজ ইমেজ স্লাইডার হিসেবে সরাসরি ব্রাউজারে দেখুন। Cloudinary-এর অটো PDF-to-Image রূপান্তর ব্যবহার করা হয়েছে।",
      descEn:
        "Syllabi, routines, calendars — all PDFs render as crisp page-by-page image slides right in the browser via Cloudinary's on-the-fly transformation.",
    },
    {
      icon: "filter",
      titleBn: "ক্লাস-ভিত্তিক স্মার্ট ফিল্টার",
      titleEn: "Class-Wise Smart Filtering",
      descBn:
        "প্রতিটি একাডেমিক সেকশনে এক ট্যাপে ক্লাস ফিল্টার — অভিভাবক শুধু তার সন্তানের ক্লাসের তথ্য দেখবে।",
      descEn:
        "One-tap class filter across all sections. Parents see only their child's relevant data instantly.",
    },
    {
      icon: "seo",
      titleBn: "SEO অপ্টিমাইজড ও ফাস্ট লোডিং",
      titleEn: "SEO Optimized & Fast Loading",
      descBn:
        "সার্চ ইঞ্জিনে ভালো র‍্যাংকিং-এর জন্য পূর্ণ SEO অপ্টিমাইজেশন। নেক্সট.জেএস-এর পাওয়ারে ব্লেজিং ফাস্ট পারফরম্যান্স।",
      descEn:
        "Full SEO optimization for search engine ranking. Blazing-fast performance powered by Next.js.",
    },
    {
      icon: "responsive",
      titleBn: "মোবাইল-ফার্স্ট রেসপন্সিভ ডিজাইন",
      titleEn: "Mobile-First Responsive Design",
      descBn:
        "ফোন, ট্যাবলেট, ডেস্কটপ — সব ডিভাইসে পারফেক্ট দেখায়। অভিভাবকরা ফোন থেকে সহজেই ব্যবহার করতে পারবেন।",
      descEn:
        "Perfect on phones, tablets, and desktops. Parents can easily browse from their mobile.",
    },
    {
      icon: "gallery",
      titleBn: "ফটো গ্যালারি ও নিউজ-ইভেন্ট",
      titleEn: "Photo Gallery & News Events",
      descBn:
        "Cloudinary-তে হোস্টেড ফটো গ্যালারি এবং ডায়নামিক নিউজ ও ইভেন্ট সেকশন — সবসময় আপডেটেড।",
      descEn:
        "Cloudinary-hosted photo gallery and dynamic news & events section — always up-to-date.",
    },
    {
      icon: "admission",
      titleBn: "অনলাইন অ্যাডমিশন সিস্টেম",
      titleEn: "Online Admission System",
      descBn:
        "অনলাইনে ভর্তি আবেদন — অভিভাবকদের আর দীর্ঘ লাইনে দাঁড়াতে হবে না।",
      descEn:
        "Online admission applications — no more long queues for parents.",
    },
  ],

  /* ── Screenshots ────────────────────────────────────────── */
  screenshots: [
    { src: "/images/dha/img2.png", label: "Homepage" },
    { src: "/images/dha/img3.png", label: "Academic Portal" },
    { src: "/images/dha/img4.png", label: "Assignments" },
    { src: "/images/dha/img5.png", label: "Class Routine" },
    { src: "/images/dha/img6.png", label: "Exam Schedule" },
    { src: "/images/dha/img7.png", label: "Results" },
    { src: "/images/dha/img8.png", label: "Syllabus Viewer" },
    { src: "/images/dha/img9.png", label: "Gallery" },
    { src: "/images/dha/img10.png", label: "News & Events" },
    { src: "/images/dha/img11.png", label: "Teachers Panel" },
    { src: "/images/dha/img12.png", label: "Admission" },
    { src: "/images/dha/img13.png", label: "Contact" },
  ],

  /* ── Long Screenshots (full-page views) ─────────────────── */
  longScreenshots: [
    { src: "/images/dha/longimg1.png", label: "Homepage" },
    { src: "/images/dha/longimg2.png", label: "About DHA" },
    { src: "/images/dha/longimg3.png", label: "Academic Portal" },
    { src: "/images/dha/longimg4.png", label: "Assignments" },
    { src: "/images/dha/longimg5.png", label: "Exam Schedule" },
    { src: "/images/dha/longimg6.png", label: "Results" },
    { src: "/images/dha/longimg7.png", label: "Syllabus Viewer" },
    { src: "/images/dha/longimg8.png", label: "Gallery" },
    { src: "/images/dha/longimg9.png", label: "News & Events" },
    { src: "/images/dha/longimg10.png", label: "Admin Dashboard" },
  ],

  /* ── Key Highlights (for the stat cards) ────────────────── */
  highlights: [
    { label: "Academic Modules", value: "10+", icon: "layers" },
    { label: "Class Levels", value: "7+", icon: "academic" },
    { label: "Admin Features", value: "Full CMS", icon: "admin" },
    { label: "Performance", value: "100/100", icon: "seo" },
  ],

  /* ── Client Info ────────────────────────────────────────── */
  client: {
    name: "Darul Hikmah Academy",
    location: "Khulna, Bangladesh",
    type: "Islamic Educational Institution",
  },
};

export default dha;
