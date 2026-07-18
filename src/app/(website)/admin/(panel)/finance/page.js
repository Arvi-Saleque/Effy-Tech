import Link from "next/link";
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  BanknoteArrowDown,
  BanknoteArrowUp,
  CalendarClock,
  CircleDollarSign,
  Landmark,
  Plus,
  ReceiptText,
  Scale,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { getFinanceOverview } from "@/lib/admin/finance-actions";
import { formatFinanceDate, formatMoney, METRIC_LABELS } from "@/lib/admin/finance-utils";
import FinancePageHeader from "@/components/admin/finance/FinancePageHeader";
import FinancePeriodFilter from "@/components/admin/finance/FinancePeriodFilter";
import FinanceStatusBadge from "@/components/admin/finance/FinanceStatusBadge";
import { CashflowChart, ExpenseBreakdownChart } from "@/components/admin/finance/FinanceCharts";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Finance Overview - EffyOps",
};

function Change({ value, inverse = false }) {
  if (value === null) return <span className="text-[11px] text-neutral-500">No previous-period baseline</span>;
  const positive = value >= 0;
  const good = inverse ? !positive : positive;
  const Icon = positive ? TrendingUp : TrendingDown;
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${good ? "text-emerald-400" : "text-rose-400"}`}>
      <Icon className="h-3 w-3" />
      {Math.abs(value).toFixed(1)}% vs previous period
    </span>
  );
}

function MetricCard({ label, value, supporting, change, inverse = false, icon: Icon, tone = "emerald" }) {
  const tones = {
    emerald: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
    rose: "border-rose-500/20 bg-rose-500/5 text-rose-400",
    sky: "border-sky-500/20 bg-sky-500/5 text-sky-400",
    amber: "border-amber-500/20 bg-amber-500/5 text-amber-400",
  };
  return (
    <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/45 p-5 shadow-xl backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-neutral-400">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-neutral-50">{value}</p>
        </div>
        <span className={`rounded-xl border p-2.5 ${tones[tone]}`}><Icon className="h-5 w-5" /></span>
      </div>
      <div className="mt-3 min-h-4">
        {change !== undefined ? <Change value={change} inverse={inverse} /> : <span className="text-[11px] text-neutral-500">{supporting}</span>}
      </div>
    </div>
  );
}

function SectionCard({ title, subtitle, action, children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5 shadow-xl backdrop-blur-xl ${className}`}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-neutral-200">{title}</h2>
          {subtitle ? <p className="mt-1 text-xs text-neutral-500">{subtitle}</p> : null}
        </div>
        {action ? <Link href={action.href} className="shrink-0 text-xs font-bold text-emerald-400 hover:text-emerald-300">{action.label}</Link> : null}
      </div>
      {children}
    </section>
  );
}

export default async function FinanceOverviewPage({ searchParams }) {
  const filters = await searchParams;
  const { data, error } = await getFinanceOverview(filters || {});

  if (error || !data) {
    return (
      <div className="space-y-6">
        <FinancePageHeader title="Finance Management" description="Company cash flow, client receivables, costs, renewals, and targets." />
        <div className="flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-5 text-rose-200">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div><p className="font-bold">Finance module is not ready yet</p><p className="mt-1 text-sm text-rose-300/80">{error}</p></div>
        </div>
      </div>
    );
  }

  const { period, totals, comparison } = data;
  return (
    <div className="space-y-6">
      <FinancePageHeader
        title="Finance Management"
        description="One source of truth for Effy Tech revenue, expenses, project dues, recurring commitments, and financial targets."
        action={{ href: "/admin/finance/transactions/new", label: "Record transaction", icon: Plus }}
      />

      <FinancePeriodFilter period={period} />

      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <p className="text-xs font-semibold text-neutral-300">Reporting period: {period.label}</p>
        <p className="text-[11px] text-neutral-500">All reporting values use BDT and cleared transactions unless marked planned.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Income received" value={formatMoney(totals.income)} change={comparison.income} icon={BanknoteArrowUp} tone="emerald" />
        <MetricCard label="Expenses paid" value={formatMoney(totals.expense)} change={comparison.expense} inverse icon={BanknoteArrowDown} tone="rose" />
        <MetricCard label="Net cash flow" value={formatMoney(totals.net)} change={comparison.net} icon={Scale} tone="sky" />
        <MetricCard
          label="Client receivables"
          value={formatMoney(totals.outstanding)}
          supporting={`${totals.overdueReceivables} overdue project${totals.overdueReceivables === 1 ? "" : "s"}`}
          icon={ReceiptText}
          tone="amber"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-neutral-800/80 bg-neutral-900/30 p-4">
          <span className="rounded-xl bg-violet-500/10 p-2.5 text-violet-300"><WalletCards className="h-5 w-5" /></span>
          <div><p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Current account balance</p><p className="mt-1 text-lg font-bold text-neutral-100">{formatMoney(totals.cashBalance)}</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-neutral-800/80 bg-neutral-900/30 p-4">
          <span className="rounded-xl bg-amber-500/10 p-2.5 text-amber-300"><CalendarClock className="h-5 w-5" /></span>
          <div><p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Planned expenses</p><p className="mt-1 text-lg font-bold text-neutral-100">{formatMoney(totals.plannedExpense)}</p></div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-neutral-800/80 bg-neutral-900/30 p-4">
          <span className="rounded-xl bg-sky-500/10 p-2.5 text-sky-300"><CircleDollarSign className="h-5 w-5" /></span>
          <div><p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Net margin</p><p className="mt-1 text-lg font-bold text-neutral-100">{totals.marginPercent === null ? "—" : `${totals.marginPercent.toFixed(1)}%`}</p></div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.8fr)]">
        <SectionCard title="Cash-flow trend" subtitle="Income, expense, and net movement inside the selected period">
          <CashflowChart data={data.cashflowTrend} />
        </SectionCard>
        <SectionCard title="Expense mix" subtitle="Where company money was spent">
          <ExpenseBreakdownChart data={data.expenseByCategory} />
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SectionCard title="Project receivables" subtitle="Contract value compared with cleared client payments" action={{ href: "/admin/finance/projects", label: "View all" }}>
          {data.projects.length ? (
            <div className="space-y-4">
              {data.projects.slice(0, 5).map((project) => {
                const progress = project.contract_value > 0 ? Math.min((project.received_amount / project.contract_value) * 100, 100) : 0;
                const overdue = project.outstanding_amount > 0 && project.payment_deadline && project.payment_deadline < period.today;
                return (
                  <div key={project.contract_id}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0"><p className="truncate text-sm font-semibold text-neutral-200">{project.project_name}</p><p className="mt-0.5 truncate text-[11px] text-neutral-500">{project.client_name}</p></div>
                      <div className="text-right"><p className="text-sm font-bold text-amber-300">{formatMoney(project.outstanding_amount)}</p><p className={`text-[10px] ${overdue ? "font-bold text-rose-400" : "text-neutral-500"}`}>{overdue ? "Overdue" : project.payment_deadline ? `Due ${formatFinanceDate(project.payment_deadline, { short: true })}` : "No deadline"}</p></div>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-800"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${progress}%` }} /></div>
                    <div className="mt-1.5 flex justify-between text-[10px] text-neutral-500"><span>{formatMoney(project.received_amount)} received</span><span>{progress.toFixed(0)}%</span></div>
                  </div>
                );
              })}
            </div>
          ) : <p className="py-10 text-center text-sm text-neutral-600">No project contracts have been configured.</p>}
        </SectionCard>

        <SectionCard title="Upcoming commitments" subtitle="Recurring renewals and planned transactions in the next 30 days" action={{ href: "/admin/finance/recurring", label: "Manage" }}>
          {data.upcoming.length ? (
            <div className="divide-y divide-neutral-800/70">
              {data.upcoming.slice(0, 6).map((item) => {
                const overdue = item.dueDate < period.today;
                return (
                  <div key={item.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className={`rounded-lg p-2 ${item.type === "income" ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300"}`}>{item.type === "income" ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}</span>
                      <div className="min-w-0"><p className="truncate text-sm font-medium text-neutral-200">{item.title}</p><p className={`mt-0.5 text-[10px] ${overdue ? "font-bold text-rose-400" : "text-neutral-500"}`}>{overdue ? "Overdue · " : ""}{formatFinanceDate(item.dueDate, { short: true })}{item.frequency ? ` · ${item.frequency}` : ""}</p></div>
                    </div>
                    <p className={`shrink-0 text-sm font-bold ${item.type === "income" ? "text-emerald-300" : "text-rose-300"}`}>{formatMoney(item.amount)}</p>
                  </div>
                );
              })}
            </div>
          ) : <p className="py-10 text-center text-sm text-neutral-600">No upcoming commitments in the next 30 days.</p>}
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <SectionCard title="Financial targets" subtitle="Live progress based on cleared ledger entries" action={{ href: "/admin/finance/targets", label: "View targets" }}>
          {data.targets.length ? (
            <div className="space-y-4">
              {data.targets.slice(0, 5).map((target) => {
                const capped = Math.min(Math.max(target.progress_percent, 0), 100);
                const overLimit = target.metric === "expense_limit" && target.actual_amount > target.target_amount;
                return (
                  <div key={target.id}>
                    <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-neutral-200">{target.name}</p><p className="mt-0.5 text-[10px] text-neutral-500">{METRIC_LABELS[target.metric]} · ends {formatFinanceDate(target.end_date, { short: true })}</p></div><p className={`text-sm font-bold ${overLimit ? "text-rose-300" : "text-neutral-200"}`}>{target.progress_percent.toFixed(0)}%</p></div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-800"><div className={`h-full rounded-full ${overLimit ? "bg-rose-500" : target.metric === "expense_limit" ? "bg-amber-500" : "bg-sky-500"}`} style={{ width: `${capped}%` }} /></div>
                    <div className="mt-1.5 flex justify-between text-[10px] text-neutral-500"><span>{formatMoney(target.actual_amount)} actual</span><span>{formatMoney(target.target_amount)} target</span></div>
                  </div>
                );
              })}
            </div>
          ) : <p className="py-10 text-center text-sm text-neutral-600">No active targets overlap this reporting period.</p>}
        </SectionCard>

        <SectionCard title="Account balances" subtitle="Opening balance plus all cleared ledger movement" action={{ href: "/admin/finance/settings", label: "Manage accounts" }}>
          {data.accounts.length ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {data.accounts.map((account) => (
                <div key={account.id} className="rounded-xl border border-neutral-800 bg-neutral-950/35 p-4">
                  <div className="flex items-center justify-between gap-3"><span className="rounded-lg bg-violet-500/10 p-2 text-violet-300"><Landmark className="h-4 w-4" /></span><span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600">{account.account_type.replaceAll("_", " ")}</span></div>
                  <p className="mt-3 truncate text-xs font-semibold text-neutral-400">{account.name}</p>
                  <p className={`mt-1 text-lg font-bold ${account.current_balance < 0 ? "text-rose-300" : "text-neutral-100"}`}>{formatMoney(account.current_balance)}</p>
                </div>
              ))}
            </div>
          ) : <p className="py-10 text-center text-sm text-neutral-600">No active finance accounts.</p>}
        </SectionCard>
      </div>

      <SectionCard title="Recent transactions" subtitle="Latest ledger activity across every period" action={{ href: "/admin/finance/transactions", label: "Open ledger" }}>
        {data.recentTransactions.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-neutral-800 text-[10px] uppercase tracking-wider text-neutral-500"><tr><th className="pb-3 font-bold">Date</th><th className="pb-3 font-bold">Transaction</th><th className="pb-3 font-bold">Type</th><th className="pb-3 font-bold">Account</th><th className="pb-3 font-bold">Project / Client</th><th className="pb-3 text-right font-bold">Amount</th></tr></thead>
              <tbody className="divide-y divide-neutral-800/60">
                {data.recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className={transaction.status === "void" ? "opacity-45" : ""}>
                    <td className="py-3 text-xs text-neutral-500">{formatFinanceDate(transaction.transaction_date, { short: true })}</td>
                    <td className="py-3"><p className="font-medium text-neutral-200">{transaction.title}</p><p className="mt-0.5 text-[10px] text-neutral-600">{transaction.category?.name || "Account transfer"}</p></td>
                    <td className="py-3"><div className="flex gap-1.5"><FinanceStatusBadge value={transaction.type} /><FinanceStatusBadge value={transaction.status} /></div></td>
                    <td className="py-3 text-xs text-neutral-400">{transaction.account?.name || "—"}</td>
                    <td className="py-3 text-xs text-neutral-400">{transaction.project?.name || transaction.client?.name || "—"}</td>
                    <td className={`py-3 text-right font-mono font-bold ${transaction.type === "income" ? "text-emerald-300" : transaction.type === "expense" ? "text-rose-300" : "text-sky-300"}`}>{transaction.type === "expense" ? "−" : transaction.type === "income" ? "+" : ""}{formatMoney(transaction.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p className="py-10 text-center text-sm text-neutral-600">No transactions have been recorded.</p>}
      </SectionCard>
    </div>
  );
}

