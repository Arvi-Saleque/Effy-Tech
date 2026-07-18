import { notFound } from "next/navigation";
import { getFinanceReferenceData, getFinanceTargetById } from "@/lib/admin/finance-actions";
import { getDhakaToday } from "@/lib/admin/finance-utils";
import FinanceFormShell from "@/components/admin/finance/FinanceFormShell";
import TargetForm from "@/components/admin/finance/TargetForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Finance Target - EffyOps" };

export default async function EditFinanceTargetPage({ params }) {
  const { targetId } = await params;
  const [targetResult, referenceResult] = await Promise.all([getFinanceTargetById(targetId), getFinanceReferenceData({ includeInactive: true })]);
  if (!targetResult.data) notFound();
  return <FinanceFormShell title="Edit financial target" description="Update the target definition without changing any ledger transactions." backHref="/admin/finance/targets">{referenceResult.error ? <p className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">{referenceResult.error}</p> : <TargetForm categories={referenceResult.data.categories} initialData={targetResult.data} today={getDhakaToday()} />}</FinanceFormShell>;
}

