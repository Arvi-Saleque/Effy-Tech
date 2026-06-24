import React from "react";
import Link from "next/link";
import { getProjectById } from "@/lib/admin/project-actions";
import { createClient } from "@/lib/supabase/server";
import TaskForm from "@/components/admin/TaskForm";

export default async function NewTaskPage({ params }) {
  const { projectId } = await params;

  const { data: project } = await getProjectById(projectId);
  if (!project) {
    return <div className="p-8 text-red-400">Project not found</div>;
  }
  if (project.status === "archived" || project.status === "cancelled" || project.status === "completed") {
    return <div className="p-8 text-red-400">Cannot add tasks to archived, cancelled, or completed projects.</div>;
  }

  const supabase = await createClient();
  const { data: members } = await supabase.from("project_members")
    .select("user_id, project_role, admin_profiles!project_members_user_id_fkey!inner(name, email, is_active)")
    .eq("project_id", projectId);

  const activeMembers = members?.filter(m => m.admin_profiles.is_active) || [];

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href={`/admin/projects/${projectId}/tasks`} className="text-sm text-blue-400 hover:underline mb-2 inline-block">
          &larr; Back to Tasks
        </Link>
        <h1 className="text-2xl font-semibold text-slate-100">Create Task</h1>
        <p className="text-slate-400 text-sm mt-1">Add a new task to {project.name}</p>
      </div>

      <TaskForm projectId={projectId} projectMembers={activeMembers} />
    </div>
  );
}
