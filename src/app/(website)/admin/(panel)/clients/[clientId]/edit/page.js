import React from "react";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import ClientForm from "@/components/admin/ClientForm";
import { getClientById } from "@/lib/admin/client-actions";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const p = await params;
  return {
    title: `Edit Client - EffyOps`,
  };
}

export default async function EditClientPage({ params }) {
  const p = await params;
  const { data: client, error } = await getClientById(p.clientId);

  if (error === "Invalid UUID format." || error === "Client not found." || !client) {
    notFound();
  }

  // Generic error catching
  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-xl text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-neutral-800/60 pb-6">
        <Link
          href={`/admin/clients/${client.id}`}
          className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-neutral-100 flex items-center gap-2">
            <Edit className="w-5 h-5 text-primary-light" />
            Edit Client: {client.name}
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Update client details and contact information.
          </p>
        </div>
      </div>

      <ClientForm initialData={client} />
    </div>
  );
}
