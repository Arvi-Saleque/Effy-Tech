import React from "react";
import Link from "next/link";
import { ArrowLeft, Edit, Building2, UserCircle, Mail, Phone, Clock, CalendarDays, BarChart, Info, FolderKanban, Plus } from "lucide-react";
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
  
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split('-');
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

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
  const isArchived = client.status === "archived";

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
            className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary-light font-medium rounded-lg transition-colors flex items-center gap-2 border border-primary-light/20"
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
                    <a href={`tel:${client.phone}`} className="text-primary-light hover:text-primary-light transition-colors font-medium">
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
                <FolderKanban className="w-4 h-4 text-emerald-400" />
                Project Summary
              </h3>
              {!isArchived && (
                <Link
                  href={`/admin/projects/new?clientId=${client.id}`}
                  className="flex items-center gap-1 text-sm text-emerald-500 hover:text-emerald-400 font-medium"
                >
                  <Plus className="w-4 h-4" /> Create Project
                </Link>
              )}
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
              <div className="bg-neutral-950/50 rounded-lg p-4 border border-primary-light/20">
                <div className="text-primary-light/70 text-xs mb-1">Completed</div>
                <div className="text-2xl font-bold text-primary-light">{projectSummary.completed}</div>
              </div>
              <div className="bg-neutral-950/50 rounded-lg p-4 border border-neutral-800">
                <div className="text-neutral-500 text-xs mb-1">Planning</div>
                <div className="text-2xl font-bold text-neutral-200">{projectSummary.planning}</div>
              </div>
            </div>

            {/* Latest Projects List */}
            <div>
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">Latest Projects</h4>
              {projectSummary.latest?.length > 0 ? (
                <div className="space-y-3">
                  {projectSummary.latest.map(project => (
                    <Link
                      key={project.id}
                      href={`/admin/projects/${project.id}`}
                      className="block bg-neutral-950/50 border border-neutral-800/60 p-4 rounded-lg hover:border-neutral-700 transition-colors group"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-neutral-200 group-hover:text-emerald-400 transition-colors">{project.name}</span>
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          project.status === "active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                          project.status === "completed" ? "bg-primary/10 text-primary-light border-primary-light/20" :
                          "bg-primary/10 text-primary-light border-primary-light/20"
                        }`}>
                          {project.status.replace("_", " ")}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500/80 rounded-full" 
                            style={{ width: `${project.progress_percent || 0}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-neutral-500">{project.progress_percent || 0}%</span>
                      </div>
                    </Link>
                  ))}
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
