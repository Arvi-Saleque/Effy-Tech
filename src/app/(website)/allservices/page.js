import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineChip,
  HiOutlineCode,
  HiOutlineCog,
  HiOutlineCollection,
  HiOutlineCube,
  HiOutlineDeviceMobile,
  HiOutlineGlobe,
  HiOutlineLightBulb,
  HiOutlinePencilAlt,
  HiOutlinePresentationChartLine,
  HiOutlineServer,
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineTemplate,
} from "react-icons/hi";
import siteConfig from "@/theme/siteConfig";
import Footer from "@/components/layout/Footer";
import ServiceExplorer from "@/components/showcase/ServiceExplorer";

export const metadata = {
  title: "All Services | Effy Tech",
  description:
    "Detailed service catalog for Effy Tech: websites, mobile apps, MVPs, software, automation, AI agents, e-commerce, dashboards, ERP, CRM, POS, education platforms, hosting, SEO, branding, and consulting.",
};

const iconMap = {
  website: HiOutlineTemplate,
  mobile: HiOutlineDeviceMobile,
  fullstack: HiOutlineCode,
  automation: HiOutlineCog,
  ai: HiOutlineSparkles,
  ecommerce: HiOutlineShoppingBag,
  design: HiOutlinePencilAlt,
  dashboard: HiOutlinePresentationChartLine,
  erp: HiOutlineCollection,
  api: HiOutlineCube,
  hosting: HiOutlineServer,
  support: HiOutlineCog,
  seo: HiOutlineGlobe,
  branding: HiOutlineChip,
  consulting: HiOutlineLightBulb,
};

const sections = [
  {
    id: "build",
    label: "Build",
    title: "Websites, apps, and complete software",
    description:
      "For clients who need a new digital product, online platform, or internal management system.",
    icons: ["website", "mobile", "fullstack", "ecommerce", "dashboard", "erp"],
    serviceIds: [
      "website-webapp",
      "mobile-app",
      "fullstack-software",
      "ecommerce",
      "dashboard-admin",
      "erp-management",
      "mvp-startup",
      "education-solutions",
      "admin-editable-website",
    ],
  },
  {
    id: "automate",
    label: "Automate",
    title: "Automation, AI, and integrations",
    description:
      "For businesses that want to save time, reduce manual work, and connect their tools.",
    icons: ["automation", "ai", "api"],
    serviceIds: [
      "business-automation",
      "ai-automation",
      "api-integration",
      "crm-client-management",
      "pos-inventory",
      "whatsapp-automation",
      "data-reporting",
    ],
  },
  {
    id: "grow",
    label: "Grow",
    title: "Design, launch, support, and growth setup",
    description:
      "For teams that need better design, reliable hosting, maintenance, tracking, or planning.",
    icons: ["design", "hosting", "support", "seo", "branding", "consulting"],
    serviceIds: [
      "ui-ux",
      "hosting-deployment",
      "technical-support",
      "seo-growth",
      "branding-creative",
      "software-consulting",
      "domain-email-it",
    ],
  },
];

function GroupIntro({ section }) {
  return (
    <a
      href={`#${section.id}`}
      className="group rounded-2xl border border-neutral-700/40 bg-neutral-900/55 p-5 transition-all hover:border-primary-light/35 hover:bg-neutral-900/80"
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
            {section.label}
          </p>
          <h2 className="mt-2 text-xl font-bold text-neutral-100">
            {section.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-500">
            {section.description}
          </p>
        </div>
        <div className="hidden flex-wrap justify-end gap-1.5 sm:flex sm:max-w-28">
          {section.icons.slice(0, 4).map((icon) => {
            const Icon = iconMap[icon] || HiOutlineTemplate;
            return (
              <span
                key={icon}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary-light/15 bg-primary-light/10 text-primary-light"
              >
                <Icon className="h-4 w-4" />
              </span>
            );
          })}
        </div>
      </div>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-light">
        View group
        <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </a>
  );
}

function ServiceCard({ service }) {
  const Icon = iconMap[service.icon] || HiOutlineTemplate;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-neutral-700/40 bg-neutral-900/55 p-5 transition-all hover:border-primary-light/35 hover:bg-neutral-900/80 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-primary-light/20 bg-primary-light/10 text-primary-light transition-colors group-hover:border-accent-light/30 group-hover:text-accent-light">
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h3 className="text-xl font-bold leading-tight text-neutral-100">
            {service.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">
            {service.description}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {service.examples.slice(0, 4).map((example) => (
          <div key={example} className="flex gap-2 text-sm text-neutral-300">
            <HiOutlineCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-light" />
            <span>{example}</span>
          </div>
        ))}
      </div>

      <Link
        href="/#contact"
        className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-semibold text-primary-light transition-colors hover:text-accent-light"
      >
        Discuss this service
        <HiOutlineArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

export default function AllServicesPage() {
  const services = siteConfig.services || [];
  const servicesById = new Map(
    services.map((service) => [service.id, service]),
  );

  return (
    <>
      <main className="effy-public-page min-h-screen bg-surface-dark pt-24 text-text-inverse">
        <section className="relative overflow-hidden border-b border-neutral-800/50 py-10 sm:py-16">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/6 blur-[140px]" />
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(185,154,90,0.9) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/quickservices"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-primary-light"
            >
              <HiOutlineArrowLeft className="h-4 w-4" />
              Back to overview
            </Link>

            <div className="mt-10 max-w-4xl">
              <span className="inline-flex rounded-full border border-primary-light/20 bg-primary-light/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
                Complete Service List
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-neutral-100 sm:text-5xl lg:text-6xl">
                Clear services, simple language, real business outcomes
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-400">
                Here is everything Effy Tech can provide. Choose a group below,
                scan the service cards, and contact us when something matches
                your business need.
              </p>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {sections.map((section) => (
                <GroupIntro key={section.id} section={section} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="space-y-16">
            {sections.map((section) => {
              const groupServices = section.serviceIds
                .map((id) => servicesById.get(id))
                .filter(Boolean);

              return (
                <div key={section.id} id={section.id} className="scroll-mt-28">
                  <div className="mb-6 flex flex-col gap-3 border-b border-neutral-800/70 pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
                        {section.label}
                      </p>
                      <h2 className="mt-2 text-3xl font-bold text-neutral-100">
                        {section.title}
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500">
                        {section.description}
                      </p>
                    </div>
                    <Link
                      href="/#contact"
                      className="inline-flex w-fit items-center gap-2 rounded-xl border border-primary-light/30 px-4 py-2 text-sm font-semibold text-primary-light transition-all hover:bg-primary-light hover:text-neutral-950"
                    >
                      Ask about this
                    </Link>
                  </div>

                  <ServiceExplorer groupId={section.label} />
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-accent/25 bg-accent/10 p-6 text-center sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
              Need Guidance?
            </p>
            <h2 className="mt-3 text-3xl font-bold text-neutral-100">
              Not sure which service fits your idea?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400">
              Tell us your goal and business type. We will suggest the right
              website, app, automation, or software plan.
            </p>
            <Link
              href="/#contact"
              className="mt-7 inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-neutral-100 transition-all hover:bg-primary-dark"
            >
              Contact Effy Tech
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
