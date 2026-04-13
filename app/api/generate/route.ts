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

    const prompt = `You are an award-winning children's animation scriptwriter. Your job is to write a COMPLETE, ENGAGING STORY with real dramatic conflict, NOT just a framework.

Theme: ${theme}
Characters: ${characterList}
Words to include naturally: ${knowledgeList}

YOUR TASK: Write a 2-3 minute animated story with:

1. REAL STORY STRUCTURE (like Fresh Soup episodes):

   SETUP (30 sec): Characters doing something normal → Something specific goes wrong
   Example: "Zack is building a card tower. Emily walks by eating chips. She sneezes. Tower falls."

   CONFLICT & ATTEMPTS (60-90 sec): They try to fix it → Makes it worse → Emotional reaction → New idea
   Example: "Zack rebuilds, asks Emily to be quiet. She tiptoes, trips on toy, knocks tower again. Zack upset. Emily finds soft cloth to put under cards - it works!"

   RESOLUTION (30 sec): Success through teamwork → Feel good moment

2. DRAMATIC CONFLICT - The story NEEDS:
   - A SPECIFIC problem (not vague like "need to help", but "the egg is rolling toward the edge!")
   - Failed attempts that make things WORSE (comedy comes from escalation)
   - Emotional stakes (character really wants/needs something)
   - A clever solution that pays off earlier details

3. KNOWLEDGE POINTS INTEGRATION:
   - Use them IN THE ACTION, not as random comments
   - BAD: "Look at this!" (forced)
   - GOOD: Character naturally says "Be careful!" when egg is rolling, or "It's too heavy!" when lifting something

4. WRITE SPECIFIC ACTIONS:
   - BAD: "They work together"
   - GOOD: "Zack holds the box steady while Emily climbs on the chair to reach the top shelf"
   - BAD: "They find a solution"
   - GOOD: "Emily notices the wagon in the corner - they can use it to carry the heavy box!"

5. DIALOGUE MUST BE NATURAL:
   - Kids talk in short, simple sentences
   - Show emotion: "Oh no!" "Yes!" "Wait... I have an idea!"
   - React to what JUST happened: If ball rolls away, say "Catch it!" not "That's interesting"

EXAMPLE OF GOOD STORY BEATS:
- Zack tries to reach cookie jar on high shelf (goal established)
- Stands on chair - too short (attempt #1 fails)
- Stacks books on chair - books slide, he almost falls (attempt #2 worse!)
- Emily arrives: "Are you okay?" Zack: "I can't reach it!"
- Emily: "Wait! What if we use the broom to push it closer?"
- They work together - broom pushes jar to edge - Zack catches it
- Both celebrate with cookies

OUTPUT FORMAT (JSON only):
{
  "episodeCode": "D1P1",
  "title": "Clear title describing the story (e.g., 'The Cookie Jar Challenge')",
  "characters": [{"name": "${characters[0]?.name || 'Zack'}", "personality": "curious and determined"}],
  "knowledgePoints": [{"name": "word", "description": "natural context sentence", "repetitionCount": 2}],
  "synopsis": "具体剧情梗概（中文）：谁想做什么→遇到什么具体困难→怎么尝试→怎么变糟→最后怎么解决",
  "sceneSettings": ["【场景：具体地点，如'厨房，下午，阳光从窗户照进来'】"],
  "scenes": [
    {"order": 1, "role": "SCENE INFO", "dialogue": "SCENE 1 - Kitchen, afternoon", "visualDescription": "厨房全景，Zack站在高柜子前抬头看", "shotType": "全景", "knowledgePointUsed": false},
    {"order": 2, "role": "Zack", "dialogue": "I want that cookie!", "action": "指向高处", "visualDescription": "Zack抬头看着高架上的饼干罐", "shotType": "中景", "knowledgePointUsed": false},
    {"order": 3, "role": "Zack", "dialogue": "But it's too high!", "action": "踮脚尝试", "visualDescription": "Zack踮起脚尖，手臂伸长但够不着", "shotType": "近景", "knowledgePointUsed": true, "knowledgePointName": "too high"}
  ]
}

CRITICAL:
- Write 15-25 scene beats total
- Each scene = ONE specific action or line
- Show cause-and-effect: scene 5 happens BECAUSE of scene 4
- Include 2-3 failed attempts before success
- Use knowledge points when characters naturally express emotions or describe what they see
- End with satisfying resolution and friendship moment

Write a REAL story with REAL conflict, not a template!`;

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
