# 🚀 部署指南

## 方法一：使用 Vercel CLI（推荐）

### 1. 登录 Vercel

```bash
vercel login
```

这会打开浏览器让你登录 Vercel 账号。

### 2. 部署到生产环境

```bash
vercel --prod
```

Vercel 会自动：
- 检测 Next.js 项目
- 安装依赖
- 构建项目
- 部署到生产环境
- 返回部署 URL

### 3. 设置环境变量（如果需要）

如果你想启用 AWS Bedrock AI 生成（而不是智能代码生成），需要设置环境变量：

```bash
vercel env add AWS_REGION
vercel env add ANTHROPIC_DEFAULT_SONNET_MODEL
```

或者在 Vercel Dashboard 中设置：
- 访问 https://vercel.com/dashboard
- 选择你的项目
- 进入 Settings → Environment Variables
- 添加以下变量：
  - `AWS_REGION`: us-west-2
  - `ANTHROPIC_DEFAULT_SONNET_MODEL`: 你的模型 ARN
  - `USE_MOCK`: false（如果要使用 AI）或 true（使用智能代码生成）

---

## 方法二：通过 GitHub + Vercel 网页端

### 1. 创建 GitHub 仓库

如果还没有创建 GitHub 仓库：

**选项 A - 使用命令行**（需要先安装 GitHub CLI）：
```bash
# 安装 GitHub CLI（如果未安装）
brew install gh

# 登录
gh auth login

# 创建仓库并推送
gh repo create script-generator-mvp --public --source=. --remote=origin --push
```

**选项 B - 手动创建**：
1. 访问 https://github.com/new
2. 创建新仓库（名称：script-generator-mvp）
3. 在本地添加 remote：
   ```bash
   git remote add origin https://github.com/你的用户名/script-generator-mvp.git
   git push -u origin main
   ```

### 2. 连接 Vercel

1. 访问 https://vercel.com/new
2. 点击 "Import Git Repository"
3. 选择你的 GitHub 仓库：`script-generator-mvp`
4. Vercel 会自动检测 Next.js 项目
5. 配置项目（可选）：
   - Framework Preset: Next.js（已自动检测）
   - Build Command: `npm run build`（默认）
   - Output Directory: `.next`（默认）
6. 点击 "Deploy"

### 3. 等待部署完成

Vercel 会：
- Clone 仓库
- 安装依赖（npm install）
- 构建项目（npm run build）
- 部署到全球 CDN
- 返回部署 URL（如：https://script-generator-mvp.vercel.app）

---

## 方法三：使用其他平台

### Netlify

1. 访问 https://app.netlify.com/start
2. 连接 GitHub 仓库
3. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `.next`
4. 点击 "Deploy site"

### Cloudflare Pages

1. 访问 https://dash.cloudflare.com/
2. Pages → Create a project
3. 连接 GitHub 仓库
4. 构建设置：
   - Framework preset: Next.js
   - Build command: `npx @cloudflare/next-on-pages@1`
   - Build output directory: `.vercel/output/static`

---

## 部署后测试

部署完成后，访问你的 URL 测试功能：

### 测试剧本生成

1. 填写故事主题，例如：
   - `"Help a lost puppy find its way home"`
   - `"Build a treehouse in the garden"`
   - `"Find the missing toy in the playground"`

2. 添加知识点：
   - 知识点 1：`find/found`，描述：`I found it!`，重复 3 次
   - 知识点 2：`help`，描述：`Can you help me?`，重复 2 次

3. 设置角色：
   - Michael (curious and enthusiastic)
   - Zack (nervous but brave)

4. 点击生成，检查：
   - ✅ 专业格式（场景标题、镜头类型、动作指导）
   - ✅ 中文画面描述
   - ✅ 知识点自然融入并加粗
   - ✅ 根据主题生成不同剧情（不是固定套路）

---

## 环境变量说明

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `USE_MOCK` | 是否使用智能代码生成（不调用 AI API） | `true` |
| `AWS_REGION` | AWS Bedrock 区域（如果使用 AI） | `us-west-2` |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | Claude 模型 ARN（如果使用 AI） | - |

**推荐设置**：
- 保持 `USE_MOCK=true`，使用智能代码生成（无需 API 费用，生成速度快）
- 如果需要更自由的 AI 创作，设置 `USE_MOCK=false` 并配置 AWS 凭证

---

## 故障排除

### 1. 构建失败

**错误**：`Module not found: Can't resolve...`

**解决**：
```bash
# 清理缓存
rm -rf .next node_modules
npm install
npm run build
```

### 2. 部署成功但页面白屏

**原因**：环境变量或 API 路由问题

**检查**：
1. 查看 Vercel/Netlify 的部署日志
2. 检查浏览器控制台错误
3. 确认 API 路由路径正确（`/api/generate`）

### 3. 知识点未加粗

**原因**：知识点描述格式问题

**解决**：
- 确保知识点描述是完整句子，如 `"I found it!"` 而不是 `"found"`
- 描述会在对话中匹配并加粗

---

## 更新部署

### Vercel CLI
```bash
git add .
git commit -m "Update script"
vercel --prod
```

### GitHub + Vercel（自动部署）
```bash
git add .
git commit -m "Update script"
git push
```
Vercel 会自动检测推送并重新部署。

---

## 性能优化建议

1. **启用 Edge Functions**（Vercel）：
   - API 路由会自动使用 Edge Runtime，响应更快

2. **静态优化**：
   - 页面已设置为客户端渲染（'use client'），无需 SSR

3. **缓存策略**：
   - 剧本生成无需缓存（每次都是新内容）
   - 静态资源自动缓存

---

## 成本说明

### 当前配置（USE_MOCK=true）
- **完全免费**
- 使用智能代码生成，无 API 调用
- Vercel 免费套餐足够使用

### 如果启用 AI（USE_MOCK=false）
- 需要 AWS Bedrock 账号
- 按 API 调用计费
- 预计每次生成约 $0.01-0.05

---

**部署完成后，记得测试所有功能！**

🎉 祝部署顺利！
