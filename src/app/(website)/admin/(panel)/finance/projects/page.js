import Link from "next/link";
import { AlertCircle, ArrowDownToLine, ArrowUpFromLine, Plus, SearchX } from "lucide-react";
import { getProjectFinanceData } from "@/lib/admin/finance-actions";
import { formatFinanceDate, formatMoney, getDhakaToday } from "@/lib/admin/finance-utils";
import FinancePageHeader from "@/components/admin/finance/FinancePageHeader";
import FinanceStatusBadge from "@/components/admin/finance/FinanceStatusBadge";

export const dynamic = "force-dynamic";
export const metadata = { title: "Project Finance - EffyOps" };

export default async function ProjectFinancePage() {
  const { data: projects, availableProjects, totals, error } = await getProjectFinanceData();
  const today = getDhakaToday();
  const collectionRate = totals.contract > 0 ? (totals.received / totals.contract) * 100 : 0;

  return (
    <div className="space-y-6">
      <FinancePageHeader
        title="Project Finance"
        description="Track agreed project values, partial client payments, outstanding receivables, direct project costs, and realized margin."
        action={availableProjects.length ? { href: "/admin/finance/projects/new", label: "Add project finance", icon: Plus } : null}
      />
      {error ? <div className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200"><AlertCircle className="h-4 w-4" />{error}</div> : null}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {[
          ["Contracted value", totals.contract, "text-neutral-100"],
          ["Received", totals.received, "text-emerald-300"],
          ["Outstanding", totals.outstanding, "text-amber-300"],
          ["Direct project cost", totals.expenses, "text-rose-300"],
          ["Collection rate", `${collectionRate.toFixed(1)}%`, "text-sky-300", true],
        ].map(([label, value, color, raw]) => <div key={label} className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{label}</p><p className={`mt-2 text-lg font-bold ${color}`}>{raw ? value : formatMoney(value)}</p></div>)}
      </div>

      {!projects.length ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/25 p-8 text-center"><SearchX className="h-10 w-10 text-neutral-700" /><h2 className="mt-4 text-base font-bold text-neutral-300">No project finance records yet</h2><p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">Configure an existing client project, then record payments and costs against it.</p>{availableProjects.length ? <Link href="/admin/finance/projects/new" className="mt-5 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-emerald-950">Configure first project</Link> : null}</div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-900/40 shadow-xl">
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1120px] text-left text-sm">
              <thead className="border-b border-neutral-800 bg-neutral-950/35 text-[10px] uppercase tracking-wider text-neutral-500"><tr><th className="px-5 py-4">Project / Client</th><th className="px-5 py-4">Contract</th><th className="px-5 py-4">Collection</th><th className="px-5 py-4">Outstanding</th><th className="px-5 py-4">Project cost</th><th className="px-5 py-4">Realized net</th><th className="px-5 py-4">Deadline</th><th className="px-5 py-4 text-right">Actions</th></tr></thead>
              <tbody className="divide-y divide-neutral-800/60">
                {projects.map((project) => {
                  const progress = project.contract_value > 0 ? Math.min((project.received_amount / project.contract_value) * 100, 100) : 0;
                  const overdue = project.outstanding_amount > 0 && project.payment_deadline && project.payment_deadline < today;
                  return (
                    <tr key={project.contract_id} className="hover:bg-neutral-800/15">
                      <td className="px-5 py-4"><p className="font-semibold text-neutral-200">{project.project_name}</p><p className="mt-0.5 text-xs text-neutral-500">{project.client_name}</p><div className="mt-2"><FinanceStatusBadge value={project.contract_status} /></div></td>
                      <td className="px-5 py-4 font-mono font-bold text-neutral-200">{formatMoney(project.contract_value)}</td>
                      <td className="min-w-48 px-5 py-4"><div className="flex justify-between text-xs"><span className="font-mono font-semibold text-emerald-300">{formatMoney(project.received_amount)}</span><span className="text-neutral-500">{progress.toFixed(0)}%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-800"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${progress}%` }} /></div></td>
                      <td className="px-5 py-4"><p className="font-mono font-bold text-amber-300">{formatMoney(project.outstanding_amount)}</p>{project.overpaid_amount > 0 ? <p className="mt-1 text-[10px] text-sky-300">Overpaid {formatMoney(project.overpaid_amount)}</p> : null}</td>
                      <td className="px-5 py-4 font-mono font-semibold text-rose-300">{formatMoney(project.expense_amount)}</td>
                      <td className={`px-5 py-4 font-mono font-bold ${project.realized_net_cash < 0 ? "text-rose-300" : "text-sky-300"}`}>{formatMoney(project.realized_net_cash)}</td>
                      <td className="px-5 py-4"><p className={`text-xs ${overdue ? "font-bold text-rose-400" : "text-neutral-400"}`}>{project.payment_deadline ? formatFinanceDate(project.payment_deadline, { short: true }) : "No deadline"}</p>{overdue ? <p className="mt-1 text-[10px] text-rose-400">Payment overdue</p> : null}</td>
                      <td className="px-5 py-4"><div className="flex justify-end gap-3 text-xs font-bold"><Link href={`/admin/finance/transactions/new?type=income&project=${project.project_id}&client=${project.client_id}`} className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300"><ArrowDownToLine className="h-3.5 w-3.5" />Payment</Link><Link href={`/admin/finance/transactions/new?type=expense&project=${project.project_id}&client=${project.client_id}`} className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300"><ArrowUpFromLine className="h-3.5 w-3.5" />Cost</Link><Link href={`/admin/finance/projects/${project.contract_id}/edit`} className="text-sky-400 hover:text-sky-300">Edit</Link></div></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-neutral-800/60 lg:hidden">
            {projects.map((project) => {
              const progress = project.contract_value > 0 ? Math.min((project.received_amount / project.contract_value) * 100, 100) : 0;
              return (
                <div key={project.contract_id} className="p-5">
                  <div className="flex items-start justify-between gap-3"><div><p className="font-bold text-neutral-200">{project.project_name}</p><p className="mt-1 text-xs text-neutral-500">{project.client_name}</p></div><FinanceStatusBadge value={project.contract_status} /></div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs"><div><p className="text-neutral-600">Contract</p><p className="mt-1 font-bold text-neutral-200">{formatMoney(project.contract_value)}</p></div><div><p className="text-neutral-600">Outstanding</p><p className="mt-1 font-bold text-amber-300">{formatMoney(project.outstanding_amount)}</p></div><div><p className="text-neutral-600">Received</p><p className="mt-1 font-bold text-emerald-300">{formatMoney(project.received_amount)}</p></div><div><p className="text-neutral-600">Project cost</p><p className="mt-1 font-bold text-rose-300">{formatMoney(project.expense_amount)}</p></div></div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-neutral-800"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${progress}%` }} /></div>
                  <div className="mt-4 flex flex-wrap gap-3 border-t border-neutral-800 pt-4 text-xs font-bold"><Link href={`/admin/finance/transactions/new?type=income&project=${project.project_id}&client=${project.client_id}`} className="text-emerald-400">Record payment</Link><Link href={`/admin/finance/transactions/new?type=expense&project=${project.project_id}&client=${project.client_id}`} className="text-rose-400">Record cost</Link><Link href={`/admin/finance/projects/${project.contract_id}/edit`} className="ml-auto text-sky-400">Edit</Link></div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

