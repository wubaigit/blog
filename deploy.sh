#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

yarn build

cd ./blog/.vuepress/dist
git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:wubaigit/wubai-blog.git master:gh-pages

read -p "Press any key to continue." var