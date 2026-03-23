#!/bin/bash

# Utility functions and common variables for scripts

set -euo pipefail

SCRIPT_DIR="${SCRIPT_DIR:-$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)}"
REPO_ROOT=$(cd -- "$SCRIPT_DIR/.." &> /dev/null && pwd)
LIB_PATH="lib"
LIB_PACKAGE_JSON="$REPO_ROOT/$LIB_PATH/package.json"
ROOT_PACKAGE_JSON="$REPO_ROOT/package.json"
EXAMPLES_PATH="example"

# Checks if a command is available in the system PATH
check_command() {
  echo "Checking if command '$1' is available..."

  if ! command -v "$1" > /dev/null 2>&1; then
    echo "❌ Error: Required command '$1' is not installed or not in PATH." >&2
    exit 1
  fi
}
