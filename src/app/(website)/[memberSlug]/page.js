import Link from "next/link";
import { notFound } from "next/navigation";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineBriefcase,
  HiOutlineCode,
  HiOutlineDesktopComputer,
  HiOutlineDownload,
  HiOutlineExternalLink,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineSparkles,
  HiOutlineSupport,
} from "react-icons/hi";
import projects from "@/data/projects";
import siteConfig from "@/theme/siteConfig";
import Footer from "@/components/layout/Footer";

const socialIconMap = {
  facebook: FaFacebookF,
  github: FaGithub,
  linkedin: FaLinkedinIn,
  mail: HiOutlineMail,
};

const salekProfile = {
  badge: "Founder Profile",
  title: "Full-Stack Software Engineer & Founder",
  intro:
    "KUET CSE undergraduate building scalable Flutter, Next.js, and backend solutions with clean architecture, modern UI, and strong problem-solving fundamentals.",
  email: "alifsalek.as@gmail.com",
  cvUrl: "/files/salek-cv.pdf",
  about: [
    "I am a CSE undergraduate from KUET and a software engineer focused on building practical digital products. My work covers web applications, mobile apps, backend systems, and clean user-focused interfaces.",
    "I am also the Founder of Effy Tech, where I work on software solutions for businesses, institutions, and startups. My background in competitive programming helps me approach problems with strong logic, structure, and efficiency.",
  ],
  contactIntro:
    "I am open to software development opportunities, collaborations, freelance projects, and technical discussions.",
  socials: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/arviman019",
      icon: FaFacebookF,
    },
    {
      label: "GitHub",
      href: "https://github.com/Arvi-Saleque",
      icon: FaGithub,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/salek-bin-hossain/",
      icon: FaLinkedinIn,
    },
    { label: "Codeforces", href: "/coming-soon", icon: HiOutlineCode },
    { label: "CodeChef", href: "/coming-soon", icon: HiOutlineCode },
    {
      label: "Email",
      href: "mailto:alifsalek.as@gmail.com",
      icon: HiOutlineMail,
    },
  ],
  stats: [
    { value: "1619", label: "Codeforces Peak" },
    { value: "39th", label: "ICPC Asia Dhaka" },
    { value: "2K+", label: "Problems Solved" },
    { value: "1K+", label: "Amal Tracker Users" },
  ],
  skills: [
    {
      title: "Frontend",
      items: [
        "React",
        "Next.js",
        "Angular",
        "Tailwind CSS",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
      ],
    },
    {
      title: "Mobile",
      items: ["Flutter", "Dart", "Android"],
    },
    {
      title: "Backend",
      items: [".NET Core", "FastAPI", "REST API", "Node.js", "Express", "PHP"],
    },
    {
      title: "Database",
      items: ["Firebase", "MS SQL Server", "MySQL", "MongoDB"],
    },
    {
      title: "Tools",
      items: [
        "Git",
        "GitHub",
        "Android Studio",
        "Postman",
        "Swagger",
        "Figma",
        "VS Code",
        "Vercel",
        "Render",
        "CI/CD",
      ],
    },
    {
      title: "Core Skills",
      items: [
        "Data Structures",
        "Algorithms",
        "Problem Solving",
        "Graph Theory",
        "Optimization",
        "System Design Basics",
        "Clean Architecture",
        "Offline Sync",
        "API Integration",
        "Responsive UI Design",
      ],
    },
  ],
  experience: [
    {
      role: "Founder & Lead Software Architect",
      company: "Effy Tech",
      period: "Jan 2025 - Present",
      points: [
        "Spearhead end-to-end delivery of mobile and web products.",
        "Architect scalable systems using Next.js, Flutter, Firebase, and MongoDB.",
        "Lead technical direction with emphasis on maintainable codebases and responsive UI.",
        "Manage product planning, UI direction, implementation, testing, and deployment.",
      ],
    },
  ],
  includeCompanyProjects: true,
  extraProjects: [
    {
      title: "Effy Tech Website",
      type: "Company Website / Next.js Project",
      description:
        "A premium company website for Effy Tech with services, portfolio, team, and contact flow.",
      stack: ["Next.js", "React", "Tailwind CSS"],
      role: "Founder & Developer",
      features: [
        "Responsive landing page",
        "Project showcase",
        "Team profiles",
      ],
      liveUrl: "/",
      githubUrl: "/coming-soon",
    },
    {
      title: "Money Tracker",
      type: "Personal Finance App",
      description:
        "A finance tracking app concept focused on expense records, summaries, and simple budgeting.",
      stack: ["Flutter", "Dart", "Firebase"],
      role: "App Developer",
      features: ["Expense tracking", "Category summaries", "Clean mobile UI"],
      liveUrl: "/coming-soon",
      githubUrl: "/coming-soon",
    },
    {
      title: "Code Chase",
      type: "Flutter Learning / Coding Project",
      description:
        "A competitive programming tracker for logging solving history and visualizing progress.",
      stack: ["Flutter", "Dart", "Firebase"],
      role: "App Developer",
      features: ["Solve history", "Progress analytics", "Friend comparison"],
      liveUrl: "/coming-soon",
      githubUrl: "/coming-soon",
    },
    {
      title: "Tajweed Runner",
      type: "Game + Pronunciation System",
      description:
        "An experimental learning game combining interactive mechanics with pronunciation practice.",
      stack: ["Flutter", "Dart"],
      role: "Developer",
      features: ["Game mechanics", "Learning system", "Pronunciation practice"],
      liveUrl: "/coming-soon",
      githubUrl: "/coming-soon",
    },
  ],
  competitive: [
    {
      title: "Codeforces Expert",
      description: "Peak rating 1619 with strong algorithmic background.",
    },
    {
      title: "CodeChef 4-Star",
      description: "Consistent competitive programming performance.",
    },
    {
      title: "ICPC Asia Dhaka Regional - 39th",
      description: "Ranked 39th in a regional-level team programming contest.",
    },
    {
      title: "2000+ Problems Solved",
      description: "Across online judges and programming platforms.",
    },
    {
      title: "BUET IUPC - 29th",
      description: "Placed 29th in a national-level programming contest.",
    },
    {
      title: "NWU Champion",
      description: "Champion in competitive programming contest participation.",
    },
  ],
  education: {
    degree: "B.Sc. in Computer Science and Engineering",
    institution: "Khulna University of Engineering & Technology - KUET",
    focus:
      "Software engineering, algorithms, web development, mobile development, and product-focused software delivery.",
    previous: "Notre Dame College - Higher Secondary Certificate (GPA 5.00)",
  },
  achievements: [
    "Codeforces Expert - Peak 1619",
    "CodeChef 4-Star Coder",
    "ICPC Asia Dhaka Regional - 39th",
    "ISCPC National Runner-up",
    "BUET IUPC - 29th",
    "Founder of Effy Tech",
    "Former President, Programming Department, NDITC",
    "Judge, Notre Dame FTMPC",
    "Mentor, Srinivasa Ramanujan Math Club",
  ],
  services: [
    {
      title: "Web Development",
      description:
        "Modern websites, landing pages, dashboards, and web applications.",
      icon: HiOutlineDesktopComputer,
    },
    {
      title: "Mobile App Development",
      description: "Flutter-based Android and cross-platform mobile apps.",
      icon: HiOutlinePhone,
    },
    {
      title: "Backend & API Development",
      description:
        "REST APIs, database integration, authentication, and backend logic.",
      icon: HiOutlineCode,
    },
    {
      title: "Software Problem Solving",
      description:
        "Efficient solutions using algorithms and structured thinking.",
      icon: HiOutlineSparkles,
    },
  ],
};

const adnanProfile = {
  badge: "Co-Founder Profile",
  title: "Software Engineer & Full-Stack Developer",
  intro:
    "Software Engineering undergraduate at the University of Dhaka IIT with a strong full-stack background across React, Node.js, FastAPI, ASP.NET Core, databases, testing, and developer tooling.",
  email: "bsse1442@iit.du.ac.bd",
  cvUrl: "/files/adnan-cv.pdf",
  about: [
    "I am a Software Engineering student at the Institute of Information Technology, University of Dhaka, with a CGPA of 3.90 to date and a focus on building reliable, scalable software systems.",
    "My work spans AI-assisted developer tools, archival management systems, educational platforms, distributed ride-sharing, and security-focused C/C++ projects, backed by hands-on internship experience at Kaz Software Limited.",
  ],
  contactIntro:
    "I am open to software engineering roles, full-stack development work, research-driven projects, and technical collaborations.",
  socials: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/adnan08072/",
      icon: FaFacebookF,
    },
    {
      label: "GitHub",
      href: "https://github.com/adnan-bin-wahid",
      icon: FaGithub,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/adnan-bin-wahid/",
      icon: FaLinkedinIn,
    },
    {
      label: "Email",
      href: "mailto:bsse1442@iit.du.ac.bd",
      icon: HiOutlineMail,
    },
    { label: "Phone", href: "tel:+8801567937800", icon: HiOutlinePhone },
  ],
  stats: [
    { value: "3.90", label: "DU IIT CGPA" },
    { value: "55K+", label: "Records Migrated" },
    { value: "Top 13", label: "BUET CSE Fest" },
    { value: "3rd RU", label: "SN Bose Hackathon" },
  ],
  skills: [
    {
      title: "Programming",
      items: ["C", "C++", "Python", "JavaScript", "TypeScript", "Java", "C#"],
    },
    {
      title: "Frontend",
      items: ["React.js", "Angular", "Tailwind CSS", "VS Code API"],
    },
    {
      title: "Backend",
      items: [
        "Node.js",
        "Express.js",
        "FastAPI",
        "ASP.NET Core",
        "Spring Boot",
        "Sequelize",
      ],
    },
    {
      title: "Database",
      items: ["PostgreSQL", "MySQL", "MongoDB", "MS SQL Server", "SQLite"],
    },
    {
      title: "Testing & Build",
      items: ["JUnit", "JaCoCo", "Mutation Testing", "Maven", "Selenium"],
    },
    {
      title: "Tools & Platforms",
      items: [
        "Git",
        "GitHub",
        "Docker",
        "Swagger",
        "Postman",
        "Wireshark",
        "Nginx",
        "Vercel",
        "Render",
      ],
    },
  ],
  experience: [
    {
      role: "Software Engineer Intern",
      company: "Kaz Software Limited",
      period: "Oct 2025 - Mar 2026",
      points: [
        "Built frontend and backend features for JTI, Veny, and Virus Shield using Angular, .NET Core, MS SQL Server, and REST APIs.",
        "Delivered responsive user interfaces, scalable application functionality, and RAG-based systems to improve retrieval quality and support data-driven features.",
        "Worked in an Agile Scrum environment with Git, GitHub, Postman, Swagger, and VS Code while collaborating with team members to ship features on time.",
      ],
    },
    {
      role: "Assistant General Secretary",
      company: "IIT Software Engineers' Community",
      period: "Jun 2025 - Present",
      points: [
        "Contributes to community leadership, coordination, and software engineering activities at IIT, University of Dhaka.",
      ],
    },
  ],
  includeCompanyProjects: false,
  extraProjects: [
    {
      title: "RepoAlign",
      type: "AI Developer Tool / VS Code Extension",
      description:
        "An AI-driven semantic consistency checker for repository-wide code intelligence and architectural validation.",
      stack: [
        "TypeScript",
        "VS Code API",
        "Python",
        "FastAPI",
        "SQLite",
        "Sentence-Transformer",
        "ts-morph",
        "Z3",
      ],
      role: "Developer",
      features: [
        "AST-based repository analysis",
        "Semantic indexing and retrieval",
        "Cross-file dependency modeling",
      ],
      liveUrl: "/coming-soon",
      githubUrl: "https://github.com/adnan-bin-wahid/repoalign-vscode",
    },
    {
      title: "Liberation War Museum Archival System",
      type: "Archival Management Platform",
      description:
        "A scalable system for migrating oral history records and artifacts from documents into a centralized searchable database.",
      stack: ["ReactJS", "NodeJS", "Express.js", "PostgreSQL", "Sequelize"],
      role: "Full-Stack Developer",
      features: [
        "55,000 oral history record migration",
        "33,000 artifact database",
        "Automated tagging and categorization",
      ],
      liveUrl: "/coming-soon",
      githubUrl: "https://github.com/adnan-bin-wahid/LWM-Management-System.git",
    },
    {
      title: "Shikhon360",
      type: "Interactive Educational Platform",
      description:
        "A learning platform with STEM simulations, AI tutoring, multilingual text-to-speech, and research collaboration features.",
      stack: [
        "React.js",
        "Node.js",
        "MongoDB",
        "Express.js",
        "Azure TTS",
        "Google Generative AI",
      ],
      role: "Co-Developer",
      features: ["STEM simulations", "AI tutoring", "Multilingual TTS support"],
      liveUrl: "/coming-soon",
      githubUrl: "https://github.com/adnan-bin-wahid/SNBoseHack.git",
    },
    {
      title: "Gontobbo",
      type: "Distributed Ride-Sharing System",
      description:
        "A scalable ride-sharing app with geolocation, fare estimation, authentication, REST APIs, and containerized services.",
      stack: ["React", "MongoDB", "NodeJS", "JWT", "Docker"],
      role: "Full-Stack Developer",
      features: [
        "Geolocation and fare estimation",
        "JWT authentication",
        "Microservice-oriented ride handling",
      ],
      liveUrl: "/coming-soon",
      githubUrl: "https://github.com/adnan-bin-wahid/Gontobbo.git",
    },
    {
      title: "HashStego Vault",
      type: "Security / Steganography Project",
      description:
        "A C/C++ project using image steganography and cryptographic hashing to embed, transfer, and verify data integrity.",
      stack: ["C", "C++"],
      role: "Developer",
      features: [
        "Image steganography",
        "Cryptographic hashing",
        "Integrity verification",
      ],
      liveUrl: "/coming-soon",
      githubUrl: "https://github.com/adnan-bin-wahid/HashStegoVault.git",
    },
  ],
  competitive: [
    {
      title: "Semantic Code Intelligence",
      description:
        "Built RepoAlign around AST analysis, semantic retrieval, and repository-level consistency checking.",
    },
    {
      title: "Full-Stack Product Systems",
      description:
        "Worked across frontend, backend, database, authentication, APIs, deployment, and developer workflow tooling.",
    },
    {
      title: "Data Migration at Scale",
      description:
        "Helped modernize archival workflows around tens of thousands of historical records and artifacts.",
    },
    {
      title: "Testing-Oriented Development",
      description:
        "Uses JUnit, JaCoCo, mutation testing, Maven, and Selenium for stronger software quality practices.",
    },
  ],
  education: {
    degree: "B.Sc. in Software Engineering",
    institution: "Institute of Information Technology, University of Dhaka",
    focus:
      "CGPA 3.90 to date, with expected graduation in September 2026 and a focus on software engineering, full-stack systems, databases, testing, and applied AI tools.",
    previous:
      "Notre Dame College - HSC in Science (GPA 5.00, 2021); Hasan Ali Government High School, Chandpur - SSC in Science (GPA 5.00, 2019)",
  },
  achievements: [
    "Software Engineer Intern at Kaz Software Limited",
    "Assistant General Secretary, IIT Software Engineers' Community",
    "Finalist, BUET CSE Fest 2025 Poster Presentation - Top 13 out of 121+ teams",
    "3rd Runner-Up, SN Bose Hackathon - National level competition with 80+ teams",
    "Built RepoAlign, an AI-driven semantic consistency checker",
    "Migrated and organized large-scale archival records for Liberation War Museum",
  ],
  services: [
    {
      title: "Full-Stack Development",
      description:
        "React, Angular, Node.js, Express.js, FastAPI, ASP.NET Core, and database-backed application development.",
      icon: HiOutlineDesktopComputer,
    },
    {
      title: "Backend & API Systems",
      description:
        "REST APIs, authentication, SQL and NoSQL data modeling, backend integrations, and scalable service logic.",
      icon: HiOutlineCode,
    },
    {
      title: "Developer Tooling",
      description:
        "VS Code extensions, semantic code analysis, repository intelligence, and workflow automation.",
      icon: HiOutlineSparkles,
    },
    {
      title: "Testing & Quality",
      description:
        "Unit testing, coverage analysis, mutation testing, Selenium automation, and maintainable delivery practices.",
      icon: HiOutlineSupport,
    },
  ],
};

const saifProfile = {
  badge: "Co-Founder Profile",
  title: "CSE Undergraduate & Software Developer",
  intro:
    "KUET CSE undergraduate building practical software products across Flutter, Laravel, JavaFX, IoT systems, and full-stack web development.",
  email: "abdullahalsaif17313@gmail.com",
  cvUrl: "/files/saif-cv.pdf",
  about: [
    "I am a Computer Science and Engineering student at Khulna University of Engineering & Technology with a strong interest in software development, artificial intelligence, and product building.",
    "My work includes mobile apps, Laravel systems, JavaFX applications, IoT-integrated tracking, and game development, supported by active technical leadership in IEEE KUET Student Branch, SGIPC, and HACK KUET.",
  ],
  contactIntro:
    "I am open to software development work, product collaborations, IoT-based systems, and technical leadership opportunities.",
  socials: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/saif17313.remian6501",
      icon: FaFacebookF,
    },
    {
      label: "GitHub",
      href: "https://github.com/saif17313",
      icon: FaGithub,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/abdullahalsaif2107017/",
      icon: FaLinkedinIn,
    },
    {
      label: "Email",
      href: "mailto:abdullahalsaif17313@gmail.com",
      icon: HiOutlineMail,
    },
    { label: "Phone", href: "tel:+8801511190270", icon: HiOutlinePhone },
  ],
  stats: [
    { value: "3.76", label: "KUET CGPA" },
    { value: "Silver", label: "IEEE R10 Award" },
    { value: "1st RU", label: "Math Olympiad" },
    { value: "4+", label: "Selected Projects" },
  ],
  skills: [
    {
      title: "Languages",
      items: [
        "C",
        "C++",
        "Python",
        "Java",
        "JavaScript",
        "PHP",
        "C#",
        "Dart",
        "Assembly",
      ],
    },
    {
      title: "Frameworks",
      items: [
        "Flutter",
        "Laravel",
        "JavaFX",
        "Tailwind CSS",
        "Bootstrap",
        "ASP.NET Web Forms",
      ],
    },
    {
      title: "Databases",
      items: ["MySQL", "PostgreSQL", "Oracle", "Firebase", "Supabase"],
    },
    {
      title: "Tools",
      items: [
        "Android Studio",
        "Git",
        "GitHub",
        "VS Code",
        "Postman",
        "Jira",
        "ClickUp",
      ],
    },
    {
      title: "Core Skills",
      items: [
        "REST APIs",
        "IoT Integration",
        "GPS/GSM Systems",
        "Responsive UI Development",
        "Mobile App Development",
        "Product Building",
      ],
    },
    {
      title: "Interests",
      items: [
        "Software Development",
        "Artificial Intelligence",
        "Game Development",
        "Full-Stack Development",
      ],
    },
  ],
  experience: [
    {
      role: "Co-Founder",
      company: "Effy Tech",
      period: "Mar 2026 - Present",
      points: [
        "Contributes to product planning, technical execution, and software delivery across Effy Tech projects.",
        "Works across mobile, web, backend, and product-focused implementation with an emphasis on practical user experience.",
      ],
    },
    {
      role: "Publication Secretary",
      company: "IEEE KUET Student Branch",
      period: "Mar 2025 - Present",
      points: [
        "Supports technical community communication, publication activities, and student branch initiatives.",
      ],
    },
    {
      role: "Assistant Organizing Secretary",
      company: "SGIPC",
      period: "Jan 2025 - Present",
      points: [
        "Helps organize programming and technical activities with coordination, planning, and execution support.",
      ],
    },
    {
      role: "Batch Representative",
      company: "HACK, KUET",
      period: "Feb 2025 - Present",
      points: [
        "Represents batch-level participation and coordination in HACK KUET community activities.",
      ],
    },
  ],
  includeCompanyProjects: false,
  extraProjects: [
    {
      title: "Tajweed Runner",
      type: "Mobile Game / Godot Project",
      description:
        "An endless-runner game focused on polished visuals, engaging mechanics, and a professional mobile-friendly user experience.",
      stack: ["Godot", "Game Development", "Mobile UX"],
      role: "Developer",
      features: [
        "Endless-runner gameplay",
        "Polished visual experience",
        "Mobile-friendly interaction design",
      ],
      liveUrl: "/coming-soon",
      githubUrl: "/coming-soon",
    },
    {
      title: "IoT-Enhanced University Bus Tracking System",
      type: "IoT / Mobile Tracking System",
      description:
        "A real-time university bus tracking system with GPS/GSM hardware integration and a Flutter app for live location monitoring.",
      stack: ["Flutter", "ESP32", "NEO-6M GPS", "SIM900A GSM", "IoT"],
      role: "Developer",
      features: [
        "Real-time location tracking",
        "GPS and GSM integration",
        "Flutter monitoring app",
      ],
      liveUrl: "/coming-soon",
      githubUrl: "/coming-soon",
    },
    {
      title: "Unified Class Co-ordination App",
      type: "Academic Communication Platform",
      description:
        "A role-based coordination platform for CR, teacher, and student communication with notices, announcements, and results management.",
      stack: ["Flutter", "Firebase", "REST APIs"],
      role: "Developer",
      features: [
        "Role-based communication",
        "Notice and announcement flow",
        "Results management",
      ],
      liveUrl: "/coming-soon",
      githubUrl: "/coming-soon",
    },
    {
      title: "Jatri",
      type: "Ticketing Management System",
      description:
        "A Laravel-based ticketing system for managing ticket-related workflows efficiently.",
      stack: ["Laravel", "PHP", "MySQL", "Bootstrap"],
      role: "Developer",
      features: [
        "Ticket workflow management",
        "Laravel backend",
        "Structured admin operations",
      ],
      liveUrl: "/coming-soon",
      githubUrl: "/coming-soon",
    },
  ],
  strengthEyebrow: "Technical Strengths",
  strengthTitle: "Product-Building",
  strengthHighlight: "Strength",
  competitive: [
    {
      title: "Mobile Product Development",
      description:
        "Builds Flutter and mobile-friendly experiences with attention to usability, responsiveness, and practical workflows.",
    },
    {
      title: "IoT Integration",
      description:
        "Works with ESP32, GPS, GSM, and live monitoring systems for real-world tracking applications.",
    },
    {
      title: "Full-Stack Systems",
      description:
        "Uses Laravel, JavaFX, databases, REST APIs, and frontend frameworks to build end-to-end software systems.",
    },
    {
      title: "Technical Leadership",
      description:
        "Active in IEEE KUET Student Branch, SGIPC, HACK KUET, and earlier DRMC Science Club leadership.",
    },
  ],
  education: {
    degree: "B.Sc. in Computer Science and Engineering",
    institution: "Khulna University of Engineering & Technology - KUET",
    focus:
      "3rd Year, 2nd Semester with CGPA 3.76 and focus areas across software development, artificial intelligence, IoT systems, and product-oriented application development.",
    previous:
      "Dhaka Residential Model College - HSC in Science (GPA 5.00, 2021); Dhaka Residential Model College - SSC in Science (GPA 5.00, 2019)",
  },
  achievements: [
    "IEEE R10 Innovation Challenge 2024 - Silver Award",
    "National Math Olympiad 2018 - 1st Runner Up",
    "National Science Festival 2019 - 3rd Position",
    "Publication Secretary, IEEE KUET Student Branch",
    "Assistant Organizing Secretary, SGIPC",
    "Batch Representative, HACK KUET",
    "Organizing Secretary, DRMC Science Club",
  ],
  services: [
    {
      title: "Mobile App Development",
      description:
        "Flutter apps, mobile-friendly product interfaces, live monitoring experiences, and responsive workflows.",
      icon: HiOutlinePhone,
    },
    {
      title: "Web & Backend Development",
      description:
        "Laravel, REST APIs, database-backed systems, admin workflows, and full-stack application features.",
      icon: HiOutlineDesktopComputer,
    },
    {
      title: "IoT Systems",
      description:
        "GPS/GSM integrations, live tracking, device-to-app communication, and practical IoT product flows.",
      icon: HiOutlineSparkles,
    },
    {
      title: "Product Engineering",
      description:
        "Turns academic, community, and client ideas into usable software with clear structure and delivery focus.",
      icon: HiOutlineCode,
    },
  ],
};

const detailedProfiles = {
  salek: salekProfile,
  adnan: adnanProfile,
  saif: saifProfile,
};

function getMember(slug) {
  return siteConfig.team.find(
    (member) => member.detailsUrl?.replace("/", "") === slug,
  );
}

function isExternalUrl(url = "") {
  return url.startsWith("http") || url.startsWith("mailto:");
}

function SectionHeader({ eyebrow, title, highlight, subtitle }) {
  return (
    <div className="mb-10">
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-light/20 bg-primary-light/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary-light">
        <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
        {eyebrow}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-text-inverse sm:text-4xl">
        {title}{" "}
        {highlight && (
          <span className="text-gradient-primary">{highlight}</span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-400 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-neutral-700/40 bg-neutral-800/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-primary-light/35 hover:bg-neutral-800/75 hover:shadow-[0_0_38px_rgba(170,145,88,0.08),0_0_24px_rgba(184,168,138,0.06)] ${className}`}
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary-light/5 blur-3xl" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function SocialButton({ social }) {
  const Icon = social.icon;
  const external = isExternalUrl(social.href);

  return (
    <a
      href={social.href}
      target={
        external && !social.href.startsWith("mailto:") ? "_blank" : undefined
      }
      rel={
        external && !social.href.startsWith("mailto:")
          ? "noopener noreferrer"
          : undefined
      }
      className="inline-flex items-center gap-2 rounded-full border border-neutral-700/50 bg-neutral-900/40 px-4 py-2 text-sm font-semibold text-neutral-300 transition-all duration-300 hover:border-primary-light/40 hover:bg-primary-light/10 hover:text-primary-light"
    >
      <Icon className="h-4 w-4" />
      {social.label}
    </a>
  );
}

function MiniFooter() {
  return (
    <footer className="relative z-10 border-t border-neutral-800/70 bg-neutral-950/30">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-neutral-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>
          © {new Date().getFullYear()} Effy Tech. Built with care in Bangladesh.
        </p>
        <div className="flex flex-wrap gap-5">
          <Link href="/" className="transition-colors hover:text-primary-light">
            Home
          </Link>
          <Link
            href="/#projects"
            className="transition-colors hover:text-primary-light"
          >
            Projects
          </Link>
          <Link
            href="/#contact"
            className="transition-colors hover:text-primary-light"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

function ProjectCard({ project }) {
  const hasImage = Boolean(project.thumbnail);

  return (
    <GlassCard className="flex min-h-[420px] flex-col p-0">
      <div className="relative aspect-[16/9] overflow-hidden">
        {hasImage ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-darkest via-neutral-900 to-neutral-800 px-6 text-center">
            <span className="font-heading text-3xl font-bold text-primary-light">
              {project.title}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-900/95 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-light">
          {project.type}
        </p>
        <h3 className="mt-2 font-heading text-2xl font-bold text-neutral-100">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-neutral-700/50 bg-neutral-900/40 px-2.5 py-1 text-xs text-neutral-400"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Role
          </p>
          <p className="mt-1 text-sm text-neutral-300">{project.role}</p>
        </div>

        <ul className="mt-4 space-y-2 text-sm text-neutral-400">
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-light" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          <a
            href={project.liveUrl}
            className="inline-flex items-center gap-2 rounded-full border border-primary-light/25 bg-primary-light/10 px-4 py-2 text-sm font-semibold text-primary-light transition-colors hover:text-accent-light"
          >
            View Link
            <HiOutlineExternalLink className="h-4 w-4" />
          </a>
          <a
            href={project.githubUrl}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-700/60 px-4 py-2 text-sm font-semibold text-neutral-300 transition-colors hover:border-primary-light/35 hover:text-primary-light"
          >
            GitHub
            <FaGithub className="h-4 w-4" />
          </a>
        </div>
      </div>
    </GlassCard>
  );
}

function DetailedProfilePage({ member, profile }) {
  const linkedin = profile.socials.find(
    (social) => social.label === "LinkedIn",
  );
  const github = profile.socials.find((social) => social.label === "GitHub");
  const featuredProjects = [
    ...(profile.includeCompanyProjects
      ? projects.map((project) => ({
          title: project.title,
          type:
            project.slug === "IAM"
              ? "Android App / Flutter Project"
              : "Institution Website / Client Project",
          description:
            project.slug === "IAM"
              ? "A Flutter and Firebase productivity app with reminders, cloud sync, clean architecture, and 1,000+ active users."
              : project.description,
          stack: project.tags,
          role:
            project.slug === "IAM"
              ? "Founder & App Developer"
              : "Lead Developer",
          features:
            project.slug === "IAM"
              ? [
                  "Daily Amal tracking",
                  "Cloud sync and reminders",
                  "1,000+ active users",
                ]
              : [
                  "Bilingual website",
                  "Admin dashboard",
                  "Responsive academic system",
                ],
          liveUrl: project.liveUrl || "/coming-soon",
          githubUrl: "/coming-soon",
          thumbnail: project.thumbnail,
        }))
      : []),
    ...profile.extraProjects,
  ].slice(0, 6);

  return (
    <main className="effy-public-page min-h-screen overflow-hidden bg-surface-dark text-text-inverse">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[420px] w-[420px] rounded-full bg-primary/5 blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[340px] w-[340px] rounded-full bg-accent/6 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(170,145,88,0.7) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="grid min-h-screen items-center gap-12 py-28 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-8">
              <Link
                href="/#team"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary-light transition-colors hover:text-accent-light"
              >
                <HiOutlineArrowLeft className="h-4 w-4" />
                Back to Effy Tech
              </Link>
            </div>
            <span className="mb-5 inline-flex w-fit rounded-full border border-primary-light/20 bg-primary-light/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary-light">
              {profile.badge}
            </span>
            <h1 className="font-heading text-5xl font-bold tracking-tight text-neutral-100 sm:text-6xl lg:text-7xl">
              {member.name}
            </h1>
            <p className="mt-4 text-xl font-semibold text-gradient-primary sm:text-2xl">
              {profile.title}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">
              {profile.intro}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={profile.cvUrl}
                download
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-text-inverse shadow-accent transition-all hover:scale-[1.02]"
              >
                <HiOutlineDownload className="h-4 w-4" />
                Download CV
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-primary-light/25 bg-primary-light/10 px-6 py-3 text-sm font-semibold text-primary-light transition-colors hover:text-accent-light"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-700/60 px-6 py-3 text-sm font-semibold text-neutral-300 transition-colors hover:border-primary-light/35 hover:text-primary-light"
              >
                Contact Me
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {profile.socials.map((social) => (
                <SocialButton key={social.label} social={social} />
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {profile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-neutral-700/40 bg-neutral-900/35 p-4"
                >
                  <p className="font-heading text-2xl font-bold text-primary-light">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-neutral-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-primary-light/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-neutral-700/40 bg-neutral-800/60 shadow-[0_0_42px_rgba(170,145,88,0.08)]">
              <img
                src={member.photo}
                alt={member.name}
                style={{ objectPosition: member.photoPosition || "center" }}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-20">
          <SectionHeader eyebrow="About" title="About" highlight="Me" />
          <GlassCard>
            <div className="grid gap-6 text-base leading-relaxed text-neutral-400 lg:grid-cols-2">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </GlassCard>
        </section>

        <section className="py-20">
          <SectionHeader
            eyebrow="Skills"
            title="Skills &"
            highlight="Tech Stack"
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {profile.skills.map((group) => (
              <GlassCard key={group.title} className="min-h-[220px]">
                <h3 className="font-heading text-2xl font-bold text-neutral-100">
                  {group.title}
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-neutral-700/50 bg-neutral-900/40 px-3 py-1.5 text-sm text-neutral-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="py-20">
          <SectionHeader
            eyebrow="Experience"
            title="Work"
            highlight="Timeline"
          />
          <div className="space-y-6">
            {profile.experience.map((item) => (
              <GlassCard key={`${item.role}-${item.company}`}>
                <div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary-light">
                      {item.period}
                    </p>
                    <h3 className="mt-3 font-heading text-2xl font-bold text-neutral-100">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-neutral-400">{item.company}</p>
                  </div>
                  <ul className="space-y-3 text-sm leading-relaxed text-neutral-400">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-light" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section id="projects" className="py-20">
          <SectionHeader
            eyebrow="Projects"
            title="Featured"
            highlight="Projects"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section className="py-20">
          <SectionHeader
            eyebrow={profile.strengthEyebrow || "Competitive Programming"}
            title={profile.strengthTitle || "Problem-Solving"}
            highlight={profile.strengthHighlight || "Strength"}
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {profile.competitive.map((item) => (
              <GlassCard key={item.title} className="min-h-[190px]">
                <HiOutlineCode className="h-8 w-8 text-primary-light" />
                <h3 className="mt-5 font-heading text-2xl font-bold text-neutral-100">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  {item.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="py-20">
          <SectionHeader
            eyebrow="Education"
            title="Academic"
            highlight="Path"
          />
          <GlassCard>
            <h3 className="font-heading text-3xl font-bold text-neutral-100">
              {profile.education.degree}
            </h3>
            <p className="mt-3 text-primary-light">
              {profile.education.institution}
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-400">
              {profile.education.focus}
            </p>
            <p className="mt-4 text-sm text-neutral-500">
              {profile.education.previous}
            </p>
          </GlassCard>
        </section>

        <section className="py-20">
          <SectionHeader
            eyebrow="Achievements"
            title="Selected"
            highlight="Highlights"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {profile.achievements.map((achievement) => (
              <GlassCard key={achievement} className="min-h-[130px]">
                <HiOutlineSparkles className="h-7 w-7 text-primary-light" />
                <h3 className="mt-4 font-heading text-xl font-bold text-neutral-100">
                  {achievement}
                </h3>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="py-20">
          <SectionHeader eyebrow="Services" title="What I" highlight="Can Do" />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {profile.services.map(({ title, description, icon: Icon }) => (
              <GlassCard key={title} className="min-h-[220px]">
                <Icon className="h-8 w-8 text-primary-light" />
                <h3 className="mt-5 font-heading text-2xl font-bold text-neutral-100">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  {description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="py-20">
          <GlassCard className="text-center">
            <HiOutlineBriefcase className="mx-auto h-10 w-10 text-primary-light" />
            <h2 className="mt-5 font-heading text-4xl font-bold text-neutral-100">
              My Resume
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-400">
              Download my latest CV to view my experience, skills, projects, and
              achievements in a structured format.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={profile.cvUrl}
                download
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-text-inverse shadow-accent transition-all hover:scale-[1.02]"
              >
                <HiOutlineDownload className="h-4 w-4" />
                Download CV
              </a>
              {linkedin && (
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-primary-light/25 bg-primary-light/10 px-6 py-3 text-sm font-semibold text-primary-light transition-colors hover:text-accent-light"
                >
                  View LinkedIn
                  <FaLinkedinIn className="h-4 w-4" />
                </a>
              )}
            </div>
          </GlassCard>
        </section>

        <section id="contact" className="py-20 pb-28">
          <GlassCard className="text-center">
            <h2 className="font-heading text-4xl font-bold text-neutral-100">
              Let&apos;s Connect
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-400">
              {profile.contactIntro}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-text-inverse shadow-accent transition-all hover:scale-[1.02]"
              >
                <HiOutlineMail className="h-4 w-4" />
                Email Me
              </a>
              {linkedin && (
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-primary-light/25 bg-primary-light/10 px-6 py-3 text-sm font-semibold text-primary-light transition-colors hover:text-accent-light"
                >
                  Connect on LinkedIn
                </a>
              )}
              {github && (
                <a
                  href={github.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-700/60 px-6 py-3 text-sm font-semibold text-neutral-300 transition-colors hover:border-primary-light/35 hover:text-primary-light"
                >
                  View GitHub
                  <HiOutlineArrowRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </GlassCard>
        </section>
      </div>
      <Footer />
    </main>
  );
}

function CompactMemberPage({ member }) {
  return (
    <main className="effy-public-page min-h-screen overflow-hidden bg-surface-dark pt-28 text-text-inverse">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[420px] w-[420px] rounded-full bg-primary/5 blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[340px] w-[340px] rounded-full bg-accent/6 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(170,145,88,0.7) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/#team"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-light transition-colors hover:text-accent-light"
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
          Back to Team
        </Link>

        <div className="grid overflow-hidden rounded-2xl border border-neutral-700/40 bg-neutral-800/60 shadow-[0_0_42px_rgba(170,145,88,0.08)] backdrop-blur-sm lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[420px] overflow-hidden">
            <img
              src={member.photo}
              alt={member.name}
              style={{ objectPosition: member.photoPosition || "center" }}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-neutral-950/75 to-transparent" />
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
            <span className="mb-4 w-fit rounded-full border border-primary-light/20 bg-primary-light/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary-light">
              Effy Tech Team
            </span>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-neutral-100 sm:text-5xl">
              {member.name}
            </h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-primary-light">
              {member.role}
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400">
              {member.bio}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {member.socials.map(({ platform, url }) => {
                const Icon = socialIconMap[platform];
                if (!Icon || !url) return null;

                const isExternal = url.startsWith("http");

                return (
                  <a
                    key={`${platform}-${url}`}
                    href={url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={platform}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700/50 bg-neutral-900/40 text-neutral-400 transition-all duration-300 hover:border-primary-light/40 hover:bg-primary-light/10 hover:text-primary-light"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>

            <Link
              href="/#contact"
              className="mt-10 inline-flex w-fit items-center justify-center rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-text-inverse shadow-accent transition-all hover:scale-[1.02]"
            >
              Contact Effy Tech
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export function generateStaticParams() {
  return siteConfig.team
    .filter((member) => member.detailsUrl)
    .map((member) => ({
      memberSlug: member.detailsUrl.replace("/", ""),
    }));
}

export async function generateMetadata({ params }) {
  const { memberSlug } = await params;
  const member = getMember(memberSlug);

  if (!member) {
    return {
      title: "Team Member | Effy Tech",
    };
  }

  return {
    title: `${member.name} | Effy Tech`,
    description: `${member.name}, ${member.role} at Effy Tech.`,
  };
}

export default async function TeamMemberPage({ params }) {
  const { memberSlug } = await params;
  const member = getMember(memberSlug);

  if (!member) notFound();

  const detailedProfile = detailedProfiles[memberSlug];

  if (detailedProfile) {
    return <DetailedProfilePage member={member} profile={detailedProfile} />;
  }

  return <CompactMemberPage member={member} />;
}
