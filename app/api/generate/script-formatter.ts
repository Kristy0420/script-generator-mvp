// 剧本格式化工具 - 添加中文画面描述

interface Scene {
  order: number;
  role: string;
  dialogue: string;
  visualDescription?: string;
  knowledgePointUsed: boolean;
}

// 根据场景内容生成中文画面描述
export function addVisualDescriptions(scenes: Scene[]): Scene[] {
  return scenes.map(scene => {
    // 如果已有描述，保留
    if (scene.visualDescription) {
      return scene;
    }

    // 场景信息
    if (scene.role === 'SCENE INFO') {
      if (scene.dialogue.includes('SCENE 1')) {
        return { ...scene, visualDescription: '白天，户外场景。角色们聚集在一起，准备开始他们的活动。' };
      }
      if (scene.dialogue.includes('SCENE 2')) {
        return { ...scene, visualDescription: '同一地点。气氛突然变得紧张，意外即将发生。' };
      }
      if (scene.dialogue.includes('SCENE 3')) {
        return { ...scene, visualDescription: '蒙太奇快速剪辑开始。音乐节奏加快，画面快速切换。' };
      }
      if (scene.dialogue.includes('SCENE 4')) {
        return { ...scene, visualDescription: '同一地点。突然安静下来，只有鸟鸣声。镜头拉远展示全景。' };
      }
    }

    // 镜头指令
    if (scene.role === 'CAMERA') {
      if (scene.dialogue.includes('CLOSE-UP')) {
        return { ...scene, visualDescription: '特写镜头：聚焦关键细节，突出意外发生的瞬间。' };
      }
      if (scene.dialogue.includes('MONTAGE BEGINS')) {
        return { ...scene, visualDescription: '蒙太奇开始：快速跳切，声音重叠，节奏越来越快。' };
      }
      if (scene.dialogue.includes('MONTAGE ENDS')) {
        return { ...scene, visualDescription: '蒙太奇结束：突然停止。一切静止。只听到角色们的喘息声。' };
      }
      if (scene.dialogue.includes('WIDE SHOT')) {
        return { ...scene, visualDescription: '全景镜头：展示完整场景，观众看到意外的结果规模巨大。' };
      }
      if (scene.dialogue.includes('Quiet')) {
        return { ...scene, visualDescription: '安静的时刻。只有鸟鸣和风声。角色们紧张地相互对视。' };
      }
      if (scene.dialogue.includes('FADE OUT')) {
        return { ...scene, visualDescription: '画面淡出。欢快的音乐响起。结束。' };
      }
      if (scene.dialogue.includes('rushing') || scene.dialogue.includes('running')) {
        return { ...scene, visualDescription: '人群从四面八方涌来。角色们忙碌但快乐地招待大家。' };
      }
      return { ...scene, visualDescription: '镜头切换。' };
    }

    // 角色对话 - 根据对话内容推测画面
    const dialogue = scene.dialogue.toLowerCase();

    if (dialogue.includes('*trips*') || dialogue.includes('*stumbles*')) {
      return { ...scene, visualDescription: '角色不小心绊倒，身体失去平衡。' };
    }
    if (dialogue.includes('*gasps*')) {
      return { ...scene, visualDescription: '角色惊讶地倒吸一口气，眼睛睁大。' };
    }
    if (dialogue.includes('*jaw drops*')) {
      return { ...scene, visualDescription: '角色震惊得下巴掉下来，难以置信地看着眼前的景象。' };
    }
    if (dialogue.includes('*picks up*')) {
      return { ...scene, visualDescription: '角色弯腰捡起物品。' };
    }
    if (dialogue.includes('*tastes*') || dialogue.includes('*tries*')) {
      return { ...scene, visualDescription: '角色小心翼翼地尝试/品尝。' };
    }
    if (dialogue.includes('*rushes*') || dialogue.includes('*runs*')) {
      return { ...scene, visualDescription: '角色快速跑向另一个角色。' };
    }
    if (dialogue.includes('*laughs*') || dialogue.includes('*laughing*')) {
      return { ...scene, visualDescription: '角色开心地大笑。' };
    }
    if (dialogue.includes('*nervously*')) {
      return { ...scene, visualDescription: '角色紧张不安地做动作。' };
    }
    if (dialogue.includes('*excited*')) {
      return { ...scene, visualDescription: '角色兴奋地跳起来。' };
    }
    if (dialogue.includes('*slowly*')) {
      return { ...scene, visualDescription: '角色慢慢地意识到发生了什么。' };
    }
    if (dialogue.includes('oops')) {
      return { ...scene, visualDescription: '角色意识到自己犯错了，表情尴尬。' };
    }
    if (dialogue.includes('help')) {
      return { ...scene, visualDescription: '角色主动提供帮助，态度积极。' };
    }
    if (dialogue.includes('what happened')) {
      return { ...scene, visualDescription: '角色困惑地看着现场，试图理解发生了什么。' };
    }
    if (dialogue.includes('all together')) {
      return { ...scene, visualDescription: '所有角色一起喊叫，声音整齐洪亮。' };
    }

    // 默认：根据角色位置
    return { ...scene, visualDescription: '角色对话。' };
  });
}

// 生成完整剧本元数据
export function formatFullScript(scriptData: any) {
  const scenesWithVisuals = addVisualDescriptions(scriptData.scenes);

  return {
    title: scriptData.title || 'Untitled',
    characters: scriptData.characters || [],
    knowledgePoints: scriptData.knowledgePoints || [],
    synopsis: scriptData.synopsis || 'A fun story about friendship and adventure.',
    scenes: scenesWithVisuals,
    metadata: {
      totalScenes: scenesWithVisuals.length,
      knowledgePointUsages: scenesWithVisuals.filter(s => s.knowledgePointUsed).length,
      generatedAt: new Date().toISOString(),
    },
  };
}
