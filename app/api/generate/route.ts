import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { NextRequest, NextResponse } from 'next/server';
import { generateIntelligentScript } from './intelligent-script-engine';
import { formatFullScript } from './script-formatter';

// 使用 AWS Bedrock
const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || 'us-west-2',
});

// Mock 模式开关 - 设置为 true 使用模拟数据
const USE_MOCK = process.env.USE_MOCK === 'true' || true; // 使用智能代码生成（不调用 AI API）

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

    // 如果启用 Mock 模式，使用智能代码生成
    if (USE_MOCK) {
      console.log('Using Intelligent Script Engine - Theme-based unique story generation');
      const rawScript = generateIntelligentScript(
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

    const prompt = `You are a professional scriptwriter for children's English teaching animations. Create an original, creative story based on the theme. DO NOT copy the plot from "Fresh Soup" or use固定套路.

Theme: ${theme}

Characters:
${characterList}

Learning Points (must appear naturally in dialogue):
${knowledgeList}

CRITICAL REQUIREMENTS:

1. **Create ORIGINAL plot** based on the theme
   - Analyze the theme and create a unique story
   - DO NOT use "accident→fix→worse→share" template
   - Each theme should have different plot structure
   - Be creative and unexpected

2. **Professional script format** (按照教学剧本规范):
   - Each scene needs: scene header, shot type, character actions
   - Shot types: 大景别, 全景, 中景, 近景, 特写, 推镜头, 跟镜头
   - Character dialogue format: **Name**: (action) dialogue
   - Knowledge points in **bold** when used
   - Include Chinese visual descriptions for each shot

3. **Natural knowledge integration**:
   - Knowledge points must fit the story context
   - Use them in dialogue naturally, not forced
   - Repeat as specified, but in different situations

4. **Story quality**:
   - Clear cause-and-effect logic
   - Interesting character interactions
   - Appropriate humor for children
   - Satisfying resolution

Output in this JSON format:
{
  "episodeCode": "D1P1",
  "title": "Story Title",
  "characters": [{"name": "Name", "personality": "描述"}],
  "knowledgePoints": [{"name": "word", "description": "usage", "repetitionCount": 2}],
  "synopsis": "剧情梗概（100-200字，中文）",
  "sceneSettings": ["【场景设定：描述】"],
  "scenes": [
    {
      "order": 1,
      "role": "SCENE INFO" | "CAMERA" | "Character Name" | "All Together",
      "dialogue": "English dialogue or camera direction",
      "action": "表情/动作" (for character lines),
      "visualDescription": "中文画面描述",
      "shotType": "镜头类型",
      "audioNote": "音效/音乐" (optional),
      "knowledgePointUsed": true/false,
      "knowledgePointName": "知识点名称" (if used)
    }
  ]
}

Remember: Be CREATIVE! Each theme deserves its own unique story structure!`;

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
        knowledgePoint: knowledgePoint.name,
        difficulty,
        repetitionCount,
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
