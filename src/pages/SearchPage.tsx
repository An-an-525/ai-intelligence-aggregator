import { Search, Filter, ArrowUpDown, X } from 'lucide-react';
import { useAppStore } from '../store';
import NewsCard from '../components/NewsCard';
import GitHubProjectCard from '../components/GitHubProjectCard';
import { ModelCard } from '../components/ModelCard';
import { useState } from 'react';

type SearchTab = 'all' | 'news' | 'github' | 'models';

export function SearchPage() {
  const { 
    searchQuery, 
    setSearchQuery, 
    getFilteredNews, 
    getFilteredGitHub, 
    getFilteredModels 
  } = useAppStore();
  const [activeTab, setActiveTab] = useState<SearchTab>('all');

  const filteredNews = getFilteredNews();
  const filteredGitHub = getFilteredGitHub();
  const filteredModels = getFilteredModels();

  const totalResults = filteredNews.length + filteredGitHub.length + filteredModels.length;

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-100 mb-6">搜索</h1>
        
        {/* Search Input */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索资讯、项目、模型..."
            className="w-full pl-12 pr-12 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 text-lg transition-colors"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Results Count */}
        {searchQuery && (
          <p className="mt-4 text-slate-400">
            找到 {totalResults} 个结果
          </p>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 rounded-xl p-1 w-fit">
        {[
          { key: 'all' as const, label: '全部' },
          { key: 'news' as const, label: '资讯' },
          { key: 'github' as const, label: 'GitHub' },
          { key: 'models' as const, label: '模型' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-8">
        {/* News */}
        {(activeTab === 'all' || activeTab === 'news') && filteredNews.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-slate-100 mb-4">
              资讯 ({filteredNews.length})
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredNews.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
            </div>
          </section>
        )}

        {/* GitHub Projects */}
        {(activeTab === 'all' || activeTab === 'github') && filteredGitHub.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-slate-100 mb-4">
              GitHub 项目 ({filteredGitHub.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredGitHub.map((project) => (
              <GitHubProjectCard key={project.id} project={project} />
            ))}
            </div>
          </section>
        )}

        {/* Models */}
        {(activeTab === 'all' || activeTab === 'models') && filteredModels.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-slate-100 mb-4">
              模型 ({filteredModels.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredModels.map((model, index) => (
                <ModelCard key={model.id} model={model} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {totalResults === 0 && searchQuery && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-300 mb-2">没有找到结果</h3>
            <p className="text-slate-500">尝试使用不同的关键词或调整搜索条件</p>
          </div>
        )}
      </div>
    </div>
  );
}
