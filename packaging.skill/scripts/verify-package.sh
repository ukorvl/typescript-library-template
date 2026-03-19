#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

echo "[packaging.skill] setup-repo"
pnpm run setup-repo

echo "[packaging.skill] verify:package"
pnpm run verify:package

echo "[packaging.skill] size-limit"
pnpm -C lib exec size-limit --json

echo "[packaging.skill] done"
