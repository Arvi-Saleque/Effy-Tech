"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Check, Loader2, Pencil, Plus, Power } from "lucide-react";
import {
  createFinanceAccount,
  createFinanceCategory,
  setFinanceAccountActive,
  setFinanceCategoryActive,
  updateFinanceAccount,
  updateFinanceCategory,
} from "@/lib/admin/finance-actions";
import { formatMoney } from "@/lib/admin/finance-utils";

const inputClass = "w-full rounded-xl border border-neutral-700/80 bg-neutral-950/65 px-3 py-2.5 text-sm text-neutral-100 outline-none focus:border-emerald-500/60";
const labelClass = "mb-1.5 block text-xs font-bold text-neutral-400";

export default function FinanceSetupManager({ accounts, categories }) {
  const router = useRouter();
  const [accountEdit, setAccountEdit] = useState(null);
  const [categoryEdit, setCategoryEdit] = useState(null);
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState(null);

  async function submitAccount(event) {
    event.preventDefault(); setBusy("account"); setMessage(null);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = { name: form.get("name"), account_type: form.get("account_type"), opening_balance: form.get("opening_balance"), notes: form.get("notes") };
    const response = accountEdit ? await updateFinanceAccount(accountEdit.id, payload) : await createFinanceAccount(payload);
    setBusy("");
    if (response.error) return setMessage({ type: "error", text: response.error });
    setAccountEdit(null); formElement.reset(); setMessage({ type: "success", text: accountEdit ? "Account updated." : "Account created." }); router.refresh();
  }

  async function submitCategory(event) {
    event.preventDefault(); setBusy("category"); setMessage(null);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = { name: form.get("name"), direction: form.get("direction"), color: form.get("color") };
    const response = categoryEdit ? await updateFinanceCategory(categoryEdit.id, payload) : await createFinanceCategory(payload);
    setBusy("");
    if (response.error) return setMessage({ type: "error", text: response.error });
    setCategoryEdit(null); formElement.reset(); setMessage({ type: "success", text: categoryEdit ? "Category updated." : "Category created." }); router.refresh();
  }

  async function toggleAccount(account) {
    setBusy(`account-${account.id}`); setMessage(null);
    const response = await setFinanceAccountActive(account.id, !account.is_active);
    setBusy("");
    if (response.error) return setMessage({ type: "error", text: response.error });
    router.refresh();
  }

  async function toggleCategory(category) {
    setBusy(`category-${category.id}`); setMessage(null);
    const response = await setFinanceCategoryActive(category.id, !category.is_active);
    setBusy("");
    if (response.error) return setMessage({ type: "error", text: response.error });
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {message ? <div className={`flex items-center gap-2 rounded-xl border p-3 text-sm ${message.type === "error" ? "border-rose-500/20 bg-rose-500/10 text-rose-200" : "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"}`}>{message.type === "error" ? <AlertCircle className="h-4 w-4" /> : <Check className="h-4 w-4" />}{message.text}</div> : null}
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5 shadow-xl">
          <div className="mb-5"><h2 className="text-base font-bold text-neutral-200">Finance accounts</h2><p className="mt-1 text-xs leading-5 text-neutral-500">Cash, bank, mobile-banking, card, or other balances. Opening balance is the amount before the first recorded ledger entry.</p></div>
          <form key={accountEdit?.id || "new-account"} onSubmit={submitAccount} className="rounded-xl border border-neutral-800 bg-neutral-950/30 p-4">
            <div className="mb-3 flex items-center justify-between"><p className="text-xs font-bold text-neutral-300">{accountEdit ? `Edit ${accountEdit.name}` : "Add account"}</p>{accountEdit ? <button type="button" onClick={() => setAccountEdit(null)} className="text-[10px] font-bold text-neutral-500">Cancel edit</button> : null}</div>
            <div className="grid gap-3 sm:grid-cols-2"><div><label className={labelClass}>Account name *</label><input name="name" required maxLength={120} defaultValue={accountEdit?.name || ""} placeholder="City Bank" className={inputClass} /></div><div><label className={labelClass}>Type *</label><select name="account_type" defaultValue={accountEdit?.account_type || "bank"} className={inputClass}><option value="cash">Cash</option><option value="bank">Bank</option><option value="mobile_banking">Mobile banking</option><option value="card">Card</option><option value="other">Other</option></select></div><div><label className={labelClass}>Opening balance *</label><input name="opening_balance" type="number" step="0.01" required defaultValue={accountEdit?.opening_balance ?? 0} className={inputClass} /></div><div><label className={labelClass}>Notes</label><input name="notes" maxLength={1000} defaultValue={accountEdit?.notes || ""} placeholder="Optional" className={inputClass} /></div></div>
            <button disabled={busy === "account"} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-3.5 py-2 text-xs font-bold text-emerald-950">{busy === "account" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : accountEdit ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}{accountEdit ? "Save account" : "Add account"}</button>
          </form>
          <div className="mt-4 divide-y divide-neutral-800/70">
            {accounts.map((account) => <div key={account.id} className={`flex items-center justify-between gap-3 py-3 ${!account.is_active ? "opacity-45" : ""}`}><div className="min-w-0"><div className="flex items-center gap-2"><p className="truncate text-sm font-semibold text-neutral-200">{account.name}</p>{account.is_system ? <span className="rounded bg-violet-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase text-violet-300">System</span> : null}</div><p className="mt-1 text-[10px] text-neutral-500">{account.account_type.replaceAll("_", " ")} · Balance <span className={account.current_balance < 0 ? "text-rose-300" : "text-neutral-300"}>{formatMoney(account.current_balance)}</span></p></div><div className="flex items-center gap-2"><button type="button" onClick={() => setAccountEdit(account)} className="rounded-lg p-2 text-sky-400 hover:bg-sky-500/10"><Pencil className="h-3.5 w-3.5" /></button><button type="button" disabled={busy === `account-${account.id}`} onClick={() => toggleAccount(account)} className={`rounded-lg p-2 ${account.is_active ? "text-emerald-400" : "text-neutral-500"}`}>{busy === `account-${account.id}` ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Power className="h-3.5 w-3.5" />}</button></div></div>)}
          </div>
        </section>

        <section className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5 shadow-xl">
          <div className="mb-5"><h2 className="text-base font-bold text-neutral-200">Income & expense categories</h2><p className="mt-1 text-xs leading-5 text-neutral-500">Categories power expense charts, filters, and scoped financial targets. Direction is immutable after creation.</p></div>
          <form key={categoryEdit?.id || "new-category"} onSubmit={submitCategory} className="rounded-xl border border-neutral-800 bg-neutral-950/30 p-4">
            <div className="mb-3 flex items-center justify-between"><p className="text-xs font-bold text-neutral-300">{categoryEdit ? `Edit ${categoryEdit.name}` : "Add category"}</p>{categoryEdit ? <button type="button" onClick={() => setCategoryEdit(null)} className="text-[10px] font-bold text-neutral-500">Cancel edit</button> : null}</div>
            <div className="grid gap-3 sm:grid-cols-[1fr_0.8fr_80px]"><div><label className={labelClass}>Category name *</label><input name="name" required maxLength={120} defaultValue={categoryEdit?.name || ""} placeholder="Legal & compliance" className={inputClass} /></div><div><label className={labelClass}>Direction *</label><select name="direction" disabled={Boolean(categoryEdit)} defaultValue={categoryEdit?.direction || "expense"} className={inputClass}><option value="income">Income</option><option value="expense">Expense</option><option value="both">Both</option></select>{categoryEdit ? <input type="hidden" name="direction" value={categoryEdit.direction} /> : null}</div><div><label className={labelClass}>Color</label><input name="color" type="color" defaultValue={categoryEdit?.color || "#64748b"} className="h-[42px] w-full rounded-xl border border-neutral-700 bg-neutral-950 p-1" /></div></div>
            <button disabled={busy === "category"} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-3.5 py-2 text-xs font-bold text-emerald-950">{busy === "category" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : categoryEdit ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}{categoryEdit ? "Save category" : "Add category"}</button>
          </form>
          <div className="mt-4 max-h-[520px] divide-y divide-neutral-800/70 overflow-y-auto pr-1">
            {categories.map((category) => <div key={category.id} className={`flex items-center justify-between gap-3 py-3 ${!category.is_active ? "opacity-45" : ""}`}><div className="flex min-w-0 items-center gap-3"><span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: category.color }} /><div><div className="flex items-center gap-2"><p className="truncate text-sm font-semibold text-neutral-200">{category.name}</p>{category.is_system ? <span className="rounded bg-violet-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase text-violet-300">Default</span> : null}</div><p className="mt-1 text-[10px] capitalize text-neutral-500">{category.direction}</p></div></div><div className="flex items-center gap-2"><button type="button" onClick={() => setCategoryEdit(category)} className="rounded-lg p-2 text-sky-400 hover:bg-sky-500/10"><Pencil className="h-3.5 w-3.5" /></button><button type="button" disabled={busy === `category-${category.id}`} onClick={() => toggleCategory(category)} className={`rounded-lg p-2 ${category.is_active ? "text-emerald-400" : "text-neutral-500"}`}>{busy === `category-${category.id}` ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Power className="h-3.5 w-3.5" />}</button></div></div>)}
          </div>
        </section>
      </div>
    </div>
  );
}
