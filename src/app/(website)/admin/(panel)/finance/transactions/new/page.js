import { getFinanceReferenceData } from "@/lib/admin/finance-actions";
import { getDhakaToday } from "@/lib/admin/finance-utils";
import FinanceFormShell from "@/components/admin/finance/FinanceFormShell";
import TransactionForm from "@/components/admin/finance/TransactionForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Record Finance Transaction - EffyOps" };

export default async function NewFinanceTransactionPage({ searchParams }) {
  const params = await searchParams;
  const { data: references, error } = await getFinanceReferenceData({ includeInactive: false });
  const defaults = {
    type: ["income", "expense", "transfer"].includes(params?.type) ? params.type : "income",
    project_id: params?.project || "",
    client_id: params?.client || "",
    title: params?.title || "",
    amount: params?.amount || "",
    status: params?.status === "planned" ? "planned" : "cleared",
  };
  if (defaults.project_id && !defaults.client_id) {
    defaults.client_id = references.projects.find((project) => project.id === defaults.project_id)?.client_id || "";
  }
  return (
    <FinanceFormShell title="Record transaction" description="Add a cleared or planned ledger entry. Project-linked income automatically updates client receivables." backHref="/admin/finance/transactions">
      {error ? <p className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">{error}</p> : <TransactionForm references={references} defaults={defaults} today={getDhakaToday()} />}
    </FinanceFormShell>
  );
}

