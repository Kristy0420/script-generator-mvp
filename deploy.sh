#!/bin/bash

echo "🚀 剧本生成器部署脚本"
echo "======================="
echo ""

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

echo "📦 第一步：构建项目测试"
echo "----------------------"
npm run build
if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi
echo "✅ 构建成功"
echo ""

echo "💾 第二步：提交更改到 Git"
echo "----------------------"
git add -A
echo "请输入 commit 信息（直接回车使用默认）："
read commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Update: deploy new version"
fi

git commit -m "$commit_msg"
echo "✅ Git commit 完成"
echo ""

echo "🌐 第三步：选择部署方式"
echo "----------------------"
echo "1. Vercel CLI (需要先登录: vercel login)"
echo "2. 推送到 GitHub (需要先设置 remote)"
echo "3. 只构建，稍后手动部署"
echo ""
echo -n "请选择 (1-3): "
read choice

case $choice in
    1)
        echo ""
        echo "使用 Vercel CLI 部署..."
        if ! command -v vercel &> /dev/null; then
            echo "❌ 未安装 Vercel CLI"
            echo "请运行: npm install -g vercel"
            exit 1
        fi

        echo "部署到生产环境..."
        vercel --prod
        ;;
    2)
        echo ""
        echo "推送到 GitHub..."

        # 检查是否有 remote
        if ! git remote get-url origin &> /dev/null; then
            echo "❌ 未配置 GitHub remote"
            echo "请先创建 GitHub 仓库，然后运行："
            echo "  git remote add origin https://github.com/你的用户名/script-generator-mvp.git"
            exit 1
        fi

        git push origin main
        echo "✅ 推送成功"
        echo ""
        echo "如果已连接 Vercel，会自动触发部署"
        echo "访问 https://vercel.com/dashboard 查看部署状态"
        ;;
    3)
        echo ""
        echo "✅ 构建完成，可以手动部署"
        echo ""
        echo "手动部署选项："
        echo "1. Vercel: vercel --prod"
        echo "2. 上传 .next 文件夹到服务器"
        echo "3. 使用 Docker 部署（需要 Dockerfile）"
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "🎉 完成！"
echo ""
echo "📖 查看完整部署文档: cat DEPLOYMENT.md"
