#!/bin/bash
set -o errexit

echo "删除out目录"
rm -rf out

echo "开始构建web项目"
cd web

if ! npm run build; then
    echo "web打包构建失败"
    exit 1
fi

cd ../
cd docs
echo "开始构建docs项目"

if ! npm run docs:build; then
    echo "docs打包构建失败"
    exit 1
fi

cd ../
echo "构建插件out目录"
if ! tsc -p ./; then
    echo "插件构建失败"
    exit 1
fi

echo "插件编译完成"
