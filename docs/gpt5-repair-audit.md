# Effy Tech — gpt(5) Audited Repair

This repair uses the uploaded `gpt(5).zip` as its only source baseline.

## Repaired

- Restored the body-portal mobile menu and true fixed overlay.
- Restored missing 3D wrappers and spatial classes on featured work, process,
  standards, technology, and contact sections.
- Removed root-level hydration-warning suppression so real mismatches remain
  diagnosable.
- Replaced the missing not-found illustration path with the existing
  `tools.jpeg` asset.

## Preserved

- Existing public content and routes.
- Existing cinematic hero, scroll motion, proof cards, and team-card depth.
- Admin panel code and database behavior.
- Existing package versions and environment configuration.

## Validation target

- Clean dependency install.
- ESLint with no new errors.
- Production build across all application routes.
- HTTP smoke tests for core public pages and spatial assets.
