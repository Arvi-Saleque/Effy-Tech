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
    
    CONSTRAINT valid_report_dates CHECK (submitted_date >= actual_start_date)
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

-- Admins can do anything
CREATE POLICY "Admins can manage reports" ON public.task_work_reports 
    FOR ALL TO authenticated 
    USING (public.is_active_admin(auth.uid())) 
    WITH CHECK (public.is_active_admin(auth.uid()));

-- Members can view reports for tasks in their projects
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

-- Assignees can insert reports for their tasks
CREATE POLICY "Assignees can insert reports" ON public.task_work_reports 
    FOR INSERT TO authenticated 
    WITH CHECK (
        submitted_by = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.task_assignees a 
            WHERE a.task_id = task_work_reports.task_id 
            AND a.user_id = auth.uid()
        )
    );

-- Submitter can update their own unapproved reports (e.g. fixing typos before review)
CREATE POLICY "Submitter can update unapproved reports" ON public.task_work_reports 
    FOR UPDATE TO authenticated 
    USING (
        submitted_by = auth.uid() AND 
        completion_status IN ('submitted', 'revision_requested')
    )
    WITH CHECK (
        submitted_by = auth.uid() AND 
        completion_status IN ('submitted', 'revision_requested')
    );
