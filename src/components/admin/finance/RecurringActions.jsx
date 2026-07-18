"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { recordRecurringFinanceItem, setRecurringFinanceStatus } from "@/lib/admin/finance-actions";

export default function RecurringActions({ item, today }) {
  const router = useRouter();
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  async function record() {
    if (!window.confirm(`Record ${item.type === "income" ? "receipt" : "payment"} of this recurring item for today?`)) return;
    const reference = window.prompt("Optional transaction reference (leave blank if none):", "");
    if (reference === null) return;
    setLoading("record"); setError("");
    const response = await recordRecurringFinanceItem(item.id, { paid_date: today, reference });
    setLoading("");
    if (response.error) return setError(response.error);
    router.refresh();
  }

  async function toggle() {
    const next = item.status === "active" ? "paused" : "active";
    setLoading("toggle"); setError("");
    const response = await setRecurringFinanceStatus(item.id, next);
    setLoading("");
    if (response.error) return setError(response.error);
    router.refresh();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-end gap-2 text-xs font-bold">
        {item.status === "active" ? <button onClick={record} disabled={Boolean(loading)} className="rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-emerald-300 hover:bg-emerald-500/15">{loading === "record" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : item.type === "income" ? "Mark received" : "Mark paid"}</button> : null}
        {item.status !== "ended" ? <button onClick={toggle} disabled={Boolean(loading)} className="text-amber-300 hover:text-amber-200">{loading === "toggle" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : item.status === "active" ? "Pause" : "Resume"}</button> : null}
        <Link href={`/admin/finance/recurring/${item.id}/edit`} className="text-sky-400 hover:text-sky-300">Edit</Link>
      </div>
      {error ? <p className="mt-1 text-right text-[10px] text-rose-400">{error}</p> : null}
    </div>
  );
}

