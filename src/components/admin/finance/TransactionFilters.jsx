import Link from "next/link";

const fieldClass = "rounded-lg border border-neutral-700/80 bg-neutral-950/70 px-3 py-2 text-xs text-neutral-200 outline-none focus:border-emerald-500/60";

export default function TransactionFilters({ filters, references }) {
  return (
    <form action="/admin/finance/transactions" method="get" className="rounded-2xl border border-neutral-800/80 bg-neutral-900/35 p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
        <input name="search" defaultValue={filters.search || ""} placeholder="Search ledger..." className={`${fieldClass} sm:col-span-2`} />
        <select name="type" defaultValue={filters.type || "all"} className={fieldClass}><option value="all">All types</option><option value="income">Income</option><option value="expense">Expense</option><option value="transfer">Transfer</option></select>
        <select name="status" defaultValue={filters.status || "all"} className={fieldClass}><option value="all">All statuses</option><option value="cleared">Cleared</option><option value="planned">Planned</option><option value="void">Void</option></select>
        <select name="account" defaultValue={filters.account || ""} className={fieldClass}><option value="">All accounts</option>{references.accounts.map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}</select>
        <select name="category" defaultValue={filters.category || ""} className={fieldClass}><option value="">All categories</option>{references.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>
        <input type="date" name="from" defaultValue={filters.from || ""} aria-label="From date" className={fieldClass} />
        <input type="date" name="to" defaultValue={filters.to || ""} aria-label="To date" className={fieldClass} />
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <Link href="/admin/finance/transactions" className="rounded-lg px-3 py-2 text-xs font-bold text-neutral-500 hover:text-neutral-300">Clear</Link>
        <button className="rounded-lg bg-neutral-100 px-4 py-2 text-xs font-bold text-neutral-950 hover:bg-white">Apply filters</button>
      </div>
    </form>
  );
}

