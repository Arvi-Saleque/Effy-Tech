-- ============================================================
-- EffyOps V2 Phase 1: Clients, Projects, and Project Members
-- ============================================================

-- 1. Create public.clients
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company_name text,
  contact_person text,
  email text,
  phone text,
  status text not null default 'active' check (status in ('lead', 'active', 'inactive', 'archived')),
  notes text,
  created_by uuid not null references public.admin_profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Create public.projects
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete restrict,
  name text not null,
  description text,
  status text not null default 'planning' check (status in ('planning', 'active', 'on_hold', 'completed', 'cancelled', 'archived')),
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  start_date date,
  due_date date,
  completed_at timestamptz,
  progress_percent integer not null default 0 check (progress_percent >= 0 and progress_percent <= 100),
  created_by uuid not null references public.admin_profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (due_date is null or start_date is null or due_date >= start_date)
);

-- 3. Create public.project_members
create table public.project_members (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.admin_profiles(id),
  project_role text not null default 'member' check (project_role in ('owner', 'manager', 'member', 'reviewer')),
  added_by uuid not null references public.admin_profiles(id),
  added_at timestamptz not null default now(),
  unique(project_id, user_id)
);

-- 4. Create all indexes
create index idx_clients_status on public.clients(status);
create index idx_clients_created_by on public.clients(created_by);
create index idx_clients_name_lower on public.clients(lower(name));

create index idx_projects_client_id on public.projects(client_id);
create index idx_projects_status on public.projects(status);
create index idx_projects_priority on public.projects(priority);
create index idx_projects_due_date on public.projects(due_date);
create index idx_projects_created_by on public.projects(created_by);
create index idx_projects_client_status on public.projects(client_id, status);

create index idx_project_members_project_id on public.project_members(project_id);
create index idx_project_members_user_id on public.project_members(user_id);
create index idx_project_members_role on public.project_members(project_role);

-- Helper Function: is_active_admin
create or replace function public.is_active_admin(uid uuid)
returns boolean
security definer
set search_path = public
language plpgsql
as $$
begin
  return exists (
    select 1 from public.admin_profiles
    where id = uid and role = 'admin' and is_active = true
  );
end;
$$;

revoke all on function public.is_active_admin(uuid) from public;
grant execute on function public.is_active_admin(uuid) to authenticated;
-- service_role effectively bypasses RLS and still maintains superuser-level capabilities

-- Helper Functions: Immutable Audit Protection (using SECURITY INVOKER)
create or replace function public.protect_clients_immutable()
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

create or replace function public.protect_projects_immutable()
returns trigger
language plpgsql
set search_path = pg_catalog, public
as $$
begin
  if new.id is distinct from old.id then raise exception 'id is immutable'; end if;
  if new.client_id is distinct from old.client_id then raise exception 'client_id is immutable'; end if;
  if new.created_by is distinct from old.created_by then raise exception 'created_by is immutable'; end if;
  if new.created_at is distinct from old.created_at then raise exception 'created_at is immutable'; end if;
  return new;
end;
$$;

create or replace function public.protect_project_members_immutable()
returns trigger
language plpgsql
set search_path = pg_catalog, public
as $$
begin
  if new.id is distinct from old.id then raise exception 'id is immutable'; end if;
  if new.project_id is distinct from old.project_id then raise exception 'project_id is immutable'; end if;
  if new.user_id is distinct from old.user_id then raise exception 'user_id is immutable'; end if;
  if new.added_by is distinct from old.added_by then raise exception 'added_by is immutable'; end if;
  if new.added_at is distinct from old.added_at then raise exception 'added_at is immutable'; end if;
  return new;
end;
$$;

-- 5. Create updated_at and immutable triggers
create trigger handle_clients_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();

create trigger enforce_clients_immutable
  before update on public.clients
  for each row execute function public.protect_clients_immutable();

create trigger handle_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

create trigger enforce_projects_immutable
  before update on public.projects
  for each row execute function public.protect_projects_immutable();

create trigger enforce_project_members_immutable
  before update on public.project_members
  for each row execute function public.protect_project_members_immutable();

-- 6. Enable RLS on all three tables
alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.project_members enable row level security;

-- 7. Create clients policies
create policy "Admins can read all clients" on public.clients
  for select to authenticated
  using ( public.is_active_admin(auth.uid()) );

create policy "Admins can insert clients" on public.clients
  for insert to authenticated
  with check ( public.is_active_admin(auth.uid()) and created_by = auth.uid() );

create policy "Admins can update clients" on public.clients
  for update to authenticated
  using ( public.is_active_admin(auth.uid()) )
  with check ( public.is_active_admin(auth.uid()) );

-- 8. Create project_members policies
create policy "Admins can read all project_members" on public.project_members
  for select to authenticated
  using ( public.is_active_admin(auth.uid()) );

create policy "Users can read own project membership" on public.project_members
  for select to authenticated
  using ( user_id = auth.uid() );

create policy "Admins can insert project_members" on public.project_members
  for insert to authenticated
  with check ( public.is_active_admin(auth.uid()) and added_by = auth.uid() );

create policy "Admins can update project_members" on public.project_members
  for update to authenticated
  using ( public.is_active_admin(auth.uid()) )
  with check ( public.is_active_admin(auth.uid()) );

create policy "Admins can delete project_members" on public.project_members
  for delete to authenticated
  using ( public.is_active_admin(auth.uid()) );

-- 9. Create projects policies last
create policy "Admins can read all projects" on public.projects
  for select to authenticated
  using ( public.is_active_admin(auth.uid()) );

create policy "Members can read own projects" on public.projects
  for select to authenticated
  using (
    exists (
      select 1
      from public.project_members pm
      where pm.project_id = projects.id
      and pm.user_id = auth.uid()
    )
  );

create policy "Admins can insert projects" on public.projects
  for insert to authenticated
  with check ( public.is_active_admin(auth.uid()) and created_by = auth.uid() );

create policy "Admins can update projects" on public.projects
  for update to authenticated
  using ( public.is_active_admin(auth.uid()) )
  with check ( public.is_active_admin(auth.uid()) );
