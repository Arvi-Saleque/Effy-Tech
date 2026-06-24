-- Transactional RPC to create a project and its initial members atomically
-- Requires an active admin to execute. Returns the new project ID.
-- Includes full internal validation and deduplication to prevent invalid data or orphaned projects.

CREATE OR REPLACE FUNCTION public.create_project_with_members_v1(
  p_client_id UUID,
  p_name TEXT,
  p_description TEXT,
  p_priority TEXT,
  p_start_date DATE,
  p_due_date DATE,
  p_progress_percent INT,
  p_status TEXT,
  p_members JSONB -- array of objects: { user_id: uuid, project_role: text }
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
  v_admin_profile RECORD;
  v_client_status TEXT;
  v_project_id UUID;
  v_member RECORD;
  v_trimmed_name TEXT;
  v_creator_id UUID;
  v_seen_users UUID[];
  v_target_admin RECORD;
  v_has_owner BOOLEAN := false;
BEGIN
  v_creator_id := auth.uid();
  IF v_creator_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  -- 1. Ensure the calling user is an active admin
  SELECT id, role, is_active INTO v_admin_profile
  FROM public.admin_profiles
  WHERE id = v_creator_id;

  IF NOT FOUND OR v_admin_profile.role != 'admin' OR v_admin_profile.is_active != true THEN
    RAISE EXCEPTION 'Unauthorized: Active admin required';
  END IF;

  -- 2. Validate Client
  SELECT status INTO v_client_status
  FROM public.clients
  WHERE id = p_client_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Client not found';
  END IF;
  
  IF v_client_status = 'archived' THEN
    RAISE EXCEPTION 'Cannot add project to an archived client';
  END IF;

  -- 3. Validate Project Inputs
  v_trimmed_name := trim(p_name);
  IF v_trimmed_name IS NULL OR length(v_trimmed_name) = 0 THEN
    RAISE EXCEPTION 'Project name cannot be empty';
  END IF;
  IF length(v_trimmed_name) > 200 THEN
    RAISE EXCEPTION 'Project name exceeds 200 characters';
  END IF;
  IF p_description IS NOT NULL AND length(p_description) > 10000 THEN
    RAISE EXCEPTION 'Project description exceeds 10000 characters';
  END IF;
  IF p_status NOT IN ('planning', 'active', 'on_hold') THEN
    RAISE EXCEPTION 'Invalid project status';
  END IF;
  IF p_priority NOT IN ('low', 'normal', 'high', 'urgent') THEN
    RAISE EXCEPTION 'Invalid project priority';
  END IF;
  IF p_progress_percent IS NULL OR p_progress_percent < 0 OR p_progress_percent > 100 THEN
    RAISE EXCEPTION 'Progress must be between 0 and 100';
  END IF;
  IF p_start_date IS NOT NULL AND p_due_date IS NOT NULL AND p_due_date < p_start_date THEN
    RAISE EXCEPTION 'Due date cannot be earlier than start date';
  END IF;

  -- 4. Validate Members Array
  IF jsonb_typeof(p_members) != 'array' THEN
    RAISE EXCEPTION 'Members must be a JSON array';
  END IF;

  -- 5. Insert the project
  INSERT INTO public.projects (
    client_id, name, description, priority, start_date, due_date, progress_percent, status, created_by
  ) VALUES (
    p_client_id, v_trimmed_name, p_description, p_priority, p_start_date, p_due_date, p_progress_percent, p_status, v_creator_id
  ) RETURNING id INTO v_project_id;

  -- 6. Process and Insert Members
  -- The creator is ALWAYS an owner, process them first.
  INSERT INTO public.project_members (project_id, user_id, project_role, added_by)
  VALUES (v_project_id, v_creator_id, 'owner', v_creator_id);
  
  v_seen_users := ARRAY[v_creator_id];
  v_has_owner := true;

  FOR v_member IN SELECT * FROM jsonb_to_recordset(p_members) AS x(user_id UUID, project_role TEXT)
  LOOP
    -- Skip if already processed (this handles deduplication and creator override)
    IF v_member.user_id = ANY(v_seen_users) THEN
      CONTINUE;
    END IF;

    -- Validate role
    IF v_member.project_role NOT IN ('owner', 'manager', 'member', 'reviewer') THEN
      RAISE EXCEPTION 'Invalid member role';
    END IF;

    -- Validate target admin profile
    SELECT id, is_active INTO v_target_admin
    FROM public.admin_profiles
    WHERE id = v_member.user_id;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'One or more selected members do not exist';
    END IF;

    IF v_target_admin.is_active != true THEN
      RAISE EXCEPTION 'Cannot assign an inactive admin to the project';
    END IF;

    -- Insert valid member
    INSERT INTO public.project_members (project_id, user_id, project_role, added_by)
    VALUES (v_project_id, v_member.user_id, v_member.project_role, v_creator_id);

    v_seen_users := array_append(v_seen_users, v_member.user_id);
    IF v_member.project_role = 'owner' THEN
      v_has_owner := true;
    END IF;
  END LOOP;

  -- Final owner check (redundant since creator is forced, but good safety)
  IF NOT v_has_owner THEN
    RAISE EXCEPTION 'Project must have at least one owner';
  END IF;

  RETURN v_project_id;
END;
$$;

-- Secure access
REVOKE ALL ON FUNCTION public.create_project_with_members_v1(
  uuid,
  text,
  text,
  text,
  date,
  date,
  integer,
  text,
  jsonb
) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.create_project_with_members_v1(
  uuid,
  text,
  text,
  text,
  date,
  date,
  integer,
  text,
  jsonb
) TO authenticated;
