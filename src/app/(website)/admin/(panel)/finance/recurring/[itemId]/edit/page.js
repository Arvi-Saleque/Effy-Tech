import { notFound } from "next/navigation";
import { getFinanceReferenceData, getRecurringFinanceItemById } from "@/lib/admin/finance-actions";
import { getDhakaToday } from "@/lib/admin/finance-utils";
import FinanceFormShell from "@/components/admin/finance/FinanceFormShell";
import RecurringItemForm from "@/components/admin/finance/RecurringItemForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Recurring Finance Item - EffyOps" };

export default async function EditRecurringFinancePage({ params }) {
  const { itemId } = await params;
  const [itemResult, referenceResult] = await Promise.all([getRecurringFinanceItemById(itemId), getFinanceReferenceData({ includeInactive: true })]);
  if (!itemResult.data) notFound();
  return <FinanceFormShell title="Edit recurring item" description="Change the schedule, allocation, amount, reminder window, or lifecycle status." backHref="/admin/finance/recurring">{referenceResult.error ? <p className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">{referenceResult.error}</p> : <RecurringItemForm references={referenceResult.data} initialData={itemResult.data} today={getDhakaToday()} />}</FinanceFormShell>;
}

