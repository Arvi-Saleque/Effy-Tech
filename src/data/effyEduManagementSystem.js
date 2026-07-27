const effyEduManagementSystem = {
  projectKey: "EEMS",
  caseStudyPath: "/effy_edu_management_system",
  locale: "en",
  name: "Effy Edu Management System",
  shortName: "Effy Edu",
  category: "Coaching Website & Operations Platform",
  status: "Live",
  liveUrl: "https://www.shifatstales.com",
  browserUrl: "shifatstales.com",
  heroImage: "/images/effy-edu-management-system/case-study/hero.webp",
  heroImageAlt:
    "Privacy-safe overview of the Effy Edu coaching management dashboard",
  ogImage: "/images/effy-edu-management-system/case-study/og-1200x630.jpg",
  heroEyebrow: "Recent live client platform",
  heroTitle: "One connected coaching system",
  heroAccent: "for students, teachers, and daily operations.",
  heroDescription:
    "Effy Tech planned and engineered a role-based education platform that brings a public coaching website, student self-service, teacher administration, academic workflows, reporting, and website content control into one connected product. Its live client deployment powers Shifat's Tales Academic & Admission Care.",
  heroPoints: [
    "Public coaching website and editable content",
    "Student portal with academic and payment visibility",
    "Teacher and administration operations workspace",
    "Exams, results, reports, materials, and notifications",
  ],
  galleryEyebrow: "Privacy-safe product views",
  galleryHeading: "Role-based interface previews",
  galleryDescription:
    "These representative views use generalized records so the system can be explored without exposing client or student data.",
  staticDemo: {
    eyebrow: "Static portfolio demo",
    title: "Generalized raw data only—no production database connection",
    description:
      "This Effy Tech showcase is fully separated from the official client system. It does not connect to the live database, authentication store, private APIs, or real student records.",
    points: [
      {
        icon: "database",
        title: "Static showcase content",
        description:
          "Page content is stored as local JavaScript data and pre-rendered for this portfolio.",
      },
      {
        icon: "shield",
        title: "Privacy-safe records",
        description:
          "Names, metrics, academic records, and interface previews are illustrative and generalized.",
      },
      {
        icon: "live",
        title: "Official system stays separate",
        description:
          "The live client deployment is linked only as an external reference and keeps its own protected infrastructure.",
      },
    ],
  },
  overview: {
    overline: "Project context",
    title: "From a public website to a complete coaching operation",
    intro:
      "A modern coaching centre has two equally important digital needs. Prospective students need clear public information, while enrolled students and staff need dependable day-to-day tools. Treating those needs as separate websites and spreadsheets creates duplicate work, delayed updates, and limited visibility.",
    challengeTitle: "The challenge",
    challenge:
      "Course promotion, student approval, batch schedules, class progress, assignments, exams, fees, notices, reports, and public content all move at different speeds. The platform had to make each workflow simple for its user while keeping the underlying operation connected.",
    solutionTitle: "The solution",
    solution:
      "We built one role-aware platform with a conversion-focused public website, a self-service student centre, an operations-rich teacher console, and an integrated website CMS. Shared academic structures keep batches, materials, assessments, results, and communication aligned.",
  },
  highlights: [
    { value: "LIVE", label: "Client production deployment" },
    { value: "2 ROLE CENTRES", label: "Student and teacher/admin" },
    { value: "FULL ACADEMIC CYCLE", label: "Batch to result and report" },
    { value: "PUBLIC + CMS", label: "Website and content control" },
  ],
  deliverables: [
    {
      icon: "layout",
      title: "Public coaching website",
      description:
        "A responsive public experience for courses, results, routines, academic calendar, materials, reviews, gallery, news, and direct admission enquiries.",
    },
    {
      icon: "academic",
      title: "Student self-service centre",
      description:
        "A focused portal for enrolled batches, subject progress, class routines, assignments, exams, published results, payments, notices, profile, and account security.",
    },
    {
      icon: "workflow",
      title: "Teacher and administration console",
      description:
        "Operational tools for students, approvals, enrolments, batches, schedules, syllabus progress, assignments, exams, result publication, fees, reports, and audit history.",
    },
    {
      icon: "cms",
      title: "Integrated website CMS",
      description:
        "Editable public sections, media, courses, results, testimonials, gallery, calendar, routines, news, contact details, ordering, and visibility controls without source-code changes.",
    },
  ],
  systems: [
    {
      label: "Student experience",
      title: "Every learner sees the academic information that matters now",
      description:
        "The student centre turns scattered updates into one role-aware journey. Enrolment context, current classes, tasks, upcoming exams, fees, announcements, and performance information stay connected to the student's active batch.",
      items: [
        "Active batches and academic journey",
        "Assignments, submissions, and feedback",
        "Routine, materials, and announcements",
        "Exam schedule and published results",
        "Performance analytics and progress",
        "Payment history, profile, and security",
      ],
    },
    {
      label: "Teacher and operations experience",
      title: "Daily coaching workflows live in one accountable workspace",
      description:
        "Teachers and administrators can move from admission approval to teaching delivery, evaluation, fee tracking, reporting, and public publishing without switching between disconnected tools.",
      items: [
        "Student approval and enrolment control",
        "Batch, subject, unit, and class management",
        "Assignment and material publishing",
        "Exam marking and result lifecycle",
        "Payment ledger and monthly dues",
        "Reports, notifications, audit, and CMS",
      ],
    },
  ],
  galleries: {
    public: {
      label: "Public and student experience",
      description:
        "Representative public website and student-facing views with generalized data.",
      images: [
        {
          src: "/images/effy-edu-management-system/case-study/public-site.svg",
          label: "Public Coaching Website",
          detail:
            "Course discovery, academic proof, public resources, and admission journeys",
        },
        {
          src: "/images/effy-edu-management-system/case-study/student-portal.svg",
          label: "Student Dashboard",
          detail:
            "Batch context, assignments, next class, fees, and academic progress",
        },
        {
          src: "/images/effy-edu-management-system/case-study/exam-analytics.svg",
          label: "Exam & Progress Analytics",
          detail:
            "Subject performance, score trends, distribution, and actionable feedback",
        },
      ],
    },
    admin: {
      label: "Teacher and administration",
      description:
        "Representative management views showing the connected operations model.",
      images: [
        {
          src: "/images/effy-edu-management-system/case-study/teacher-console.svg",
          label: "Teacher & Admin Console",
          detail:
            "Students, batches, academic delivery, priority actions, and operational status",
        },
        {
          src: "/images/effy-edu-management-system/case-study/website-cms.svg",
          label: "Website Content Manager",
          detail:
            "Section editing, visibility, ordering, media, and live public-content control",
        },
      ],
    },
  },
  capabilities: [
    {
      icon: "shield",
      title: "Role-aware access",
      description:
        "Student and teacher/admin experiences are separated by authorization rules, account state, and role-specific navigation.",
    },
    {
      icon: "academic",
      title: "Structured academic model",
      description:
        "Batches, subjects, units, schedules, enrolments, and completion progress share one connected information model.",
    },
    {
      icon: "workflow",
      title: "Assignment and material delivery",
      description:
        "Teachers can publish learning resources and assignments while students submit work and receive reviewed feedback.",
    },
    {
      icon: "publishing",
      title: "Exam and result lifecycle",
      description:
        "Assessment moves through creation, marks entry, review, draft, publication, ranking, analytics, archive, and report output.",
    },
    {
      icon: "pdf",
      title: "Reports and document workflows",
      description:
        "Operational exports, printable views, generated result documents, and student-progress reports support real administrative work.",
    },
    {
      icon: "cms",
      title: "Editable public experience",
      description:
        "The same team that runs the coaching operation can manage public sections, media, proof, and announcements from the CMS.",
    },
  ],
  engineering: {
    overline: "Effy Tech engineering",
    title:
      "One product architecture across public, student, and staff journeys",
    description:
      "The project combines a large Next.js App Router surface with typed workflows, responsive role dashboards, validation, charting, PDF generation, protected content access, and a CMS. The result is a platform that can evolve module by module without fragmenting the user experience.",
    layers: [
      {
        title: "Public delivery layer",
        text: "Responsive content, course discovery, results, routines, materials, reviews, news, gallery, contact, and registration entry points.",
      },
      {
        title: "Identity and access layer",
        text: "Role-aware authentication, registration, approval states, protected routes, account status, profile, and security workflows.",
      },
      {
        title: "Academic operations layer",
        text: "Students, enrolments, batches, subjects, units, classes, assignments, exams, results, materials, notices, and payments.",
      },
      {
        title: "Insight and content layer",
        text: "Progress analytics, operational reports, generated documents, audit history, notifications, media, and website CMS.",
      },
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Recharts",
      "PDF tooling",
    ],
  },
  outcomes: [
    "Public communication, student service, academic delivery, and administration now work as parts of one live platform.",
    "Students can access current batch information, learning resources, assessment outcomes, and payment history without relying on scattered messages.",
    "Teachers and administrators have a structured route from admission approval through teaching, evaluation, reporting, and communication.",
    "The integrated CMS lets the client maintain recurring public content while the underlying architecture remains ready for controlled expansion.",
  ],
  client: {
    name: "Shifat's Tales Academic & Admission Care",
    location: "Rangunia, Chattogram",
    type: "Coaching and admission-care institution",
  },
  cta: {
    overline: "Planning a coaching or education platform?",
    title:
      "Turn the public website and daily academic operation into one system.",
    description:
      "Effy Tech builds custom education platforms around the institution's actual workflow—from discovery and interface design to role-based software, deployment, and long-term support.",
    primaryLabel: "Discuss an Education Platform",
    whatsappUrl:
      "https://wa.me/8801511190270?text=Hello%20Effy%20Tech%2C%20I%20saw%20the%20Effy%20Edu%20Management%20System%20case%20study%20and%20want%20to%20discuss%20an%20education%20or%20coaching%20platform.",
    secondaryLabel: "Visit Live Client Site",
  },
};

export default effyEduManagementSystem;
