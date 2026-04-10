# 🚀 快速配置指南

## ✅ 已完成配置

你的项目已经配置完成！因为你使用的是公司的 Claude Code，所以：

1. ✅ **AWS Bedrock 已配置** - 自动使用系统环境变量
2. ✅ **Claude API 可用** - 使用 Sonnet 4.6 模型
3. ✅ **无需 API Key** - 直接使用 AWS 凭证

## 🎬 立即开始使用

### 启动项目

```bash
npm run dev
```

### 访问应用

打开浏览器：**http://localhost:3000**

### 测试生成

填写表单示例：

```
知识点名称：咖啡冲泡技巧
详细描述：介绍手冲咖啡的基本方法
关键词：咖啡豆, 研磨, 水温
难度级别：入门
复现次数：3
主持人：小李（热情友善）
嘉宾：咖啡师王老师（专业耐心）
```

点击"✨ 生成剧本"，等待 10-30 秒。

---

## 🔧 技术配置说明

### 使用的模型

- **默认模型**：Claude Sonnet 4.6
- **ARN**：`arn:aws:bedrock:us-west-2:027950631154:application-inference-profile/5dews3o6kky6`
- **区域**：us-west-2

### 环境变量

项目自动读取以下环境变量：

```bash
# 从你的系统环境自动获取
ANTHROPIC_DEFAULT_SONNET_MODEL
ANTHROPIC_DEFAULT_OPUS_MODEL
ANTHROPIC_DEFAULT_HAIKU_MODEL
AWS_REGION
```

### 代码结构

```
app/
├── api/
│   └── generate/
│       └── route.ts          # API 端点（使用 AWS Bedrock）
└── page.tsx                  # 前端页面
```

---

## 📝 配置文件说明

### .env.local

当前配置：

```env
# AWS Bedrock 配置
# 使用系统环境变量中的 AWS 凭证和 Bedrock 模型
# 无需额外配置，会自动使用 AWS_REGION 和 ANTHROPIC_DEFAULT_SONNET_MODEL
```

**无需修改此文件！**

---

## 🐛 常见问题

### Q1: 生成时报错 "AWS credentials not found"

**A**: 确认你的 AWS 凭证已配置：
```bash
env | grep AWS
```

### Q2: 模型调用失败

**A**: 检查模型 ARN 是否正确：
```bash
echo $ANTHROPIC_DEFAULT_SONNET_MODEL
```

### Q3: 想切换到其他 Claude 模型

**A**: 修改 `app/api/generate/route.ts` 第 56 行：
```typescript
// 改为 Opus
const modelId = process.env.ANTHROPIC_DEFAULT_OPUS_MODEL;

// 或改为 Haiku
const modelId = process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL;
```

---

## 🔄 切换到 Anthropic API（可选）

如果你想使用 Anthropic API 而不是 AWS Bedrock：

### 步骤 1: 获取 API Key

访问：https://console.anthropic.com/settings/keys

### 步骤 2: 配置环境变量

编辑 `.env.local`：
```env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
```

### 步骤 3: 修改代码

编辑 `app/api/generate/route.ts`，改回使用 Anthropic SDK：

```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ... 后续代码也要相应修改
```

---

## 📊 性能监控

### 查看请求日志

开发服务器会在终端显示每次 API 调用的日志。

### 监控 AWS 使用

访问 AWS CloudWatch 查看 Bedrock 调用情况。

---

## 🎉 下一步

1. **测试功能** - 填写表单，生成第一个剧本
2. **调整样式** - 修改 Tailwind CSS 类
3. **优化 Prompt** - 编辑 `route.ts` 中的提示词
4. **添加功能** - 导出、编辑、历史记录等

---

**配置完成！开始创作吧！** 🚀
