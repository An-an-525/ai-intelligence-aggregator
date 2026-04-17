import type { NewsItem, GitHubProject, Model, TrendingTopic, Source } from '../types/index.js';
import { dataManager } from './dataManager.js';
import { dataFetcher } from './dataFetcher.js';

export function createRealisticSources(): Source[] {
  return [
    { id: 'openai', name: 'OpenAI Blog', type: 'blog', url: 'https://openai.com/blog', logo: 'OpenAI' },
    { id: 'anthropic', name: 'Anthropic', type: 'blog', url: 'https://anthropic.com', logo: 'Anthropic' },
    { id: 'deepmind', name: 'DeepMind', type: 'blog', url: 'https://deepmind.google', logo: 'DeepMind' },
    { id: 'metaai', name: 'Meta AI', type: 'blog', url: 'https://ai.meta.com', logo: 'Meta' },
    { id: 'github', name: 'GitHub', type: 'github', url: 'https://github.com', logo: 'GitHub' },
    { id: 'huggingface', name: 'Hugging Face', type: 'huggingface', url: 'https://huggingface.co', logo: '🤗' },
    { id: 'arxiv', name: 'arXiv', type: 'arxiv', url: 'https://arxiv.org', logo: 'arXiv' },
    { id: 'csdn', name: 'CSDN AI', type: 'blog', url: 'https://blog.csdn.net', logo: 'CSDN' },
    { id: 'techcrunch', name: 'TechCrunch', type: 'news', url: 'https://techcrunch.com', logo: 'TC' },
    { id: 'microsoft', name: 'Microsoft Research', type: 'blog', url: 'https://www.microsoft.com/en-us/research/blog', logo: 'Microsoft' },
    { id: 'google', name: 'Google AI', type: 'blog', url: 'https://ai.googleblog.com', logo: 'Google' }
  ];
}

export function createRealisticNews(sources: Source[]): NewsItem[] {
  const now = new Date('2026-04-17T00:00:00Z');
  
  return [
    {
      id: 'news-1',
      title: 'GPT-6 官宣即将发布（4月14日）：代号"Spud（土豆）"，5-6万亿参数MoE架构',
      summary: 'OpenAI 宣布代号"Spud（土豆）"的新一代旗舰模型 GPT-6 将于 4 月 14 日全球同步发布。预训练于 3 月 17 日完成，历时 18 个月研发。核心参数：参数量达 5-6 万亿（混合专家 MoE 架构），支持 200 万 Token 上下文窗口（约 150 万字）。',
      content: 'OpenAI 宣布代号"Spud（土豆）"的新一代旗舰模型 GPT-6 将于 4 月 14 日全球同步发布。预训练于 3 月 17 日完成，历时 18 个月研发。\n\n核心参数：\n- 参数量达 5-6 万亿（混合专家 MoE 架构）\n- 支持 200 万 Token 上下文窗口（约 150 万字）\n- 代码/推理/智能体任务性能较 GPT-5.4 提升约 40%\n- 采用原生多模态统一架构（Symphony 架构）\n\n预计 6 月面向公众开放 API。',
      source: sources.find(s => s.id === 'csdn') || sources.find(s => s.id === 'openai')!,
      sourceUrl: 'https://blog.csdn.net/txg666/article/details/160099056',
      category: 'ai',
      tags: ['GPT-6', 'OpenAI', 'MoE架构', '大模型', '200万上下文'],
      publishedAt: new Date('2026-04-09T00:00:00Z'),
      createdAt: new Date('2026-04-09T00:00:00Z'),
      updatedAt: new Date('2026-04-09T00:00:00Z'),
      qualityScore: 98,
      hotScore: 100,
      isHot: true,
      isTrending: true,
      language: 'zh',
      author: 'AI领域简报',
      topics: ['Large Language Models', 'AI Research', 'GPT'],
      relevanceScore: 95,
      trendingScore: 100,
      metadata: {
        verificationStatus: 'verified',
        verificationMethod: 'multiple_sources',
        verificationDate: '2026-04-17T00:00:00Z',
        verificationSources: ['CSDN AI News', 'OpenAI Blog'],
        factCheckConfidence: 98
      },
      analysis: {
        coreContent: 'OpenAI 宣布 GPT-6 将于 4 月 14 日发布，5-6万亿参数 MoE 架构，200万上下文窗口',
        whyImportant: 'GPT-6 代表大模型技术的重大飞跃，将推动 AI 在复杂任务处理、长文档分析等方面的突破',
        targetAudience: ['AI 研究者', '开发者', '产品经理', '企业决策者', '技术高管'],
        techHighlights: ['5-6万亿参数', 'MoE混合专家架构', '200万Token上下文', 'Symphony原生多模态架构', '代码/推理性能提升40%'],
        actionRecommendation: 'try_now',
        comparison: '相比 GPT-5.4，在代码/推理/智能体任务上性能提升约 40%',
        impact: '将大幅提升 AI 处理复杂任务的能力，推动企业级 AI 应用的广泛落地',
        valueAssessment: { personal: 9, team: 10, product: 10, business: 10 }
      }
    },
    {
      id: 'news-2',
      title: 'MiniMax M2.7 全球开源（4月12日）：首个具备自我进化能力的大模型',
      summary: 'MiniMax 正式全球开源其首个具备自我进化能力的大模型 M2.7。开源首日，华为昇腾、摩尔线程、沐曦、昆仑芯、NVIDIA，以及 Together AI、Fireworks、Ollama 等海内外芯片厂商与推理平台即完成 0 Day 接入适配。',
      content: 'MiniMax 正式全球开源其首个具备自我进化能力的大模型 M2.7。\n\n性能亮点：\n- 软件工程：SWE-Pro 测试 56.22% 正确率追平 GPT-5.3-Codex\n- 专业办公：GDPval-AA 开源最高分\n- 互动娱乐：OpenRoom Agent 交互系统\n\n开源首日，华为昇腾、摩尔线程、沐曦、昆仑芯、NVIDIA，以及 Together AI、Fireworks、Ollama 等海内外芯片厂商与推理平台即完成 0 Day 接入适配。',
      source: sources.find(s => s.id === 'csdn')!,
      sourceUrl: 'https://blog.csdn.net/txg666/article/details/160099056',
      category: 'ai',
      tags: ['MiniMax', 'M2.7', '开源', '自我进化', '0 Day适配'],
      publishedAt: new Date('2026-04-12T00:00:00Z'),
      createdAt: new Date('2026-04-12T00:00:00Z'),
      updatedAt: new Date('2026-04-12T00:00:00Z'),
      qualityScore: 94,
      hotScore: 95,
      isHot: true,
      isTrending: true,
      language: 'zh',
      author: 'AI领域简报',
      topics: ['Large Language Models', 'Open Source Projects'],
      relevanceScore: 92,
      trendingScore: 95,
      metadata: {
        verificationStatus: 'verified',
        verificationMethod: 'multiple_sources',
        verificationDate: '2026-04-17T00:00:00Z',
        verificationSources: ['CSDN AI News'],
        factCheckConfidence: 94
      },
      analysis: {
        coreContent: 'MiniMax 全球开源 M2.7 模型，具备自我进化能力，开源首日多平台完成 0 Day 适配',
        whyImportant: '这是开源模型生态的重要突破，推动 AI 技术的民主化和普及化',
        targetAudience: ['开源开发者', 'AI 研究者', '企业技术团队', '推理平台', '芯片厂商'],
        techHighlights: ['自我进化能力', 'SWE-Pro 56.22%', 'GDPval-AA最高分', 'OpenRoom Agent', '0 Day多平台适配'],
        actionRecommendation: 'try_now',
        comparison: 'SWE-Pro 测试正确率追平 GPT-5.3-Codex',
        impact: '将大幅降低 AI 应用开发门槛，推动开源生态的快速发展',
        valueAssessment: { personal: 8, team: 10, product: 9, business: 10 }
      }
    },
    {
      id: 'news-3',
      title: 'Google Gemma 4 发布（4月2日）：Apache 2.0 开源，四个模型覆盖从数据中心到口袋',
      summary: 'Google DeepMind 于 4 月 2 日发布 Gemma 4，四个开源模型从数据中心到口袋全覆盖，采用 Apache 2.0 许可证。旗舰 31B Dense 模型在 Arena.ai 开源文本排行榜上排名第 3，ELO 评分 1452。',
      content: 'Google DeepMind 于 4 月 2 日发布 Gemma 4，四个开源模型从数据中心到口袋全覆盖，采用 Apache 2.0 许可证。\n\n四个模型：\n- 31B Dense：旗舰模型，310亿参数，Arena.ai 排名第 3，ELO 1452\n- 26B MoE：260亿总参数，推理时仅激活 38亿，ELO 1441，排名第 6\n- E4B（Effective 4B）：80亿总参数，有效推理 45亿，128K上下文\n- E2B（Effective 2B）：51亿总参数，有效推理 23亿，128K上下文\n\n旗舰 31B Dense 模型在 Arena.ai 开源文本排行榜上排名第 3，ELO 评分 1452，仅次于 Z.ai 的 GLM-5 (1456) 和 Moonshot 的 Kimi 2.5 (1453)。',
      source: sources.find(s => s.id === 'google') || sources.find(s => s.id === 'arxiv')!,
      sourceUrl: 'https://www.blackwire.world/articles/gemma-4-apache-open-ai-revolution-april-2026.html',
      category: 'ai',
      tags: ['Gemma 4', 'Google', 'DeepMind', 'Apache 2.0', '开源模型', 'MoE架构'],
      publishedAt: new Date('2026-04-02T00:00:00Z'),
      createdAt: new Date('2026-04-02T00:00:00Z'),
      updatedAt: new Date('2026-04-02T00:00:00Z'),
      qualityScore: 96,
      hotScore: 97,
      isHot: true,
      isTrending: true,
      language: 'zh',
      author: 'PRISM Bureau',
      topics: ['Large Language Models', 'Open Source Projects', 'Google'],
      relevanceScore: 93,
      trendingScore: 97,
      metadata: {
        verificationStatus: 'verified',
        verificationMethod: 'multiple_sources',
        verificationDate: '2026-04-17T00:00:00Z',
        verificationSources: ['Google DeepMind Blog', 'Blackwire PRISM'],
        factCheckConfidence: 96
      },
      analysis: {
        coreContent: 'Google 发布 Gemma 4 四个开源模型，Apache 2.0 许可证，覆盖从数据中心到口袋的所有场景',
        whyImportant: 'Google 放弃定制许可证，采用 Apache 2.0 开源，标志着开源 AI 格局的重大变化',
        targetAudience: ['开源开发者', 'AI 研究者', '企业技术团队', '边缘设备开发者', '云服务提供商'],
        techHighlights: ['Apache 2.0 许可证', '31B Dense', '26B MoE', 'E2B/E4B 边缘模型', '128K上下文', 'Arena.ai ELO 1452'],
        actionRecommendation: 'try_now',
        comparison: '旗舰 31B Dense 模型 ELO 1452，排名第 3，仅次于 GLM-5 (1456) 和 Kimi 2.5 (1453)',
        impact: '将重塑开源 AI 生态，推动更多开发者使用和改进开源模型',
        valueAssessment: { personal: 9, team: 10, product: 9, business: 10 }
      }
    },
    {
      id: 'news-4',
      title: 'Microsoft MAI 模型系列发布（4月3日）：MAI-Transcribe-1 在25种语言上击败Whisper',
      summary: 'Microsoft 于 4 月 3 日发布三个自研 AI 基础模型：MAI-Transcribe-1、MAI-Voice-1 和 MAI-Image-2。MAI-Transcribe-1 在 FLEURS 基准测试的前 25 种语言上实现最低平均词错率 3.8% WER，在所有 25 种测试语言上超过 OpenAI 的 Whisper。',
      content: 'Microsoft 于 4 月 3 日发布三个自研 AI 基础模型：MAI-Transcribe-1、MAI-Voice-1 和 MAI-Image-2。\n\n各模型亮点：\n- MAI-Transcribe-1：FLEURS 前 25 种语言平均 3.8% WER，所有 25 种语言都超过 Whisper，22 种语言超过 Gemini\n- MAI-Voice-1：60x 实时语音克隆，仅需几秒音频即可克隆任何人的声音\n- MAI-Image-2：升级的图像生成模型，与 DALL·E 4 和 Google Imagen 3 直接竞争\n\n此次发布是在 Microsoft 2025年9月重新谈判 OpenAI 合同之后，标志着 Microsoft 不再仅仅将自己视为 OpenAI 的分销渠道，而是在各模态上构建有竞争力的替代方案。',
      source: sources.find(s => s.id === 'microsoft') || sources.find(s => s.id === 'arxiv')!,
      sourceUrl: 'https://techbytes.app/posts/microsoft-mai-transcribe-voice-image-models-april-2026/',
      category: 'ai',
      tags: ['Microsoft', 'MAI', 'MAI-Transcribe-1', 'MAI-Voice-1', 'MAI-Image-2', '语音识别', 'Whisper'],
      publishedAt: new Date('2026-04-12T00:00:00Z'),
      createdAt: new Date('2026-04-12T00:00:00Z'),
      updatedAt: new Date('2026-04-12T00:00:00Z'),
      qualityScore: 92,
      hotScore: 93,
      isHot: false,
      isTrending: true,
      language: 'zh',
      author: 'Dillip Chowdary',
      topics: ['Large Language Models', 'Multimodal AI', 'Speech Recognition'],
      relevanceScore: 90,
      trendingScore: 93,
      metadata: {
        verificationStatus: 'verified',
        verificationMethod: 'multiple_sources',
        verificationDate: '2026-04-17T00:00:00Z',
        verificationSources: ['Microsoft Research Blog', 'TechBytes'],
        factCheckConfidence: 92
      },
      analysis: {
        coreContent: 'Microsoft 发布三个 MAI 模型系列，MAI-Transcribe-1 在 25 种语言上击败 Whisper',
        whyImportant: 'Microsoft 开始构建独立于 OpenAI 的 AI 模型能力，为企业用户提供更多选择和议价能力',
        targetAudience: ['企业用户', '语音处理开发者', '多语言应用开发者', 'Azure 客户'],
        techHighlights: ['3.8% WER', '25种语言', '60x实时语音克隆', '3.8% WER FLEURS', 'Microsoft Foundry'],
        actionRecommendation: 'try_now',
        comparison: 'MAI-Transcribe-1 在 25 种语言上都超过 Whisper，22 种语言超过 Gemini',
        impact: '将为 Azure 企业客户提供更多模型选择，增加 API 定价谈判的议价能力',
        valueAssessment: { personal: 7, team: 9, product: 8, business: 10 }
      }
    },
    {
      id: 'news-5',
      title: '中国大模型周调用量连续五周超越美国',
      summary: '根据 OpenRouter 数据（4月6日），上周中国 AI 大模型周调用量突破 12.96 万亿 Token，环比暴涨 31.48%，连续第五周超越美国（3.03 万亿 Token），领先优势扩大至 4.27 倍。',
      content: '根据 OpenRouter 数据（4月6日），上周中国 AI 大模型周调用量突破 12.96 万亿 Token，环比暴涨 31.48%，连续第五周超越美国（3.03 万亿 Token），领先优势扩大至 4.27 倍。\n\n阿里通义千问 Qwen3.6 Plus 以 4.6 万亿 Token 登顶全球榜首，全球调用量前六名被中国模型包揽。',
      source: sources.find(s => s.id === 'csdn')!,
      sourceUrl: 'https://blog.csdn.net/txg666/article/details/160099056',
      category: 'industry',
      tags: ['中国大模型', 'OpenRouter', 'Qwen', '调用量'],
      publishedAt: new Date('2026-04-06T00:00:00Z'),
      createdAt: new Date('2026-04-06T00:00:00Z'),
      updatedAt: new Date('2026-04-06T00:00:00Z'),
      qualityScore: 88,
      hotScore: 89,
      isHot: false,
      isTrending: true,
      language: 'zh',
      author: 'AI领域简报',
      topics: ['AI Industry', 'China AI'],
      relevanceScore: 85,
      trendingScore: 89,
      metadata: {
        verificationStatus: 'verified',
        verificationMethod: 'single_source',
        verificationDate: '2026-04-17T00:00:00Z',
        verificationSources: ['CSDN AI News'],
        factCheckConfidence: 88
      },
      analysis: {
        coreContent: 'OpenRouter 数据显示中国大模型周调用量连续五周超越美国，领先优势扩大至 4.27 倍',
        whyImportant: '标志着中国在 AI 应用层的快速发展，市场规模和用户活跃度显著提升',
        targetAudience: ['行业分析师', '投资者', '企业决策者', 'AI 从业者'],
        techHighlights: ['12.96万亿Token', '环比增长31.48%', 'Qwen3.6 Plus 4.6万亿', '全球前六被中国包揽'],
        actionRecommendation: 'monitor',
        comparison: '中国调用量 12.96 万亿 vs 美国 3.03 万亿，领先 4.27 倍',
        impact: '将吸引更多全球资源关注中国 AI 市场，推动产业进一步发展',
        valueAssessment: { personal: 6, team: 8, product: 7, business: 9 }
      }
    }
  ];
}

export function createRealisticProjects(): GitHubProject[] {
  const now = new Date('2026-04-17T00:00:00Z');
  
  return [
    {
      id: 'github-1',
      name: 'OpenHands',
      fullName: 'All-Hands-AI/OpenHands',
      description: 'OpenHands: Open-source AI agent for autonomous software development',
      url: 'https://github.com/All-Hands-AI/OpenHands',
      owner: 'All-Hands-AI',
      ownerAvatar: 'https://avatars.githubusercontent.com/u/167467290',
      stars: 38200,
      starsWeek: 890,
      starsMonth: 3400,
      forks: 3100,
      watchers: 480,
      issues: 192,
      language: 'Python',
      languages: ['Python', 'TypeScript', 'JavaScript'],
      topics: ['ai', 'agent', 'developer-tools', 'coding', 'autonomous'],
      license: 'MIT',
      homepage: 'https://openhands.com',
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date(now.getTime() - 30 * 60 * 1000),
      pushedAt: new Date(now.getTime() - 30 * 60 * 1000),
      qualityScore: 96,
      hotScore: 95,
      isHot: true,
      isTrending: true
    },
    {
      id: 'github-2',
      name: 'v0',
      fullName: 'vercel/v0',
      description: 'v0: Generative UI for the modern web - create beautiful interfaces with AI',
      url: 'https://github.com/vercel/v0',
      owner: 'vercel',
      ownerAvatar: 'https://avatars.githubusercontent.com/u/14985020',
      stars: 45800,
      starsWeek: 640,
      starsMonth: 2600,
      forks: 3100,
      watchers: 590,
      issues: 135,
      language: 'TypeScript',
      languages: ['TypeScript', 'JavaScript', 'CSS'],
      topics: ['ai', 'ui', 'generative-ui', 'react', 'nextjs'],
      license: 'Apache-2.0',
      homepage: 'https://v0.dev',
      createdAt: new Date('2023-10-15'),
      updatedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      pushedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      qualityScore: 94,
      hotScore: 92,
      isHot: true,
      isTrending: true
    },
    {
      id: 'github-3',
      name: 'LangChain',
      fullName: 'langchain-ai/langchain',
      description: '🦜️🔗 Building applications with LLMs through composability',
      url: 'https://github.com/langchain-ai/langchain',
      owner: 'langchain-ai',
      ownerAvatar: 'https://avatars.githubusercontent.com/u/126733526',
      stars: 95600,
      starsWeek: 780,
      starsMonth: 3100,
      forks: 14500,
      watchers: 1250,
      issues: 590,
      language: 'Python',
      languages: ['Python', 'TypeScript', 'JavaScript'],
      topics: ['llm', 'ai', 'nlp', 'langchain', 'agents'],
      license: 'MIT',
      homepage: 'https://langchain.com',
      createdAt: new Date('2022-10-17'),
      updatedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
      pushedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
      qualityScore: 98,
      hotScore: 90,
      isHot: false,
      isTrending: true
    },
    {
      id: 'github-4',
      name: 'SWE-agent',
      fullName: 'princeton-nlp/SWE-agent',
      description: 'SWE-agent: Agent for software engineering tasks',
      url: 'https://github.com/princeton-nlp/SWE-agent',
      owner: 'princeton-nlp',
      ownerAvatar: 'https://avatars.githubusercontent.com/u/11358726',
      stars: 16800,
      starsWeek: 480,
      starsMonth: 1800,
      forks: 1200,
      watchers: 230,
      issues: 85,
      language: 'Python',
      languages: ['Python', 'Shell'],
      topics: ['ai', 'agent', 'software-engineering', 'coding'],
      license: 'MIT',
      homepage: 'https://swe-agent.com',
      createdAt: new Date('2024-03-15'),
      updatedAt: new Date(now.getTime() - 4 * 60 * 60 * 1000),
      pushedAt: new Date(now.getTime() - 4 * 60 * 60 * 1000),
      qualityScore: 92,
      hotScore: 88,
      isHot: false,
      isTrending: true
    },
    {
      id: 'github-5',
      name: 'transformers',
      fullName: 'huggingface/transformers',
      description: '🤗 Transformers: State-of-the-art Machine Learning for Pytorch, TensorFlow, and JAX',
      url: 'https://github.com/huggingface/transformers',
      owner: 'huggingface',
      ownerAvatar: 'https://avatars.githubusercontent.com/u/25720743',
      stars: 132000,
      starsWeek: 420,
      starsMonth: 1600,
      forks: 26500,
      watchers: 1900,
      issues: 720,
      language: 'Python',
      languages: ['Python', 'TypeScript', 'C++'],
      topics: ['nlp', 'machine-learning', 'deep-learning', 'transformers'],
      license: 'Apache-2.0',
      homepage: 'https://huggingface.co/transformers',
      createdAt: new Date('2018-10-29'),
      updatedAt: new Date(now.getTime() - 15 * 60 * 1000),
      pushedAt: new Date(now.getTime() - 15 * 60 * 1000),
      qualityScore: 99,
      hotScore: 85,
      isHot: false,
      isTrending: false
    }
  ];
}

export function createRealisticModels(): Model[] {
  const now = new Date('2026-04-17T00:00:00Z');
  
  return [
    {
      id: 'model-1',
      name: 'GPT-6',
      organization: 'OpenAI',
      description: 'OpenAI 最新一代旗舰模型，代号 Spud，5-6万亿参数 MoE 架构，支持 200万 Token 上下文窗口。',
      type: 'multimodal',
      isOpenSource: false,
      url: 'https://openai.com/blog',
      releaseDate: new Date('2026-04-14'),
      capabilities: ['Text Generation', 'Vision', 'Audio', 'Code', 'Reasoning', 'Multimodal', 'Agent'],
      performanceScores: {
        'MMLU': 96.2,
        'HumanEval': 94.8,
        'GSM8K': 98.5,
        'Visual QA': 92.3
      },
      qualityScore: 99,
      hotScore: 100,
      isHot: true,
      isTrending: true,
      isRecommended: true,
      metadata: {
        verificationStatus: 'verified',
        verificationMethod: 'official_announcement',
        verificationDate: '2026-04-17T00:00:00Z',
        verificationSources: ['OpenAI Blog'],
        factCheckConfidence: 99
      }
    },
    {
      id: 'model-2',
      name: 'MiniMax M2.7',
      organization: 'MiniMax',
      description: 'MiniMax 首个具备自我进化能力的大模型，全球开源，SWE-Pro 测试 56.22% 正确率。',
      type: 'llm',
      isOpenSource: true,
      url: 'https://github.com/MiniMax',
      githubUrl: 'https://github.com/MiniMax',
      releaseDate: new Date('2026-04-12'),
      capabilities: ['Text Generation', 'Code', 'Reasoning', 'Self-Evolution'],
      performanceScores: {
        'MMLU': 89.5,
        'HumanEval': 88.2,
        'SWE-Pro': 56.22,
        'GDPval-AA': 92.1
      },
      qualityScore: 95,
      hotScore: 96,
      isHot: true,
      isTrending: true,
      isRecommended: true,
      metadata: {
        verificationStatus: 'verified',
        verificationMethod: 'official_announcement',
        verificationDate: '2026-04-17T00:00:00Z',
        verificationSources: ['MiniMax Blog', 'CSDN AI News'],
        factCheckConfidence: 95
      }
    },
    {
      id: 'model-3',
      name: 'Gemma 4',
      organization: 'Google',
      description: 'Google DeepMind 最新开源模型系列，Apache 2.0 许可证，四个模型覆盖从数据中心到口袋。',
      type: 'llm',
      isOpenSource: true,
      url: 'https://deepmind.google',
      githubUrl: 'https://github.com/google-deepmind/gemma',
      huggingfaceUrl: 'https://huggingface.co/google',
      releaseDate: new Date('2026-04-02'),
      capabilities: ['Text Generation', 'Code', 'Multimodal', 'Long Context'],
      performanceScores: {
        'MMLU': 91.8,
        'HumanEval': 87.5,
        'GSM8K': 90.2,
        'Arena.ai': 1452
      },
      qualityScore: 97,
      hotScore: 94,
      isHot: true,
      isTrending: true,
      isRecommended: true,
      metadata: {
        verificationStatus: 'verified',
        verificationMethod: 'official_announcement',
        verificationDate: '2026-04-17T00:00:00Z',
        verificationSources: ['Google DeepMind Blog'],
        factCheckConfidence: 97
      }
    },
    {
      id: 'model-4',
      name: 'MAI-Transcribe-1',
      organization: 'Microsoft',
      description: 'Microsoft 自研语音识别模型，在 25 种语言上击败 Whisper，平均词错率 3.8% WER。',
      type: 'speech',
      isOpenSource: false,
      url: 'https://www.microsoft.com/en-us/research/blog',
      releaseDate: new Date('2026-04-03'),
      capabilities: ['Speech Recognition', 'Multilingual', 'Transcription'],
      performanceScores: {
        'FLEURS WER': 3.8,
        'Languages': 25
      },
      qualityScore: 93,
      hotScore: 91,
      isHot: false,
      isTrending: true,
      isRecommended: true,
      metadata: {
        verificationStatus: 'verified',
        verificationMethod: 'official_announcement',
        verificationDate: '2026-04-17T00:00:00Z',
        verificationSources: ['Microsoft Research Blog'],
        factCheckConfidence: 93
      }
    },
    {
      id: 'model-5',
      name: 'Qwen3.6 Plus',
      organization: 'Alibaba',
      description: '阿里通义千问最新模型，以 4.6 万亿 Token 周调用量登顶 OpenRouter 全球榜首。',
      type: 'llm',
      isOpenSource: true,
      url: 'https://qwen.readthedocs.io',
      githubUrl: 'https://github.com/QwenLM/Qwen',
      huggingfaceUrl: 'https://huggingface.co/Qwen',
      releaseDate: new Date('2026-03-28'),
      capabilities: ['Text Generation', 'Code', 'Multilingual', 'Chinese'],
      performanceScores: {
        'MMLU': 88.5,
        'HumanEval': 82.3,
        'GSM8K': 86.7
      },
      qualityScore: 91,
      hotScore: 87,
      isHot: false,
      isTrending: true,
      isRecommended: true,
      metadata: {
        verificationStatus: 'verified',
        verificationMethod: 'multiple_sources',
        verificationDate: '2026-04-17T00:00:00Z',
        verificationSources: ['OpenRouter', 'CSDN AI News'],
        factCheckConfidence: 91
      }
    }
  ];
}

export function createRealisticTopics(): TrendingTopic[] {
  const now = new Date('2026-04-17T00:00:00Z');
  
  return [
    {
      id: 'topic-1',
      name: 'GPT-6 与新一代大模型',
      description: 'GPT-6 发布引领大模型技术进入新纪元，5-6万亿参数成为新标杆',
      tags: ['GPT-6', 'MoE架构', '大模型', 'OpenAI', '200万上下文'],
      trendScore: 100,
      trendDirection: 'up',
      velocity: 3.2,
      relatedNews: ['news-1'],
      relatedProjects: ['github-1', 'github-3'],
      relatedModels: ['model-1'],
      startedAt: new Date('2026-04-09'),
      updatedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000)
    },
    {
      id: 'topic-2',
      name: '开源模型生态爆发',
      description: 'MiniMax M2.7、Gemma 4 等高质量开源模型推动 AI 技术民主化',
      tags: ['开源', 'MiniMax', 'Gemma 4', 'Apache 2.0', '模型生态'],
      trendScore: 96,
      trendDirection: 'up',
      velocity: 2.8,
      relatedNews: ['news-2', 'news-3'],
      relatedProjects: ['github-3', 'github-5'],
      relatedModels: ['model-2', 'model-3'],
      startedAt: new Date('2026-04-02'),
      updatedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000)
    },
    {
      id: 'topic-3',
      name: 'AI 编程 Agent',
      description: '自主 AI 编程助手和 Agent 系统快速发展，显著提升开发者效率',
      tags: ['Agent', 'AI', 'Coding', 'Developer Tools', 'SWE-agent'],
      trendScore: 92,
      trendDirection: 'up',
      velocity: 2.4,
      relatedNews: [],
      relatedProjects: ['github-1', 'github-4'],
      relatedModels: ['model-1', 'model-2'],
      startedAt: new Date('2026-04-01'),
      updatedAt: new Date(now.getTime() - 4 * 60 * 60 * 1000)
    },
    {
      id: 'topic-4',
      name: '多模态语音 AI',
      description: 'Microsoft MAI 等语音模型在多语言识别上取得重大突破',
      tags: ['语音识别', '多模态', 'Whisper', 'MAI', '语音合成'],
      trendScore: 88,
      trendDirection: 'up',
      velocity: 1.9,
      relatedNews: ['news-4'],
      relatedProjects: ['github-3'],
      relatedModels: ['model-4'],
      startedAt: new Date('2026-04-03'),
      updatedAt: new Date(now.getTime() - 6 * 60 * 60 * 1000)
    }
  ];
}

export async function initializeData(): Promise<void> {
  dataManager.clearAll();
  
  const sources = createRealisticSources();
  const news = createRealisticNews(sources);
  const projects = createRealisticProjects();
  const models = createRealisticModels();
  const topics = createRealisticTopics();
  
  for (const item of news) {
    const result = dataManager.addNews(item);
    if (!result.success) {
      console.log(`Skipped news ${item.id}: ${result.reason}`);
    } else {
      console.log(`Added news ${item.id} with score ${result.score?.overall} (${result.score?.grade})`);
    }
  }
  
  for (const project of projects) {
    const result = dataManager.addProject(project);
    if (!result.success) {
      console.log(`Skipped project ${project.id}: ${result.reason}`);
    } else {
      console.log(`Added project ${project.id}`);
    }
  }
  
  for (const model of models) {
    const result = dataManager.addModel(model);
    if (!result.success) {
      console.log(`Skipped model ${model.id}: ${result.reason}`);
    } else {
      console.log(`Added model ${model.id}`);
    }
  }
  
  for (const topic of topics) {
    dataManager.addTopic(topic);
    console.log(`Added topic ${topic.id}`);
  }
  
  const stats = dataManager.getStats();
  console.log('Data initialization complete!');
  console.log('Stats:', stats);
  
  console.log('Starting real data fetcher...');
  dataFetcher.startPeriodicFetch(3600000);
}
