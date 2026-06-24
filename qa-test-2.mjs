import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://doinvqmxpdrmdqmbpovq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_vJbvyDf56Lmdo2JcFVJ98g_EAbl0HQV';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function assert(condition, message) {
    if (!condition) throw new Error("ASSERTION FAILED: " + message);
}

async function run() {
    console.log("=== STARTING SET 2 ===");
    const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
        email: 'salek@effytechbd.com',
        password: 'Salek_effyAdmin_7xQp92!m'
    });
    if (authErr) throw authErr;

    const projectId = '5e0cea35-57d7-4596-a97d-6be1945eb1b2';
    const memberId = 'cdd2c240-3125-42c6-a091-a2b1c0f46938';

    // Create a base task
    const { data: taskId, error: taskErr } = await supabase.rpc('create_task_with_assignees_v1', {
        p_project_id: projectId,
        p_title: `Base Task for Subtasks ${Date.now()}`,
        p_description: '',
        p_status: 'todo',
        p_priority: 'normal',
        p_progress_percent: 0,
        p_estimated_minutes: 120,
        p_sort_order: 0,
        p_start_date: null,
        p_due_date: null,
        p_assignee_ids: []
    });
    if (taskErr) throw taskErr;
    console.log(`Base task created: ${taskId}`);

    console.log("=== STEP 5: VALID SUBTASK CREATION ===");
    const subtaskTitle = `Test Subtask ${Date.now()}`;
    const { data: subtaskId, error: subtaskErr } = await supabase.rpc('create_subtask_with_assignees_v1', {
        p_task_id: taskId,
        p_title: subtaskTitle,
        p_description: 'Sub desc',
        p_status: 'todo',
        p_priority: 'normal',
        p_due_date: null,
        p_estimated_minutes: 30,
        p_progress_percent: 0,
        p_sort_order: 0,
        p_assignee_ids: [memberId]
    });

    if (subtaskErr) throw subtaskErr;
    console.log(`Subtask created: ${subtaskId}`);

    const { data: checkSubtask } = await supabase.from('project_subtasks').select('*').eq('id', subtaskId).single();
    assert(checkSubtask.title === subtaskTitle, "Subtask title mismatch");
    
    const { data: checkSubAssign } = await supabase.from('subtask_assignees').select('*').eq('subtask_id', subtaskId);
    assert(checkSubAssign.length === 1, "Subtask assignee mismatch");
    assert(checkSubAssign[0].user_id === memberId, "Subtask assignee user_id mismatch");

    console.log("STEP 5 PASSED");

    console.log("=== STEP 6: SUBTASK CREATION ROLLBACK TESTS ===");
    const runSubRollback = async (testName, payloadOverrides) => {
        const payload = {
            p_task_id: taskId,
            p_title: `Rollback ${testName}`,
            p_description: '',
            p_status: 'todo',
            p_priority: 'normal',
            p_due_date: null,
            p_estimated_minutes: 30,
            p_progress_percent: 0,
            p_sort_order: 0,
            p_assignee_ids: [memberId],
            ...payloadOverrides
        };

        const { data, error } = await supabase.rpc('create_subtask_with_assignees_v1', payload);
        if (!error) {
            console.error(`FAIL: ${testName} succeeded. ID: ${data}`);
            throw new Error(`Subtask Rollback failed: ${testName}`);
        }
        
        const { data: remaining } = await supabase.from('project_subtasks').select('id').eq('title', payload.p_title);
        assert(remaining.length === 0, `Subtask row remained for ${testName}`);
        console.log(`  [Pass] ${testName} (Error: ${error.message})`);
    };

    await runSubRollback("1. Non-array assignee JSON", { p_assignee_ids: { user_id: memberId } });
    await runSubRollback("2. Invalid assignee UUID", { p_assignee_ids: ["not-a-uuid"] });
    await runSubRollback("5. Invalid subtask status", { p_status: 'invalid' });
    await runSubRollback("6. Invalid priority", { p_priority: 'super' });
    await runSubRollback("7. Negative progress", { p_progress_percent: -1 });
    await runSubRollback("8. Progress > 100", { p_progress_percent: 101 });
    await runSubRollback("9. Too many minutes", { p_estimated_minutes: 100001 });

    console.log("STEP 6 PASSED");
    
    console.log("\nALL SET 2 TESTS PASSED SUCCESSFULLY!");
}

run().catch(err => {
    console.error("TEST FAILED:", err);
    process.exit(1);
});
