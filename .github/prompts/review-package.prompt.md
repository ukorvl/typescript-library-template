# Review Package Integrity

Review this repository as a publishable TypeScript library package.

## Focus Areas

1. `lib/package.json` export correctness (`main`, `module`, `types`, `exports`).
2. Packaging quality (`pnpm run verify:package` with `attw` + `publint --strict`).
3. Size budget sanity (`size-limit` behavior and config).
4. Security/supply-chain checks in workflows (dependency review, CodeQL, attestations, SBOM).
5. Regressions in build artifacts or CI safety.

## Steps

1. Run:
   - `pnpm run setup-repo`
   - `pnpm run verify:package`
   - `pnpm -C lib exec size-limit --json`
2. Inspect:
   - `lib/package.json`
   - `lib/vite.config.ts`
   - `lib/.size-limit.ts`
   - `.github/workflows/*.yaml`
3. Report:
   - Findings sorted by severity (`P0`..`P3`)
   - Exact file references and concrete fix suggestions
   - Residual risks and missing tests/checks
