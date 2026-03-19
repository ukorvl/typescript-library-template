---
applyTo: "docs/**"
---

# Docs Workspace (`docs/`) Instructions

This workspace is intentionally lightweight and may not have a full docs app yet.

## Technical Rules

- Keep scripts and README messaging honest about actual docs capabilities.
- Do not claim a docs dev server/build pipeline unless it exists in `docs/package.json`.
- Keep test/typecheck config minimal and deterministic.

## Required Validation For `docs/` Changes

```bash
pnpm -C docs run typecheck
pnpm -C docs run test
```

## Documentation Integrity

- If docs mention package exports or build outputs, verify against `lib/package.json` and `lib/vite.config.ts`.
- If docs mention CI checks, verify against `.github/workflows` and `.github/actions`.
