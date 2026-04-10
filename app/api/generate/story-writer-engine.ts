// 真正的故事编剧引擎 - 生成有具体情节、有逻辑、有趣的故事

interface KnowledgePoint {
  name: string;
  description?: string;
  repetitionCount: number;
}

interface Character {
  name: string;
  personality?: string;
}

// 故事蓝图：包含具体细节的完整故事
interface StoryBlueprint {
  premise: string;          // 故事前提（具体发生了什么）
  characters: string[];     // 角色
  incitingIncident: string; // 引发事件（具体的）
  goal: string;            // 目标（具体的）
  obstacles: string[];     // 遇到的具体障碍
  twist: string;           // 转折点（具体的）
  resolution: string;      // 解决方式（具体的）
  details: {               // 故事细节
    object?: string;       // 关键物品
    location: string;      // 地点
    timeOfDay: string;     // 时间
    emotion: string;       // 情感基调
  };
}

export function generateStoryScript(
  themeDescription: string,
  knowledgePoints: KnowledgePoint[],
  difficulty: string,
  characters: Character[]
) {
  const chars = characters.map(c => c.name);

  // 第一步：从主题生成具体的故事蓝图
  const blueprint = createStoryBlueprint(themeDescription, chars);

  // 第二步：根据蓝图生成场景
  const scenes = writeStoryScenes(blueprint, chars, knowledgePoints);

  // 第三步：生成元数据
  return {
    episodeCode: 'D1P1',
    title: generateTitle(blueprint),
    characters: characters.map(c => ({
      name: c.name,
      personality: c.personality || '友好、乐于助人',
    })),
    knowledgePoints: knowledgePoints.map(kp => ({
      name: kp.name,
      description: kp.description || '',
      repetitionCount: kp.repetitionCount,
    })),
    synopsis: blueprint.premise,
    sceneSettings: [`【${blueprint.details.location}设定：${blueprint.premise}】`],
    scenes,
  };
}

// ===== 核心：创建具体的故事蓝图 =====
function createStoryBlueprint(theme: string, chars: string[]): StoryBlueprint {
  const lower = theme.toLowerCase();

  // 分析主题，生成具体故事细节
  if (lower.includes('lost') && lower.includes('puppy')) {
    // 找走失的小狗 - 生成具体故事
    return {
      premise: `${chars[0]}和${chars[1]}在公园散步时，发现一只迷路的小狗在树下哭泣。小狗的项圈上写着"Buddy"，但找不到主人。两人决定帮小狗找到回家的路。`,
      characters: chars,
      incitingIncident: `在公园的长椅旁，${chars[0]}听到了小狗的哭声`,
      goal: `帮助小狗Buddy找到它的家和主人`,
      obstacles: [
        '小狗太害怕，不愿意走',
        '找到了三个不同的地址，但都不对',
        '天快黑了，小狗越来越焦虑',
      ],
      twist: `最后发现小狗的家就在公园旁边，主人一直在找它`,
      resolution: `跟着小狗熟悉的气味，最终在公园入口遇到了正在寻找的主人`,
      details: {
        object: '一只棕色的小狗Buddy',
        location: '公园',
        timeOfDay: '下午',
        emotion: '温暖、紧张到欣慰',
      },
    };
  }

  else if (lower.includes('build') && lower.includes('treehouse')) {
    // 建树屋 - 具体故事
    return {
      premise: `${chars[0]}和${chars[1]}想在后院的大橡树上建一个树屋。他们收集了木板、绳子和工具，计划在周末完成这个秘密基地。`,
      characters: chars,
      incitingIncident: `${chars[0]}在院子里发现了完美的橡树，树枝刚好可以放平台`,
      goal: `在橡树上建造一个安全又酷的树屋`,
      obstacles: [
        '木板太重，两个人抬不上去',
        '绳子绑法不对，平台一直歪',
        '钉子钉歪了，差点掉下来',
      ],
      twist: `邻居家的${chars.length > 2 ? chars[2] : '朋友'}看到了，主动来帮忙，还带来了更好的工具`,
      resolution: `三个人合作，用滑轮系统把木板拉上去，终于建成了完美的树屋`,
      details: {
        object: '树屋平台',
        location: '后院橡树',
        timeOfDay: '周六上午',
        emotion: '兴奋、挫折到成就感',
      },
    };
  }

  else if (lower.includes('find') && lower.includes('toy')) {
    // 找玩具 - 具体故事
    return {
      premise: `${chars[0]}心爱的红色小汽车玩具不见了！这是他生日收到的礼物，今天下午要带去学校分享。${chars[1]}决定帮他一起找。`,
      characters: chars,
      incitingIncident: `${chars[0]}发现玩具车不在平时放的玩具箱里`,
      goal: `在去学校之前找到红色小汽车`,
      obstacles: [
        '在沙发底下找到很多东西，但没有小汽车',
        '问了妈妈，妈妈说没看到',
        '时间不够了，快要迟到',
      ],
      twist: `${chars[1]}想起昨天看到小狗叼着什么东西，去狗窝一看，小汽车在那里！`,
      resolution: `原来是小狗把玩具当成了自己的玩具，藏在了窝里。大家都笑了`,
      details: {
        object: '红色小汽车玩具',
        location: '家里',
        timeOfDay: '早上上学前',
        emotion: '着急、焦虑到释然',
      },
    };
  }

  // 默认：通用冒险故事（生成具体细节）
  const activity = extractActivity(theme);
  const location = extractLocation(theme);

  return {
    premise: `${chars[0]}和${chars[1]}在${location}进行${activity}。他们遇到了意想不到的挑战，但通过合作和智慧成功完成了目标。`,
    characters: chars,
    incitingIncident: `${chars[0]}在${location}发现了有趣的事情`,
    goal: `完成${activity}并享受过程`,
    obstacles: [
      '第一次尝试没有成功',
      '需要更多帮助和资源',
      '时间有限，需要加快速度',
    ],
    twist: `发现了更好的方法`,
    resolution: `通过团队合作成功完成`,
    details: {
      location,
      timeOfDay: '白天',
      emotion: '快乐、充实',
    },
  };
}

// ===== 根据蓝图编写场景 =====
function writeStoryScenes(
  blueprint: StoryBlueprint,
  chars: string[],
  knowledgePoints: KnowledgePoint[]
) {
  const scenes: any[] = [];
  let order = 1;
  const kpUsed: { [key: string]: number } = {};
  knowledgePoints.forEach(kp => kpUsed[kp.name] = 0);

  // ===== ACT 1: 开场和引发事件 =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 1 - ${blueprint.details.timeOfDay === '早上上学前' ? '晨' : '日'}，${blueprint.details.location.includes('家') ? '内' : '外'}，${blueprint.details.location}`,
    visualDescription: `${blueprint.details.location}，${blueprint.details.timeOfDay}，${blueprint.details.emotion.split('、')[0]}的氛围。`,
    shotType: '大景别',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `全景镜头：展示${blueprint.details.location}的环境，${chars.join('和')}出现。`,
    visualDescription: `全景：${chars[0]}和${chars[1]}在${blueprint.details.location}。`,
    shotType: '全景',
    knowledgePointUsed: false,
  });

  // 引发事件 - 具体的发现
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `${chars[1]}! Look over there!`,
    action: '指向某处',
    visualDescription: `${chars[0]}注意到了什么，兴奋地指给${chars[1]}看。`,
    shotType: '中景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `What is it?`,
    action: '好奇地走近',
    visualDescription: `${chars[1]}快步走过来，表情好奇。`,
    shotType: '中景',
    knowledgePointUsed: false,
  });

  // 发现问题/目标（具体的）
  const incidentDesc = blueprint.incitingIncident.replace(`${chars[0]}`, 'I');
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: extractDialogue(blueprint.incitingIncident, chars[0]),
    action: '发现',
    visualDescription: `${chars[0]}发现了问题的关键。`,
    shotType: '近景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `特写镜头：${blueprint.details.object || '关键物品'}。`,
    visualDescription: `特写：展示${blueprint.details.object || '问题所在'}的细节。`,
    shotType: '特写',
    knowledgePointUsed: false,
  });

  // 表达关心 - 融入第一个知识点
  if (knowledgePoints[0] && kpUsed[knowledgePoints[0].name] < knowledgePoints[0].repetitionCount) {
    const kp = knowledgePoints[0];
    scenes.push({
      order: order++,
      role: chars[1],
      dialogue: `Oh no! ${kp.description || kp.name}`,
      action: '担心',
      visualDescription: `${chars[1]}表达担心。`,
      shotType: '近景',
      knowledgePointUsed: true,
      knowledgePointName: kp.name,
    });
    kpUsed[kp.name]++;
  }

  // 决定帮忙
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `We need to ${blueprint.goal.split('帮助')[1] || 'help'}! Let's go!`,
    action: '坚定',
    visualDescription: `${chars[0]}做出决定。`,
    shotType: '中景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Yes! I'll help you!`,
    action: '点头',
    visualDescription: `${chars[1]}表示同意。`,
    shotType: '近景',
    knowledgePointUsed: false,
  });

  // ===== ACT 2: 行动和障碍 =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 2 - 同一地点（行动开始）`,
    visualDescription: `气氛变得紧张，两人开始行动。`,
    shotType: '全景',
    knowledgePointUsed: false,
  });

  // 障碍 1
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: extractDialogueFromObstacle(blueprint.obstacles[0], chars[0]),
    action: '尝试',
    visualDescription: `${chars[0]}开始第一次尝试。`,
    shotType: '中景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Let me try here!`,
    action: '帮忙',
    visualDescription: `${chars[1]}也加入行动。`,
    shotType: '中景',
    knowledgePointUsed: false,
  });

  // 融入第二个知识点
  if (knowledgePoints.length > 1 && kpUsed[knowledgePoints[1].name] < knowledgePoints[1].repetitionCount) {
    const kp = knowledgePoints[1];
    scenes.push({
      order: order++,
      role: chars[1],
      dialogue: `${kp.description || kp.name}`,
      action: '询问',
      visualDescription: `${chars[1]}寻求帮助或提供帮助。`,
      shotType: '近景',
      knowledgePointUsed: true,
      knowledgePointName: kp.name,
    });
    kpUsed[kp.name]++;
  }

  // 障碍 2
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: extractDialogueFromObstacle(blueprint.obstacles[1], chars[0]),
    action: '挫折',
    visualDescription: `遇到了新的困难。`,
    shotType: '近景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Don't give up! We can do this!`,
    action: '鼓励',
    visualDescription: `${chars[1]}鼓励${chars[0]}。`,
    shotType: '中景',
    knowledgePointUsed: false,
  });

  // ===== ACT 3: 转折和发现 =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 3 - 同一地点（转折点）`,
    visualDescription: `关键时刻到来。`,
    shotType: '全景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `推镜头：聚焦关键发现时刻。`,
    visualDescription: `镜头缓缓推进，营造紧张感。`,
    shotType: '推镜头',
    audioNote: '紧张音乐',
    knowledgePointUsed: false,
  });

  // 转折 - 灵光一现
  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `Wait! I have an idea!`,
    action: '突然想到',
    visualDescription: `${chars[1]}灵光一现。`,
    shotType: '特写',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `What is it? Tell me!`,
    action: '期待',
    visualDescription: `${chars[0]}充满期待。`,
    shotType: '近景',
    knowledgePointUsed: false,
  });

  // 说出转折点
  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: extractDialogueFromTwist(blueprint.twist, chars),
    action: '解释',
    visualDescription: `${chars[1]}说出了关键想法。`,
    shotType: '中景',
    knowledgePointUsed: false,
  });

  // 继续使用剩余知识点
  knowledgePoints.forEach(kp => {
    if (kpUsed[kp.name] < kp.repetitionCount && kp.description) {
      scenes.push({
        order: order++,
        role: chars[order % 2],
        dialogue: `${kp.description}!`,
        action: '表达',
        visualDescription: `角色使用知识点表达。`,
        shotType: '近景',
        knowledgePointUsed: true,
        knowledgePointName: kp.name,
      });
      kpUsed[kp.name]++;
    }
  });

  // ===== ACT 4: 解决和结局 =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 4 - 同一地点或新地点（解决）`,
    visualDescription: `成功在即，氛围转为欢快。`,
    shotType: '全景',
    audioNote: '温馨音乐',
    knowledgePointUsed: false,
  });

  // 实施解决方案
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Let's try it! Together!`,
    action: '行动',
    visualDescription: `两人一起行动。`,
    shotType: '中景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `蒙太奇：快速展示行动过程。`,
    visualDescription: `快速切换镜头，展示合作过程。`,
    shotType: '蒙太奇',
    knowledgePointUsed: false,
  });

  // 成功时刻
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: extractSuccessDialogue(blueprint.resolution, chars[0]),
    action: '兴奋',
    visualDescription: `${chars[0]}兴奋地发现成功了。`,
    shotType: '特写',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `We did it! We really did it!`,
    action: '欢呼',
    visualDescription: `${chars[1]}欢呼雀跃。`,
    shotType: '中景',
    knowledgePointUsed: false,
  });

  // 第三个角色出现（如果有）
  if (chars.length > 2 && blueprint.twist.includes(chars[2])) {
    scenes.push({
      order: order++,
      role: chars[2],
      dialogue: `Hey! You did great! I'm proud of you!`,
      action: '出现',
      visualDescription: `${chars[2]}出现，表示祝贺。`,
      shotType: '中景',
      knowledgePointUsed: false,
    });
  }

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `大景别：展示完整的成功画面。`,
    visualDescription: `大景别：所有人都很开心，问题解决了。`,
    shotType: '大景别',
    knowledgePointUsed: false,
  });

  // 温馨结尾
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `That was amazing! Thank you for helping me!`,
    action: '感激',
    visualDescription: `${chars[0]}表达感谢。`,
    shotType: '近景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `That's what friends are for!`,
    action: '微笑',
    visualDescription: `${chars[1]}温暖地笑着。`,
    shotType: '近景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: '转场：淡出。',
    visualDescription: '画面温馨淡出，结束。',
    shotType: '转场',
    audioNote: '温馨结束音乐',
    knowledgePointUsed: false,
  });

  return scenes;
}

// ===== 辅助函数：从故事元素提取对话 =====

function extractDialogue(incident: string, charName: string): string {
  // 从描述中提取角色可能说的话
  if (incident.includes('听到') && incident.includes('哭声')) {
    return `Do you hear that? It sounds like... crying?`;
  }
  if (incident.includes('发现') && incident.includes('橡树')) {
    return `Look at this tree! It's perfect for a treehouse!`;
  }
  if (incident.includes('玩具') && incident.includes('不在')) {
    return `Oh no! My toy car is missing! I can't find it anywhere!`;
  }
  return `Look! Something happened here!`;
}

function extractDialogueFromObstacle(obstacle: string, charName: string): string {
  if (obstacle.includes('太重')) {
    return `This is too heavy! I can't lift it alone!`;
  }
  if (obstacle.includes('不愿意走')) {
    return `The puppy is scared. It won't move...`;
  }
  if (obstacle.includes('找到') && obstacle.includes('不对')) {
    return `Hmm... this isn't the right place either.`;
  }
  if (obstacle.includes('没看到')) {
    return `I looked everywhere... but nothing!`;
  }
  return `This is harder than I thought...`;
}

function extractDialogueFromTwist(twist: string, chars: string[]): string {
  if (twist.includes('小狗的家就在')) {
    return `Wait... what if the home is nearby? Let's check around here!`;
  }
  if (twist.includes('邻居') && twist.includes('帮忙')) {
    return `My neighbor has better tools! Let's ask for help!`;
  }
  if (twist.includes('小狗') && twist.includes('窝里')) {
    return `I remember! The dog was carrying something yesterday! Let's check the dog house!`;
  }
  return `I know! Let's try a different way!`;
}

function extractSuccessDialogue(resolution: string, charName: string): string {
  if (resolution.includes('遇到了') && resolution.includes('主人')) {
    return `Look! There's someone running towards us! Is that...?`;
  }
  if (resolution.includes('滑轮')) {
    return `Yes! The pulley worked! We did it!`;
  }
  if (resolution.includes('藏在') && resolution.includes('窝里')) {
    return `I found it! It's here in the dog house!`;
  }
  return `We did it! Finally!`;
}

function extractActivity(theme: string): string {
  if (theme.includes('build')) return '建造';
  if (theme.includes('find')) return '寻找';
  if (theme.includes('help')) return '帮助';
  if (theme.includes('make')) return '制作';
  return '活动';
}

function extractLocation(theme: string): string {
  const lower = theme.toLowerCase();
  if (lower.includes('park')) return '公园';
  if (lower.includes('home') || lower.includes('house')) return '家里';
  if (lower.includes('school')) return '学校';
  if (lower.includes('garden')) return '花园';
  return '户外';
}

function generateTitle(blueprint: StoryBlueprint): string {
  return blueprint.goal.slice(0, 50) || 'An Adventure';
}
