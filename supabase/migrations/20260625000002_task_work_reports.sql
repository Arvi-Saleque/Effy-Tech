-- Migration: Task Work Reports
-- Description: Creates the task_work_reports table with versioning and RLS for submitting work reports outside of the timer workflow.

CREATE TABLE public.task_work_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES public.project_tasks(id) ON DELETE RESTRICT,
    submitted_by UUID NOT NULL REFERENCES public.admin_profiles(id),
    actual_start_date DATE NOT NULL,
    submitted_date DATE NOT NULL,
    work_summary TEXT NOT NULL CHECK (length(trim(work_summary)) > 0),
    work_link TEXT,
    attachment_url TEXT,
    completion_status TEXT NOT NULL DEFAULT 'submitted' CHECK (completion_status IN ('submitted', 'approved', 'revision_requested', 'rejected')),
    note TEXT,
    
    -- Admin review fields
    reviewed_by UUID REFERENCES public.admin_profiles(id),
    reviewed_at TIMESTAMPTZ,
    review_note TEXT,
    
    -- Versioning
    version_number INTEGER NOT NULL DEFAULT 1 CHECK (version_number >= 1),
    supersedes_report_id UUID REFERENCES public.task_work_reports(id),
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    
    CONSTRAINT valid_report_dates CHECK (submitted_date >= actual_start_date),
    CONSTRAINT unique_task_report_version UNIQUE(task_id, submitted_by, version_number)
);

-- Indexes
CREATE INDEX idx_task_work_reports_task_id ON public.task_work_reports(task_id);
CREATE INDEX idx_task_work_reports_submitted_by ON public.task_work_reports(submitted_by);
CREATE INDEX idx_task_work_reports_submitted_date ON public.task_work_reports(submitted_date);
CREATE INDEX idx_task_work_reports_status ON public.task_work_reports(completion_status);

-- Triggers for updated_at
CREATE TRIGGER set_task_work_reports_updated_at
    BEFORE UPDATE ON public.task_work_reports
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- RLS
ALTER TABLE public.task_work_reports ENABLE ROW LEVEL SECURITY;

-- Admins: SELECT ONLY
CREATE POLICY "Admins can view reports" ON public.task_work_reports 
    FOR SELECT TO authenticated USING (public.is_active_admin(auth.uid()));

-- Members can view reports for tasks in their projects: SELECT ONLY
CREATE POLICY "Members can view project reports" ON public.task_work_reports 
    FOR SELECT TO authenticated 
    USING (
        EXISTS (
            SELECT 1 FROM public.project_tasks t
            JOIN public.project_members pm ON t.project_id = pm.project_id
            WHERE t.id = task_work_reports.task_id
            AND pm.user_id = auth.uid()
        )
    );

-- Notice: No INSERT, UPDATE, or DELETE policies exist for this table.
-- ALL mutations MUST be performed through the following RPCs.

-- ==========================================
-- RPCs
-- ==========================================

-- 1. UPDATE TASK WORK REPORT
CREATE OR REPLACE FUNCTION public.update_task_work_report(
    p_report_id UUID,
    p_actual_start_date DATE,
    p_submitted_date DATE,
    p_work_summary TEXT,
    p_work_link TEXT,
    p_note TEXT
)
RETURNS TABLE (
    task_id UUID,
    project_id UUID
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
    v_task_id UUID;
    v_project_id UUID;
    v_current_status TEXT;
    v_submitted_by UUID;
    v_uid UUID;
BEGIN
    v_uid := auth.uid();
    IF v_uid IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;

    IF p_submitted_date < p_actual_start_date THEN
        RAISE EXCEPTION 'Submitted date cannot be before actual start date';
    END IF;

    IF trim(p_work_summary) = '' OR p_work_summary IS NULL THEN
        RAISE EXCEPTION 'Work summary is required';
    END IF;

    -- Lock and resolve report
    SELECT r.task_id, r.completion_status, r.submitted_by, t.project_id
    INTO v_task_id, v_current_status, v_submitted_by, v_project_id
    FROM public.task_work_reports r
    JOIN public.project_tasks t ON r.task_id = t.id
    WHERE r.id = p_report_id
    FOR UPDATE OF r;

    IF NOT FOUND THEN RAISE EXCEPTION 'Report not found'; END IF;

    IF v_submitted_by != v_uid THEN RAISE EXCEPTION 'Not authorized to update this report'; END IF;
    -- ONLY allow update if it is in 'submitted' state
    IF v_current_status != 'submitted' THEN 
        RAISE EXCEPTION 'Report is already % and cannot be updated in-place. Resubmit instead.', v_current_status; 
    END IF;

    UPDATE public.task_work_reports
    SET actual_start_date = p_actual_start_date,
        submitted_date = p_submitted_date,
        work_summary = trim(p_work_summary),
        work_link = trim(p_work_link),
        note = trim(p_note),
        updated_at = now()
    WHERE id = p_report_id;

    RETURN QUERY SELECT v_task_id, v_project_id;
END;
$$;

REVOKE ALL ON FUNCTION public.update_task_work_report(UUID, DATE, DATE, TEXT, TEXT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.update_task_work_report(UUID, DATE, DATE, TEXT, TEXT, TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION public.update_task_work_report(UUID, DATE, DATE, TEXT, TEXT, TEXT) TO authenticated;

-- 2. REVIEW TASK WORK REPORT
CREATE OR REPLACE FUNCTION public.review_task_work_report(
    p_report_id UUID,
    p_review_action TEXT,
    p_review_note TEXT,
    p_mark_task_done BOOLEAN
) 
RETURNS TABLE (
    task_id UUID,
    project_id UUID
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
    v_task_id UUID;
    v_project_id UUID;
    v_current_status TEXT;
    v_uid UUID;
BEGIN
    v_uid := auth.uid();
    IF v_uid IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
    IF NOT public.is_active_admin(v_uid) THEN RAISE EXCEPTION 'Not authorized. Active admin required.'; END IF;

    IF p_review_action NOT IN ('approved', 'revision_requested', 'rejected') THEN RAISE EXCEPTION 'Invalid review action'; END IF;
    IF p_review_action = 'revision_requested' AND (p_review_note IS NULL OR trim(p_review_note) = '') THEN
        RAISE EXCEPTION 'Review note is required for revision requests';
    END IF;

    SELECT r.task_id, r.completion_status, t.project_id
    INTO v_task_id, v_current_status, v_project_id
    FROM public.task_work_reports r
    JOIN public.project_tasks t ON r.task_id = t.id
    WHERE r.id = p_report_id
    FOR UPDATE OF r;

    IF NOT FOUND THEN RAISE EXCEPTION 'Report not found'; END IF;
    IF v_current_status NOT IN ('submitted', 'revision_requested') THEN RAISE EXCEPTION 'Report is already % and cannot be reviewed again', v_current_status; END IF;

    UPDATE public.task_work_reports
    SET completion_status = p_review_action,
        reviewed_by = v_uid,
        reviewed_at = now(),
        review_note = p_review_note,
        updated_at = now()
    WHERE id = p_report_id;

    IF p_review_action = 'approved' AND p_mark_task_done THEN
        UPDATE public.project_tasks
        SET status = 'done',
            progress_percent = 100,
            completed_at = now(),
            updated_at = now()
        WHERE id = v_task_id AND status NOT IN ('archived', 'cancelled');
        
        IF NOT FOUND THEN
            -- Rollback is automatic on exception
            RAISE EXCEPTION 'Failed to mark task as done. Task may be archived, cancelled, or missing.';
        END IF;
    END IF;

    RETURN QUERY SELECT v_task_id, v_project_id;
END;
$$;

REVOKE ALL ON FUNCTION public.review_task_work_report(UUID, TEXT, TEXT, BOOLEAN) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.review_task_work_report(UUID, TEXT, TEXT, BOOLEAN) FROM anon;
GRANT EXECUTE ON FUNCTION public.review_task_work_report(UUID, TEXT, TEXT, BOOLEAN) TO authenticated;

-- 3. SUBMIT TASK WORK REPORT
CREATE OR REPLACE FUNCTION public.submit_task_work_report(
    p_task_id UUID,
    p_actual_start_date DATE,
    p_submitted_date DATE,
    p_work_summary TEXT,
    p_work_link TEXT,
    p_note TEXT
)
RETURNS TABLE (
    report_id UUID,
    task_id UUID,
    project_id UUID,
    version_number INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
    v_project_id UUID;
    v_task_status TEXT;
    v_uid UUID;
    v_supersedes_id UUID;
    v_version INTEGER := 1;
    v_new_report_id UUID;
    v_is_active BOOLEAN;
BEGIN
    v_uid := auth.uid();
    IF v_uid IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;

    -- Verify active admin profile
    SELECT is_active INTO v_is_active FROM public.admin_profiles WHERE id = v_uid;
    IF v_is_active IS NOT TRUE THEN RAISE EXCEPTION 'Submitting user profile is not active'; END IF;

    IF p_submitted_date < p_actual_start_date THEN RAISE EXCEPTION 'Submitted date cannot be before actual start date'; END IF;
    IF trim(p_work_summary) = '' OR p_work_summary IS NULL THEN RAISE EXCEPTION 'Work summary is required'; END IF;

    -- Verify assignment and task status
    SELECT t.project_id, t.status
    INTO v_project_id, v_task_status
    FROM public.project_tasks t
    JOIN public.task_assignees a ON t.id = a.task_id
    WHERE t.id = p_task_id AND a.user_id = v_uid;

    IF NOT FOUND THEN RAISE EXCEPTION 'Task not found or you are not assigned to it'; END IF;
    IF v_task_status IN ('archived', 'cancelled') THEN RAISE EXCEPTION 'Cannot submit report for archived or cancelled task'; END IF;

    -- Lock transaction for this specific user and task to prevent race conditions
    PERFORM pg_advisory_xact_lock(hashtext(p_task_id::text), hashtext(v_uid::text));

    -- Check existing reports and determine version safely
    SELECT id, completion_status, public.task_work_reports.version_number
    INTO v_supersedes_id, v_task_status, v_version
    FROM public.task_work_reports
    WHERE task_work_reports.task_id = p_task_id AND submitted_by = v_uid
    ORDER BY created_at DESC
    LIMIT 1;

    IF FOUND THEN
        IF v_task_status = 'approved' THEN
            RAISE EXCEPTION 'An approved report already exists for this task';
        ELSIF v_task_status = 'submitted' THEN
            RAISE EXCEPTION 'A report is currently submitted and awaiting review. Resubmission rejected.';
        END IF;
        -- Can resubmit if revision_requested or rejected
        v_version := v_version + 1;
    ELSE
        v_supersedes_id := NULL;
        v_version := 1;
    END IF;

    INSERT INTO public.task_work_reports (
        task_id, submitted_by, actual_start_date, submitted_date,
        work_summary, work_link, note, completion_status,
        version_number, supersedes_report_id
    ) VALUES (
        p_task_id, v_uid, p_actual_start_date, p_submitted_date,
        trim(p_work_summary), trim(p_work_link), trim(p_note), 'submitted',
        v_version, v_supersedes_id
    ) RETURNING id INTO v_new_report_id;

    RETURN QUERY SELECT v_new_report_id, p_task_id, v_project_id, v_version;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_task_work_report(UUID, DATE, DATE, TEXT, TEXT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.submit_task_work_report(UUID, DATE, DATE, TEXT, TEXT, TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION public.submit_task_work_report(UUID, DATE, DATE, TEXT, TEXT, TEXT) TO authenticated;
