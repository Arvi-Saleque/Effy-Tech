# User Preferences & Instructions Memory

## Standard Workflow Guidelines

1. Incremental Validation: Every small portion of a task must be implemented and verified incrementally.
2. Commit & Push: After every instruction or logical small step, write a proper commit message and push the code (git commit -m "..." and git push).
3. Automated Zip Reviews: 
   - The zip and folder names should be unique every time, based on the current phase or version (e.g., `phase_1`, `v2`), never just "X".
   - Every time we need to create a new zip, **delete the previously created zip and folder** first.
   - Create the new folder (e.g., `D:\web developments\phase_1`) and copy all modified files into it, preserving relative paths.
   - Compress the folder into a `.zip` file (e.g., `D:\web developments\phase_1.zip`).
   - The user will share this zip file with their partner for review.

## File References
- Repository root: D:\web developments\Effy-Tech\
- Zip location format: `D:\web developments\<phase_or_version_name>\` and `D:\web developments\<phase_or_version_name>.zip`