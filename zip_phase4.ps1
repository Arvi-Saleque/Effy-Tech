$sourceDir = "d:\web developments\Effy-Tech"
$zipFile = "d:\web developments\Effy-Tech\effyops-phase4-review-v1.zip"

If (Test-Path $zipFile) {
    Remove-Item $zipFile
}

Compress-Archive -Path "$sourceDir\report.md", "$sourceDir\walkthrough.md", "$sourceDir\package.json", "$sourceDir\src", "$sourceDir\supabase" -DestinationPath $zipFile
