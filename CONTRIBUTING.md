# Contributing

## Getting started

1. Fork and clone the repository.
2. Install dependencies and set up local git hooks:

```sh
pnpm install
```

## Development commands

```sh
pnpm run dev
pnpm run build
pnpm run lint
pnpm run lint:md-links
pnpm run typecheck
pnpm run test
pnpm run verify:package
```

Workspace commands:

```sh
pnpm -C docs run dev
pnpm -C docs run build
pnpm -C example run dev
pnpm -C example run build
```

## Pull request expectations

- Keep changes scoped and well-described.
- Update docs/examples when public API or command behavior changes.
- Ensure all required verification commands pass before opening a PR.
- Use conventional commit messages.
- Use `feat:` and `fix:` for the standard releasable changes in `lib/`.
- Use a `Release-As: x.y.z` footer when you need an explicit one-off version override instead of editing version files manually.
- Merge the generated `release-please` PR manually after reviewing the proposed version bump, changelog, and touched files.

## Releasing

This template uses [`release-please`](https://github.com/googleapis/release-please) as the single release authority for `lib/`.

- `release-please` reads merged commit messages under `lib/` and turns releasable changes into a release PR.
- The release PR updates `lib/package.json`, `lib/jsr.json`, `lib/CHANGELOG.md`, and `.release-please-manifest.json`.
- Maintainers review and merge that release PR manually.
- After the release PR lands on `main`, `.github/workflows/publish.yaml` validates the repo, dry-runs npm and JSR publishing, then publishes to both registries.

For day-to-day commits:

- Follow the [Conventional Commits 1.0.0 spec](https://www.conventionalcommits.org/en/v1.0.0/).
- Use `fix:` for bug fixes and `feat:` for new capabilities in `lib/`.
- Mark breaking changes with `!` in the header or a `BREAKING CHANGE:` footer.
- Other commit types such as `docs:`, `test:`, `chore:`, `ci:`, `refactor:`, and `perf:` are still allowed, but they do not automatically create a release on their own under the default `release-please` rules.
- Use a `Release-As: x.y.z` footer when you need an explicit version override for a release PR.

Helpful references:

- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- [release-please overview](https://github.com/googleapis/release-please)
- [release-please manifest releaser docs](https://github.com/googleapis/release-please/blob/main/docs/manifest-releaser.md)

## License

By contributing, you agree your contributions are licensed under [MIT](./lib/LICENSE).
