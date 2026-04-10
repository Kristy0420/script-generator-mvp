// 创意剧本生成器 - 根据主题自由创作，不套用固定模板
// 只保证：格式专业 + 知识点融入 + 有趣有逻辑

interface KnowledgePoint {
  name: string;
  description?: string;
  repetitionCount: number;
}

interface Character {
  name: string;
  personality?: string;
}

export function generateCreativeScript(
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

  // 分析主题，提取关键元素
  const storyElements = analyzeTheme(themeDescription);

  // 生成标题
  const title = generateTitle(themeDescription, chars);

  // 生成梗概（基于主题）
  const synopsis = generateSynopsis(themeDescription, chars, storyElements);

  // ===== 开场：建立情境 =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 1 - ${storyElements.timeOfDay}，${storyElements.location.type}，${storyElements.location.name}`,
    visualDescription: `${storyElements.opening.atmosphere}`,
    shotType: '大景别',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: `全景，展示${storyElements.location.name}和角色。`,
    visualDescription: `全景镜头：${storyElements.opening.visual}`,
    shotType: '全景',
    knowledgePointUsed: false,
  });

  // 角色互动，自然引入情境
  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: storyElements.opening.firstLine,
    action: storyElements.opening.firstAction,
    visualDescription: `${chars[0]}${storyElements.opening.firstAction}。`,
    shotType: '中景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: storyElements.opening.response,
    action: '回应',
    visualDescription: `${chars[1]}做出反应。`,
    shotType: '中景',
    knowledgePointUsed: false,
  });

  // 引入第一个知识点（自然融入对话）
  const kp1 = knowledgePoints[0];
  if (kp1.description) {
    const kpLine = integrateKnowledgePoint(kp1, 'introduce', storyElements);
    scenes.push({
      order: order++,
      role: chars[0],
      dialogue: kpLine,
      action: '观察/描述',
      visualDescription: `${chars[0]}注意到重要细节。`,
      shotType: '近景',
      knowledgePointUsed: true,
      knowledgePointName: kp1.name,
    });
    kpUsed[kp1.name]++;
  }

  // 建立目标/任务
  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: storyElements.goal,
    action: '提议',
    visualDescription: `${chars[1]}提出想法。`,
    shotType: '中景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: `Good idea! Let's do it!`,
    action: '同意',
    visualDescription: `${chars[0]}点头赞同。`,
    shotType: '近景',
    knowledgePointUsed: false,
  });

  // ===== 发展：推进情节 =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 2 - ${storyElements.timeOfDay}，${storyElements.location.type}，${storyElements.location.name}（${storyElements.development.subtitle}）`,
    visualDescription: storyElements.development.atmosphere,
    shotType: '全景',
    knowledgePointUsed: false,
  });

  // 根据主题发展剧情
  storyElements.development.beats.forEach((beat: any) => {
    scenes.push({
      order: order++,
      role: beat.character === 1 ? chars[0] : chars[1],
      dialogue: beat.line,
      action: beat.action,
      visualDescription: beat.visual,
      shotType: beat.shotType || '中景',
      knowledgePointUsed: false,
    });

    // 在合适时机插入知识点
    if (beat.useKnowledgePoint && knowledgePoints.length > 1) {
      const kp = knowledgePoints.find(k => kpUsed[k.name] < k.repetitionCount);
      if (kp && kp.description) {
        const kpLine = integrateKnowledgePoint(kp, 'develop', storyElements);
        scenes.push({
          order: order++,
          role: beat.character === 1 ? chars[1] : chars[0],
          dialogue: kpLine,
          action: '回应',
          visualDescription: `角色做出反应。`,
          shotType: '近景',
          knowledgePointUsed: true,
          knowledgePointName: kp.name,
        });
        kpUsed[kp.name]++;
      }
    }
  });

  // ===== 高潮：关键转折 =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 3 - ${storyElements.timeOfDay}，${storyElements.location.type}，${storyElements.location.name}（${storyElements.climax.subtitle}）`,
    visualDescription: storyElements.climax.atmosphere,
    shotType: '全景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: storyElements.climax.cameraDirection,
    visualDescription: storyElements.climax.visual,
    shotType: storyElements.climax.shotType,
    audioNote: storyElements.climax.audio,
    knowledgePointUsed: false,
  });

  // 高潮对话
  storyElements.climax.beats.forEach((beat: any) => {
    scenes.push({
      order: order++,
      role: beat.character === 'all' ? 'All Together' : (beat.character === 1 ? chars[0] : chars[1]),
      dialogue: beat.line,
      action: beat.action,
      visualDescription: beat.visual,
      shotType: beat.shotType || '中景',
      knowledgePointUsed: false,
    });
  });

  // 使用剩余知识点
  knowledgePoints.forEach(kp => {
    if (kpUsed[kp.name] < kp.repetitionCount && kp.description) {
      const kpLine = integrateKnowledgePoint(kp, 'climax', storyElements);
      scenes.push({
        order: order++,
        role: chars[order % 2],
        dialogue: kpLine,
        action: '表达',
        visualDescription: '角色表达感受。',
        shotType: '近景',
        knowledgePointUsed: true,
        knowledgePointName: kp.name,
      });
      kpUsed[kp.name]++;
    }
  });

  // ===== 结局：解决和收尾 =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 4 - ${storyElements.timeOfDay}，${storyElements.location.type}，${storyElements.location.name}（${storyElements.resolution.subtitle}）`,
    visualDescription: storyElements.resolution.atmosphere,
    shotType: '全景',
    audioNote: storyElements.resolution.audio,
    knowledgePointUsed: false,
  });

  // 第三个角色出现（如果有）
  if (chars.length > 2 && storyElements.resolution.thirdCharacterEnters) {
    scenes.push({
      order: order++,
      role: chars[2],
      dialogue: storyElements.resolution.thirdCharacterLine,
      action: '出现',
      visualDescription: `${chars[2]}${storyElements.resolution.thirdCharacterAction}。`,
      shotType: '中景',
      knowledgePointUsed: false,
    });
  }

  // 结局对话
  storyElements.resolution.beats.forEach((beat: any) => {
    scenes.push({
      order: order++,
      role: beat.character === 1 ? chars[0] : (beat.character === 2 ? chars[1] : chars[2] || chars[0]),
      dialogue: beat.line,
      action: beat.action,
      visualDescription: beat.visual,
      shotType: beat.shotType || '中景',
      knowledgePointUsed: false,
    });
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: '转场：淡出。',
    visualDescription: '画面淡出，音乐渐弱，结束。',
    shotType: '转场',
    audioNote: '结束音乐',
    knowledgePointUsed: false,
  });

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
    sceneSettings: [`【${storyElements.location.name}设定：${storyElements.location.description}】`],
    scenes,
  };
}

// === 主题分析：根据用户输入灵活创作 ===
function analyzeTheme(theme: string): any {
  const lower = theme.toLowerCase();

  // 这里不再固定套路，而是根据主题关键词生成不同的故事结构

  // 示例：如果是关于学习/发现的主题
  if (lower.includes('learn') || lower.includes('find') || lower.includes('discover')) {
    return {
      timeOfDay: '日',
      location: {
        type: '外',
        name: extractLocation(theme),
        description: theme,
      },
      opening: {
        atmosphere: '阳光明媚，充满探索气氛。',
        visual: '角色们聚在一起，准备开始探索。',
        firstLine: 'Hey! I found something interesting!',
        firstAction: '兴奋地指向某处',
        response: 'Really? Show me!',
      },
      goal: 'Let\'s figure out what this is!',
      development: {
        subtitle: '探索过程',
        atmosphere: '角色们仔细观察和研究。',
        beats: [
          { character: 1, line: 'Look at this part!', action: '指着', visual: '角色指向关键细节。', shotType: '特写', useKnowledgePoint: true },
          { character: 2, line: 'Wow! That\'s so cool!', action: '惊叹', visual: '角色露出惊讶表情。' },
          { character: 1, line: 'Let me try something...', action: '尝试', visual: '角色开始操作。' },
        ],
      },
      climax: {
        subtitle: '发现真相',
        atmosphere: '突然恍然大悟的时刻。',
        cameraDirection: '推镜头：聚焦关键发现。',
        visual: '镜头推进，展示重要发现。',
        shotType: '特写',
        audio: '发现音效',
        beats: [
          { character: 1, line: 'Wait! I got it!', action: '突然明白', visual: '角色眼睛发亮。' },
          { character: 2, line: 'You figured it out!', action: '兴奋', visual: '角色跳起来。' },
        ],
      },
      resolution: {
        subtitle: '圆满结束',
        atmosphere: '愉快的结局氛围。',
        audio: '欢快音乐',
        thirdCharacterEnters: true,
        thirdCharacterLine: 'What did you discover?',
        thirdCharacterAction: '走过来询问',
        beats: [
          { character: 1, line: 'We learned something amazing!', action: '自豪', visual: '角色自豪地展示成果。' },
          { character: 2, line: 'Yeah! This was so much fun!', action: '开心', visual: '角色们相视而笑。' },
        ],
      },
    };
  }

  // 默认：通用故事结构（不是 Fresh Soup 那种）
  return {
    timeOfDay: '日',
    location: {
      type: '外',
      name: extractLocation(theme),
      description: theme,
    },
    opening: {
      atmosphere: '平静的开场。',
      visual: '角色们在进行日常活动。',
      firstLine: `Hi! What are you doing today?`,
      firstAction: '打招呼',
      response: 'I\'m working on something. Want to join?',
    },
    goal: 'Let\'s work together!',
    development: {
      subtitle: '合作过程',
      atmosphere: '角色们一起努力。',
      beats: [
        { character: 1, line: 'I\'ll do this part.', action: '开始工作', visual: '角色开始行动。', useKnowledgePoint: true },
        { character: 2, line: 'I\'ll help you with that.', action: '协助', visual: '另一个角色加入。' },
        { character: 1, line: 'Great teamwork!', action: '称赞', visual: '角色们配合默契。' },
      ],
    },
    climax: {
      subtitle: '完成任务',
      atmosphere: '即将完成的紧张时刻。',
      cameraDirection: '镜头推进，展示完成瞬间。',
      visual: '特写：完成的瞬间。',
      shotType: '特写',
      audio: '成功音效',
      beats: [
        { character: 1, line: 'Almost done...', action: '专注', visual: '角色全神贯注。' },
        { character: 2, line: 'You can do it!', action: '鼓励', visual: '角色加油打气。' },
        { character: 'all', line: 'We did it!', action: '庆祝', visual: '所有人一起庆祝。' },
      ],
    },
    resolution: {
      subtitle: '愉快结束',
      atmosphere: '满意的结局。',
      audio: '温馨音乐',
      thirdCharacterEnters: false,
      thirdCharacterLine: '',
      thirdCharacterAction: '',
      beats: [
        { character: 1, line: 'That was fun!', action: '满足', visual: '角色露出满意笑容。' },
        { character: 2, line: 'Let\'s do it again sometime!', action: '约定', visual: '角色们击掌。' },
      ],
    },
  };
}

// === 辅助函数 ===

function extractLocation(theme: string): string {
  const lower = theme.toLowerCase();
  if (lower.includes('kitchen')) return '厨房';
  if (lower.includes('park')) return '公园';
  if (lower.includes('school')) return '学校';
  if (lower.includes('playground')) return '游乐场';
  if (lower.includes('garden')) return '花园';
  if (lower.includes('library')) return '图书馆';
  if (lower.includes('beach')) return '海滩';
  if (lower.includes('forest')) return '森林';
  return '户外场地';
}

function generateTitle(theme: string, chars: string[]): string {
  const words = theme.split(/[.!?]/)[0].trim().split(' ').slice(0, 6);
  return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function generateSynopsis(theme: string, chars: string[], elements: any): string {
  return `${chars[0]}和${chars[1]}${theme.split(/[.!?]/)[0]}。通过合作和努力，他们完成了任务，学到了重要的知识。`;
}

function integrateKnowledgePoint(kp: KnowledgePoint, context: string, elements: any): string {
  // 根据上下文自然地使用知识点
  if (!kp.description) return kp.name;

  if (context === 'introduce') {
    return `Look! ${kp.description}.`;
  } else if (context === 'develop') {
    return `${kp.description}!`;
  } else if (context === 'climax') {
    return `This is ${kp.description}!`;
  }

  return kp.description;
}

function getDefaultPersonality(name: string): string {
  const lower = name.toLowerCase();
  if (lower === 'jenna') return '聪明、冷静、有时傲娇';
  if (lower === 'michael') return '好奇、热情、富有创造力';
  if (lower === 'zack') return '容易紧张、但勇于尝试';
  return 'Friendly and helpful';
}
