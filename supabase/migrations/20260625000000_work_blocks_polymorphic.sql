-- Migration: Add polymorphic support to work_blocks and work_sessions

-- 1. work_blocks
alter table public.work_blocks
  add column if not exists source_type text not null default 'legacy_assignment' 
  check (source_type in ('legacy_assignment', 'project_task')),
  add column if not exists project_task_id uuid references public.project_tasks(id) on delete set null;

alter table public.work_blocks
  drop constraint if exists work_blocks_source_check;
  
alter table public.work_blocks
  add constraint work_blocks_source_check 
  check (
    (source_type = 'legacy_assignment' and assignment_id is not null) or
    (source_type = 'project_task' and project_task_id is not null)
  );

-- 2. work_sessions
alter table public.work_sessions
  add column if not exists source_type text not null default 'legacy_assignment'
  check (source_type in ('legacy_assignment', 'project_task')),
  add column if not exists project_task_id uuid references public.project_tasks(id) on delete set null;

alter table public.work_sessions
  drop constraint if exists work_sessions_source_check;

alter table public.work_sessions
  add constraint work_sessions_source_check 
  check (
    -- Session assignment ID is technically nullable anyway, but if it has a source, it shouldn't conflict
    (source_type = 'legacy_assignment') or
    (source_type = 'project_task')
  );
