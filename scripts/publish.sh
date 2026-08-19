#!/usr/bin/env bash
# Rebuild the site and update the deploy branch.
#
# Hostinger's Git deployment clones a repository into the web root and does not
# run a build: shared hosting has no Node. So the branch it pulls from has to
# contain the built site at its root, which is what this produces. main keeps the
# source; deploy keeps the output of `vite build` and nothing else.
#
# Usage:  bash scripts/publish.sh
set -euo pipefail

BRANCH=deploy
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORK="$(mktemp -d)"

cd "$ROOT"
echo "==> building"
npm run build

echo "==> refreshing $BRANCH from dist/"
git worktree add --detach "$WORK" >/dev/null
cd "$WORK"
if git show-ref --quiet "refs/remotes/origin/$BRANCH"; then
  git checkout -q -B "$BRANCH" "origin/$BRANCH"
  git rm -rq --cached . >/dev/null
  find . -mindepth 1 -maxdepth 1 -not -name .git -exec rm -rf {} +
else
  git checkout -q --orphan "$BRANCH"
  git rm -rq --cached . >/dev/null 2>&1 || true
fi

cp -a "$ROOT/dist/." .
# .gitattributes travels with the branch so the server's checkout keeps LF
# endings; a CRLF .htaccess can 500 on Apache.
cp -a "$ROOT/.gitattributes" .
git add -A
git commit -qm "Build from $(git -C "$ROOT" rev-parse --short HEAD)" || echo "    nothing changed"
git push -q -u origin "$BRANCH"

cd "$ROOT"
git worktree remove --force "$WORK"
echo "==> $BRANCH pushed. Hostinger pulls this branch."
