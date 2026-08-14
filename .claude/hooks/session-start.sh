#!/bin/bash
set -euo pipefail

# Claude Code on the web rebuilds the container each session, which resets the
# git identity to a generic default. Without this, commits made during a web
# session are authored by an address that maps to no GitHub account, so they
# show up unattributed instead of as commits from the repo owner.
#
# Local sessions already use the developer's own global git config, so this
# only runs in the remote environment.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

git -C "$CLAUDE_PROJECT_DIR" config --local user.name "Yash Nagarahalli"
git -C "$CLAUDE_PROJECT_DIR" config --local user.email "131941323+tornadofury0@users.noreply.github.com"

echo "git author set to $(git -C "$CLAUDE_PROJECT_DIR" config --local --get user.name) <$(git -C "$CLAUDE_PROJECT_DIR" config --local --get user.email)>"
