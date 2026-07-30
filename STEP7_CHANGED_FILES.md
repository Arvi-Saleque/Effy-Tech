# Effy Tech Step 7 Changed Files

Step 7 changes only the files listed below.

| File | Reason |
| --- | --- |
| `eslint.config.mjs` | Name the exported config and document narrow exceptions for intentional raw images, protected effects, request-time snapshots, and React PDF. |
| `package.json` | Add the `test:qa` command. No dependency or override changed. |
| `src/app/globals.css` | Position the root scroll container while preserving smooth and reduced-motion behavior. |
| `src/app/layout.js` | Declare the intentional smooth-scroll behavior on the root element. |
| `src/components/showcase/AmalTrackerShowcase.jsx` | Add the semantic `main` landmark. |
| `src/components/ui/Logo.jsx` | Preserve the logo source aspect ratio at every display width. |
| `src/features/effy-edu-demo/components/home/CoursesSection.tsx` | Use a stable functional autoplay state update. |
| `src/features/effy-edu-demo/components/home/ResultsSection.tsx` | Use a stable functional autoplay state update. |
| `src/features/effy-edu-demo/components/reports/student-progress-report-card.tsx` | Remove an obsolete raw-image lint directive. |
| `src/features/effy-edu-demo/components/ui/debounced-search-input.tsx` | Synchronize the effect with the controlled value. |
| `src/features/effy-edu-demo/lib/empty-module.ts` | Replace the anonymous default export with a named constant. |
| `tests/final-global-qa.test.mjs` | Add final warning-cleanup and contract regression coverage. |
| `STEP7_FINAL_GLOBAL_QA_REPORT.md` | Record the final release verification evidence. |
| `STEP7_CHANGED_FILES.md` | Record the exact Step 7 apply scope. |

The apply script snapshots every other project file before making changes,
verifies each applied file by SHA-256, and verifies that all protected files
remain byte-identical. If any apply or verification step fails, it restores the
previous target files and removes target files that did not exist before.
