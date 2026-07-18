import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function FinanceFormShell({ title, description, backHref, children }) {
  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <Link href={backHref} className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 transition hover:text-emerald-300">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400/80">EffyOps Finance</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-50">{title}</h1>
        {description ? <p className="mt-2 text-sm leading-6 text-neutral-400">{description}</p> : null}
      </div>
      <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/45 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
        {children}
      </div>
    </div>
  );
}

