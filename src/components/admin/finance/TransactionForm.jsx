"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRightLeft, Loader2, Save } from "lucide-react";
import { createFinanceTransaction, updateFinanceTransaction } from "@/lib/admin/finance-actions";

const inputClass = "w-full rounded-xl border border-neutral-700/80 bg-neutral-950/65 px-3.5 py-2.5 text-sm text-neutral-100 outline-none transition placeholder:text-neutral-700 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-50";
const labelClass = "mb-1.5 block text-xs font-bold text-neutral-400";

const paymentMethods = [
  ["bank_transfer", "Bank transfer"],
  ["cash", "Cash"],
  ["mobile_banking", "Mobile banking"],
  ["card", "Card"],
  ["online_gateway", "Online gateway"],
  ["cheque", "Cheque"],
  ["other", "Other"],
];

function FieldError({ errors, name }) {
  const message = errors?.[name]?.[0];
  return message ? <p className="mt-1.5 text-xs text-rose-400">{message}</p> : null;
}

export default function TransactionForm({ references, initialData = null, defaults = {}, today }) {
  const router = useRouter();
  const editing = Boolean(initialData?.id);
  const [type, setType] = useState(initialData?.type || defaults.type || "income");
  const [clientId, setClientId] = useState(initialData?.client_id || defaults.client_id || "");
  const [projectId, setProjectId] = useState(initialData?.project_id || defaults.project_id || "");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const categories = useMemo(
    () => references.categories.filter((category) => (category.is_active || category.id === initialData?.category_id) && (category.direction === type || category.direction === "both")),
    [references.categories, type, initialData]
  );
  const projects = useMemo(
    () => references.projects.filter((project) => !clientId || project.client_id === clientId),
    [references.projects, clientId]
  );
  const fieldErrors = result?.details?.fieldErrors;

  function handleProjectChange(event) {
    const value = event.target.value;
    setProjectId(value);
    const project = references.projects.find((item) => item.id === value);
    if (project) setClientId(project.client_id);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setResult(null);
    const form = new FormData(event.currentTarget);
    const payload = {
      type,
      status: form.get("status"),
      title: form.get("title"),
      amount: form.get("amount"),
      transaction_date: form.get("transaction_date"),
      due_date: form.get("due_date"),
      account_id: form.get("account_id"),
      destination_account_id: type === "transfer" ? form.get("destination_account_id") : null,
      category_id: type === "transfer" ? null : form.get("category_id"),
      client_id: type === "transfer" ? null : clientId,
      project_id: type === "transfer" ? null : projectId,
      payment_method: form.get("payment_method"),
      reference: form.get("reference"),
      notes: form.get("notes"),
    };
    const response = editing
      ? await updateFinanceTransaction(initialData.id, payload)
      : await createFinanceTransaction(payload);
    setSubmitting(false);
    if (response.error) {
      setResult(response);
      return;
    }
    router.push("/admin/finance/transactions");
    router.refresh();
  }

  if (!references.accounts.some((account) => account.is_active)) {
    return (
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-5 text-sm text-amber-200">
        Create an active finance account before recording transactions. <Link href="/admin/finance/settings" className="font-bold underline">Open setup</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {result?.error ? (
        <div className="flex items-start gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3.5 text-sm text-rose-200">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {result.error}
        </div>
      ) : null}

      <fieldset>
        <legend className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-500">Transaction type</legend>
        <div className="grid grid-cols-3 gap-2">
          {[
            ["income", "Income", "Money coming into Effy Tech"],
            ["expense", "Expense", "Money paid by Effy Tech"],
            ["transfer", "Transfer", "Move money between accounts"],
          ].map(([value, label, description]) => (
            <button
              key={value}
              type="button"
              onClick={() => setType(value)}
              className={`rounded-xl border p-3 text-left transition sm:p-4 ${type === value ? "border-emerald-500/35 bg-emerald-500/10" : "border-neutral-800 bg-neutral-950/35 hover:border-neutral-700"}`}
            >
              <span className={`block text-sm font-bold ${type === value ? "text-emerald-300" : "text-neutral-300"}`}>{label}</span>
              <span className="mt-1 hidden text-[10px] leading-4 text-neutral-500 sm:block">{description}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="title" className={labelClass}>Title *</label>
          <input id="title" name="title" maxLength={180} required defaultValue={initialData?.title || defaults.title || ""} placeholder={type === "income" ? "e.g. DHA project second payment" : type === "expense" ? "e.g. Vercel annual hosting" : "e.g. Bank to bKash transfer"} className={inputClass} />
          <FieldError errors={fieldErrors} name="title" />
        </div>
        <div>
          <label htmlFor="amount" className={labelClass}>Amount (BDT) *</label>
          <input id="amount" name="amount" type="number" min="0.01" max="999999999999.99" step="0.01" required defaultValue={initialData?.amount || defaults.amount || ""} placeholder="0.00" className={inputClass} />
          <FieldError errors={fieldErrors} name="amount" />
        </div>
        <div>
          <label htmlFor="status" className={labelClass}>Ledger status *</label>
          <select id="status" name="status" defaultValue={initialData?.status || defaults.status || "cleared"} className={inputClass}>
            <option value="cleared">Cleared — money already moved</option>
            <option value="planned">Planned — expected in future</option>
          </select>
          <FieldError errors={fieldErrors} name="status" />
        </div>
        <div>
          <label htmlFor="transaction_date" className={labelClass}>{type === "transfer" ? "Transfer" : "Transaction"} date *</label>
          <input id="transaction_date" name="transaction_date" type="date" required defaultValue={initialData?.transaction_date || defaults.transaction_date || today} className={inputClass} />
          <FieldError errors={fieldErrors} name="transaction_date" />
        </div>
        <div>
          <label htmlFor="due_date" className={labelClass}>Due date <span className="font-normal text-neutral-600">(optional)</span></label>
          <input id="due_date" name="due_date" type="date" defaultValue={initialData?.due_date || defaults.due_date || ""} className={inputClass} />
          <FieldError errors={fieldErrors} name="due_date" />
        </div>
      </div>

      <div className="border-t border-neutral-800 pt-6">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Allocation</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="account_id" className={labelClass}>{type === "transfer" ? "Source account" : "Account"} *</label>
            <select id="account_id" name="account_id" required defaultValue={initialData?.account_id || defaults.account_id || references.accounts.find((account) => account.is_active)?.id} className={inputClass}>
              {references.accounts.filter((account) => account.is_active || account.id === initialData?.account_id).map((account) => <option key={account.id} value={account.id}>{account.name} · {account.account_type.replaceAll("_", " ")}</option>)}
            </select>
            <FieldError errors={fieldErrors} name="account_id" />
          </div>

          {type === "transfer" ? (
            <div>
              <label htmlFor="destination_account_id" className={labelClass}>Destination account *</label>
              <select id="destination_account_id" name="destination_account_id" required defaultValue={initialData?.destination_account_id || defaults.destination_account_id || ""} className={inputClass}>
                <option value="">Choose destination</option>
                {references.accounts.filter((account) => account.is_active || account.id === initialData?.destination_account_id).map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}
              </select>
              <FieldError errors={fieldErrors} name="destination_account_id" />
            </div>
          ) : (
            <div>
              <label htmlFor="category_id" className={labelClass}>Category *</label>
              <select key={type} id="category_id" name="category_id" required defaultValue={initialData?.category_id || defaults.category_id || categories[0]?.id || ""} className={inputClass}>
                <option value="">Choose category</option>
                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
              <FieldError errors={fieldErrors} name="category_id" />
            </div>
          )}

          {type !== "transfer" ? (
            <>
              <div>
                <label htmlFor="client_id" className={labelClass}>Client <span className="font-normal text-neutral-600">(optional)</span></label>
                <select
                  id="client_id"
                  name="client_id"
                  value={clientId}
                  onChange={(event) => { setClientId(event.target.value); setProjectId(""); }}
                  className={inputClass}
                >
                  <option value="">No client</option>
                  {references.clients.map((client) => <option key={client.id} value={client.id}>{client.name}{client.company_name ? ` · ${client.company_name}` : ""}</option>)}
                </select>
                <FieldError errors={fieldErrors} name="client_id" />
              </div>
              <div>
                <label htmlFor="project_id" className={labelClass}>Project <span className="font-normal text-neutral-600">(optional)</span></label>
                <select id="project_id" name="project_id" value={projectId} onChange={handleProjectChange} className={inputClass}>
                  <option value="">No project</option>
                  {projects.map((project) => <option key={project.id} value={project.id}>{project.name}{project.clients?.name ? ` · ${project.clients.name}` : ""}</option>)}
                </select>
                <FieldError errors={fieldErrors} name="project_id" />
              </div>
            </>
          ) : null}

          <div>
            <label htmlFor="payment_method" className={labelClass}>Payment method *</label>
            <select id="payment_method" name="payment_method" defaultValue={initialData?.payment_method || defaults.payment_method || "bank_transfer"} className={inputClass}>
              {paymentMethods.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="reference" className={labelClass}>Reference <span className="font-normal text-neutral-600">(optional)</span></label>
            <input id="reference" name="reference" maxLength={160} defaultValue={initialData?.reference || defaults.reference || ""} placeholder="Invoice, receipt, transaction ID..." className={inputClass} />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>Internal notes <span className="font-normal text-neutral-600">(optional)</span></label>
        <textarea id="notes" name="notes" rows={4} maxLength={5000} defaultValue={initialData?.notes || defaults.notes || ""} placeholder="Context, payment terms, or anything the finance team should know..." className={inputClass} />
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-neutral-800 pt-6 sm:flex-row sm:justify-end">
        <Link href="/admin/finance/transactions" className="rounded-xl border border-neutral-700 px-4 py-2.5 text-center text-sm font-bold text-neutral-300 transition hover:bg-neutral-800">Cancel</Link>
        <button disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-emerald-950 transition hover:bg-emerald-400 disabled:cursor-wait disabled:opacity-60">
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : type === "transfer" ? <ArrowRightLeft className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {submitting ? "Saving..." : editing ? "Save changes" : type === "transfer" ? "Record transfer" : "Record transaction"}
        </button>
      </div>
    </form>
  );
}
