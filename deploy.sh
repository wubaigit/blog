#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git init
git add -A
git commit -m 'init'

git config --local user.name "{name}"
git config --local user.email {email}

git push -f git@github.com:wubaigit/wubai-blog.git master

cd -