#!/bin/bash

set -euo pipefail

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
source "$SCRIPT_DIR/common.sh"

check_command pnpm
check_command jq

LIB_DIST_DIR="$REPO_ROOT/$LIB_PATH/dist"
LIB_PACKAGE_BASENAME="$(jq -r '.name // empty | split("/") | last' "$LIB_PACKAGE_JSON")"
if [[ -z "$LIB_PACKAGE_BASENAME" ]]; then
  echo "Error: Missing package name in '$LIB_PACKAGE_JSON'." >&2
  exit 1
fi

REQUIRED_LIB_ARTIFACTS=(
  "$LIB_DIST_DIR/index.d.ts"
  "$LIB_DIST_DIR/$LIB_PACKAGE_BASENAME.mjs"
)

should_build=false
for artifact in "${REQUIRED_LIB_ARTIFACTS[@]}"; do
  if [[ ! -f "$artifact" ]]; then
    should_build=true
    break
  fi
done

if [[ "$should_build" == true ]]; then
  echo "lib build artifacts are missing. Building lib..."
  pnpm -C "$REPO_ROOT/$LIB_PATH" run build
fi
