"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  HiOutlineBriefcase,
  HiOutlineCode,
  HiOutlineDesktopComputer,
  HiOutlineSupport,
} from "react-icons/hi";
import siteConfig from "@/theme/siteConfig";

const iconMap = {
  business: HiOutlineBriefcase,
  code: HiOutlineCode,
  ui: HiOutlineDesktopComputer,
  support: HiOutlineSupport,
};

const cardReveal = {
  hidden: { opacity: 0, y: 36 },
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

function ReasonCard({ item, index, prefersReduced }) {
  const Icon = iconMap[item.icon] || HiOutlineBriefcase;
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
      className="group relative flex min-h-[230px] flex-col overflow-hidden rounded-2xl border border-neutral-700/40 bg-neutral-800/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-primary-light/35 hover:bg-neutral-800/75 hover:shadow-[0_0_38px_rgba(185,154,90,0.08),0_0_24px_rgba(184,168,138,0.06)]"
      {...hoverMotion}
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary-light/5 blur-3xl transition-transform duration-700 group-hover:scale-125" />
      <div className="absolute -bottom-14 left-6 h-28 w-28 rounded-full bg-accent/10 blur-3xl opacity-70" />

      <div className="relative z-10 flex h-full flex-col">
        <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-primary-light/20 bg-primary-light/10 text-primary-light transition-all duration-300 group-hover:border-accent-light/30 group-hover:text-accent-light">
          <Icon className="h-6 w-6" />
        </span>
        <h3 className="font-heading text-2xl font-bold tracking-tight text-neutral-100">
          {item.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-neutral-400">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

export default function WhyChoose() {
  const prefersReduced = useReducedMotion();
  const items = siteConfig.whyChoose || [];

  return (
    <section
      id="why-choose"
      className="relative overflow-hidden bg-surface-dark py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-1/3 h-[320px] w-[320px] rounded-full bg-primary/5 blur-[130px] sm:h-[520px] sm:w-[520px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[260px] w-[260px] rounded-full bg-accent/6 blur-[120px] sm:h-[400px] sm:w-[400px]" />
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
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-light/20 bg-primary-light/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary-light">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-light" />
            Why Choose Us
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-inverse sm:text-4xl lg:text-5xl">
            Why Choose{" "}
            <span className="text-gradient-primary">Effy Tech</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-neutral-400">
            We focus on building software that is not only visually clean, but
            also practical, scalable, and easy to maintain.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <ReasonCard
              key={item.title}
              item={item}
              index={index}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

