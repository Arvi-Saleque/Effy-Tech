-- ============================================================
-- Effy Tech Admin Panel V1 — Database Schema
-- ────────────────────────────────────────────────────────────
-- This SQL script sets up the database schema for the internal
-- admin panel. Run this in the Supabase SQL Editor.
-- ============================================================

-- 1. Create tables if they do not exist

-- Table: admin_profiles
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  role text not null check (role in ('admin', 'member')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Table: work_assignments
create table if not exists public.work_assignments (
  id uuid primary key default gen_random_uuid(),
  assigned_to uuid not null references auth.users(id) on delete cascade,
  assigned_by uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text not null default '',
  work_date date not null,
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'done', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Table: work_sessions
create table if not exists public.work_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  work_date date not null,
  status text not null default 'offline' check (status in ('offline', 'active', 'break', 'ended')),
  current_work_title text,
  current_work_note text not null default '',
  assignment_id uuid references public.work_assignments(id) on delete set null,
  started_at timestamptz,
  ended_at timestamptz,
  break_started_at timestamptz,
  break_minutes integer not null default 0,
  total_minutes integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, work_date)
);

-- Table: daily_work_logs
create table if not exists public.daily_work_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id uuid references public.work_sessions(id) on delete cascade,
  work_date date not null,
  work_note text not null default '',
  blockers text not null default '',
  tomorrow_plan text not null default '',
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, work_date)
);

-- 2. Create Indexes if they do not exist
create index if not exists idx_admin_profiles_role on public.admin_profiles(role);
create index if not exists idx_work_assignments_assigned_to_date on public.work_assignments(assigned_to, work_date);
create index if not exists idx_work_assignments_work_date on public.work_assignments(work_date);
create index if not exists idx_work_assignments_status on public.work_assignments(status);
create index if not exists idx_work_sessions_user_id_date on public.work_sessions(user_id, work_date);
create index if not exists idx_work_sessions_work_date on public.work_sessions(work_date);
create index if not exists idx_work_sessions_status on public.work_sessions(status);
create index if not exists idx_daily_work_logs_user_id_date on public.daily_work_logs(user_id, work_date);
create index if not exists idx_daily_work_logs_work_date on public.daily_work_logs(work_date);

-- 3. Set up updated_at triggers
create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Attach Triggers (drop first to make it idempotent)
drop trigger if exists handle_updated_at on public.admin_profiles;
create trigger handle_updated_at
  before update on public.admin_profiles
  for each row execute function public.set_updated_at();

drop trigger if exists handle_updated_at on public.work_assignments;
create trigger handle_updated_at
  before update on public.work_assignments
  for each row execute function public.set_updated_at();

drop trigger if exists handle_updated_at on public.work_sessions;
create trigger handle_updated_at
  before update on public.work_sessions
  for each row execute function public.set_updated_at();

drop trigger if exists handle_updated_at on public.daily_work_logs;
create trigger handle_updated_at
  before update on public.daily_work_logs
  for each row execute function public.set_updated_at();

-- 4. Create public.is_admin helper function
-- defined with SECURITY DEFINER to bypass RLS policies and avoid recursion issues
create or replace function public.is_admin(uid uuid)
returns boolean
security definer
set search_path = public
language plpgsql
as $$
begin
  return exists (
    select 1 from public.admin_profiles
    where id = uid and role = 'admin'
  );
end;
$$;

-- 5. Enable Row Level Security (RLS) on all tables
alter table public.admin_profiles enable row level security;
alter table public.work_assignments enable row level security;
alter table public.work_sessions enable row level security;
alter table public.daily_work_logs enable row level security;

-- 6. Define RLS Policies

-- Policies for admin_profiles
drop policy if exists "Users can read own profile" on public.admin_profiles;
create policy "Users can read own profile" on public.admin_profiles
  for select to authenticated
  using ( auth.uid() = id );

drop policy if exists "Admins can read all profiles" on public.admin_profiles;
create policy "Admins can read all profiles" on public.admin_profiles
  for select to authenticated
  using ( public.is_admin(auth.uid()) );

drop policy if exists "Admins can insert profiles" on public.admin_profiles;
create policy "Admins can insert profiles" on public.admin_profiles
  for insert to authenticated
  with check ( public.is_admin(auth.uid()) );

drop policy if exists "Admins can update profiles" on public.admin_profiles;
create policy "Admins can update profiles" on public.admin_profiles
  for update to authenticated
  using ( public.is_admin(auth.uid()) )
  with check ( public.is_admin(auth.uid()) );

-- Policies for work_assignments
drop policy if exists "Admins can read all assignments" on public.work_assignments;
create policy "Admins can read all assignments" on public.work_assignments
  for select to authenticated
  using ( public.is_admin(auth.uid()) );

drop policy if exists "Admins can insert assignments" on public.work_assignments;
create policy "Admins can insert assignments" on public.work_assignments
  for insert to authenticated
  with check ( public.is_admin(auth.uid()) );

drop policy if exists "Admins can update assignments" on public.work_assignments;
create policy "Admins can update assignments" on public.work_assignments
  for update to authenticated
  using ( public.is_admin(auth.uid()) )
  with check ( public.is_admin(auth.uid()) );

drop policy if exists "Admins can delete assignments" on public.work_assignments;
create policy "Admins can delete assignments" on public.work_assignments
  for delete to authenticated
  using ( public.is_admin(auth.uid()) );

drop policy if exists "Members can read own assignments" on public.work_assignments;
create policy "Members can read own assignments" on public.work_assignments
  for select to authenticated
  using ( auth.uid() = assigned_to );

drop policy if exists "Members can update own assignment status" on public.work_assignments;
create policy "Members can update own assignment status" on public.work_assignments
  for update to authenticated
  using ( auth.uid() = assigned_to )
  with check ( auth.uid() = assigned_to );

-- Policies for work_sessions
drop policy if exists "Admins can read all sessions" on public.work_sessions;
create policy "Admins can read all sessions" on public.work_sessions
  for select to authenticated
  using ( public.is_admin(auth.uid()) );

drop policy if exists "Admins can update all sessions" on public.work_sessions;
create policy "Admins can update all sessions" on public.work_sessions
  for update to authenticated
  using ( public.is_admin(auth.uid()) )
  with check ( public.is_admin(auth.uid()) );

drop policy if exists "Members can read own sessions" on public.work_sessions;
create policy "Members can read own sessions" on public.work_sessions
  for select to authenticated
  using ( auth.uid() = user_id );

drop policy if exists "Members can insert own sessions" on public.work_sessions;
create policy "Members can insert own sessions" on public.work_sessions
  for insert to authenticated
  with check ( auth.uid() = user_id );

drop policy if exists "Members can update own sessions" on public.work_sessions;
create policy "Members can update own sessions" on public.work_sessions
  for update to authenticated
  using ( auth.uid() = user_id )
  with check ( auth.uid() = user_id );

-- Policies for daily_work_logs
drop policy if exists "Admins can read all logs" on public.daily_work_logs;
create policy "Admins can read all logs" on public.daily_work_logs
  for select to authenticated
  using ( public.is_admin(auth.uid()) );

drop policy if exists "Admins can update all logs" on public.daily_work_logs;
create policy "Admins can update all logs" on public.daily_work_logs
  for update to authenticated
  using ( public.is_admin(auth.uid()) )
  with check ( public.is_admin(auth.uid()) );

drop policy if exists "Members can read own logs" on public.daily_work_logs;
create policy "Members can read own logs" on public.daily_work_logs
  for select to authenticated
  using ( auth.uid() = user_id );

drop policy if exists "Members can insert own logs" on public.daily_work_logs;
create policy "Members can insert own logs" on public.daily_work_logs
  for insert to authenticated
  with check ( auth.uid() = user_id );

drop policy if exists "Members can update own logs" on public.daily_work_logs;
create policy "Members can update own logs" on public.daily_work_logs
  for update to authenticated
  using ( auth.uid() = user_id )
  with check ( auth.uid() = user_id );
