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

export const metadata = {
  title: "Services Overview | Effy Tech",
  description:
    "A simple overview of the websites, apps, automation, AI, e-commerce, dashboards, and software services Effy Tech provides.",
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

function ServiceRow({ service, index }) {
  const Icon = iconMap[service.icon] || HiOutlineTemplate;

  return (
    <article className="group rounded-2xl border border-neutral-700/40 bg-neutral-900/55 p-5 transition-all hover:border-primary-light/35 hover:bg-neutral-900/80 sm:p-6">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-primary-light/20 bg-primary-light/10 text-primary-light">
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-neutral-600">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="text-xl font-bold text-neutral-100">
              {service.shortTitle || service.title}
            </h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">
            {service.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function QuickServicesPage() {
  const services = siteConfig.services || [];
  const mainServices = services.filter((service) => service.featured);

  return (
    <>
      <main className="effy-public-page min-h-screen bg-surface-dark pt-24 text-text-inverse">
        <section className="relative overflow-hidden border-b border-neutral-800/50 pb-16 pt-8 sm:pb-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(185,154,90,0.8) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-primary-light"
            >
              <HiOutlineArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <span className="inline-flex rounded-full border border-primary-light/20 bg-primary-light/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
                  Services Overview
                </span>
                <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-neutral-100 sm:text-5xl lg:text-6xl">
                  What Effy Tech can build for you
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-400">
                  Simple version: we design, build, launch, and support digital
                  tools that help your business work better. You can come with a
                  clear idea or just a problem you want to solve.
                </p>
              </div>

              <div className="rounded-2xl border border-accent/25 bg-accent/10 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-light">
                  Best for first-time clients
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-300">
                  {[
                    "Tell us what you want to improve.",
                    "We suggest the right website, app, or software solution.",
                    "Then we design, develop, deploy, and maintain it.",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <HiOutlineCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-light" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
                Main Services
              </p>
              <h2 className="mt-2 text-2xl font-bold text-neutral-100">
                Most requested solutions
              </h2>
            </div>
            <Link
              href="/allservices"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-light transition-colors hover:text-accent-light"
            >
              Read detailed service list
              <HiOutlineArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {mainServices.map((service, index) => (
              <ServiceRow key={service.title} service={service} index={index} />
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-neutral-700/40 bg-neutral-900/50 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
              We Also Provide
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {services
                .filter((service) => !service.featured)
                .map((service) => (
                  <span
                    key={service.title}
                    className="rounded-full border border-neutral-700/50 bg-neutral-800/55 px-3 py-1.5 text-sm text-neutral-300"
                  >
                    {service.shortTitle || service.title}
                  </span>
                ))}
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-2xl border border-primary-light/20 bg-primary-light/10 p-6 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-2xl font-bold text-neutral-100">
                Not sure which service you need?
              </h2>
              <p className="mt-2 text-sm text-neutral-400">
                Share your business goal. We will help choose the right
                solution.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-neutral-100 transition-all hover:bg-primary-dark"
            >
              Talk To Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
