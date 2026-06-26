export const ROUTE_BASE = "/demo/pioneer-girls-college";
export const ASSET_PATH = "/demos/pioneer-girls-college";
export const OFFICIAL_SITE = "https://www.pioneergirlscollege.edu.bd";

export const studentPayLinks = {
  login: "https://pioneercollege.studentpay.net/login",
  applyFees: "https://pioneercollege.studentpay.net/apply-fees",
  onlineAdmission: "https://pioneercollege.studentpay.net/online-admission",
};

export const institution = {
  nameBn: "সরকারি পাইওনিয়ার মহিলা কলেজ",
  nameEn: "Govt. Pioneer Girls College, Khulna",
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
  address: "৬, সাউথ সেন্ট্রাল রোড, খুলনা-৯১০০",
  officePhone: "02-41110206",
  officialEmail: "girlscollegepioneer@gmail.com",
  identityNote:
    "খুলনার ঐতিহ্যবাহী সরকারি পাইওনিয়ার মহিলা কলেজ নারীশিক্ষা, উচ্চশিক্ষা ও মানবিক মূল্যবোধের বিকাশে দীর্ঘদিন ধরে গুরুত্বপূর্ণ ভূমিকা রেখে আসছে।",
  contact: {
    office: "কলেজ অফিস",
    phone: "02-41110206",
    email: "girlscollegepioneer@gmail.com",
    address: "৬, সাউথ সেন্ট্রাল রোড, খুলনা-৯১০০",
    mapUrl: "https://maps.app.goo.gl/pWxD4uQv2gRNSpTm7",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d400.2112610886933!2d89.56780367124469!3d22.810775467071686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff901feb938063%3A0xf843ced6888607e1!2sGovernment%20Pioneer%20Women%27s%20College%2C%20Khulna!5e0!3m2!1sen!2sbd!4v1782424577932!5m2!1sen!2sbd",
  },
};

// Confirm current office holder with college authority before production launch.
export const principal = {
  name: "প্রফেসর সালমা আরজু",
  designation: "অধ্যক্ষ",
  subject: "অধ্যাপক, উদ্ভিদবিজ্ঞান",
  image: `${ASSET_PATH}/principal-portrait.webp`,
  message:
    "নারীশিক্ষা, আত্মমর্যাদা, আত্মবিশ্বাস ও দায়িত্বশীল নাগরিকত্বের ভিত্তি শক্তিশালী করাই আমাদের লক্ষ্য। মানসম্মত শিক্ষা, নৈতিকতা ও মানবিক মূল্যবোধের মাধ্যমে শিক্ষার্থীদের জ্ঞান ও সুপ্ত প্রতিভা বিকাশে আমরা প্রতিশ্রুতিবদ্ধ।",
};

export const heroSlides = [
  {
    id: "heritage",
    eyebrow: "প্রতিষ্ঠিত ১৯৬৯",
    titleLineOne: "নারীশিক্ষা, জ্ঞান ও",
    titleHighlight: "আত্মমর্যাদার অঙ্গীকার",
    description:
      "সরকারি পাইওনিয়ার মহিলা কলেজ দীর্ঘদিন ধরে মানসম্মত শিক্ষা, নৈতিকতা ও আত্মবিশ্বাসের বিকাশে কাজ করে আসছে।",
    image: null,
    preferredImage: `${ASSET_PATH}/hero-campus-main.jpg`,
    fallback: "institutional",
    primaryAction: {
      label: "কলেজ সম্পর্কে জানুন",
      href: `${ROUTE_BASE}/about`,
    },
    secondaryAction: {
      label: "ভর্তি তথ্য",
      href: `${ROUTE_BASE}/admission`,
    },
  },
  {
    id: "academics",
    eyebrow: "উচ্চমাধ্যমিক, ডিগ্রি ও অনার্স",
    titleLineOne: "জ্ঞান ও দক্ষতার মাধ্যমে",
    titleHighlight: "উজ্জ্বল ভবিষ্যতের প্রস্তুতি",
    description:
      "আলোচনা সভা, পাঠ-সহায়ক আয়োজন ও বিভাগভিত্তিক একাডেমিক কার্যক্রমের মাধ্যমে শিক্ষার্থীদের উচ্চশিক্ষার জন্য প্রস্তুত করা হয়।",
    image: `${ASSET_PATH}/official-campus-02.jpeg`,
    primaryAction: {
      label: "একাডেমিক কার্যক্রম",
      href: `${ROUTE_BASE}/academic`,
    },
    secondaryAction: {
      label: "বিভাগসমূহ",
      href: `${ROUTE_BASE}/departments`,
    },
  },
  {
    id: "student-life",
    eyebrow: "শিক্ষা, সংস্কৃতি ও মূল্যবোধ",
    titleLineOne: "আত্মবিশ্বাসী ও দায়িত্বশীল",
    titleHighlight: "নারী নেতৃত্বের বিকাশ",
    description:
      "বৃক্ষরোপণ, পরিবেশ সচেতনতা ও সহশিক্ষা কার্যক্রমের সমন্বয়ে শিক্ষার্থীদের দায়িত্বশীল নেতৃত্বের গুণাবলি বিকাশ করা হয়।",
    image: `${ASSET_PATH}/official-campus-04.jpeg`,
    primaryAction: {
      label: "কলেজ কার্যক্রম",
      href: `${ROUTE_BASE}/gallery`,
    },
    secondaryAction: {
      label: "সর্বশেষ নোটিশ",
      href: `${ROUTE_BASE}/notices`,
    },
  },
];

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
      { label: "লাইব্রেরি", href: `${ROUTE_BASE}/academic#library` },
      { label: "বিভাগসমূহ", href: `${ROUTE_BASE}/departments` },
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
    id: "hsc-form-fillup-2026",
    category: "পরীক্ষা",
    title: "উচ্চ মাধ্যমিক পরীক্ষা-২০২৬ এর ফরম পূরণের বিজ্ঞপ্তি",
    publishedAt: "২৫ ফেব্রুয়ারি ২০২৬",
    sourceUrl: `${OFFICIAL_SITE}/all-notice`,
    urgent: true,
  },
  {
    id: "test-exam-result-2026",
    category: "ফলাফল",
    title: "দ্বাদশ নির্বাচনী পরীক্ষা-২০২৬ এর ফলাফল প্রকাশ",
    publishedAt: "২২ ফেব্রুয়ারি ২০২৬",
    sourceUrl: `${OFFICIAL_SITE}/all-notice`,
    urgent: true,
  },
  {
    id: "stipend-notice-2026",
    category: "বৃত্তি",
    title: "উপবৃত্তি সংক্রান্ত নোটিশ",
    publishedAt: "০৮ ফেব্রুয়ারি ২০২৬",
    sourceUrl: `${OFFICIAL_SITE}/all-notice`,
    urgent: false,
  },
  {
    id: "class-xi-stipend-form-2025-26",
    category: "বৃত্তি",
    title: "২০২৫-২৬ শিক্ষাবর্ষের একাদশ শ্রেণির উপবৃত্তির ফরম",
    publishedAt: "০৮ ফেব্রুয়ারি ২০২৬",
    sourceUrl: `${OFFICIAL_SITE}/all-notice`,
    urgent: false,
  },
  {
    id: "class-xi-half-yearly-routine-2026",
    category: "পরীক্ষা",
    title: "একাদশ শ্রেণির সর্বশেষ সংশোধিত অর্ধ-বার্ষিক পরীক্ষার রুটিন ২০২৬",
    publishedAt: "১১ জানুয়ারি ২০২৬",
    sourceUrl: `${OFFICIAL_SITE}/all-notice`,
    urgent: false,
  },
  {
    id: "class-xii-test-routine-2026",
    category: "পরীক্ষা",
    title: "সংশোধিত দ্বাদশ শ্রেণির নির্বাচনী পরীক্ষা ২০২৬-এর রুটিন",
    publishedAt: "১১ জানুয়ারি ২০২৬",
    sourceUrl: `${OFFICIAL_SITE}/all-notice`,
    urgent: false,
  },
  {
    id: "victory-day-program-2025",
    category: "অনুষ্ঠান",
    title: "মহান বিজয় দিবস উদযাপন উপলক্ষে অনুষ্ঠানের আয়োজনের বিজ্ঞপ্তি",
    publishedAt: "১৪ ডিসেম্বর ২০২৫",
    sourceUrl: `${OFFICIAL_SITE}/all-notice`,
    urgent: false,
  },
  {
    id: "degree-pass-form-fillup-2024",
    category: "পরীক্ষা",
    title: "২০২৪ সালের ডিগ্রি (পাস) ২য় বর্ষের পরীক্ষার্থীদের ফরম পূরণ সংক্রান্ত বিজ্ঞপ্তি",
    publishedAt: "১১ ডিসেম্বর ২০২৫",
    sourceUrl: `${OFFICIAL_SITE}/all-notice`,
    urgent: false,
  },
];

export const urgentNotices = notices.filter((notice) => notice.urgent);

export const quickServices = [
  {
    icon: "GraduationCap",
    title: "অনলাইন ভর্তি",
    description: "ভর্তি আবেদন ও প্রাথমিক নির্দেশনা।",
    href: studentPayLinks.onlineAdmission,
    external: true,
  },
  {
    icon: "UserRound",
    title: "শিক্ষার্থী লগইন",
    description: "StudentPay শিক্ষার্থী সেবা প্রবেশপথ।",
    href: studentPayLinks.login,
    external: true,
  },
  {
    icon: "CreditCard",
    title: "প্রাথমিক আবেদন ফি",
    description: "ভর্তি আবেদন ফি প্রদানের সেবা।",
    href: studentPayLinks.applyFees,
    external: true,
  },
  {
    icon: "ClipboardList",
    title: "পরীক্ষার রুটিন",
    description: "পরীক্ষার সময়সূচি ও নির্দেশনা।",
    href: `${ROUTE_BASE}/results#routine`,
  },
  {
    icon: "Award",
    title: "ফলাফল",
    description: "কলেজ ও বোর্ড ফলাফল নির্দেশনা।",
    href: `${ROUTE_BASE}/results`,
  },
  {
    icon: "FileBadge",
    title: "এডমিট কার্ড",
    description: "এডমিট কার্ড সম্পর্কিত সেবা।",
    href: `${ROUTE_BASE}/results#admit-card`,
  },
  {
    icon: "Files",
    title: "রেজিস্ট্রেশন",
    description: "রেজিস্ট্রেশন কার্ড ও সংশোধন নির্দেশনা।",
    href: `${ROUTE_BASE}/results#registration`,
  },
  {
    icon: "LibraryBig",
    title: "লাইব্রেরি",
    description: "লাইব্রেরি নিয়ম ও ব্যবহার নির্দেশনা।",
    href: `${ROUTE_BASE}/academic#library`,
  },
];

export const academicPrograms = [
  {
    id: "higher-secondary",
    title: "উচ্চমাধ্যমিক",
    authority: "যশোর শিক্ষা বোর্ড",
    description:
      "বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখায় পাঠদান, বিষয়ভিত্তিক প্রস্তুতি ও পরীক্ষামুখী একাডেমিক সহায়তা।",
    points: ["বিজ্ঞান", "মানবিক", "ব্যবসায় শিক্ষা"],
  },
  {
    id: "degree",
    title: "ডিগ্রি",
    authority: "জাতীয় বিশ্ববিদ্যালয়, বাংলাদেশ",
    description:
      "জাতীয় বিশ্ববিদ্যালয়ের অধীনে বি.এ., বি.এস.এস. ও বি.বি.এস. (পাস) কোর্সের একাডেমিক কার্যক্রম।",
    points: ["বি.এ. (পাস)", "বি.এস.এস. (পাস)", "বি.বি.এস. (পাস)"],
  },
  {
    id: "honours",
    title: "অনার্স",
    authority: "জাতীয় বিশ্ববিদ্যালয়, বাংলাদেশ",
    description:
      "মানবিক, সামাজিক বিজ্ঞান ও ব্যবসায় শিক্ষা সংশ্লিষ্ট অনার্স বিভাগসমূহে নিয়মিত পাঠদান।",
    points: ["বিভাগভিত্তিক পাঠদান", "সেমিনার", "একাডেমিক পরামর্শ"],
  },
];

// Reconfirm seat capacity with authority before production publication.
export const higherSecondary = {
  seats: [
    { group: "বিজ্ঞান", seats: "৩৫১" },
    { group: "মানবিক", seats: "২৮৫" },
    { group: "ব্যবসায় শিক্ষা", seats: "৪৭৮" },
  ],
  compulsorySubjects: [
    { subject: "বাংলা", code: "১০১, ১০২" },
    { subject: "ইংরেজি", code: "১০৭, ১০৮" },
    { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", code: "২৭৫" },
  ],
  scienceSubjects: [
    { subject: "পদার্থবিজ্ঞান", code: "১৭৪, ১৭৫" },
    { subject: "রসায়ন", code: "১৭৬, ১৭৭" },
    { subject: "জীববিজ্ঞান", code: "১৭৮, ১৭৯" },
    { subject: "উচ্চতর গণিত", code: "২৬৫, ২৬৬" },
  ],
  businessSubjects: [
    { subject: "ব্যবসায় সংগঠন ও ব্যবস্থাপনা", code: "২৭৭, ২৭৮" },
    { subject: "হিসাববিজ্ঞান", code: "২৫৩, ২৫৪" },
    { subject: "ফিন্যান্স, ব্যাংকিং ও বীমা", code: "২৯২, ২৯৩" },
    { subject: "উৎপাদন ব্যবস্থাপনা ও বিপণন", code: "২৮৬, ২৮৭" },
    { subject: "অর্থনীতি", code: "১০৯, ১১০" },
    { subject: "গার্হস্থ্য বিজ্ঞান", code: "২৭৩, ২৭৪" },
  ],
  humanitiesSubjects: [
    { subject: "ইতিহাস", code: "৩০৪, ৩০৫" },
    { subject: "ইসলামের ইতিহাস ও সংস্কৃতি", code: "২৬৭, ২৬৮" },
    { subject: "পৌরনীতি ও সুশাসন", code: "২৬৯, ২৭০" },
    { subject: "অর্থনীতি", code: "১০৯, ১১০" },
    { subject: "যুক্তিবিদ্যা", code: "১২১, ১২২" },
    { subject: "সমাজকর্ম", code: "২৭১, ২৭২" },
    { subject: "গার্হস্থ্য বিজ্ঞান", code: "২৭৩, ২৭৪" },
  ],
};

export const degreeCourses = [
  { course: "বি.এ. (পাস)", affiliatedAt: "১৬ মার্চ ১৯৯৯" },
  { course: "বি.এস.এস. (পাস)", affiliatedAt: "২৩ জুন ২০০০" },
  { course: "বি.বি.এস. (পাস)", affiliatedAt: "১৬ এপ্রিল ২০১২" },
];

export const honoursSeats = [
  { department: "ইতিহাস", seats: "৬৫" },
  { department: "ইসলামের ইতিহাস ও সংস্কৃতি", seats: "৬০" },
  { department: "সমাজকর্ম", seats: "৬০" },
  { department: "ইংরেজি", seats: "৬০" },
  { department: "অর্থনীতি", seats: "৬০" },
  { department: "দর্শন", seats: "৬৫" },
  { department: "রাষ্ট্রবিজ্ঞান", seats: "১২০" },
  { department: "ব্যবস্থাপনা", seats: "১২০" },
  { department: "হিসাববিজ্ঞান", seats: "১২০" },
  { department: "বাংলা", seats: "১২০" },
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

export const teachers = [
  { name: "KRISHNA PADA MONDAL (কৃষ্ণ পদ মণ্ডল)", designation: "অধ্যাপক", department: "হিসাব বিজ্ঞান" },
  { name: "MOSSAMMAD MORIUM KHANOM (মোসাম্মৎ মরিয়ম খানম)", designation: "অধ্যাপক", department: "রাষ্ট্রবিজ্ঞান" },
  { name: "GAZI IQBAL MAHAMUD (গাজী ইকবাল মাহমুদ)", designation: "অধ্যাপক", department: "ইসলামের ইতিহাস ও সংস্কৃতি" },
  { name: "MD. ABU HANIF ANSARI (মোঃ আবু হানিফ আনসারী)", designation: "অধ্যাপক", department: "পদার্থবিদ্যা" },
  { name: "SHYAMAL KUMAR DAS (শ্যামল কুমার দাশ)", designation: "অধ্যাপক", department: "গণিত" },
  { name: "MUHAMMAD ABDUS SAMAD (মোহাম্মাদ আব্দুস সামাদ)", designation: "অধ্যাপক", department: "ইংরেজি" },
  { name: "MD. SHAMIM HOSSAIN (মোঃ শামীম হোসেন)", designation: "অধ্যাপক", department: "রাষ্ট্রবিজ্ঞান" },
  { name: "MOHAMMAD ZAKIR HOSSEN (মোহাম্মদ জাকির হোসেন)", designation: "সহযোগী অধ্যাপক", department: "ব্যবস্থাপনা" },
  { name: "APARNA SAHA (অপর্না সাহা)", designation: "সহযোগী অধ্যাপক", department: "গণিত" },
  { name: "MD. SHAMIM AZAD (মোঃ শামীম আজাদ)", designation: "সহযোগী অধ্যাপক", department: "ইসলামের ইতিহাস ও সংস্কৃতি" },
  { name: "MAHITOSH KUMAR BISWAS (মহিতোষ কুমার বিশ্বাস)", designation: "সহযোগী অধ্যাপক", department: "বাংলা" },
  { name: "SOMA GHOSH (সোমা ঘোষ)", designation: "সহযোগী অধ্যাপক", department: "বাংলা" },
  { name: "MOHANONDO BISWAS (মহানন্দ বিশ্বাস)", designation: "সহযোগী অধ্যাপক", department: "রসায়ন" },
  { name: "DR. MD. MOKARROM HOSSAN (ড. মোঃ মোকাররম হোসেন)", designation: "সহযোগী অধ্যাপক", department: "ইতিহাস" },
  { name: "SHEIKH SHAWKAT HOSSAIN (শেখ শওকত হোসেন)", designation: "সহযোগী অধ্যাপক", department: "দর্শন" },
  { name: "A.B.M. HASANUZZAMAN (এ,বি,এম, হাসানুজ্জামান)", designation: "সহযোগী অধ্যাপক", department: "বাংলা" },
  { name: "SHAIKH AHASANUL HAQUE (শেখ আহ্সানুল হক)", designation: "সহযোগী অধ্যাপক", department: "হিসাব বিজ্ঞান" },
  { name: "LUTFUN NAHAR (লুৎফুন নাহার)", designation: "সহযোগী অধ্যাপক", department: "প্রাণীবিদ্যা" },
  { name: "JOYANTI GOSWAMI (জয়ন্তী গোস্বামী)", designation: "সহযোগী অধ্যাপক", department: "অর্থনীতি" },
  { name: "MD. RAKIBUL HASAN (মোঃ রকিবুল হাসান)", designation: "সহকারী অধ্যাপক", department: "সমাজকর্ম" },
  { name: "PROKASH KUMAR KUNDU (প্রকাশ কুমার কুন্ডু)", designation: "সহকারী অধ্যাপক", department: "গণিত" },
  { name: "SIKDER HABIBUR RAHMAN (শিকদার হাবিবুর রহমান)", designation: "সহকারী অধ্যাপক", department: "ইংরেজি" },
  { name: "MD. ABDULLAH AL MAMUN (মোঃ আব্দুল্লাহ আল মামুন)", designation: "সহকারী অধ্যাপক", department: "দর্শন" },
  { name: "TRIPTI BISWAS (তৃপ্তি বিশ্বাস)", designation: "সহকারী অধ্যাপক", department: "পদার্থবিদ্যা" },
  { name: "KHALEDA NASRIN (খালেদা নাসরিন)", designation: "সহকারী অধ্যাপক", department: "দর্শন" },
  { name: "PURABI RAJBANSHI (পূরবী রাজবংশী)", designation: "সহকারী অধ্যাপক", department: "সমাজকর্ম" },
  { name: "SHIMUL RANI BAKCHI (শিমুল রাণী বাকচী)", designation: "সহকারী অধ্যাপক", department: "সমাজকর্ম" },
  { name: "SNIGDHA RAY (স্নিগ্ধা রায়)", designation: "সহকারী অধ্যাপক", department: "অর্থনীতি" },
  { name: "MD. FIROZ ALAM (মোঃ ফিরোজ আলম)", designation: "সহকারী অধ্যাপক", department: "বাংলা" },
  { name: "MANOSI RANI BISWAS (মানসী রাণী বিশ্বাস)", designation: "সহকারী অধ্যাপক", department: "ব্যবস্থাপনা" },
  { name: "MEHJABIN AFROZ (মেহজাবিন আফরোজ)", designation: "সহকারী অধ্যাপক", department: "রসায়ন" },
  { name: "Shewli Khatun (শিউলী খাতুন)", designation: "সহকারী অধ্যাপক", department: "ইতিহাস" },
  { name: "MAHADI HASAN BAPPY (মেহেদি হাসান বাপ্পি)", designation: "সহকারী অধ্যাপক", department: "অর্থনীতি" },
  { name: "MITALI SIKDAR (মিতালী শিকদার)", designation: "সহকারী অধ্যাপক", department: "রাষ্ট্রবিজ্ঞান" },
  { name: "MINA AKTER (মিনা আক্তার)", designation: "সহকারী অধ্যাপক", department: "রাষ্ট্রবিজ্ঞান" },
  { name: "Md Abdul Halim (মোঃ আব্দুল হালিম)", designation: "প্রভাষক", department: "পদার্থবিদ্যা" },
  { name: "MD. IMRAN GAZI (মোঃ ইমরান গাজী)", designation: "প্রভাষক", department: "ইসলামের ইতিহাস ও সংস্কৃতি" },
  { name: "Rokonuzzaman (রোকনুজ্জামান)", designation: "প্রভাষক", department: "ইংরেজি" },
];

export const historyTimeline = [
  { year: "১৯৬৯", title: "প্রতিষ্ঠা", description: "খুলনায় নারীশিক্ষা বিস্তারের লক্ষ্যে প্রতিষ্ঠানটির পথচলা শুরু।" },
  { year: "উচ্চমাধ্যমিক", title: "শিক্ষা কার্যক্রমের বিস্তার", description: "যশোর শিক্ষা বোর্ডের অধীনে উচ্চমাধ্যমিক শিক্ষা কার্যক্রম সুসংগঠিত হয়।" },
  { year: "১৯৮৯", title: "সরকারিকরণ", description: "সরকারিকরণের মাধ্যমে কলেজের প্রাতিষ্ঠানিক ভিত্তি আরও দৃঢ় হয়।" },
  { year: "স্নাতক", title: "জাতীয় বিশ্ববিদ্যালয়ের অধীনে শিক্ষা", description: "ডিগ্রি ও অনার্স পর্যায়ের পাঠক্রম জাতীয় বিশ্ববিদ্যালয়ের অধীনে পরিচালিত হয়।" },
  { year: "বর্তমান", title: "নারীশিক্ষায় ভূমিকা", description: "আত্মমর্যাদা, নৈতিকতা ও দায়িত্বশীল নাগরিকত্বের চর্চায় প্রতিষ্ঠানটি কাজ করে যাচ্ছে।" },
];

export const institutionalFacts = [
  { icon: "CalendarDays", label: "প্রতিষ্ঠার বছর", value: "১৯৬৯" },
  { icon: "BadgeCheck", label: "সরকারিকরণ", value: "১৯৮৯" },
  { icon: "Hash", label: "EIIN", value: "117166" },
  { icon: "MapPinned", label: "শিক্ষা বোর্ড", value: "যশোর" },
  { icon: "University", label: "অধিভুক্তি", value: "জাতীয় বিশ্ববিদ্যালয়" },
  { icon: "ShieldCheck", label: "প্রতিষ্ঠানের ধরন", value: "সরকারি কলেজ" },
];

export const libraryInfo = [
  "একাডেমিক ও সাধারণ বইয়ের সংগ্রহ শিক্ষার্থীদের পাঠাভ্যাস ও রেফারেন্স ব্যবহারে সহায়তা করে।",
  "দৈনিক পত্রিকা পড়ার সুবিধা রয়েছে।",
  "লাইব্রেরি কার্ডের জন্য ভর্তি রশিদ ও এক কপি পাসপোর্ট-সাইজ ছবি প্রয়োজন।",
  "সাধারণত সাত দিনের জন্য বই প্রদান করা হয়।",
  "ফরম পূরণ বা কলেজ ছাড়ার আগে ধারকৃত বই ফেরত দেওয়া বাধ্যতামূলক।",
  "বই হারালে নতুন বই প্রদান অথবা দ্বিগুণ মূল্য পরিশোধের নিয়ম প্রযোজ্য।",
];

export const facilities = [
  { icon: "LibraryBig", title: "লাইব্রেরি", description: "একাডেমিক বই, সাধারণ বই ও দৈনিক পত্রিকার সুবিধা।", href: `${ROUTE_BASE}/academic#library` },
  { icon: "FlaskConical", title: "বিজ্ঞানাগার", description: "বিজ্ঞান শিক্ষার ব্যবহারিক কার্যক্রমের সুবিধা।" },
  { icon: "Monitor", title: "কম্পিউটার সুবিধা", description: "ডিজিটাল শিক্ষা ও অনলাইন সেবা ব্যবহারে সহায়ক ব্যবস্থা।" },
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
    summary: "সাহিত্য, সংস্কৃতি ও শিক্ষার্থী অংশগ্রহণের সমন্বয়ে ক্যাম্পাস আয়োজন।",
  },
  {
    image: `${ASSET_PATH}/official-campus-04.jpeg`,
    category: "বৃক্ষরোপণ",
    date: "০৫ জুন ২০২৫",
    title: "বিশ্ব পরিবেশ দিবসে বৃক্ষরোপণ কর্মসূচি",
    summary: "পরিবেশ সচেতনতা ও সবুজ ক্যাম্পাস ভাবনাকে এগিয়ে নেওয়ার উদ্যোগ।",
  },
  {
    image: `${ASSET_PATH}/official-campus-02.jpeg`,
    category: "শিক্ষার্থী কার্যক্রম",
    date: "গ্যালারি",
    title: "শিক্ষার্থী অংশগ্রহণমূলক ক্যাম্পাস আয়োজন",
    summary: "সাহিত্য, সংস্কৃতি ও সামাজিক সচেতনতার মাধ্যমে শিক্ষার্থীদের সক্রিয় অংশগ্রহণ।",
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
    alt: "ক্যাম্পাস দেয়ালচিত্রে সচেতনতামূলক বার্তা",
    caption: "সচেতনতামূলক দেয়ালচিত্র",
    album: "শিক্ষার্থী কার্যক্রম",
  },
];

export const importantLinks = [
  { label: "শিক্ষা মন্ত্রণালয়", href: "https://moedu.gov.bd/" },
  { label: "মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর", href: "https://www.dshe.gov.bd/" },
  { label: "যশোর শিক্ষা বোর্ড", href: "https://www.jessoreboard.gov.bd/" },
  { label: "জাতীয় বিশ্ববিদ্যালয়", href: "https://www.nu.ac.bd/" },
  { label: "অনলাইন ভর্তি", href: studentPayLinks.onlineAdmission, external: true },
  { label: "শিক্ষার্থী পেমেন্ট", href: studentPayLinks.login, external: true },
];

export const admissionSteps = [
  "ভর্তি বিজ্ঞপ্তি ও যোগ্যতা ভালোভাবে পড়ুন।",
  "প্রয়োজনীয় কাগজপত্র প্রস্তুত রাখুন।",
  "অনলাইন ভর্তি পোর্টালে আবেদন সম্পন্ন করুন।",
  "প্রাথমিক আবেদন ফি StudentPay সেবার মাধ্যমে পরিশোধ করুন।",
  "কলেজের নির্দেশনা অনুযায়ী চূড়ান্ত ভর্তি সম্পন্ন করুন।",
];

export const resultServices = [
  { title: "পরীক্ষার রুটিন", id: "routine", description: "শ্রেণি ও পরীক্ষাভিত্তিক রুটিন প্রকাশ হলে নোটিশ বোর্ডে দেখা যাবে।" },
  { title: "ফলাফল", id: "results", description: "কলেজ পরীক্ষা ও বোর্ড ফলাফলের নির্দেশনা নোটিশের মাধ্যমে প্রকাশ করা হয়।" },
  { title: "এডমিট কার্ড", id: "admit-card", description: "এডমিট কার্ড সংক্রান্ত তথ্য নির্ধারিত সময়ে প্রকাশ করা হয়।" },
  { title: "রেজিস্ট্রেশন কার্ড", id: "registration", description: "রেজিস্ট্রেশন কার্ড ও সংশোধন নির্দেশনা সংশ্লিষ্ট নোটিশে পাওয়া যাবে।" },
];
