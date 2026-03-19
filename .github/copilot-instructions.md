# React TypeScript Library Template — Agent Knowledge Base

Monorepo template for shipping a TypeScript library from `lib/` with shared tooling at the root and optional `docs/` + `example/` workspaces.

## Architecture

```text
react-typescript-library-template/
├── .github/
│   ├── copilot-instructions.md
│   ├── actions/                  # Reusable CI actions (install, lint, build, test, version sync)
│   └── workflows/                # CI workflows (build, size-limit, label sync, etc.)
├── lib/
│   ├── src/index.ts              # Library public entry
│   ├── vite.config.ts            # Library bundling + d.ts generation
│   ├── vitest.config.ts          # Library test config
│   ├── tsconfig.json             # Library TS project config
│   ├── package.json              # Publish package metadata + exports map
│   └── jsr.json                  # JSR publish metadata
├── docs/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── example/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── scripts/
│   ├── common.sh                 # Shared shell helpers/paths
│   └── version.sh                # Version bump sync for lib/package.json + lib/jsr.json
├── eslint.config.mjs             # Flat ESLint config used repo-wide
├── tsconfig.json                 # Root TS base config + project references
└── package.json                  # Workspace orchestration scripts and dev tooling
```

## Module Map

| Module               | File                   | Purpose                                                        |
| -------------------- | ---------------------- | -------------------------------------------------------------- |
| Root scripts         | `package.json`         | Orchestrates lint/format/knip/dev and workspace commands       |
| Lint config          | `eslint.config.mjs`    | Flat ESLint setup for TS/JS + security/sorting/quality plugins |
| TS baseline          | `tsconfig.json`        | Strict root compiler options + workspace references            |
| Library entry        | `lib/src/index.ts`     | Public API surface (named exports only)                        |
| Library build        | `lib/vite.config.ts`   | Builds ESM/UMD outputs and declaration files                   |
| Library tests        | `lib/vitest.config.ts` | Test inclusion/coverage configuration                          |
| Publish metadata     | `lib/package.json`     | Exports map, sideEffects flag, publish registry config         |
| JSR metadata         | `lib/jsr.json`         | JSR package identity/version/include rules                     |
| Version automation   | `scripts/version.sh`   | Bumps lib version and syncs JSR version                        |
| Shared shell helpers | `scripts/common.sh`    | Repo path constants and command checks                         |

## Build and Verification Flow

```text
Source change (lib/src/**/*)
  -> eslint + prettier + knip (root quality gates)
  -> vite build in lib/ (bundle + d.ts)
  -> package exports checked with attw (lib lint:exports)
  -> publish artifacts from lib/dist
```

## Conventions

- Node.js and npm versions must satisfy root `engines`.
- Use strict TypeScript; avoid `any` unless unavoidable and justified.
- Keep library exports modular and side-effect free (`sideEffects: false`).
- Use named exports for public APIs.
- Keep `lib/package.json` and `lib/jsr.json` versions in sync.
- Prefer thin adapters and shared core logic over duplicated behavior.
- Keep JSON-first CLI/tool output where machine consumers are expected.

## Agent Rules

- Scope code changes to the relevant workspace (`lib`, `docs`, `example`) instead of root-level ad hoc files.
- When adding public API in `lib/src`, update exports and type declarations behavior accordingly.
- When changing build output names or format, update both Vite config and package exports metadata.
- When changing versioning flow, preserve atomic updates of `lib/package.json` and `lib/jsr.json`.
- Do not introduce side-effectful top-level code in library entry points.
- Do not silently weaken lint/type rules; document intentional exceptions in config.

## Documentation Integrity Rules

- Do not document commands that do not exist in `package.json`/workspace scripts.
- If docs mention CI behavior, align them with `.github/actions/*` and `.github/workflows/*`.
- If docs describe package entry points or artifacts, verify against `lib/package.json` exports and `lib/vite.config.ts`.
- After changing scripts or commands, update docs in the same change.

## Anti-Patterns

- Do not add CommonJS-only assumptions to an ESM-oriented package.
- Do not bypass workspace boundaries with brittle relative path hacks.
- Do not hardcode placeholder `fill-me` values in production-ready metadata.
- Do not add tooling logs to protocol streams that require structured output.
- Do not rely on root `test`/`build` placeholders as proof of real validation.

## Commands

- `npm ci` — install dependencies for all workspaces.
- `npm run lint` — run ESLint across repository.
- `npm run lint:fix` — apply lint autofixes.
- `npm run format` — check Prettier formatting.
- `npm run format:fix` — write Prettier formatting changes.
- `npm run knip` — check for unused exports/dependencies.
- `npm run -w lib build` — build library bundles and declaration files.
- `npm run -w lib lint:exports` — validate package export/type correctness.
- `npm run dev` — run workspace dev commands concurrently.
- `npm run version -- [patch|minor|major]` — sync version bumps in `lib` + `jsr`.
