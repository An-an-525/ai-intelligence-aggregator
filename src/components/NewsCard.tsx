import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Bookmark, ExternalLink, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import type { NewsItem } from '../types';

const NewsCard: React.FC<{
  news: NewsItem;
}> = ({ news }) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return `${diffMins} 分钟前`;
    if (diffHours < 24) return `${diffHours} 小时前`;
    if (diffDays < 7) return `${diffDays} 天前`;
    return new Date(date).toLocaleDateString('zh-CN');
  };

  const getQualityColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 80) return 'text-blue-500';
    if (score >= 70) return 'text-purple-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getQualityLabel = (score: number) => {
    if (score >= 90) return '优秀';
    if (score >= 80) return '良好';
    if (score >= 70) return '一般';
    if (score >= 60) return '及格';
    return '较差';
  };

  return (
    <Link
      to={`/detail/news/${news.id}`}
      className={cn(
        'group block overflow-hidden rounded-xl',
        'bg-background border border-border/50',
        'hover:border-border hover:shadow-md hover:shadow-primary/5',
        'transition-all duration-300 ease-out',
        'transform hover:-translate-y-1',
        'overflow-hidden'
      )}
    >
      <div className="p-6">
        {/* Source and Quality Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {news.source}
            </div>
            <span className={cn(
              'text-xs font-medium',
              getQualityColor(news.qualityScore)
            )}>
              {getQualityLabel(news.qualityScore)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{formatTime(new Date(news.publishedAt))}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className={cn(
          'text-lg font-semibold mb-3',
          'text-foreground group-hover:text-primary',
          'transition-colors duration-200',
          'line-clamp-2'
        )}>
          {news.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {news.summary}
        </p>

        {/* Tags */}
        {news.tags && news.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {news.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs">
                {tag}
              </span>
            ))}
            {news.tags.length > 3 && (
              <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs">
                +{news.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="w-4 h-4" />
              <span>{news.trendingScore}</span>
            </div>
            {news.author && (
              <div className="text-sm text-muted-foreground">
                {news.author}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors duration-200">
            <span className="text-sm">查看详情</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
