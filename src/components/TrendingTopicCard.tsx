import { TrendingTopic } from '../types';
import { Link } from 'react-router-dom';
import { TrendingUp, Zap, Flame, Activity, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface TrendingTopicCardProps {
  topic: TrendingTopic;
  index?: number;
}

export function TrendingTopicCard({ topic, index }: TrendingTopicCardProps) {
  const getTrendIcon = () => {
    switch (topic.trend) {
      case 'hot':
        return Flame;
      case 'rising':
        return TrendingUp;
      default:
        return Activity;
    }
  };

  const getTrendStyles = () => {
    switch (topic.trend) {
      case 'hot':
        return {
          gradient: 'from-rose-500 to-orange-500',
          badge: 'bg-gradient-to-r from-rose-500 to-orange-500',
          via: 'via-orange-500'
        };
      case 'rising':
        return {
          gradient: 'from-blue-500 to-cyan-500',
          badge: 'bg-gradient-to-r from-blue-500 to-cyan-500',
          via: 'via-cyan-500'
        };
      default:
        return {
          gradient: 'from-slate-500 to-slate-600',
          badge: 'bg-gradient-to-r from-slate-500 to-slate-600',
          via: 'via-slate-500'
        };
    }
  };

  const getTrendLabel = () => {
    switch (topic.trend) {
      case 'hot':
        return '火热';
      case 'rising':
        return '上升';
      default:
        return '稳定';
    }
  };

  const Icon = getTrendIcon();
  const styles = getTrendStyles();

  return (
    <Link
      to={`/detail/topic/${topic.id}`}
      className={cn(
        'group block overflow-hidden rounded-2xl',
        'bg-background border border-border/50',
        'hover:border-border hover:shadow-md hover:shadow-primary/5',
        'transition-all duration-300 ease-out',
        'transform hover:-translate-y-1',
        'overflow-hidden'
      )}
    >
      <div className="p-6">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity duration-300`} />
      
      {/* Card Content */}
      <div className="relative bg-background backdrop-blur-xl border border-border/50 hover:border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
        {/* Index Badge */}
        {index !== undefined && index < 3 && (
          <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br ${styles.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
            {index + 1}
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${styles.gradient} flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6 text-white" fill="currentColor" />
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles.badge} text-white`}>
              {getTrendLabel()}
            </span>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs font-medium">{topic.score}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-white transition-colors">
          {topic.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          {topic.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span>相关内容: {topic.relatedItemIds.length}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors duration-200">
              <span className="text-sm">查看详情</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
