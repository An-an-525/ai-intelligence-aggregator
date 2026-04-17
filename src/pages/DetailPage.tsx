import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { 
  ArrowLeft, 
  Calendar, 
  ExternalLink, 
  Bookmark, 
  Star, 
  TrendingUp,
  Sparkles,
  Target,
  Users,
  Zap,
  Scale,
  TrendingUp as TrendIcon,
  Brain,
  Github,
  FileText,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import NewsCard from '../components/NewsCard';
import { NewsItem, GitHubProject, Model, TrendingTopic } from '../types';

export function DetailPage() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const { newsItems, githubProjects, models, trendingTopics, bookmarks, toggleBookmark } = useAppStore();
  
  let item: NewsItem | GitHubProject | Model | TrendingTopic | undefined;
  if (type === 'news') {
    item = newsItems.find(n => n.id === id);
  } else if (type === 'project') {
    item = githubProjects.find(p => p.id === id);
  } else if (type === 'model') {
    item = models.find(m => m.id === id);
  } else if (type === 'topic') {
    item = trendingTopics.find(t => t.id === id);
  }

  if (!item) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400 mb-4">未找到内容</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>
      </div>
    );
  }

  const isBookmarked = bookmarks.includes(item.id);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleBookmark(item.id);
  };

  const getQualityColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (score >= 75) return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    if (score >= 60) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
  };

  const getRecommendationLabel = (rec: string) => {
    switch (rec) {
      case 'try_now':
        return { label: '立即试用', color: 'text-emerald-400 bg-emerald-400/10' };
      case 'bookmark':
        return { label: '收藏关注', color: 'text-blue-400 bg-blue-400/10' };
      case 'follow':
        return { label: '持续追踪', color: 'text-yellow-400 bg-yellow-400/10' };
      default:
        return { label: '略过', color: 'text-slate-400 bg-slate-400/10' };
    }
  };

  const typeLabels: Record<string, string> = {
    closed: '闭源',
    open: '开源',
    multimodal: '多模态',
    code: '代码',
    agent: 'Agent'
  };

  const typeColors: Record<string, string> = {
    closed: 'bg-purple-500/10 text-purple-400',
    open: 'bg-emerald-500/10 text-emerald-400',
    multimodal: 'bg-blue-500/10 text-blue-400',
    code: 'bg-yellow-500/10 text-yellow-400',
    agent: 'bg-rose-500/10 text-rose-400'
  };

  // Render News Detail
  if (type === 'news' && item && 'source' in item) {
    const newsItem = item as NewsItem;
    const relatedItems = newsItems.filter(n => n.id !== newsItem.id && 
      n.topics.some(t => newsItem.topics.includes(t))
    ).slice(0, 3);

    return (
      <div className="space-y-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回
        </button>

        {/* Article Header */}
        <article className="bg-background border border-border rounded-2xl p-8">
          {/* Header Meta */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/20">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-blue-400">{newsItem.source}</span>
                  {newsItem.analysis && (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getRecommendationLabel(newsItem.analysis.actionRecommendation).color}`}>
                      {getRecommendationLabel(newsItem.analysis.actionRecommendation).label}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDistanceToNow(new Date(newsItem.publishedAt), { 
                      addSuffix: true, 
                      locale: zhCN 
                    })}
                  </span>
                  {newsItem.author && <span>by {newsItem.author}</span>}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Quality Score */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${getQualityColor(newsItem.qualityScore)}`}>
                <Star className="w-4 h-4" />
                <span className="font-semibold">{newsItem.qualityScore}</span>
              </div>
              
              {/* Trending Score */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-rose-500/10 to-orange-500/10 border border-rose-500/20 text-rose-400">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">{newsItem.trendingScore}</span>
              </div>

              {/* Bookmark */}
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isBookmarked 
                    ? 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>

              {/* Source Link */}
              <a
                href={newsItem.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            {newsItem.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {newsItem.topics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors cursor-pointer"
              >
                {topic}
              </span>
            ))}
            {newsItem.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Summary */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">摘要</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {newsItem.summary}
            </p>
          </div>

          {/* Content */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">详细内容</h2>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {newsItem.content}
            </div>
          </div>

          {/* Deep Analysis */}
          {newsItem.analysis && (
            <div className="border-t border-border pt-8">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                深度分析
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Core Content */}
                <div className="bg-muted/50 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-blue-400" />
                    <h3 className="font-semibold text-foreground">核心内容</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">{newsItem.analysis.coreContent}</p>
                </div>

                {/* Why Important */}
                <div className="bg-muted/50 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-semibold text-foreground">为什么重要</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">{newsItem.analysis.whyImportant}</p>
                </div>

                {/* Target Audience */}
                <div className="bg-muted/50 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-semibold text-foreground">适合谁关注</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {newsItem.analysis.targetAudience.map((audience, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-500/10 text-emerald-400"
                      >
                        {audience}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Highlights */}
                <div className="bg-muted/50 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold text-foreground">技术亮点</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {newsItem.analysis.techHighlights.map((highlight, idx) => (
                      <li key={idx} className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Value Assessment */}
              <div className="mt-6 bg-muted/50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Scale className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-semibold text-foreground">价值评估</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{newsItem.analysis.valueAssessment.personal}</div>
                    <div className="text-xs text-muted-foreground mt-1">个人效率</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">{newsItem.analysis.valueAssessment.team}</div>
                    <div className="text-xs text-muted-foreground mt-1">团队研发</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{newsItem.analysis.valueAssessment.product}</div>
                    <div className="text-xs text-muted-foreground mt-1">产品设计</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{newsItem.analysis.valueAssessment.business}</div>
                    <div className="text-xs text-muted-foreground mt-1">商业落地</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-6">相关推荐</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {relatedItems.map((relatedItem, index) => (
                <NewsCard key={relatedItem.id} news={relatedItem} />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // Render GitHub Project Detail
  if (type === 'project' && item && 'stars' in item) {
    const projectItem = item as GitHubProject;
    return (
      <div className="space-y-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回
        </button>

        {/* Project Header */}
        <article className="bg-background border border-border rounded-2xl p-8">
          {/* Header Meta */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <img 
                  src={projectItem.ownerAvatar} 
                  alt={projectItem.owner} 
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-blue-400">{projectItem.owner}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{projectItem.language}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Quality Score */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${getQualityColor(projectItem.qualityScore)}`}>
                <Star className="w-4 h-4" />
                <span className="font-semibold">{projectItem.qualityScore}</span>
              </div>

              {/* Bookmark */}
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isBookmarked 
                    ? 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>

              {/* Source Link */}
              <a
                href={projectItem.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            {projectItem.name}
          </h1>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">项目描述</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {projectItem.description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{projectItem.stars.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">Stars</div>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-emerald-400">{projectItem.forks.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">Forks</div>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{projectItem.watchers.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">Watchers</div>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{projectItem.openIssues.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">Issues</div>
            </div>
          </div>

          {/* Topics */}
          {projectItem.topics && projectItem.topics.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3">相关主题</h2>
              <div className="flex flex-wrap gap-2">
                {projectItem.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors cursor-pointer"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">链接</h2>
            <div className="flex flex-wrap gap-3">
              <a
                href={projectItem.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub 仓库
              </a>
              {projectItem.homepage && (
                <a
                  href={projectItem.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  项目主页
                </a>
              )}
            </div>
          </div>
        </article>
      </div>
    );
  }

  // Render Model Detail
  if (type === 'model' && item && 'provider' in item) {
    const modelItem = item as Model;
    return (
      <div className="space-y-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回
        </button>

        {/* Model Header */}
        <article className="bg-background border border-border rounded-2xl p-8">
          {/* Header Meta */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/20">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-blue-400">{modelItem.provider}</span>
                  {modelItem.isRecommended && (
                    <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      推荐
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{typeLabels[modelItem.type]}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Quality Score */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${getQualityColor(modelItem.qualityScore)}`}>
                <Star className="w-4 h-4" />
                <span className="font-semibold">{modelItem.qualityScore}</span>
              </div>

              {/* Bookmark */}
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isBookmarked 
                    ? 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            {modelItem.name}
          </h1>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">模型描述</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {modelItem.description}
            </p>
          </div>

          {/* Capabilities */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">功能特性</h2>
            <div className="flex flex-wrap gap-2">
              {modelItem.capabilities.map((capability, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors cursor-pointer"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>

          {/* Performance */}
          {Object.keys(modelItem.performance).length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">性能指标</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(modelItem.performance).map(([key, value]) => (
                  <div key={key} className="bg-muted/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">{value}%</div>
                    <div className="text-xs text-muted-foreground mt-1">{key.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">相关链接</h2>
            <div className="flex flex-wrap gap-3">
              {modelItem.apiUrl && (
                <a
                  href={modelItem.apiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  API 文档
                </a>
              )}
              {modelItem.githubUrl && (
                <a
                  href={modelItem.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub 仓库
                </a>
              )}
              {modelItem.paperUrl && (
                <a
                  href={modelItem.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  论文
                </a>
              )}
            </div>
          </div>
        </article>
      </div>
    );
  }

  // Render Trending Topic Detail
  if (type === 'topic' && item && 'trend' in item) {
    const topicItem = item as TrendingTopic;
    return (
      <div className="space-y-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回
        </button>

        {/* Topic Header */}
        <article className="bg-background border border-border rounded-2xl p-8">
          {/* Header Meta */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/20">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${topicItem.trend === 'hot' ? 'bg-rose-500/10 text-rose-400' : topicItem.trend === 'rising' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-500/10 text-slate-400'}`}>
                    {topicItem.trend === 'hot' ? '火热' : topicItem.trend === 'rising' ? '上升' : '稳定'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>相关内容: {topicItem.relatedItemIds.length}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Score */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-blue-400">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">{topicItem.score}</span>
              </div>

              {/* Bookmark */}
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isBookmarked 
                    ? 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            {topicItem.title}
          </h1>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">话题描述</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {topicItem.description}
            </p>
          </div>

          {/* Timeline */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">时间线</h2>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="text-sm text-muted-foreground">开始时间</div>
                <div className="text-sm font-medium text-foreground">{new Date(topicItem.startedAt).toLocaleDateString('zh-CN')}</div>
              </div>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground">峰值时间</div>
                <div className="text-sm font-medium text-foreground">{new Date(topicItem.peakedAt).toLocaleDateString('zh-CN')}</div>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  // Default fallback
  return (
    <div className="text-center py-16">
      <p className="text-muted-foreground mb-4">未找到内容</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
      >
        <ArrowLeft className="w-4 h-4" />
        返回首页
      </Link>
    </div>
  );
}
