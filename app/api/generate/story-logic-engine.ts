// 故事逻辑引擎 - 基于因果关系和逻辑巧思

interface KnowledgePoint {
  name: string;
  description?: string;
  repetitionCount: number;
}

interface Character {
  name: string;
  personality?: string;
}

// 从用户的主题描述中提取故事逻辑
function analyzeTheme(themeDescription: string): StoryLogic {
  const lower = themeDescription.toLowerCase();

  // 关键词匹配不同类型的故事逻辑
  if (lower.includes('too much') || lower.includes('spill') || lower.includes('accident')) {
    return createOverdoingLoop();
  } else if (lower.includes('lost') || lower.includes('find') || lower.includes('search')) {
    return createSearchLoop();
  } else if (lower.includes('wrong') || lower.includes('mistake') || lower.includes('mixed')) {
    return createMixUpLoop();
  } else if (lower.includes('grow') || lower.includes('bigger') || lower.includes('more')) {
    return createGrowingLoop();
  } else {
    // 默认：过度反应循环
    return createOverdoingLoop();
  }
}

interface StoryLogic {
  setup: {
    situation: string;
    goal: string;
    firstAction: string;
  };
  accident: {
    what: string;
    reaction: string;
    firstFix: string;
  };
  loop: {
    problem1: string;
    solution1: string;
    problem2: string;
    solution2: string;
    escalation: string[];
  };
  reveal: {
    unexpected: string;
    realization: string;
    visual: string;
  };
  resolution: {
    creativeSolution: string;
    lesson: string;
  };
}

// 类型1：过度反应循环 (像 Fresh Soup)
function createOverdoingLoop(): StoryLogic {
  return {
    setup: {
      situation: 'making something delicious',
      goal: 'add just the right amount',
      firstAction: 'add some seasoning',
    },
    accident: {
      what: 'The whole bag spills in!',
      reaction: 'Oh no! Way too much!',
      firstFix: 'Add water to fix it',
    },
    loop: {
      problem1: 'Too watery now',
      solution1: 'Add more seasoning',
      problem2: 'Too strong again',
      solution2: 'Add more water',
      escalation: [
        'The pot is getting full',
        'We need a bigger pot',
        'This is getting crazy',
        'It keeps growing',
      ],
    },
    reveal: {
      unexpected: 'It actually tastes perfect',
      realization: 'But look how much we made',
      visual: 'The tiny pot became HUGE',
    },
    resolution: {
      creativeSolution: 'Let\'s share with everyone',
      lesson: 'Happy accidents can turn out great',
    },
  };
}

// 类型2：寻找循环（找错了地方）
function createSearchLoop(): StoryLogic {
  return {
    setup: {
      situation: 'need to find something important',
      goal: 'locate the missing item',
      firstAction: 'start searching in obvious place',
    },
    accident: {
      what: 'found wrong item that looks similar',
      reaction: 'assume this is it and proceed',
      firstFix: 'try to use the wrong item',
    },
    loop: {
      problem1: 'this one does not fit/work',
      solution1: 'search for ANOTHER one',
      problem2: 'find another wrong one',
      solution2: 'try THAT one instead',
      escalation: [
        'Collecting more and more wrong items',
        'Making a pile of similar things',
        'Getting more confused',
        'Trying combinations',
      ],
    },
    reveal: {
      unexpected: 'original item was in their pocket/hand all along',
      realization: 'all these "wrong" items are actually useful',
      visual: 'surrounded by pile of collected items',
    },
    resolution: {
      creativeSolution: 'use all collected items for something else',
      lesson: 'sometimes searching leads to better discoveries',
    },
  };
}

// 类型3：混淆循环（搞混了东西）
function createMixUpLoop(): StoryLogic {
  return {
    setup: {
      situation: 'following instructions or recipe',
      goal: 'do it correctly step by step',
      firstAction: 'reading and following carefully',
    },
    accident: {
      what: 'grabbed wrong item (looks similar)',
      reaction: 'does not realize it is wrong',
      firstFix: 'continue following steps',
    },
    loop: {
      problem1: 'result looks/tastes weird',
      solution1: 'try to fix by adding MORE',
      problem2: 'getting weirder',
      solution2: 'add something ELSE to balance',
      escalation: [
        'Each fix makes it stranger',
        'Colors/texture changing oddly',
        'Unexpected reactions happening',
        'Creating something unintended',
      ],
    },
    reveal: {
      unexpected: 'realized they used wrong thing',
      realization: 'accidentally created something BETTER',
      visual: 'result looks completely different than expected',
    },
    resolution: {
      creativeSolution: 'embrace the new creation',
      lesson: 'mistakes can lead to innovation',
    },
  };
}

// 类型4：增长循环（越来越大）
function createGrowingLoop(): StoryLogic {
  return {
    setup: {
      situation: 'starting with something small',
      goal: 'make it bigger/better',
      firstAction: 'add a little bit to improve',
    },
    accident: {
      what: 'it grows faster than expected',
      reaction: 'excited and add more',
      firstFix: 'keep adding to make it even better',
    },
    loop: {
      problem1: 'growing TOO fast',
      solution1: 'try to SLOW it down',
      problem2: 'cannot control it anymore',
      solution2: 'add MORE to try controlling',
      escalation: [
        'Size doubling each time',
        'Taking over more space',
        'Characters have to move around it',
        'Becoming ridiculously huge',
      ],
    },
    reveal: {
      unexpected: 'stopped growing suddenly',
      realization: 'now they have GIANT version',
      visual: 'tiny thing is now enormous',
    },
    resolution: {
      creativeSolution: 'turn it into an attraction/event',
      lesson: 'bigger is not always better, but can be fun',
    },
  };
}

// 主生成函数
export function generateLogicalStory(
  themeDescription: string,
  knowledgePoints: KnowledgePoint[],
  difficulty: string,
  characters: Character[]
) {
  const logic = analyzeTheme(themeDescription);
  const chars = characters.map(c => c.name);
  const scenes: any[] = [];
  let order = 1;

  // 知识点使用追踪
  const kpTracker: { [key: string]: number } = {};
  knowledgePoints.forEach(kp => kpTracker[kp.name] = 0);

  // ===== ACT 1: SETUP =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 1 - ${extractLocation(themeDescription)}`,
    knowledgePointUsed: false,
  });

  // 角色A介绍情况
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Look! ${extractSituation(themeDescription)}`,
    knowledgePointUsed: false,
  });

  // 角色B兴奋反应
  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: chars.length > 2 ?
      `This is perfect! Let's help!` :
      `This looks fun! What should we do?`,
    knowledgePointUsed: false,
  });

  // 角色A说明目标，融入第一个知识点
  const kp1 = knowledgePoints[0];
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `We need to ${logic.setup.goal}. ${createKnowledgeUsage(kp1, 'setup')}`,
    knowledgePointUsed: true,
  });
  kpTracker[kp1.name]++;

  // 如果有第三个角色，加入协助
  if (chars.length > 2) {
    scenes.push({
      order: order++,
      role: chars[2],
      dialogue: `I can help! What should I do?`,
      knowledgePointUsed: false,
    });
  }

  // 开始行动
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Okay, let me ${logic.setup.firstAction}... *carefully concentrating*`,
    knowledgePointUsed: false,
  });

  // ===== ACT 2: ACCIDENT =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 2 - Same Location (The Accident)`,
    knowledgePointUsed: false,
  });

  // 意外发生
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Okay, just a little bit... *hand slips* Wait— WHOA!`,
    knowledgePointUsed: false,
  });

  // 特写：意外瞬间
  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `[CLOSE-UP: ${logic.accident.what}]`,
    knowledgePointUsed: false,
  });

  // 角色B惊讶反应，用知识点描述问题
  const kp2 = knowledgePoints.length > 1 ? knowledgePoints[1] : kp1;
  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `*gasps* ${chars[0]}! ${createKnowledgeUsage(kp2, 'problem')}`,
    knowledgePointUsed: true,
  });
  kpTracker[kp2.name]++;

  // 角色A试图修复
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Don't panic! I know what to do! ${logic.accident.firstFix}!`,
    knowledgePointUsed: false,
  });

  // 角色B怀疑
  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Are you sure that will work?`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Trust me! *confidently starts fixing*`,
    knowledgePointUsed: false,
  });

  // ===== ACT 3: ESCALATING LOOP =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 3 - MONTAGE (Chaos Escalates)`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `[MONTAGE BEGINS: Fast cuts, overlapping sounds, increasing speed]`,
    knowledgePointUsed: false,
  });

  // 循环开始 - 问题1
  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `*checks* Oh no! ${logic.loop.problem1}!`,
    knowledgePointUsed: false,
  });

  // 解决1 - 用知识点
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Quick! ${logic.loop.solution1}! ${createKnowledgeUsage(kp1, 'action')}`,
    knowledgePointUsed: true,
  });
  kpTracker[kp1.name]++;

  // 问题2
  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `*checks again* Wait! Now ${logic.loop.problem2}!`,
    knowledgePointUsed: false,
  });

  // 解决2
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Then ${logic.loop.solution2}!`,
    knowledgePointUsed: false,
  });

  // 快速循环 - 使用剩余知识点
  let loopCount = 0;
  logic.loop.escalation.forEach((escalation, idx) => {
    // 找到还需要使用的知识点
    const nextKP = knowledgePoints.find(kp =>
      kpTracker[kp.name] < kp.repetitionCount
    );

    if (nextKP) {
      scenes.push({
        order: order++,
        role: chars[loopCount % chars.length],
        dialogue: `${createKnowledgeUsage(nextKP, 'loop', idx)}!`,
        knowledgePointUsed: true,
      });
      kpTracker[nextKP.name]++;
    } else {
      // 没有知识点了，用短促对话
      const quickLines = ['More!', 'Again!', 'Faster!', 'Keep going!'];
      scenes.push({
        order: order++,
        role: chars[loopCount % chars.length],
        dialogue: quickLines[idx % quickLines.length],
        knowledgePointUsed: false,
      });
    }
    loopCount++;
  });

  // 特写：逐渐失控
  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `[CLOSE-UP: ${logic.loop.escalation[logic.loop.escalation.length - 1]}]`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `[MONTAGE ENDS: Sudden silence. Everything freezes.]`,
    knowledgePointUsed: false,
  });

  // ===== ACT 4: REVEAL & RESOLUTION =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 4 - Same Location (The Twist)`,
    knowledgePointUsed: false,
  });

  // 安静的检查
  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `[Quiet moment. Only birds chirping.]`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `*nervously checks* So... how is it?`,
    knowledgePointUsed: false,
  });

  // 角色A测试，用知识点
  const finalTestKP = knowledgePoints[0];
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `*carefully tests* ${createKnowledgeUsage(finalTestKP, 'test')} ...Wait. It's actually perfect!`,
    knowledgePointUsed: true,
  });
  kpTracker[finalTestKP.name]++;

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Really?! *relieved* Phew! We did it!`,
    knowledgePointUsed: false,
  });

  // 反转揭示
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Yes, but... *slowly realizes* Oh no. ${logic.reveal.realization}`,
    knowledgePointUsed: false,
  });

  // 全景展示视觉反转
  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `[WIDE SHOT: Reveals ${logic.reveal.visual}]`,
    knowledgePointUsed: false,
  });

  // 所有人震惊
  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `*jaw drops* That's... that's HUGE!`,
    knowledgePointUsed: false,
  });

  if (chars.length > 2) {
    scenes.push({
      order: order++,
      role: chars[2],
      dialogue: `*eyes wide* What are we going to do with all of this?!`,
      knowledgePointUsed: false,
    });
  }

  // 短暂沉默
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Well... *thinks* We need to ${logic.resolution.creativeSolution}!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `*excited* That's actually a great idea!`,
    knowledgePointUsed: false,
  });

  // 一起行动
  scenes.push({
    order: order++,
    role: 'All Together',
    dialogue: `*shouting together* ${logic.resolution.creativeSolution.toUpperCase()}! Come and get it! FREE!`,
    knowledgePointUsed: false,
  });

  // 结尾：人群涌入
  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `[People rushing in from all directions. Characters overwhelmed but happy]`,
    knowledgePointUsed: false,
  });

  // 最后一句话 - 轻松总结教训
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `*laughing* Well, ${logic.resolution.lesson}!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `[FADE OUT]`,
    knowledgePointUsed: false,
  });

  return {
    title: generateTitle(themeDescription, chars),
    scenes,
  };
}

// 辅助函数

function extractLocation(theme: string): string {
  if (theme.includes('stall')) return 'DAY, OUTDOOR - Food Stall';
  if (theme.includes('kitchen')) return 'DAY, INDOOR - Kitchen';
  if (theme.includes('school')) return 'DAY, INDOOR - School';
  if (theme.includes('park')) return 'DAY, OUTDOOR - Park';
  return 'DAY, LOCATION';
}

function extractSituation(theme: string): string {
  const sentences = theme.split(/[.!?]/);
  return sentences[0] ? sentences[0].trim() + '!' : theme;
}

function createKnowledgeUsage(kp: KnowledgePoint, context: string, index: number = 0): string {
  const desc = kp.description || kp.name;

  // 如果有 description，优先使用完整描述
  // 如果只有 name，尝试构建自然句子

  switch (context) {
    case 'setup':
      // 开场引入：自然观察
      if (desc.includes('taste') || desc.includes('smell')) {
        return `Mmm! ${desc}`;
      }
      return `Look at this! ${desc}`;

    case 'problem':
      // 描述问题：直接陈述
      return desc;

    case 'action':
      // 行动时：短促命令式
      if (desc.toLowerCase().includes('add') || desc.toLowerCase().includes('put')) {
        return desc;
      }
      return `Quick! ${desc}`;

    case 'loop':
      // 循环中：变化形式
      const variations = [
        desc,
        `Try ${kp.name}!`,
        `More!`,
      ];
      return variations[index % variations.length];

    case 'test':
      // 测试结果：完整评价
      return desc;

    default:
      return desc;
  }
}

function generateTitle(theme: string, chars: string[]): string {
  const words = theme.split(' ').slice(0, 6).join(' ');
  return `${chars.join(' & ')}: ${words}`;
}
