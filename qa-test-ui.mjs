import puppeteer from 'puppeteer';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://doinvqmxpdrmdqmbpovq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_vJbvyDf56Lmdo2JcFVJ98g_EAbl0HQV';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function assert(condition, message) {
    if (!condition) {
        console.error("ASSERTION FAILED: " + message);
        process.exit(1);
    }
}

async function run() {
    console.log("=== PREPARING UI TEST DATA ===");
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
        p_title: `UI Test Task ${Date.now()}`,
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
    
    // Create incomplete subtask
    const { data: subtaskId, error: subtaskErr } = await supabase.rpc('create_subtask_with_assignees_v1', {
        p_task_id: taskId,
        p_title: `UI Test Subtask ${Date.now()}`,
        p_description: '',
        p_status: 'todo',
        p_priority: 'normal',
        p_due_date: null,
        p_estimated_minutes: 30,
        p_progress_percent: 0,
        p_sort_order: 0,
        p_assignee_ids: [memberId]
    });
    if (subtaskErr) throw subtaskErr;

    console.log(`Test Task: ${taskId}`);
    console.log(`Test Subtask: ${subtaskId}`);

    console.log("=== STARTING BROWSER ===");
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    console.log("Logging in...");
    await page.goto('http://127.0.0.1:3000/admin/login');
    await page.type('input[type="email"]', 'salek@effytechbd.com');
    await page.type('input[type="password"]', 'Salek_effyAdmin_7xQp92!m');
    
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click('button[type="submit"]')
    ]);

    await page.screenshot({ path: 'scratch/after_login.png' });
    console.log("Navigating to task page...");
    await page.goto(`http://127.0.0.1:3000/admin/projects/${projectId}/tasks/${taskId}`);
    await page.screenshot({ path: 'scratch/task_page.png' });
    
    // Check if Mark as Done exists
    const hasBtn = await page.evaluate(() => {
        return !!Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Mark as Done'));
    });
    console.log("Has button:", hasBtn);
    if (!hasBtn) {
        console.error("Button not found. HTML:", await page.evaluate(() => document.body.innerHTML));
        process.exit(1);
    }

    console.log("Clicking 'Mark as Done' with incomplete subtask...");
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const doneBtn = btns.find(b => b.innerText.includes('Mark as Done'));
        if (doneBtn) doneBtn.click();
    });

    // Wait for the confirmation dialog
    console.log("Waiting for confirmation dialog...");
    await new Promise(r => setTimeout(r, 2000));
    
    const bodyText = await page.evaluate(() => document.body.innerText);
    assert(bodyText.includes("Task has incomplete subtasks"), "Expected incomplete subtasks error message!");
    
    console.log("Validation successful! Server Action correctly blocked completion.");

    console.log("Now completing the subtask in the DB to test the success path...");
    await supabase.from('project_subtasks').update({ status: 'done', progress_percent: 100 }).eq('id', subtaskId);
    
    console.log("Reloading page and trying again...");
    await page.reload({ waitUntil: 'networkidle0' });
    await page.waitForSelector('text/Mark as Done');
    
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const doneBtn = btns.find(b => b.innerText.includes('Mark as Done'));
        if (doneBtn) doneBtn.click();
    });

    await new Promise(r => setTimeout(r, 2000));
    const finalBodyText = await page.evaluate(() => document.body.innerText);
    assert(!finalBodyText.includes("Mark as Done"), "Task should be completed, button should disappear.");
    
    console.log("Success path validated!");

    await browser.close();
    console.log("=== STEP 7 & 8: UI WORKFLOW TESTS PASSED ===");
}

run().catch(async (err) => {
    console.error("TEST FAILED:", err);
    process.exit(1);
});
