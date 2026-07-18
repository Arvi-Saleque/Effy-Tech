import Link from "next/link";

export default function FinancePageHeader({ eyebrow = "EffyOps Finance", title, description, action }) {
  const Icon = action?.icon;
  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div className="max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-400/80">{eyebrow}</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-50 sm:text-3xl">{title}</h1>
        {description ? <p className="mt-2 text-sm leading-6 text-neutral-400">{description}</p> : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-emerald-950 shadow-[0_12px_35px_rgba(16,185,129,0.16)] transition hover:bg-emerald-400 lg:self-auto"
        >
          {Icon ? <Icon className="h-4 w-4" /> : null}
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}

