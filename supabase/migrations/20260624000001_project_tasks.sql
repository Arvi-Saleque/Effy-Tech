-- 1. Create tables
CREATE TABLE public.project_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id),
    title TEXT NOT NULL CHECK (length(trim(title)) >= 1 AND length(trim(title)) <= 250),
    description TEXT CHECK (description IS NULL OR length(trim(description)) <= 10000),
    status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('backlog', 'todo', 'in_progress', 'blocked', 'review', 'done', 'cancelled', 'archived')),
    priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    start_date DATE,
    due_date DATE,
    estimated_minutes INTEGER CHECK (estimated_minutes IS NULL OR (estimated_minutes >= 0 AND estimated_minutes <= 100000)),
    progress_percent INTEGER NOT NULL DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
    created_by UUID NOT NULL REFERENCES public.admin_profiles(id),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT valid_dates CHECK (start_date IS NULL OR due_date IS NULL OR due_date >= start_date)
);

CREATE TABLE public.project_subtasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES public.project_tasks(id),
    title TEXT NOT NULL CHECK (length(trim(title)) >= 1 AND length(trim(title)) <= 250),
    description TEXT CHECK (description IS NULL OR length(trim(description)) <= 10000),
    status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'blocked', 'review', 'done', 'cancelled', 'archived')),
    priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    due_date DATE,
    estimated_minutes INTEGER CHECK (estimated_minutes IS NULL OR (estimated_minutes >= 0 AND estimated_minutes <= 100000)),
    progress_percent INTEGER NOT NULL DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
    created_by UUID NOT NULL REFERENCES public.admin_profiles(id),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.task_assignees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES public.project_tasks(id),
    user_id UUID NOT NULL REFERENCES public.admin_profiles(id),
    assigned_by UUID NOT NULL REFERENCES public.admin_profiles(id),
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT task_assignees_task_id_user_id_key UNIQUE (task_id, user_id)
);

CREATE TABLE public.subtask_assignees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subtask_id UUID NOT NULL REFERENCES public.project_subtasks(id),
    user_id UUID NOT NULL REFERENCES public.admin_profiles(id),
    assigned_by UUID NOT NULL REFERENCES public.admin_profiles(id),
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT subtask_assignees_subtask_id_user_id_key UNIQUE (subtask_id, user_id)
);

-- Indexes for performance
CREATE INDEX idx_project_tasks_project_id ON public.project_tasks(project_id);
CREATE INDEX idx_project_tasks_status ON public.project_tasks(status);
CREATE INDEX idx_project_tasks_due_date ON public.project_tasks(due_date);
CREATE INDEX idx_project_subtasks_task_id ON public.project_subtasks(task_id);
CREATE INDEX idx_task_assignees_task_id ON public.task_assignees(task_id);
CREATE INDEX idx_task_assignees_user_id ON public.task_assignees(user_id);
CREATE INDEX idx_subtask_assignees_subtask_id ON public.subtask_assignees(subtask_id);
CREATE INDEX idx_subtask_assignees_user_id ON public.subtask_assignees(user_id);

-- 2. Audit and updated_at triggers
CREATE TRIGGER set_project_tasks_updated_at
    BEFORE UPDATE ON public.project_tasks
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_project_subtasks_updated_at
    BEFORE UPDATE ON public.project_subtasks
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- Immutable field protection
CREATE OR REPLACE FUNCTION public.trigger_protect_task_audit_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
    NEW.id = OLD.id;
    NEW.created_by = OLD.created_by;
    NEW.created_at = OLD.created_at;

    IF NEW.status = 'done' AND OLD.status <> 'done' THEN
        NEW.completed_at = now();
    ELSIF NEW.status <> 'done' AND OLD.status = 'done' THEN
        NEW.completed_at = NULL;
    ELSIF NEW.status = OLD.status AND NEW.completed_at IS DISTINCT FROM OLD.completed_at THEN
        NEW.completed_at = OLD.completed_at;
    END IF;

    RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.trigger_protect_task_audit_fields FROM PUBLIC, anon;

CREATE TRIGGER protect_project_tasks_audit
    BEFORE UPDATE ON public.project_tasks
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_protect_task_audit_fields();

CREATE OR REPLACE FUNCTION public.trigger_protect_subtask_audit_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
    NEW.id = OLD.id;
    NEW.created_by = OLD.created_by;
    NEW.created_at = OLD.created_at;

    IF NEW.status = 'done' AND OLD.status <> 'done' THEN
        NEW.completed_at = now();
    ELSIF NEW.status <> 'done' AND OLD.status = 'done' THEN
        NEW.completed_at = NULL;
    ELSIF NEW.status = OLD.status AND NEW.completed_at IS DISTINCT FROM OLD.completed_at THEN
        NEW.completed_at = OLD.completed_at;
    END IF;

    RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.trigger_protect_subtask_audit_fields FROM PUBLIC, anon;

CREATE TRIGGER protect_project_subtasks_audit
    BEFORE UPDATE ON public.project_subtasks
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_protect_subtask_audit_fields();

CREATE OR REPLACE FUNCTION public.trigger_protect_task_assignee_audit_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
    NEW.id = OLD.id;
    NEW.task_id = OLD.task_id;
    NEW.user_id = OLD.user_id;
    NEW.assigned_by = OLD.assigned_by;
    NEW.assigned_at = OLD.assigned_at;
    RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.trigger_protect_task_assignee_audit_fields FROM PUBLIC, anon;

CREATE TRIGGER protect_task_assignees_audit
    BEFORE UPDATE ON public.task_assignees
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_protect_task_assignee_audit_fields();

CREATE OR REPLACE FUNCTION public.trigger_protect_subtask_assignee_audit_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
    NEW.id = OLD.id;
    NEW.subtask_id = OLD.subtask_id;
    NEW.user_id = OLD.user_id;
    NEW.assigned_by = OLD.assigned_by;
    NEW.assigned_at = OLD.assigned_at;
    RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.trigger_protect_subtask_assignee_audit_fields FROM PUBLIC, anon;

CREATE TRIGGER protect_subtask_assignees_audit
    BEFORE UPDATE ON public.subtask_assignees
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_protect_subtask_assignee_audit_fields();

-- 3. Progress Recalculation Functions (Hardened)
CREATE OR REPLACE FUNCTION public.recalculate_task_progress_v1(p_task_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
    v_total_subtasks INT;
    v_avg_progress INT;
    v_task_status TEXT;
    v_current_progress INT;
BEGIN
    SELECT status, progress_percent INTO v_task_status, v_current_progress
    FROM public.project_tasks WHERE id = p_task_id;
    
    IF NOT FOUND THEN RETURN; END IF;

    -- done task progress must remain 100, cancelled/archived should not be modified automatically here.
    IF v_task_status IN ('done', 'cancelled', 'archived') THEN RETURN; END IF;

    SELECT COUNT(*), COALESCE(ROUND(AVG(
        CASE 
            WHEN status = 'done' THEN 100 
            ELSE progress_percent 
        END
    )), 0)
    INTO v_total_subtasks, v_avg_progress
    FROM public.project_subtasks
    WHERE task_id = p_task_id AND status NOT IN ('cancelled', 'archived');

    IF v_total_subtasks > 0 THEN
        UPDATE public.project_tasks
        SET progress_percent = v_avg_progress
        WHERE id = p_task_id AND progress_percent IS DISTINCT FROM v_avg_progress;
    END IF;
END;
$$;
REVOKE ALL ON FUNCTION public.recalculate_task_progress_v1(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.recalculate_task_progress_v1(UUID) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.recalculate_project_progress_v1(p_project_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
    v_total_tasks INT;
    v_avg_progress INT;
    v_project_status TEXT;
BEGIN
    SELECT status INTO v_project_status
    FROM public.projects WHERE id = p_project_id;
    
    IF NOT FOUND THEN RETURN; END IF;

    -- completed project must not be reduced by later task trigger updates
    IF v_project_status IN ('completed', 'cancelled', 'archived') THEN RETURN; END IF;

    SELECT COUNT(*), COALESCE(ROUND(AVG(
        CASE 
            WHEN status = 'done' THEN 100 
            ELSE progress_percent 
        END
    )), 0)
    INTO v_total_tasks, v_avg_progress
    FROM public.project_tasks
    WHERE project_id = p_project_id AND status NOT IN ('cancelled', 'archived');

    IF v_total_tasks > 0 THEN
        UPDATE public.projects
        SET progress_percent = v_avg_progress
        WHERE id = p_project_id AND progress_percent IS DISTINCT FROM v_avg_progress;
    ELSE
        UPDATE public.projects
        SET progress_percent = 0
        WHERE id = p_project_id AND progress_percent IS DISTINCT FROM 0;
    END IF;
END;
$$;
REVOKE ALL ON FUNCTION public.recalculate_project_progress_v1(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.recalculate_project_progress_v1(UUID) TO authenticated, service_role;

-- Triggers to auto-recalculate progress
CREATE OR REPLACE FUNCTION public.trigger_recalculate_task_progress()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        PERFORM public.recalculate_task_progress_v1(OLD.task_id);
        RETURN OLD;
    ELSE
        PERFORM public.recalculate_task_progress_v1(NEW.task_id);
        RETURN NEW;
    END IF;
END;
$$;
REVOKE ALL ON FUNCTION public.trigger_recalculate_task_progress FROM PUBLIC, anon;

CREATE TRIGGER on_subtask_change_recalc_task_progress
    AFTER INSERT OR UPDATE OR DELETE ON public.project_subtasks
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_recalculate_task_progress();

CREATE OR REPLACE FUNCTION public.trigger_recalculate_project_progress()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        PERFORM public.recalculate_project_progress_v1(OLD.project_id);
        RETURN OLD;
    ELSE
        PERFORM public.recalculate_project_progress_v1(NEW.project_id);
        RETURN NEW;
    END IF;
END;
$$;
REVOKE ALL ON FUNCTION public.trigger_recalculate_project_progress FROM PUBLIC, anon;

CREATE TRIGGER on_task_change_recalc_project_progress
    AFTER INSERT OR UPDATE OR DELETE ON public.project_tasks
    FOR EACH ROW
    EXECUTE FUNCTION public.trigger_recalculate_project_progress();


-- 4. RLS Setup (No Physical Delete for Tasks/Subtasks)
ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_subtasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_assignees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subtask_assignees ENABLE ROW LEVEL SECURITY;

-- project_tasks policies
CREATE POLICY "Admins can select tasks" ON public.project_tasks FOR SELECT TO authenticated USING (public.is_active_admin());
CREATE POLICY "Admins can insert tasks" ON public.project_tasks FOR INSERT TO authenticated WITH CHECK (public.is_active_admin());
CREATE POLICY "Admins can update tasks" ON public.project_tasks FOR UPDATE TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

CREATE POLICY "Members can view tasks" ON public.project_tasks FOR SELECT TO authenticated USING (
    EXISTS (
        SELECT 1 FROM public.project_members
        WHERE project_id = project_tasks.project_id
        AND user_id = auth.uid()
    )
);

-- project_subtasks policies
CREATE POLICY "Admins can select subtasks" ON public.project_subtasks FOR SELECT TO authenticated USING (public.is_active_admin());
CREATE POLICY "Admins can insert subtasks" ON public.project_subtasks FOR INSERT TO authenticated WITH CHECK (public.is_active_admin());
CREATE POLICY "Admins can update subtasks" ON public.project_subtasks FOR UPDATE TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());

CREATE POLICY "Members can view subtasks" ON public.project_subtasks FOR SELECT TO authenticated USING (
    EXISTS (
        SELECT 1 FROM public.project_tasks t
        JOIN public.project_members pm ON t.project_id = pm.project_id
        WHERE t.id = project_subtasks.task_id
        AND pm.user_id = auth.uid()
    )
);

-- task_assignees policies (Delete allowed for unassigning)
CREATE POLICY "Admins can manage task_assignees" ON public.task_assignees FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());
CREATE POLICY "Members can view task_assignees" ON public.task_assignees FOR SELECT TO authenticated USING (
    EXISTS (
        SELECT 1 FROM public.project_tasks t
        JOIN public.project_members pm ON t.project_id = pm.project_id
        WHERE t.id = task_assignees.task_id
        AND pm.user_id = auth.uid()
    )
);

-- subtask_assignees policies (Delete allowed for unassigning)
CREATE POLICY "Admins can manage subtask_assignees" ON public.subtask_assignees FOR ALL TO authenticated USING (public.is_active_admin()) WITH CHECK (public.is_active_admin());
CREATE POLICY "Members can view subtask_assignees" ON public.subtask_assignees FOR SELECT TO authenticated USING (
    EXISTS (
        SELECT 1 FROM public.project_subtasks st
        JOIN public.project_tasks t ON st.task_id = t.id
        JOIN public.project_members pm ON t.project_id = pm.project_id
        WHERE st.id = subtask_assignees.subtask_id
        AND pm.user_id = auth.uid()
    )
);

-- 5. RPCs for transactional creation & reordering
CREATE OR REPLACE FUNCTION public.create_task_with_assignees_v1(
    p_project_id UUID,
    p_title TEXT,
    p_description TEXT,
    p_status TEXT,
    p_priority TEXT,
    p_start_date DATE,
    p_due_date DATE,
    p_estimated_minutes INTEGER,
    p_progress_percent INTEGER,
    p_sort_order INTEGER,
    p_assignee_ids JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
    v_task_id UUID;
    v_creator UUID;
    v_project_status TEXT;
    v_active_member_count INT;
BEGIN
    v_creator := auth.uid();
    IF v_creator IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
    IF NOT public.is_active_admin() THEN RAISE EXCEPTION 'Permission denied'; END IF;

    -- Validate Project
    SELECT status INTO v_project_status FROM public.projects WHERE id = p_project_id;
    IF NOT FOUND THEN RAISE EXCEPTION 'Project not found'; END IF;
    IF v_project_status IN ('archived', 'cancelled', 'completed') THEN 
        RAISE EXCEPTION 'Cannot add tasks to archived, cancelled, or completed projects'; 
    END IF;

    -- Validate Task Input
    IF trim(p_title) = '' OR length(trim(p_title)) > 250 THEN RAISE EXCEPTION 'Invalid title'; END IF;
    IF p_description IS NOT NULL AND length(trim(p_description)) > 10000 THEN RAISE EXCEPTION 'Description too long'; END IF;
    IF p_status NOT IN ('backlog', 'todo', 'in_progress', 'blocked') THEN RAISE EXCEPTION 'Invalid initial status'; END IF;
    IF p_priority NOT IN ('low', 'normal', 'high', 'urgent') THEN RAISE EXCEPTION 'Invalid priority'; END IF;
    IF p_progress_percent < 0 OR p_progress_percent > 100 THEN RAISE EXCEPTION 'Invalid progress'; END IF;
    IF p_estimated_minutes IS NOT NULL AND (p_estimated_minutes < 0 OR p_estimated_minutes > 100000) THEN RAISE EXCEPTION 'Invalid estimated minutes'; END IF;
    IF p_start_date IS NOT NULL AND p_due_date IS NOT NULL AND p_due_date < p_start_date THEN RAISE EXCEPTION 'Due date cannot be before start date'; END IF;
    IF p_sort_order < 0 THEN RAISE EXCEPTION 'Sort order must be zero or greater'; END IF;

    -- Validate Assignees array
    IF p_assignee_ids IS NOT NULL THEN
        IF jsonb_typeof(p_assignee_ids) <> 'array' THEN
            RAISE EXCEPTION 'Assignees must be a JSON array';
        END IF;

        IF jsonb_array_length(p_assignee_ids) > 0 THEN
            SELECT COUNT(*) INTO v_active_member_count
            FROM public.project_members pm
            JOIN public.admin_profiles ap ON pm.user_id = ap.id
            WHERE pm.project_id = p_project_id
            AND ap.is_active = true
            AND pm.user_id IN (SELECT DISTINCT jsonb_array_elements_text(p_assignee_ids)::UUID);

            IF v_active_member_count <> (SELECT COUNT(DISTINCT jsonb_array_elements_text(p_assignee_ids))) THEN
                RAISE EXCEPTION 'One or more assignees are invalid or not active project members';
            END IF;
        END IF;
    END IF;

    -- Insert task
    INSERT INTO public.project_tasks (
        project_id, title, description, status, priority, 
        start_date, due_date, estimated_minutes, progress_percent, 
        sort_order, created_by
    ) VALUES (
        p_project_id, trim(p_title), p_description, p_status, p_priority, 
        p_start_date, p_due_date, p_estimated_minutes, p_progress_percent, 
        p_sort_order, v_creator
    ) RETURNING id INTO v_task_id;

    -- Insert assignees (safely deduplicated)
    IF p_assignee_ids IS NOT NULL AND jsonb_array_length(p_assignee_ids) > 0 THEN
        INSERT INTO public.task_assignees (task_id, user_id, assigned_by)
        SELECT DISTINCT v_task_id, x.val::UUID, v_creator
        FROM jsonb_array_elements_text(p_assignee_ids) AS x(val);
    END IF;

    RETURN v_task_id;
END;
$$;

REVOKE ALL ON FUNCTION public.create_task_with_assignees_v1(UUID, TEXT, TEXT, TEXT, TEXT, DATE, DATE, INTEGER, INTEGER, INTEGER, JSONB) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.create_task_with_assignees_v1(UUID, TEXT, TEXT, TEXT, TEXT, DATE, DATE, INTEGER, INTEGER, INTEGER, JSONB) TO authenticated, service_role;


CREATE OR REPLACE FUNCTION public.create_subtask_with_assignees_v1(
    p_task_id UUID,
    p_title TEXT,
    p_description TEXT,
    p_status TEXT,
    p_priority TEXT,
    p_due_date DATE,
    p_estimated_minutes INTEGER,
    p_progress_percent INTEGER,
    p_sort_order INTEGER,
    p_assignee_ids JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
    v_subtask_id UUID;
    v_project_id UUID;
    v_creator UUID;
    v_task_status TEXT;
    v_project_status TEXT;
    v_active_member_count INT;
BEGIN
    v_creator := auth.uid();
    IF v_creator IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
    IF NOT public.is_active_admin() THEN RAISE EXCEPTION 'Permission denied'; END IF;

    -- Validate Task and Project
    SELECT project_id, status INTO v_project_id, v_task_status FROM public.project_tasks WHERE id = p_task_id;
    IF NOT FOUND THEN RAISE EXCEPTION 'Task not found'; END IF;
    IF v_task_status IN ('archived', 'cancelled', 'done') THEN 
        RAISE EXCEPTION 'Cannot add subtasks to archived, cancelled, or done tasks'; 
    END IF;

    SELECT status INTO v_project_status FROM public.projects WHERE id = v_project_id;
    IF v_project_status IN ('archived', 'cancelled', 'completed') THEN 
        RAISE EXCEPTION 'Project is not mutable'; 
    END IF;

    -- Validate Subtask Input
    IF trim(p_title) = '' OR length(trim(p_title)) > 250 THEN RAISE EXCEPTION 'Invalid title'; END IF;
    IF p_description IS NOT NULL AND length(trim(p_description)) > 10000 THEN RAISE EXCEPTION 'Description too long'; END IF;
    IF p_status NOT IN ('todo', 'in_progress', 'blocked') THEN RAISE EXCEPTION 'Invalid initial status'; END IF;
    IF p_priority NOT IN ('low', 'normal', 'high', 'urgent') THEN RAISE EXCEPTION 'Invalid priority'; END IF;
    IF p_progress_percent < 0 OR p_progress_percent > 100 THEN RAISE EXCEPTION 'Invalid progress'; END IF;
    IF p_estimated_minutes IS NOT NULL AND (p_estimated_minutes < 0 OR p_estimated_minutes > 100000) THEN RAISE EXCEPTION 'Invalid estimated minutes'; END IF;
    IF p_sort_order < 0 THEN RAISE EXCEPTION 'Sort order must be zero or greater'; END IF;

    -- Validate Assignees array
    IF p_assignee_ids IS NOT NULL THEN
        IF jsonb_typeof(p_assignee_ids) <> 'array' THEN
            RAISE EXCEPTION 'Assignees must be a JSON array';
        END IF;

        IF jsonb_array_length(p_assignee_ids) > 0 THEN
            SELECT COUNT(*) INTO v_active_member_count
            FROM public.project_members pm
            JOIN public.admin_profiles ap ON pm.user_id = ap.id
            WHERE pm.project_id = v_project_id
            AND ap.is_active = true
            AND pm.user_id IN (SELECT DISTINCT jsonb_array_elements_text(p_assignee_ids)::UUID);

            IF v_active_member_count <> (SELECT COUNT(DISTINCT jsonb_array_elements_text(p_assignee_ids))) THEN
                RAISE EXCEPTION 'One or more assignees are invalid or not active project members';
            END IF;
        END IF;
    END IF;

    -- Insert subtask
    INSERT INTO public.project_subtasks (
        task_id, title, description, status, priority, 
        due_date, estimated_minutes, progress_percent, 
        sort_order, created_by
    ) VALUES (
        p_task_id, trim(p_title), p_description, p_status, p_priority, 
        p_due_date, p_estimated_minutes, p_progress_percent, 
        p_sort_order, v_creator
    ) RETURNING id INTO v_subtask_id;

    -- Insert assignees
    IF p_assignee_ids IS NOT NULL AND jsonb_array_length(p_assignee_ids) > 0 THEN
        INSERT INTO public.subtask_assignees (subtask_id, user_id, assigned_by)
        SELECT DISTINCT v_subtask_id, x.val::UUID, v_creator
        FROM jsonb_array_elements_text(p_assignee_ids) AS x(val);
    END IF;

    RETURN v_subtask_id;
END;
$$;
REVOKE ALL ON FUNCTION public.create_subtask_with_assignees_v1(UUID, TEXT, TEXT, TEXT, TEXT, DATE, INTEGER, INTEGER, INTEGER, JSONB) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.create_subtask_with_assignees_v1(UUID, TEXT, TEXT, TEXT, TEXT, DATE, INTEGER, INTEGER, INTEGER, JSONB) TO authenticated, service_role;


CREATE OR REPLACE FUNCTION public.reorder_project_tasks_v1(
    p_project_id UUID,
    p_ordered_task_ids JSONB
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
    v_task_id UUID;
    v_idx INT;
    v_count INT;
    v_project_status TEXT;
BEGIN
    IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
    IF NOT public.is_active_admin() THEN RAISE EXCEPTION 'Permission denied'; END IF;

    SELECT status INTO v_project_status FROM public.projects WHERE id = p_project_id;
    IF NOT FOUND THEN RAISE EXCEPTION 'Project not found'; END IF;
    IF v_project_status IN ('completed', 'cancelled', 'archived') THEN 
        RAISE EXCEPTION 'Project is not mutable'; 
    END IF;

    IF p_ordered_task_ids IS NULL THEN
        RAISE EXCEPTION 'Ordered task IDs array cannot be null';
    END IF;

    IF jsonb_typeof(p_ordered_task_ids) <> 'array' THEN
        RAISE EXCEPTION 'Ordered task IDs must be a JSON array';
    END IF;

    IF jsonb_array_length(p_ordered_task_ids) = 0 THEN
        RETURN;
    END IF;

    SELECT COUNT(DISTINCT val) INTO v_count FROM jsonb_array_elements_text(p_ordered_task_ids) AS val;
    IF v_count <> jsonb_array_length(p_ordered_task_ids) THEN
        RAISE EXCEPTION 'Duplicate IDs in order array';
    END IF;

    v_idx := 0;
    FOR v_task_id IN SELECT x.val::UUID FROM jsonb_array_elements_text(p_ordered_task_ids) AS x(val)
    LOOP
        UPDATE public.project_tasks
        SET sort_order = v_idx, updated_at = now()
        WHERE id = v_task_id AND project_id = p_project_id AND status NOT IN ('archived');
        
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Task not found, belongs to another project, or is archived';
        END IF;
        v_idx := v_idx + 1;
    END LOOP;
END;
$$;
REVOKE ALL ON FUNCTION public.reorder_project_tasks_v1(UUID, JSONB) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.reorder_project_tasks_v1(UUID, JSONB) TO authenticated, service_role;


CREATE OR REPLACE FUNCTION public.reorder_project_subtasks_v1(
    p_task_id UUID,
    p_ordered_subtask_ids JSONB
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
    v_subtask_id UUID;
    v_idx INT;
    v_count INT;
    v_task_status TEXT;
    v_project_id UUID;
    v_project_status TEXT;
BEGIN
    IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
    IF NOT public.is_active_admin() THEN RAISE EXCEPTION 'Permission denied'; END IF;

    SELECT project_id, status INTO v_project_id, v_task_status FROM public.project_tasks WHERE id = p_task_id;
    IF NOT FOUND THEN RAISE EXCEPTION 'Task not found'; END IF;
    IF v_task_status IN ('done', 'cancelled', 'archived') THEN 
        RAISE EXCEPTION 'Task is not mutable'; 
    END IF;

    SELECT status INTO v_project_status FROM public.projects WHERE id = v_project_id;
    IF v_project_status IN ('completed', 'cancelled', 'archived') THEN 
        RAISE EXCEPTION 'Project is not mutable'; 
    END IF;

    IF p_ordered_subtask_ids IS NULL THEN
        RAISE EXCEPTION 'Ordered subtask IDs array cannot be null';
    END IF;

    IF jsonb_typeof(p_ordered_subtask_ids) <> 'array' THEN
        RAISE EXCEPTION 'Ordered subtask IDs must be a JSON array';
    END IF;

    IF jsonb_array_length(p_ordered_subtask_ids) = 0 THEN
        RETURN;
    END IF;

    SELECT COUNT(DISTINCT val) INTO v_count FROM jsonb_array_elements_text(p_ordered_subtask_ids) AS val;
    IF v_count <> jsonb_array_length(p_ordered_subtask_ids) THEN
        RAISE EXCEPTION 'Duplicate IDs in order array';
    END IF;

    v_idx := 0;
    FOR v_subtask_id IN SELECT x.val::UUID FROM jsonb_array_elements_text(p_ordered_subtask_ids) AS x(val)
    LOOP
        UPDATE public.project_subtasks
        SET sort_order = v_idx, updated_at = now()
        WHERE id = v_subtask_id AND task_id = p_task_id AND status NOT IN ('archived');
        
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Subtask not found, belongs to another task, or is archived';
        END IF;
        v_idx := v_idx + 1;
    END LOOP;
END;
$$;
REVOKE ALL ON FUNCTION public.reorder_project_subtasks_v1(UUID, JSONB) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.reorder_project_subtasks_v1(UUID, JSONB) TO authenticated, service_role;
