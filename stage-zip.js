const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const staging = 'temp_archive_staging';
if (fs.existsSync(staging)) fs.rmSync(staging, { recursive: true, force: true });
fs.mkdirSync(staging);

const commands = [
  "Get-ChildItem -Path 'src/app/admin/(panel)/projects' -Filter 'page.js' -Recurse",
  "Get-ChildItem -Path 'src/app/admin/(panel)/my-work' -Filter 'page.js' -Recurse",
  "Get-ChildItem -Path 'src/components/admin' -Filter '*Task*.jsx' -Recurse",
  "Get-ChildItem -Path 'src/components/admin' -Filter '*Subtask*.jsx' -Recurse",
  "Get-ChildItem -Path 'src/lib/admin' -Filter 'task-*.js' -Recurse",
  "Get-ChildItem -Path 'supabase/migrations' -Filter '20260624000001_project_tasks.sql' -Recurse"
];

let allFiles = [];
for (const cmd of commands) {
  try {
    const out = execSync(`powershell -Command "${cmd} | Select-Object -ExpandProperty FullName"`, {encoding: 'utf8'});
    const files = out.trim().split('\n').map(l => l.trim()).filter(Boolean);
    allFiles.push(...files);
  } catch (e) {
    console.error("Error executing:", cmd);
  }
}

// Ensure uniqueness
allFiles = [...new Set(allFiles)];

for (const f of allFiles) {
  const rel = path.relative(process.cwd(), f);
  const dest = path.join(staging, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(f, dest);
  console.log("Staged:", rel);
}

// Copy reports
const docs = [
  'C:/Users/USER/.gemini/antigravity-ide/brain/4e6ac9fc-7c9c-44d0-ae32-703658087908/report.md',
  'C:/Users/USER/.gemini/antigravity-ide/brain/4e6ac9fc-7c9c-44d0-ae32-703658087908/task.md',
  'C:/Users/USER/.gemini/antigravity-ide/brain/4e6ac9fc-7c9c-44d0-ae32-703658087908/walkthrough.md',
  'C:/Users/USER/.gemini/antigravity-ide/brain/4e6ac9fc-7c9c-44d0-ae32-703658087908/phase4-runtime-report.md'
];

docs.forEach(f => {
  const dest = path.join(staging, path.basename(f));
  fs.copyFileSync(f, dest);
  console.log("Staged:", path.basename(f));
});

console.log('Staging prepared successfully.');
