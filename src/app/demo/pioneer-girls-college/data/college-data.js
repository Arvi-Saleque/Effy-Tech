export const ROUTE_BASE = "/demo/pioneer-girls-college";
export const ASSET_PATH = "/demos/pioneer-girls-college";

export const institution = {
  nameBn: "সরকারি পাইওনিয়ার মহিলা কলেজ",
  nameEn: "Pioneer Girls College",
  shortName: "Pioneer Girls College",
  established: "১৯৬৯",
  governmentized: "১৯৮৯",
  eiin: "117166",
  board: "Board of Intermediate and Secondary Education, Jashore",
  boardBn: "যশোর শিক্ষা বোর্ড",
  affiliation: "National University, Bangladesh",
  affiliationBn: "জাতীয় বিশ্ববিদ্যালয়, বাংলাদেশ",
  tagline: "নারীশিক্ষা, জ্ঞান ও আত্মমর্যাদার ঐতিহ্য",
  motto: "আমায় জ্ঞান দাও",
  identityNote:
    "১৯৬৯ সালে প্রতিষ্ঠিত এবং ১৯৮৯ সালে সরকারিকরণ হওয়া এই প্রতিষ্ঠান নারীশিক্ষা ও মানবিক মূল্যবোধভিত্তিক উচ্চশিক্ষার ধারাকে এগিয়ে নিচ্ছে।",
  contact: {
    office: "কলেজ অফিস",
    phone: "কর্তৃপক্ষের মাধ্যমে হালনাগাদযোগ্য",
    email: "কর্তৃপক্ষের মাধ্যমে হালনাগাদযোগ্য",
    hours: "কর্তৃপক্ষের মাধ্যমে হালনাগাদযোগ্য",
    address: "খুলনা, বাংলাদেশ - পূর্ণ ঠিকানা কর্তৃপক্ষের মাধ্যমে হালনাগাদযোগ্য",
  },
};

export const navItems = [
  { label: "হোম", href: ROUTE_BASE },
  {
    label: "আমাদের সম্পর্কে",
    href: `${ROUTE_BASE}/about`,
    children: [
      { label: "কলেজ পরিচিতি", href: `${ROUTE_BASE}/about` },
      { label: "ইতিহাস", href: `${ROUTE_BASE}/history` },
      { label: "লক্ষ্য ও উদ্দেশ্য", href: `${ROUTE_BASE}/about#mission` },
      { label: "অধ্যক্ষের বাণী", href: `${ROUTE_BASE}/principal-message` },
      { label: "প্রশাসন", href: `${ROUTE_BASE}/teachers` },
    ],
  },
  {
    label: "একাডেমিক",
    href: `${ROUTE_BASE}/academic`,
    children: [
      { label: "উচ্চমাধ্যমিক", href: `${ROUTE_BASE}/academic#higher-secondary` },
      { label: "ডিগ্রি", href: `${ROUTE_BASE}/academic#degree` },
      { label: "অনার্স", href: `${ROUTE_BASE}/academic#honours` },
      { label: "বিভাগসমূহ", href: `${ROUTE_BASE}/departments` },
      { label: "পাঠ্যক্রম", href: `${ROUTE_BASE}/academic#curriculum` },
    ],
  },
  { label: "শিক্ষক ও কর্মচারী", href: `${ROUTE_BASE}/teachers` },
  { label: "ভর্তি", href: `${ROUTE_BASE}/admission` },
  { label: "নোটিশ", href: `${ROUTE_BASE}/notices` },
  { label: "পরীক্ষা ও ফলাফল", href: `${ROUTE_BASE}/results` },
  { label: "শিক্ষার্থী সেবা", href: `${ROUTE_BASE}/admission#student-services` },
  { label: "গ্যালারি", href: `${ROUTE_BASE}/gallery` },
  { label: "যোগাযোগ", href: `${ROUTE_BASE}/contact` },
];

export const urgentNotices = [
  {
    category: "পরীক্ষা",
    date: "১৪ জুন ২০২৬",
    title: "একাদশ শ্রেণির বার্ষিক পরীক্ষা সম্পর্কিত নমুনা ঘোষণা",
    href: `${ROUTE_BASE}/notices`,
    urgent: true,
  },
  {
    category: "ভর্তি",
    date: "২০২৫-২৬",
    title: "একাদশ শ্রেণিতে ভর্তি প্রক্রিয়ার নির্দেশনা দেখুন",
    href: `${ROUTE_BASE}/admission`,
    urgent: false,
  },
  {
    category: "ফলাফল",
    date: "ডেমো",
    title: "ফলাফল ও রেজিস্ট্রেশন সেবা একই জায়গায় সাজানো হয়েছে",
    href: `${ROUTE_BASE}/results`,
    urgent: false,
  },
];

export const noticeCategories = [
  "সকল",
  "ভর্তি",
  "পরীক্ষা",
  "ফলাফল",
  "বৃত্তি",
  "প্রশাসনিক",
  "অনুষ্ঠান",
];

export const notices = [
  {
    id: "annual-exam-2026",
    category: "পরীক্ষা",
    title: "একাদশ শ্রেণির বার্ষিক পরীক্ষার নমুনা সময়সূচি প্রকাশ",
    date: "১২ জুন ২০২৬",
    deadline: "১৪ জুন ২০২৬",
    attachment: true,
    urgent: true,
  },
  {
    id: "hsc-form-fillup",
    category: "পরীক্ষা",
    title: "উচ্চ মাধ্যমিক পরীক্ষার ফরম পূরণ সংক্রান্ত নির্দেশনা",
    date: "১০ জুন ২০২৬",
    deadline: "৩০ জুন ২০২৬",
    attachment: true,
    urgent: true,
  },
  {
    id: "class-xi-admission",
    category: "ভর্তি",
    title: "২০২৫-২৬ শিক্ষাবর্ষে একাদশ শ্রেণির ভর্তি তথ্য",
    date: "০৫ জুন ২০২৬",
    deadline: "তথ্য হালনাগাদ প্রক্রিয়াধীন",
    attachment: true,
    urgent: false,
  },
  {
    id: "stipend-form",
    category: "বৃত্তি",
    title: "উপবৃত্তি আবেদন ফরম জমাদানের নির্দেশনা",
    date: "০১ জুন ২০২৬",
    deadline: "তথ্য হালনাগাদ প্রক্রিয়াধীন",
    attachment: true,
    urgent: false,
  },
  {
    id: "test-result",
    category: "ফলাফল",
    title: "দ্বাদশ নির্বাচনী পরীক্ষার ফলাফল দেখার নির্দেশনা",
    date: "২৮ মে ২০২৬",
    attachment: false,
    urgent: false,
  },
  {
    id: "office-hours",
    category: "প্রশাসনিক",
    title: "কলেজ অফিসের সেবা গ্রহণ প্রক্রিয়া ও প্রয়োজনীয় কাগজপত্র",
    date: "২৪ মে ২০২৬",
    attachment: false,
    urgent: false,
  },
  {
    id: "national-day",
    category: "অনুষ্ঠান",
    title: "জাতীয় দিবস উপলক্ষে ক্যাম্পাস কার্যক্রমের প্রস্তুতি",
    date: "২০ মে ২০২৬",
    attachment: false,
    urgent: false,
  },
];

export const quickServices = [
  {
    icon: "GraduationCap",
    title: "অনলাইন ভর্তি",
    description: "ভর্তি নির্দেশনা, প্রয়োজনীয় কাগজপত্র ও আবেদন ধাপ।",
    href: `${ROUTE_BASE}/admission`,
  },
  {
    icon: "UserRound",
    title: "শিক্ষার্থী লগইন",
    description: "শিক্ষার্থী সেবার ডেমো প্রবেশপথ।",
    href: `${ROUTE_BASE}/admission#student-services`,
  },
  {
    icon: "CreditCard",
    title: "ফি প্রদান",
    description: "পেমেন্ট নির্দেশনা যুক্ত করার জন্য প্রস্তুত মডিউল।",
    href: `${ROUTE_BASE}/admission#fees`,
  },
  {
    icon: "ClipboardList",
    title: "পরীক্ষার রুটিন",
    description: "পরীক্ষার সময়সূচি ও সংশ্লিষ্ট নির্দেশনা।",
    href: `${ROUTE_BASE}/results#routine`,
  },
  {
    icon: "Award",
    title: "ফলাফল",
    description: "কলেজ ও বোর্ড ফলাফল দেখার পথনির্দেশ।",
    href: `${ROUTE_BASE}/results`,
  },
  {
    icon: "FileBadge",
    title: "এডমিট কার্ড",
    description: "এডমিট কার্ড ডাউনলোড সেবার ডেমো স্থান।",
    href: `${ROUTE_BASE}/results#admit-card`,
  },
  {
    icon: "Files",
    title: "রেজিস্ট্রেশন",
    description: "রেজিস্ট্রেশন কার্ড ও সংশোধন নির্দেশনা।",
    href: `${ROUTE_BASE}/results#registration`,
  },
  {
    icon: "CalendarDays",
    title: "একাডেমিক ক্যালেন্ডার",
    description: "শিক্ষাবর্ষ পরিকল্পনা ও গুরুত্বপূর্ণ তারিখ।",
    href: `${ROUTE_BASE}/academic#calendar`,
  },
];

export const academicPrograms = [
  {
    id: "higher-secondary",
    title: "উচ্চমাধ্যমিক",
    authority: "যশোর শিক্ষা বোর্ড",
    description:
      "বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখায় নিয়মিত পাঠদান, পরীক্ষা প্রস্তুতি এবং শিক্ষার্থী সহায়তা।",
    points: ["বিজ্ঞান", "মানবিক", "ব্যবসায় শিক্ষা"],
  },
  {
    id: "degree",
    title: "ডিগ্রি",
    authority: "জাতীয় বিশ্ববিদ্যালয়, বাংলাদেশ",
    description:
      "জাতীয় বিশ্ববিদ্যালয়ের অধীনে স্নাতক পর্যায়ের পাঠক্রম, পরীক্ষা ও শিক্ষার্থী সহায়তা।",
    points: ["স্নাতক পর্যায়", "কোর্স নির্দেশনা", "পরীক্ষা সহায়তা"],
  },
  {
    id: "honours",
    title: "অনার্স",
    authority: "জাতীয় বিশ্ববিদ্যালয়, বাংলাদেশ",
    description:
      "মানবিক, সামাজিক বিজ্ঞান ও ব্যবসায় শিক্ষা সংশ্লিষ্ট অনার্স বিভাগসমূহের কাঠামো।",
    points: ["বিভাগভিত্তিক পাঠদান", "সেমিনার", "একাডেমিক পরামর্শ"],
  },
];

export const departments = [
  { icon: "BookOpenText", name: "বাংলা", description: "ভাষা, সাহিত্য ও সংস্কৃতির গভীর পাঠ।" },
  { icon: "Languages", name: "ইংরেজি", description: "ভাষা দক্ষতা, সাহিত্যপাঠ ও যোগাযোগ।" },
  { icon: "Landmark", name: "ইতিহাস", description: "সমাজ, সভ্যতা ও ইতিহাসচর্চা।" },
  {
    icon: "ScrollText",
    name: "ইসলামের ইতিহাস ও সংস্কৃতি",
    description: "ইসলামি ইতিহাস, সংস্কৃতি ও চিন্তার ধারাবাহিক পাঠ।",
  },
  { icon: "Brain", name: "দর্শন", description: "যুক্তি, নৈতিকতা ও জ্ঞানতত্ত্ব।" },
  { icon: "ChartNoAxesColumn", name: "অর্থনীতি", description: "অর্থনীতি, উন্নয়ন ও নীতি বিশ্লেষণ।" },
  { icon: "Scale", name: "রাষ্ট্রবিজ্ঞান", description: "রাষ্ট্র, শাসন ও নাগরিকতা বিষয়ে পাঠ।" },
  { icon: "HeartHandshake", name: "সমাজকর্ম", description: "মানবিক সেবা ও সামাজিক উন্নয়ন।" },
  { icon: "BriefcaseBusiness", name: "ব্যবস্থাপনা", description: "ব্যবস্থাপনা, নেতৃত্ব ও সংগঠনচর্চা।" },
  { icon: "Calculator", name: "হিসাববিজ্ঞান", description: "হিসাব, নিরীক্ষা ও আর্থিক প্রতিবেদন।" },
];

export const teacherGroups = [
  {
    title: "বিভাগীয় শিক্ষকবৃন্দ",
    description:
      "প্রতিটি বিভাগে শিক্ষক তালিকা, পদবি ও যোগাযোগ তথ্য পরবর্তীতে কর্তৃপক্ষের যাচাই অনুযায়ী যুক্ত করা যাবে।",
    status: "তথ্য হালনাগাদ প্রক্রিয়াধীন",
  },
  {
    title: "প্রশাসনিক শাখা",
    description:
      "অফিস সহায়তা, পরীক্ষা শাখা, ভর্তি শাখা ও শিক্ষার্থী সেবা একই ড্যাশবোর্ডে সাজানোর জন্য প্রস্তুত।",
    status: "তথ্য হালনাগাদ প্রক্রিয়াধীন",
  },
  {
    title: "একাডেমিক পরামর্শ",
    description:
      "শিক্ষার্থী কাউন্সেলিং, বিভাগীয় নোটিশ ও রুটিন ব্যবস্থাপনা ভবিষ্যৎ ব্যাকএন্ডের সঙ্গে সংযুক্ত করা যাবে।",
    status: "ডেমো কাঠামো",
  },
];

export const institutionalFacts = [
  { icon: "CalendarDays", label: "প্রতিষ্ঠার বছর", value: "১৯৬৯" },
  { icon: "BadgeCheck", label: "সরকারিকরণ", value: "১৯৮৯" },
  { icon: "Hash", label: "EIIN", value: "117166" },
  { icon: "MapPinned", label: "শিক্ষা বোর্ড", value: "যশোর" },
  { icon: "University", label: "অধিভুক্তি", value: "জাতীয় বিশ্ববিদ্যালয়" },
  { icon: "ShieldCheck", label: "প্রতিষ্ঠানের ধরন", value: "সরকারি কলেজ" },
];

export const facilities = [
  { icon: "LibraryBig", title: "লাইব্রেরি", description: "পাঠাভ্যাস ও রেফারেন্স ব্যবহারের জন্য নির্ধারিত সুবিধা।" },
  { icon: "FlaskConical", title: "বিজ্ঞানাগার", description: "বিজ্ঞান শিক্ষার ব্যবহারিক কার্যক্রমের সুবিধা।" },
  { icon: "Monitor", title: "কম্পিউটার সুবিধা", description: "ডিজিটাল শিক্ষা ও অনলাইন সেবার জন্য সহায়ক কাঠামো।" },
  { icon: "Presentation", title: "মাল্টিমিডিয়া শ্রেণিকক্ষ", description: "সমসাময়িক পাঠদান পদ্ধতি ব্যবহারের সুযোগ।" },
  { icon: "Sparkles", title: "সহশিক্ষা কার্যক্রম", description: "সংস্কৃতি, বিতর্ক, জাতীয় দিবস ও শিক্ষার্থী উদ্যোগ।" },
  { icon: "Trees", title: "খেলার মাঠ", description: "ক্রীড়া ও শারীরিক বিকাশের জন্য ক্যাম্পাস সুবিধা।" },
  { icon: "ShieldCheck", title: "নিরাপদ শিক্ষার পরিবেশ", description: "শৃঙ্খলা, সহমর্মিতা ও সম্মানভিত্তিক শিক্ষাঙ্গন।" },
];

export const newsEvents = [
  {
    image: `${ASSET_PATH}/official-campus-02.jpeg`,
    category: "আলোচনা সভা",
    date: "২৬ মে ২০২৫",
    title: "রবীন্দ্র ও নজরুল জয়ন্তী উপলক্ষে আলোচনা সভা",
    summary:
      "সাংস্কৃতিক ঐতিহ্য, সাহিত্যপাঠ ও শিক্ষার্থী অংশগ্রহণকে কেন্দ্র করে ক্যাম্পাস কার্যক্রম।",
  },
  {
    image: `${ASSET_PATH}/official-campus-04.jpeg`,
    category: "বৃক্ষরোপণ",
    date: "০৫ জুন ২০২৫",
    title: "বিশ্ব পরিবেশ দিবসে বৃক্ষরোপণ কর্মসূচি",
    summary:
      "পরিবেশ সচেতনতা ও সবুজ ক্যাম্পাস ভাবনাকে শিক্ষার্থীদের কাছে তুলে ধরার আয়োজন।",
  },
  {
    image: `${ASSET_PATH}/official-campus-05.jpg`,
    category: "শিক্ষার্থী কার্যক্রম",
    date: "ডেমো গ্যালারি",
    title: "ক্যাম্পাস দেয়ালচিত্র ও সৃজনশীল অংশগ্রহণ",
    summary:
      "নারীশিক্ষা, নিরাপত্তা ও সামাজিক সচেতনতার বার্তা নিয়ে শিক্ষার্থীবান্ধব কার্যক্রম।",
  },
];

export const galleryItems = [
  {
    image: `${ASSET_PATH}/official-campus-02.jpeg`,
    alt: "রবীন্দ্র ও নজরুল জয়ন্তী উপলক্ষে ক্যাম্পাস আলোচনা সভা",
    caption: "সাংস্কৃতিক আলোচনা সভা",
    album: "অনুষ্ঠান",
  },
  {
    image: `${ASSET_PATH}/official-campus-04.jpeg`,
    alt: "কলেজ ক্যাম্পাসে বৃক্ষরোপণ কর্মসূচি",
    caption: "বৃক্ষরোপণ কর্মসূচি",
    album: "ক্যাম্পাস",
  },
  {
    image: `${ASSET_PATH}/official-campus-05.jpg`,
    alt: "ক্যাম্পাস দেয়ালচিত্রে শিক্ষার্থী সচেতনতার বার্তা",
    caption: "দেয়ালচিত্র",
    album: "শিক্ষার্থী কার্যক্রম",
  },
  {
    image: `${ASSET_PATH}/official-campus-03.jpg`,
    alt: "অধ্যক্ষের কার্যালয়ের প্রাতিষ্ঠানিক দৃশ্য",
    caption: "অধ্যক্ষের কার্যালয়",
    album: "প্রশাসন",
  },
];

export const importantLinks = [
  { label: "শিক্ষা মন্ত্রণালয়", href: "https://moedu.gov.bd/" },
  { label: "মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর", href: "https://www.dshe.gov.bd/" },
  { label: "যশোর শিক্ষা বোর্ড", href: "https://www.jessoreboard.gov.bd/" },
  { label: "জাতীয় বিশ্ববিদ্যালয়", href: "https://www.nu.ac.bd/" },
  { label: "বাংলাদেশ শিক্ষা তথ্য ও পরিসংখ্যান ব্যুরো", href: "https://banbeis.gov.bd/" },
  { label: "অনলাইন ভর্তি", href: `${ROUTE_BASE}/admission`, internal: true },
  { label: "শিক্ষার্থী পেমেন্ট", href: `${ROUTE_BASE}/admission#fees`, internal: true },
];

export const admissionSteps = [
  "ভর্তি বিজ্ঞপ্তি ও যোগ্যতা ভালোভাবে পড়ুন",
  "প্রয়োজনীয় কাগজপত্র প্রস্তুত রাখুন",
  "নির্ধারিত প্রক্রিয়ায় আবেদন সম্পন্ন করুন",
  "ফি ও নিশ্চয়নের তথ্য কর্তৃপক্ষের নির্দেশনা অনুযায়ী অনুসরণ করুন",
];

export const resultServices = [
  { title: "পরীক্ষার রুটিন", id: "routine", description: "রুটিন প্রকাশ হলে বিভাগ ও শ্রেণি অনুযায়ী দেখা যাবে।" },
  { title: "ফলাফল", id: "results", description: "কলেজ পরীক্ষা ও বোর্ড ফলাফল দেখার নির্দেশনা।" },
  { title: "এডমিট কার্ড", id: "admit-card", description: "এডমিট কার্ড ডাউনলোড সেবা সংযুক্ত করার জন্য প্রস্তুত।" },
  { title: "রেজিস্ট্রেশন কার্ড", id: "registration", description: "রেজিস্ট্রেশন কার্ড ও সংশোধন নির্দেশনা।" },
];
