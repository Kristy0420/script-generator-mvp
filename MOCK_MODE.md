# 🎭 Mock 模式说明

## 当前状态

✅ **Mock 模式已启用** - 项目当前使用模拟数据生成剧本

## 为什么使用 Mock 模式？

在测试时遇到了地区限制问题：
```
Access to Anthropic models is not allowed from unsupported countries, 
regions, or territories.
```

Mock 模式允许你：
- ✅ 测试完整的用户界面
- ✅ 验证数据流程
- ✅ 体验所有功能（复制、重新生成等）
- ✅ 快速迭代开发（无需等待 API 响应）

## Mock 数据特点

生成的模拟剧本包含：
- 16 轮对话（固定结构）
- 知识点自动重复指定次数
- 包含开场、介绍、讨论、总结等完整流程
- 自动标记包含知识点的对话

## 如何切换到真实 API？

### 方法 1：环境变量控制

编辑 `.env.local` 文件，添加：
```env
USE_MOCK=false
```

### 方法 2：修改代码

编辑 `app/api/generate/route.ts` 第 11 行：
```typescript
// 改为 false 关闭 Mock 模式
const USE_MOCK = process.env.USE_MOCK === 'true' || false;
```

## 解决地区限制问题

如果你想使用真实的 Claude API，可能需要：

### 选项 1: 使用 VPN
- 连接到支持的地区（美国、英国等）
- 查看支持地区列表：https://www.anthropic.com/supported-countries

### 选项 2: 使用代理
在 AWS Bedrock 配置中添加代理设置。

### 选项 3: 切换到其他部署
- 如果有其他地区的 AWS Bedrock 访问权限
- 或使用 Anthropic 直接 API（需要在支持地区）

### 选项 4: 继续使用 Mock 模式
- 适合界面开发和功能测试
- 无需等待 API 响应，开发效率更高
- 可以自定义 `mock.ts` 中的对话模板

## 测试 Mock 模式

### 通过 API 测试

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "knowledgePoint": {
      "name": "测试知识点",
      "keywords": ["关键词1", "关键词2"]
    },
    "difficulty": "入门",
    "repetitionCount": 3,
    "roles": {
      "host": {"name": "主持人", "personality": "友善"},
      "guest": {"name": "嘉宾", "personality": "专业"}
    }
  }'
```

### 通过浏览器测试

1. 访问 http://localhost:3000
2. 填写表单
3. 点击"生成剧本"
4. 查看结果（响应时间 < 1 秒）

## 自定义 Mock 数据

编辑 `app/api/generate/mock.ts` 可以自定义：
- 对话模板
- 开场白变体
- 知识点插入方式
- 对话轮次数量

## 性能对比

| 模式 | 响应时间 | 成本 | 内容质量 |
|------|---------|------|---------|
| Mock | < 1 秒 | 免费 | 固定模板 |
| Real API | 10-30 秒 | 按 token 计费 | AI 生成，更自然 |

## 常见问题

### Q: Mock 数据会影响真实 API 吗？
A: 不会，两者完全独立。切换模式后立即生效。

### Q: 如何知道当前使用的是哪种模式？
A: 查看 API 返回的 `metadata.mode` 字段：
- `"mode": "mock"` = Mock 模式
- `"mode": "ai"` = 真实 API

### Q: Mock 数据的质量如何？
A: 足够用于界面测试和流程验证，但不如真实 AI 生成的自然流畅。

### Q: 可以同时测试两种模式吗？
A: 可以！通过环境变量动态切换，无需重启服务器。

---

## 下一步

1. **继续开发** - 使用 Mock 模式完善界面和功能
2. **解决地区限制** - 配置 VPN 或代理
3. **测试真实 API** - 解决后切换到真实模式
4. **优化 Mock 数据** - 根据需要自定义模板

---

**当前测试结果**：✅ Mock 模式工作正常，可以正常生成剧本！
