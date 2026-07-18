import { getProjectFinanceData } from "@/lib/admin/finance-actions";
import FinanceFormShell from "@/components/admin/finance/FinanceFormShell";
import ProjectContractForm from "@/components/admin/finance/ProjectContractForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Add Project Finance - EffyOps" };

export default async function NewProjectFinancePage() {
  const result = await getProjectFinanceData();
  return (
    <FinanceFormShell title="Add project finance" description="Set the agreed project value and payment terms. Collections and costs will come from linked ledger transactions." backHref="/admin/finance/projects">
      {result.error ? <p className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">{result.error}</p> : result.availableProjects.length ? <ProjectContractForm projects={result.availableProjects} /> : <p className="py-8 text-center text-sm text-neutral-500">Every current project already has a finance record.</p>}
    </FinanceFormShell>
  );
}

