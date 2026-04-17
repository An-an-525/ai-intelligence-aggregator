import { GraduationCap, Sparkles, BookOpen, Code, Users, Zap } from 'lucide-react';

export function EducationPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
          <Sparkles className="w-4 h-4" />
          <span>教育科技</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-100 mb-4">
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            教育科技与 EdTech
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          探索最新的教育软件、教育科技产品和 AI 驱动的学习工具
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">AI 辅导工具</h3>
          <p className="text-slate-400 text-sm">个性化学习辅导、智能答疑、自适应学习路径</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mb-4">
            <Code className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">编程教育</h3>
          <p className="text-slate-400 text-sm">AI 编程助手、代码教学平台、编程实践工具</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">教师工具</h3>
          <p className="text-slate-400 text-sm">教案生成、作业批改、学情分析、课堂管理</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-yellow-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">学习管理</h3>
          <p className="text-slate-400 text-sm">LMS 平台、学习追踪、进度管理、数据分析</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-red-500/20 flex items-center justify-center mb-4">
            <GraduationCap className="w-6 h-6 text-rose-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">内容生成</h3>
          <p className="text-slate-400 text-sm">教材生成、课件制作、题库创建、多媒体内容</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-sky-500/20 flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-2">语言学习</h3>
          <p className="text-slate-400 text-sm">AI 语言教练、对话练习、发音纠正、文化学习</p>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm mb-4">
          <Sparkles className="w-4 h-4" />
          <span>即将上线</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">教育科技内容开发中</h2>
        <p className="text-slate-400">更多精彩内容即将呈现，敬请期待！</p>
      </div>
    </div>
  );
}
