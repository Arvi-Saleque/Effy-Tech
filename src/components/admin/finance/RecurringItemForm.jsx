"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Save } from "lucide-react";
import { createRecurringFinanceItem, updateRecurringFinanceItem } from "@/lib/admin/finance-actions";

const inputClass = "w-full rounded-xl border border-neutral-700/80 bg-neutral-950/65 px-3.5 py-2.5 text-sm text-neutral-100 outline-none transition placeholder:text-neutral-700 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10";
const labelClass = "mb-1.5 block text-xs font-bold text-neutral-400";

export default function RecurringItemForm({ references, initialData = null, today }) {
  const router = useRouter();
  const editing = Boolean(initialData?.id);
  const [type, setType] = useState(initialData?.type || "expense");
  const [clientId, setClientId] = useState(initialData?.client_id || "");
  const [projectId, setProjectId] = useState(initialData?.project_id || "");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const errors = result?.details?.fieldErrors;
  const categories = useMemo(() => references.categories.filter((category) => (category.is_active || category.id === initialData?.category_id) && (category.direction === type || category.direction === "both")), [references.categories, type, initialData]);
  const projects = useMemo(() => references.projects.filter((project) => !clientId || project.client_id === clientId), [references.projects, clientId]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setResult(null);
    const form = new FormData(event.currentTarget);
    const payload = {
      type,
      title: form.get("title"),
      category_id: form.get("category_id"),
      account_id: form.get("account_id"),
      client_id: clientId,
      project_id: projectId,
      amount: form.get("amount"),
      payment_method: form.get("payment_method"),
      frequency: form.get("frequency"),
      next_due_date: form.get("next_due_date"),
      reminder_days: form.get("reminder_days"),
      status: form.get("status"),
      notes: form.get("notes"),
    };
    const response = editing ? await updateRecurringFinanceItem(initialData.id, payload) : await createRecurringFinanceItem(payload);
    setSubmitting(false);
    if (response.error) return setResult(response);
    router.push("/admin/finance/recurring");
    router.refresh();
  }

  function handleProjectChange(event) {
    const value = event.target.value;
    setProjectId(value);
    const project = references.projects.find((item) => item.id === value);
    if (project) setClientId(project.client_id);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {result?.error ? <div className="flex items-start gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3.5 text-sm text-rose-200"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{result.error}</div> : null}
      <div className="grid grid-cols-2 gap-2">
        {[["expense", "Recurring expense", "Domain, hosting, tools, salaries"], ["income", "Recurring income", "Retainer or scheduled client income"]].map(([value, label, description]) => <button key={value} type="button" onClick={() => setType(value)} className={`rounded-xl border p-4 text-left ${type === value ? "border-emerald-500/35 bg-emerald-500/10" : "border-neutral-800 bg-neutral-950/35"}`}><span className={`block text-sm font-bold ${type === value ? "text-emerald-300" : "text-neutral-300"}`}>{label}</span><span className="mt-1 hidden text-[10px] text-neutral-500 sm:block">{description}</span></button>)}
      </div>
      <div>
        <label htmlFor="title" className={labelClass}>Item title *</label>
        <input id="title" name="title" required maxLength={180} defaultValue={initialData?.title || ""} placeholder="e.g. effytechbd.com domain renewal" className={inputClass} />
        {errors?.title?.[0] ? <p className="mt-1.5 text-xs text-rose-400">{errors.title[0]}</p> : null}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div><label htmlFor="amount" className={labelClass}>Amount (BDT) *</label><input id="amount" name="amount" type="number" min="0.01" step="0.01" required defaultValue={initialData?.amount || ""} className={inputClass} />{errors?.amount?.[0] ? <p className="mt-1.5 text-xs text-rose-400">{errors.amount[0]}</p> : null}</div>
        <div><label htmlFor="category_id" className={labelClass}>Category *</label><select key={type} id="category_id" name="category_id" required defaultValue={initialData?.category_id || categories[0]?.id || ""} className={inputClass}><option value="">Choose category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div>
        <div><label htmlFor="account_id" className={labelClass}>Account *</label><select id="account_id" name="account_id" required defaultValue={initialData?.account_id || references.accounts.find((account) => account.is_active)?.id || ""} className={inputClass}>{references.accounts.filter((account) => account.is_active || account.id === initialData?.account_id).map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}</select></div>
        <div><label htmlFor="payment_method" className={labelClass}>Payment method *</label><select id="payment_method" name="payment_method" defaultValue={initialData?.payment_method || "bank_transfer"} className={inputClass}><option value="bank_transfer">Bank transfer</option><option value="cash">Cash</option><option value="mobile_banking">Mobile banking</option><option value="card">Card</option><option value="online_gateway">Online gateway</option><option value="cheque">Cheque</option><option value="other">Other</option></select></div>
        <div><label htmlFor="frequency" className={labelClass}>Frequency *</label><select id="frequency" name="frequency" defaultValue={initialData?.frequency || "yearly"} className={inputClass}><option value="weekly">Weekly</option><option value="monthly">Monthly</option><option value="quarterly">Quarterly</option><option value="yearly">Yearly</option></select></div>
        <div><label htmlFor="next_due_date" className={labelClass}>Next due date *</label><input id="next_due_date" name="next_due_date" type="date" required defaultValue={initialData?.next_due_date || today} className={inputClass} /></div>
        <div><label htmlFor="reminder_days" className={labelClass}>Reminder lead time (days) *</label><input id="reminder_days" name="reminder_days" type="number" min="0" max="365" required defaultValue={initialData?.reminder_days ?? 7} className={inputClass} /></div>
        <div><label htmlFor="status" className={labelClass}>Status *</label><select id="status" name="status" defaultValue={initialData?.status || "active"} className={inputClass}><option value="active">Active</option><option value="paused">Paused</option><option value="ended">Ended</option></select></div>
      </div>
      <div className="border-t border-neutral-800 pt-6">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Optional project allocation</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div><label htmlFor="client_id" className={labelClass}>Client</label><select id="client_id" value={clientId} onChange={(event) => { setClientId(event.target.value); setProjectId(""); }} className={inputClass}><option value="">No client</option>{references.clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</select></div>
          <div><label htmlFor="project_id" className={labelClass}>Project</label><select id="project_id" value={projectId} onChange={handleProjectChange} className={inputClass}><option value="">No project</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select></div>
        </div>
      </div>
      <div><label htmlFor="notes" className={labelClass}>Internal notes</label><textarea id="notes" name="notes" rows={4} maxLength={5000} defaultValue={initialData?.notes || ""} placeholder="Provider, renewal details, plan name, login owner..." className={inputClass} /></div>
      <div className="rounded-xl border border-violet-500/15 bg-violet-500/5 p-4 text-xs leading-5 text-violet-200/80">When you mark this item as paid or received, EffyOps creates a cleared transaction and advances the next due date in one atomic operation.</div>
      <div className="flex flex-col-reverse gap-3 border-t border-neutral-800 pt-6 sm:flex-row sm:justify-end"><Link href="/admin/finance/recurring" className="rounded-xl border border-neutral-700 px-4 py-2.5 text-center text-sm font-bold text-neutral-300 hover:bg-neutral-800">Cancel</Link><button disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-emerald-950 hover:bg-emerald-400 disabled:opacity-60">{submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{submitting ? "Saving..." : editing ? "Save changes" : "Create recurring item"}</button></div>
    </form>
  );
}

