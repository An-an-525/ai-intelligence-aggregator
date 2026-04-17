import { Model } from '../types';
import { Link } from 'react-router-dom';
import { Brain, Globe, Github, FileText, Star, CheckCircle2, Zap, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface ModelCardProps {
  model: Model;
  index?: number;
}

const typeLabels: Record<string, string> = {
  closed: '闭源',
  open: '开源',
  multimodal: '多模态',
  code: '代码',
  agent: 'Agent'
};

const typeColors: Record<string, string> = {
  closed: 'bg-purple-500/10 text-purple-400',
  open: 'bg-emerald-500/10 text-emerald-400',
  multimodal: 'bg-blue-500/10 text-blue-400',
  code: 'bg-yellow-500/10 text-yellow-400',
  agent: 'bg-rose-500/10 text-rose-400'
};

export function ModelCard({ model, index }: ModelCardProps) {
  return (
    <Link
      to={`/detail/model/${model.id}`}
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
      {/* Index Badge */}
      {index !== undefined && index < 3 && (
        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
          {index + 1}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/20">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100 group-hover:text-purple-400 transition-colors">
              {model.name}
            </h3>
            <p className="text-sm text-slate-500">{model.provider}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${typeColors[model.type]}`}>
            {typeLabels[model.type]}
          </span>
          {model.isRecommended && (
            <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              推荐
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed mb-4">
        {model.description}
      </p>

      {/* Capabilities */}
      <div className="flex flex-wrap gap-2 mb-4">
        {model.capabilities.map((capability) => (
          <span
            key={capability}
            className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-300"
          >
            {capability}
          </span>
        ))}
      </div>

      {/* Performance */}
      {Object.keys(model.performance).length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          {model.performance.mmlu && (
            <div className="bg-slate-800/50 rounded-xl p-3 text-center">
              <p className="text-xs text-slate-500 mb-1">MMLU</p>
              <p className="text-lg font-bold text-blue-400">{model.performance.mmlu}%</p>
            </div>
          )}
          {model.performance.humaneval && (
            <div className="bg-slate-800/50 rounded-xl p-3 text-center">
              <p className="text-xs text-slate-500 mb-1">HumanEval</p>
              <p className="text-lg font-bold text-emerald-400">{model.performance.humaneval}%</p>
            </div>
          )}
          {model.performance.gsm8k && (
            <div className="bg-slate-800/50 rounded-xl p-3 text-center">
              <p className="text-xs text-slate-500 mb-1">GSM8K</p>
              <p className="text-lg font-bold text-purple-400">{model.performance.gsm8k}%</p>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {model.apiUrl && (
            <a
              href={model.apiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-sm transition-colors"
            >
              <Globe className="w-4 h-4" />
              API
            </a>
          )}
          {model.githubUrl && (
            <a
              href={model.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          )}
          {model.paperUrl && (
            <a
              href={model.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm transition-colors"
            >
              <FileText className="w-4 h-4" />
              论文
            </a>
          )}
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-yellow-500/10 to-amber-500/10 text-yellow-400">
          <Star className="w-4 h-4" />
          <span className="text-sm font-medium">{model.qualityScore}</span>
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="absolute inset-x-6 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Link>
  );
}
