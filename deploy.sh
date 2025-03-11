#!/usr/bin/env sh

# Abort on errors
set -e

# Remove existing app directory
rm -rf dist

# Build new app directory
yarn run build
cd dist

# Init new git repository and commit to master branch
git init
git add . -A
git commit -m 'deploy'
# git push -f git@github.com:slatron/setlist-manager.git master:gh-pages
git push origin :gh-pages
git subtree push --prefix dist origin gh-pages

# Restore main branch and directory
cd ..
git checkout main
