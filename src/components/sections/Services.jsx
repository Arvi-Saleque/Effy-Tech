"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  HiOutlineArrowRight,
  HiOutlineBeaker,
  HiOutlineChip,
  HiOutlineCode,
  HiOutlineCog,
  HiOutlineCollection,
  HiOutlineCube,
  HiOutlineDatabase,
  HiOutlineDeviceMobile,
  HiOutlineGlobe,
  HiOutlineLightBulb,
  HiOutlinePencilAlt,
  HiOutlinePresentationChartLine,
  HiOutlineServer,
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineSupport,
  HiOutlineTemplate,
} from "react-icons/hi";
import siteConfig from "@/theme/siteConfig";
import Button from "@/components/ui/Button";

const iconMap = {
  website: HiOutlineTemplate,
  webapp: HiOutlineChip,
  mobile: HiOutlineDeviceMobile,
  design: HiOutlinePencilAlt,
  backend: HiOutlineCode,
  support: HiOutlineCog,
  fullstack: HiOutlineCode,
  automation: HiOutlineCog,
  ai: HiOutlineSparkles,
  ecommerce: HiOutlineShoppingBag,
  dashboard: HiOutlinePresentationChartLine,
  erp: HiOutlineCollection,
  api: HiOutlineCube,
  hosting: HiOutlineServer,
  seo: HiOutlineGlobe,
  branding: HiOutlineBeaker,
  consulting: HiOutlineLightBulb,
  database: HiOutlineDatabase,
  help: HiOutlineSupport,
};

const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function ServiceCard({ service, index, prefersReduced }) {
  const Icon = iconMap[service.icon] || HiOutlineTemplate;
  const hoverMotion = prefersReduced
    ? {}
    : {
        whileHover: {
          y: -8,
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <motion.article
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
      className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl border border-neutral-700/40 bg-neutral-800/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-primary-light/35 hover:bg-neutral-800/75 hover:shadow-[0_0_42px_rgba(185,154,90,0.09),0_0_28px_rgba(184,168,138,0.06)] sm:p-7"
      {...hoverMotion}
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary-light/5 blur-3xl transition-transform duration-700 group-hover:scale-125" />
      <div className="absolute -bottom-14 left-8 h-28 w-28 rounded-full bg-accent/10 blur-3xl opacity-70" />

      <div className="relative z-10 flex h-full flex-col">
        <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-primary-light/20 bg-primary-light/10 text-primary-light transition-all duration-300 group-hover:border-accent-light/30 group-hover:text-accent-light">
          <Icon className="h-6 w-6" />
        </span>

        <h3 className="font-heading text-2xl font-bold tracking-tight text-neutral-100 transition-colors duration-300 group-hover:text-primary-light">
          {service.shortTitle || service.title}
        </h3>
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-neutral-400">
          {service.description}
        </p>

        <a
          href="#contact"
          className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-semibold text-primary-light transition-colors duration-300 hover:text-accent-light"
        >
          Discuss This Service
          <HiOutlineArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const prefersReduced = useReducedMotion();
  const services = siteConfig.services || [];
  const mainServices = services.filter((service) => service.featured).slice(0, 6);
  const moreServices = services.filter((service) => !service.featured);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-surface-dark py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-28 top-1/4 h-[360px] w-[360px] rounded-full bg-primary/5 blur-[130px] sm:h-[560px] sm:w-[560px]" />
        <div className="absolute bottom-1/4 right-0 h-[300px] w-[300px] rounded-full bg-accent/6 blur-[120px] sm:h-[440px] sm:w-[440px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(185,154,90,0.7) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-light/20 bg-primary-light/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary-light">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-light" />
            Our Services
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-inverse sm:text-4xl lg:text-5xl">
            Practical Digital Services for{" "}
            <span className="text-gradient-primary">Real Business Growth</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-neutral-400">
            We build websites, apps, automation tools, AI agents, e-commerce
            systems, dashboards, and custom software that help businesses and
            institutions work faster.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/quickservices" size="md" className="w-full sm:w-auto">
              View Services Overview
              <HiOutlineArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              href="/allservices"
              variant="outline"
              size="md"
              className="w-full border-primary-light/40 text-primary-light hover:bg-primary-light hover:text-neutral-950 sm:w-auto"
            >
              Explore Detailed Services
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {mainServices.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button href="/allservices" variant="outline" size="md">
            View All Services
            <HiOutlineArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {moreServices.length > 0 && (
          <motion.div
            className="mt-12 rounded-2xl border border-neutral-700/35 bg-neutral-900/45 p-5 backdrop-blur-sm sm:p-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-light">
                  More Services
                </p>
                <h3 className="mt-2 text-xl font-bold text-neutral-100">
                  Extra support when your project needs more than development
                </h3>
              </div>
              <Button href="/allservices" variant="outline" size="sm">
                Detailed Service List
              </Button>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {moreServices.map((service) => (
                <span
                  key={service.title}
                  className="rounded-full border border-neutral-700/50 bg-neutral-800/50 px-3 py-1.5 text-sm text-neutral-300"
                >
                  {service.shortTitle || service.title}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

