import React from "react";
import ProjectForm from "@/components/admin/ProjectForm";
import { getClients } from "@/lib/admin/client-actions";
import { getAllAdmins } from "@/lib/admin/auth";
import { FolderKanban } from "lucide-react";
import { uuidSchema } from "@/lib/admin/project-schema";

export const metadata = {
  title: "Create Project - EffyOps",
};

export default async function NewProjectPage({ searchParams }) {
  const params = await searchParams;

  const [{ data: clients }, { data: admins }] = await Promise.all([
    getClients({ status: "current" }), // Mostly need current/active for new projects
    getAllAdmins()
  ]);

  const activeAdmins = admins?.filter(a => a.is_active) || [];
  
  let safeClientId = "";
  if (params?.clientId) {
    const parsed = uuidSchema.safeParse(params.clientId);
    if (parsed.success) {
      const targetClient = clients?.find(c => c.id === parsed.data);
      if (targetClient && targetClient.status !== "archived") {
        safeClientId = parsed.data;
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FolderKanban className="w-8 h-8 text-emerald-500" />
        <div>
          <h1 className="text-2xl font-bold text-white">Create New Project</h1>
          <p className="text-neutral-400 text-sm mt-1">Start a new client project and assign a team.</p>
        </div>
      </div>

      <ProjectForm clients={clients || []} activeAdmins={activeAdmins} defaultClientId={safeClientId} />
    </div>
  );
}
