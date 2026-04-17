import { Bot, Sparkles, Zap, TrendingUp, Workflow, Cpu } from 'lucide-react';

export function AgentsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Agent 专题</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-100 mb-4">
          <span className="bg-gradient-to-r from-rose-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Agent 与自治工作流
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          探索最新的 Agent 架构、多 Agent 协作、工具调用和自治工作流
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-orange-500/20 flex items-center justify-center mb-4">
            <Bot className="w-6 h-6 text-rose-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">单 Agent 架构</h3>
          <p className="text-slate-400 text-sm">从 ReAct 到 Reflection，探索最新的单 Agent 设计模式和最佳实践</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
            <Workflow className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">多 Agent 协作</h3>
          <p className="text-slate-400 text-sm">专业化 Agent 分工合作，复杂任务的自动化处理</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
            <Cpu className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">工具调用</h3>
          <p className="text-slate-400 text-sm">Function calling 与工具集成的最新进展</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">热门项目</h3>
          <p className="text-slate-400 text-sm">AutoGPT、LangChain 等热门 Agent 项目追踪</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-yellow-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">最佳实践</h3>
          <p className="text-slate-400 text-sm">Agent 开发的工程化最佳实践和经验分享</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">前沿研究</h3>
          <p className="text-slate-400 text-sm">最新的 Agent 研究论文和突破</p>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-rose-500/10 via-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-2xl p-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 text-sm mb-4">
          <Sparkles className="w-4 h-4" />
          <span>即将上线</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Agent 专题内容开发中</h2>
        <p className="text-slate-400">更多精彩内容即将呈现，敬请期待！</p>
      </div>
    </div>
  );
}
