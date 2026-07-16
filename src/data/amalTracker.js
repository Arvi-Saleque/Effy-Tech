/* ============================================================
   Islamic Amal Tracker — promotional showcase data
   Keep product copy, proof, links and feature mapping centralized.
   ============================================================ */

const amalTracker = {
  name: "Islamic Amal Tracker",
  nameBn: "ইসলামিক আমল ট্র্যাকার",
  tagline: "মনে রাখুন বেশি। বাদ দিন কম। প্রতিদিন এগিয়ে যান।",
  taglineEn: "Remember More. Miss Less. Grow Daily.",
  description:
    "A complete Islamic habit and worship tracker for prayer, Kaza, daily Amal, Dhikr, routines, reminders, Qur'anic duas, home widgets and meaningful progress insights — built for Bengali and English users.",
  descriptionBn:
    "নামাজ, কাযা, দৈনিক আমল, যিকির, রুটিন, রিমাইন্ডার ও অগ্রগতির হিসাব এক জায়গায় গুছিয়ে রাখুন। Offline-first ব্যবহারের সঙ্গে প্রয়োজন হলে নিরাপদ Cloud Backup ও Sync চালু করুন।",

  playStoreUrl: "https://play.google.com/store/apps/details?id=com.amaltracker.app",
  privacyPolicyUrl: "https://amaltrack2026.firebaseapp.com/privacy-policy.html",
  supportUrl:
    "https://wa.me/8801511190270?text=Hello%20Effy%20Tech%2C%20I%20need%20support%20for%20Islamic%20Amal%20Tracker.",
  projectInquiryUrl:
    "https://wa.me/8801511190270?text=Hello%20Effy%20Tech%2C%20I%20saw%20Islamic%20Amal%20Tracker%20and%20want%20to%20discuss%20building%20an%20app.",

  category: "Android",
  techStack: ["Flutter", "Dart", "Drift", "Supabase", "Native Android"],
  logoImage: "/images/amal/logo.png",
  heroImage: "/images/amal/amal_dashboard.jpeg",
  ogImage: "/images/amal/iam-og-1200x630.jpg",

  socialProof: [
    { value: "1500+", label: "Total installs" },
    { value: "4.77/5", label: "User rating" },
    { value: "35", label: "Verified ratings" },
  ],

  features: [
    {
      id: "prayer",
      icon: "mosque",
      titleBn: "নামাজ Tracking",
      titleEn: "Prayer & Sunnah Tracking",
      descBn:
        "পাঁচ ওয়াক্ত নামাজের জামাত, একাকী, সময়মতো, দেরিতে, missed বা কাযা অবস্থা এবং নিয়মিত সুন্নত নামাজ আলাদাভাবে সংরক্ষণ করুন।",
    },
    {
      id: "kaza",
      icon: "clipboard",
      titleBn: "কাযা নামাজ Manager",
      titleEn: "Kaza Prayer Manager",
      descBn:
        "মোট কাযা, আদায় করা কাযা, অবশিষ্ট কাযা এবং সাম্প্রতিক অগ্রগতি পরিষ্কারভাবে দেখুন ও আপডেট করুন।",
    },
    {
      id: "amal",
      icon: "check",
      titleBn: "দৈনিক আমল Tracker",
      titleEn: "Flexible Daily Amal",
      descBn:
        "নিজের প্রয়োজন অনুযায়ী আমল যোগ করুন, লক্ষ্য নির্ধারণ করুন এবং প্রতিদিনের completion ও consistency অনুসরণ করুন।",
    },
    {
      id: "dhikr",
      icon: "praying",
      titleBn: "যিকির Counter ও Log",
      titleEn: "Dhikr Counter & History",
      descBn:
        "Preset বা Custom যিকির শুরু করুন, Counter ব্যবহার করুন এবং সম্পন্ন যিকির History হিসেবে সংরক্ষণ করুন।",
    },
    {
      id: "reminder",
      icon: "bell",
      titleBn: "Routine, Reminder ও Strong Alarm",
      titleEn: "Structured Routine & Important Alerts",
      descBn:
        "সময়ভিত্তিক Routine সাজান এবং সাধারণ Reminder থেকে mission-based Strong Alarm পর্যন্ত প্রয়োজন অনুযায়ী ব্যবহার করুন।",
    },
    {
      id: "stats",
      icon: "trending",
      titleBn: "Progress ও Smart Insights",
      titleEn: "Daily, Weekly & Monthly Insights",
      descBn:
        "Summary, Chart ও Calendar view থেকে ধারাবাহিকতা, উন্নতি এবং বাদ পড়ে যাওয়া জায়গা সহজে বুঝুন।",
    },
    {
      id: "widgets",
      icon: "widgets",
      titleBn: "Home Screen Widgets",
      titleEn: "Track Without Opening the App",
      descBn:
        "Prayer, Amal ও Dhikr Widget দিয়ে Home Screen থেকেই প্রয়োজনীয় অগ্রগতি দেখুন এবং দ্রুত কাজ সম্পন্ন করুন।",
    },
    {
      id: "dua",
      icon: "book",
      titleBn: "Advanced Qur'anic Dua",
      titleEn: "Structured Qur'anic Dua Library",
      descBn:
        "Book → Index → Dua ভিত্তিক Library, Search, Arabic, বাংলা অর্থ ও Transliteration থেকে প্রয়োজনীয় দোয়া দ্রুত খুঁজুন।",
    },
  ],

  deepDiveCategories: [
    {
      id: "prayer",
      icon: "mosque",
      titleBn: "নামাজ ও সুন্নত Tracking",
      titleEn: "Detailed Prayer Status",
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
      imageSrc: "/images/amal/prayer_lifetime_kaza.jpeg",
      imageLabel: "Lifetime Kaza Manager",
      points: [
        "প্রতিটি ওয়াক্তের মোট কাযা ও অবশিষ্ট হিসাব সংরক্ষণ করা যায়।",
        "আদায় করা কাযা আলাদাভাবে Log করে progress দেখা যায়।",
        "Calendar ও summary থেকে দীর্ঘমেয়াদি কাযা ব্যবস্থাপনা সহজ হয়।",
      ],
    },
    {
      id: "amal",
      icon: "check",
      titleBn: "দৈনিক আমল Tracker",
      titleEn: "Flexible Custom Deeds",
      imageSrc: "/images/amal/amal_dashboard.jpeg",
      imageLabel: "Daily Amal Dashboard",
      points: [
        "নিজের প্রয়োজন অনুযায়ী আমল যোগ, সম্পাদনা, সক্রিয় বা নিষ্ক্রিয় করা যায়।",
        "সংখ্যা, সময় অথবা completion ভিত্তিক লক্ষ্য নির্ধারণ করা যায়।",
        "দিনভিত্তিক Log থেকে কোন আমল নিয়মিত হচ্ছে এবং কোনটি বাদ যাচ্ছে বোঝা যায়।",
      ],
    },
    {
      id: "dhikr",
      icon: "praying",
      titleBn: "যিকির Tracker",
      titleEn: "Counter, Targets and Logs",
      imageSrc: "/images/amal/dhikr_dashboard.jpeg",
      imageLabel: "Dhikr Dashboard",
      points: [
        "Preset যিকির থেকে দ্রুত শুরু করা যায় এবং Custom যিকির যোগ করা যায়।",
        "প্রতিটি যিকিরের আলাদা Target ও Counter ব্যবহার করা যায়।",
        "সম্পন্ন যিকির History হিসেবে সংরক্ষণ করে ধারাবাহিকতা দেখা যায়।",
      ],
    },
    {
      id: "reminder",
      icon: "bell",
      titleBn: "Routine, Reminder ও Strong Alarm",
      titleEn: "Flexible Reminder Intensity",
      imageSrc: "/images/amal/more_reminder_hub.jpeg",
      imageLabel: "Smart Reminder Hub",
      points: [
        "নামাজ, যিকির, আমল ও Custom কাজ সময়ভিত্তিক Routine-এ সাজানো যায়।",
        "সাধারণ Reminder এবং গুরুত্বপূর্ণ কাজের জন্য Strong Alarm নির্বাচন করা যায়।",
        "Typing বা Dhikr mission সম্পন্ন করে গুরুত্বপূর্ণ Alarm dismiss করার ব্যবস্থা আছে।",
      ],
    },
    {
      id: "stats",
      icon: "trending",
      titleBn: "Progress ও Smart Insights",
      titleEn: "Meaningful Progress Analysis",
      imageSrc: "/images/amal/more_stats_progress_today.jpeg",
      imageLabel: "Daily Progress and Insights",
      points: [
        "দৈনিক, সাপ্তাহিক ও মাসিক অগ্রগতির Summary দেখা যায়।",
        "Chart, trend ও Calendar view থেকে consistency এবং gap বোঝা যায়।",
        "নির্দিষ্ট দিনের বিস্তারিত activity দেখে নিজের routine উন্নত করা যায়।",
      ],
    },
    {
      id: "widgets",
      icon: "widgets",
      titleBn: "Home Screen Widgets",
      titleEn: "Fast Access from the Launcher",
      imageSrc: "/images/amal/more_app_guide.jpeg",
      imageLabel: "Home Widgets and App Guide",
      points: [
        "Prayer, Amal ও Dhikr-এর জন্য আলাদা Home Screen Widget আছে।",
        "অ্যাপ না খুলেও দিনের প্রয়োজনীয় progress দেখা যায়।",
        "সমর্থিত action Widget থেকেই দ্রুত সম্পন্ন করা যায় এবং appearance app theme-এর সঙ্গে মানিয়ে চলে।",
      ],
    },
    {
      id: "dua",
      icon: "book",
      titleBn: "Advanced Qur'anic Dua",
      titleEn: "Book → Index → Dua",
      imageSrc: "/images/amal/more_quranic_duas.jpeg",
      imageLabel: "Advanced Qur'anic Dua Search",
      points: [
        "দোয়া Book ও Index অনুযায়ী গুছিয়ে রাখা হয়েছে।",
        "Arabic, বাংলা অর্থ, Transliteration ও প্রয়োজনীয় তথ্য একসঙ্গে পড়া যায়।",
        "Search ব্যবহার করে প্রয়োজনীয় কুরআনিক দোয়া দ্রুত খুঁজে পাওয়া যায়।",
      ],
    },
  ],

  engineeringHighlights: [
    {
      number: "01",
      title: "Offline-first architecture",
      copy: "Local data layer, reliable daily use and optional cloud backup—network না থাকলেও core experience সচল থাকে।",
    },
    {
      number: "02",
      title: "Native Android capability",
      copy: "Strong Alarm, mission-based dismiss এবং Home Widgets-এর মতো platform-specific experience তৈরি করা হয়েছে।",
    },
    {
      number: "03",
      title: "Scalable product system",
      copy: "Modular tracking, sync, reminders, analytics এবং bilingual UI—একটি maintainable product architecture-এ যুক্ত।",
    },
    {
      number: "04",
      title: "Production delivery",
      copy: "Product design থেকে engineering, testing, Play Store release এবং ongoing improvement—পুরো lifecycle পরিচালিত।",
    },
  ],

  howItWorks: [
    {
      step: 1,
      titleBn: "আজকের Dashboard দেখুন",
      titleEn: "Review Today's Plan",
      descBn: "Home Dashboard থেকে নামাজ, আমল, যিকির ও গুরুত্বপূর্ণ Reminder-এর অবস্থা বুঝে নিন।",
    },
    {
      step: 2,
      titleBn: "নামাজ ও আমল Track করুন",
      titleEn: "Log Worship and Habits",
      descBn: "নামাজের বিস্তারিত status দিন এবং আমল ও যিকির সহজে সম্পন্ন বা Log করুন।",
    },
    {
      step: 3,
      titleBn: "Routine ও Reminder সাজান",
      titleEn: "Build a Sustainable Routine",
      descBn: "নিজের প্রয়োজন অনুযায়ী Routine তৈরি করুন এবং গুরুত্বপূর্ণ কাজের জন্য Reminder বা Strong Alarm দিন।",
    },
    {
      step: 4,
      titleBn: "অগ্রগতি বিশ্লেষণ করুন",
      titleEn: "Reflect and Improve",
      descBn: "Smart Insights ও Calendar ব্যবহার করে ঘাটতি বুঝুন এবং ধীরে ধীরে উন্নতি করুন।",
    },
  ],

  faqs: [
    {
      question: "অ্যাপ ব্যবহার করতে Account লাগবে কি?",
      answer: "না। Account ছাড়াই core tracking শুরু করা যায়। Cloud backup ও sync প্রয়োজন হলে sign in করা যাবে।",
    },
    {
      question: "Internet ছাড়া ব্যবহার করা যাবে কি?",
      answer: "হ্যাঁ। মূল tracking featureগুলো offline-first। Internet মূলত optional cloud backup, sync এবং কিছু connected সুবিধার জন্য প্রয়োজন।",
    },
    {
      question: "অ্যাপটি কি বিনামূল্যে?",
      answer: "হ্যাঁ। Islamic Amal Tracker Google Play থেকে বিনামূল্যে install করা যায় এবং অ্যাপটি বিজ্ঞাপনমুক্তভাবে তৈরি করা হয়েছে।",
    },
    {
      question: "আমার data কোথায় থাকে?",
      answer: "মূল data আপনার device-এ সংরক্ষিত থাকে। Cloud sync চালু করলে account-এর সঙ্গে backup রাখা হয়। বিস্তারিত Privacy Policy link-এ দেওয়া আছে।",
    },
    {
      question: "বাংলা ও English—দুই ভাষায় ব্যবহার করা যাবে?",
      answer: "হ্যাঁ। সম্পূর্ণ interface বাংলা এবং English—দুই ভাষাতেই ব্যবহার করা যায়।",
    },
    {
      question: "এমন একটি custom app Effy Tech দিয়ে বানানো যাবে?",
      answer: "হ্যাঁ। Effy Tech product planning, UI/UX, mobile development, backend, deployment এবং post-launch supportসহ end-to-end app তৈরি করে।",
    },
  ],
};

export default amalTracker;
