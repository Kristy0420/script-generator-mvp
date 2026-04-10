// 儿童动画喜剧引擎 - 参考 Fresh Soup 风格

interface KnowledgePoint {
  name: string;
  description?: string;
  repetitionCount: number;
}

interface Character {
  name: string;
  personality?: string;
}

// 喜剧情节模板库
const COMEDY_PLOTS = {
  adventure: [
    {
      setup: 'Characters find a mysterious map',
      accident: 'Map gets torn/wet/eaten by pet',
      loop: 'Trying to piece it together but making it worse',
      reveal: 'Original map was upside down all along',
      resolution: 'Found the treasure by accident',
    },
    {
      setup: 'Need to cross a river',
      accident: 'Bridge breaks when first person steps on it',
      loop: 'Building bridge but materials keep failing',
      reveal: 'River is only ankle-deep',
      resolution: 'Just walk through the water',
    },
  ],
  daily: [
    {
      setup: 'Baking cookies for school',
      accident: 'Mixed up salt and sugar',
      loop: 'Adding more ingredients to fix it',
      reveal: 'Made way too many cookies',
      resolution: 'Share with entire neighborhood',
    },
    {
      setup: 'Cleaning room before parents come home',
      accident: 'Accidentally knocked over paint',
      loop: 'Covering mess makes bigger mess',
      reveal: 'Paint actually made room look artistic',
      resolution: 'Parents love the new decoration',
    },
  ],
  fantasy: [
    {
      setup: 'Found a magic wand',
      accident: 'First spell goes wrong',
      loop: 'Each fixing spell makes things worse',
      reveal: 'Wand works backwards',
      resolution: 'Use reverse spells to fix everything',
    },
    {
      setup: 'Dragon loses his fire breath',
      accident: 'Tried spicy food to help',
      loop: 'Testing different foods frantically',
      reveal: 'Dragon just had hiccups',
      resolution: 'Simple water solves everything',
    },
  ],
  friendship: [
    {
      setup: 'Planning surprise party',
      accident: 'Friend arrives early',
      loop: 'Hiding decorations while friend walks around',
      reveal: 'Friend knew all along',
      resolution: 'Surprise was never needed',
    },
    {
      setup: 'Competing in talent show',
      accident: 'Forget the performance',
      loop: 'Improvising goes hilariously wrong',
      reveal: 'Audience loves the chaos',
      resolution: 'Win "Most Entertaining" award',
    },
  ],
};

// 快速对白模板（短句为主）
const QUICK_RESPONSES = [
  'Whoa!',
  'Oops!',
  'Yikes!',
  'Oh no!',
  'Wait what?',
  'Seriously?',
  'No way!',
  'You\'re kidding!',
  'That\'s crazy!',
  'Uh-oh...',
];

// 动作指令库（用*括起来）
const ACTIONS = [
  'gasps',
  'eyes wide',
  'jaw drops',
  'face palm',
  'trips',
  'stumbles',
  'ducks',
  'freezes',
  'spins around',
  'frantically waves',
  'covers mouth',
  'squints',
];

export function generateComedyScript(
  themeDescription: string,
  knowledgePoints: KnowledgePoint[],
  difficulty: string,
  characters: Character[]
) {
  // 使用用户提供的主题描述，如果为空则使用默认
  const userPlot = themeDescription || 'an exciting adventure';
  const chars = characters.map(c => c.name);

  const scenes: any[] = [];
  let order = 1;
  let kpUsageCount: { [key: string]: number } = {};

  // 初始化知识点计数
  knowledgePoints.forEach(kp => {
    kpUsageCount[kp.name] = 0;
  });

  // === SCENE 1: Setup ===
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 1 - DAY, LOCATION`,
    knowledgePointUsed: false,
  });

  // 开场对话（1-2句）- 基于用户提供的主题
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Look! ${userPlot}!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Wow! This is exciting!`,
    knowledgePointUsed: false,
  });

  // 第一个知识点自然引入
  const firstKP = knowledgePoints[0];
  const kpIntro = createKnowledgeIntro(firstKP, userPlot);
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: kpIntro,
    knowledgePointUsed: true,
  });
  kpUsageCount[firstKP.name]++;

  // === SCENE 2: Accident ===
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 2 - LOCATION (Accident Happens)`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Okay, let me just... *${ACTIONS[0]}* Oh no!`,
    knowledgePointUsed: false,
  });

  // 特写描述 - 基于主题情境
  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `[CLOSE-UP: Accident happens]`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `*${ACTIONS[2]}* ${chars[0]}! What happened?!`,
    knowledgePointUsed: false,
  });

  // 第二个知识点融入意外反应
  if (knowledgePoints.length > 1 && kpUsageCount[knowledgePoints[1].name] < knowledgePoints[1].repetitionCount) {
    const kp2 = knowledgePoints[1];
    scenes.push({
      order: order++,
      role: chars[0],
      dialogue: createAccidentReaction(kp2),
      knowledgePointUsed: true,
    });
    kpUsageCount[kp2.name]++;
  } else {
    scenes.push({
      order: order++,
      role: chars[0],
      dialogue: `Don't worry! I can fix this!`,
      knowledgePointUsed: false,
    });
  }

  // === SCENE 3: Loop (Montage) ===
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 3 - MONTAGE (Fast cutting, chaotic)`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `[MONTAGE BEGINS: Extreme fast cuts, sound overlapping]`,
    knowledgePointUsed: false,
  });

  // 疯狂循环 - 插入所有剩余知识点
  let loopCount = 0;
  const maxLoops = 6;

  while (loopCount < maxLoops) {
    // 找到还没用够的知识点
    const availableKP = knowledgePoints.find(
      kp => kpUsageCount[kp.name] < kp.repetitionCount
    );

    if (availableKP) {
      scenes.push({
        order: order++,
        role: chars[loopCount % chars.length],
        dialogue: createLoopDialogue(availableKP, loopCount),
        knowledgePointUsed: true,
      });
      kpUsageCount[availableKP.name]++;
    } else {
      // 没有知识点了，填充普通循环对话
      scenes.push({
        order: order++,
        role: chars[loopCount % chars.length],
        dialogue: getLoopFiller(loopCount),
        knowledgePointUsed: false,
      });
    }

    loopCount++;
  }

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `[MONTAGE ENDS: Sudden silence]`,
    knowledgePointUsed: false,
  });

  // === SCENE 4: Reveal & Resolution ===
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 4 - LOCATION (The Twist)`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `[Quiet moment. Birds chirping.]`,
    knowledgePointUsed: false,
  });

  // 安静的反转
  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Wait... *slowly realizes* Something unexpected happened!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `*${ACTIONS[3]}* You've got to be kidding me...`,
    knowledgePointUsed: false,
  });

  // 用知识点总结教训
  const reviewKP = knowledgePoints[0];
  scenes.push({
    order: order++,
    role: chars[chars.length - 1] || chars[0],
    dialogue: `Well, at least we learned about ${reviewKP.name}!`,
    knowledgePointUsed: true,
  });
  kpUsageCount[reviewKP.name]++;

  // 最终解决
  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `So... what should we do now?`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'All Together',
    dialogue: `*laugh together* Let's do it! / Yeah! / Awesome!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `[FADE OUT]`,
    knowledgePointUsed: false,
  });

  return {
    title: `${chars.join(' & ')}: ${capitalizeWords(userPlot.slice(0, 50))}`,
    scenes,
  };
}

// 辅助函数

function createKnowledgeIntro(kp: KnowledgePoint, setup: string): string {
  const words = kp.name.split(' ')[0]; // 取第一个词
  return `Hey! Look at this! ${kp.description || `This is about ${kp.name}!`}`;
}

function createAccidentReaction(kp: KnowledgePoint): string {
  const templates = [
    `Oh no! Now ${kp.name}!`,
    `This is bad! ${kp.name}!`,
    `Yikes! ${kp.description || kp.name}!`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

function createLoopDialogue(kp: KnowledgePoint, index: number): string {
  const templates = [
    `Quick! ${kp.name}!`,
    `Try ${kp.name}!`,
    `More ${kp.name}!`,
    `${kp.name}! ${kp.name}!`,
    `What about ${kp.name}?`,
  ];
  return templates[index % templates.length];
}

function getLoopFiller(index: number): string {
  const fillers = [
    'More!',
    'Again!',
    'Keep going!',
    'Don\'t stop!',
    'Faster!',
    'Almost there!',
  ];
  return fillers[index % fillers.length];
}

function capitalizeWords(str: string): string {
  return str.split(' ').map(w =>
    w.charAt(0).toUpperCase() + w.slice(1)
  ).join(' ');
}
