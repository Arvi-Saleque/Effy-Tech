import React from "react";
import Link from "next/link";
import { Plus, UsersRound, BriefcaseBusiness, AlertCircle, Phone, Mail } from "lucide-react";
import { getClients } from "@/lib/admin/client-actions";
import ClientFilters from "./ClientFilters";
import ClientStatusBadge from "@/components/admin/ClientStatusBadge";
import ClientActions from "./[clientId]/ClientActions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Client Management - EffyOps",
};

function formatDate(dateStr) {
  if (!dateStr) return "--";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function ClientsPage({ searchParams }) {
  const params = await searchParams;
  const statusFilter = params?.status || "current";
  const searchFilter = params?.search || "";

  const { data: clients, counts, error } = await getClients({
    status: statusFilter,
    search: searchFilter,
  });

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-xl flex items-center gap-3">
        <AlertCircle className="w-6 h-6" />
        <p>{error}</p>
      </div>
    );
  }

  const totalCurrent = counts?.current || 0;
  const activeClients = counts?.active || 0;
  const leadClients = counts?.leads || 0;
  const archivedClients = counts?.archived || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-100 flex items-center gap-2">
            <UsersRound className="w-6 h-6 text-emerald-400" />
            Client Management
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Manage Effy Tech clients and their project relationships.
          </p>
        </div>
        <Link
          href="/admin/clients/new"
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-medium rounded-lg transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        >
          <Plus className="w-4 h-4" />
          Add Client
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-5">
          <div className="text-neutral-400 text-xs font-medium mb-1 uppercase tracking-wider">Total Current</div>
          <div className="text-2xl font-bold text-neutral-100">{totalCurrent}</div>
        </div>
        <div className="bg-neutral-900/40 border border-emerald-500/20 rounded-xl p-5">
          <div className="text-emerald-400 text-xs font-medium mb-1 uppercase tracking-wider">Active</div>
          <div className="text-2xl font-bold text-emerald-100">{activeClients}</div>
        </div>
        <div className="bg-neutral-900/40 border border-amber-500/20 rounded-xl p-5">
          <div className="text-amber-400 text-xs font-medium mb-1 uppercase tracking-wider">Leads</div>
          <div className="text-2xl font-bold text-amber-100">{leadClients}</div>
        </div>
        <div className="bg-neutral-900/40 border border-slate-700/60 rounded-xl p-5">
          <div className="text-slate-400 text-xs font-medium mb-1 uppercase tracking-wider">Archived</div>
          <div className="text-2xl font-bold text-slate-200">{archivedClients}</div>
        </div>
      </div>

      {/* Filters */}
      <ClientFilters />

      {/* Client List */}
      <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl overflow-hidden backdrop-blur-sm">
        {clients?.length === 0 ? (
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-neutral-800/50 flex items-center justify-center mb-3">
              <UsersRound className="w-6 h-6 text-neutral-500" />
            </div>
            <h3 className="text-neutral-300 font-medium text-lg">
              {searchFilter || (statusFilter !== 'current' && statusFilter !== 'all') 
                ? "No clients match the current filters." 
                : "No clients have been added yet."}
            </h3>
            {!(searchFilter || (statusFilter !== 'current' && statusFilter !== 'all')) && (
              <p className="text-neutral-500 mt-2 text-sm max-w-sm">
                Get started by adding your first client to the system.
              </p>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm text-neutral-300">
                <thead className="text-xs uppercase bg-neutral-950/50 text-neutral-500 border-b border-neutral-800/60">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Client</th>
                    <th className="px-6 py-4 font-semibold">Company</th>
                    <th className="px-6 py-4 font-semibold">Contact</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-center">Projects</th>
                    <th className="px-6 py-4 font-semibold text-center">Updated</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-neutral-800/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-neutral-100">{client.name}</div>
                        {client.email && (
                          <a href={`mailto:${client.email}`} className="text-xs text-emerald-400/80 hover:text-emerald-400 mt-0.5 flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {client.email}
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {client.company_name ? (
                          <span className="text-neutral-300">{client.company_name}</span>
                        ) : (
                          <span className="text-neutral-600 italic">--</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-neutral-300">{client.contact_person || <span className="text-neutral-600 italic">--</span>}</div>
                        {client.phone && (
                          <a href={`tel:${client.phone}`} className="text-xs text-primary-light/80 hover:text-primary-light mt-0.5 flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {client.phone}
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <ClientStatusBadge status={client.status} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-neutral-800 border border-neutral-700 text-xs font-medium text-neutral-300">
                          {client.projects?.[0]?.count || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-xs text-neutral-400">
                        {formatDate(client.updated_at)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3 items-center">
                          <Link
                            href={`/admin/clients/${client.id}`}
                            className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                          >
                            View
                          </Link>
                          <Link
                            href={`/admin/clients/${client.id}/edit`}
                            className="text-primary-light hover:text-primary-light text-sm font-medium transition-colors"
                          >
                            Edit
                          </Link>
                          <ClientActions client={client} compact={true} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Cards */}
            <div className="md:hidden divide-y divide-neutral-800/60">
              {clients.map((client) => (
                <div key={client.id} className="p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-neutral-100 text-base">{client.name}</h4>
                      {client.email && (
                        <a href={`mailto:${client.email}`} className="text-xs text-emerald-400/80 mt-0.5 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {client.email}
                        </a>
                      )}
                    </div>
                    <ClientStatusBadge status={client.status} />
                  </div>
                  
                  {client.company_name && (
                    <div className="text-sm text-neutral-300 flex items-center gap-1.5">
                      <BriefcaseBusiness className="w-3.5 h-3.5 text-neutral-500" />
                      {client.company_name}
                    </div>
                  )}

                  {client.phone && (
                    <div className="text-sm text-neutral-300 flex items-center gap-1.5">
                      <a href={`tel:${client.phone}`} className="flex items-center gap-1.5 text-primary-light/80">
                        <Phone className="w-3.5 h-3.5 text-primary-light/80" />
                        {client.phone}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-xs text-neutral-500 mt-1">
                    <span>{client.projects?.[0]?.count || 0} associated projects</span>
                    <span>Updated {formatDate(client.updated_at)}</span>
                  </div>

                  <div className="mt-2 flex gap-3 pt-3 border-t border-neutral-800/40 items-center justify-between">
                    <div className="flex gap-3 flex-1">
                      <Link
                        href={`/admin/clients/${client.id}`}
                        className="flex-1 py-1.5 text-center bg-neutral-800/50 hover:bg-neutral-800 text-emerald-400 rounded-md text-sm font-medium transition-colors"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/clients/${client.id}/edit`}
                        className="flex-1 py-1.5 text-center bg-neutral-800/50 hover:bg-neutral-800 text-primary-light rounded-md text-sm font-medium transition-colors"
                      >
                        Edit
                      </Link>
                    </div>
                    <div className="px-3">
                      <ClientActions client={client} compact={true} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-neutral-800/60 bg-neutral-900/20 text-xs text-neutral-500 text-center">
              Showing {counts?.visible || clients.length} results
            </div>
          </>
        )}
      </div>
    </div>
  );
}
