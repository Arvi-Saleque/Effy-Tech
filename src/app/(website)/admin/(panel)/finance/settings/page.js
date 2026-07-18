import { AlertCircle, History } from "lucide-react";
import { getFinanceSettingsData } from "@/lib/admin/finance-actions";
import { formatFinanceDate } from "@/lib/admin/finance-utils";
import FinancePageHeader from "@/components/admin/finance/FinancePageHeader";
import FinanceSetupManager from "@/components/admin/finance/FinanceSetupManager";

export const dynamic = "force-dynamic";
export const metadata = { title: "Finance Setup - EffyOps" };

export default async function FinanceSettingsPage() {
  const { data, error } = await getFinanceSettingsData();
  return (
    <div className="space-y-6">
      <FinancePageHeader title="Finance Setup" description="Configure money accounts and reporting categories. All changes are admin-only and retained in the finance audit history." />
      {error ? <div className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200"><AlertCircle className="h-4 w-4" />{error}</div> : null}
      <FinanceSetupManager accounts={data.accounts} categories={data.categories} />
      <section className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5 shadow-xl">
        <div className="mb-4 flex items-center gap-2"><History className="h-4 w-4 text-violet-300" /><div><h2 className="text-sm font-bold text-neutral-200">Recent finance audit activity</h2><p className="mt-0.5 text-[10px] text-neutral-500">Insertions and changes are recorded automatically; finance records are never hard-deleted from the UI.</p></div></div>
        {data.audit.length ? <div className="divide-y divide-neutral-800/70">{data.audit.map((entry) => <div key={entry.id} className="flex flex-col justify-between gap-1 py-3 text-xs sm:flex-row sm:items-center"><div><span className={`mr-2 rounded px-1.5 py-0.5 text-[9px] font-bold ${entry.action === "INSERT" ? "bg-emerald-500/10 text-emerald-300" : "bg-sky-500/10 text-sky-300"}`}>{entry.action}</span><span className="text-neutral-300">{entry.entity_type.replace("finance_", "").replaceAll("_", " ")}</span></div><div className="text-[10px] text-neutral-600">{entry.changed_by_profile?.name || "System"} · {formatFinanceDate(entry.changed_at, { short: true })}</div></div>)}</div> : <p className="py-8 text-center text-sm text-neutral-600">No audit activity yet.</p>}
      </section>
    </div>
  );
}

