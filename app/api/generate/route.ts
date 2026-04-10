import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { NextRequest, NextResponse } from 'next/server';
import { generateCompliantStory } from './compliant-story-engine';
import { formatFullScript } from './script-formatter';

// 使用 AWS Bedrock
const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || 'us-west-2',
});

// Mock 模式开关 - 设置为 true 使用模拟数据
const USE_MOCK = process.env.USE_MOCK === 'true' || false; // 使用 AI 生成（调用 Claude API）

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { theme, knowledgePoints, difficulty, characters } = body;

    // 验证输入
    if (!theme || !knowledgePoints || knowledgePoints.length === 0 || !characters || characters.length < 2) {
      return NextResponse.json(
        { error: 'Missing required parameters: need theme, knowledge points, and at least 2 characters' },
        { status: 400 }
      );
    }

    // 如果启用 Mock 模式，使用符合规范的故事引擎
    if (USE_MOCK) {
      console.log('Using Compliant Story Engine - Full compliance with children animation standards');
      const rawScript = generateCompliantStory(
        theme,
        knowledgePoints,
        difficulty,
        characters
      );

      // 格式化剧本，添加中文画面描述
      const formattedScript = formatFullScript(rawScript);

      return NextResponse.json({
        success: true,
        script: formattedScript,
        metadata: {
          theme,
          difficulty,
          generatedAt: new Date().toISOString(),
          mode: 'intelligent',
        },
      });
    }

    // 构建 AI prompt（儿童动画轻喜剧）
    const characterList = characters.map((c: any) =>
      `- ${c.name}${c.personality ? ` (personality: ${c.personality})` : ''}`
    ).join('\n');

    const knowledgeList = knowledgePoints.map((k: any) =>
      `- "${k.name}"${k.description ? `: ${k.description}` : ''} (mention ${k.repetitionCount} times naturally)`
    ).join('\n');

    const prompt = `You are a professional scriptwriter for children's English teaching animations (ages 3-8). Create an original, engaging story based on the theme. Reference "Fresh Soup" for comedy techniques and fun atmosphere, but DO NOT copy plots or use fixed templates.

Theme: ${theme}

Characters:
${characterList}

Learning Points (must appear naturally in dialogue):
${knowledgeList}

CRITICAL COMPLIANCE STANDARDS FOR CHILDREN'S ANIMATION:

1. **单一因果链 (Single Causal Chain: A→B→C)**
   - Story MUST have clear A→B→C structure
   - A: 具体的初始状态/问题 (specific, visible initial state/problem)
   - B: 因为A导致的第一个后果 (first consequence caused by A)
   - C: 因为B导致的最终结果 (final result caused by B)
   - 统一的核心目标 (unified core goal throughout)
   - NO parallel plots, NO subplots, ONE clear storyline only

2. **行为逻辑 (Behavior Logic)**
   - EVERY character action MUST have a visible trigger from previous scene
   - Format: Trigger (already established) → Action (visible) → Consequence (clear)
   - 可见的动机 (visible motivation): Children must understand WHY without explanation
   - NO sudden decisions, NO unexplained behaviors
   - Build on previously established information only

3. **视听表达 (Audio-Visual Expression)**
   - 开场即可看懂 (Opening scene must be clear without sound)
   - 关键动作有过程 (Key actions must show complete process, not just result)
   - 1秒能定位焦点 (Focus point visible within 1 second)
   - 静音也能看懂 (Story understandable even on mute)
   - Use shot types effectively: 大景别, 全景, 中景, 近景, 特写, 推镜头, 跟镜头

4. **安全与价值观 (Safety & Values)**
   - 无可模仿危险 (NO imitable dangerous actions)
   - 正向行为获益 (Positive behaviors lead to success)
   - 无工具直接解决 (NO magical tools solving everything instantly)
   - 重视过程而非速成 (Emphasize process, not shortcuts)
   - Teach: observation, thinking, cooperation, patience

5. **Natural Knowledge Integration**
   - Knowledge points must fit story context perfectly
   - Use in dialogue naturally, never forced
   - Repeat as specified, but in different meaningful situations
   - Children should learn without noticing they're being taught

6. **Story Quality (Fresh Soup style)**
   - Fun, light comedy atmosphere
   - Natural character interactions with humor
   - Unexpected but logical plot developments
   - Satisfying resolution that completes the causal chain

STRICT FORMAT - Output ONLY valid JSON:
{
  "episodeCode": "D1P1",
  "title": "Story Title (English)",
  "characters": [{"name": "Name", "personality": "personality description"}],
  "knowledgePoints": [{"name": "word/phrase", "description": "natural usage", "repetitionCount": 2}],
  "synopsis": "剧情梗概（中文，100-200字，必须体现A→B→C因果链）",
  "sceneSettings": ["【场景设定：specific location and atmosphere】"],
  "scenes": [
    {
      "order": 1,
      "role": "SCENE INFO" | "CAMERA" | "Character Name",
      "dialogue": "English dialogue or camera direction",
      "action": "表情/动作" (for character lines),
      "visualDescription": "中文画面描述（必须具体、可视、符合前文逻辑）",
      "shotType": "镜头类型",
      "audioNote": "音效/音乐" (optional),
      "knowledgePointUsed": true/false,
      "knowledgePointName": "知识点名称" (if used)
    }
  ]
}

BEFORE writing each scene, verify:
- Does this action have a trigger from previous scene?
- Is the motivation visible to children?
- Does this advance the A→B→C causal chain?
- Is this safe and educational?

Remember: Children's animation is NOT about teaching, it's about storytelling that naturally contains learning!`;

    // 调用 AWS Bedrock Claude API
    const modelId = process.env.ANTHROPIC_DEFAULT_SONNET_MODEL ||
                    'arn:aws:bedrock:us-west-2:027950631154:application-inference-profile/5dews3o6kky6';

    const command = new InvokeModelCommand({
      modelId,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    // 提取生成的内容
    const content = responseBody.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    // 解析 JSON
    let scriptData;
    try {
      // 尝试提取 JSON（可能有前后文字）
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      scriptData = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('Parse error:', parseError);
      return NextResponse.json(
        { error: 'AI 返回格式错误', rawText: content.text },
        { status: 500 }
      );
    }

    // 返回生成的剧本
    return NextResponse.json({
      success: true,
      script: scriptData,
      metadata: {
        theme,
        difficulty,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Generate script error:', error);
    return NextResponse.json(
      { error: error.message || '生成失败，请重试' },
      { status: 500 }
    );
  }
}
