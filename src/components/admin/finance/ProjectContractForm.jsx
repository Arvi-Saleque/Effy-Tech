"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Save } from "lucide-react";
import { createProjectContract, updateProjectContract } from "@/lib/admin/finance-actions";

const inputClass = "w-full rounded-xl border border-neutral-700/80 bg-neutral-950/65 px-3.5 py-2.5 text-sm text-neutral-100 outline-none transition placeholder:text-neutral-700 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 disabled:opacity-60";
const labelClass = "mb-1.5 block text-xs font-bold text-neutral-400";

export default function ProjectContractForm({ projects, initialData = null }) {
  const router = useRouter();
  const editing = Boolean(initialData?.id);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const errors = result?.details?.fieldErrors;

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setResult(null);
    const form = new FormData(event.currentTarget);
    const payload = {
      project_id: form.get("project_id"),
      contract_value: form.get("contract_value"),
      signed_date: form.get("signed_date"),
      payment_deadline: form.get("payment_deadline"),
      status: form.get("status"),
      notes: form.get("notes"),
    };
    const response = editing ? await updateProjectContract(initialData.id, payload) : await createProjectContract(payload);
    setSubmitting(false);
    if (response.error) return setResult(response);
    router.push("/admin/finance/projects");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {result?.error ? <div className="flex items-start gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3.5 text-sm text-rose-200"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{result.error}</div> : null}
      <div>
        <label htmlFor="project_id" className={labelClass}>Project *</label>
        <select id="project_id" name="project_id" required disabled={editing} defaultValue={initialData?.project_id || ""} className={inputClass}>
          <option value="">Choose a project</option>
          {projects.map((project) => <option key={project.id} value={project.id}>{project.name} · {project.clients?.name || project.project?.clients?.name || "Unknown client"}</option>)}
        </select>
        {editing ? <input type="hidden" name="project_id" value={initialData.project_id} /> : null}
        {errors?.project_id?.[0] ? <p className="mt-1.5 text-xs text-rose-400">{errors.project_id[0]}</p> : null}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="contract_value" className={labelClass}>Agreed project value (BDT) *</label>
          <input id="contract_value" name="contract_value" type="number" min="0.01" step="0.01" required defaultValue={initialData?.contract_value || ""} placeholder="0.00" className={inputClass} />
          {errors?.contract_value?.[0] ? <p className="mt-1.5 text-xs text-rose-400">{errors.contract_value[0]}</p> : null}
        </div>
        <div>
          <label htmlFor="status" className={labelClass}>Contract status *</label>
          <select id="status" name="status" defaultValue={initialData?.status || "active"} className={inputClass}><option value="active">Active</option><option value="on_hold">On hold</option><option value="settled">Settled</option><option value="cancelled">Cancelled</option></select>
        </div>
        <div>
          <label htmlFor="signed_date" className={labelClass}>Agreement / start date</label>
          <input id="signed_date" name="signed_date" type="date" defaultValue={initialData?.signed_date || ""} className={inputClass} />
        </div>
        <div>
          <label htmlFor="payment_deadline" className={labelClass}>Final payment deadline</label>
          <input id="payment_deadline" name="payment_deadline" type="date" defaultValue={initialData?.payment_deadline || ""} className={inputClass} />
          {errors?.payment_deadline?.[0] ? <p className="mt-1.5 text-xs text-rose-400">{errors.payment_deadline[0]}</p> : null}
        </div>
      </div>
      <div>
        <label htmlFor="notes" className={labelClass}>Payment terms / internal notes</label>
        <textarea id="notes" name="notes" rows={5} maxLength={5000} defaultValue={initialData?.notes || ""} placeholder="Example: 30% advance, 40% after beta, 30% on delivery..." className={inputClass} />
      </div>
      <div className="rounded-xl border border-sky-500/15 bg-sky-500/5 p-4 text-xs leading-5 text-sky-200/80">
        Received and outstanding amounts are not entered here. They are calculated automatically from cleared income transactions linked to this project.
      </div>
      <div className="flex flex-col-reverse gap-3 border-t border-neutral-800 pt-6 sm:flex-row sm:justify-end">
        <Link href="/admin/finance/projects" className="rounded-xl border border-neutral-700 px-4 py-2.5 text-center text-sm font-bold text-neutral-300 hover:bg-neutral-800">Cancel</Link>
        <button disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-emerald-950 hover:bg-emerald-400 disabled:opacity-60">{submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{submitting ? "Saving..." : editing ? "Save changes" : "Create project finance"}</button>
      </div>
    </form>
  );
}

