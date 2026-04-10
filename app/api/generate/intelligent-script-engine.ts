// 智能剧本生成器 - 根据主题关键词生成完全不同的剧情
// 不使用固定模板，每个主题都有独特的故事结构

interface KnowledgePoint {
  name: string;
  description?: string;
  repetitionCount: number;
}

interface Character {
  name: string;
  personality?: string;
}

interface StoryContext {
  theme: string;
  situation: string;
  conflict: string;
  resolution: string;
  tone: string;
}

export function generateIntelligentScript(
  themeDescription: string,
  knowledgePoints: KnowledgePoint[],
  difficulty: string,
  characters: Character[]
) {
  const chars = characters.map(c => c.name);

  // 第一步：分析主题，提取故事要素
  const context = analyzeThemeContext(themeDescription);

  // 第二步：根据主题生成独特的故事结构
  const storyStructure = generateUniqueStructure(context, chars);

  // 第三步：生成剧本场景
  const scenes = generateScenes(storyStructure, chars, knowledgePoints, context);

  // 第四步：生成元数据
  const title = generateTitle(context, chars);
  const synopsis = generateSynopsis(context, chars);

  return {
    episodeCode: 'D1P1',
    title,
    characters: characters.map(c => ({
      name: c.name,
      personality: c.personality || getDefaultPersonality(c.name),
    })),
    knowledgePoints: knowledgePoints.map(kp => ({
      name: kp.name,
      description: kp.description || '',
      repetitionCount: kp.repetitionCount,
    })),
    synopsis,
    sceneSettings: [context.setting],
    scenes,
  };
}

// ===== 核心：主题分析，提取故事DNA =====
function analyzeThemeContext(theme: string): StoryContext {
  const lower = theme.toLowerCase();

  // 提取动作词
  let mainAction = '';
  let situation = '';
  let conflict = '';
  let resolution = '';
  let tone = 'lighthearted';
  let location = '';
  let setting = '';

  // 分析地点
  if (lower.includes('park')) {
    location = '公园';
  } else if (lower.includes('school')) {
    location = '学校';
  } else if (lower.includes('library')) {
    location = '图书馆';
  } else if (lower.includes('beach')) {
    location = '海滩';
  } else if (lower.includes('playground')) {
    location = '游乐场';
  } else if (lower.includes('garden')) {
    location = '花园';
  } else if (lower.includes('museum')) {
    location = '博物馆';
  } else if (lower.includes('zoo')) {
    location = '动物园';
  } else if (lower.includes('store') || lower.includes('shop')) {
    location = '商店';
  } else {
    location = '户外场地';
  }

  setting = `【${location}设定：${theme}】`;

  // 根据动词识别故事类型
  if (lower.includes('find') || lower.includes('search') || lower.includes('look for') || lower.includes('lost')) {
    // 寻找类故事
    situation = `寻找某个重要的东西`;
    conflict = `找不到或找错了`;
    resolution = `最终通过观察和合作找到`;
    tone = 'mystery';

  } else if (lower.includes('help') || lower.includes('rescue') || lower.includes('save')) {
    // 帮助类故事
    situation = `某人或某物需要帮助`;
    conflict = `帮助的过程遇到困难`;
    resolution = `通过团队合作成功帮助`;
    tone = 'heartwarming';

  } else if (lower.includes('build') || lower.includes('make') || lower.includes('create')) {
    // 制作类故事
    situation = `想要制作或建造某物`;
    conflict = `制作过程中遇到挑战`;
    resolution = `完成作品，收获成就感`;
    tone = 'creative';

  } else if (lower.includes('learn') || lower.includes('discover') || lower.includes('explore')) {
    // 学习探索类故事
    situation = `发现新事物，想要了解`;
    conflict = `理解过程中产生误解`;
    resolution = `通过实践和思考真正理解`;
    tone = 'educational';

  } else if (lower.includes('play') || lower.includes('game') || lower.includes('compete')) {
    // 游戏竞赛类故事
    situation = `参加游戏或比赛`;
    conflict = `遇到强劲对手或规则困难`;
    resolution = `学会享受过程，友谊第一`;
    tone = 'competitive';

  } else if (lower.includes('surprise') || lower.includes('secret') || lower.includes('plan')) {
    // 惊喜秘密类故事
    situation = `准备惊喜或保守秘密`;
    conflict = `差点被发现或出现意外`;
    resolution = `成功保密，惊喜呈现`;
    tone = 'suspenseful';

  } else if (lower.includes('share') || lower.includes('give') || lower.includes('together')) {
    // 分享合作类故事
    situation = `需要分享或一起合作`;
    conflict = `开始时有分歧或不愿意`;
    resolution = `理解分享的快乐`;
    tone = 'heartwarming';

  } else {
    // 默认：友谊冒险类
    situation = `日常活动中发现有趣的事`;
    conflict = `遇到小挑战需要解决`;
    resolution = `通过友谊和智慧克服`;
    tone = 'lighthearted';
  }

  return {
    theme,
    situation,
    conflict,
    resolution,
    tone,
  };
}

// ===== 生成独特的故事结构 =====
function generateUniqueStructure(context: StoryContext, chars: string[]) {
  const { tone, situation, conflict, resolution } = context;

  // 根据故事基调生成不同的节奏结构
  if (tone === 'mystery') {
    return {
      act1: {
        name: '发现问题',
        beats: [
          { type: 'discovery', char: 0, content: '发现某物不见了' },
          { type: 'concern', char: 1, content: '表示担心' },
          { type: 'decision', char: 0, content: '决定一起寻找' },
        ],
      },
      act2: {
        name: '寻找过程',
        beats: [
          { type: 'search1', char: 0, content: '在第一个地方寻找' },
          { type: 'clue1', char: 1, content: '发现线索' },
          { type: 'search2', char: 0, content: '根据线索继续找' },
          { type: 'false_alarm', char: 1, content: '以为找到了但不是' },
        ],
      },
      act3: {
        name: '真相大白',
        beats: [
          { type: 'realization', char: 0, content: '突然想到真正的位置' },
          { type: 'confirmation', char: 1, content: '确认找到了' },
          { type: 'relief', char: 0, content: '松了一口气' },
        ],
      },
      act4: {
        name: '愉快结束',
        beats: [
          { type: 'lesson', char: 1, content: '学到教训' },
          { type: 'celebration', char: 0, content: '庆祝成功' },
        ],
      },
    };
  }

  else if (tone === 'heartwarming') {
    return {
      act1: {
        name: '遇见困难',
        beats: [
          { type: 'encounter', char: 0, content: '发现某人需要帮助' },
          { type: 'sympathy', char: 1, content: '表示同情' },
          { type: 'offer_help', char: 0, content: '主动提供帮助' },
        ],
      },
      act2: {
        name: '帮助过程',
        beats: [
          { type: 'first_attempt', char: 0, content: '第一次尝试帮助' },
          { type: 'difficulty', char: 1, content: '发现比想象的难' },
          { type: 'teamwork', char: 0, content: '决定团队合作' },
          { type: 'progress', char: 1, content: '逐渐有进展' },
        ],
      },
      act3: {
        name: '成功帮助',
        beats: [
          { type: 'final_push', char: 0, content: '最后一步' },
          { type: 'success', char: 1, content: '成功了' },
          { type: 'gratitude', char: 2, content: '被帮助者感谢' },
        ],
      },
      act4: {
        name: '温暖结尾',
        beats: [
          { type: 'reflection', char: 0, content: '感受帮助他人的快乐' },
          { type: 'friendship', char: 1, content: '友谊加深' },
        ],
      },
    };
  }

  else if (tone === 'creative') {
    return {
      act1: {
        name: '创意启发',
        beats: [
          { type: 'idea', char: 0, content: '有了创作想法' },
          { type: 'enthusiasm', char: 1, content: '觉得很棒' },
          { type: 'planning', char: 0, content: '计划如何制作' },
        ],
      },
      act2: {
        name: '制作过程',
        beats: [
          { type: 'start', char: 0, content: '开始制作' },
          { type: 'challenge', char: 1, content: '遇到技术难题' },
          { type: 'problem_solving', char: 0, content: '想办法解决' },
          { type: 'improvement', char: 1, content: '做出改进' },
        ],
      },
      act3: {
        name: '完成作品',
        beats: [
          { type: 'finishing', char: 0, content: '最后润色' },
          { type: 'reveal', char: 1, content: '展示成品' },
          { type: 'admiration', char: 2, content: '其他人欣赏' },
        ],
      },
      act4: {
        name: '自豪分享',
        beats: [
          { type: 'pride', char: 0, content: '对作品感到自豪' },
          { type: 'sharing', char: 1, content: '决定分享给大家' },
        ],
      },
    };
  }

  else if (tone === 'competitive') {
    return {
      act1: {
        name: '加入比赛',
        beats: [
          { type: 'invitation', char: 0, content: '发现有比赛' },
          { type: 'excitement', char: 1, content: '兴奋地想参加' },
          { type: 'preparation', char: 0, content: '准备参赛' },
        ],
      },
      act2: {
        name: '比赛进行',
        beats: [
          { type: 'first_round', char: 0, content: '第一轮表现不错' },
          { type: 'tough_opponent', char: 1, content: '遇到强劲对手' },
          { type: 'setback', char: 0, content: '暂时落后' },
          { type: 'encouragement', char: 1, content: '互相鼓励' },
        ],
      },
      act3: {
        name: '结果揭晓',
        beats: [
          { type: 'final_effort', char: 0, content: '全力以赴' },
          { type: 'outcome', char: 1, content: '结果公布' },
          { type: 'sportsmanship', char: 0, content: '展现体育精神' },
        ],
      },
      act4: {
        name: '友谊收获',
        beats: [
          { type: 'lesson_learned', char: 1, content: '理解过程比结果重要' },
          { type: 'new_friends', char: 0, content: '与对手成为朋友' },
        ],
      },
    };
  }

  // 默认：轻松冒险结构
  return {
    act1: {
      name: '偶然发现',
      beats: [
        { type: 'routine', char: 0, content: '日常活动中' },
        { type: 'discovery', char: 1, content: '发现有趣的事' },
        { type: 'curiosity', char: 0, content: '产生好奇' },
      ],
    },
    act2: {
      name: '尝试探索',
      beats: [
        { type: 'first_try', char: 0, content: '第一次尝试' },
        { type: 'unexpected', char: 1, content: '出现意外情况' },
        { type: 'adaptation', char: 0, content: '调整策略' },
        { type: 'cooperation', char: 1, content: '合作应对' },
      ],
    },
    act3: {
      name: '解决问题',
      beats: [
        { type: 'breakthrough', char: 0, content: '找到突破口' },
        { type: 'solution', char: 1, content: '问题解决' },
        { type: 'satisfaction', char: 0, content: '感到满意' },
      ],
    },
    act4: {
      name: '开心结束',
      beats: [
        { type: 'reflection', char: 1, content: '回顾经历' },
        { type: 'happiness', char: 0, content: '感到开心' },
      ],
    },
  };
}

// ===== 根据结构生成具体场景 =====
function generateScenes(structure: any, chars: string[], knowledgePoints: KnowledgePoint[], context: StoryContext) {
  const scenes: any[] = [];
  let order = 1;
  const kpUsed: { [key: string]: number } = {};
  knowledgePoints.forEach(kp => kpUsed[kp.name] = 0);

  const location = extractLocation(context.theme);

  // ACT 1
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 1 - 日，外，${location}`,
    visualDescription: `${location}全景，阳光明媚。`,
    shotType: '大景别',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `全景，展示${chars.join('和')}在场。`,
    visualDescription: `全景镜头：${chars[0]}和${chars[1]}在${location}。`,
    shotType: '全景',
    knowledgePointUsed: false,
  });

  structure.act1.beats.forEach((beat: any, idx: number) => {
    const charIdx = beat.char % chars.length;
    const line = generateDialogueForBeat(beat, context, chars, charIdx);
    const action = generateActionForBeat(beat);

    scenes.push({
      order: order++,
      role: chars[charIdx],
      dialogue: line,
      action: action,
      visualDescription: `${chars[charIdx]}${action}。`,
      shotType: idx === 0 ? '中景' : '近景',
      knowledgePointUsed: false,
    });

    // 在合适时机插入第一个知识点
    if (idx === 1 && knowledgePoints[0] && knowledgePoints[0].description) {
      const kp = knowledgePoints[0];
      scenes.push({
        order: order++,
        role: chars[(charIdx + 1) % chars.length],
        dialogue: `Look! ${kp.description}.`,
        action: '观察',
        visualDescription: `${chars[(charIdx + 1) % chars.length]}注意到细节。`,
        shotType: '近景',
        knowledgePointUsed: true,
        knowledgePointName: kp.name,
      });
      kpUsed[kp.name]++;
    }
  });

  // ACT 2
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 2 - 日，外，${location}（${structure.act2.name}）`,
    visualDescription: `气氛变化，${structure.act2.name}开始。`,
    shotType: '全景',
    knowledgePointUsed: false,
  });

  structure.act2.beats.forEach((beat: any, idx: number) => {
    const charIdx = beat.char % chars.length;
    const line = generateDialogueForBeat(beat, context, chars, charIdx);
    const action = generateActionForBeat(beat);

    scenes.push({
      order: order++,
      role: chars[charIdx],
      dialogue: line,
      action: action,
      visualDescription: `${chars[charIdx]}${action}。`,
      shotType: '中景',
      knowledgePointUsed: false,
    });

    // 插入知识点
    if (idx % 2 === 0) {
      const unusedKp = knowledgePoints.find(kp => kpUsed[kp.name] < kp.repetitionCount);
      if (unusedKp && unusedKp.description) {
        scenes.push({
          order: order++,
          role: chars[(charIdx + 1) % chars.length],
          dialogue: `${unusedKp.description}!`,
          action: '回应',
          visualDescription: `${chars[(charIdx + 1) % chars.length]}做出回应。`,
          shotType: '近景',
          knowledgePointUsed: true,
          knowledgePointName: unusedKp.name,
        });
        kpUsed[unusedKp.name]++;
      }
    }
  });

  // ACT 3
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 3 - 日，外，${location}（${structure.act3.name}）`,
    visualDescription: `关键时刻到来。`,
    shotType: '全景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `推镜头：聚焦关键时刻。`,
    visualDescription: `镜头推进，展示紧张时刻。`,
    shotType: '推镜头',
    audioNote: '紧张音乐',
    knowledgePointUsed: false,
  });

  structure.act3.beats.forEach((beat: any, idx: number) => {
    const charIdx = beat.char % chars.length;
    const line = generateDialogueForBeat(beat, context, chars, charIdx);
    const action = generateActionForBeat(beat);

    scenes.push({
      order: order++,
      role: beat.char === 2 && chars.length > 2 ? chars[2] : chars[charIdx],
      dialogue: line,
      action: action,
      visualDescription: `角色${action}。`,
      shotType: '特写',
      knowledgePointUsed: false,
    });
  });

  // 使用剩余知识点
  knowledgePoints.forEach(kp => {
    while (kpUsed[kp.name] < kp.repetitionCount && kp.description) {
      scenes.push({
        order: order++,
        role: chars[order % chars.length],
        dialogue: `${kp.description}!`,
        action: '表达',
        visualDescription: `角色表达感受。`,
        shotType: '近景',
        knowledgePointUsed: true,
        knowledgePointName: kp.name,
      });
      kpUsed[kp.name]++;
    }
  });

  // ACT 4
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 4 - 日，外，${location}（${structure.act4.name}）`,
    visualDescription: `温馨的结尾氛围。`,
    shotType: '全景',
    audioNote: '温馨音乐',
    knowledgePointUsed: false,
  });

  structure.act4.beats.forEach((beat: any) => {
    const charIdx = beat.char % chars.length;
    const line = generateDialogueForBeat(beat, context, chars, charIdx);
    const action = generateActionForBeat(beat);

    scenes.push({
      order: order++,
      role: chars[charIdx],
      dialogue: line,
      action: action,
      visualDescription: `${chars[charIdx]}${action}。`,
      shotType: '中景',
      knowledgePointUsed: false,
    });
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: '转场：淡出。',
    visualDescription: '画面淡出，结束。',
    shotType: '转场',
    audioNote: '结束音乐',
    knowledgePointUsed: false,
  });

  return scenes;
}

// ===== 生成对话 =====
function generateDialogueForBeat(beat: any, context: StoryContext, chars: string[], charIdx: number): string {
  const otherChar = chars[(charIdx + 1) % chars.length];

  switch (beat.type) {
    case 'discovery':
      return `Hey ${otherChar}! Look at this!`;
    case 'concern':
      return `Oh no! What should we do?`;
    case 'decision':
      return `Let's work together!`;
    case 'search1':
      return `Let me check here...`;
    case 'clue1':
      return `Wait! I found something!`;
    case 'search2':
      return `Let's try over there!`;
    case 'false_alarm':
      return `Oh... this isn't it.`;
    case 'realization':
      return `Wait! I know where it is!`;
    case 'confirmation':
      return `Yes! You found it!`;
    case 'relief':
      return `Phew! I'm so glad!`;
    case 'encounter':
      return `Look! Someone needs help!`;
    case 'sympathy':
      return `Poor thing... we should help!`;
    case 'offer_help':
      return `Don't worry! We'll help you!`;
    case 'first_attempt':
      return `Let me try this...`;
    case 'difficulty':
      return `This is harder than I thought...`;
    case 'teamwork':
      return `Let's do it together!`;
    case 'progress':
      return `It's working! Keep going!`;
    case 'final_push':
      return `Almost there... one more!`;
    case 'success':
      return `We did it!`;
    case 'gratitude':
      return `Thank you so much!`;
    case 'reflection':
      return `That felt really good!`;
    case 'friendship':
      return `I'm glad we're friends!`;
    case 'idea':
      return `I have a great idea!`;
    case 'enthusiasm':
      return `That sounds amazing!`;
    case 'planning':
      return `Let's make a plan first.`;
    case 'start':
      return `Okay, let's begin!`;
    case 'challenge':
      return `Hmm... this part is tricky.`;
    case 'problem_solving':
      return `Maybe if we try this way...`;
    case 'improvement':
      return `Yes! That's much better!`;
    case 'finishing':
      return `Just a little more...`;
    case 'reveal':
      return `Ta-da! What do you think?`;
    case 'admiration':
      return `Wow! That's incredible!`;
    case 'pride':
      return `I'm really proud of this!`;
    case 'sharing':
      return `Let's share it with everyone!`;
    case 'invitation':
      return `Look! There's a competition!`;
    case 'excitement':
      return `Let's join! It'll be fun!`;
    case 'preparation':
      return `We need to practice first.`;
    case 'first_round':
      return `We're doing great!`;
    case 'tough_opponent':
      return `Wow, they're really good!`;
    case 'setback':
      return `Don't give up! We can do this!`;
    case 'encouragement':
      return `You're doing amazing!`;
    case 'final_effort':
      return `Here we go! Give it everything!`;
    case 'outcome':
      return `The results are in!`;
    case 'sportsmanship':
      return `Good game! You were great!`;
    case 'lesson_learned':
      return `I had so much fun!`;
    case 'new_friends':
      return `Want to play again sometime?`;
    case 'routine':
      return `What a nice day!`;
    case 'curiosity':
      return `I wonder what that is?`;
    case 'first_try':
      return `Let me give it a try!`;
    case 'unexpected':
      return `Oops! That wasn't what I expected!`;
    case 'adaptation':
      return `Let's try a different way.`;
    case 'cooperation':
      return `Good teamwork!`;
    case 'breakthrough':
      return `I think I got it!`;
    case 'solution':
      return `Yes! Problem solved!`;
    case 'satisfaction':
      return `That worked perfectly!`;
    case 'happiness':
      return `This was a great day!`;
    default:
      return `Let's keep going!`;
  }
}

// ===== 生成动作 =====
function generateActionForBeat(beat: any): string {
  const actions: { [key: string]: string } = {
    discovery: '惊喜地指着',
    concern: '担心',
    decision: '坚定',
    search1: '仔细寻找',
    clue1: '兴奋',
    search2: '快步走向',
    false_alarm: '失望',
    realization: '恍然大悟',
    confirmation: '欢呼',
    relief: '如释重负',
    encounter: '停下脚步',
    sympathy: '同情',
    offer_help: '主动上前',
    first_attempt: '尝试',
    difficulty: '皱眉',
    teamwork: '击掌',
    progress: '鼓励',
    final_push: '全力以赴',
    success: '欢呼雀跃',
    gratitude: '感激',
    reflection: '满足',
    friendship: '微笑',
    idea: '灵光一闪',
    enthusiasm: '兴奋',
    planning: '思考',
    start: '开始行动',
    challenge: '困惑',
    problem_solving: '尝试新方法',
    improvement: '满意',
    finishing: '专注',
    reveal: '自豪地展示',
    admiration: '赞叹',
    pride: '自豪',
    sharing: '慷慨',
  };

  return actions[beat.type] || '说话';
}

// ===== 辅助函数 =====

function extractLocation(theme: string): string {
  const lower = theme.toLowerCase();
  if (lower.includes('park')) return '公园';
  if (lower.includes('school')) return '学校';
  if (lower.includes('library')) return '图书馆';
  if (lower.includes('beach')) return '海滩';
  if (lower.includes('playground')) return '游乐场';
  if (lower.includes('garden')) return '花园';
  if (lower.includes('museum')) return '博物馆';
  if (lower.includes('zoo')) return '动物园';
  if (lower.includes('store') || lower.includes('shop')) return '商店';
  return '户外场地';
}

function generateTitle(context: StoryContext, chars: string[]): string {
  const words = context.theme.split(/[.!?]/)[0].trim().split(' ').slice(0, 6);
  return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function generateSynopsis(context: StoryContext, chars: string[]): string {
  return `${chars[0]}和${chars[1]}${context.situation}。${context.conflict}，但最终${context.resolution}。这是一个关于${context.tone === 'heartwarming' ? '友谊和帮助' : context.tone === 'creative' ? '创造和努力' : context.tone === 'mystery' ? '观察和推理' : '合作和成长'}的温馨故事。`;
}

function getDefaultPersonality(name: string): string {
  const lower = name.toLowerCase();
  if (lower === 'jenna') return '聪明、冷静、有时傲娇';
  if (lower === 'michael') return '好奇、热情、富有创造力';
  if (lower === 'zack') return '容易紧张、但勇于尝试';
  return 'Friendly and helpful';
}
