# EffyOps Finance Management V1

## What this release adds

EffyOps Finance is an admin-only, BDT-based finance subsystem connected to the existing Clients and Projects modules.

Routes:

- `/admin/finance` — daily, weekly, monthly, quarterly, yearly, or custom-range overview
- `/admin/finance/transactions` — cleared/planned income, expenses, and account transfers
- `/admin/finance/projects` — contract values, collections, outstanding dues, project costs, and margin
- `/admin/finance/recurring` — domain, hosting, subscription, retainer, and other scheduled items
- `/admin/finance/targets` — revenue, net-profit, and expense-limit targets
- `/admin/finance/settings` — accounts, categories, opening balances, and recent audit activity

## Database migration

Run this migration before opening the Finance routes:

`supabase/migrations/20260718000000_finance_management_v1.sql`

The migration is idempotent and creates:

- 7 finance tables
- 3 invoker-security reporting views
- 1 atomic recurring-payment RPC
- RLS policies restricted to active admins
- database validation and immutable audit triggers
- a `General Fund` account
- 11 default income/expense categories

It does not alter or delete existing Clients, Projects, Tasks, Reports, or Work data.

### SQL Editor method

From the project root in PowerShell:

```powershell
Get-Content ".\supabase\migrations\20260718000000_finance_management_v1.sql" -Raw | Set-Clipboard
```

Open the connected Supabase project → SQL Editor → New query → paste → Run.

### Supabase CLI method

Use this only when the repository is already linked to the correct Supabase project:

```powershell
npx supabase db push
```

## First-time setup sequence

1. Open `/admin/finance/settings`.
2. Keep `General Fund` as a fallback or add the real company accounts (bank, cash, bKash/Nagad, card).
3. Set each account's opening balance as of the day immediately before the first ledger transaction that will be entered.
4. Review the default categories and add any company-specific categories.
5. Open `/admin/finance/projects` and configure the agreed value and deadline for each current project.
6. Backfill earlier client payments as cleared income linked to the correct project.
7. Backfill company and project expenses as cleared expense transactions.
8. Add domain, hosting, software, and similar renewal schedules under Recurring.
9. Add the current monthly revenue/profit/expense targets.

Do not enter an opening balance that already includes transactions you also plan to backfill; doing both would double-count cash.

## Financial rules

- Cleared income increases the selected account balance.
- Cleared expense decreases the selected account balance.
- Planned transactions appear in forecasts but do not affect current balance, revenue, expense, or project collection.
- Transfers move money between accounts and do not change company revenue, expense, or net cash flow.
- Project received amount is the sum of cleared income linked to that project.
- Project outstanding amount is `contract value − cleared project income`, never below zero.
- Project direct cost is the sum of cleared expense linked to that project.
- Void transactions remain visible in history but stop affecting every total and chart.
- Recurring “Mark paid/received” creates a cleared ledger transaction and advances the due date atomically.
- Finance reports use the `Asia/Dhaka` reporting calendar.

## Verification

```powershell
npm install
npm run test:finance
npm run lint
npm run build
```

Expected Finance test result: 10 passed, 0 failed.

## Deliberate V1 boundaries

This version does not claim to be a statutory accounting package. It does not yet include multi-currency conversion, bank API synchronization, invoice PDF generation, receipt file storage, payroll, VAT/tax filing, double-entry journals, or approval workflows. These can be added later without replacing the current ledger and project-finance foundation.

