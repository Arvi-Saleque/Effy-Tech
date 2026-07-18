"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { setFinanceTargetStatus } from "@/lib/admin/finance-actions";

export default function TargetActions({ target }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function change(status) {
    setLoading(true); setError("");
    const response = await setFinanceTargetStatus(target.id, status);
    setLoading(false);
    if (response.error) return setError(response.error);
    router.refresh();
  }
  return <div><div className="flex items-center justify-end gap-2 text-xs font-bold">{loading ? <Loader2 className="h-3.5 w-3.5 animate-spin text-neutral-500" /> : target.status === "active" ? <><button onClick={() => change("completed")} className="text-emerald-400">Complete</button><button onClick={() => change("cancelled")} className="text-rose-400">Cancel</button></> : <button onClick={() => change("active")} className="text-emerald-400">Reactivate</button>}<Link href={`/admin/finance/targets/${target.id}/edit`} className="text-sky-400">Edit</Link></div>{error ? <p className="mt-1 text-right text-[10px] text-rose-400">{error}</p> : null}</div>;
}

