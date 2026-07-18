import { getFinanceReferenceData } from "@/lib/admin/finance-actions";
import { getDhakaToday } from "@/lib/admin/finance-utils";
import FinanceFormShell from "@/components/admin/finance/FinanceFormShell";
import RecurringItemForm from "@/components/admin/finance/RecurringItemForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Add Recurring Finance Item - EffyOps" };

export default async function NewRecurringFinancePage() {
  const result = await getFinanceReferenceData();
  return <FinanceFormShell title="Add recurring item" description="Create a reusable schedule for renewals, subscriptions, regular expenses, or predictable income." backHref="/admin/finance/recurring">{result.error ? <p className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">{result.error}</p> : <RecurringItemForm references={result.data} today={getDhakaToday()} />}</FinanceFormShell>;
}

