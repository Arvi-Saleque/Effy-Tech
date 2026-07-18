"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartNoAxesCombined,
  FolderKanban,
  Goal,
  ListChecks,
  RefreshCw,
  Settings2,
} from "lucide-react";

const links = [
  { href: "/admin/finance", label: "Overview", icon: ChartNoAxesCombined, exact: true },
  { href: "/admin/finance/transactions", label: "Transactions", icon: ListChecks },
  { href: "/admin/finance/projects", label: "Project Finance", icon: FolderKanban },
  { href: "/admin/finance/recurring", label: "Recurring", icon: RefreshCw },
  { href: "/admin/finance/targets", label: "Targets", icon: Goal },
  { href: "/admin/finance/settings", label: "Setup", icon: Settings2 },
];

export default function FinanceNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Finance navigation"
      className="flex items-center gap-1 overflow-x-auto rounded-2xl border border-neutral-800/80 bg-neutral-900/45 p-1.5 shadow-xl backdrop-blur-xl"
    >
      {links.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all sm:text-sm ${
              active
                ? "border border-emerald-500/25 bg-emerald-500/10 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.07)]"
                : "border border-transparent text-neutral-400 hover:bg-neutral-800/60 hover:text-neutral-200"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

