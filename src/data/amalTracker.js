/* ============================================================
   Islamic Amal Tracker — Dedicated project showcase data
   ────────────────────────────────────────────────────────────
   Current content for /projects/IAM (Beta / Version 2.0).
   Keep feature copy and screenshot mapping centralized here.
   ============================================================ */

const amalTracker = {
  /* ── Basic Info ──────────────────────────────────────────── */
  name: "Islamic Amal Tracker",
  nameBn: "ইসলামিক আমল ট্র্যাকার",
  versionLabel: "Beta • Version 2.0",
  tagline: "মনে রাখুন বেশি। বাদ দিন কম। প্রতিদিন এগিয়ে যান।",
  taglineEn: "Remember More. Miss Less. Grow Daily.",
  description:
    "A complete Islamic habit and worship tracker for Salah, Sunnah, Kaza, daily Amal, Dhikr, reading, routines, reminders, reflection, progress insights and trusted accountability — built for Bengali and English users.",
  descriptionBn:
    "Islamic Amal Tracker আপনার নামাজ, সুন্নত, কাযা, দৈনিক আমল, যিকির, রিডিং, রুটিন, রিমাইন্ডার, রিফ্লেকশন ও অগ্রগতির হিসাব এক জায়গায় গুছিয়ে রাখতে সাহায্য করে। অ্যাপটি Offline-first; অ্যাকাউন্ট ছাড়াও ব্যবহার করা যায় এবং প্রয়োজন হলে নিরাপদ Cloud Backup ও Sync চালু করা যায়।",

  playStoreUrl:
    "https://play.google.com/store/apps/details?id=com.amaltracker.app&hl=en",
  category: "Android",
  techStack: ["Flutter", "Dart", "Drift", "Supabase"],
  logoImage: "/images/amal/logo.png",
  heroImage: "/images/amal/amal_dashboard.jpeg",

  /* ── Core Features ───────────────────────────────────────── */
  features: [
    {
      icon: "layers",
      titleBn: "Home Dashboard",
      titleEn: "Everything Important, at a Glance",
      descBn:
        "আজকের নামাজ, আমল, যিকির, রিডিং ও গুরুত্বপূর্ণ রিমাইন্ডারের অবস্থা এক জায়গা থেকে দ্রুত দেখুন।",
      descEn:
        "See today's prayers, deeds, dhikr, reading and important reminders from one focused dashboard.",
    },
    {
      icon: "mosque",
      titleBn: "নামাজ ও সুন্নত Tracking",
      titleEn: "Prayer & Sunnah Tracking",
      descBn:
        "পাঁচ ওয়াক্ত নামাজের জামাত, একাকী, সময়মতো, দেরিতে, missed বা কাযা অবস্থা এবং নিয়মিত সুন্নত নামাজ আলাদাভাবে সংরক্ষণ করুন।",
      descEn:
        "Track five daily prayers with detailed status and keep a separate record of regular Sunnah prayers.",
    },
    {
      icon: "clipboard",
      titleBn: "কাযা নামাজ Manager",
      titleEn: "Kaza Prayer Manager",
      descBn:
        "মোট কাযা, আদায় করা কাযা, অবশিষ্ট কাযা এবং সাম্প্রতিক অগ্রগতি বিস্তারিতভাবে দেখুন ও আপডেট করুন।",
      descEn:
        "Manage total, completed and remaining Kaza prayers with clear progress and recent history.",
    },
    {
      icon: "check",
      titleBn: "দৈনিক আমল Tracker",
      titleEn: "Daily Amal Tracker",
      descBn:
        "প্রয়োজন অনুযায়ী আমল যোগ করুন, লক্ষ্য নির্ধারণ করুন এবং প্রতিদিনের completion ও consistency অনুসরণ করুন।",
      descEn:
        "Create personalized deeds, set targets and track daily completion and long-term consistency.",
    },
    {
      icon: "praying",
      titleBn: "যিকির Counter ও Log",
      titleEn: "Dhikr Counter & History",
      descBn:
        "Preset বা Custom যিকির দ্রুত শুরু করুন, সরাসরি Counter ব্যবহার করুন এবং সম্পন্ন যিকির Log হিসেবে সংরক্ষণ করুন।",
      descEn:
        "Use preset or custom dhikr, count directly and save completed sessions to your history.",
    },
    {
      icon: "quran",
      titleBn: "Reading Tracker",
      titleEn: "Quran, Hadith & Islamic Reading",
      descBn:
        "কুরআন, হাদিস, ইসলামিক বই অথবা নিজের প্রয়োজনীয় যেকোনো Reading item-এর নিয়মিত হিসাব রাখুন।",
      descEn:
        "Track Quran, Hadith, Islamic books or any custom reading habit in one place.",
    },
    {
      icon: "calendar",
      titleBn: "Smart Routine System",
      titleEn: "Plan and Complete Daily Routines",
      descBn:
        "নামাজ, আমল, যিকির, রিডিং ও অন্যান্য কাজ সময়ভিত্তিক Routine-এ সাজিয়ে প্রতিদিন অনুসরণ করুন।",
      descEn:
        "Organize worship and important tasks into time-based routines and follow them every day.",
    },
    {
      icon: "bell",
      titleBn: "Smart Reminder ও Strong Alarm",
      titleEn: "Mission-based Important Reminders",
      descBn:
        "সাধারণ Reminder থেকে Strong Alarm পর্যন্ত প্রয়োজন অনুযায়ী সতর্কতা দিন এবং mission-based dismiss ব্যবহার করুন।",
      descEn:
        "Choose normal reminders or strong mission-based alarms for tasks that must not be overlooked.",
    },
    {
      icon: "book",
      titleBn: "Advanced Qur'anic Dua Library",
      titleEn: "Search and Read Qur'anic Duas",
      descBn:
        "Book, Index ও Dua ভিত্তিক Library থেকে প্রয়োজনীয় কুরআনিক দোয়া দ্রুত খুঁজুন এবং বিস্তারিত পড়ুন।",
      descEn:
        "Browse a structured Book → Index → Dua library and find Qur'anic supplications quickly.",
    },
    {
      icon: "trending",
      titleBn: "Smart Insights",
      titleEn: "Daily, Weekly & Monthly Progress",
      descBn:
        "দৈনিক, সাপ্তাহিক ও মাসিক Summary, Chart এবং Calendar view থেকে ধারাবাহিকতা ও ঘাটতি বুঝুন।",
      descEn:
        "Understand consistency and missed areas through daily, weekly and monthly summaries and charts.",
    },
    {
      icon: "users",
      titleBn: "Trusted Circle",
      titleEn: "Private Accountability Sharing",
      descBn:
        "নির্বাচিত অগ্রগতি একজন বিশ্বস্ত ব্যক্তির সঙ্গে Privacy-conscious উপায়ে শেয়ার করে accountability বজায় রাখুন।",
      descEn:
        "Share selected progress with a trusted person while keeping personal details under your control.",
    },
    {
      icon: "widgets",
      titleBn: "Home Screen Widgets",
      titleEn: "Track Without Opening the App",
      descBn:
        "Prayer, Amal ও Dhikr Widget ব্যবহার করে Home Screen থেকেই প্রয়োজনীয় অগ্রগতি দেখুন ও দ্রুত কাজ সম্পন্ন করুন।",
      descEn:
        "Use Prayer, Amal and Dhikr widgets to view progress and take quick actions from the home screen.",
    },
  ],

  /* ── Detailed Feature Categories ─────────────────────────── */
  deepDiveCategories: [
    {
      id: "home",
      icon: "layers",
      titleBn: "Home Dashboard",
      titleEn: "Focused Daily Overview",
      color: "from-primary-light/20 to-primary-dark/5",
      imageSrc: "/images/amal/today_dashboard_prayer_times.jpeg",
      imageLabel: "Today Dashboard and Prayer Times",
      points: [
        "আজকের নামাজ, আমল, যিকির, রিডিং ও Routine-এর অবস্থা একসঙ্গে দেখা যায়।",
        "অসম্পূর্ণ কাজ ও গুরুত্বপূর্ণ Reminder দ্রুত চিহ্নিত করা যায়।",
        "দৈনিক progress বুঝতে আলাদা আলাদা page ঘুরতে হয় না।",
      ],
    },
    {
      id: "prayer",
      icon: "mosque",
      titleBn: "নামাজ ও সুন্নত Tracking",
      titleEn: "Detailed Prayer Status",
      color: "from-emerald-500/20 to-emerald-600/5",
      imageSrc: "/images/amal/prayer_dhuhr_details.jpeg",
      imageLabel: "Detailed Prayer Tracking",
      points: [
        "ফজর, যোহর, আসর, মাগরিব ও এশার নামাজ প্রতিদিন সংরক্ষণ করা যায়।",
        "জামাতে, একাকী, সময়মতো, দেরিতে, missed ও কাযা অবস্থা আলাদাভাবে রাখা যায়।",
        "নিয়মিত সুন্নত নামাজের হিসাবও পৃথকভাবে অনুসরণ করা যায়।",
      ],
    },
    {
      id: "kaza",
      icon: "clipboard",
      titleBn: "কাযা নামাজ Manager",
      titleEn: "Backlog and Completion Progress",
      color: "from-rose-500/20 to-rose-600/5",
      imageSrc: "/images/amal/prayer_lifetime_kaza.jpeg",
      imageLabel: "Lifetime Kaza Manager",
      points: [
        "প্রতিটি ওয়াক্তের মোট কাযা ও অবশিষ্ট হিসাব সংরক্ষণ করা যায়।",
        "আদায় করা কাযা আলাদাভাবে Log করে progress দেখা যায়।",
        "সাম্প্রতিক দিন, মাসিক Calendar ও সামগ্রিক Summary থেকে কাযা ব্যবস্থাপনা সহজ হয়।",
      ],
    },
    {
      id: "amal",
      icon: "check",
      titleBn: "দৈনিক আমল Tracker",
      titleEn: "Flexible Custom Deeds",
      color: "from-lime-500/20 to-lime-600/5",
      imageSrc: "/images/amal/amal_dashboard.jpeg",
      imageLabel: "Daily Amal Dashboard",
      points: [
        "প্রয়োজন অনুযায়ী নিজের আমল যোগ, সম্পাদনা, সক্রিয় বা নিষ্ক্রিয় করা যায়।",
        "সংখ্যা, সময় বা completion ভিত্তিক লক্ষ্য নির্ধারণ করা যায়।",
        "দিনভিত্তিক Log থেকে কোন আমল নিয়মিত হচ্ছে এবং কোনটি বাদ যাচ্ছে বোঝা যায়।",
      ],
    },
    {
      id: "dhikr",
      icon: "praying",
      titleBn: "যিকির Tracker",
      titleEn: "Counter, Targets and Logs",
      color: "from-amber-500/20 to-amber-600/5",
      imageSrc: "/images/amal/dhikr_dashboard.jpeg",
      imageLabel: "Dhikr Dashboard",
      points: [
        "Preset যিকির থেকে দ্রুত শুরু করা যায় এবং Custom যিকির যোগ করা যায়।",
        "প্রতিটি যিকিরের আলাদা Target ও Counter ব্যবহার করা যায়।",
        "সম্পন্ন যিকির History হিসেবে সংরক্ষণ করে ধারাবাহিকতা দেখা যায়।",
      ],
    },
    {
      id: "reading",
      icon: "quran",
      titleBn: "Reading Tracker",
      titleEn: "Quran, Hadith and Books",
      color: "from-sky-500/20 to-sky-600/5",
      imageSrc: "/images/amal/more_reading_list.jpeg",
      imageLabel: "Reading Tracker",
      points: [
        "কুরআন, হাদিস, তাফসির, ইসলামিক বই বা Custom reading item যোগ করা যায়।",
        "সময়, পরিমাণ অথবা completion অনুযায়ী দৈনিক Reading Log রাখা যায়।",
        "সক্রিয় Reading habit এবং নিয়মিততার progress সহজে দেখা যায়।",
      ],
    },
    {
      id: "routine",
      icon: "calendar",
      titleBn: "Smart Routine System",
      titleEn: "Structured Daily Planning",
      color: "from-accent-light/20 to-accent-dark/5",
      imageSrc: "/images/amal/more_routine_after_fajr.jpeg",
      imageLabel: "Smart Routine System",
      points: [
        "নামাজ, আমল, যিকির, Reading ও Custom কাজ একটি Routine-এ সাজানো যায়।",
        "সময়ভিত্তিক পরিকল্পনা এবং completion tracking একসঙ্গে পাওয়া যায়।",
        "একই কাজ বারবার মনে না রেখেও দৈনিক পরিকল্পনা অনুসরণ করা সহজ হয়।",
      ],
    },
    {
      id: "reminder",
      icon: "bell",
      titleBn: "Smart Reminder ও Strong Alarm",
      titleEn: "Flexible Reminder Intensity",
      color: "from-violet-500/20 to-violet-600/5",
      imageSrc: "/images/amal/more_reminder_hub.jpeg",
      imageLabel: "Smart Reminder Hub",
      points: [
        "নামাজ, সকাল-সন্ধ্যার যিকির, রাতের আমল এবং Custom কাজের Reminder তৈরি করা যায়।",
        "প্রয়োজন অনুযায়ী সাধারণ Reminder অথবা Strong Alarm নির্বাচন করা যায়।",
        "Typing বা Dhikr mission সম্পন্ন করে গুরুত্বপূর্ণ Alarm dismiss করার ব্যবস্থা আছে।",
      ],
    },
    {
      id: "dua",
      icon: "book",
      titleBn: "Advanced Qur'anic Dua Library",
      titleEn: "Book → Index → Dua",
      color: "from-indigo-500/20 to-indigo-600/5",
      points: [
        "দোয়া Book ও Index অনুযায়ী গুছিয়ে রাখা হয়েছে।",
        "Arabic, বাংলা অর্থ, Transliteration এবং প্রয়োজনীয় তথ্য একসঙ্গে পড়া যায়।",
        "Search ব্যবহার করে প্রয়োজনীয় কুরআনিক দোয়া দ্রুত খুঁজে পাওয়া যায়।",
      ],
    },
    {
      id: "stats",
      icon: "trending",
      titleBn: "Smart Insights ও Statistics",
      titleEn: "Meaningful Progress Analysis",
      color: "from-orange-500/20 to-orange-600/5",
      points: [
        "দৈনিক, সাপ্তাহিক ও মাসিক অগ্রগতির Summary দেখা যায়।",
        "Chart, heatmap ও Calendar view থেকে consistency এবং gap বোঝা যায়।",
        "নির্দিষ্ট দিনে tap করে সেই দিনের বিস্তারিত activity দেখা যায়।",
      ],
    },
    {
      id: "reflection",
      icon: "heart",
      titleBn: "রিফ্লেকশন ও নোট",
      titleEn: "Personal Daily Reflection",
      color: "from-pink-500/20 to-pink-600/5",
      points: [
        "প্রতিদিনের অবস্থা, উপলব্ধি ও উন্নতির জায়গা নিয়ে ব্যক্তিগত Note রাখা যায়।",
        "শুধু সংখ্যা নয়, নিজের আচরণগত পরিবর্তনও পর্যবেক্ষণ করা যায়।",
        "পুরোনো Reflection দেখে দীর্ঘমেয়াদি আত্মমূল্যায়ন করা সহজ হয়।",
      ],
    },
    {
      id: "trusted-circle",
      icon: "users",
      titleBn: "Trusted Circle",
      titleEn: "Accountability with Privacy",
      color: "from-primary-light/20 to-primary-dark/5",
      points: [
        "একজন বিশ্বস্ত ব্যক্তির সঙ্গে নির্বাচিত progress share করা যায়।",
        "Owner আলাদা করে Stats page না খুললেও নতুন Snapshot share হতে পারে।",
        "শেয়ার করা তথ্য প্রয়োজনীয় সীমার মধ্যে রেখে Privacy-conscious accountability দেওয়া হয়।",
      ],
    },
    {
      id: "widgets",
      icon: "widgets",
      titleBn: "Home Screen Widgets",
      titleEn: "Fast Access from the Launcher",
      color: "from-fuchsia-500/20 to-fuchsia-600/5",
      points: [
        "Prayer, Amal ও Dhikr-এর জন্য আলাদা Home Screen Widget আছে।",
        "অ্যাপ না খুলেও দিনের প্রয়োজনীয় progress দেখা যায়।",
        "সমর্থিত action Widget থেকেই দ্রুত সম্পন্ন করা যায় এবং app theme-এর সঙ্গে appearance sync থাকে।",
      ],
    },
    {
      id: "offline-sync",
      icon: "shield",
      titleBn: "Offline-first ও Cloud Sync",
      titleEn: "Local-first Reliability",
      color: "from-slate-500/20 to-slate-600/5",
      points: [
        "ইন্টারনেট ছাড়াই মূল tracking feature ব্যবহার করা যায়।",
        "অ্যাকাউন্ট ছাড়াও শুরু করা যায়; Sign in করলে নিরাপদ Cloud Backup ও Sync পাওয়া যায়।",
        "Local data, incremental sync, conflict handling ও restore flow ব্যবহার করে data continuity বজায় রাখা হয়।",
      ],
    },
    {
      id: "language",
      icon: "book",
      titleBn: "বাংলা ও English Interface",
      titleEn: "Bilingual and Accessible",
      color: "from-yellow-500/20 to-yellow-600/5",
      points: [
        "বাংলা ও English—দুই ভাষায় সম্পূর্ণ Interface ব্যবহার করা যায়।",
        "বাংলা locale-এ সংখ্যা বাংলা অঙ্কে এবং প্রয়োজনীয় technical term পরিচিত English form-এ দেখানো হয়।",
        "Light ও Dark theme-এর মাধ্যমে ব্যবহারকারীর পছন্দ অনুযায়ী Interface সাজানো যায়।",
      ],
    },
  ],

  /* ── Current V2 Screenshots ──────────────────────────────── */
  screenshots: [
    {
      src: "/images/amal/amal_dashboard.jpeg",
      label: "Daily Amal Dashboard",
    },
    {
      src: "/images/amal/today_dashboard_prayer_times.jpeg",
      label: "Today Dashboard and Prayer Times",
    },
    {
      src: "/images/amal/prayer_dhuhr_details.jpeg",
      label: "Detailed Prayer Tracking",
    },
    {
      src: "/images/amal/prayer_calendar.jpeg",
      label: "Prayer Calendar",
    },
    {
      src: "/images/amal/prayer_lifetime_kaza.jpeg",
      label: "Lifetime Kaza Manager",
    },
    {
      src: "/images/amal/prayer_wise_breakdown.jpeg",
      label: "Prayer-wise Breakdown",
    },
    {
      src: "/images/amal/more_monthly_prayer_summary.jpeg",
      label: "Monthly Prayer Summary",
    },
    {
      src: "/images/amal/dhikr_dashboard.jpeg",
      label: "Dhikr Dashboard",
    },
    {
      src: "/images/amal/dhikr_istighfar_counter.jpeg",
      label: "Istighfar Counter",
    },
    {
      src: "/images/amal/more_reading_list.jpeg",
      label: "Reading Tracker",
    },
    {
      src: "/images/amal/more_routine_after_fajr.jpeg",
      label: "Smart Routine System",
    },
    {
      src: "/images/amal/more_reminder_hub.jpeg",
      label: "Smart Reminder Hub",
    },
    {
      src: "/images/amal/more_dua_library.jpeg",
      label: "Advanced Dua Library",
    },
    {
      src: "/images/amal/more_quranic_duas.jpeg",
      label: "Quranic Duas",
    },
    {
      src: "/images/amal/more_stats_progress_today.jpeg",
      label: "Today's Progress",
    },
    {
      src: "/images/amal/more_weekly_progress_trend.jpeg",
      label: "Weekly Progress Trend",
    },
    {
      src: "/images/amal/more_monthly_progress_trend.jpeg",
      label: "Monthly Progress Trend",
    },
    {
      src: "/images/amal/more_reflection_self_correction.jpeg",
      label: "Reflection and Self-correction",
    },
    {
      src: "/images/amal/more_app_guide.jpeg",
      label: "Complete App Guide",
    },
  ],

  /* ── How It Works ───────────────────────────────────────── */
  howItWorks: [
    {
      step: 1,
      titleBn: "আজকের Dashboard দেখুন",
      titleEn: "Review Today's Plan",
      descBn:
        "Home Dashboard থেকে আজকের নামাজ, আমল, যিকির, Reading এবং Reminder-এর অবস্থা বুঝে নিন।",
      descEn:
        "Open the dashboard to understand today's prayers, deeds, dhikr, reading and reminders.",
    },
    {
      step: 2,
      titleBn: "নামাজ ও আমল Track করুন",
      titleEn: "Log Worship and Habits",
      descBn:
        "নামাজের বিস্তারিত status দিন এবং আমল, যিকির ও Reading সহজে সম্পন্ন বা Log করুন।",
      descEn:
        "Save detailed prayer status and complete or log deeds, dhikr and reading.",
    },
    {
      step: 3,
      titleBn: "Routine ও Reminder সাজান",
      titleEn: "Build a Sustainable Routine",
      descBn:
        "নিজের প্রয়োজন অনুযায়ী Routine তৈরি করুন এবং গুরুত্বপূর্ণ কাজের জন্য Reminder বা Strong Alarm দিন।",
      descEn:
        "Create routines and use reminders or strong alarms for important tasks.",
    },
    {
      step: 4,
      titleBn: "অগ্রগতি বিশ্লেষণ করুন",
      titleEn: "Reflect and Improve",
      descBn:
        "Smart Insights, Calendar, Reflection এবং Trusted Circle ব্যবহার করে ঘাটতি বুঝুন ও ধীরে ধীরে উন্নতি করুন।",
      descEn:
        "Use insights, reflection and trusted accountability to improve consistently.",
    },
  ],

  /* ── Highlights ──────────────────────────────────────────── */
  highlights: [
    { label: "Core Modules", value: "15+", icon: "layers" },
    { label: "Daily Prayers", value: "5 Waqt", icon: "mosque" },
    { label: "Home Widgets", value: "3", icon: "widgets" },
    { label: "Languages", value: "2", icon: "book" },
  ],
};

export default amalTracker;
