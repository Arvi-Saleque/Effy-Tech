-- ============================================================
-- Effy Tech Admin Panel V1.1 — Work Blocks Schema
-- ────────────────────────────────────────────────────────────
-- This script creates the work_blocks table to support multiple
-- work blocks inside a single daily session.
-- ============================================================

-- Create Table: work_blocks
create table if not exists public.work_blocks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id uuid not null references work_sessions(id) on delete cascade,
  assignment_id uuid references work_assignments(id) on delete set null,
  work_date date not null,
  title text not null,
  note text not null default '',
  status text not null default 'active' check (status in ('active', 'done', 'cancelled')),
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  total_minutes integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_work_blocks_user_date on public.work_blocks(user_id, work_date);
create index if not exists idx_work_blocks_session_id on public.work_blocks(session_id);
create index if not exists idx_work_blocks_work_date on public.work_blocks(work_date);
create index if not exists idx_work_blocks_status on public.work_blocks(status);
create index if not exists idx_work_blocks_assignment_id on public.work_blocks(assignment_id);

-- Attach Trigger for updated_at
drop trigger if exists handle_updated_at on public.work_blocks;
create trigger handle_updated_at
  before update on public.work_blocks
  for each row execute function public.set_updated_at();

-- Enable Row Level Security (RLS)
alter table public.work_blocks enable row level security;

-- Policies for work_blocks

drop policy if exists "Admins can read all work_blocks" on public.work_blocks;
create policy "Admins can read all work_blocks" on public.work_blocks
  for select to authenticated
  using ( public.is_admin(auth.uid()) );

drop policy if exists "Members can read own work_blocks" on public.work_blocks;
create policy "Members can read own work_blocks" on public.work_blocks
  for select to authenticated
  using ( auth.uid() = user_id );

drop policy if exists "Users can insert own work_blocks" on public.work_blocks;
create policy "Users can insert own work_blocks" on public.work_blocks
  for insert to authenticated
  with check ( auth.uid() = user_id );

drop policy if exists "Users can update own work_blocks" on public.work_blocks;
create policy "Users can update own work_blocks" on public.work_blocks
  for update to authenticated
  using ( auth.uid() = user_id )
  with check ( auth.uid() = user_id );

drop policy if exists "Admins can update all work_blocks" on public.work_blocks;
create policy "Admins can update all work_blocks" on public.work_blocks
  for update to authenticated
  using ( public.is_admin(auth.uid()) )
  with check ( public.is_admin(auth.uid()) );
