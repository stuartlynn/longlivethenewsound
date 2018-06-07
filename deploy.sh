#!/bin/bash

git checkout deploy
git merge --commit --no-edit master
cd client
yarn build
cd ../
git add client/build
git commit -m "new deploy at $(date)"
git push --force heroku deploy:master
git checkout master
