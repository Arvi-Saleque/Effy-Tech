"use client";

import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatMoney } from "@/lib/admin/finance-utils";

function CashflowTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="min-w-44 rounded-xl border border-neutral-700 bg-neutral-950/95 p-3 text-xs shadow-2xl">
      <p className="mb-2 font-bold text-neutral-200">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-5 py-0.5">
          <span style={{ color: entry.color }} className="capitalize">{entry.name}</span>
          <span className="font-mono font-bold text-neutral-100">{formatMoney(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function CashflowChart({ data }) {
  if (!data?.length) {
    return <div className="flex h-72 items-center justify-center text-sm text-neutral-600">No cash-flow data in this period.</div>;
  }
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid stroke="#262626" strokeDasharray="4 5" vertical={false} />
          <XAxis dataKey="label" stroke="#737373" tickLine={false} axisLine={false} fontSize={11} />
          <YAxis
            stroke="#737373"
            tickLine={false}
            axisLine={false}
            fontSize={10}
            tickFormatter={(value) => formatMoney(value, { compact: true })}
          />
          <Tooltip content={<CashflowTooltip />} cursor={{ fill: "rgba(255,255,255,0.025)" }} />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
          <Bar dataKey="income" name="Income" fill="#10b981" radius={[5, 5, 0, 0]} maxBarSize={26} />
          <Bar dataKey="expense" name="Expense" fill="#fb7185" radius={[5, 5, 0, 0]} maxBarSize={26} />
          <Line dataKey="net" name="Net" type="monotone" stroke="#60a5fa" strokeWidth={2.5} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

function ExpenseTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-xl border border-neutral-700 bg-neutral-950/95 p-3 text-xs shadow-2xl">
      <p className="font-bold text-neutral-200">{item.name}</p>
      <p className="mt-1 font-mono text-rose-300">{formatMoney(item.value)}</p>
    </div>
  );
}

export function ExpenseBreakdownChart({ data }) {
  const total = (data || []).reduce((sum, item) => sum + item.value, 0);
  if (!data?.length) {
    return <div className="flex h-64 items-center justify-center text-sm text-neutral-600">No expense data in this period.</div>;
  }
  return (
    <div>
      <div className="relative h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={86} paddingAngle={2} stroke="none">
              {data.map((item) => <Cell key={item.id} fill={item.color} />)}
            </Pie>
            <Tooltip content={<ExpenseTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Total</span>
          <strong className="mt-1 text-lg text-neutral-100">{formatMoney(total, { compact: true })}</strong>
        </div>
      </div>
      <div className="mt-2 space-y-2">
        {data.slice(0, 5).map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
            <span className="flex min-w-0 items-center gap-2 text-neutral-400">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="truncate">{item.name}</span>
            </span>
            <span className="font-mono font-semibold text-neutral-200">{formatMoney(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

