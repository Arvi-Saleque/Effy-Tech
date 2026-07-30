"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { explorerGroups, explorerServices } from "@/data/serviceExplorer";
import siteConfig from "@/theme/siteConfig";

const iconMap = {
  adjustments: HiOutlineAdjustments,
  bell: HiOutlineBell,
  chat: HiOutlineChat,
  "check-circle": HiOutlineCheckCircle,
  chip: HiOutlineChip,
  clipboard: HiOutlineClipboardList,
  cloud: HiOutlineCloud,
  code: HiOutlineCode,
  cog: HiOutlineCog,
  collection: HiOutlineCollection,
  cube: HiOutlineCube,
  "currency-dollar": HiOutlineCurrencyDollar,
  database: HiOutlineDatabase,
  "device-mobile": HiOutlineDeviceMobile,
  "document-text": HiOutlineDocumentText,
  globe: HiOutlineGlobe,
  "light-bulb": HiOutlineLightBulb,
  mail: HiOutlineMail,
  "pencil-alt": HiOutlinePencilAlt,
  "presentation-chart": HiOutlinePresentationChartLine,
  puzzle: HiOutlinePuzzle,
  refresh: HiOutlineRefresh,
  scale: HiOutlineScale,
  search: HiOutlineSearch,
  server: HiOutlineServer,
  "shield-check": HiOutlineShieldCheck,
  "shopping-bag": HiOutlineShoppingBag,
  sparkles: HiOutlineSparkles,
  template: HiOutlineTemplate,
  "trending-up": HiOutlineTrendingUp,
  users: HiOutlineUserGroup,
};

const getIcon = (key) => iconMap[key] || HiOutlineTemplate;

const serviceContext = {
  "website-webapp": {
    bestFor:
      "Companies, institutions, and service teams that need a credible public website or a workflow-driven web platform.",
    project: {
      href: "/projects/bangladesh-university-of-excellence-khulna",
      label: "BUEK digital platform",
    },
  },
  "mobile-app": {
    bestFor:
      "Products that need a focused Android or cross-platform experience with reliable everyday use.",
    project: {
      href: "/projects/islamic-amal-tracker",
      label: "Islamic Amal Tracker",
    },
  },
  "fullstack-software": {
    bestFor:
      "Operations that require a connected frontend, backend, database, roles, reporting, and administration layer.",
    project: {
      href: "/projects/effy-edu-management-system",
      label: "Effy Edu Management System",
    },
  },
  ecommerce: {
    bestFor:
      "Retailers and product businesses that need a manageable catalogue, ordering, payment, and fulfilment workflow.",
    project: {
      href: "/projects",
      label: "All Effy Tech case studies",
    },
  },
  "dashboard-admin": {
    bestFor:
      "Teams that need one controlled workspace for records, permissions, decisions, and operational visibility.",
    project: {
      href: "/projects/effy-edu-management-system",
      label: "Effy Edu Management System",
    },
  },
  "erp-management": {
    bestFor:
      "Growing organisations replacing disconnected spreadsheets and manual hand-offs with one role-based system.",
    project: {
      href: "/projects/effy-edu-management-system",
      label: "Effy Edu Management System",
    },
  },
  "mvp-startup": {
    bestFor:
      "Founders who need to validate a product with the smallest credible, testable, and launch-ready scope.",
    project: {
      href: "/projects/islamic-amal-tracker",
      label: "Islamic Amal Tracker",
    },
  },
  "education-solutions": {
    bestFor:
      "Schools, coaching centres, training programmes, and academic teams managing learning and operations.",
    project: {
      href: "/projects/effy-edu-management-system",
      label: "Effy Edu Management System",
    },
  },
  "business-automation": {
    bestFor:
      "Teams losing time to repeated data entry, approval chains, status updates, and manual coordination.",
    project: {
      href: "/projects/effy-edu-management-system",
      label: "Effy Edu Management System",
    },
  },
  "ai-automation": {
    bestFor:
      "Workflows where AI can assist classification, retrieval, drafting, support, or structured decision-making.",
    project: {
      href: "/projects",
      label: "All Effy Tech case studies",
    },
  },
  "api-integration": {
    bestFor:
      "Products that must exchange reliable data with payments, messaging, identity, analytics, or external platforms.",
    project: {
      href: "/projects",
      label: "All Effy Tech case studies",
    },
  },
  "crm-client-management": {
    bestFor:
      "Service teams that need structured leads, client records, follow-ups, ownership, and relationship history.",
    project: {
      href: "/projects/effy-edu-management-system",
      label: "Effy Edu Management System",
    },
  },
  "pos-inventory": {
    bestFor:
      "Retail and distribution operations that need dependable sales, stock, purchasing, and movement records.",
    project: {
      href: "/projects",
      label: "All Effy Tech case studies",
    },
  },
  "whatsapp-automation": {
    bestFor:
      "Customer-facing teams handling repetitive enquiries, confirmations, reminders, or status communication.",
    project: {
      href: "/projects",
      label: "All Effy Tech case studies",
    },
  },
  "data-reporting": {
    bestFor:
      "Decision-makers who need consistent operational metrics instead of manually assembled reports.",
    project: {
      href: "/projects/effy-edu-management-system",
      label: "Effy Edu Management System",
    },
  },
  "ui-ux": {
    bestFor:
      "New or existing products that need clearer journeys, stronger hierarchy, and implementation-ready interface decisions.",
    project: {
      href: "/projects/islamic-amal-tracker",
      label: "Islamic Amal Tracker",
    },
  },
  "hosting-deployment": {
    bestFor:
      "Teams that need a production environment, domain, security, release process, monitoring, and technical ownership.",
    project: {
      href: "/projects",
      label: "All Effy Tech case studies",
    },
  },
  "seo-growth": {
    bestFor:
      "Public websites that need sound technical foundations for discovery, measurement, and ongoing content growth.",
    project: {
      href: "/projects/bangladesh-university-of-excellence-khulna",
      label: "BUEK digital platform",
    },
  },
  "branding-creative": {
    bestFor:
      "New ventures and evolving organisations that need a consistent identity across product and communication touchpoints.",
    project: {
      href: "/projects/darul-hikmah-academy",
      label: "Darul Hikmah Academy",
    },
  },
  "software-consulting": {
    bestFor:
      "Teams that need requirements, architecture, technology, cost, or delivery decisions clarified before implementation.",
    project: {
      href: "/projects",
      label: "All Effy Tech case studies",
    },
  },
};

const defaultContext = {
  bestFor:
    "Teams that need a clearly scoped, maintainable digital system with practical ownership after launch.",
  project: {
    href: "/projects",
    label: "All Effy Tech case studies",
  },
};

function FeatureCard({ feature, dark }) {
  const Icon = getIcon(feature.icon);
  return (
    <div
      className={`rounded-[8px] border p-5 transition-all duration-300 hover:-translate-y-1 sm:p-6 ${dark ? "border-neutral-700/70 bg-neutral-950/25 hover:border-primary-light/40 hover:bg-neutral-900/55" : "border-border bg-surface hover:border-primary/30 hover:bg-primary-lightest/45 hover:shadow-md"}`}
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-[8px] border ${dark ? "border-primary-light/25 bg-primary-light/10 text-primary-light" : "border-primary-light/45 bg-primary-lightest text-primary-dark"}`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <h4
        className={`mt-5 font-heading text-lg font-black leading-tight ${dark ? "text-neutral-100" : "text-text-primary"}`}
      >
        {feature.title}
      </h4>
      <p
        className={`mt-2 text-sm leading-relaxed ${dark ? "text-neutral-400" : "text-text-secondary"}`}
      >
        {feature.description}
      </p>
    </div>
  );
}
function SidebarItem({
  service,
  active,
  onClick,
  onKeyDown,
  dark,
  buttonRef,
  tabId,
  panelId,
}) {
  const Icon = getIcon(service.menuIcon);

  return (
    <button
      ref={buttonRef}
      id={tabId}
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="tab"
      aria-controls={panelId}
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      className={`services-service-tab group flex min-w-[230px] items-center gap-3 rounded-[8px] border px-4 py-4 text-left transition-all duration-300 lg:min-w-0 lg:w-full ${dark ? (active ? "border-primary-light/55 bg-primary-light/10 text-neutral-100" : "border-neutral-700/55 bg-neutral-950/15 text-neutral-400 hover:border-primary-light/25 hover:text-neutral-200") : active ? "border-primary/40 bg-primary-lightest text-text-primary shadow-sm" : "border-border bg-neutral-white/70 text-text-secondary hover:border-primary/25 hover:bg-neutral-white"}`}
    >
      <span
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[8px] border ${dark ? (active ? "border-primary-light/30 bg-primary-light/10 text-primary-light" : "border-neutral-700/55 bg-neutral-950/25 text-neutral-400 group-hover:text-primary-light") : active ? "border-primary-light/55 bg-neutral-white text-primary-dark" : "border-border bg-surface text-text-tertiary group-hover:text-primary-dark"}`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1 font-heading text-sm font-black leading-tight sm:text-base">
        {service.shortTitle}
      </span>
      {active && (
        <HiOutlineCheckCircle
          className={`h-4 w-4 flex-shrink-0 ${dark ? "text-primary-light" : "text-primary-dark"}`}
          aria-hidden="true"
        />
      )}
    </button>
  );
}
function Illustration({ dark }) {
  return (
    <div className="pointer-events-none relative hidden min-h-[220px] flex-1 lg:block">
      <div
        className={`absolute right-8 top-4 h-36 w-56 rotate-[-25deg] rounded-[8px] border ${dark ? "border-neutral-600/65 bg-neutral-900/50" : "border-neutral-300 bg-surface-alt"}`}
      />
      <div
        className={`absolute right-20 top-16 h-36 w-56 rotate-[-25deg] rounded-[8px] border shadow-xl ${dark ? "border-primary-light/45 bg-primary-light/10 shadow-neutral-950/20" : "border-primary-light/55 bg-primary-lightest shadow-neutral-900/10"}`}
      >
        <span
          className={`absolute left-5 top-6 h-2 w-20 rounded-full ${dark ? "bg-primary-light/55" : "bg-primary/45"}`}
        />
        <span
          className={`absolute left-5 top-12 h-2 w-32 rounded-full ${dark ? "bg-neutral-600" : "bg-neutral-300"}`}
        />
        <span
          className={`absolute left-5 top-[4.5rem] h-2 w-24 rounded-full ${dark ? "bg-neutral-700" : "bg-neutral-200"}`}
        />
      </div>
      <div
        className={`absolute right-2 top-28 h-28 w-44 rotate-[-25deg] rounded-[8px] border ${dark ? "border-neutral-600/70 bg-neutral-950/40" : "border-neutral-300 bg-neutral-white"}`}
      />
      <div className="absolute right-16 top-9 flex rotate-[-25deg] gap-2">
        <span className="h-2 w-2 rounded-full bg-primary-light" />
        <span
          className={`h-2 w-2 rounded-full ${dark ? "bg-neutral-500" : "bg-neutral-400"}`}
        />
        <span className="h-2 w-2 rounded-full bg-primary" />
      </div>
    </div>
  );
}
function DetailPanel({ service, dark, panelId, tabId }) {
  const context = serviceContext[service.id] || defaultContext;
  const featuredDeliverables = service.features
    .slice(0, 3)
    .map((feature) => feature.title)
    .join(" · ");

  return (
    <motion.section
      key={service.id}
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      tabIndex={0}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="services-service-panel relative p-6 focus:outline-none sm:p-8 lg:p-10 xl:p-12"
    >
      <div className="flex gap-10">
        <div className="max-w-3xl flex-1">
          <span
            className={`font-mono text-xs font-bold uppercase tracking-[0.22em] ${dark ? "text-primary-light" : "text-primary"}`}
          >
            {service.category}
          </span>
          <h2
            className={`mt-5 max-w-3xl font-heading text-3xl font-black leading-tight sm:text-4xl lg:text-5xl ${dark ? "text-neutral-100" : "text-text-primary"}`}
          >
            {service.title}
          </h2>
          <p
            className={`mt-5 max-w-3xl text-base leading-relaxed sm:text-lg ${dark ? "text-neutral-400" : "text-text-secondary"}`}
          >
            {service.description}
          </p>
        </div>
        <Illustration dark={dark} />
      </div>
      <div
        className={`services-scope-grid mt-8 grid overflow-hidden rounded-[8px] border sm:grid-cols-2 xl:grid-cols-3 ${dark ? "border-neutral-700 bg-neutral-950/20" : "border-border bg-surface-alt/70"}`}
      >
        <div
          className={`p-5 sm:p-6 ${dark ? "border-neutral-700" : "border-border"} border-b sm:border-r xl:border-b-0`}
        >
          <p
            className={`font-mono text-[11px] font-bold uppercase tracking-[0.18em] ${dark ? "text-primary-light" : "text-primary"}`}
          >
            Best fit
          </p>
          <p
            className={`mt-3 text-sm leading-relaxed ${dark ? "text-neutral-300" : "text-text-secondary"}`}
          >
            {context.bestFor}
          </p>
        </div>
        <div
          className={`p-5 sm:p-6 ${dark ? "border-neutral-700" : "border-border"} border-b xl:border-b-0 xl:border-r`}
        >
          <p
            className={`font-mono text-[11px] font-bold uppercase tracking-[0.18em] ${dark ? "text-primary-light" : "text-primary"}`}
          >
            Featured deliverables
          </p>
          <p
            className={`mt-3 text-sm leading-relaxed ${dark ? "text-neutral-300" : "text-text-secondary"}`}
          >
            {featuredDeliverables}
          </p>
        </div>
        <div className="p-5 sm:col-span-2 sm:p-6 xl:col-span-1">
          <p
            className={`font-mono text-[11px] font-bold uppercase tracking-[0.18em] ${dark ? "text-primary-light" : "text-primary"}`}
          >
            Relevant work
          </p>
          <Link
            href={context.project.href}
            className={`mt-3 inline-flex items-center gap-2 text-sm font-black ${dark ? "text-neutral-100 hover:text-primary-light" : "text-text-primary hover:text-primary"}`}
          >
            {context.project.label}
            <HiOutlineArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {service.features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} dark={dark} />
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/contact"
          className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] px-6 py-3 text-sm font-black transition-transform hover:-translate-y-0.5 ${dark ? "bg-primary-light text-neutral-900" : "bg-surface-dark text-text-inverse"}`}
        >
          Discuss this service
          <HiOutlineArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href={context.project.href}
          className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border px-6 py-3 text-sm font-bold transition-colors ${dark ? "border-neutral-700 bg-neutral-950/20 text-neutral-200 hover:border-primary-light/35" : "border-border bg-neutral-white text-text-primary hover:border-primary/35"}`}
        >
          View relevant work
          <HiOutlineArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.section>
  );
}

export default function ServiceExplorer({
  groupId,
  groupLabel,
  groupNumber,
  tone = "light",
}) {
  const services = groupId
    ? explorerServices.filter((service) => service.group === groupId)
    : explorerServices;
  const dark = tone === "dark";
  const [activeId, setActiveId] = useState(services[0]?.id);
  const detailRef = useRef(null);
  const buttonRefs = useRef([]);

  useEffect(() => {
    const firstService = groupId
      ? explorerServices.find((service) => service.group === groupId)
      : explorerServices[0];
    setActiveId(firstService?.id);
  }, [groupId]);

  const activeService =
    services.find((service) => service.id === activeId) || services[0];
  const grouped = groupId
    ? [{ id: groupId, label: groupId, services }]
    : explorerGroups.map((group) => ({
        ...group,
        services: explorerServices.filter(
          (service) => service.group === group.id,
        ),
      }));

  if (!activeService) return null;

  const activeTabId = `service-tab-${activeService.id}`;
  const activePanelId = `service-panel-${activeService.id}`;

  function select(id, { scrollToDetail = true } = {}) {
    setActiveId(id);

    if (scrollToDetail && window.innerWidth < 1024) {
      window.requestAnimationFrame(() =>
        detailRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      );
    }
  }

  function handleTabKeyDown(event, index) {
    const keyTargets = {
      ArrowRight: (index + 1) % services.length,
      ArrowDown: (index + 1) % services.length,
      ArrowLeft: (index - 1 + services.length) % services.length,
      ArrowUp: (index - 1 + services.length) % services.length,
      Home: 0,
      End: services.length - 1,
    };
    const nextIndex = keyTargets[event.key];

    if (nextIndex === undefined) return;

    event.preventDefault();
    const nextService = services[nextIndex];
    select(nextService.id, { scrollToDetail: false });
    window.requestAnimationFrame(() => buttonRefs.current[nextIndex]?.focus());
  }

  return (
    <div
      className={`overflow-hidden rounded-[8px] border shadow-xl ${dark ? "border-neutral-700 bg-surface-dark shadow-neutral-950/20" : "border-border bg-neutral-white shadow-neutral-900/10"}`}
    >
      <div className="grid lg:grid-cols-[21rem_1fr]">
        <aside
          className={`border-b lg:border-b-0 lg:border-r ${dark ? "border-neutral-700 bg-neutral-black/30" : "border-border bg-surface-alt"}`}
        >
          <div className="flex items-center gap-4 px-5 pb-5 pt-6 sm:px-6 lg:pb-7 lg:pt-8">
            <Image
              src="/images/logo.png"
              alt="Effy Tech"
              width={48}
              height={48}
              className="object-contain"
            />
            <div>
              <p
                className={`font-heading text-xl font-black ${dark ? "text-neutral-100" : "text-text-primary"}`}
              >
                {groupNumber ? `${groupNumber} — ` : ""}
                {groupLabel || groupId || siteConfig.name}
              </p>
              <p
                className={`mt-1 text-xs ${dark ? "text-neutral-500" : "text-text-tertiary"}`}
              >
                {services.length} selectable capabilities. Choose one to inspect
                its scope.
              </p>
            </div>
          </div>
          <nav
            role="tablist"
            aria-label={`${groupId || "All"} services`}
            className="services-service-nav flex gap-3 overflow-x-auto px-5 pb-5 sm:px-6 lg:block lg:space-y-3 lg:overflow-visible lg:pb-6"
          >
            {grouped.flatMap((group) =>
              group.services.map((service, index) => {
                const serviceIndex = services.findIndex(
                  (item) => item.id === service.id,
                );
                const tabId = `service-tab-${service.id}`;
                const panelId = `service-panel-${service.id}`;

                return (
                  <SidebarItem
                    key={service.id}
                    service={service}
                    active={service.id === activeId}
                    onClick={() => select(service.id)}
                    onKeyDown={(event) =>
                      handleTabKeyDown(
                        event,
                        serviceIndex === -1 ? index : serviceIndex,
                      )
                    }
                    dark={dark}
                    buttonRef={(node) => {
                      if (serviceIndex !== -1) {
                        buttonRefs.current[serviceIndex] = node;
                      }
                    }}
                    tabId={tabId}
                    panelId={panelId}
                  />
                );
              }),
            )}
          </nav>
          <div
            className={`m-5 hidden rounded-[8px] border p-5 lg:block ${dark ? "border-neutral-700 bg-neutral-950/20" : "border-border bg-neutral-white"}`}
          >
            <HiOutlineChat
              className={`h-5 w-5 ${dark ? "text-primary-light" : "text-primary-dark"}`}
            />
            <p
              className={`mt-4 font-heading font-black ${dark ? "text-neutral-100" : "text-text-primary"}`}
            >
              Need a combined solution?
            </p>
            <p
              className={`mt-2 text-sm leading-relaxed ${dark ? "text-neutral-400" : "text-text-secondary"}`}
            >
              Most serious systems combine several capabilities. We scope them
              as one coherent product.
            </p>
            <Link
              href="/contact"
              className={`mt-4 inline-flex items-center gap-2 text-sm font-black ${dark ? "text-primary-light" : "text-primary-dark"}`}
            >
              Talk to Effy Tech
              <HiOutlineArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>
        <div
          ref={detailRef}
          className={`scroll-mt-28 ${dark ? "bg-surface-dark" : "bg-neutral-white"}`}
        >
          <AnimatePresence mode="wait">
            <DetailPanel
              key={activeService.id}
              service={activeService}
              dark={dark}
              panelId={activePanelId}
              tabId={activeTabId}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
