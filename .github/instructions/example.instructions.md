---
applyTo: "example/**"
---

# Example Workspace (`example/`) Instructions

The example should demonstrate real package consumption with minimal local hacks.

## Technical Rules

- Keep dependency on `typescript-library-template` as `workspace:*`.
- Do not introduce TS path aliases or Vite aliases that bypass package resolution.
- Example code should import from the package name, not from `../lib/src/*`.
- Keep example tests simple smoke tests unless the workspace evolves.

## Required Validation For `example/` Changes

```bash
pnpm run setup-repo
pnpm -C example run typecheck
pnpm -C example run test
```

## Interop Expectations

- If the example fails to resolve the package, verify `lib` has been built via `pnpm run setup-repo`.
- Changes in library entry points must be reflected in example usage.
