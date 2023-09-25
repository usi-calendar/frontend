#!/usr/bin/env sh

# add config for git
git config --global user.email "edo.riggio19@gmail.com"
git config --global user.name "Edoardo Riggio"

# abort on errors
set -e

git checkout --orphan deploy

# build
yarn run build

git --work-tree dist add .
git --work-tree dist commit -m "deploy"
git push origin HEAD:deploy --force
rm -r dist

git checkout -f main
git branch -D deploy

cd -
