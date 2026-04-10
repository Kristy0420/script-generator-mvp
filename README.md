# 🎬 AI 剧本生成器 MVP

一个基于 Next.js 和 Claude API 的智能剧本生成工具，帮助内容创作者快速生成高质量对话脚本。

## ✨ 功能特点

- 📝 **结构化输入**：支持知识点、关键词、背景信息的详细配置
- 🎭 **角色定制**：自定义主持人和嘉宾的名称及性格特点
- 🔄 **知识点复现**：可设置知识点在剧本中出现的次数（1-10次）
- 🎨 **难度自定义**：支持自定义难度级别标签
- 🤖 **AI 智能生成**：使用 Claude Sonnet 4.6 模型生成创意对话
- 📋 **一键复制**：快速复制生成的剧本到剪贴板
- 💡 **知识点高亮**：自动标记包含知识点的对话

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 Claude API

**本项目已配置为使用 AWS Bedrock**，无需额外配置 API Key！

项目会自动使用系统环境变量中的：
- `AWS_REGION` - AWS 区域
- `ANTHROPIC_DEFAULT_SONNET_MODEL` - Claude 模型 ARN

如果你的环境没有配置 AWS Bedrock，可以改用 Anthropic API：
1. 获取 API Key：https://console.anthropic.com/settings/keys
2. 编辑 `.env.local` 文件：
   ```env
   ANTHROPIC_API_KEY=sk-ant-xxx
   ```
3. 修改 `app/api/generate/route.ts` 使用 Anthropic SDK

### 3. 启动开发服务器

```bash
npm run dev
```

打开浏览器访问：http://localhost:3000

## 📖 使用说明

### 步骤 1：填写知识点信息

- **知识点名称**（必填）：例如"如何制作咖啡"
- **详细描述**（可选）：补充知识点的详细信息
- **关键词**（可选）：用逗号分隔，如"咖啡豆, 研磨, 冲泡"
- **背景信息**（可选）：提供额外的背景资料

### 步骤 2：配置参数

- **难度级别**（必填）：自定义标签，如"入门"、"中级"、"专业"
- **复现次数**：使用滑块选择知识点出现的次数（1-10）

### 步骤 3：设置角色

- **主持人姓名**（必填）：例如"小明"
- **主持人性格**（可选）：例如"专业、友善"
- **嘉宾姓名**（必填）：例如"小红"
- **嘉宾性格**（可选）：例如"热情、专业"

### 步骤 4：生成剧本

点击"✨ 生成剧本"按钮，等待 AI 创作完成（通常需要 10-30 秒）。

### 步骤 5：使用生成的剧本

- 📋 **复制剧本**：一键复制全部内容到剪贴板
- 🔄 **重新生成**：对结果不满意？点击重新生成按钮
- 💡 **查看标记**：黄色高亮的对话包含知识点

## 🎨 示例输入

### 示例 1：咖啡制作教程

```
知识点名称：手冲咖啡的技巧
详细描述：介绍手冲咖啡的水温、研磨度、冲泡时间等关键要素
关键词：手冲, 水温, 研磨度, 萃取
难度级别：入门
复现次数：3
主持人：小李（专业、耐心）
嘉宾：咖啡师小王（热情、专业）
```

### 示例 2：编程概念讲解

```
知识点名称：什么是闭包
详细描述：JavaScript 中闭包的概念和应用场景
关键词：闭包, 作用域, 函数, 变量
难度级别：中级
复现次数：5
主持人：主持人张三（活泼、善于提问）
嘉宾：工程师李四（严谨、善于举例）
```

## 🏗️ 技术栈

- **框架**：Next.js 16 (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **AI**：Claude Sonnet 4.6 (via Anthropic SDK)
- **部署**：支持 Vercel 一键部署

## 📁 项目结构

```
script-generator-mvp/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts      # API 端点：剧本生成
│   ├── page.tsx              # 主页面：表单和展示
│   └── layout.tsx            # 布局组件
├── .env.local                # 环境变量（API Key）
├── package.json              # 项目配置
└── README.md                 # 说明文档
```

## 🔧 API 接口

### POST /api/generate

生成剧本的 API 端点。

**请求体**：

```json
{
  "knowledgePoint": {
    "name": "知识点名称",
    "description": "详细描述",
    "keywords": ["关键词1", "关键词2"],
    "backgroundInfo": "背景信息"
  },
  "difficulty": "难度级别",
  "repetitionCount": 3,
  "roles": {
    "host": {
      "name": "主持人姓名",
      "personality": "性格特点"
    },
    "guest": {
      "name": "嘉宾姓名",
      "personality": "性格特点"
    }
  }
}
```

**响应**：

```json
{
  "success": true,
  "script": {
    "title": "剧本标题",
    "scenes": [
      {
        "order": 1,
        "role": "角色名",
        "dialogue": "对话内容",
        "knowledgePointUsed": false
      }
    ]
  },
  "metadata": {
    "knowledgePoint": "知识点名称",
    "difficulty": "难度级别",
    "repetitionCount": 3,
    "generatedAt": "2026-04-10T12:00:00.000Z"
  }
}
```

## 🚧 下一步优化方向

这是一个 MVP 版本，后续可以添加：

- ✅ 数据库存储（保存生成历史）
- ✅ 用户认证（多用户支持）
- ✅ 导出功能（PDF、Word、TXT）
- ✅ 在线编辑（手动修改对话）
- ✅ 模板系统（预设场景模板）
- ✅ 更多角色（支持3人以上对话）
- ✅ 流式输出（实时显示生成进度）

## 📝 注意事项

1. **API Key 安全**：不要将 API Key 提交到版本控制系统
2. **成本控制**：Claude API 按 token 计费，建议设置使用限额
3. **生成时间**：复杂剧本可能需要 20-40 秒生成时间
4. **浏览器兼容**：建议使用现代浏览器（Chrome, Firefox, Safari）

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**制作时间**：2026-04-10  
**技术支持**：Claude Opus 4.6
