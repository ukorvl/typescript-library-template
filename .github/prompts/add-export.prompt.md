# Add Public Export

Add a new public export to the library safely and update all related surfaces.

## Inputs

- Export name(s)
- Source file path
- Whether export is type-only or runtime
- Any expected example usage

## Required Changes

1. Add export in `lib/src/index.ts`.
2. Ensure implementation exists and is typed.
3. Update/extend tests in `lib/` and `example/` usage where relevant.
4. Verify package metadata/output still resolves correctly.

## Required Validation

Run:

- `pnpm run setup-repo`
- `pnpm -C lib run test`
- `pnpm -C lib run typecheck`
- `pnpm run verify:package`
- `pnpm -C example run typecheck`

## Output Format

- Summary of code changes
- API diff (what was newly exported)
- Validation command results
- Follow-up actions, if any
