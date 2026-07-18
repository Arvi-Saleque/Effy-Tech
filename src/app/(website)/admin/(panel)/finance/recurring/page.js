import Link from "next/link";
import { AlertCircle, CalendarClock, Plus, RefreshCw } from "lucide-react";
import { getRecurringFinanceItems } from "@/lib/admin/finance-actions";
import { daysBetween, formatFinanceDate, formatMoney } from "@/lib/admin/finance-utils";
import FinancePageHeader from "@/components/admin/finance/FinancePageHeader";
import FinanceStatusBadge from "@/components/admin/finance/FinanceStatusBadge";
import RecurringActions from "@/components/admin/finance/RecurringActions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Recurring Finance - EffyOps" };

export default async function RecurringFinancePage({ searchParams }) {
  const filters = await searchParams;
  const { data: items, today, error } = await getRecurringFinanceItems(filters || {});
  const active = items.filter((item) => item.status === "active");
  const monthlyCommitment = active.reduce((sum, item) => {
    const factor = item.frequency === "weekly" ? 52 / 12 : item.frequency === "monthly" ? 1 : item.frequency === "quarterly" ? 1 / 3 : 1 / 12;
    return sum + (item.type === "expense" ? item.amount * factor : 0);
  }, 0);
  const dueSoon = active.filter((item) => daysBetween(today, item.next_due_date) <= item.reminder_days).length;

  return (
    <div className="space-y-6">
      <FinancePageHeader title="Recurring Finance" description="Manage domain, hosting, software, retainers, contractor payments, and every scheduled financial commitment." action={{ href: "/admin/finance/recurring/new", label: "Add recurring item", icon: Plus }} />
      {error ? <div className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200"><AlertCircle className="h-4 w-4" />{error}</div> : null}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Active schedules</p><p className="mt-2 text-xl font-bold text-neutral-100">{active.length}</p></div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Estimated monthly cost</p><p className="mt-2 text-xl font-bold text-rose-300">{formatMoney(monthlyCommitment)}</p></div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Due / reminder window</p><p className={`mt-2 text-xl font-bold ${dueSoon ? "text-amber-300" : "text-neutral-100"}`}>{dueSoon}</p></div>
      </div>
      <div className="flex gap-2 overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/30 p-2 text-xs font-bold"><Link href="/admin/finance/recurring" className={!filters?.status && !filters?.type ? "rounded-lg bg-neutral-100 px-3 py-2 text-neutral-950" : "rounded-lg px-3 py-2 text-neutral-400"}>All</Link>{[["status=active", "Active"], ["status=paused", "Paused"], ["type=expense", "Expenses"], ["type=income", "Income"]].map(([query, label]) => <Link key={query} href={`/admin/finance/recurring?${query}`} className="rounded-lg px-3 py-2 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200">{label}</Link>)}</div>
      {!items.length ? <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/25"><RefreshCw className="h-9 w-9 text-neutral-700" /><p className="mt-3 text-sm font-semibold text-neutral-500">No recurring items match this filter.</p></div> : (
        <div className="grid gap-4 lg:grid-cols-2">
          {items.map((item) => {
            const days = daysBetween(today, item.next_due_date);
            const overdue = days < 0;
            const inWindow = days <= item.reminder_days;
            return <div key={item.id} className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5 shadow-xl"><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-3"><span className={`rounded-xl p-2.5 ${item.type === "expense" ? "bg-rose-500/10 text-rose-300" : "bg-emerald-500/10 text-emerald-300"}`}><CalendarClock className="h-5 w-5" /></span><div className="min-w-0"><p className="truncate font-bold text-neutral-200">{item.title}</p><p className="mt-1 text-xs text-neutral-500">{item.category?.name} · {item.frequency}</p></div></div><div className="flex gap-1.5"><FinanceStatusBadge value={item.type} /><FinanceStatusBadge value={item.status} /></div></div><div className="mt-5 grid grid-cols-2 gap-4 border-y border-neutral-800/70 py-4"><div><p className="text-[10px] uppercase tracking-wider text-neutral-600">Amount</p><p className={`mt-1 font-mono text-lg font-bold ${item.type === "expense" ? "text-rose-300" : "text-emerald-300"}`}>{formatMoney(item.amount)}</p></div><div><p className="text-[10px] uppercase tracking-wider text-neutral-600">Next due</p><p className={`mt-1 text-sm font-bold ${overdue ? "text-rose-400" : inWindow ? "text-amber-300" : "text-neutral-200"}`}>{formatFinanceDate(item.next_due_date, { short: true })}</p><p className={`mt-1 text-[10px] ${overdue ? "text-rose-400" : "text-neutral-600"}`}>{overdue ? `${Math.abs(days)} day(s) overdue` : days === 0 ? "Due today" : `In ${days} day(s)`}</p></div></div><div className="mt-4 flex items-end justify-between gap-3"><div className="text-[10px] text-neutral-600"><p>{item.account?.name}</p>{item.project?.name ? <p className="mt-1">{item.project.name} · {item.client?.name}</p> : null}</div><RecurringActions item={item} today={today} /></div></div>;
          })}
        </div>
      )}
    </div>
  );
}

