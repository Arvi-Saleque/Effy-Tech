"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Save } from "lucide-react";
import { createFinanceTarget, updateFinanceTarget } from "@/lib/admin/finance-actions";

const inputClass = "w-full rounded-xl border border-neutral-700/80 bg-neutral-950/65 px-3.5 py-2.5 text-sm text-neutral-100 outline-none transition placeholder:text-neutral-700 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10";
const labelClass = "mb-1.5 block text-xs font-bold text-neutral-400";

function dateKey(date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

function periodBounds(today, period) {
  const [year, month, day] = today.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (period === "weekly") {
    const offset = (date.getUTCDay() + 6) % 7;
    date.setUTCDate(date.getUTCDate() - offset);
    const end = new Date(date); end.setUTCDate(end.getUTCDate() + 6);
    return [dateKey(date), dateKey(end)];
  }
  if (period === "quarterly") {
    const startMonth = Math.floor(date.getUTCMonth() / 3) * 3;
    return [dateKey(new Date(Date.UTC(year, startMonth, 1))), dateKey(new Date(Date.UTC(year, startMonth + 3, 0)))];
  }
  if (period === "yearly") return [`${year}-01-01`, `${year}-12-31`];
  return [dateKey(new Date(Date.UTC(year, month - 1, 1))), dateKey(new Date(Date.UTC(year, month, 0)))];
}

export default function TargetForm({ categories, initialData = null, today }) {
  const router = useRouter();
  const editing = Boolean(initialData?.id);
  const initialPeriod = initialData?.period_type || "monthly";
  const initialBounds = initialData ? [initialData.start_date, initialData.end_date] : periodBounds(today, initialPeriod);
  const [metric, setMetric] = useState(initialData?.metric || "revenue");
  const [period, setPeriod] = useState(initialPeriod);
  const [startDate, setStartDate] = useState(initialBounds[0]);
  const [endDate, setEndDate] = useState(initialBounds[1]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const errors = result?.details?.fieldErrors;
  const eligibleCategories = useMemo(() => categories.filter((category) => (category.is_active || category.id === initialData?.category_id) && (metric === "revenue" ? ["income", "both"].includes(category.direction) : metric === "expense_limit" ? ["expense", "both"].includes(category.direction) : false)), [categories, metric, initialData]);

  function changePeriod(value) {
    setPeriod(value);
    if (value !== "custom") {
      const [start, end] = periodBounds(today, value);
      setStartDate(start); setEndDate(end);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true); setResult(null);
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      metric,
      category_id: metric === "net_profit" ? null : form.get("category_id"),
      target_amount: form.get("target_amount"),
      period_type: period,
      start_date: startDate,
      end_date: endDate,
      status: form.get("status"),
      notes: form.get("notes"),
    };
    const response = editing ? await updateFinanceTarget(initialData.id, payload) : await createFinanceTarget(payload);
    setSubmitting(false);
    if (response.error) return setResult(response);
    router.push("/admin/finance/targets"); router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {result?.error ? <div className="flex items-start gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3.5 text-sm text-rose-200"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />{result.error}</div> : null}
      <div><label htmlFor="name" className={labelClass}>Target name *</label><input id="name" name="name" required maxLength={180} defaultValue={initialData?.name || ""} placeholder="e.g. July revenue target" className={inputClass} />{errors?.name?.[0] ? <p className="mt-1.5 text-xs text-rose-400">{errors.name[0]}</p> : null}</div>
      <fieldset><legend className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-500">What should be measured?</legend><div className="grid gap-2 sm:grid-cols-3">{[["revenue", "Revenue", "Cleared income"], ["net_profit", "Net profit", "Income minus expense"], ["expense_limit", "Expense limit", "Maximum allowed cost"]].map(([value, label, help]) => <button key={value} type="button" onClick={() => setMetric(value)} className={`rounded-xl border p-4 text-left ${metric === value ? "border-emerald-500/35 bg-emerald-500/10" : "border-neutral-800 bg-neutral-950/35"}`}><span className={`block text-sm font-bold ${metric === value ? "text-emerald-300" : "text-neutral-300"}`}>{label}</span><span className="mt-1 block text-[10px] text-neutral-500">{help}</span></button>)}</div></fieldset>
      <div className="grid gap-5 md:grid-cols-2">
        <div><label htmlFor="target_amount" className={labelClass}>Target amount (BDT) *</label><input id="target_amount" name="target_amount" type="number" min="0.01" step="0.01" required defaultValue={initialData?.target_amount || ""} className={inputClass} />{errors?.target_amount?.[0] ? <p className="mt-1.5 text-xs text-rose-400">{errors.target_amount[0]}</p> : null}</div>
        <div><label htmlFor="status" className={labelClass}>Status *</label><select id="status" name="status" defaultValue={initialData?.status || "active"} className={inputClass}><option value="active">Active</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></div>
        {metric !== "net_profit" ? <div className="md:col-span-2"><label htmlFor="category_id" className={labelClass}>Category scope <span className="font-normal text-neutral-600">(optional)</span></label><select key={metric} id="category_id" name="category_id" defaultValue={initialData?.category_id || ""} className={inputClass}><option value="">All {metric === "revenue" ? "income" : "expense"} categories</option>{eligibleCategories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div> : null}
      </div>
      <fieldset className="border-t border-neutral-800 pt-6"><legend className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-500">Target period</legend><div className="mb-5 flex gap-2 overflow-x-auto">{[["weekly", "Week"], ["monthly", "Month"], ["quarterly", "Quarter"], ["yearly", "Year"], ["custom", "Custom"]].map(([value, label]) => <button key={value} type="button" onClick={() => changePeriod(value)} className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold ${period === value ? "bg-neutral-100 text-neutral-950" : "bg-neutral-800/60 text-neutral-400"}`}>{label}</button>)}</div><div className="grid gap-5 md:grid-cols-2"><div><label htmlFor="start_date" className={labelClass}>Start date *</label><input id="start_date" type="date" value={startDate} onChange={(event) => { setStartDate(event.target.value); setPeriod("custom"); }} required className={inputClass} /></div><div><label htmlFor="end_date" className={labelClass}>End date *</label><input id="end_date" type="date" value={endDate} onChange={(event) => { setEndDate(event.target.value); setPeriod("custom"); }} required className={inputClass} />{errors?.end_date?.[0] ? <p className="mt-1.5 text-xs text-rose-400">{errors.end_date[0]}</p> : null}</div></div></fieldset>
      <div><label htmlFor="notes" className={labelClass}>Internal notes</label><textarea id="notes" name="notes" rows={4} maxLength={5000} defaultValue={initialData?.notes || ""} placeholder="Reason, assumptions, owner, or actions linked to this target..." className={inputClass} /></div>
      <div className={`rounded-xl border p-4 text-xs leading-5 ${metric === "expense_limit" ? "border-amber-500/15 bg-amber-500/5 text-amber-200/80" : "border-sky-500/15 bg-sky-500/5 text-sky-200/80"}`}>{metric === "expense_limit" ? "For an expense limit, 100% means the full budget has been used. Going above 100% means the limit was exceeded." : "Progress is calculated automatically from cleared transactions inside the selected dates."}</div>
      <div className="flex flex-col-reverse gap-3 border-t border-neutral-800 pt-6 sm:flex-row sm:justify-end"><Link href="/admin/finance/targets" className="rounded-xl border border-neutral-700 px-4 py-2.5 text-center text-sm font-bold text-neutral-300 hover:bg-neutral-800">Cancel</Link><button disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-emerald-950 hover:bg-emerald-400 disabled:opacity-60">{submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{submitting ? "Saving..." : editing ? "Save changes" : "Create target"}</button></div>
    </form>
  );
}
