#!/bin/bash

echo "🌐 推送代码到 GitHub"
echo "===================="
echo ""

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

echo "请输入你的 GitHub 仓库 URL："
echo "例如: https://github.com/你的用户名/script-generator-mvp.git"
echo -n "URL: "
read repo_url

if [ -z "$repo_url" ]; then
    echo "❌ 错误：未输入仓库 URL"
    exit 1
fi

echo ""
echo "📝 添加 remote..."
git remote add origin "$repo_url" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "⚠️  remote 已存在，更新 URL..."
    git remote set-url origin "$repo_url"
fi

echo "✅ Remote 设置完成"
echo ""

echo "🔄 推送到 GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📖 下一步：连接 Vercel"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "1️⃣ 访问: https://vercel.com/new"
    echo ""
    echo "2️⃣ 点击 'Import Git Repository'"
    echo ""
    echo "3️⃣ 选择你的仓库: script-generator-mvp"
    echo ""
    echo "4️⃣ 配置（通常自动检测，直接点 Deploy）："
    echo "   - Framework: Next.js ✅"
    echo "   - Root Directory: ./"
    echo "   - Build Command: npm run build"
    echo "   - Output Directory: .next"
    echo ""
    echo "5️⃣ 点击 'Deploy' 按钮"
    echo ""
    echo "6️⃣ 等待部署完成（约 2-3 分钟）"
    echo ""
    echo "🎉 完成后你会得到一个 URL，例如："
    echo "   https://script-generator-mvp.vercel.app"
    echo ""
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "可能的原因："
    echo "1. GitHub 仓库 URL 错误"
    echo "2. 没有 GitHub 访问权限"
    echo "3. 需要先登录 GitHub"
    echo ""
    echo "解决方法："
    echo "1. 检查 URL 是否正确"
    echo "2. 确保已登录 GitHub（使用 SSH 或 HTTPS）"
    echo "3. 如果使用 HTTPS，可能需要输入 GitHub 用户名和密码/Token"
    echo ""
    echo "或者手动推送："
    echo "  git remote add origin $repo_url"
    echo "  git push -u origin main"
fi
