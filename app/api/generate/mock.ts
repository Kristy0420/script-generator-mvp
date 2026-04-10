// Mock 数据生成器 - 用于测试和演示（英文教学动画）

interface KnowledgePoint {
  name: string;
  description?: string;
  keywords?: string[];
  backgroundInfo?: string;
}

interface Character {
  name: string;
  personality?: string;
}

export function generateMockScript(
  knowledgePoint: KnowledgePoint,
  difficulty: string,
  repetitionCount: number,
  characters: Character[]
) {
  const { name: kpName } = knowledgePoint;
  const charNames = characters.map(c => c.name);

  // 英文对话模板库
  const openings = [
    `Hey everyone! Welcome to today's lesson about ${kpName}.`,
    `Hello! I'm excited to learn about ${kpName} with all of you.`,
    `Good morning! Let's explore ${kpName} together today.`,
  ];

  const greetings = [
    `Hi! Nice to meet you all.`,
    `Hello everyone! Ready to learn something new?`,
    `Hey there! This is going to be fun.`,
  ];

  const questions = [
    `Can you explain what ${kpName} means?`,
    `I'm curious about ${kpName}. Can you tell us more?`,
    `What's special about ${kpName}?`,
  ];

  // 生成包含知识点的英文对话
  const knowledgeDialogues: any[] = [];
  for (let i = 0; i < repetitionCount; i++) {
    const variations = [
      `Let me tell you about ${kpName}. It's a ${difficulty} level topic that we'll explore together.`,
      `${kpName} is really important to understand. Let me explain why.`,
      `When we talk about ${kpName}, there are a few key things to remember.`,
      `${kpName} might seem difficult at first, but it's actually quite interesting!`,
      `I want to emphasize the importance of ${kpName} in our learning.`,
    ];

    knowledgeDialogues.push({
      speaker: charNames[i % charNames.length],
      text: variations[i % variations.length],
      hasKnowledge: true,
    });
  }

  // 构建完整对话（英文教学动画）
  const scenes: any[] = [];
  let order = 1;

  // 1. 开场（第一个角色）
  scenes.push({
    order: order++,
    role: charNames[0],
    dialogue: openings[Math.floor(Math.random() * openings.length)],
    knowledgePointUsed: false,
  });

  // 2. 其他角色打招呼
  for (let i = 1; i < charNames.length; i++) {
    scenes.push({
      order: order++,
      role: charNames[i],
      dialogue: greetings[i % greetings.length],
      knowledgePointUsed: false,
    });
  }

  // 3. 切入主题
  scenes.push({
    order: order++,
    role: charNames[0],
    dialogue: `So, today we're going to learn about ${kpName}. Who wants to start?`,
    knowledgePointUsed: true,
  });

  // 4. 插入知识点对话
  knowledgeDialogues.forEach((kd, idx) => {
    scenes.push({
      order: order++,
      role: kd.speaker,
      dialogue: kd.text,
      knowledgePointUsed: kd.hasKnowledge,
    });

    // 在知识点之间插入互动对话
    if (idx < knowledgeDialogues.length - 1) {
      const interactions = [
        `Oh, that's really interesting!`,
        `I see! That makes sense now.`,
        `Can you tell us more about that?`,
        `Wow, I didn't know that!`,
        `This is so helpful!`,
      ];

      const nextSpeaker = charNames[(idx + 1) % charNames.length];
      scenes.push({
        order: order++,
        role: nextSpeaker,
        dialogue: interactions[idx % interactions.length],
        knowledgePointUsed: false,
      });
    }
  });

  // 5. 深入讨论（使用关键词）
  const keywords = knowledgePoint.keywords || [];
  if (keywords.length > 0 && charNames.length >= 2) {
    scenes.push({
      order: order++,
      role: charNames[1],
      dialogue: `You mentioned "${keywords[0]}". Can you explain that?`,
      knowledgePointUsed: false,
    });

    scenes.push({
      order: order++,
      role: charNames[0],
      dialogue: `Sure! "${keywords[0]}" is an important part of ${kpName}. It helps us understand the concept better.`,
      knowledgePointUsed: false,
    });
  }

  // 6. 实践建议
  scenes.push({
    order: order++,
    role: charNames[charNames.length > 2 ? 2 : 1] || charNames[0],
    dialogue: `What advice do you have for beginners learning about ${kpName}?`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: charNames[0],
    dialogue: `Start with the ${difficulty} level and practice regularly. Don't worry if it seems hard at first!`,
    knowledgePointUsed: false,
  });

  // 7. 总结
  scenes.push({
    order: order++,
    role: charNames[0],
    dialogue: `So, today we learned all about ${kpName}. I hope everyone understands it better now!`,
    knowledgePointUsed: true,
  });

  if (charNames.length >= 2) {
    scenes.push({
      order: order++,
      role: charNames[1],
      dialogue: `Thank you for teaching us! This was really fun.`,
      knowledgePointUsed: false,
    });
  }

  scenes.push({
    order: order++,
    role: charNames[charNames.length - 1],
    dialogue: `See you next time! Keep practicing!`,
    knowledgePointUsed: false,
  });

  return {
    title: `Learning ${kpName} - ${difficulty} Level`,
    scenes,
  };
}
