---
applyTo: "lib/**"
---

# Library Workspace (`lib/`) Instructions

This workspace is the publishable package.

## Technical Rules

- Preserve ESM-first packaging and exports map correctness.
- Keep `sideEffects: false` assumptions valid.
- Do not add top-level side effects in `src/` public entry files.
- Public API changes must be intentional and explicit in `lib/src/index.ts`.
- Keep bundle metadata aligned: `main`, `module`, `types`, `exports`, and Vite outputs.

## Required Validation For `lib/` Changes

Run these before finalizing:

```bash
pnpm run setup-repo
pnpm -C lib run build
pnpm -C lib run typecheck
pnpm -C lib run test
pnpm run verify:package
```

## Packaging and Release Quality

- Keep `attw` and `publint --strict` passing.
- Ensure `size-limit` config points to real built artifacts.
- When package metadata changes, verify tarball contents with `pnpm -C lib pack`.
- Do not leave placeholder identity values in package metadata intended for users.
