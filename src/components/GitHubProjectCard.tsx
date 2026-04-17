import React from 'react';
import { Link } from 'react-router-dom';
import { Star, GitFork, Eye, Clock, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import type { GitHubProject } from '../types';

const GitHubProjectCard: React.FC<{
  project: GitHubProject;
}> = ({ project }) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 24) return `${diffHours} 小时前`;
    if (diffDays < 7) return `${diffDays} 天前`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} 周前`;
    return `${Math.floor(diffDays / 30)} 个月前`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  return (
    <Link
      to={`/detail/project/${project.id}`}
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
        {/* Owner and Language */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {project.ownerAvatar && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <img 
                  src={project.ownerAvatar} 
                  alt={project.owner} 
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            )}
            <div>
              <div className="text-sm font-medium text-foreground">
                {project.owner}
              </div>
              <div className="text-xs text-muted-foreground">
                {project.language}
              </div>
            </div>
          </div>
        </div>

        {/* Name and Description */}
        <h3 className={cn(
          'text-lg font-semibold mb-2',
          'text-foreground group-hover:text-primary',
          'transition-colors duration-200',
          'line-clamp-1'
        )}>
          {project.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Topics */}
        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.topics.slice(0, 4).map((topic, index) => (
              <span key={index} className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs">
                {topic}
              </span>
            ))}
            {project.topics.length > 4 && (
              <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs">
                +{project.topics.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="w-4 h-4" />
              <span>{formatNumber(project.stars)}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <GitFork className="w-4 h-4" />
              <span>{formatNumber(project.forks)}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>{formatNumber(project.watchers)}</span>
            </div>
          </div>
        </div>

        {/* Update Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>更新于 {formatTime(new Date(project.updatedAt))}</span>
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

export default GitHubProjectCard;
