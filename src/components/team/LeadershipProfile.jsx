import Image from "next/image";
import Link from "next/link";
import {
  FaCode,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineBriefcase,
  HiOutlineCheckCircle,
  HiOutlineCode,
  HiOutlineDownload,
  HiOutlineExternalLink,
  HiOutlineMail,
  HiOutlineSparkles,
} from "react-icons/hi";
import Footer from "@/components/layout/Footer";

const socialIcons = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  facebook: FaFacebookF,
  mail: HiOutlineMail,
  code: FaCode,
};

const whatsappUrl =
  "https://wa.me/8801511190270?text=" +
  encodeURIComponent(
    "Hello Effy Tech, I visited a leadership profile and would like to discuss a software project.",
  );

function SectionHeading({ eyebrow, title, description, dark = false }) {
  return (
    <div className="max-w-3xl">
      <p
        className={`text-xs font-bold uppercase tracking-[0.24em] ${
          dark ? "text-[#d0b777]" : "text-[#8f7335]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${
          dark ? "text-[#fbfaf4]" : "text-[#20261f]"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-base leading-8 sm:text-lg ${
            dark ? "text-[#b9c0b5]" : "text-[#5f675e]"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function SocialLink({ social, light = false }) {
  const Icon = socialIcons[social.type] || HiOutlineExternalLink;
  const isMail = social.href.startsWith("mailto:");

  return (
    <a
      href={social.href}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noopener noreferrer"}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
        light
          ? "border-[#b9a36d]/35 bg-[#b9a36d]/10 text-[#f0dfb3] hover:border-[#d0b777]/70 hover:bg-[#b9a36d]/18"
          : "border-[#c8c4b5] bg-white/65 text-[#384037] hover:border-[#9e854a] hover:text-[#72591f]"
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {social.label}
    </a>
  );
}

function MetricCard({ metric }) {
  return (
    <div className="border-l border-[#c5ad72]/50 pl-4 sm:pl-5">
      <p className="font-heading text-2xl font-bold text-[#f0dfb3] sm:text-3xl">
        {metric.value}
      </p>
      <p className="mt-1 text-xs leading-5 text-[#aeb6aa]">{metric.label}</p>
    </div>
  );
}

function ClientProjectCard({ project }) {
  return (
    <article className="group overflow-hidden rounded-[1.6rem] border border-[#d9d4c6] bg-[#fbfaf4] shadow-[0_18px_55px_rgba(32,38,31,0.07)] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[5/3] overflow-hidden border-b border-[#ded9ca] bg-[#ece9dd]">
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
        />
      </div>

      <div className="p-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8f7335]">
          {project.category}
        </p>
        <h3 className="mt-3 font-heading text-2xl font-bold text-[#20261f]">
          {project.title}
        </h3>
        <div className="mt-5 rounded-xl border border-[#d9d2bf] bg-[#f4f1e7] px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#86703c]">
            Primary contribution
          </p>
          <p className="mt-1 text-sm font-semibold leading-6 text-[#343b33]">
            {project.contribution}
          </p>
        </div>
        <p className="mt-5 text-sm leading-7 text-[#60685f]">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#d8d2c2] bg-white/65 px-3 py-1.5 text-xs font-medium text-[#62695f]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={project.caseStudyUrl}
            className="inline-flex items-center gap-2 rounded-full bg-[#20261f] px-5 py-2.5 text-sm font-semibold text-[#fbfaf4] transition-colors hover:bg-[#30382f]"
          >
            View case study
            <HiOutlineArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {project.externalUrl ? (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#bbb5a5] px-5 py-2.5 text-sm font-semibold text-[#3f473e] transition-colors hover:border-[#9e854a] hover:text-[#72591f]"
            >
              Visit live product
              <HiOutlineExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ExpertiseCard({ item, index }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <span className="font-heading text-sm font-bold text-[#d0b777]">
          0{index + 1}
        </span>
        <HiOutlineCode className="h-6 w-6 text-[#8f9a8b]" aria-hidden="true" />
      </div>
      <h3 className="mt-7 font-heading text-2xl font-bold text-[#fbfaf4]">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#b7beb3]">{item.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {item.items.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-white/10 bg-black/10 px-3 py-1.5 text-xs text-[#c7cdc3]"
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}

function TechnicalProjectCard({ project }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#d7d1c2] bg-white/60 p-6 sm:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8f7335]">
        {project.type}
      </p>
      <h3 className="mt-3 font-heading text-2xl font-bold text-[#20261f]">
        {project.title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-[#62695f]">
        {project.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#d8d2c2] bg-[#f7f5ec] px-3 py-1.5 text-xs text-[#60675d]"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-6">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#72591f] hover:text-[#4f3d13]"
          >
            View repository
            <FaGithub className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : (
          <span className="inline-flex rounded-full border border-[#d0c8b4] px-3 py-1.5 text-xs font-semibold text-[#777e73]">
            {project.status || "Private project"}
          </span>
        )}
      </div>
    </article>
  );
}

export default function LeadershipProfile({ profile }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.intro,
    url: `https://www.effytechbd.com/${profile.slug}`,
    image: `https://www.effytechbd.com${profile.portrait}`,
    email: profile.email,
    worksFor: {
      "@type": "Organization",
      name: "Effy Tech",
      url: "https://www.effytechbd.com",
    },
    sameAs: profile.socials
      .filter((social) => social.href.startsWith("http"))
      .map((social) => social.href),
  };

  return (
    <main className="effy-public-page overflow-hidden bg-[#fbfaf4] text-[#20261f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative overflow-hidden bg-[#1d241d] pb-20 pt-36 text-[#fbfaf4] sm:pb-24 sm:pt-40 lg:min-h-[88vh] lg:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-8 h-[520px] w-[520px] rounded-full bg-[#b99f62]/10 blur-[130px]" />
          <div className="absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-[#7d8a78]/10 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(235,223,190,0.8) 1px, transparent 1px)",
              backgroundSize: "34px 34px",
            }}
          />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div>
            <Link
              href="/#team"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#d6c18e] transition-colors hover:text-[#f0dfb3]"
            >
              <HiOutlineArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Effy Tech team
            </Link>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.24em] text-[#d0b777]">
              Effy Tech leadership
            </p>
            <h1 className="mt-4 max-w-3xl font-heading text-5xl font-bold tracking-tight text-[#fbfaf4] sm:text-6xl lg:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-5 text-xl font-semibold text-[#e5cf98] sm:text-2xl">
              {profile.role}
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#9fa99b]">
              {profile.discipline}
            </p>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#c0c7bc]">
              {profile.intro}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#c7ad70] px-6 py-3 text-sm font-bold text-[#20261f] transition-all hover:bg-[#dcc58d]"
              >
                Start a project with Effy Tech
                <HiOutlineArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#client-work"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-[#e2e6df] transition-colors hover:border-[#d0b777]/55 hover:text-[#f0dfb3]"
              >
                View client work
              </a>
              <a
                href={profile.cvUrl}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-[#c2c9bf] transition-colors hover:border-[#d0b777]/55 hover:text-[#f0dfb3]"
              >
                <HiOutlineDownload className="h-4 w-4" aria-hidden="true" />
                Download CV
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {profile.socials.map((social) => (
                <SocialLink key={social.label} social={social} light />
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-7 border-t border-white/10 pt-8 sm:grid-cols-4">
              {profile.metrics.map((metric) => (
                <MetricCard key={metric.label} metric={metric} />
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[540px] lg:mx-0 lg:ml-auto">
            <div className="absolute -inset-5 rounded-[2.2rem] bg-[#c8ad6e]/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#252d24] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.33)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.55rem]">
                <Image
                  src={profile.portrait}
                  alt={`${profile.name}, ${profile.role} at Effy Tech`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1d241d]/85 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf4] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <SectionHeading
            eyebrow={profile.leadership.eyebrow}
            title={profile.leadership.title}
            description={profile.leadership.description}
          />

          <div className="rounded-[1.6rem] border border-[#d9d4c5] bg-[#f3f1e7] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8f7335]">
              Core responsibilities
            </p>
            <ul className="mt-6 space-y-5">
              {profile.leadership.responsibilities.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-[#4f574e] sm:text-base">
                  <HiOutlineCheckCircle
                    className="mt-1 h-5 w-5 shrink-0 text-[#9b7d3d]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="client-work" className="bg-[#f0eee4] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Selected client work"
            title="Contribution inside live Effy Tech products"
            description="The focus is not only what the final interface looks like, but which product and engineering responsibilities were carried through to delivery."
          />
          <div className="mt-12 grid gap-7 lg:grid-cols-2">
            {profile.clientWork.map((project) => (
              <ClientProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#202720] py-20 text-[#fbfaf4] sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Core expertise"
            title="Engineering strengths brought to each project"
            description="A focused view of the disciplines that shape implementation decisions, technical quality, and final product delivery."
            dark
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {profile.expertise.map((item, index) => (
              <ExpertiseCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf4] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Experience"
              title="Professional and leadership timeline"
            />
            <div className="mt-10 space-y-5">
              {profile.experience.map((item) => (
                <article
                  key={`${item.role}-${item.organization}`}
                  className="rounded-2xl border border-[#d8d3c4] bg-[#f5f3ea] p-6 sm:p-7"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8f7335]">
                    {item.period}
                  </p>
                  <h3 className="mt-3 font-heading text-2xl font-bold text-[#20261f]">
                    {item.role}
                  </h3>
                  <p className="mt-1 font-semibold text-[#687066]">
                    {item.organization}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[#60685f]">
                    {item.summary}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Selected proof" title="Highlights and recognition" />
            <div className="mt-10 rounded-[1.6rem] border border-[#d8d3c4] bg-[#f5f3ea] p-6 sm:p-8">
              <ul className="space-y-4">
                {profile.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-7 text-[#50584f]">
                    <HiOutlineSparkles
                      className="mt-1 h-5 w-5 shrink-0 text-[#9a7c3c]"
                      aria-hidden="true"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#efede3] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Technical work"
            title="Selected engineering projects beyond client delivery"
            description="Only meaningful technical work is shown. Unavailable links are not presented as active buttons."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {profile.technicalProjects.map((project) => (
              <TechnicalProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf4] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div className="rounded-[1.6rem] border border-[#d8d3c4] bg-[#f4f2e9] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8f7335]">
              Education
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-[#20261f]">
              {profile.education.degree}
            </h2>
            <p className="mt-3 font-semibold text-[#8a7138]">
              {profile.education.institution}
            </p>
            <p className="mt-5 text-sm leading-7 text-[#5f675e] sm:text-base">
              {profile.education.description}
            </p>
            <p className="mt-5 border-t border-[#d7d0bf] pt-5 text-sm text-[#777e73]">
              {profile.education.previous}
            </p>
          </div>

          <div className="flex flex-col justify-between rounded-[1.6rem] border border-[#d8d3c4] bg-white/65 p-7 sm:p-9">
            <div>
              <HiOutlineBriefcase className="h-8 w-8 text-[#95783b]" aria-hidden="true" />
              <h2 className="mt-5 font-heading text-3xl font-bold text-[#20261f]">
                Detailed professional record
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#5f675e] sm:text-base">
                The CV contains the complete academic, technical, project, and professional history in a structured format.
              </p>
            </div>
            <a
              href={profile.cvUrl}
              download
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#a89059] px-5 py-2.5 text-sm font-bold text-[#72591f] transition-colors hover:bg-[#eee7d5]"
            >
              <HiOutlineDownload className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1c231c] py-20 text-center text-[#fbfaf4] sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#b99f62]/12 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#d0b777]">
            Build with Effy Tech
          </p>
          <h2 className="mt-5 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Need a serious website, application, or operational software system?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#bdc4b9] sm:text-lg">
            Discuss the requirement with the Effy Tech team. We will help define the scope, architecture, delivery plan, and the right path to production.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#c7ad70] px-6 py-3 text-sm font-bold text-[#20261f] transition-colors hover:bg-[#dcc58d]"
            >
              <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
              Discuss a project
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-[#e1e5de] transition-colors hover:border-[#d0b777]/55 hover:text-[#f0dfb3]"
            >
              Send a project brief
              <HiOutlineArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-[#bfc6bc] transition-colors hover:border-[#d0b777]/55 hover:text-[#f0dfb3]"
            >
              <HiOutlineMail className="h-4 w-4" aria-hidden="true" />
              Contact {profile.name.split(" ")[0]}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
