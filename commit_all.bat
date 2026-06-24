git add "src/app/admin/(panel)/projects/page.js"
git add "src/app/admin/(panel)/projects/[projectId]/page.js"
git add "src/app/admin/(panel)/projects/[projectId]/edit/page.js"
git commit -m "fix: resolve Next.js 15 async params in projects route"

git add "supabase/migrations/20260624000001_project_tasks.sql"
git commit -m "fix(db): correct Phase 4 RPC aggregates and user_id schema mappings"

git add "report.md" "task.md" "walkthrough.md" "phase4-runtime-report.md"
git commit -m "docs: update Phase 4 runtime verification reports and checklists"

git push
