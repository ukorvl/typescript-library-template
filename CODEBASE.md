# CODEBASE Overview

## Project Structure

This repository is organized as a monorepo using **npm workspaces**. The major folders are:

- `lib/` — The main library source code.
- `example/` — Example usage of the library.
- `docs/` — Documentation files.
- `.github/` — GitHub Actions, issue templates, and labels.

## Packages

### lib/
The core of the library. It includes:

fill-me

### example/
A sample project that demonstrates how to consume the library. Useful for testing integration during development.

## Tooling

- **TypeScript** — Used across the codebase for type safety.
- **Vite** — Used for local development and building examples.
- **ESLint + Prettier** — Enforce code style and linting.
- **Vitest** — Testing framework used for unit and integration tests.
- **npm Workspaces** — Manages multiple packages in a single repo.
- **GitHub Actions** — CI/CD setup for running tests and building the library on every push to the main branch.
- **Commitlint** — Enforces conventional commit messages.
