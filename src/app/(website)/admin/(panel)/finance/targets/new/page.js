import { getFinanceReferenceData } from "@/lib/admin/finance-actions";
import { getDhakaToday } from "@/lib/admin/finance-utils";
import FinanceFormShell from "@/components/admin/finance/FinanceFormShell";
import TargetForm from "@/components/admin/finance/TargetForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Create Finance Target - EffyOps" };

export default async function NewFinanceTargetPage() {
  const result = await getFinanceReferenceData();
  return <FinanceFormShell title="Create financial target" description="Choose the metric, amount, scope, and reporting period. Progress will stay linked to the ledger." backHref="/admin/finance/targets">{result.error ? <p className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">{result.error}</p> : <TargetForm categories={result.data.categories} today={getDhakaToday()} />}</FinanceFormShell>;
}

