import React from "react";
import Link from "next/link";
import { ArrowLeft, Edit, Building2, UserCircle, Mail, Phone, Clock, CalendarDays, BarChart, Info } from "lucide-react";
import { getClientById } from "@/lib/admin/client-actions";
import { notFound } from "next/navigation";
import ClientStatusBadge from "@/components/admin/ClientStatusBadge";
import ClientActions from "./ClientActions";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const p = await params;
  const { data: client, error } = await getClientById(p.clientId);
  
  if (error === "Invalid UUID format." || error === "Client not found." || !client) {
    return { title: "Client Not Found - EffyOps" };
  }
  
  return {
    title: `${client.name} - EffyOps`,
  };
}

function formatDate(dateStr) {
  if (!dateStr) return "--";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function ClientDetailsPage({ params }) {
  const p = await params;
  const { data: client, error } = await getClientById(p.clientId);

  if (error === "Invalid UUID format." || error === "Client not found." || !client) {
    notFound();
  }

  // Generic errors that aren't purely 404
  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-xl text-center">
        {error}
      </div>
    );
  }

  const { projectSummary } = client;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center text-sm font-medium text-neutral-400">
        <Link href="/admin/clients" className="hover:text-neutral-200 transition-colors flex items-center gap-1.5">
          <ArrowLeft className="w-4 h-4" />
          Back to Clients
        </Link>
      </div>

      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-neutral-100">{client.name}</h1>
            <ClientStatusBadge status={client.status} />
          </div>
          {client.company_name && (
            <div className="text-neutral-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-neutral-500" />
              {client.company_name}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/admin/clients/${client.id}/edit`}
            className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-medium rounded-lg transition-colors flex items-center gap-2 border border-blue-500/20"
          >
            <Edit className="w-4 h-4" />
            Edit Client
          </Link>
          <ClientActions client={client} projectSummary={projectSummary} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        {/* Left Column: Client Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-6">Contact Information</h3>
            
            <div className="space-y-5">
              <div className="flex items-start gap-3 text-sm">
                <UserCircle className="w-5 h-5 text-emerald-400/80 shrink-0" />
                <div>
                  <div className="text-neutral-500 mb-0.5">Contact Person</div>
                  <div className="text-neutral-200 font-medium">{client.contact_person || "--"}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-sm">
                <Mail className="w-5 h-5 text-emerald-400/80 shrink-0" />
                <div>
                  <div className="text-neutral-500 mb-0.5">Email Address</div>
                  {client.email ? (
                    <a href={`mailto:${client.email}`} className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                      {client.email}
                    </a>
                  ) : (
                    <div className="text-neutral-500 italic">--</div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Phone className="w-5 h-5 text-emerald-400/80 shrink-0" />
                <div>
                  <div className="text-neutral-500 mb-0.5">Phone Number</div>
                  {client.phone ? (
                    <a href={`tel:${client.phone}`} className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                      {client.phone}
                    </a>
                  ) : (
                    <div className="text-neutral-500 italic">--</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800/60 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <div className="text-neutral-500 flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" /> Created
                </div>
                <div className="text-neutral-300">{formatDate(client.created_at)}</div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="text-neutral-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Last Updated
                </div>
                <div className="text-neutral-300">{formatDate(client.updated_at)}</div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="text-neutral-500 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" /> Added By
                </div>
                <div className="text-neutral-300">{client.created_by_profile?.name || "System"}</div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {client.notes && (
            <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-4">Internal Notes</h3>
              <div className="text-sm text-neutral-300 whitespace-pre-wrap leading-relaxed">
                {client.notes}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Projects & Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Summary */}
          <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                <BarChart className="w-4 h-4 text-emerald-400" />
                Project Summary
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-neutral-950/50 rounded-lg p-4 border border-neutral-800">
                <div className="text-neutral-500 text-xs mb-1">Total</div>
                <div className="text-2xl font-bold text-neutral-200">{projectSummary.total}</div>
              </div>
              <div className="bg-neutral-950/50 rounded-lg p-4 border border-emerald-500/20">
                <div className="text-emerald-400/70 text-xs mb-1">Active</div>
                <div className="text-2xl font-bold text-emerald-300">{projectSummary.active}</div>
              </div>
              <div className="bg-neutral-950/50 rounded-lg p-4 border border-blue-500/20">
                <div className="text-blue-400/70 text-xs mb-1">Completed</div>
                <div className="text-2xl font-bold text-blue-300">{projectSummary.completed}</div>
              </div>
              <div className="bg-neutral-950/50 rounded-lg p-4 border border-neutral-800">
                <div className="text-neutral-500 text-xs mb-1">Planning</div>
                <div className="text-2xl font-bold text-neutral-200">{projectSummary.planning}</div>
              </div>
            </div>

            {/* Latest Projects List */}
            <div>
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">Latest Projects</h4>
              {projectSummary.latest.length > 0 ? (
                <div className="border border-neutral-800/60 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-950/50 text-neutral-500 text-xs">
                      <tr>
                        <th className="px-4 py-3 font-medium">Project</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Priority</th>
                        <th className="px-4 py-3 font-medium">Due Date</th>
                        <th className="px-4 py-3 font-medium text-right">Progress</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60 bg-neutral-900/20">
                      {projectSummary.latest.map(project => (
                        <tr key={project.id} className="hover:bg-neutral-800/20 transition-colors">
                          <td className="px-4 py-3 font-medium text-neutral-200">{project.name}</td>
                          <td className="px-4 py-3 text-neutral-400 capitalize">{project.status}</td>
                          <td className="px-4 py-3 text-neutral-400 capitalize">{project.priority}</td>
                          <td className="px-4 py-3 text-neutral-400">{formatDate(project.due_date)}</td>
                          <td className="px-4 py-3 text-right">
                            <span className="inline-block bg-neutral-800 text-emerald-400 text-xs font-bold px-2 py-1 rounded">
                              {project.progress_percent}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center p-8 bg-neutral-950/30 border border-dashed border-neutral-800 rounded-lg text-sm text-neutral-500">
                  No projects have been created for this client yet.
                </div>
              )}
            </div>
          </div>

          {/* Activity Placeholder */}
          <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-6">Activity History</h3>
            <div className="text-center py-10 text-sm text-neutral-500 border border-dashed border-neutral-800 rounded-lg bg-neutral-950/30">
              Client activity history will be available after the project and task modules are implemented.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
