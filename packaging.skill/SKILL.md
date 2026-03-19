# Packaging Skill

Use this skill for package validation tasks in this repository.

## When To Use

- Any change touching `lib/package.json`, exports, bundle filenames, or publish metadata.
- Pre-release checks.
- CI/package-health triage for `attw`, `publint`, `size-limit`, tarball contents, or SBOM/attestation flows.

## Inputs

- Target scope (`lib` only or full repo).
- Whether to run quick checks or full release-grade checks.

## Standard Workflow

1. Build artifacts:
   - `pnpm run setup-repo`
2. Validate package quality:
   - `pnpm run verify:package`
3. Validate bundle budget:
   - `pnpm -C lib exec size-limit --json`
4. (Optional) create tarball:
   - `pnpm -C lib pack`

## Scripted Entry Point

Run:

```bash
bash packaging.skill/scripts/verify-package.sh
```

## Additional Reference

- `packaging.skill/resources/checklist.md`
