import React from "react";
import Link from "next/link";
import { ArrowLeft, UsersRound } from "lucide-react";
import ClientForm from "@/components/admin/ClientForm";

export const metadata = {
  title: "New Client - EffyOps",
};

export default function NewClientPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-neutral-800/60 pb-6">
        <Link
          href="/admin/clients"
          className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-neutral-100 flex items-center gap-2">
            <UsersRound className="w-6 h-6 text-emerald-400" />
            Add New Client
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Create a new client profile to associate with projects.
          </p>
        </div>
      </div>

      <ClientForm />
    </div>
  );
}
