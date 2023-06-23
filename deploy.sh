# #!/usr/bin/env sh

# # Abort on errors
# set -e

# # Remove existing app directory
# rm -rf dist

# # Build new app directory
# yarn run build
# cd dist

# # Init new git repository and commit to master branch
# git init
# git add -A
# git commit -m 'deploy'
# git push -f git@github.com:slatron/setlist-manager.git master:gh-pages

# # Restore main branch and directory
# cd ..
# git checkout main

#!/usr/bin/env sh

# Abort on errors
set -e

# checkout to the gh-pages, reset
# and sync the branch with our main
# change here to master if you need
git checkout gh-pages
git reset --hard origin/main

# install dependencies and create
# the react app build
npm run build

# delete everything on the directory
# except the dist folder
find * -maxdepth 0 -name 'dist' -prune -o -exec rm -rf '{}' ';'

# move the dist folder content
# to the repository root
mv ./dist/* .

# deletes the git cache and push
# the new content to gh-pages
git rm -rf --cache .
git add .
git commit -m "deploy"

git push origin gh-pages --force

# go back to main
git checkout main

## reinstall deps on main branch
npm install
