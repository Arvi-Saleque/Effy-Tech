import { notFound } from "next/navigation";
import { getFinanceReferenceData, getFinanceTransactionById } from "@/lib/admin/finance-actions";
import { getDhakaToday } from "@/lib/admin/finance-utils";
import FinanceFormShell from "@/components/admin/finance/FinanceFormShell";
import TransactionForm from "@/components/admin/finance/TransactionForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Finance Transaction - EffyOps" };

export default async function EditFinanceTransactionPage({ params }) {
  const { transactionId } = await params;
  const [transactionResult, referenceResult] = await Promise.all([
    getFinanceTransactionById(transactionId),
    getFinanceReferenceData({ includeInactive: true }),
  ]);
  if (!transactionResult.data) notFound();
  return (
    <FinanceFormShell title="Edit transaction" description="Corrections are audit logged. Void an incorrect entry instead of deleting financial history." backHref="/admin/finance/transactions">
      {referenceResult.error ? <p className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">{referenceResult.error}</p> : <TransactionForm references={referenceResult.data} initialData={transactionResult.data} today={getDhakaToday()} />}
    </FinanceFormShell>
  );
}

