import Link from "next/link";

const periods = [
  ["today", "Today"],
  ["week", "This week"],
  ["month", "This month"],
  ["quarter", "This quarter"],
  ["year", "This year"],
];

export default function FinancePeriodFilter({ period }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-900/35 p-3 backdrop-blur-xl xl:flex-row xl:items-center xl:justify-between">
      <div className="flex gap-1 overflow-x-auto">
        {periods.map(([value, label]) => (
          <Link
            key={value}
            href={`/admin/finance?range=${value}`}
            className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition ${
              period.range === value
                ? "bg-neutral-100 text-neutral-950"
                : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <form action="/admin/finance" method="get" className="flex flex-wrap items-end gap-2">
        <input type="hidden" name="range" value="custom" />
        <label className="grid gap-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
          From
          <input
            type="date"
            name="from"
            defaultValue={period.range === "custom" ? period.start : ""}
            required
            className="rounded-lg border border-neutral-700 bg-neutral-950/70 px-2.5 py-2 text-xs font-medium text-neutral-200 outline-none focus:border-emerald-500/60"
          />
        </label>
        <label className="grid gap-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
          To
          <input
            type="date"
            name="to"
            defaultValue={period.range === "custom" ? period.end : ""}
            required
            className="rounded-lg border border-neutral-700 bg-neutral-950/70 px-2.5 py-2 text-xs font-medium text-neutral-200 outline-none focus:border-emerald-500/60"
          />
        </label>
        <button className="rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs font-bold text-neutral-200 transition hover:border-emerald-500/30 hover:text-emerald-300">
          Apply range
        </button>
      </form>
    </div>
  );
}

