import { ModelCard } from '../components/ModelCard';
import { useAppStore } from '../store';
import { Brain, Search, Filter } from 'lucide-react';
import { useState } from 'react';

type ModelType = 'all' | 'closed' | 'open' | 'multimodal' | 'code' | 'agent';

export function ModelsPage() {
  const { models, getFilteredModels, setSearchQuery, searchQuery } = useAppStore();
  const [selectedType, setSelectedType] = useState<ModelType>('all');

  const filteredModels = getFilteredModels();

  const displayModels = selectedType === 'all'
    ? filteredModels
    : filteredModels.filter(m => m.type === selectedType);

  const typeLabels: Record<ModelType, string> = {
    all: '全部',
    closed: '闭源',
    open: '开源',
    multimodal: '多模态',
    code: '代码',
    agent: 'Agent'
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-purple-400" />
            模型榜单
          </h1>
          <p className="text-slate-400">最新大语言模型对比与评测</p>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索模型..."
            className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      {/* Type Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(typeLabels) as ModelType[]).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedType === type
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {typeLabels[type]}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-slate-100">{displayModels.length}</div>
          <div className="text-sm text-slate-500">模型总数</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-emerald-400">
            {displayModels.filter(m => m.isRecommended).length}
          </div>
          <div className="text-sm text-slate-500">推荐模型</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-400">
            {displayModels.filter(m => m.type === 'open').length}
          </div>
          <div className="text-sm text-slate-500">开源模型</div>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="text-2xl font-bold text-purple-400">
            {Math.round(displayModels.reduce((sum, m) => sum + m.qualityScore, 0) / (displayModels.length || 1))}
          </div>
          <div className="text-sm text-slate-500">平均质量分</div>
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayModels.map((model, index) => (
          <ModelCard key={model.id} model={model} index={index} />
        ))}
      </div>

      {displayModels.length === 0 && (
        <div className="text-center py-16">
          <Brain className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-300 mb-2">没有找到匹配的模型</h3>
          <p className="text-slate-500">尝试调整搜索条件或筛选器</p>
        </div>
      )}
    </div>
  );
}
