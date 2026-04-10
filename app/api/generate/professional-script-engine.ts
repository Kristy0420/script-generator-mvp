// 专业教学剧本生成器 - 符合 script-writer skill 的格式规范

interface KnowledgePoint {
  name: string;
  description?: string;
  repetitionCount: number;
}

interface Character {
  name: string;
  personality?: string;
}

export function generateProfessionalScript(
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

  // 提取主要活动
  const mainActivity = extractActivity(themeDescription);
  const location = extractLocation(themeDescription);

  // 生成梗概
  const synopsis = generateSynopsis(themeDescription, chars);

  // ===== SCENE 1: Setup =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 1 - 日，外，${location}`,
    visualDescription: `大景别，${location}空镜。`,
    shotType: '大景别',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `全景，${chars.join('、')}在现场。`,
    visualDescription: `全景，展示所有角色和环境。`,
    shotType: '全景',
    knowledgePointUsed: false,
  });

  // 开场对话
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Hey ${chars[1]}! Look at this!`,
    action: '兴奋地指着',
    visualDescription: `${chars[0]}兴奋地向${chars[1]}招手。`,
    shotType: '中景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Oh wow! What are you doing?`,
    action: '好奇地走近',
    visualDescription: `${chars[1]}快步走过来，表情好奇。`,
    shotType: '中景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `I'm ${mainActivity}. Want to help?`,
    action: '热情邀请',
    visualDescription: `${chars[0]}做出邀请的手势。`,
    shotType: '近景',
    knowledgePointUsed: false,
  });

  // 引入第一个知识点
  const kp1 = knowledgePoints[0];
  if (kp1.description && kpUsed[kp1.name] < kp1.repetitionCount) {
    scenes.push({
      order: order++,
      role: chars[1],
      dialogue: `Sure! ${kp1.description}`,
      action: '点头同意',
      visualDescription: `${chars[1]}认真观察，发现关键信息。`,
      shotType: '近景',
      knowledgePointUsed: true,
      knowledgePointName: kp1.name,
    });
    kpUsed[kp1.name]++;
  }

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `特写（${chars[0]}的手部动作）。`,
    visualDescription: `特写镜头：${chars[0]}的手准备开始操作。`,
    shotType: '特写',
    knowledgePointUsed: false,
  });

  // ===== SCENE 2: Accident =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 2 - 日，外，${location}（意外发生）`,
    visualDescription: `同一场景，气氛突然紧张。`,
    shotType: '全景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Okay, let me just... *trips*`,
    action: '绊倒',
    visualDescription: `${chars[0]}不小心绊倒，失去平衡。`,
    shotType: '中景',
    audioNote: '跌倒音效',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `特写（物品掉落/洒落的瞬间）。慢镜头。`,
    visualDescription: `特写镜头：慢动作展示意外发生的瞬间。`,
    shotType: '特写',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Oops!`,
    action: '尴尬',
    visualDescription: `${chars[0]}尴尬地笑了笑。`,
    shotType: '近景',
    audioNote: '尴尬音效',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `${chars[0]}! What happened?!`,
    action: '震惊',
    visualDescription: `${chars[1]}倒吸一口气，震惊地看着现场。`,
    shotType: '近景',
    knowledgePointUsed: false,
  });

  // 用知识点描述问题
  if (kp1.description && kpUsed[kp1.name] < kp1.repetitionCount) {
    const problemDesc = createProblemVersion(kp1.description);
    scenes.push({
      order: order++,
      role: chars[0],
      dialogue: `Oh no... **${problemDesc}**!`,
      action: '紧张地检查',
      visualDescription: `${chars[0]}紧张地检查情况。`,
      shotType: '近景',
      knowledgePointUsed: true,
      knowledgePointName: kp1.name,
    });
    kpUsed[kp1.name]++;
  }

  // 第二个知识点（如果有）
  if (knowledgePoints.length > 1) {
    const kp2 = knowledgePoints[1];
    if (kp2.description && kpUsed[kp2.name] < kp2.repetitionCount) {
      scenes.push({
        order: order++,
        role: chars[1],
        dialogue: `Don't worry! **${kp2.description}**!`,
        action: '安慰',
        visualDescription: `${chars[1]}试图安慰${chars[0]}。`,
        shotType: '中景',
        knowledgePointUsed: true,
        knowledgePointName: kp2.name,
      });
      kpUsed[kp2.name]++;
    }
  }

  // ===== SCENE 3: Chaotic Loop =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 3 - 日，外，${location}（混乱升级）`,
    visualDescription: `蒙太奇开始：快速剪辑，音乐节奏加快。`,
    shotType: '蒙太奇',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `快速跳切蒙太奇：多个短镜头连续切换。`,
    visualDescription: `镜头快速切换，展示角色们忙乱的尝试。`,
    shotType: '蒙太奇',
    audioNote: '快节奏背景音乐',
    knowledgePointUsed: false,
  });

  // 快速尝试
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Try this!`,
    action: '快速动作',
    visualDescription: `${chars[0]}快速尝试第一个方法。`,
    shotType: '近景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Now try that!`,
    action: '跟着做',
    visualDescription: `${chars[1]}紧跟着尝试另一个方法。`,
    shotType: '近景',
    knowledgePointUsed: false,
  });

  // 继续使用剩余知识点
  knowledgePoints.forEach(kp => {
    while (kpUsed[kp.name] < kp.repetitionCount) {
      scenes.push({
        order: order++,
        role: chars[order % 2],
        dialogue: `**${kp.description || kp.name}**!`,
        action: '急切',
        visualDescription: `角色急切地表达。`,
        shotType: '近景',
        knowledgePointUsed: true,
        knowledgePointName: kp.name,
      });
      kpUsed[kp.name]++;
    }
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `特写（事态失控的细节）。`,
    visualDescription: `特写：展示情况越来越失控。`,
    shotType: '特写',
    knowledgePointUsed: false,
  });

  // ===== SCENE 4: Reveal & Resolution =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 4 - 日，外，${location}（反转）`,
    visualDescription: `突然安静。只有鸟鸣和风声。`,
    shotType: '全景',
    audioNote: '鸟鸣环境音',
    knowledgePointUsed: false,
  });

  // 第三个角色出现（如果有）
  if (chars.length > 2) {
    scenes.push({
      order: order++,
      role: chars[2],
      dialogue: `Hey guys! What's going on?`,
      action: '走过来',
      visualDescription: `${chars[2]}走近，看到眼前的景象。`,
      shotType: '中景',
      knowledgePointUsed: false,
    });

    scenes.push({
      order: order++,
      role: 'CAMERA',
      dialogue: `跟镜头：随${chars[2]}的视角移动。`,
      visualDescription: `镜头跟随${chars[2]}，慢慢展示现场。`,
      shotType: '跟镜头',
      knowledgePointUsed: false,
    });
  }

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `推镜头：缓慢推近，展示反转。`,
    visualDescription: `镜头缓慢推进，展示意外的结果。`,
    shotType: '推镜头',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Wait... it actually worked!`,
    action: '惊喜',
    visualDescription: `${chars[0]}惊喜地发现结果。`,
    shotType: '近景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `But look how much we made!`,
    action: '震惊',
    visualDescription: `${chars[1]}震惊地看着巨大的成果。`,
    shotType: '近景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `大景别（全景展示结果）。`,
    visualDescription: `大景别：展示完整的、超出预期的成果。`,
    shotType: '大景别',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[chars.length > 2 ? 2 : 1],
    dialogue: `Let's share it with everyone!`,
    action: '兴奋',
    visualDescription: `角色兴奋地提出解决方案。`,
    shotType: '中景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'All Together',
    dialogue: `Come and get it! It's free!`,
    action: '一起喊',
    visualDescription: `所有角色一起向四周招呼。`,
    shotType: '全景',
    audioNote: '欢快背景音乐',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `转场：淡出。`,
    visualDescription: `画面淡出，结束。`,
    shotType: '转场',
    audioNote: '结束音乐',
    knowledgePointUsed: false,
  });

  return {
    episodeCode: 'D1P1', // 可以动态生成
    title: `${chars.join(' & ')}: ${capitalizeFirst(extractTitle(themeDescription))}`,
    characters: characters.map(c => ({
      name: c.name,
      personality: c.personality || getDefaultPersonality(c.name),
    })),
    knowledgePoints: knowledgePoints.map(kp => ({
      name: kp.name,
      description: kp.description || '',
      repetitionCount: kp.repetitionCount,
    })),
    synopsis: synopsis,
    sceneSettings: [`【${location}设定：${themeDescription}】`],
    scenes,
  };
}

// === 辅助函数 ===

function extractActivity(theme: string): string {
  const lower = theme.toLowerCase();
  if (lower.includes('making') || lower.includes('cook')) return 'making something special';
  if (lower.includes('baking')) return 'baking something yummy';
  if (lower.includes('building')) return 'building something cool';
  if (lower.includes('painting')) return 'painting a picture';
  if (lower.includes('planting')) return 'planting some seeds';
  return 'working on a fun project';
}

function extractLocation(theme: string): string {
  const lower = theme.toLowerCase();
  if (lower.includes('kitchen')) return '厨房';
  if (lower.includes('park')) return '公园';
  if (lower.includes('school')) return '学校';
  if (lower.includes('playground')) return '游乐场';
  if (lower.includes('garden')) return '花园';
  if (lower.includes('stall') || lower.includes('market')) return '市集摊位';
  return '户外场地';
}

function extractTitle(theme: string): string {
  return theme.split(/[.!?]/)[0].trim().split(' ').slice(0, 6).join(' ') || 'An Adventure';
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateSynopsis(theme: string, characters: string[]): string {
  return `${characters[0]}和${characters[1]}正在进行一个有趣的项目。但当意外发生后，他们试图修复却让事情变得更加失控！通过团队合作和创意思维，他们发现有时候错误也能带来意想不到的美好结局。`;
}

function createProblemVersion(description: string): string {
  if (!description) return 'Something is wrong';
  const lower = description.toLowerCase();
  if (lower.includes('good')) return description.replace(/good/gi, 'terrible');
  if (lower.includes('nice')) return description.replace(/nice/gi, 'bad');
  if (lower.includes('perfect')) return description.replace(/perfect/gi, 'wrong');
  return 'This is not right';
}

function getDefaultPersonality(name: string): string {
  const lower = name.toLowerCase();
  if (lower === 'jenna') return '聪明、冷静、有时傲娇';
  if (lower === 'michael') return '好奇、热情、富有创造力';
  if (lower === 'zack') return '容易紧张、但勇于尝试';
  return 'Friendly and helpful';
}
