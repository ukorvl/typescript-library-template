#!/bin/bash

set -euo pipefail

pkg_version=$(jq -r '.version' -- "${INPUTS_PACKAGE_JSON}")
if [[ -z "$pkg_version" || "$pkg_version" == "null" ]]; then
  echo "Error: Missing version in ${INPUTS_PACKAGE_JSON}" >&2
  exit 1
fi

jsr_version=$(jq -r '.version' -- "${INPUTS_JSR_JSON}")
if [[ -z "$jsr_version" || "$jsr_version" == "null" ]]; then
  echo "Error: Missing version in ${INPUTS_JSR_JSON}" >&2
  exit 1
fi

if [[ "$jsr_version" != "$pkg_version" ]]; then
  echo "Error: jsr.json version ($jsr_version) does not match package.json version ($pkg_version)" >&2
  exit 1
fi

manifest_version=$(
  jq -r --arg component "$INPUTS_MANIFEST_COMPONENT" '.[$component] // empty' -- "${INPUTS_MANIFEST_JSON}"
)
if [[ -z "$manifest_version" || "$manifest_version" == "null" ]]; then
  echo "Error: Missing manifest version for component '${INPUTS_MANIFEST_COMPONENT}' in ${INPUTS_MANIFEST_JSON}" >&2
  exit 1
fi

if [[ "$manifest_version" != "$pkg_version" ]]; then
  echo "Error: release-please manifest version ($manifest_version) does not match package.json version ($pkg_version)" >&2
  exit 1
fi

echo "package.json version ($pkg_version) matches jsr.json version ($jsr_version) and release-please manifest version ($manifest_version)."
