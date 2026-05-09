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
  HiOutlineChartBar,
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
    <div className="rounded-xl border border-neutral-700/50 bg-neutral-800/40 p-4 transition-colors duration-200 hover:border-primary-light/30 hover:bg-neutral-800/70">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-primary-light/20 bg-primary-light/10 text-primary-light">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <h4 className="text-sm font-semibold text-neutral-100">{feature.title}</h4>
      </div>
      <p className="text-sm leading-relaxed text-neutral-400">{feature.description}</p>
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
      className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-200 ${
        isActive
          ? "border-primary/30 bg-primary/10 text-neutral-100"
          : "border-transparent text-neutral-400 hover:border-neutral-700/50 hover:bg-neutral-800/50 hover:text-neutral-200"
      }`}
    >
      <span
        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 ${
          isActive
            ? "border-primary-light/30 bg-primary-light/10 text-primary-light"
            : "border-neutral-700/50 bg-neutral-800/40 text-neutral-500 group-hover:border-neutral-600/50 group-hover:text-neutral-400"
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1 text-sm font-medium leading-tight">
        {service.shortTitle}
      </span>
      {isActive && (
        <HiOutlineArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-primary-light" />
      )}
    </button>
  );
}

/* ── Detail Panel ───────────────────────────────────────────── */
function DetailPanel({ service }) {
  const MenuIcon = getIcon(service.menuIcon);
  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="p-6 sm:p-8 lg:p-10"
    >
      {/* Top: badge + visual icon */}
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-light">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-light" />
          {service.category}
        </span>
        {/* Decorative service icon — top-right */}
        <span className="hidden items-center justify-center rounded-2xl border border-primary-light/15 bg-primary-light/8 p-4 sm:flex">
          <MenuIcon className="h-10 w-10 text-primary-light/60" />
        </span>
      </div>

      {/* Title */}
      <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-neutral-100 sm:text-4xl">
        {service.title}
      </h2>

      {/* Description */}
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-400">
        {service.description}
      </p>

      {/* Feature grid */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {service.features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-neutral-white transition-all duration-200 hover:bg-primary-dark hover:-translate-y-0.5"
        >
          Discuss this service
          <HiOutlineArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-5 py-2.5 text-sm font-semibold text-neutral-300 transition-all duration-200 hover:border-neutral-500 hover:text-neutral-100"
        >
          View related work
          <HiOutlineExternalLink className="h-4 w-4" />
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
    <div className="overflow-hidden rounded-2xl border border-neutral-800/50 bg-neutral-900/30 shadow-2xl shadow-neutral-950/40">
      <div className="flex flex-col sm:flex-row">

        {/* ── Left Sidebar ── */}
        <aside
          className="flex w-full flex-shrink-0 flex-col border-b border-neutral-800/50 bg-neutral-950/80 sm:w-72 sm:border-b-0 sm:border-r"
        >
          {/* Brand header */}
          <div className="flex-shrink-0 border-b border-neutral-800/50 px-4 py-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Effy Tech"
                width={36}
                height={36}
                className="object-contain"
                unoptimized
              />
              <div>
                <p className="text-sm font-bold text-neutral-100">
                  {siteConfig.name}
                </p>
                <p className="text-[11px] leading-tight text-neutral-500">
                  {siteConfig.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Grouped service list */}
          <nav className="px-3 py-3">
            {grouped.map((group) => (
              <div key={group.id} className="mb-4">
                {!groupId && (
                  <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600">
                    {group.label}
                  </p>
                )}
                <div className="space-y-0.5">
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
          <div className="flex-shrink-0 border-t border-neutral-800/50 p-4">
            <div className="mb-3 flex items-start gap-2.5">
              <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-neutral-700/50 bg-neutral-800/50 text-neutral-500">
                <HiOutlineChat className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-neutral-200">
                  Have a project in mind?
                </p>
                <p className="text-xs leading-snug text-neutral-500">
                  Let&apos;s build something great together.
                </p>
              </div>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-sm font-semibold text-primary-light transition-all duration-200 hover:bg-primary/20"
            >
              Contact Us
              <HiOutlineArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </aside>

        {/* ── Right Detail Panel ── */}
        <main
          ref={detailRef}
          className="flex-1 bg-neutral-900/20"
        >
          <AnimatePresence mode="wait">
            <DetailPanel key={activeService.id} service={activeService} />
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
