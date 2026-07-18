-- ============================================================
-- EffyOps Finance Management V1
-- Client revenue, project receivables, expenses, recurring costs,
-- accounts, targets, reporting views, RLS, and immutable audit trail.
-- ============================================================

create extension if not exists pgcrypto;

-- Keep this migration independently safe if an older admin schema is present.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Core finance tables
-- ---------------------------------------------------------------------------

create table if not exists public.finance_accounts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  account_type text not null default 'other'
    check (account_type in ('cash', 'bank', 'mobile_banking', 'card', 'other')),
  opening_balance numeric(16,2) not null default 0,
  is_active boolean not null default true,
  is_system boolean not null default false,
  notes text,
  created_by uuid references public.admin_profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint finance_accounts_name_key unique (name)
);

create table if not exists public.finance_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  direction text not null check (direction in ('income', 'expense', 'both')),
  color text not null default '#64748b'
    check (color ~ '^#[0-9A-Fa-f]{6}$'),
  is_active boolean not null default true,
  is_system boolean not null default false,
  created_by uuid references public.admin_profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint finance_categories_name_direction_key unique (name, direction)
);

create table if not exists public.finance_project_contracts (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null unique references public.projects(id) on delete restrict,
  contract_value numeric(16,2) not null check (contract_value > 0),
  signed_date date,
  payment_deadline date,
  status text not null default 'active'
    check (status in ('active', 'on_hold', 'settled', 'cancelled')),
  notes text,
  created_by uuid not null references public.admin_profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (payment_deadline is null or signed_date is null or payment_deadline >= signed_date)
);

create table if not exists public.finance_recurring_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('income', 'expense')),
  title text not null,
  category_id uuid not null references public.finance_categories(id) on delete restrict,
  account_id uuid not null references public.finance_accounts(id) on delete restrict,
  client_id uuid references public.clients(id) on delete restrict,
  project_id uuid references public.projects(id) on delete restrict,
  amount numeric(16,2) not null check (amount > 0),
  payment_method text not null default 'bank_transfer'
    check (payment_method in ('bank_transfer', 'cash', 'mobile_banking', 'card', 'online_gateway', 'cheque', 'other')),
  frequency text not null check (frequency in ('weekly', 'monthly', 'quarterly', 'yearly')),
  next_due_date date not null,
  reminder_days integer not null default 7 check (reminder_days between 0 and 365),
  status text not null default 'active' check (status in ('active', 'paused', 'ended')),
  notes text,
  created_by uuid not null references public.admin_profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.finance_targets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  metric text not null check (metric in ('revenue', 'net_profit', 'expense_limit')),
  category_id uuid references public.finance_categories(id) on delete set null,
  target_amount numeric(16,2) not null check (target_amount > 0),
  period_type text not null default 'monthly'
    check (period_type in ('weekly', 'monthly', 'quarterly', 'yearly', 'custom')),
  start_date date not null,
  end_date date not null,
  status text not null default 'active' check (status in ('active', 'completed', 'cancelled')),
  notes text,
  created_by uuid not null references public.admin_profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date >= start_date)
);

create table if not exists public.finance_transactions (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('income', 'expense', 'transfer')),
  status text not null default 'cleared' check (status in ('planned', 'cleared', 'void')),
  title text not null,
  amount numeric(16,2) not null check (amount > 0),
  transaction_date date not null,
  due_date date,
  account_id uuid not null references public.finance_accounts(id) on delete restrict,
  destination_account_id uuid references public.finance_accounts(id) on delete restrict,
  category_id uuid references public.finance_categories(id) on delete restrict,
  client_id uuid references public.clients(id) on delete restrict,
  project_id uuid references public.projects(id) on delete restrict,
  recurring_item_id uuid references public.finance_recurring_items(id) on delete set null,
  payment_method text not null default 'bank_transfer'
    check (payment_method in ('bank_transfer', 'cash', 'mobile_banking', 'card', 'online_gateway', 'cheque', 'other')),
  reference text,
  notes text,
  created_by uuid not null references public.admin_profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (
      type = 'transfer'
      and destination_account_id is not null
      and destination_account_id <> account_id
      and category_id is null
      and client_id is null
      and project_id is null
    )
    or
    (
      type in ('income', 'expense')
      and destination_account_id is null
      and category_id is not null
    )
  )
);

create table if not exists public.finance_audit_log (
  id bigint generated always as identity primary key,
  entity_type text not null,
  entity_id uuid,
  action text not null check (action in ('INSERT', 'UPDATE')),
  old_record jsonb,
  new_record jsonb,
  changed_by uuid references public.admin_profiles(id) on delete set null,
  changed_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

create index if not exists idx_finance_accounts_active on public.finance_accounts(is_active);
create index if not exists idx_finance_categories_direction_active on public.finance_categories(direction, is_active);
create index if not exists idx_finance_contracts_deadline on public.finance_project_contracts(payment_deadline);
create index if not exists idx_finance_contracts_status on public.finance_project_contracts(status);
create index if not exists idx_finance_recurring_next_due on public.finance_recurring_items(status, next_due_date);
create index if not exists idx_finance_targets_dates on public.finance_targets(status, start_date, end_date);
create index if not exists idx_finance_transactions_date on public.finance_transactions(transaction_date desc);
create index if not exists idx_finance_transactions_status_date on public.finance_transactions(status, transaction_date desc);
create index if not exists idx_finance_transactions_type_date on public.finance_transactions(type, transaction_date desc);
create index if not exists idx_finance_transactions_account on public.finance_transactions(account_id, status);
create index if not exists idx_finance_transactions_destination on public.finance_transactions(destination_account_id, status)
  where destination_account_id is not null;
create index if not exists idx_finance_transactions_project on public.finance_transactions(project_id, status)
  where project_id is not null;
create index if not exists idx_finance_transactions_client on public.finance_transactions(client_id, status)
  where client_id is not null;
create index if not exists idx_finance_transactions_category on public.finance_transactions(category_id, status)
  where category_id is not null;
create index if not exists idx_finance_audit_entity on public.finance_audit_log(entity_type, entity_id, changed_at desc);

-- ---------------------------------------------------------------------------
-- Validation, immutability, timestamps, and audit triggers
-- ---------------------------------------------------------------------------

create or replace function public.protect_finance_immutable_fields()
returns trigger
language plpgsql
set search_path = pg_catalog, public
as $$
begin
  if new.id is distinct from old.id then raise exception 'id is immutable'; end if;
  if new.created_by is distinct from old.created_by then raise exception 'created_by is immutable'; end if;
  if new.created_at is distinct from old.created_at then raise exception 'created_at is immutable'; end if;
  return new;
end;
$$;

create or replace function public.sync_finance_project_client()
returns trigger
language plpgsql
set search_path = pg_catalog, public
as $$
declare
  expected_client_id uuid;
begin
  if new.project_id is null then
    return new;
  end if;

  select p.client_id into expected_client_id
  from public.projects p
  where p.id = new.project_id;

  if expected_client_id is null then
    raise exception 'Project not found';
  end if;

  if new.client_id is null then
    new.client_id = expected_client_id;
  elsif new.client_id <> expected_client_id then
    raise exception 'Selected client does not own the selected project';
  end if;

  return new;
end;
$$;

create or replace function public.validate_finance_category_direction()
returns trigger
language plpgsql
set search_path = pg_catalog, public
as $$
declare
  category_direction text;
begin
  if new.type = 'transfer' then
    return new;
  end if;

  select c.direction into category_direction
  from public.finance_categories c
  where c.id = new.category_id;

  if category_direction is null then
    raise exception 'Finance category not found';
  end if;

  if category_direction <> 'both' and category_direction <> new.type then
    raise exception 'Finance category direction does not match transaction type';
  end if;

  return new;
end;
$$;

create or replace function public.write_finance_audit_log()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  row_id uuid;
begin
  row_id := case
    when tg_op = 'INSERT' then new.id
    else old.id
  end;

  insert into public.finance_audit_log (
    entity_type,
    entity_id,
    action,
    old_record,
    new_record,
    changed_by
  ) values (
    tg_table_name,
    row_id,
    tg_op,
    case when tg_op = 'UPDATE' then to_jsonb(old) else null end,
    to_jsonb(new),
    auth.uid()
  );

  return new;
end;
$$;

revoke all on function public.write_finance_audit_log() from public;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'finance_accounts',
    'finance_categories',
    'finance_project_contracts',
    'finance_recurring_items',
    'finance_targets',
    'finance_transactions'
  ]
  loop
    execute format('drop trigger if exists handle_%I_updated_at on public.%I', table_name, table_name);
    execute format(
      'create trigger handle_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      table_name,
      table_name
    );

    execute format('drop trigger if exists protect_%I_immutable on public.%I', table_name, table_name);
    execute format(
      'create trigger protect_%I_immutable before update on public.%I for each row execute function public.protect_finance_immutable_fields()',
      table_name,
      table_name
    );

    execute format('drop trigger if exists audit_%I_changes on public.%I', table_name, table_name);
    execute format(
      'create trigger audit_%I_changes after insert or update on public.%I for each row execute function public.write_finance_audit_log()',
      table_name,
      table_name
    );
  end loop;
end;
$$;

drop trigger if exists sync_finance_transaction_project_client on public.finance_transactions;
create trigger sync_finance_transaction_project_client
  before insert or update on public.finance_transactions
  for each row execute function public.sync_finance_project_client();

drop trigger if exists validate_finance_transaction_category on public.finance_transactions;
create trigger validate_finance_transaction_category
  before insert or update on public.finance_transactions
  for each row execute function public.validate_finance_category_direction();

drop trigger if exists sync_finance_recurring_project_client on public.finance_recurring_items;
create trigger sync_finance_recurring_project_client
  before insert or update on public.finance_recurring_items
  for each row execute function public.sync_finance_project_client();

drop trigger if exists validate_finance_recurring_category on public.finance_recurring_items;
create trigger validate_finance_recurring_category
  before insert or update on public.finance_recurring_items
  for each row execute function public.validate_finance_category_direction();

-- ---------------------------------------------------------------------------
-- Safe system defaults
-- ---------------------------------------------------------------------------

insert into public.finance_accounts (name, account_type, opening_balance, is_system)
values ('General Fund', 'other', 0, true)
on conflict (name) do nothing;

insert into public.finance_categories (name, direction, color, is_system)
values
  ('Client Payment', 'income', '#10b981', true),
  ('Other Income', 'income', '#34d399', true),
  ('Domain & Hosting', 'expense', '#8b5cf6', true),
  ('Software & Subscriptions', 'expense', '#6366f1', true),
  ('Marketing & Advertising', 'expense', '#f59e0b', true),
  ('Team & Contractors', 'expense', '#3b82f6', true),
  ('Office & Equipment', 'expense', '#06b6d4', true),
  ('Bank & Payment Fees', 'expense', '#f97316', true),
  ('Taxes & Compliance', 'expense', '#ef4444', true),
  ('Travel & Meetings', 'expense', '#ec4899', true),
  ('Other Expense', 'expense', '#64748b', true)
on conflict (name, direction) do nothing;

-- ---------------------------------------------------------------------------
-- Read models. security_invoker keeps the underlying admin-only RLS effective.
-- ---------------------------------------------------------------------------

create or replace view public.finance_account_balances
with (security_invoker = true)
as
select
  a.id,
  a.name,
  a.account_type,
  a.opening_balance,
  a.is_active,
  a.is_system,
  a.notes,
  a.created_at,
  a.updated_at,
  (
    a.opening_balance
    + coalesce(sum(
      case
        when t.status <> 'cleared' then 0
        when t.type = 'income' and t.account_id = a.id then t.amount
        when t.type = 'expense' and t.account_id = a.id then -t.amount
        when t.type = 'transfer' and t.account_id = a.id then -t.amount
        when t.type = 'transfer' and t.destination_account_id = a.id then t.amount
        else 0
      end
    ), 0)
  )::numeric(16,2) as current_balance
from public.finance_accounts a
left join public.finance_transactions t
  on t.account_id = a.id or t.destination_account_id = a.id
group by a.id;

create or replace view public.finance_project_summary
with (security_invoker = true)
as
select
  c.id as contract_id,
  c.project_id,
  p.name as project_name,
  p.status as project_status,
  p.client_id,
  cl.name as client_name,
  cl.company_name,
  c.contract_value,
  c.signed_date,
  c.payment_deadline,
  c.status as contract_status,
  c.notes,
  c.created_at,
  c.updated_at,
  coalesce(sum(t.amount) filter (where t.status = 'cleared' and t.type = 'income'), 0)::numeric(16,2) as received_amount,
  coalesce(sum(t.amount) filter (where t.status = 'cleared' and t.type = 'expense'), 0)::numeric(16,2) as expense_amount,
  greatest(
    c.contract_value - coalesce(sum(t.amount) filter (where t.status = 'cleared' and t.type = 'income'), 0),
    0
  )::numeric(16,2) as outstanding_amount,
  greatest(
    coalesce(sum(t.amount) filter (where t.status = 'cleared' and t.type = 'income'), 0) - c.contract_value,
    0
  )::numeric(16,2) as overpaid_amount,
  (
    coalesce(sum(t.amount) filter (where t.status = 'cleared' and t.type = 'income'), 0)
    - coalesce(sum(t.amount) filter (where t.status = 'cleared' and t.type = 'expense'), 0)
  )::numeric(16,2) as realized_net_cash,
  (
    c.contract_value
    - coalesce(sum(t.amount) filter (where t.status = 'cleared' and t.type = 'expense'), 0)
  )::numeric(16,2) as projected_margin
from public.finance_project_contracts c
join public.projects p on p.id = c.project_id
join public.clients cl on cl.id = p.client_id
left join public.finance_transactions t on t.project_id = c.project_id
group by c.id, p.id, cl.id;

create or replace view public.finance_target_progress
with (security_invoker = true)
as
select
  g.id,
  g.name,
  g.metric,
  g.category_id,
  c.name as category_name,
  c.color as category_color,
  g.target_amount,
  g.period_type,
  g.start_date,
  g.end_date,
  g.status,
  g.notes,
  g.created_at,
  g.updated_at,
  values_for_period.actual_amount::numeric(16,2) as actual_amount,
  (g.target_amount - values_for_period.actual_amount)::numeric(16,2) as remaining_amount,
  round(
    greatest(values_for_period.actual_amount, 0) / nullif(g.target_amount, 0) * 100,
    2
  ) as progress_percent
from public.finance_targets g
left join public.finance_categories c on c.id = g.category_id
cross join lateral (
  select
    case g.metric
      when 'revenue' then coalesce(sum(t.amount) filter (where t.type = 'income'), 0)
      when 'net_profit' then
        coalesce(sum(t.amount) filter (where t.type = 'income'), 0)
        - coalesce(sum(t.amount) filter (where t.type = 'expense'), 0)
      when 'expense_limit' then coalesce(sum(t.amount) filter (where t.type = 'expense'), 0)
      else 0
    end as actual_amount
  from public.finance_transactions t
  where t.status = 'cleared'
    and t.transaction_date between g.start_date and g.end_date
    and (g.category_id is null or t.category_id = g.category_id)
) values_for_period;

-- Recording a recurring payment and moving its due date must be atomic.
create or replace function public.record_recurring_finance_item_v1(
  p_item_id uuid,
  p_paid_date date,
  p_next_due_date date,
  p_reference text default null,
  p_notes text default null
)
returns uuid
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
declare
  item public.finance_recurring_items%rowtype;
  new_transaction_id uuid;
begin
  if not public.is_active_admin(auth.uid()) then
    raise exception 'Active admin required';
  end if;

  select * into item
  from public.finance_recurring_items
  where id = p_item_id
  for update;

  if not found then
    raise exception 'Recurring item not found';
  end if;

  if item.status <> 'active' then
    raise exception 'Only active recurring items can be recorded';
  end if;

  if p_next_due_date <= item.next_due_date then
    raise exception 'Next due date must advance';
  end if;

  insert into public.finance_transactions (
    type,
    status,
    title,
    amount,
    transaction_date,
    due_date,
    account_id,
    category_id,
    client_id,
    project_id,
    recurring_item_id,
    payment_method,
    reference,
    notes,
    created_by
  ) values (
    item.type,
    'cleared',
    item.title,
    item.amount,
    p_paid_date,
    item.next_due_date,
    item.account_id,
    item.category_id,
    item.client_id,
    item.project_id,
    item.id,
    item.payment_method,
    nullif(trim(p_reference), ''),
    nullif(trim(p_notes), ''),
    auth.uid()
  )
  returning id into new_transaction_id;

  update public.finance_recurring_items
  set next_due_date = p_next_due_date
  where id = item.id;

  return new_transaction_id;
end;
$$;

revoke all on function public.record_recurring_finance_item_v1(uuid, date, date, text, text) from public;

-- ---------------------------------------------------------------------------
-- RLS and grants: Finance is intentionally admin-only.
-- ---------------------------------------------------------------------------

alter table public.finance_accounts enable row level security;
alter table public.finance_categories enable row level security;
alter table public.finance_project_contracts enable row level security;
alter table public.finance_recurring_items enable row level security;
alter table public.finance_targets enable row level security;
alter table public.finance_transactions enable row level security;
alter table public.finance_audit_log enable row level security;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'finance_accounts',
    'finance_categories',
    'finance_project_contracts',
    'finance_recurring_items',
    'finance_targets',
    'finance_transactions'
  ]
  loop
    execute format('drop policy if exists "Active admins can read %s" on public.%I', table_name, table_name);
    execute format(
      'create policy "Active admins can read %s" on public.%I for select to authenticated using (public.is_active_admin(auth.uid()))',
      table_name,
      table_name
    );

    execute format('drop policy if exists "Active admins can insert %s" on public.%I', table_name, table_name);
    execute format(
      'create policy "Active admins can insert %s" on public.%I for insert to authenticated with check (public.is_active_admin(auth.uid()) and created_by = auth.uid())',
      table_name,
      table_name
    );

    execute format('drop policy if exists "Active admins can update %s" on public.%I', table_name, table_name);
    execute format(
      'create policy "Active admins can update %s" on public.%I for update to authenticated using (public.is_active_admin(auth.uid())) with check (public.is_active_admin(auth.uid()))',
      table_name,
      table_name
    );
  end loop;
end;
$$;

drop policy if exists "Active admins can read finance audit log" on public.finance_audit_log;
create policy "Active admins can read finance audit log"
  on public.finance_audit_log
  for select to authenticated
  using (public.is_active_admin(auth.uid()));

grant select, insert, update on public.finance_accounts to authenticated;
grant select, insert, update on public.finance_categories to authenticated;
grant select, insert, update on public.finance_project_contracts to authenticated;
grant select, insert, update on public.finance_recurring_items to authenticated;
grant select, insert, update on public.finance_targets to authenticated;
grant select, insert, update on public.finance_transactions to authenticated;
grant select on public.finance_audit_log to authenticated;
grant select on public.finance_account_balances to authenticated;
grant select on public.finance_project_summary to authenticated;
grant select on public.finance_target_progress to authenticated;
grant execute on function public.record_recurring_finance_item_v1(uuid, date, date, text, text) to authenticated;

revoke delete on public.finance_accounts from authenticated;
revoke delete on public.finance_categories from authenticated;
revoke delete on public.finance_project_contracts from authenticated;
revoke delete on public.finance_recurring_items from authenticated;
revoke delete on public.finance_targets from authenticated;
revoke delete on public.finance_transactions from authenticated;
revoke insert, update, delete on public.finance_audit_log from authenticated;

revoke all on public.finance_accounts from anon;
revoke all on public.finance_categories from anon;
revoke all on public.finance_project_contracts from anon;
revoke all on public.finance_recurring_items from anon;
revoke all on public.finance_targets from anon;
revoke all on public.finance_transactions from anon;
revoke all on public.finance_audit_log from anon;
revoke all on public.finance_account_balances from anon;
revoke all on public.finance_project_summary from anon;
revoke all on public.finance_target_progress from anon;
