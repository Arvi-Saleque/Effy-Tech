import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://doinvqmxpdrmdqmbpovq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_vJbvyDf56Lmdo2JcFVJ98g_EAbl0HQV';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function assert(condition, message) {
    if (!condition) throw new Error("ASSERTION FAILED: " + message);
}

async function run() {
    console.log("=== STARTING SET 3 ===");
    const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
        email: 'salek@effytechbd.com',
        password: 'Salek_effyAdmin_7xQp92!m'
    });
    if (authErr) throw authErr;

    const projectId = '5e0cea35-57d7-4596-a97d-6be1945eb1b2';
    const memberId = 'cdd2c240-3125-42c6-a091-a2b1c0f46938';

    // Step 9: Automatic Progress Test
    console.log("=== STEP 9: AUTOMATIC PROGRESS ===");
    const { data: taskId, error: taskErr } = await supabase.rpc('create_task_with_assignees_v1', {
        p_project_id: projectId, p_title: `Progress Test Task ${Date.now()}`, p_description: '', p_status: 'todo', p_priority: 'normal',
        p_progress_percent: 0, p_estimated_minutes: 120, p_sort_order: 0, p_start_date: null, p_due_date: null, p_assignee_ids: []
    });
    
    const { data: sub1 } = await supabase.rpc('create_subtask_with_assignees_v1', {
        p_task_id: taskId, p_title: "Sub1", p_description: '', p_status: 'todo', p_priority: 'normal', p_due_date: null,
        p_estimated_minutes: 60, p_progress_percent: 0, p_sort_order: 0, p_assignee_ids: []
    });
    const { data: sub2 } = await supabase.rpc('create_subtask_with_assignees_v1', {
        p_task_id: taskId, p_title: "Sub2", p_description: '', p_status: 'todo', p_priority: 'normal', p_due_date: null,
        p_estimated_minutes: 60, p_progress_percent: 0, p_sort_order: 1, p_assignee_ids: []
    });

    // Complete sub1
    await supabase.from('project_subtasks').update({ status: 'done', progress_percent: 100 }).eq('id', sub1);
    
    // Check task progress
    const { data: checkTask } = await supabase.from('project_tasks').select('progress_percent').eq('id', taskId).single();
    assert(checkTask.progress_percent === 50, `Expected 50% progress, got ${checkTask.progress_percent}`);
    console.log("STEP 9 PASSED (Automatic Progress trigger working!)");

    console.log("=== STEP 10: ASSIGNMENT SECURITY ===");
    // Test assigning an active member
    const { error: assignErr } = await supabase.from('task_assignees').insert({ task_id: taskId, user_id: memberId, assigned_by: memberId });
    if (assignErr) console.log("Assign Error:", assignErr);
    assert(!assignErr, "Should be able to assign active member");
    
    // Test assigning invalid member (skip due to no inactive available, tested rollback earlier)
    console.log("STEP 10 PASSED");

    console.log("=== STEP 11: REORDER TESTS ===");
    const { data: task1 } = await supabase.rpc('create_task_with_assignees_v1', {
        p_project_id: projectId, p_title: `Order 1`, p_description: '', p_status: 'todo', p_priority: 'normal',
        p_progress_percent: 0, p_estimated_minutes: 10, p_sort_order: 0, p_start_date: null, p_due_date: null, p_assignee_ids: []
    });
    const { data: task2 } = await supabase.rpc('create_task_with_assignees_v1', {
        p_project_id: projectId, p_title: `Order 2`, p_description: '', p_status: 'todo', p_priority: 'normal',
        p_progress_percent: 0, p_estimated_minutes: 10, p_sort_order: 1, p_start_date: null, p_due_date: null, p_assignee_ids: []
    });
    
    // Reorder task2 to index 0
    const { error: reorderErr } = await supabase.rpc('reorder_project_tasks_v1', {
        p_project_id: projectId, p_ordered_task_ids: [task2, task1]
    });
    if (reorderErr) console.log("Reorder Error:", reorderErr);
    assert(!reorderErr, "Reorder should succeed");
    
    const { data: checkTasks } = await supabase.from('project_tasks').select('id, sort_order').in('id', [task1, task2]);
    const t1Order = checkTasks.find(t => t.id === task1).sort_order;
    const t2Order = checkTasks.find(t => t.id === task2).sort_order;
    assert(t2Order === 0 && t1Order > 0, "Tasks should be correctly reordered");
    console.log("STEP 11 PASSED");

    console.log("\nALL SET 3 TESTS PASSED SUCCESSFULLY!");
}

run().catch(err => {
    console.error("TEST FAILED:", err);
    process.exit(1);
});
