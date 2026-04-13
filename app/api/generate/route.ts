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

    const prompt = `You are an award-winning children's animation scriptwriter. Write a COMPLETE story with real plot and natural dialogue.

Theme: ${theme}
Characters: ${characterList}
Knowledge Points to integrate: ${knowledgeList}

STEP 1: ANALYZE THE KNOWLEDGE POINTS
Look at each word/phrase and think: "What story situations would make this word appear NATURALLY?"

Examples:
- "heavy" → story about moving/carrying something large
- "careful" → story with something fragile or a tricky situation
- "delicious" → story involving food or cooking
- "together" → story where cooperation is needed

STEP 2: DESIGN A PLOT THAT CREATES NATURAL CONTEXTS FOR THESE WORDS
Don't force the words into a generic story. Instead, craft a story where these words would be the OBVIOUS things characters would say.

Example: If words are "heavy", "careful", "together"
Good plot: Two kids need to move a big box of toys upstairs
- "This box is heavy!" (naturally said when lifting)
- "Be careful on the stairs!" (naturally said in dangerous moment)
- "Let's carry it together!" (natural solution)

Bad plot: Kids playing in park randomly say these words

STEP 3: WRITE THE COMPLETE STORY
Follow natural story logic (Fresh Soup style):
- Clear goal (what do characters want?)
- Obstacles (what gets in the way?)
- Attempts (how do they try? what happens?)
- Resolution (how does it work out?)

The number of attempts, conflicts, twists should depend on:
- How many knowledge points need to be used
- What makes sense for THIS specific story
- Natural dramatic pacing

DIALOGUE RULES:
✓ Short, kid-friendly sentences
✓ React to what JUST happened visually
✓ Express emotions: "Oh no!" "Wow!" "Yes!"
✓ Use knowledge points when describing/reacting to situations
✗ Don't randomly announce words
✗ Don't have characters explain things unnecessarily

SPECIFIC ACTIONS (not vague):
✗ Bad: "They work together"
✓ Good: "Zack holds the door open while Emily pushes the bike through"

✗ Bad: "They solve the problem"
✓ Good: "Emily spots the rope hanging from the tree - they can use it to pull the ball down!"

OUTPUT FORMAT (JSON only):
{
  "episodeCode": "D1P1",
  "title": "Story title reflecting the actual plot",
  "characters": [{"name": "Name", "personality": "personality"}],
  "knowledgePoints": [{"name": "word", "description": "how it's used in story", "repetitionCount": 2}],
  "synopsis": "完整剧情梗概（中文）：谁想做什么具体的事→遇到什么具体问题→怎么解决（体现知识点使用情境）",
  "sceneSettings": ["【场景：具体描述地点、时间、氛围】"],
  "scenes": [
    {"order": 1, "role": "SCENE INFO", "dialogue": "Scene description", "visualDescription": "具体画面描述", "shotType": "全景/中景/近景等", "knowledgePointUsed": false},
    {"order": 2, "role": "Character Name", "dialogue": "Natural English dialogue", "action": "具体动作/表情", "visualDescription": "画面中看到什么", "shotType": "镜头类型", "knowledgePointUsed": true, "knowledgePointName": "word"},
    ... (continue with 15-25 scenes total)
  ]
}

KEY PRINCIPLES:
1. Story structure should SERVE the knowledge points, not fight them
2. Let plot length and complexity emerge naturally from the story needs
3. Each knowledge point repetition should happen in a DIFFERENT situation that makes sense
4. Comedy and drama come from CHARACTER reactions to specific situations
5. End when the story naturally concludes, not at a fixed length

Think: "If I were a kid watching this, would the dialogue feel natural? Would I understand why characters say what they say?"

Write a story where the knowledge points feel inevitable, not inserted.`;

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
