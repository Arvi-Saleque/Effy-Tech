import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const migrationPath = new URL("../supabase/migrations/20260718000000_finance_management_v1.sql", import.meta.url);
const sql = await readFile(migrationPath, "utf8");

test("finance migration enables RLS on every writable finance table", () => {
  for (const table of [
    "finance_accounts",
    "finance_categories",
    "finance_project_contracts",
    "finance_recurring_items",
    "finance_targets",
    "finance_transactions",
    "finance_audit_log",
  ]) {
    assert.match(sql, new RegExp(`alter table public\\.${table} enable row level security`, "i"));
  }
});

test("finance reporting views retain invoker security", () => {
  const invokerViews = sql.match(/with \(security_invoker = true\)/g) || [];
  assert.equal(invokerViews.length, 3);
});

test("recurring payment RPC creates a transaction and advances due date atomically", () => {
  const start = sql.indexOf("create or replace function public.record_recurring_finance_item_v1");
  const end = sql.indexOf("revoke all on function public.record_recurring_finance_item_v1", start);
  const rpc = sql.slice(start, end);
  assert.match(rpc, /insert into public\.finance_transactions/i);
  assert.match(rpc, /update public\.finance_recurring_items/i);
  assert.match(rpc, /for update/i);
  assert.match(rpc, /public\.is_active_admin\(auth\.uid\(\)\)/i);
});

test("authenticated users cannot hard-delete finance records through granted permissions", () => {
  assert.match(sql, /revoke delete on public\.finance_transactions from authenticated/i);
  assert.doesNotMatch(sql, /create policy[^;]*delete[^;]*finance_transactions/is);
});

