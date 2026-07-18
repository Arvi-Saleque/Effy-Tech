# Apply EffyOps Finance Management V1

Run the following from the root of the existing Effy Tech project (the directory containing `package.json`).

## 1. Apply the code overlay

```powershell
$zip = @(
  Get-ChildItem (Get-Location) `
    -Filter "effy-tech-finance-management-v1-overlay*.zip" `
    -File -ErrorAction SilentlyContinue

  Get-ChildItem "$HOME\Downloads" `
    -Filter "effy-tech-finance-management-v1-overlay*.zip" `
    -File -ErrorAction SilentlyContinue
) |
Sort-Object LastWriteTime -Descending |
Select-Object -First 1

if (-not $zip) {
  throw "Finance V1 ZIP was not found in this directory or Downloads."
}

if (-not (Test-Path ".\package.json")) {
  throw "Open PowerShell in the Effy Tech project root first."
}

$stage = Join-Path $env:TEMP "effy-tech-finance-management-v1-overlay"

if (Test-Path -LiteralPath $stage) {
  Remove-Item -LiteralPath $stage -Recurse -Force
}

Expand-Archive `
  -LiteralPath $zip.FullName `
  -DestinationPath $stage `
  -Force

$source = Join-Path $stage "effy-tech-finance-management-v1-overlay"

Get-ChildItem -LiteralPath $source -Force | ForEach-Object {
  Copy-Item `
    -LiteralPath $_.FullName `
    -Destination (Get-Location) `
    -Recurse `
    -Force
}

npm install
npm run test:finance
npm run build
```

Expected Finance test result: 10 passed, 0 failed. The build must list the `/admin/finance` routes and finish successfully.

## 2. Apply the Supabase migration

Copy the verified migration to the clipboard:

```powershell
Get-Content `
  ".\supabase\migrations\20260718000000_finance_management_v1.sql" `
  -Raw |
Set-Clipboard
```

Open the correct Supabase project → SQL Editor → New query → paste → Run.

If this repository is already linked to the correct Supabase project, this is the CLI alternative:

```powershell
npx supabase db push
```

Use only one migration method.

## 3. Start and verify

```powershell
npm run dev
```

Open:

```text
http://localhost:3000/admin/finance
```

Then follow `docs/finance-management-v1-setup.md` for the correct account-opening-balance and historical-data backfill sequence.

