// 通用喜剧引擎 - 参考 Fresh Soup 趣味性，但不照搬剧情
// 核心：意外 → 尝试修复 → 越弄越糟 → 意外反转 → 创意解决

interface KnowledgePoint {
  name: string;
  description?: string;
  repetitionCount: number;
}

interface Character {
  name: string;
  personality?: string;
}

export function generateComedyStory(
  themeDescription: string,
  knowledgePoints: KnowledgePoint[],
  difficulty: string,
  characters: Character[]
) {
  const chars = characters.map(c => c.name);
  const scenes: any[] = [];
  let order = 1;

  // 知识点追踪
  const kpUsed: { [key: string]: number } = {};
  knowledgePoints.forEach(kp => kpUsed[kp.name] = 0);

  // 从主题提取关键信息
  const themeWords = themeDescription.split(' ').slice(0, 8).join(' ');
  const mainActivity = extractMainActivity(themeDescription);

  // ===== SCENE 1: Setup (建立情境) =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: 'SCENE 1 - DAY, LOCATION',
    visualDescription: '白天，户外场景。两个角色见面，开始他们的活动。',
    knowledgePointUsed: false,
  });

  // 开场对话
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Hey ${chars[1]}! Look at this!`,
    visualDescription: `${chars[0]}兴奋地向${chars[1]}招手。`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Oh wow! What are you doing?`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `I'm ${mainActivity}. Want to help?`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Sure! That sounds fun!`,
    knowledgePointUsed: false,
  });

  // 自然引入第一个知识点
  const kp1 = knowledgePoints[0];
  if (kp1.description && kpUsed[kp1.name] < kp1.repetitionCount) {
    scenes.push({
      order: order++,
      role: chars[0],
      dialogue: `Look! ${kp1.description}.`,
      knowledgePointUsed: true,
    });
    kpUsed[kp1.name]++;
  }

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Nice! What should I do to help?`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Just hand me that thing over there.`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `This one? *picks it up*`,
    knowledgePointUsed: false,
  });

  // ===== SCENE 2: Accident (意外发生) =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: 'SCENE 2 - Same Location (Uh-Oh Moment)',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Perfect! Now I just need to— *trips*`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `[CLOSE-UP: Accident happens in slow motion]`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Oops!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `*gasps* Oh no! ${chars[0]}!`,
    knowledgePointUsed: false,
  });

  // 用知识点描述问题
  if (kp1.description && kpUsed[kp1.name] < kp1.repetitionCount) {
    // 修改描述以反映问题
    const problemDesc = createProblemVersion(kp1.description);
    scenes.push({
      order: order++,
      role: chars[0],
      dialogue: `*checks* Oh no... ${problemDesc}!`,
      knowledgePointUsed: true,
    });
    kpUsed[kp1.name]++;
  } else {
    scenes.push({
      order: order++,
      role: chars[0],
      dialogue: `This is bad! Really bad!`,
      knowledgePointUsed: false,
    });
  }

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Don't worry! We can fix it!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `How?!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `I have an idea! Follow me!`,
    knowledgePointUsed: false,
  });

  // ===== SCENE 3: Chaotic Loop (疯狂循环) =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: 'SCENE 3 - MONTAGE (Things Get Crazy)',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: '[MONTAGE BEGINS: Fast cuts, music speeds up]',
    knowledgePointUsed: false,
  });

  // 尝试1
  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Try this!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `*tries* It's not working!`,
    knowledgePointUsed: false,
  });

  // 尝试2
  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Okay, then try THIS!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `*tries harder* Still no good!`,
    knowledgePointUsed: false,
  });

  // 引入第二个知识点（如果有）
  if (knowledgePoints.length > 1) {
    const kp2 = knowledgePoints[1];
    if (kp2.description && kpUsed[kp2.name] < kp2.repetitionCount) {
      scenes.push({
        order: order++,
        role: chars[1],
        dialogue: `Wait! ${kp2.description}!`,
        knowledgePointUsed: true,
      });
      kpUsed[kp2.name]++;
    }
  }

  // 快速循环
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `More!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Faster!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Keep going!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Don't stop!`,
    knowledgePointUsed: false,
  });

  // 继续使用知识点
  knowledgePoints.forEach(kp => {
    if (kpUsed[kp.name] < kp.repetitionCount && kp.description) {
      scenes.push({
        order: order++,
        role: chars[order % 2],
        dialogue: `${kp.description}!`,
        knowledgePointUsed: true,
      });
      kpUsed[kp.name]++;
    }
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: '[CLOSE-UP: Everything is getting out of control]',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: '[MONTAGE ENDS: Sudden stop. Silence.]',
    knowledgePointUsed: false,
  });

  // ===== SCENE 4: Reveal & Resolution (反转与解决) =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: 'SCENE 4 - Same Location (The Surprise)',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: '[Quiet. Birds chirping. Characters breathing heavily.]',
    knowledgePointUsed: false,
  });

  // 第三个角色出现（如果有）
  if (chars.length > 2) {
    scenes.push({
      order: order++,
      role: chars[2],
      dialogue: `Hey guys! I'm back! How's it— *stops* ...What happened here?`,
      knowledgePointUsed: false,
    });

    scenes.push({
      order: order++,
      role: chars[0],
      dialogue: `*nervously* Hi ${chars[2]}... We had a little problem.`,
      knowledgePointUsed: false,
    });

    scenes.push({
      order: order++,
      role: chars[2],
      dialogue: `A LITTLE problem?! *looks around*`,
      knowledgePointUsed: false,
    });
  }

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `*slowly looks* Wait a second...`,
    knowledgePointUsed: false,
  });

  // 最后使用知识点 - 发现意外的好结果
  if (kpUsed[kp1.name] < kp1.repetitionCount && kp1.description) {
    const goodVersion = createGoodVersion(kp1.description);
    scenes.push({
      order: order++,
      role: chars[0],
      dialogue: `*checks carefully* ${goodVersion}!`,
      knowledgePointUsed: true,
    });
    kpUsed[kp1.name]++;
  }

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Really?! *excited* We did it!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Yeah! But... *realizes* look how much we made!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: '[WIDE SHOT: Reveals the result is MUCH bigger than expected]',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `*jaw drops* That's huge!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `What are we going to do with all this?`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[chars.length > 2 ? 2 : 1],
    dialogue: `I know! Let's share it with everyone!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'All Together',
    dialogue: `Hey everyone! Come here! It's free!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: '[People running from everywhere. Everyone is happy.]',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `*laughs* Well, that worked out great!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Yeah! Sometimes mistakes are lucky!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: '[FADE OUT]',
    knowledgePointUsed: false,
  });

  // 生成梗概
  const synopsis = generateSynopsis(themeDescription, chars);

  return {
    title: `${chars.join(' & ')}: ${capitalizeFirst(themeWords)}`,
    characters: characters.map(c => ({
      name: c.name,
      personality: c.personality || 'Friendly and helpful',
    })),
    knowledgePoints: knowledgePoints.map(kp => ({
      name: kp.name,
      description: kp.description || '',
      repetitionCount: kp.repetitionCount,
    })),
    synopsis: synopsis,
    scenes,
  };
}

// === 辅助函数 ===

function extractMainActivity(theme: string): string {
  const lower = theme.toLowerCase();

  // 提取动作词
  if (lower.includes('making') || lower.includes('cook')) {
    return 'making something special';
  }
  if (lower.includes('baking') || lower.includes('bake')) {
    return 'baking something yummy';
  }
  if (lower.includes('building') || lower.includes('build')) {
    return 'building something cool';
  }
  if (lower.includes('painting') || lower.includes('paint')) {
    return 'painting a picture';
  }
  if (lower.includes('planting') || lower.includes('plant')) {
    return 'planting some seeds';
  }
  if (lower.includes('cleaning') || lower.includes('clean')) {
    return 'cleaning up this place';
  }

  // 默认
  return 'working on a fun project';
}

function createProblemVersion(description: string): string {
  if (!description) return 'something is wrong';

  const lower = description.toLowerCase();

  // 替换正面词为负面词
  if (lower.includes('good')) {
    return description.replace(/good/gi, 'terrible');
  }
  if (lower.includes('nice')) {
    return description.replace(/nice/gi, 'bad');
  }
  if (lower.includes('perfect')) {
    return description.replace(/perfect/gi, 'wrong');
  }
  if (lower.includes('beautiful')) {
    return description.replace(/beautiful/gi, 'messy');
  }

  // 如果是陈述句，改成否定
  if (lower.startsWith('it is') || lower.startsWith('this is')) {
    return description.replace(/is/i, 'is not');
  }
  if (lower.startsWith('it looks')) {
    return description.replace(/looks/i, 'looks terrible');
  }
  if (lower.startsWith('there is') || lower.startsWith('there are')) {
    return 'there is too much';
  }

  // 默认：加上 too much
  return 'there is too much';
}

function createGoodVersion(description: string): string {
  if (!description) return 'It actually worked';

  const lower = description.toLowerCase();

  // 替换负面词为正面词
  if (lower.includes('terrible')) {
    return description.replace(/terrible/gi, 'perfect');
  }
  if (lower.includes('bad')) {
    return description.replace(/bad/gi, 'great');
  }
  if (lower.includes('wrong')) {
    return description.replace(/wrong/gi, 'right');
  }
  if (lower.includes('messy')) {
    return description.replace(/messy/gi, 'beautiful');
  }

  // 如果已经是正面的，就保持
  if (lower.includes('good') || lower.includes('perfect') || lower.includes('nice')) {
    return 'It actually ' + description;
  }

  // 默认
  return description;
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateSynopsis(theme: string, characters: string[]): string {
  const mainChar = characters[0];
  const helper = characters[1];
  const activity = extractMainActivity(theme);

  return `${mainChar} and ${helper} are excited to work on their project together. But when an accident happens, they try to fix it and things get completely out of control! Through teamwork and creativity, they discover that sometimes mistakes can lead to unexpected happy endings.`;
}
