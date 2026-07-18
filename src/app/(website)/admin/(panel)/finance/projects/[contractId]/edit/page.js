import { notFound } from "next/navigation";
import { getProjectContractById } from "@/lib/admin/finance-actions";
import FinanceFormShell from "@/components/admin/finance/FinanceFormShell";
import ProjectContractForm from "@/components/admin/finance/ProjectContractForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Project Finance - EffyOps" };

export default async function EditProjectFinancePage({ params }) {
  const { contractId } = await params;
  const result = await getProjectContractById(contractId);
  if (!result.data) notFound();
  const projectOption = { ...result.data.project, project: result.data.project };
  return (
    <FinanceFormShell title="Edit project finance" description="Update agreed value, payment deadline, status, or terms. Existing ledger entries remain unchanged." backHref="/admin/finance/projects">
      <ProjectContractForm projects={[projectOption]} initialData={result.data} />
    </FinanceFormShell>
  );
}

