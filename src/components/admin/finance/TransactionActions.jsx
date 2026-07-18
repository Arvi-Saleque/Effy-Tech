"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { voidFinanceTransaction } from "@/lib/admin/finance-actions";

export default function TransactionActions({ transaction }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleVoid() {
    if (!window.confirm("Void this transaction? It will remain in the audit trail and stop affecting all totals.")) return;
    setLoading(true);
    setError("");
    const response = await voidFinanceTransaction(transaction.id);
    setLoading(false);
    if (response.error) setError(response.error);
  }

  if (transaction.status === "void") return <span className="text-[10px] text-neutral-600">Locked</span>;
  return (
    <div className="flex items-center justify-end gap-2">
      {error ? <span title={error} className="text-[10px] text-rose-400">Failed</span> : null}
      <Link href={`/admin/finance/transactions/${transaction.id}/edit`} className="text-xs font-bold text-sky-400 hover:text-sky-300">Edit</Link>
      <button type="button" disabled={loading} onClick={handleVoid} className="text-xs font-bold text-rose-400 hover:text-rose-300 disabled:opacity-50">
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Void"}
      </button>
    </div>
  );
}

