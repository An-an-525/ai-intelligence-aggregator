import { Link } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import GitHubProjectCard from '../components/GitHubProjectCard';
import { ModelCard } from '../components/ModelCard';
import { TrendingTopicCard } from '../components/TrendingTopicCard';
import { useAppStore } from '../store';
import { TrendingUp, ArrowRight, Github, Brain, Sparkles } from 'lucide-react';

export function Home() {
  const { 
    newsItems, 
    githubProjects, 
    models, 
    trendingTopics,
    getFilteredNews,
    getFilteredGitHub,
    getFilteredModels
  } = useAppStore();

  const filteredNews = getFilteredNews();
  const filteredGitHub = getFilteredGitHub();
  const filteredModels = getFilteredModels();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />
        <div className="relative text-center py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI 前沿情报实时更新</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AI 前沿情报聚合系统
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            持续获取最新、最广、最有深度、最高质量的 AI 与技术前沿资讯，助力您保持技术前沿敏感度
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/trending"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              <TrendingUp className="w-5 h-5" />
              探索热门趋势
            </Link>
            <Link
              to="/github"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-slate-200 font-medium hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              GitHub 榜单
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Topics */}
      {trendingTopics.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-rose-400" />
                热门趋势
              </h2>
              <p className="text-slate-500 mt-1">实时追踪 AI 领域最新热点</p>
            </div>
            <Link
              to="/trending"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              查看全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingTopics.slice(0, 4).map((topic, index) => (
              <TrendingTopicCard key={topic.id} topic={topic} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* News Feed */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-blue-400" />
              最新资讯
            </h2>
            <p className="text-slate-500 mt-1">精选高质量 AI 资讯</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredNews.slice(0, 4).map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      </section>

      {/* GitHub Projects */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
              <Github className="w-6 h-6 text-slate-300" />
              GitHub 热门开源项目
            </h2>
            <p className="text-slate-500 mt-1">发现最具价值的 AI 开源工具</p>
          </div>
          <Link
            to="/github"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            查看全部
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGitHub.slice(0, 3).map((project) => (
            <GitHubProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Models */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
              <Brain className="w-6 h-6 text-purple-400" />
              模型榜单
            </h2>
            <p className="text-slate-500 mt-1">最新大语言模型对比</p>
          </div>
          <Link
            to="/models"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            查看全部
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredModels.slice(0, 3).map((model, index) => (
            <ModelCard key={model.id} model={model} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
