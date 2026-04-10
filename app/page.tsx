'use client';

import { useState } from 'react';

interface Scene {
  order: number;
  role: string;
  dialogue: string;
  knowledgePointUsed: boolean;
}

interface Script {
  episodeCode?: string;
  title: string;
  characters?: any[];
  knowledgePoints?: any[];
  synopsis?: string;
  sceneSettings?: string[];
  scenes: Scene[];
}

interface Character {
  id: string;
  name: string;
  personality: string;
}

interface KnowledgePoint {
  id: string;
  name: string;
  description: string;
  repetitionCount: number;
}

export default function Home() {
  // 剧本主题（自定义描述）
  const [theme, setTheme] = useState('');

  // 知识点列表（支持多个）
  const [knowledgePoints, setKnowledgePoints] = useState<KnowledgePoint[]>([
    { id: '1', name: '', description: '', repetitionCount: 2 },
  ]);

  const [difficulty, setDifficulty] = useState('Beginner');

  // 角色列表（支持多个角色）
  const [characters, setCharacters] = useState<Character[]>([
    { id: '1', name: '', personality: '' },
    { id: '2', name: '', personality: '' },
  ]);

  // 生成状态
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [script, setScript] = useState<Script | null>(null);

  // 添加角色
  const addCharacter = () => {
    const newId = String(Date.now());
    setCharacters([...characters, { id: newId, name: '', personality: '' }]);
  };

  // 删除角色
  const removeCharacter = (id: string) => {
    if (characters.length <= 2) {
      setError('至少需要2个角色');
      return;
    }
    setCharacters(characters.filter(c => c.id !== id));
  };

  // 更新角色信息
  const updateCharacter = (id: string, field: 'name' | 'personality', value: string) => {
    setCharacters(characters.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  // 添加知识点
  const addKnowledgePoint = () => {
    const newId = String(Date.now());
    setKnowledgePoints([...knowledgePoints, { id: newId, name: '', description: '', repetitionCount: 2 }]);
  };

  // 删除知识点
  const removeKnowledgePoint = (id: string) => {
    if (knowledgePoints.length <= 1) {
      setError('At least 1 knowledge point required');
      return;
    }
    setKnowledgePoints(knowledgePoints.filter(k => k.id !== id));
  };

  // 更新知识点
  const updateKnowledgePoint = (id: string, field: keyof KnowledgePoint, value: string | number) => {
    setKnowledgePoints(knowledgePoints.map(k =>
      k.id === id ? { ...k, [field]: value } : k
    ));
  };

  const handleGenerate = async () => {
    // 验证必填项
    const validCharacters = characters.filter(c => c.name.trim() !== '');
    const validKnowledgePoints = knowledgePoints.filter(k => k.name.trim() !== '');

    if (!theme.trim()) {
      setError('Story theme/plot is required');
      return;
    }
    if (validKnowledgePoints.length === 0) {
      setError('At least 1 knowledge point required');
      return;
    }
    if (validCharacters.length < 2) {
      setError('At least 2 characters required');
      return;
    }

    setLoading(true);
    setError('');
    setScript(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme,
          knowledgePoints: validKnowledgePoints,
          difficulty,
          characters: validCharacters,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '生成失败');
      }

      setScript(data.script);
    } catch (err: any) {
      setError(err.message || '生成失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!script) return;

    let text = `# ${script.episodeCode || 'D1P1'}\n\n`;
    text += `**标题**：${script.title}\n\n`;

    // 角色列表
    if (script.characters && script.characters.length > 0) {
      text += `**角色**：${script.characters.map((c: any) => c.name).join(', ')}\n\n`;
    }

    // 知识点列表
    if (script.knowledgePoints && script.knowledgePoints.length > 0) {
      text += `**知识点**：`;
      const kpList = script.knowledgePoints.map((kp: any) => {
        if (kp.description && kp.description.includes('-')) {
          return kp.description; // 句型格式：-How are you? -I'm fine
        }
        return kp.name;
      }).join(', ');
      text += `${kpList}\n\n`;
    }

    // 梗概
    if (script.synopsis) {
      text += `**梗概**：${script.synopsis}\n\n`;
    }

    // 场景设定
    if (script.sceneSettings && script.sceneSettings.length > 0) {
      script.sceneSettings.forEach((setting: string) => {
        text += `${setting}\n\n`;
      });
    }

    // 剧本内容
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    script.scenes.forEach((scene: any) => {
      // 场景标题
      if (scene.role === 'SCENE INFO') {
        text += `**${scene.dialogue.replace('SCENE', 'SCENE ')}**\n\n`;
        if (scene.visualDescription) {
          text += `${scene.visualDescription}\n\n`;
        }
        return;
      }

      // 镜头描述
      if (scene.role === 'CAMERA') {
        text += `${scene.visualDescription || scene.dialogue}\n\n`;
        if (scene.audioNote) {
          text += `音：${scene.audioNote}\n\n`;
        }
        return;
      }

      // 角色对话
      text += `**${scene.role}**: `;
      if (scene.action) {
        text += `(${scene.action}) `;
      }

      // 加粗知识点
      let dialogue = scene.dialogue;
      if (scene.knowledgePointUsed && scene.knowledgePointName) {
        const kp = script.knowledgePoints?.find((k: any) => k.name === scene.knowledgePointName);
        if (kp && kp.description) {
          dialogue = dialogue.replace(kp.description, `**${kp.description}**`);
        }
      }
      text += `${dialogue}\n\n`;

      // 画面描述
      if (scene.visualDescription && scene.role !== 'SCENE INFO' && scene.role !== 'CAMERA') {
        text += `${scene.visualDescription}\n\n`;
      }

      // 音频标记
      if (scene.audioNote) {
        text += `音：${scene.audioNote}\n\n`;
      }
    });

    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板！完全符合教学剧本格式！');
  };

  const handleReset = () => {
    setScript(null);
    setError('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          🎬 Kids Animation Script Generator
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Create fun stories that teach English naturally - Learning through laughter!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 左侧：输入表单 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              🎨 Story Settings
            </h2>

            {/* 主题描述 */}
            <div className="space-y-3 mb-6">
              <h3 className="font-medium text-gray-700 border-b pb-2">
                Story Theme / Plot
              </h3>
              <textarea
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="e.g., Making soup at a food stall, but accidentally spilled too much salt..."
              />
              <p className="text-xs text-gray-500">
                Describe the story setup, accident, and situation (like Fresh Soup style)
              </p>
            </div>

            {/* 知识点列表 */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-medium text-gray-700">
                  Learning Points
                </h3>
                <button
                  type="button"
                  onClick={addKnowledgePoint}
                  className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  + Add Point
                </button>
              </div>

              {knowledgePoints.map((kp, index) => (
                <div key={kp.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Point {index + 1}
                    </span>
                    {knowledgePoints.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeKnowledgePoint(kp.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        × Remove
                      </button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={kp.name}
                      onChange={(e) => updateKnowledgePoint(kp.id, 'name', e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Colors (red, blue, green)"
                    />

                    <textarea
                      value={kp.description}
                      onChange={(e) => updateKnowledgePoint(kp.id, 'description', e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      placeholder="Optional: Add context or examples..."
                    />

                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-600">Repeat:</label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={kp.repetitionCount}
                        onChange={(e) => updateKnowledgePoint(kp.id, 'repetitionCount', Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium text-blue-600">{kp.repetitionCount}x</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 难度级别 */}
            <div className="space-y-3 mb-6">
              <h3 className="font-medium text-gray-700 border-b pb-2">
                Language Level
              </h3>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Beginner">Beginner (A1-A2)</option>
                <option value="Intermediate">Intermediate (B1-B2)</option>
                <option value="Advanced">Advanced (C1-C2)</option>
              </select>
            </div>

            {/* 角色设置 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-medium text-gray-700">
                  Characters (角色)
                </h3>
                <button
                  type="button"
                  onClick={addCharacter}
                  className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  + Add Character
                </button>
              </div>

              {characters.map((char, index) => (
                <div key={char.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Character {index + 1}
                    </span>
                    {characters.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeCharacter(char.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        × Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={char.name}
                        onChange={(e) => updateCharacter(char.id, 'name', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Tom"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Personality
                      </label>
                      <input
                        type="text"
                        value={char.personality}
                        onChange={(e) => updateCharacter(char.id, 'personality', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., friendly, curious"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <p className="text-xs text-gray-500">
                At least 2 characters required. Add more for richer dialogues.
              </p>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* 生成按钮 */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '🤖 生成中...' : '✨ 生成剧本'}
            </button>
          </div>

          {/* 右侧：剧本展示 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              🎭 生成结果
            </h2>

            {!script && !loading && (
              <div className="flex items-center justify-center h-96 text-gray-400">
                <div className="text-center">
                  <div className="text-6xl mb-4">📄</div>
                  <p>填写左侧表单，点击生成按钮</p>
                </div>
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="animate-spin text-6xl mb-4">⚙️</div>
                  <p className="text-gray-600">AI 正在创作中...</p>
                </div>
              </div>
            )}

            {script && (
              <div className="space-y-4">
                {/* 标题 */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg">
                  <h3 className="text-xl font-bold">{script.title}</h3>
                </div>

                {/* 角色列表 */}
                {script.characters && script.characters.length > 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">角色 (Characters)：</h4>
                    <div className="space-y-1">
                      {script.characters.map((char: any, idx: number) => (
                        <div key={idx} className="text-sm text-gray-600">
                          • {char.name} - {char.personality}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 知识点列表 */}
                {script.knowledgePoints && script.knowledgePoints.length > 0 && (
                  <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                    <h4 className="font-semibold text-gray-700 mb-2">知识点 (Learning Points)：</h4>
                    <div className="space-y-1">
                      {script.knowledgePoints.map((kp: any, idx: number) => (
                        <div key={idx} className="text-sm text-gray-600">
                          • <span className="font-medium">{kp.name}</span>
                          {kp.description && `: ${kp.description}`}
                          <span className="text-xs text-gray-500 ml-2">(×{kp.repetitionCount})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 梗概 */}
                {script.synopsis && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-2">梗概 (Synopsis)：</h4>
                    <p className="text-sm text-gray-600">{script.synopsis}</p>
                  </div>
                )}

                {/* 对话列表 */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  <h4 className="font-semibold text-gray-700 sticky top-0 bg-white py-2">剧本内容：</h4>
                  {script.scenes.map((scene: any) => (
                    <div
                      key={scene.order}
                      className={`p-3 rounded-lg ${
                        scene.knowledgePointUsed
                          ? 'bg-yellow-50 border-l-4 border-yellow-400'
                          : 'bg-gray-50'
                      }`}
                    >
                      {/* 镜头类型标签 */}
                      {scene.shotType && (
                        <div className="text-xs text-purple-600 font-medium mb-1">
                          🎥 {scene.shotType}
                        </div>
                      )}

                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-blue-600 min-w-fit">
                          {scene.role}：
                        </span>
                        <div className="flex-1">
                          {/* 动作指导 */}
                          {scene.action && (
                            <span className="text-xs text-gray-600 italic">
                              ({scene.action})
                            </span>
                          )}

                          {/* 台词 */}
                          <p className="text-gray-700">{scene.dialogue}</p>

                          {/* 画面描述 */}
                          {scene.visualDescription && (
                            <p className="text-xs text-gray-500 mt-1 italic">
                              📹 {scene.visualDescription}
                            </p>
                          )}

                          {/* 音频标记 */}
                          {scene.audioNote && (
                            <p className="text-xs text-green-600 mt-1">
                              🔊 音：{scene.audioNote}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* 知识点标记 */}
                      {scene.knowledgePointUsed && (
                        <span className="text-xs text-yellow-600 mt-1 inline-block">
                          💡 知识点：{scene.knowledgePointName || '未知'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={handleCopy}
                    className="flex-1 bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
                  >
                    📋 复制剧本
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-gray-600 text-white py-2 rounded-md font-medium hover:bg-gray-700 transition-colors"
                  >
                    🔄 重新生成
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
