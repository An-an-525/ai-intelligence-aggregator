import GitHubProjectCard from '../components/GitHubProjectCard';
import { useAppStore } from '../store';
import { Github, Star, Filter, Search } from 'lucide-react';
import { useState } from 'react';

export function GitHubPage() {
  const { githubProjects, getFilteredGitHub, setSearchQuery, searchQuery } = useAppStore();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const filteredProjects = getFilteredGitHub();
  
  const languages = Array.from(new Set(githubProjects.map(p => p.language)));

  const displayProjects = selectedLanguage
    ? filteredProjects.filter(p => p.language === selectedLanguage)
    : filteredProjects;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3 mb-2">
            <Github className="w-8 h-8 text-slate-300" />
            GitHub 榜单
          </h1>
          <p className="text-slate-400">发现高质量 AI 开源项目</p>
        </div>
        
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索项目..."
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Language Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedLanguage(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            !selectedLanguage
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          全部
        </button>
        {languages.map((language) => (
          <button
            key={language}
            onClick={() => setSelectedLanguage(language)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedLanguage === language
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {language}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-slate-100">{displayProjects.length}</div>
          <div className="text-sm text-slate-500">项目总数</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-yellow-400 flex items-center gap-1">
            <Star className="w-5 h-5" />
            {displayProjects.reduce((sum, p) => sum + p.stars, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-500">总 Stars</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-400">
            +{displayProjects.reduce((sum, p) => sum + p.starGrowth.day, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-500">今日新增</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-emerald-400">{languages.length}</div>
          <div className="text-sm text-slate-500">编程语言</div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
              <GitHubProjectCard key={project.id} project={project} />
            ))}</div>

      {displayProjects.length === 0 && (
        <div className="text-center py-16">
          <Github className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-300 mb-2">没有找到匹配的项目</h3>
          <p className="text-slate-500">尝试调整搜索条件或筛选器</p>
        </div>
      )}
    </div>
  );
}
