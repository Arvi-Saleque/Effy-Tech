import { AlertCircle, ArrowRightLeft, Plus, SearchX } from "lucide-react";
import { getFinanceReferenceData, getFinanceTransactions } from "@/lib/admin/finance-actions";
import { formatFinanceDate, formatMoney } from "@/lib/admin/finance-utils";
import FinancePageHeader from "@/components/admin/finance/FinancePageHeader";
import FinanceStatusBadge from "@/components/admin/finance/FinanceStatusBadge";
import TransactionActions from "@/components/admin/finance/TransactionActions";
import TransactionFilters from "@/components/admin/finance/TransactionFilters";

export const dynamic = "force-dynamic";
export const metadata = { title: "Finance Transactions - EffyOps" };

export default async function FinanceTransactionsPage({ searchParams }) {
  const filters = await searchParams;
  const [transactionsResult, referenceResult] = await Promise.all([
    getFinanceTransactions(filters || {}),
    getFinanceReferenceData({ includeInactive: true }),
  ]);
  const error = transactionsResult.error || referenceResult.error;

  return (
    <div className="space-y-6">
      <FinancePageHeader
        title="Transaction Ledger"
        description="Every received payment, company expense, planned cash movement, and internal account transfer. Void entries stay preserved for auditability."
        action={{ href: "/admin/finance/transactions/new", label: "Record transaction", icon: Plus }}
      />

      {error ? <div className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200"><AlertCircle className="h-4 w-4" />{error}</div> : null}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {[
          ["Cleared income", formatMoney(transactionsResult.summary.income), "text-emerald-300"],
          ["Cleared expense", formatMoney(transactionsResult.summary.expense), "text-rose-300"],
          ["Net", formatMoney(transactionsResult.summary.net), transactionsResult.summary.net < 0 ? "text-rose-300" : "text-sky-300"],
          ["Planned income", formatMoney(transactionsResult.summary.plannedIncome), "text-emerald-400"],
          ["Planned expense", formatMoney(transactionsResult.summary.plannedExpense), "text-amber-300"],
        ].map(([label, value, color]) => <div key={label} className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{label}</p><p className={`mt-2 text-lg font-bold ${color}`}>{value}</p></div>)}
      </div>

      <TransactionFilters filters={transactionsResult.filters || {}} references={referenceResult.data} />

      <div className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-900/40 shadow-xl">
        {!transactionsResult.data.length ? (
          <div className="flex min-h-60 flex-col items-center justify-center p-8 text-center"><SearchX className="h-9 w-9 text-neutral-700" /><p className="mt-3 text-sm font-semibold text-neutral-400">No transactions match these filters.</p></div>
        ) : (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1020px] text-left text-sm">
                <thead className="border-b border-neutral-800 bg-neutral-950/35 text-[10px] uppercase tracking-wider text-neutral-500"><tr><th className="px-5 py-4">Date</th><th className="px-5 py-4">Transaction</th><th className="px-5 py-4">Type / Status</th><th className="px-5 py-4">Account</th><th className="px-5 py-4">Client / Project</th><th className="px-5 py-4 text-right">Amount</th><th className="px-5 py-4 text-right">Actions</th></tr></thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {transactionsResult.data.map((transaction) => (
                    <tr key={transaction.id} className={`transition hover:bg-neutral-800/15 ${transaction.status === "void" ? "opacity-45" : ""}`}>
                      <td className="px-5 py-4 text-xs text-neutral-500">{formatFinanceDate(transaction.transaction_date, { short: true })}</td>
                      <td className="max-w-64 px-5 py-4"><p className="truncate font-semibold text-neutral-200">{transaction.title}</p><p className="mt-0.5 truncate text-[10px] text-neutral-600">{transaction.reference || transaction.category?.name || "No reference"}</p></td>
                      <td className="px-5 py-4"><div className="flex gap-1.5"><FinanceStatusBadge value={transaction.type} /><FinanceStatusBadge value={transaction.status} /></div></td>
                      <td className="px-5 py-4 text-xs text-neutral-400">{transaction.account?.name || "—"}{transaction.type === "transfer" ? <span className="flex items-center gap-1 text-sky-400"><ArrowRightLeft className="h-3 w-3" />{transaction.destination_account?.name}</span> : null}</td>
                      <td className="px-5 py-4 text-xs text-neutral-400"><p>{transaction.project?.name || "—"}</p><p className="mt-0.5 text-[10px] text-neutral-600">{transaction.client?.name || ""}</p></td>
                      <td className={`px-5 py-4 text-right font-mono font-bold ${transaction.type === "income" ? "text-emerald-300" : transaction.type === "expense" ? "text-rose-300" : "text-sky-300"}`}>{transaction.type === "income" ? "+" : transaction.type === "expense" ? "−" : ""}{formatMoney(transaction.amount)}</td>
                      <td className="px-5 py-4"><TransactionActions transaction={transaction} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="divide-y divide-neutral-800/60 lg:hidden">
              {transactionsResult.data.map((transaction) => (
                <div key={transaction.id} className={`p-4 ${transaction.status === "void" ? "opacity-45" : ""}`}>
                  <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-semibold text-neutral-200">{transaction.title}</p><p className="mt-1 text-[10px] text-neutral-500">{formatFinanceDate(transaction.transaction_date, { short: true })} · {transaction.account?.name}</p></div><p className={`shrink-0 font-mono text-sm font-bold ${transaction.type === "income" ? "text-emerald-300" : transaction.type === "expense" ? "text-rose-300" : "text-sky-300"}`}>{formatMoney(transaction.amount)}</p></div>
                  <div className="mt-3 flex items-center justify-between gap-3"><div className="flex gap-1.5"><FinanceStatusBadge value={transaction.type} /><FinanceStatusBadge value={transaction.status} /></div><TransactionActions transaction={transaction} /></div>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-800 bg-neutral-950/25 px-5 py-3 text-center text-[10px] text-neutral-600">Showing {transactionsResult.data.length} entries{transactionsResult.truncated ? " · Narrow filters to see older records" : ""}</div>
          </>
        )}
      </div>
    </div>
  );
}

