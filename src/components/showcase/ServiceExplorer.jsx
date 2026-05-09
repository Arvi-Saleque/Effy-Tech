/* ============================================================
   ServiceExplorer — Interactive two-panel service explorer
   Left: fixed sidebar with logo, grouped service list, CTA
   Right: scrollable detail panel for the selected service
   ============================================================ */

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiOutlineAdjustments,
  HiOutlineArrowRight,
  HiOutlineBell,
  HiOutlineChat,
  HiOutlineCheckCircle,
  HiOutlineChip,
  HiOutlineClipboardList,
  HiOutlineCloud,
  HiOutlineCode,
  HiOutlineCog,
  HiOutlineCollection,
  HiOutlineCube,
  HiOutlineCurrencyDollar,
  HiOutlineDatabase,
  HiOutlineDeviceMobile,
  HiOutlineDocumentText,
  HiOutlineExternalLink,
  HiOutlineGlobe,
  HiOutlineLightBulb,
  HiOutlineMail,
  HiOutlinePencilAlt,
  HiOutlinePresentationChartLine,
  HiOutlinePuzzle,
  HiOutlineRefresh,
  HiOutlineScale,
  HiOutlineSearch,
  HiOutlineServer,
  HiOutlineShieldCheck,
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineTemplate,
  HiOutlineTrendingUp,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { explorerServices, explorerGroups } from "@/data/serviceExplorer";
import siteConfig from "@/theme/siteConfig";

/* ── Icon map ───────────────────────────────────────────────── */
const iconMap = {
  "adjustments": HiOutlineAdjustments,
  "bell": HiOutlineBell,
  "chat": HiOutlineChat,
  "check-circle": HiOutlineCheckCircle,
  "chip": HiOutlineChip,
  "clipboard": HiOutlineClipboardList,
  "cloud": HiOutlineCloud,
  "code": HiOutlineCode,
  "cog": HiOutlineCog,
  "collection": HiOutlineCollection,
  "cube": HiOutlineCube,
  "currency-dollar": HiOutlineCurrencyDollar,
  "database": HiOutlineDatabase,
  "device-mobile": HiOutlineDeviceMobile,
  "document-text": HiOutlineDocumentText,
  "globe": HiOutlineGlobe,
  "light-bulb": HiOutlineLightBulb,
  "mail": HiOutlineMail,
  "pencil-alt": HiOutlinePencilAlt,
  "presentation-chart": HiOutlinePresentationChartLine,
  "puzzle": HiOutlinePuzzle,
  "refresh": HiOutlineRefresh,
  "scale": HiOutlineScale,
  "search": HiOutlineSearch,
  "server": HiOutlineServer,
  "shield-check": HiOutlineShieldCheck,
  "shopping-bag": HiOutlineShoppingBag,
  "sparkles": HiOutlineSparkles,
  "template": HiOutlineTemplate,
  "trending-up": HiOutlineTrendingUp,
  "users": HiOutlineUserGroup,
};

function getIcon(key) {
  return iconMap[key] || HiOutlineTemplate;
}

/* ── Feature Card ───────────────────────────────────────────── */
function FeatureCard({ feature }) {
  const Icon = getIcon(feature.icon);
  return (
    <div className="group rounded-[8px] border border-neutral-700/70 bg-neutral-950/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-primary-light/45 hover:bg-neutral-900/45 sm:p-6">
      <div className="mb-4 flex items-center gap-4">
        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[8px] border border-primary-light/20 bg-primary-light/10 text-primary-light shadow-[0_0_28px_rgba(45,212,191,0.1)] transition-all duration-300 group-hover:border-primary-light/45 group-hover:bg-primary-light/15">
          <Icon className="h-7 w-7" />
        </span>
        <h4 className="font-heading text-lg font-bold leading-tight text-neutral-100">
          {feature.title}
        </h4>
      </div>
      <p className="text-base leading-relaxed text-neutral-400">
        {feature.description}
      </p>
    </div>
  );
}

/* ── Sidebar Service Item ───────────────────────────────────── */
function SidebarItem({ service, isActive, onClick }) {
  const Icon = getIcon(service.menuIcon);
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-[8px] border px-5 py-5 text-left transition-all duration-300 ${
        isActive
          ? "border-primary-light/70 bg-primary-light/10 text-neutral-100 shadow-[0_0_34px_rgba(45,212,191,0.15)]"
          : "border-neutral-800/65 bg-neutral-950/15 text-neutral-400 hover:border-primary-light/25 hover:bg-neutral-900/35 hover:text-neutral-200"
      }`}
    >
      {isActive && (
        <>
          <span className="absolute right-0 top-1/2 h-16 w-16 -translate-y-1/2 translate-x-12 rotate-45 bg-primary-light shadow-[0_0_32px_rgba(45,212,191,0.55)]" />
          <span className="absolute right-0 top-1/2 h-8 w-px -translate-y-1/2 bg-primary-light" />
        </>
      )}
      <span
        className={`relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[8px] border transition-colors duration-300 ${
          isActive
            ? "border-primary-light/35 bg-primary-light/15 text-primary-light"
            : "border-neutral-700/55 bg-neutral-950/40 text-neutral-400 group-hover:border-primary-light/25 group-hover:text-primary-light"
        }`}
      >
        <Icon className="h-6 w-6" />
      </span>
      <span className="relative z-10 flex-1 font-heading text-lg font-bold leading-tight">
        {service.shortTitle}
      </span>
      {isActive && (
        <HiOutlineArrowRight className="relative z-10 h-5 w-5 flex-shrink-0 text-primary-light" />
      )}
    </button>
  );
}

/* ── Detail Panel ───────────────────────────────────────────── */
function ServiceIllustration() {
  return (
    <div className="pointer-events-none relative hidden min-h-[230px] flex-1 lg:block">
      <div className="absolute inset-0 opacity-60">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(45,212,191,0.16) 1px, transparent 1px), linear-gradient(35deg, rgba(14,165,233,0.13) 1px, transparent 1px)",
            backgroundSize: "92px 92px",
            maskImage:
              "radial-gradient(circle at 62% 42%, black 0%, transparent 68%)",
          }}
        />
      </div>

      <div className="absolute right-6 top-3 h-40 w-64 rotate-[-28deg] rounded-[8px] border border-info/50 bg-info/10 shadow-[0_0_42px_rgba(14,165,233,0.14)]" />
      <div className="absolute right-20 top-14 h-36 w-64 rotate-[-28deg] rounded-[8px] border border-primary-light/55 bg-primary-light/10 shadow-[0_0_40px_rgba(45,212,191,0.16)]" />
      <div className="absolute right-2 top-24 h-36 w-64 rotate-[-28deg] rounded-[8px] border border-info/55 bg-info/10 shadow-[0_0_42px_rgba(14,165,233,0.16)]" />
      <div className="absolute right-24 top-28 h-28 w-48 rotate-[-28deg] rounded-[8px] border border-primary-light/45 bg-neutral-950/45">
        <span className="absolute left-5 top-5 h-2 w-20 rounded-full bg-primary-light/45" />
        <span className="absolute left-5 top-10 h-2 w-32 rounded-full bg-info/35" />
        <span className="absolute left-5 top-16 h-2 w-24 rounded-full bg-primary-light/25" />
      </div>
      <div className="absolute right-12 top-9 flex rotate-[-28deg] gap-2">
        <span className="h-2 w-2 rounded-full bg-primary-light" />
        <span className="h-2 w-2 rounded-full bg-info" />
        <span className="h-2 w-2 rounded-full bg-primary-light/60" />
      </div>
    </div>
  );
}

function DetailPanel({ service }) {
  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="relative p-6 sm:p-8 lg:p-12"
    >
      <div className="flex gap-10">
        <div className="max-w-3xl flex-1">
          <span className="inline-flex items-center gap-5 text-sm font-bold uppercase tracking-[0.28em] text-primary-light">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-light shadow-[0_0_16px_rgba(45,212,191,0.9)]" />
            {service.category}
          </span>

          <h2 className="mt-7 font-heading text-4xl font-black leading-tight text-neutral-100 sm:text-5xl lg:text-6xl">
            {service.title}
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-400">
            {service.description}
          </p>
        </div>

        <ServiceIllustration />
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {service.features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/#contact"
          className="inline-flex min-h-14 items-center justify-center gap-3 rounded-[8px] border border-primary-light/60 bg-gradient-to-r from-primary to-primary-light/70 px-8 py-3 text-base font-bold text-neutral-white shadow-[0_0_34px_rgba(45,212,191,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(45,212,191,0.25)] sm:min-w-80"
        >
          Discuss this service
          <HiOutlineArrowRight className="h-5 w-5" />
        </Link>
        <Link
          href="/projects"
          className="inline-flex min-h-14 items-center justify-center gap-3 rounded-[8px] border border-neutral-700/80 bg-neutral-950/20 px-8 py-3 text-base font-bold text-neutral-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-light/35 hover:text-neutral-100 sm:min-w-56"
        >
          View related work
          <HiOutlineExternalLink className="h-5 w-5" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ── Main Explorer ──────────────────────────────────────────── */
export default function ServiceExplorer({ groupId }) {
  const services = groupId
    ? explorerServices.filter((s) => s.group === groupId)
    : explorerServices;

  const [activeId, setActiveId] = useState(services[0]?.id);
  const detailRef = useRef(null);

  const activeService =
    services.find((s) => s.id === activeId) || services[0];

  // Scroll detail panel to top on service change
  useEffect(() => {
    detailRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeId]);

  function handleSelect(id) {
    setActiveId(id);
  }

  // When groupId is set, sidebar shows a flat list (no group headers)
  // When no groupId, show all groups with headers
  const grouped = groupId
    ? [{ id: groupId, label: groupId, services }]
    : explorerGroups.map((group) => ({
        ...group,
        services: explorerServices.filter((s) => s.group === group.id),
      }));

  return (
    <div className="overflow-hidden rounded-[8px] border border-neutral-700/75 bg-neutral-950/25 shadow-2xl shadow-neutral-950/40">
      <div className="flex flex-col lg:flex-row">

        {/* ── Left Sidebar ── */}
        <aside
          className="flex w-full flex-shrink-0 flex-col border-b border-neutral-700/60 bg-neutral-950/45 lg:w-[22.5rem] lg:border-b-0 lg:border-r"
        >
          {/* Brand header */}
          <div className="flex-shrink-0 px-6 pb-8 pt-8">
            <div className="flex items-center gap-5">
              <Image
                src="/images/logo.png"
                alt="Effy Tech"
                width={62}
                height={62}
                className="object-contain"
                unoptimized
              />
              <div>
                <p className="font-heading text-3xl font-bold leading-none text-neutral-100">
                  {siteConfig.name}
                </p>
                <p className="mt-2 text-base leading-tight text-neutral-400">
                  {siteConfig.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Grouped service list */}
          <nav className="flex-1 space-y-4 px-5 pb-6">
            {grouped.map((group) => (
              <div key={group.id} className="mb-4">
                {!groupId && (
                  <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600">
                    {group.label}
                  </p>
                )}
                <div className="space-y-4">
                  {group.services.map((service) => (
                    <SidebarItem
                      key={service.id}
                      service={service}
                      isActive={service.id === activeId}
                      onClick={() => handleSelect(service.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* CTA footer */}
          <div className="m-5 mt-auto flex-shrink-0 rounded-[8px] border border-neutral-700/60 bg-neutral-950/25 p-6">
            <div className="mb-6">
              <span className="mb-6 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[8px] border border-primary-light/35 bg-primary-light/10 text-primary-light">
                <HiOutlineChat className="h-6 w-6" />
              </span>
              <div>
                <p className="font-heading text-xl font-bold text-neutral-100">
                  Have a project in mind?
                </p>
                <p className="mt-2 text-base leading-relaxed text-neutral-400">
                  Let&apos;s build something great together.
                </p>
              </div>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 rounded-[8px] border border-neutral-700/80 bg-neutral-900/50 px-6 py-3 text-base font-bold text-neutral-100 transition-all duration-300 hover:border-primary-light/45 hover:text-primary-light"
            >
              Contact Us
              <HiOutlineArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </aside>

        {/* ── Right Detail Panel ── */}
        <main
          ref={detailRef}
          className="relative flex-1 overflow-hidden bg-neutral-950/10"
        >
          <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-primary-light/5 blur-[110px]" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-info/5 blur-[120px]" />
          <AnimatePresence mode="wait">
            <DetailPanel key={activeService.id} service={activeService} />
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
