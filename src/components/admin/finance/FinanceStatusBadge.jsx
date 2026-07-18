import { STATUS_LABELS, TYPE_LABELS } from "@/lib/admin/finance-utils";

const colors = {
  income: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  expense: "border-rose-500/20 bg-rose-500/10 text-rose-300",
  transfer: "border-sky-500/20 bg-sky-500/10 text-sky-300",
  cleared: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  planned: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  void: "border-neutral-700 bg-neutral-800/60 text-neutral-500",
  active: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  paused: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  ended: "border-neutral-700 bg-neutral-800/60 text-neutral-400",
  on_hold: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  settled: "border-sky-500/20 bg-sky-500/10 text-sky-300",
  cancelled: "border-rose-500/20 bg-rose-500/10 text-rose-300",
  completed: "border-sky-500/20 bg-sky-500/10 text-sky-300",
};

export default function FinanceStatusBadge({ value }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${colors[value] || colors.ended}`}>
      {TYPE_LABELS[value] || STATUS_LABELS[value] || String(value || "unknown").replaceAll("_", " ")}
    </span>
  );
}

