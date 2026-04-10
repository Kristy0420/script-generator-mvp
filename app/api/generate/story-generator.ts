// 儿童动画轻喜剧故事生成器 - 知识点自然融入剧情

interface KnowledgePoint {
  name: string;
  description?: string;
  repetitionCount: number;
}

interface Character {
  name: string;
  personality?: string;
}

// 主题场景库
const THEME_SCENARIOS: Record<string, any> = {
  adventure: {
    setting: 'an exciting treasure hunt in a magical forest',
    conflict: 'finding the lost rainbow gem',
    mood: 'adventurous and exciting',
    actions: ['discover', 'explore', 'find', 'search', 'climb'],
  },
  daily: {
    setting: 'a fun day at home and school',
    conflict: 'preparing for the school talent show',
    mood: 'warm and relatable',
    actions: ['help', 'learn', 'practice', 'share', 'play'],
  },
  fantasy: {
    setting: 'a magical kingdom with talking animals',
    conflict: 'breaking the silly spell on the castle',
    mood: 'whimsical and magical',
    actions: ['cast', 'transform', 'wish', 'fly', 'sparkle'],
  },
  friendship: {
    setting: 'a neighborhood party',
    conflict: 'working together to solve a mystery',
    mood: 'cooperative and heartwarming',
    actions: ['cooperate', 'help', 'support', 'share', 'celebrate'],
  },
};

// 喜剧元素库
const COMEDY_ELEMENTS = [
  'trips over something',
  'says something silly',
  'gets confused',
  'makes a funny face',
  'accidentally does something backwards',
  'mishears something funny',
];

// 自然过渡短语
const TRANSITIONS = [
  'Speaking of which...',
  'That reminds me...',
  'You know what...',
  'By the way...',
  'Oh! I just thought of something...',
  'Wait a minute...',
];

export function generateStoryScript(
  theme: string,
  knowledgePoints: KnowledgePoint[],
  difficulty: string,
  characters: Character[]
) {
  const scenario = THEME_SCENARIOS[theme] || THEME_SCENARIOS.adventure;
  const charNames = characters.map(c => c.name);
  const scenes: any[] = [];
  let order = 1;

  // === Act 1: 开场 - 设置场景和问题 ===

  // 1. 开场白（介绍场景）
  scenes.push({
    order: order++,
    role: charNames[0],
    dialogue: `Wow! Look at this place! We're in ${scenario.setting}!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: charNames[1],
    dialogue: `This is so cool! ${charNames[0]}, what should we do first?`,
    knowledgePointUsed: false,
  });

  // 2. 介绍任务/冲突（喜剧元素）
  scenes.push({
    order: order++,
    role: charNames[0],
    dialogue: `Well, we need to... *${COMEDY_ELEMENTS[0]}* Oops! Haha! We need to start ${scenario.conflict}!`,
    knowledgePointUsed: false,
  });

  if (charNames.length > 2) {
    scenes.push({
      order: order++,
      role: charNames[2],
      dialogue: `That sounds fun! But how do we do that?`,
      knowledgePointUsed: false,
    });
  }

  // === Act 2: 展开 - 自然融入知识点 ===

  let knowledgeIndex = 0;
  knowledgePoints.forEach((kp, kpIdx) => {
    for (let rep = 0; rep < kp.repetitionCount; rep++) {
      const currentChar = charNames[knowledgeIndex % charNames.length];
      const nextChar = charNames[(knowledgeIndex + 1) % charNames.length];

      // 自然过渡到知识点
      if (rep === 0) {
        scenes.push({
          order: order++,
          role: currentChar,
          dialogue: `${TRANSITIONS[knowledgeIndex % TRANSITIONS.length]} ${getKnowledgeIntro(kp, rep, scenario)}`,
          knowledgePointUsed: true,
        });
      } else {
        scenes.push({
          order: order++,
          role: currentChar,
          dialogue: getKnowledgeVariation(kp, rep, scenario),
          knowledgePointUsed: true,
        });
      }

      // 反应/互动
      const reactions = [
        `Oh! That's really helpful!`,
        `I get it now! That makes sense.`,
        `*giggles* That's so interesting!`,
        `Wow, I didn't know that!`,
        `That's actually kind of cool!`,
      ];

      scenes.push({
        order: order++,
        role: nextChar,
        dialogue: reactions[knowledgeIndex % reactions.length],
        knowledgePointUsed: false,
      });

      // 喜剧情节推进
      if (rep < kp.repetitionCount - 1) {
        scenes.push({
          order: order++,
          role: charNames[(knowledgeIndex + 2) % charNames.length] || nextChar,
          dialogue: `*${COMEDY_ELEMENTS[(knowledgeIndex + 1) % COMEDY_ELEMENTS.length]}* Haha! But seriously, ${getComedyTransition(kp)}`,
          knowledgePointUsed: false,
        });
      }

      knowledgeIndex++;
    }

    // 知识点之间的过渡
    if (kpIdx < knowledgePoints.length - 1) {
      scenes.push({
        order: order++,
        role: charNames[knowledgeIndex % charNames.length],
        dialogue: `Okay, we're making progress! What's next?`,
        knowledgePointUsed: false,
      });
    }
  });

  // === Act 3: 高潮 - 小危机 ===

  scenes.push({
    order: order++,
    role: charNames[0],
    dialogue: `Wait! Oh no! I think we forgot something important!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: charNames[1],
    dialogue: `*worried* What is it?!`,
    knowledgePointUsed: false,
  });

  // 回顾第一个知识点（加深印象）
  const firstKP = knowledgePoints[0];
  scenes.push({
    order: order++,
    role: charNames[0],
    dialogue: `Wait... didn't we learn about ${firstKP.name}? Maybe that can help us!`,
    knowledgePointUsed: true,
  });

  scenes.push({
    order: order++,
    role: charNames[1],
    dialogue: `You're right! Let's use what we learned!`,
    knowledgePointUsed: false,
  });

  // === Act 4: 结局 - 成功和总结 ===

  scenes.push({
    order: order++,
    role: charNames[charNames.length - 1],
    dialogue: `We did it! We actually did it! *celebrates*`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: charNames[0],
    dialogue: `Today we learned so much! We learned about ${knowledgePoints.map(k => k.name).join(', ')}, and we had fun doing it!`,
    knowledgePointUsed: true,
  });

  scenes.push({
    order: order++,
    role: charNames[1],
    dialogue: `This was the best adventure ever! Can we do it again tomorrow?`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'All Together',
    dialogue: `Yay! See you next time! *everyone waves goodbye*`,
    knowledgePointUsed: false,
  });

  return {
    title: `The ${capitalizeFirst(theme)} of ${charNames.join(', ')} and the ${firstKP.name}`,
    scenes,
  };
}

// 辅助函数

function getKnowledgeIntro(kp: KnowledgePoint, rep: number, scenario: any): string {
  const intros = [
    `Look! This is about ${kp.name}! ${kp.description || ''}`,
    `I think ${kp.name} might be important here. ${kp.description || ''}`,
    `Hey everyone! Do you know about ${kp.name}? ${kp.description || ''}`,
  ];
  return intros[rep % intros.length];
}

function getKnowledgeVariation(kp: KnowledgePoint, rep: number, scenario: any): string {
  const variations = [
    `Remember, ${kp.name} helps us a lot!`,
    `Just like we said, ${kp.name} is really useful here!`,
    `I'm using ${kp.name} right now, see?`,
    `${kp.name} makes this so much easier!`,
    `Good thing we know about ${kp.name}!`,
  ];
  return variations[rep % variations.length];
}

function getComedyTransition(kp: KnowledgePoint): string {
  const transitions = [
    `let's keep going with ${kp.name}!`,
    `there's more to learn about ${kp.name}!`,
    `${kp.name} is more fun than I thought!`,
  ];
  return transitions[Math.floor(Math.random() * transitions.length)];
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
