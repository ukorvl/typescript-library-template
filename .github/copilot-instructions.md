# TypeScript Library Template — AI Source of Truth

This repository is a pnpm monorepo template for shipping a TypeScript library from `lib/`, with `docs/` and `example/` workspaces.
`AGENTS.md` and `CLAUDE.md` are symlink mirrors of this file.

## Baseline Rules

- Keep TypeScript strict; do not introduce `any` without a concrete reason.
- Keep library exports side-effect free and tree-shakeable.
- Use named exports from `lib/src/index.ts`.
- Do not change scripts/docs inconsistently. If command behavior changes, update docs in the same change.
- Prefer workspace-aware paths and commands (`pnpm -C <workspace> ...`).

## Workspace Map

- `lib/` — publishable package (`package.json` exports, Vite build, Vitest tests).
- `docs/` — user-facing documentation workspace.
- `example/` — consumer integration workspace.

## Path-Specific Instructions

Use scoped instruction files (GitHub `.instructions.md` with `applyTo`):

- `.github/instructions/lib.instructions.md`
- `.github/instructions/docs.instructions.md`
- `.github/instructions/example.instructions.md`

These scoped files are authoritative for code under their paths.

## Reusable Prompt Files

- `.github/prompts/review-package.prompt.md`
- `.github/prompts/add-export.prompt.md`
- `.github/prompts/prepare-release.prompt.md`

## Custom Agent Roles

- `.github/agents/reviewer.agent.md`
- `.github/agents/release.agent.md`

## Outcome Standard

Changes should leave the template in a state where a new team can:

- install dependencies,
- run lint/typecheck/test,
- build and verify the package.

## Required Verification Commands

- `pnpm run setup-repo`
- `pnpm run lint`
- `pnpm run typecheck`
- `pnpm run test`
- `pnpm run verify:package`
