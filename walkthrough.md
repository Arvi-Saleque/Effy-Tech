# EffyOps V2 Phase 3 — Project Management Walkthrough (V3)

This document outlines the final testing steps to verify the V3 implementation locally. 
Because the new RPC migration (`create_project_with_members_v1.sql`) was NOT applied remotely, runtime testing of project creation will fail until the migration is explicitly applied to your Supabase instance. 

## Preparation
1. Start your server with `npm run dev`.
2. Ensure you have your admin credentials.
3. **Important:** Run the new migration file against your Supabase database before testing project creation, as `createProject()` now strictly relies on the `.rpc("create_project_with_members_v1")` method to execute transactionally.

## Test 1: Verify the "All" Filter Includes Archived Projects
1. Navigate to `http://localhost:3000/admin/projects`.
2. Notice the "Current" projects count and the list showing Planning, Active, and On Hold statuses.
3. In the filters bar, change the Status dropdown from "Current" to "All Statuses".
4. Verify that Archived projects now appear in the list.
5. In the filters bar, select "Archived". Verify that only Archived projects appear.

## Test 2: Verify Mobile Layout
1. Open Developer Tools (F12) and toggle device emulation to a mobile device (e.g., iPhone 14).
2. Navigate to `http://localhost:3000/admin/projects`.
3. Verify that the table disappears and is replaced by card-based mobile UI.
4. Verify the cards display the Priority, Due Date, Members count, Updated date, and Progress bar.

## Test 3: Create a Project (Atomic RPC Workflow)
*(Requires the SQL migration to be applied to your Supabase instance)*
1. Navigate to `http://localhost:3000/admin/projects/new`.
2. Select an active client.
3. Fill out the project details and add another valid member.
4. Submit the form. The RPC will atomically validate the payload and insert both the project and your ownership record in a single transaction.
5. Verify you are redirected correctly, and the project exists with you as an owner.

## Test 4: Rollback Behavior (Simulated Failure)
*(Requires the SQL migration to be applied to your Supabase instance)*
1. Navigate to create a new project.
2. Select a client, fill out details.
3. Forcing a failure via UI is difficult since the UI shields against most invalid states, but if a payload bypasses the UI (e.g., via direct API invocation) with an invalid `priority` or a non-existent `user_id`, the RPC will automatically `RAISE EXCEPTION`.
4. Verify that **no orphan project** is created when this exception fires.

## Test 5: Safe Member Validation
1. Open an existing project.
2. Attempt to Demote yourself from "owner" to another role, or remove yourself, when you are the ONLY owner.
3. The server action (`updateProjectMemberRole` / `removeProjectMember`) will instantly reject the request using the new Zod schemas (`projectMembershipIdSchema`, `projectRoleSchema`) and logical owner checks.

## Test 6: Archive Confirmation Flow
1. Navigate to a newly created or existing "active" or "on_hold" project.
2. Under "Actions", click "Archive".
3. A modal appears warning you that the project is active/on_hold and asks "Are you sure?".
4. Click "Cancel".
5. Click "Archive" again. This time click "Force Archive".
6. The project is archived.
7. For a "planning" project, clicking "Archive" will show the default, less severe warning and requires only "Confirm Archive".

## Test 7: Verify Cancelled Counting & Planning "Complete"
1. Return to the Dashboard (`/admin/dashboard`) or Projects (`/admin/projects`).
2. Verify the "Cancelled" summary card displays accurate counts.
3. Open a "planning" project. Verify that there is now a "Complete" button available among the actions, next to "Activate" and "Hold".
