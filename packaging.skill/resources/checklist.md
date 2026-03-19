# Package Validation Checklist

Use this checklist before publishing `lib/`.

1. Build succeeds:
   - `pnpm run setup-repo`
2. Types/exports/package checks pass:
   - `pnpm run verify:package`
3. Bundle budget check passes:
   - `pnpm -C lib exec size-limit --json`
4. Tarball contents are expected:
   - `pnpm -C lib pack`
   - inspect `.tgz` for only intended files
5. Security workflows exist and are enabled:
   - dependency review
   - CodeQL
   - build provenance attestation
   - SBOM generation
6. Version metadata is consistent:
   - `lib/package.json` and `lib/jsr.json`
