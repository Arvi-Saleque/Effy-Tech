$sourceDir = "d:\web developments\Effy-Tech"
$brainDir = "C:\Users\USER\.gemini\antigravity-ide\brain\4e6ac9fc-7c9c-44d0-ae32-703658087908"
$zipFile = "d:\web developments\Effy-Tech\effyops-phase4-review-v6.zip"

If (Test-Path $zipFile) {
    Remove-Item $zipFile -Force
}

$filesToZip = @(
    "supabase\migrations\20260624000001_project_tasks.sql",
    "src\lib\admin\task-schema.js",
    "src\lib\admin\task-actions.js",
    "src\app\admin\(panel)\projects\[projectId]\page.js",
    "src\app\admin\(panel)\projects\[projectId]\tasks\page.js",
    "src\app\admin\(panel)\projects\[projectId]\tasks\new\page.js",
    "src\app\admin\(panel)\projects\[projectId]\tasks\[taskId]\page.js",
    "src\app\admin\(panel)\projects\[projectId]\tasks\[taskId]\edit\page.js",
    "src\components\admin\TaskStatusBadge.jsx",
    "src\components\admin\TaskPriorityBadge.jsx",
    "src\components\admin\DueStatusBadge.jsx",
    "src\components\admin\ProgressBar.jsx",
    "src\components\admin\TaskFilters.jsx",
    "src\components\admin\TaskCard.jsx",
    "src\components\admin\TaskBoard.jsx",
    "src\components\admin\TaskActions.jsx",
    "src\components\admin\TaskForm.jsx",
    "src\components\admin\TaskAssignees.jsx",
    "src\components\admin\SubtasksPanel.jsx"
)

$tempDir = "$sourceDir\temp_zip_staging_v6"
If (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir }
New-Item -ItemType Directory -Path $tempDir | Out-Null

foreach ($file in $filesToZip) {
    $fullPath = Join-Path $sourceDir $file
    $destPath = Join-Path $tempDir $file
    $destDir = Split-Path $destPath
    
    if (!(Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir | Out-Null
    }
    Copy-Item -LiteralPath $fullPath -Destination $destPath -Force
}

# Copy markdown files from brain
Copy-Item "$brainDir\report.md" -Destination "$tempDir\report.md" -Force
Copy-Item "$brainDir\task.md" -Destination "$tempDir\task.md" -Force
Copy-Item "$brainDir\walkthrough.md" -Destination "$tempDir\walkthrough.md" -Force -ErrorAction SilentlyContinue

Compress-Archive -Path "$tempDir\*" -DestinationPath $zipFile -Force
Remove-Item -Recurse -Force $tempDir
