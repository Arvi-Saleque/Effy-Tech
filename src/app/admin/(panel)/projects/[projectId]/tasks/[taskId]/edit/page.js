import React from "react";
import Link from "next/link";
import { getTaskById } from "@/lib/admin/task-actions";
import { createClient } from "@/lib/supabase/server";
import TaskForm from "@/components/admin/TaskForm";

export default async function EditTaskPage({ params }) {
  const { projectId, taskId } = await params;

  const { data: task, error, notFound } = await getTaskById(taskId);
  if (notFound) return <div className="p-8 text-slate-400">Task not found.</div>;
  if (error) return <div className="p-8 text-red-400">Error: {error}</div>;

  if (task.project_id !== projectId) {
    return <div className="p-8 text-red-400">Task does not belong to this project.</div>;
  }

  if (["done", "archived", "cancelled"].includes(task.status)) {
    return <div className="p-8 text-red-400">This task cannot be edited because of its current status ({task.status}).</div>;
  }

  const supabase = await createClient();
  const { data: members } = await supabase.from("project_members")
    .select("user_id, project_role, admin_profiles!inner(name, is_active)")
    .eq("project_id", projectId);

  const activeMembers = members?.filter(m => m.admin_profiles.is_active) || [];

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href={`/admin/projects/${projectId}/tasks/${taskId}`} className="text-sm text-blue-400 hover:underline mb-2 inline-block">
          &larr; Back to Task Details
        </Link>
        <h1 className="text-2xl font-semibold text-slate-100">Edit Task</h1>
        <p className="text-slate-400 text-sm mt-1">Update details for: {task.title}</p>
      </div>

      <TaskForm projectId={projectId} projectMembers={activeMembers} initialData={task} />
    </div>
  );
}
