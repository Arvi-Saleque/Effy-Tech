import React from "react";
import ProjectForm from "@/components/admin/ProjectForm";
import { getProjectById } from "@/lib/admin/project-actions";
import { getClients } from "@/lib/admin/client-actions";
import { notFound } from "next/navigation";
import { FolderKanban } from "lucide-react";

export const metadata = {
  title: "Edit Project - EffyOps",
};

export default async function EditProjectPage({ params }) {
  const resolvedParams = await params;
  const [{ data: project, error }, { data: clients }] = await Promise.all([
    getProjectById(resolvedParams.projectId),
    getClients({ status: "all" })
  ]);

  if (error || !project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FolderKanban className="w-8 h-8 text-blue-500" />
        <div>
          <h1 className="text-2xl font-bold text-white">Edit Project</h1>
          <p className="text-neutral-400 text-sm mt-1">{project.name}</p>
        </div>
      </div>

      <ProjectForm initialData={project} clients={clients || []} activeAdmins={[]} />
    </div>
  );
}
