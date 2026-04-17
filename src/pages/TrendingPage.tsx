import { TrendingTopicCard } from '../components/TrendingTopicCard';
import NewsCard from '../components/NewsCard';
import { useAppStore } from '../store';
import { TrendingUp, BarChart3, Zap, Clock } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockTrendData = [
  { time: '00:00', value: 400 },
  { time: '04:00', value: 300 },
  { time: '08:00', value: 500 },
  { time: '12:00', value: 450 },
  { time: '16:00', value: 600 },
  { time: '20:00', value: 800 },
  { time: '24:00', value: 750 }
];

export function TrendingPage() {
  const { trendingTopics, getFilteredNews } = useAppStore();
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  const filteredNews = getFilteredNews();
  const hotNews = filteredNews.filter(item => item.trendingScore >= 90);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-rose-400" />
            热门趋势
          </h1>
          <p className="text-slate-400">实时追踪 AI 领域最新热点和讨论</p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 rounded-xl p-1">
          {(['24h', '7d', '30d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                timeRange === range
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            热度趋势
          </h2>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockTrendData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                itemStyle={{ color: '#f43f5e' }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#f43f5e"
                strokeWidth={3}
                fill="url(#colorValue)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trending Topics */}
      <section>
        <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          热门话题
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingTopics.map((topic, index) => (
            <TrendingTopicCard key={topic.id} topic={topic} index={index} />
          ))}
        </div>
      </section>

      {/* Hot News */}
      {hotNews.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-400" />
            实时热门资讯
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {hotNews.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
          </div>
        </section>
      )}
    </div>
  );
}
