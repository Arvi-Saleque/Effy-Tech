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

const socialIconMap = {
  facebook: FaFacebookF,
  github: FaGithub,
  linkedin: FaLinkedinIn,
  mail: HiOutlineMail,
};

const salekProfile = {
  title: "Full-Stack Software Engineer & Founder",
  intro:
    "KUET CSE undergraduate building scalable Flutter, Next.js, and backend solutions with clean architecture, modern UI, and strong problem-solving fundamentals.",
  email: "alifsalek.as@gmail.com",
  cvUrl: "/files/salek-cv.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/Arvi-Saleque", icon: FaGithub },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/salek-bin-hossain",
      icon: FaLinkedinIn,
    },
    { label: "Codeforces", href: "/coming-soon", icon: HiOutlineCode },
    { label: "CodeChef", href: "/coming-soon", icon: HiOutlineCode },
    { label: "Email", href: "mailto:alifsalek.as@gmail.com", icon: HiOutlineMail },
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
    {
      role: "Software Engineer Intern",
      company: "Kaz Software Limited",
      period: "Oct 2025 - Mar 2026",
      points: [
        "Worked with Angular, .NET Core, and MS SQL Server.",
        "Built and maintained frontend and backend features.",
        "Used REST APIs, Postman, Swagger, Git, and GitHub.",
        "Collaborated in an Agile/Scrum development environment.",
        "Contributed to real-world software projects and internal systems.",
      ],
    },
  ],
  extraProjects: [
    {
      title: "Effy Tech Website",
      type: "Company Website / Next.js Project",
      description:
        "A premium company website for Effy Tech with services, portfolio, team, and contact flow.",
      stack: ["Next.js", "React", "Tailwind CSS"],
      role: "Founder & Developer",
      features: ["Responsive landing page", "Project showcase", "Team profiles"],
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
      description: "Modern websites, landing pages, dashboards, and web applications.",
      icon: HiOutlineDesktopComputer,
    },
    {
      title: "Mobile App Development",
      description: "Flutter-based Android and cross-platform mobile apps.",
      icon: HiOutlinePhone,
    },
    {
      title: "Backend & API Development",
      description: "REST APIs, database integration, authentication, and backend logic.",
      icon: HiOutlineCode,
    },
    {
      title: "Software Problem Solving",
      description: "Efficient solutions using algorithms and structured thinking.",
      icon: HiOutlineSparkles,
    },
  ],
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
        {highlight && <span className="text-gradient-primary">{highlight}</span>}
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
      className={`relative overflow-hidden rounded-2xl border border-neutral-700/40 bg-neutral-800/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-primary-light/35 hover:bg-neutral-800/75 hover:shadow-[0_0_38px_rgba(45,212,191,0.08),0_0_24px_rgba(184,168,138,0.06)] ${className}`}
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
      target={external && !social.href.startsWith("mailto:") ? "_blank" : undefined}
      rel={external && !social.href.startsWith("mailto:") ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-2 rounded-full border border-neutral-700/50 bg-neutral-900/40 px-4 py-2 text-sm font-semibold text-neutral-300 transition-all duration-300 hover:border-primary-light/40 hover:bg-primary-light/10 hover:text-primary-light"
    >
      <Icon className="h-4 w-4" />
      {social.label}
    </a>
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

function SalekProfilePage({ member }) {
  const featuredProjects = [
    ...projects.map((project) => ({
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
      role: project.slug === "IAM" ? "Founder & App Developer" : "Lead Developer",
      features:
        project.slug === "IAM"
          ? ["Daily Amal tracking", "Cloud sync and reminders", "1,000+ active users"]
          : ["Bilingual website", "Admin dashboard", "Responsive academic system"],
      liveUrl: project.liveUrl || "/coming-soon",
      githubUrl: "/coming-soon",
      thumbnail: project.thumbnail,
    })),
    ...salekProfile.extraProjects,
  ].slice(0, 6);

  return (
    <main className="min-h-screen overflow-hidden bg-surface-dark text-text-inverse">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[420px] w-[420px] rounded-full bg-primary/5 blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[340px] w-[340px] rounded-full bg-accent/6 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(45,212,191,0.7) 1px, transparent 1px)",
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
              Founder Profile
            </span>
            <h1 className="font-heading text-5xl font-bold tracking-tight text-neutral-100 sm:text-6xl lg:text-7xl">
              {member.name}
            </h1>
            <p className="mt-4 text-xl font-semibold text-gradient-primary sm:text-2xl">
              {salekProfile.title}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">
              {salekProfile.intro}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={salekProfile.cvUrl}
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
              {salekProfile.socials.map((social) => (
                <SocialButton key={social.label} social={social} />
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {salekProfile.stats.map((stat) => (
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
            <div className="relative overflow-hidden rounded-2xl border border-neutral-700/40 bg-neutral-800/60 shadow-[0_0_42px_rgba(45,212,191,0.08)]">
              <img
                src={member.photo}
                alt={member.name}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-20">
          <SectionHeader eyebrow="About" title="About" highlight="Me" />
          <GlassCard>
            <div className="grid gap-6 text-base leading-relaxed text-neutral-400 lg:grid-cols-2">
              <p>
                I am a CSE undergraduate from KUET and a software engineer
                focused on building practical digital products. My work covers
                web applications, mobile apps, backend systems, and clean
                user-focused interfaces.
              </p>
              <p>
                I am also the Founder of Effy Tech, where I work on software
                solutions for businesses, institutions, and startups. My
                background in competitive programming helps me approach
                problems with strong logic, structure, and efficiency.
              </p>
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
            {salekProfile.skills.map((group) => (
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
          <SectionHeader eyebrow="Experience" title="Work" highlight="Timeline" />
          <div className="space-y-6">
            {salekProfile.experience.map((item) => (
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
            eyebrow="Competitive Programming"
            title="Problem-Solving"
            highlight="Strength"
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {salekProfile.competitive.map((item) => (
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
          <SectionHeader eyebrow="Education" title="Academic" highlight="Path" />
          <GlassCard>
            <h3 className="font-heading text-3xl font-bold text-neutral-100">
              {salekProfile.education.degree}
            </h3>
            <p className="mt-3 text-primary-light">
              {salekProfile.education.institution}
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-400">
              {salekProfile.education.focus}
            </p>
            <p className="mt-4 text-sm text-neutral-500">
              {salekProfile.education.previous}
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
            {salekProfile.achievements.map((achievement) => (
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
          <SectionHeader
            eyebrow="Services"
            title="What I"
            highlight="Can Do"
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {salekProfile.services.map(({ title, description, icon: Icon }) => (
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
              Download my latest CV to view my experience, skills, projects,
              and achievements in a structured format.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={salekProfile.cvUrl}
                download
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-text-inverse shadow-accent transition-all hover:scale-[1.02]"
              >
                <HiOutlineDownload className="h-4 w-4" />
                Download CV
              </a>
              <a
                href="https://linkedin.com/in/salek-bin-hossain"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary-light/25 bg-primary-light/10 px-6 py-3 text-sm font-semibold text-primary-light transition-colors hover:text-accent-light"
              >
                View LinkedIn
                <FaLinkedinIn className="h-4 w-4" />
              </a>
            </div>
          </GlassCard>
        </section>

        <section id="contact" className="py-20 pb-28">
          <GlassCard className="text-center">
            <h2 className="font-heading text-4xl font-bold text-neutral-100">
              Let&apos;s Connect
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-400">
              I am open to software development opportunities, collaborations,
              freelance projects, and technical discussions.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${salekProfile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-text-inverse shadow-accent transition-all hover:scale-[1.02]"
              >
                <HiOutlineMail className="h-4 w-4" />
                Email Me
              </a>
              <a
                href="https://linkedin.com/in/salek-bin-hossain"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary-light/25 bg-primary-light/10 px-6 py-3 text-sm font-semibold text-primary-light transition-colors hover:text-accent-light"
              >
                Connect on LinkedIn
              </a>
              <a
                href="https://github.com/Arvi-Saleque"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-700/60 px-6 py-3 text-sm font-semibold text-neutral-300 transition-colors hover:border-primary-light/35 hover:text-primary-light"
              >
                View GitHub
                <HiOutlineArrowRight className="h-4 w-4" />
              </a>
            </div>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}

function CompactMemberPage({ member }) {
  return (
    <main className="min-h-screen overflow-hidden bg-surface-dark pt-28 text-text-inverse">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[420px] w-[420px] rounded-full bg-primary/5 blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[340px] w-[340px] rounded-full bg-accent/6 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(45,212,191,0.7) 1px, transparent 1px)",
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

        <div className="grid overflow-hidden rounded-2xl border border-neutral-700/40 bg-neutral-800/60 shadow-[0_0_42px_rgba(45,212,191,0.08)] backdrop-blur-sm lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[420px] overflow-hidden">
            <img
              src={member.photo}
              alt={member.name}
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

  if (memberSlug === "salek") {
    return <SalekProfilePage member={member} />;
  }

  return <CompactMemberPage member={member} />;
}
