#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploying gh-pages'

git push -f git@github.com:eyturner/MazeAlgorithmVisualizer.git master:gh-pages

cd -