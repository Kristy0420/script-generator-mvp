// Fresh Soup 风格剧本生成器 - 完全重写
// 核心理念：真实对话 + 自然知识点融入 + 清晰因果逻辑

interface KnowledgePoint {
  name: string;
  description?: string;
  repetitionCount: number;
}

interface Character {
  name: string;
  personality?: string;
}

export function generateFreshSoupStory(
  themeDescription: string,
  knowledgePoints: KnowledgePoint[],
  difficulty: string,
  characters: Character[]
) {
  const chars = characters.map(c => c.name);
  const scenes: any[] = [];
  let order = 1;

  // 知识点使用追踪
  const kpUsed: { [key: string]: number } = {};
  knowledgePoints.forEach(kp => kpUsed[kp.name] = 0);

  // 从主题中提取关键词
  const theme = themeDescription.toLowerCase();
  const isCooking = theme.includes('soup') || theme.includes('cook') || theme.includes('food') || theme.includes('bake');
  const isSalty = theme.includes('salt');

  // ===== SCENE 1: Setup =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: isCooking ? 'SCENE 1 - DAY, OUTDOOR - Food Stall' : 'SCENE 1 - DAY, LOCATION',
    knowledgePointUsed: false,
  });

  // 角色登场
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Hi ${chars[1]}! What are you doing?`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: isCooking
      ? `I'm making fresh soup! Want to help?`
      : `I'm working on something cool! Come see!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Sure! Sounds fun!`,
    knowledgePointUsed: false,
  });

  // 引入第一个知识点 - 尝试使用
  const kp1 = knowledgePoints[0];
  if (kp1.description) {
    scenes.push({
      order: order++,
      role: chars[1],
      dialogue: `Let me check... *tastes* ${kp1.description}`,
      knowledgePointUsed: true,
    });
    kpUsed[kp1.name]++;
  }

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Great! What should I do?`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: isSalty
      ? `Just add some salt, and check the flavor.`
      : `Help me add this ingredient carefully.`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Okay! *picks up container*`,
    knowledgePointUsed: false,
  });

  // ===== SCENE 2: Accident =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: 'SCENE 2 - Same Location (The Accident)',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Hmm... it won't come out. *pulls harder*`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: isSalty
      ? `[CLOSE-UP: The whole bag of salt dumps into the pot]`
      : `[CLOSE-UP: Everything spills in]`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Oops...`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `${chars[0]}! *rushes over* What happened?!`,
    knowledgePointUsed: false,
  });

  // 用知识点描述问题
  if (kpUsed[kp1.name] < kp1.repetitionCount && kp1.description) {
    scenes.push({
      order: order++,
      role: chars[0],
      dialogue: `*tastes nervously* Oh no... ${kp1.description.replace('good', 'terrible')}!`,
      knowledgePointUsed: true,
    });
    kpUsed[kp1.name]++;
  }

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Don't panic. We can fix this!`,
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
    dialogue: isSalty
      ? `Add water! That will balance it out!`
      : `Add more of the opposite! That should work!`,
    knowledgePointUsed: false,
  });

  // ===== SCENE 3: Chaotic Loop =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: 'SCENE 3 - MONTAGE (Chaos Escalates)',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: '[MONTAGE BEGINS: Fast cuts, overlapping sounds, increasing speed]',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `*pours water* Done!`,
    knowledgePointUsed: false,
  });

  // 测试 - 用知识点
  if (kpUsed[kp1.name] < kp1.repetitionCount && kp1.description) {
    const testResult = kp1.description.includes('salty')
      ? kp1.description.replace('salty', 'watery')
      : 'It doesn\'t taste right';

    scenes.push({
      order: order++,
      role: chars[1],
      dialogue: `*tastes* ${testResult}!`,
      knowledgePointUsed: true,
    });
    kpUsed[kp1.name]++;
  }

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Then add more salt!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `*dumps salt* There!`,
    knowledgePointUsed: false,
  });

  // 再次测试
  if (kpUsed[kp1.name] < kp1.repetitionCount && kp1.description) {
    scenes.push({
      order: order++,
      role: chars[0],
      dialogue: `*tastes* Too salty again!`,
      knowledgePointUsed: true,
    });
    kpUsed[kp1.name]++;
  }

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `More water!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `More salt!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Water!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Salt!`,
    knowledgePointUsed: false,
  });

  // 引入第二个知识点（如果有）
  if (knowledgePoints.length > 1) {
    const kp2 = knowledgePoints[1];
    if (kp2.description) {
      scenes.push({
        order: order++,
        role: chars[1],
        dialogue: `*looks around* Wait... ${kp2.description}!`,
        knowledgePointUsed: true,
      });
      kpUsed[kp2.name]++;
    }
  }

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: '[CLOSE-UP: The pot is overflowing, getting bigger and bigger]',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: '[MONTAGE ENDS: Sudden silence. Everything freezes.]',
    knowledgePointUsed: false,
  });

  // ===== SCENE 4: Reveal & Resolution =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: 'SCENE 4 - Same Location (The Twist)',
    knowledgePointUsed: false,
  });

  // 如果有第三个角色，现在出现
  if (chars.length > 2) {
    scenes.push({
      order: order++,
      role: chars[2],
      dialogue: `Hey guys! I'm back! How's the— *stops and stares*`,
      knowledgePointUsed: false,
    });

    scenes.push({
      order: order++,
      role: chars[0],
      dialogue: `Hi ${chars[2]}... we had a little accident.`,
      knowledgePointUsed: false,
    });

    scenes.push({
      order: order++,
      role: chars[2],
      dialogue: `A LITTLE? Look at all this!`,
      knowledgePointUsed: false,
    });
  }

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: '[Quiet moment. Only birds chirping.]',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Well... let's taste it. *carefully tries*`,
    knowledgePointUsed: false,
  });

  // 最后的知识点测试
  if (kpUsed[kp1.name] < kp1.repetitionCount && kp1.description) {
    scenes.push({
      order: order++,
      role: chars[1],
      dialogue: kp1.description.includes('tastes')
        ? `*surprised* ${kp1.description.replace('salty', 'perfect')}!`
        : `It's actually perfect!`,
      knowledgePointUsed: true,
    });
    kpUsed[kp1.name]++;
  }

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Really?! *relieved* Yes!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `But... *slowly realizes*`,
    knowledgePointUsed: false,
  });

  // 第二个知识点再次使用
  if (knowledgePoints.length > 1) {
    const kp2 = knowledgePoints[1];
    if (kp2.description && kpUsed[kp2.name] < kp2.repetitionCount) {
      scenes.push({
        order: order++,
        role: chars[0],
        dialogue: `${kp2.description}`,
        knowledgePointUsed: true,
      });
      kpUsed[kp2.name]++;
    }
  }

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: '[WIDE SHOT: Reveals an enormous pot of soup, much bigger than before]',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[chars.length > 2 ? 2 : 1],
    dialogue: `*jaw drops* That's... that's HUGE!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `What are we going to do with all of this?!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `*thinks* I have an idea!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'All Together',
    dialogue: `FREE SOUP! Come and get it!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: '[People rushing in from all directions. Characters smile and serve soup]',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[chars.length > 2 ? 2 : 1],
    dialogue: `*laughing* Well, that worked out!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Yeah! Happy accidents!`,
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: '[FADE OUT]',
    knowledgePointUsed: false,
  });

  return {
    title: `${chars.join(' & ')}: ${capitalizeFirst(extractTitle(themeDescription))}`,
    scenes,
  };
}

// 辅助函数
function extractTitle(theme: string): string {
  const words = theme.split(/[.!?]/)[0].trim().split(' ').slice(0, 6).join(' ');
  return words || 'An Adventure';
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
