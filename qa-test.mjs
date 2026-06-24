import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://doinvqmxpdrmdqmbpovq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_vJbvyDf56Lmdo2JcFVJ98g_EAbl0HQV';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function assert(condition, message) {
    if (!condition) throw new Error("ASSERTION FAILED: " + message);
}

async function run() {
    console.log("=== STEP 1: AUTHENTICATION ===");
    const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
        email: 'salek@effytechbd.com',
        password: 'Salek_effyAdmin_7xQp92!m'
    });
    if (authErr) throw authErr;
    console.log("Authentication successful.");

    console.log("=== STEP 2: TEST PROJECT SETUP ===");
    // Find a planning project
    const { data: projects, error: projErr } = await supabase.from('projects').select('id, name, status').in('status', ['planning', 'active']).limit(1);
    if (projErr || !projects.length) throw new Error("No safe project found.");
    const projectId = projects[0].id;
    console.log(`Using Project: ${projects[0].name} (${projectId})`);

    // Ensure member exists
    let { data: members, error: memErr } = await supabase.from('project_members').select('user_id').eq('project_id', projectId);
    if (memErr) console.log("Member fetch error:", memErr);
    if (!members || !members.length) {
        // Find an active admin to add
        const { data: admins } = await supabase.from('admin_profiles').select('id').eq('is_active', true).limit(1);
        const { error: insErr } = await supabase.from('project_members').insert({ project_id: projectId, user_id: admins[0].id });
        if (insErr) throw new Error("Failed to insert member: " + JSON.stringify(insErr));
        members = [{ user_id: admins[0].id }];
    }
    const memberId = members[0].user_id;
    console.log(`Using Active Member ID: ${memberId}`);

    console.log("=== STEP 3: VALID TASK CREATION ===");
    const validTaskTitle = `Test Task Alpha ${Date.now()}`;
    const { data: taskData, error: taskErr } = await supabase.rpc('create_task_with_assignees_v1', {
        p_project_id: projectId,
        p_title: validTaskTitle,
        p_description: 'Test description',
        p_status: 'todo',
        p_priority: 'normal',
        p_progress_percent: 0,
        p_estimated_minutes: 60,
        p_sort_order: 0,
        p_start_date: new Date().toISOString().split('T')[0],
        p_due_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        p_assignee_ids: [memberId]
    });

    if (taskErr) {
        console.error(taskErr);
        throw new Error("Task creation failed");
    }
    const taskId = taskData;
    console.log(`Task created successfully with ID: ${taskId}`);

    // Verify task row exists
    const { data: checkTask } = await supabase.from('project_tasks').select('*').eq('id', taskId).single();
    assert(checkTask.title === validTaskTitle, "Title mismatch");
    
    // Verify assignee row exists
    const { data: checkAssignees } = await supabase.from('task_assignees').select('*').eq('task_id', taskId);
    assert(checkAssignees.length === 1, "Assignee count mismatch");
    console.log("Assignee row:", checkAssignees[0]);
    assert(checkAssignees[0].user_id === memberId, "Assignee user_id mismatch");

    console.log("STEP 3 PASSED");

    console.log("=== STEP 4: TASK CREATION ROLLBACK TESTS ===");
    
    const runRollbackTest = async (testName, payloadOverrides) => {
        const payload = {
            p_project_id: projectId,
            p_title: `Rollback ${testName} ${Date.now()}`,
            p_description: '',
            p_status: 'todo',
            p_priority: 'normal',
            p_progress_percent: 0,
            p_estimated_minutes: 60,
            p_sort_order: 0,
            p_start_date: null,
            p_due_date: null,
            p_assignee_ids: [memberId],
            ...payloadOverrides
        };

        const { data, error } = await supabase.rpc('create_task_with_assignees_v1', payload);
        
        if (!error) {
            console.error(`FAIL: ${testName} succeeded when it should have failed. ID: ${data}`);
            throw new Error(`Rollback test failed: ${testName}`);
        }

        // Verify no row remains by title
        const { data: remainingTask } = await supabase.from('project_tasks').select('id').eq('title', payload.p_title);
        assert(remainingTask.length === 0, `Task row remained after failure for ${testName}`);
        console.log(`  [Pass] ${testName} (Error: ${error.message})`);
    };

    await runRollbackTest("1. Non-array assignee JSON", { p_assignee_ids: { admin_id: "uuid" } });
    await runRollbackTest("2. Invalid assignee UUID", { p_assignee_ids: ["not-a-uuid"] });
    // skipping 3. Inactive member (needs an inactive member)
    const { data: allAdmins } = await supabase.from('admin_profiles').select('id');
    const projectMemberIds = members.map(m => m.user_id);
    const nonMember = allAdmins.find(a => !projectMemberIds.includes(a.id));
    if (nonMember) {
        await runRollbackTest("4. Non-project member", { p_assignee_ids: [nonMember.id] });
    } else {
        console.log("  [Skip] 4. Non-project member (no non-members available)");
    }
    
    await runRollbackTest("5. Invalid task status", { p_status: 'invalid_status' });
    await runRollbackTest("6. Invalid priority", { p_priority: 'super_high' });
    await runRollbackTest("7. Progress below 0", { p_progress_percent: -1 });
    await runRollbackTest("8. Progress above 100", { p_progress_percent: 101 });
    await runRollbackTest("9. Estimated minutes above 100000", { p_estimated_minutes: 100001 });
    // 10. Negative sort order -> sort order is auto-calculated on create, so we can't test it via create_task. But we can try to update it later.
    await runRollbackTest("11. Due date before start date", { p_start_date: '2026-06-25', p_due_date: '2026-06-24' });

    console.log("STEP 4 PASSED");

    console.log("\nALL SET 1 TESTS PASSED SUCCESSFULLY!");
}

run().catch(err => {
    console.error("TEST FAILED:", err);
    process.exit(1);
});
