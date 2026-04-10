// 符合儿童动画规范的剧本生成引擎
// 严格遵循：因果链、目标统一、行为逻辑、视听表达、安全价值观

interface KnowledgePoint {
  name: string;
  description?: string;
  repetitionCount: number;
}

interface Character {
  name: string;
  personality?: string;
}

// 符合规范的故事结构
interface CompliantStory {
  // 1. 核心结构
  singleCausalChain: {
    A: string;  // 初始状态/问题（具体、可视）
    B: string;  // 因为A导致的第一个后果
    C: string;  // 因为B导致的最终结果
    goal: string; // 统一的核心目标
  };

  // 2. 行为逻辑
  behaviors: Array<{
    trigger: string;      // 行为的触发原因（前文已出现）
    action: string;       // 具体行动（可视、可理解）
    consequence: string;  // 行为导致的结果
    visibleMotivation: string; // 可见的动机（不需要解释）
  }>;

  // 3. 信息完整性
  establishedInfo: string[];  // 前文已建立的信息

  // 4. 视听要求
  openingVisual: string;  // 开场即可看懂的画面
  keyActions: Array<{
    action: string;       // 关键动作（有过程）
    visualClear: string;  // 静音也能看懂
    focusPoint: string;   // 1秒能定位的焦点
  }>;

  // 5. 安全与价值观
  safetyCheck: {
    noImitableRisk: boolean;     // 无可模仿危险
    positiveOutcome: boolean;    // 正向行为获益
    noShortcuts: boolean;        // 无工具直接解决
    processMatters: boolean;     // 重视过程而非速成
  };
}

export function generateCompliantStory(
  themeDescription: string,
  knowledgePoints: KnowledgePoint[],
  difficulty: string,
  characters: Character[]
) {
  const chars = characters.map(c => c.name);

  // 第一步：根据主题生成符合规范的故事结构
  const story = buildCompliantStory(themeDescription, chars);

  // 第二步：验证是否符合规范
  if (!validateStory(story)) {
    throw new Error('Story does not meet compliance requirements');
  }

  // 第三步：生成场景（每一步都确保符合规范）
  const scenes = writeCompliantScenes(story, chars, knowledgePoints);

  return {
    episodeCode: 'D1P1',
    title: story.singleCausalChain.goal,
    characters: characters.map(c => ({
      name: c.name,
      personality: c.personality || '友好、乐于助人',
    })),
    knowledgePoints: knowledgePoints.map(kp => ({
      name: kp.name,
      description: kp.description || '',
      repetitionCount: kp.repetitionCount,
    })),
    synopsis: `${story.singleCausalChain.A}。${story.singleCausalChain.B}。最终${story.singleCausalChain.C}。`,
    sceneSettings: [`【设定：${story.openingVisual}】`],
    scenes,
  };
}

// ===== 核心：构建符合规范的故事 =====
function buildCompliantStory(theme: string, chars: string[]): CompliantStory {
  const lower = theme.toLowerCase();

  // 示例：走失的小狗（符合所有规范）
  if (lower.includes('lost') && lower.includes('puppy')) {
    return {
      // 1. 单一因果链：A→B→C
      singleCausalChain: {
        A: `${chars[0]}和${chars[1]}听到公园长椅下传来小狗的哭声`,  // 可视的初始状态
        B: `他们发现小狗项圈上有名字"Buddy"，决定帮它找主人`,    // 因为A所以采取行动
        C: `通过让Buddy闻项圈，小狗带他们找到了就在公园入口等待的主人`, // 因为B的方法，导致C结果
        goal: '帮助走失的小狗Buddy找到主人',  // 统一目标
      },

      // 2. 每个行为都有清晰的逻辑链
      behaviors: [
        {
          trigger: '听到哭声（开场已建立）',
          action: `${chars[0]}走向长椅，蹲下查看`,
          consequence: '发现是一只小狗在哭',
          visibleMotivation: '关心他人（儿童可理解的正向动机）',
        },
        {
          trigger: '小狗不认识他们，害怕（前一幕已展示）',
          action: `${chars[1]}慢慢伸手，让小狗闻自己`,
          consequence: '小狗放松了一些',
          visibleMotivation: '温柔对待动物（正向教育）',
        },
        {
          trigger: '看到项圈上的名字（画面特写已展示）',
          action: `${chars[0]}读出"Buddy"，温柔地叫这个名字`,
          consequence: '小狗有反应，摇尾巴',
          visibleMotivation: '通过名字建立信任（合理推导）',
        },
        {
          trigger: '小狗摇尾巴了但还是不走（前一幕已展示）',
          action: `${chars[1]}想到：让Buddy闻项圈，它可能能找到主人`,
          consequence: 'Buddy开始沿着气味走',
          visibleMotivation: '动物有记忆和嗅觉（常识，无需解释）',
        },
        {
          trigger: 'Buddy带路走到公园入口（画面展示）',
          action: '他们看到一位女士在四处张望呼唤"Buddy"',
          consequence: 'Buddy冲向主人，主人感激孩子们',
          visibleMotivation: '小狗认出主人（自然反应）',
        },
      ],

      // 3. 前文建立的信息（确保信息完整性）
      establishedInfo: [
        '公园长椅（开场画面）',
        '小狗的哭声（音效）',
        '小狗害怕陌生人（行为展示）',
        '项圈上有名字Buddy（特写镜头）',
        '小狗会通过气味找路（常识）',
        '主人在找小狗（结尾合理出现）',
      ],

      // 4. 视听表达
      openingVisual: '公园场景，阳光明媚，长椅清晰可见，能听到隐约的哭声',
      keyActions: [
        {
          action: `${chars[0]}蹲下，慢慢靠近长椅底下`,
          visualClear: '完整的蹲下动作，伸手的过程',
          focusPoint: '角色的手和长椅底部',
        },
        {
          action: `小狗从长椅下探出头，眼睛湿润`,
          visualClear: '小狗的表情和姿态（害怕但期待）',
          focusPoint: '小狗的脸部特写',
        },
        {
          action: `${chars[1]}让小狗闻项圈，小狗嗅了嗅，开始向前走`,
          visualClear: '闻的动作→思考的停顿→开始走',
          focusPoint: '小狗的鼻子和项圈，然后是移动的脚步',
        },
        {
          action: '主人和Buddy重逢，Buddy跳起来，主人蹲下拥抱',
          visualClear: '跳→蹲→拥抱，完整的情感过程',
          focusPoint: '先是Buddy的跳跃，然后是拥抱',
        },
      ],

      // 5. 安全与价值观检查
      safetyCheck: {
        noImitableRisk: true,        // ✅ 无危险行为（蹲下、呼唤名字都安全）
        positiveOutcome: true,        // ✅ 正向行为获益（善良→感激）
        noShortcuts: true,            // ✅ 无工具直接解决（靠观察和思考）
        processMatters: true,         // ✅ 展示了完整过程（如何接近、如何建立信任）
      },
    };
  }

  // 示例2：建树屋（符合规范）
  else if (lower.includes('build') && lower.includes('tree')) {
    return {
      singleCausalChain: {
        A: `${chars[0]}想在院子里的橡树上建树屋，但木板太重抬不上去`,
        B: `${chars[1]}想到用绳子一端绑木板，另一端从树杈穿过后向下拉`,
        C: `通过这个方法，他们成功把木板拉到树上，完成了树屋平台`,
        goal: '用安全的方法把木板抬到树上建树屋',
      },

      behaviors: [
        {
          trigger: `${chars[0]}尝试抬木板但抬不动（画面展示）`,
          action: `${chars[0]}放下木板，擦汗，说"太重了"`,
          consequence: '意识到需要其他方法',
          visibleMotivation: '解决问题的需求（直接体现）',
        },
        {
          trigger: '需要其他方法（前一幕建立）',
          action: `${chars[1]}看看绳子，看看树枝，想到可以利用滑轮原理`,
          consequence: '提出用绳子的方案',
          visibleMotivation: '观察→联想（儿童能理解的思考过程）',
        },
        {
          trigger: `${chars[1]}提出了方案（对白已说明）`,
          action: '他们一起把绳子从树杈穿过，两端分别绑木板和拉绳',
          consequence: '建立了简易滑轮系统',
          visibleMotivation: '合作解决问题（正向价值）',
        },
        {
          trigger: '滑轮系统搭好了（画面展示）',
          action: '两人一起用力拉绳子，木板慢慢升起',
          consequence: '木板成功上升到树上',
          visibleMotivation: '团队合作的力量（教育意义）',
        },
      ],

      establishedInfo: [
        '院子里有橡树（开场画面）',
        '木板很重（尝试抬举的画面）',
        '有绳子（道具在画面中）',
        '树有结实的树杈（画面展示）',
        '简单机械原理（通过画面展示，无需解释）',
      ],

      openingVisual: '后院，阳光下的橡树，地上放着木板、绳子等材料',
      keyActions: [
        {
          action: `${chars[0]}弯腰抓住木板，用力抬，脸涨红，但木板只离地一点点`,
          visualClear: '完整的抬举动作和失败过程',
          focusPoint: '木板的一端离地很少→角色的表情（用力）',
        },
        {
          action: `${chars[1]}拿起绳子，抛过树杈，接住另一端`,
          visualClear: '抛绳→绳子飞过树杈→接住',
          focusPoint: '绳子的运动轨迹',
        },
        {
          action: '绑绳子到木板，然后两人一起拉另一端，木板升起',
          visualClear: '绑→拉→木板上升，每一步都清晰',
          focusPoint: '先是手绑绳子的动作，然后是木板上升',
        },
      ],

      safetyCheck: {
        noImitableRisk: true,        // ✅ 无危险（没有爬高、没有使用危险工具）
        positiveOutcome: true,        // ✅ 通过思考和合作成功
        noShortcuts: true,            // ✅ 展示了完整的问题解决过程
        processMatters: true,         // ✅ 强调思考→尝试→调整→成功
      },
    };
  }

  // 默认：通用安全故事模板
  return {
    singleCausalChain: {
      A: `${chars[0]}和${chars[1]}在户外活动时发现了一个小问题`,
      B: `他们通过观察和讨论，想出了解决办法`,
      C: `通过合作和耐心，他们成功解决了问题`,
      goal: '通过合作解决遇到的问题',
    },

    behaviors: [
      {
        trigger: '发现问题（开场展示）',
        action: `${chars[0]}指出问题所在`,
        consequence: '两人意识到需要解决',
        visibleMotivation: '解决问题的需求',
      },
      {
        trigger: '需要想办法（前文建立）',
        action: `${chars[1]}提出想法`,
        consequence: '他们开始尝试',
        visibleMotivation: '积极主动解决',
      },
      {
        trigger: '开始尝试（前文建立）',
        action: '一起行动',
        consequence: '成功解决',
        visibleMotivation: '团队合作',
      },
    ],

    establishedInfo: ['户外环境', '问题所在', '可用资源'],

    openingVisual: '户外场景，角色清晰可见，问题直观呈现',
    keyActions: [
      {
        action: '发现问题',
        visualClear: '角色指向问题，表情关注',
        focusPoint: '问题本身',
      },
      {
        action: '讨论方案',
        visualClear: '角色交流，手势配合',
        focusPoint: '角色互动',
      },
      {
        action: '解决问题',
        visualClear: '行动过程完整',
        focusPoint: '解决的瞬间',
      },
    ],

    safetyCheck: {
      noImitableRisk: true,
      positiveOutcome: true,
      noShortcuts: true,
      processMatters: true,
    },
  };
}

// ===== 验证故事是否符合规范 =====
function validateStory(story: CompliantStory): boolean {
  // 1. 检查因果链完整性
  if (!story.singleCausalChain.A || !story.singleCausalChain.B || !story.singleCausalChain.C) {
    console.error('因果链不完整');
    return false;
  }

  // 2. 检查每个行为都有trigger
  for (const behavior of story.behaviors) {
    if (!behavior.trigger || behavior.trigger === '') {
      console.error('行为缺少触发原因');
      return false;
    }
  }

  // 3. 检查安全性
  if (!story.safetyCheck.noImitableRisk ||
      !story.safetyCheck.positiveOutcome ||
      !story.safetyCheck.noShortcuts ||
      !story.safetyCheck.processMatters) {
    console.error('安全价值观检查未通过');
    return false;
  }

  // 4. 检查开场是否可视
  if (!story.openingVisual || story.openingVisual === '') {
    console.error('缺少开场视觉描述');
    return false;
  }

  return true;
}

// ===== 根据规范生成场景 =====
function writeCompliantScenes(
  story: CompliantStory,
  chars: string[],
  knowledgePoints: KnowledgePoint[]
) {
  const scenes: any[] = [];
  let order = 1;
  const kpUsed: { [key: string]: number } = {};
  knowledgePoints.forEach(kp => kpUsed[kp.name] = 0);

  // ===== 开场：必须静音能看懂 =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 1 - 开场（静音可看懂）`,
    visualDescription: story.openingVisual,
    shotType: '大景别',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: 'CAMERA',
    dialogue: '全景：建立环境和角色位置',
    visualDescription: `画面展示：${story.establishedInfo[0]}，${chars.join('和')}在画面中`,
    shotType: '全景',
    knowledgePointUsed: false,
  });

  // ===== 因果链的A：初始状态 =====
  const behavior1 = story.behaviors[0];

  // 关键动作1：有完整过程
  if (story.keyActions[0]) {
    scenes.push({
      order: order++,
      role: 'CAMERA',
      dialogue: `${story.keyActions[0].action}`,
      visualDescription: `画面重点：${story.keyActions[0].focusPoint}。${story.keyActions[0].visualClear}`,
      shotType: '中景',
      knowledgePointUsed: false,
    });
  }

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: extractSimpleDialogue(behavior1.consequence, chars[0]),
    action: behavior1.action.split('，')[0],
    visualDescription: `${chars[0]}${behavior1.action}`,
    shotType: '近景',
    knowledgePointUsed: false,
  });

  // 融入第一个知识点（必须在情境中自然出现）
  if (knowledgePoints[0] && kpUsed[knowledgePoints[0].name] < knowledgePoints[0].repetitionCount) {
    const kp = knowledgePoints[0];
    scenes.push({
      order: order++,
      role: chars[1],
      dialogue: `${kp.description || kp.name}`,
      action: '回应',
      visualDescription: `${chars[1]}的反应`,
      shotType: '近景',
      knowledgePointUsed: true,
      knowledgePointName: kp.name,
    });
    kpUsed[kp.name]++;
  }

  // ===== 因果链的B：第一个后果和应对 =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 2 - 应对（每个行为都有前因）`,
    visualDescription: `因为前一幕${behavior1.consequence}，所以现在...`,
    shotType: '全景',
    knowledgePointUsed: false,
  });

  const behavior2 = story.behaviors[1];
  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: extractSimpleDialogue(behavior2.action, chars[1]),
    action: behavior2.action.split('，')[0],
    visualDescription: `触发原因：${behavior2.trigger}。行为：${behavior2.action}`,
    shotType: '中景',
    knowledgePointUsed: false,
  });

  // 关键动作2
  if (story.keyActions[1]) {
    scenes.push({
      order: order++,
      role: 'CAMERA',
      dialogue: `${story.keyActions[1].action}`,
      visualDescription: `画面重点：${story.keyActions[1].focusPoint}。${story.keyActions[1].visualClear}`,
      shotType: story.keyActions[1].focusPoint.includes('特写') ? '特写' : '中景',
      knowledgePointUsed: false,
    });
  }

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: extractSimpleDialogue(behavior2.consequence, chars[0]),
    action: '观察结果',
    visualDescription: `${behavior2.consequence}`,
    shotType: '近景',
    knowledgePointUsed: false,
  });

  // ===== 继续行为链 =====
  for (let i = 2; i < story.behaviors.length && i < 4; i++) {
    const behavior = story.behaviors[i];

    scenes.push({
      order: order++,
      role: chars[i % 2],
      dialogue: extractSimpleDialogue(behavior.action, chars[i % 2]),
      action: behavior.action.split('，')[0],
      visualDescription: `因为${behavior.trigger}，${chars[i % 2]}${behavior.action}`,
      shotType: '中景',
      knowledgePointUsed: false,
    });

    // 插入知识点
    const unusedKp = knowledgePoints.find(kp => kpUsed[kp.name] < kp.repetitionCount);
    if (unusedKp && unusedKp.description) {
      scenes.push({
        order: order++,
        role: chars[(i + 1) % 2],
        dialogue: unusedKp.description,
        action: '回应',
        visualDescription: `${chars[(i + 1) % 2]}回应`,
        shotType: '近景',
        knowledgePointUsed: true,
        knowledgePointName: unusedKp.name,
      });
      kpUsed[unusedKp.name]++;
    }

    scenes.push({
      order: order++,
      role: 'CAMERA',
      dialogue: `画面展示：${behavior.consequence}`,
      visualDescription: behavior.consequence,
      shotType: '中景',
      knowledgePointUsed: false,
    });
  }

  // ===== 因果链的C：最终结果 =====
  scenes.push({
    order: order++,
    role: 'SCENE INFO',
    dialogue: `SCENE 3 - 结果（回应开头目标）`,
    visualDescription: `目标"${story.singleCausalChain.goal}"达成`,
    shotType: '全景',
    audioNote: '温馨音乐',
    knowledgePointUsed: false,
  });

  // 最后的关键动作
  const lastAction = story.keyActions[story.keyActions.length - 1];
  if (lastAction) {
    scenes.push({
      order: order++,
      role: 'CAMERA',
      dialogue: `${lastAction.action}`,
      visualDescription: `画面重点：${lastAction.focusPoint}。${lastAction.visualClear}`,
      shotType: '中景',
      knowledgePointUsed: false,
    });
  }

  scenes.push({
    order: order++,
    role: chars[0],
    dialogue: extractSuccessLine(story.singleCausalChain.C),
    action: '开心',
    visualDescription: `${story.singleCausalChain.C}`,
    shotType: '近景',
    knowledgePointUsed: false,
  });

  scenes.push({
    order: order++,
    role: chars[1],
    dialogue: `We did it together!`,
    action: '满意',
    visualDescription: `两人都很满意结果`,
    shotType: '中景',
    knowledgePointUsed: false,
  });

  // 使用剩余知识点
  knowledgePoints.forEach(kp => {
    while (kpUsed[kp.name] < kp.repetitionCount && kp.description) {
      scenes.push({
        order: order++,
        role: chars[order % 2],
        dialogue: kp.description,
        action: '表达',
        visualDescription: '自然使用知识点',
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
    dialogue: '转场：淡出',
    visualDescription: '温馨画面，结束',
    shotType: '转场',
    audioNote: '结束音乐',
    knowledgePointUsed: false,
  });

  return scenes;
}

// ===== 辅助函数 =====
function extractSimpleDialogue(text: string, charName: string): string {
  // 从行为描述中提取简单对白（符合2.2语言表达限制）
  if (text.includes('太重')) return 'This is too heavy!';
  if (text.includes('哭')) return 'Do you hear that?';
  if (text.includes('项圈')) return 'Look! There\'s a name!';
  if (text.includes('绳子')) return 'Let\'s use this rope!';
  if (text.includes('闻')) return 'Let it smell this!';
  if (text.includes('放松')) return 'It\'s okay, don\'t be scared.';
  if (text.includes('成功')) return 'Yes! It worked!';

  return 'Let\'s try!';
}

function extractSuccessLine(resultText: string): string {
  if (resultText.includes('找到') && resultText.includes('主人')) {
    return 'Look! Someone is coming!';
  }
  if (resultText.includes('木板') && resultText.includes('树上')) {
    return 'We got it up there!';
  }
  return 'We did it!';
}
