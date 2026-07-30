# Effy Tech Step 7 Final Global QA Report

Date: 2026-07-30

## Release outcome

Step 7 completes the public website architecture upgrade without changing the
approved page content, visual system, animations, admin workflows, database,
Supabase integration, analytics contract, or Contact submission contract.

## Verification summary

| Check | Result |
| --- | --- |
| Final Global QA tests | 8/8 passed |
| Contact tests | 10/10 passed |
| Team and Leadership tests | 11/11 passed |
| About and Process tests | 11/11 passed |
| Projects tests | 8/8 passed |
| Services tests | 7/7 passed |
| Public routing tests | 6/6 passed |
| Portfolio tests | 12/12 passed |
| Finance tests | 14/14 passed |
| Combined regression tests | 97/97 passed |
| ESLint | 0 errors, 0 warnings |
| Production build | 150/150 static pages |
| Canonical production routes | 17 passed |
| Canonical redirects | 9 passed |
| Discovered internal links | 89 passed |
| Browser render checks | 28 passed |
| Desktop routes checked | 14 |
| Mobile routes checked at 390px | 14 |
| Maximum horizontal overflow | 0px |
| Browser console warnings/errors | 0 |

## Warning cleanup

- The root layout now declares the intentional smooth-scroll behavior expected
  by Next.js route navigation.
- The root scroll container is positioned while the reduced-motion override
  remains intact.
- The shared logo now keeps its 1115:740 source aspect ratio at every display
  size.
- Public demo autoplay effects now use stable functional state updates.
- The controlled debounced search effect now tracks its value dependency.
- Anonymous default exports were removed from the touched configuration and
  compatibility module.
- The IAM case study now provides a semantic `main` landmark.
- The obsolete raw-image disable in the student progress report card was
  removed.

The previous 48 ESLint warnings were individually audited. Intentional raw
images remain only on CMS URLs, upload previews, and long product screenshots
whose rendering or remote-host contract would change if they were passed
through the Next image optimizer. Those cases use documented, path-scoped lint
exceptions. Three protected admin effects, five request-time server snapshots,
and one React PDF image false positive also use narrow, documented exceptions.
No global image, hook, or accessibility rule was disabled.

## Browser and route QA

The production build was exercised with a standalone Chromium runtime because
the cloud preview environment blocked localhost. Fourteen representative public
routes were rendered at desktop and 390px mobile widths. No horizontal
overflow, browser console warning, browser console error, or failed page render
was found. Homepage desktop/mobile, Contact mobile, and Team desktop snapshots
were also visually inspected.

The production route smoke test verified 17 canonical routes, 9 legacy
redirects, and 89 internal links discovered from the rendered pages.

## Preserved contracts

- Approved Homepage, Services, Projects, About, Process, Team, Contact, and case
  study content and visual architecture
- Navbar, Footer, animation behavior, and public route contracts
- Admin panel and all established admin editing flows
- Project, service, leadership, and Contact data
- Supabase, database schema, finance migrations, and backend actions
- Contact six-field form contract and analytics event behavior

The existing Contact action still validates and writes the accepted payload to
the server log. It does not save inquiries to a database or send email; Step 7
does not alter that protected backend behavior.

## External hydration warning

DOM attributes such as `bis_register` and `bis_skin_checked` are injected by a
browser security extension such as Bitdefender. They are not emitted by this
project. No website source was changed to hide that external hydration warning.

## Deployment notes

- No database migration is required.
- Use the included rollback-capable PowerShell 5.1 apply script.
- After applying, install dependencies and run the commands listed in this
  release handoff.
