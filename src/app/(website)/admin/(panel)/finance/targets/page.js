import Link from "next/link";
import { AlertCircle, Goal, Plus } from "lucide-react";
import { getFinanceTargets } from "@/lib/admin/finance-actions";
import { formatFinanceDate, formatMoney, METRIC_LABELS } from "@/lib/admin/finance-utils";
import FinancePageHeader from "@/components/admin/finance/FinancePageHeader";
import FinanceStatusBadge from "@/components/admin/finance/FinanceStatusBadge";
import TargetActions from "@/components/admin/finance/TargetActions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Finance Targets - EffyOps" };

export default async function FinanceTargetsPage({ searchParams }) {
  const filters = await searchParams;
  const { data: targets, today, error } = await getFinanceTargets(filters || {});
  const active = targets.filter((target) => target.status === "active");
  const achieved = active.filter((target) => target.metric !== "expense_limit" && target.actual_amount >= target.target_amount).length;
  const overBudget = active.filter((target) => target.metric === "expense_limit" && target.actual_amount > target.target_amount).length;
  return (
    <div className="space-y-6">
      <FinancePageHeader title="Financial Targets" description="Set measurable revenue, net-profit, and expense-limit goals. Progress updates directly from cleared ledger entries." action={{ href: "/admin/finance/targets/new", label: "Create target", icon: Plus }} />
      {error ? <div className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200"><AlertCircle className="h-4 w-4" />{error}</div> : null}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3"><div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Active targets</p><p className="mt-2 text-xl font-bold text-neutral-100">{active.length}</p></div><div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Goals reached</p><p className="mt-2 text-xl font-bold text-emerald-300">{achieved}</p></div><div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Expense limits exceeded</p><p className={`mt-2 text-xl font-bold ${overBudget ? "text-rose-300" : "text-neutral-100"}`}>{overBudget}</p></div></div>
      <div className="flex gap-2 rounded-xl border border-neutral-800 bg-neutral-900/30 p-2 text-xs font-bold"><Link href="/admin/finance/targets" className={!filters?.status ? "rounded-lg bg-neutral-100 px-3 py-2 text-neutral-950" : "rounded-lg px-3 py-2 text-neutral-400"}>All</Link><Link href="/admin/finance/targets?status=active" className="rounded-lg px-3 py-2 text-neutral-400 hover:bg-neutral-800">Active</Link><Link href="/admin/finance/targets?status=completed" className="rounded-lg px-3 py-2 text-neutral-400 hover:bg-neutral-800">Completed</Link><Link href="/admin/finance/targets?status=cancelled" className="rounded-lg px-3 py-2 text-neutral-400 hover:bg-neutral-800">Cancelled</Link></div>
      {!targets.length ? <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/25"><Goal className="h-10 w-10 text-neutral-700" /><p className="mt-3 text-sm font-semibold text-neutral-500">No financial targets match this filter.</p></div> : <div className="grid gap-4 lg:grid-cols-2">{targets.map((target) => { const capped = Math.min(Math.max(target.progress_percent, 0), 100); const over = target.metric === "expense_limit" && target.actual_amount > target.target_amount; const expired = target.end_date < today; return <div key={target.id} className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5 shadow-xl"><div className="flex items-start justify-between gap-3"><div><p className="font-bold text-neutral-200">{target.name}</p><p className="mt-1 text-xs text-neutral-500">{METRIC_LABELS[target.metric]}{target.category_name ? ` · ${target.category_name}` : " · Company-wide"}</p></div><FinanceStatusBadge value={target.status} /></div><div className="mt-5 flex items-end justify-between"><div><p className="text-[10px] uppercase tracking-wider text-neutral-600">Actual</p><p className={`mt-1 font-mono text-xl font-bold ${over ? "text-rose-300" : "text-neutral-100"}`}>{formatMoney(target.actual_amount)}</p></div><div className="text-right"><p className="text-[10px] uppercase tracking-wider text-neutral-600">Target</p><p className="mt-1 font-mono text-sm font-bold text-neutral-300">{formatMoney(target.target_amount)}</p></div></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-neutral-800"><div className={`h-full rounded-full ${over ? "bg-rose-500" : target.metric === "expense_limit" ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${capped}%` }} /></div><div className="mt-2 flex justify-between text-[10px]"><span className={expired && target.status === "active" ? "font-bold text-rose-400" : "text-neutral-600"}>{formatFinanceDate(target.start_date, { short: true })} – {formatFinanceDate(target.end_date, { short: true })}{expired && target.status === "active" ? " · expired" : ""}</span><span className={`font-bold ${over ? "text-rose-400" : "text-neutral-400"}`}>{target.progress_percent.toFixed(1)}%</span></div><div className="mt-4 border-t border-neutral-800 pt-4"><TargetActions target={target} /></div></div>; })}</div>}
    </div>
  );
}

