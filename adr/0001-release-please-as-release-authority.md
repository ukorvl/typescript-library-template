# Use release-please as the single release authority for `lib/`

This repository uses `release-please` as the single Release Authority for the `lib/` package, with canonical versioning in `lib/package.json` and `lib/jsr.json`, a canonical changelog in `lib/CHANGELOG.md`, plain `v` tags, and a single release flow that publishes to both npm and JSR through one composite Publication Gate. We chose this to remove manual version drift, keep release metadata and registry publication aligned, and preserve one auditable automation path for validation, packaging, attestation, and publishing.
