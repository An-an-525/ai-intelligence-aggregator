export type NewsCategory = 'ai' | 'research' | 'product' | 'education' | 'policy' | 'general' | 'industry';

export type SourceType = 'github' | 'arxiv' | 'huggingface' | 'producthunt' | 'hackernews' | 'reddit' | 'twitter' | 'blog' | 'youtube' | 'news';

export interface Source {
  id: string;
  name: string;
  type: SourceType;
  url: string;
  logo?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  url?: string;
  sourceUrl?: string;
  source: Source;
  category: NewsCategory;
  tags: string[];
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  qualityScore: number;
  hotScore: number;
  isHot: boolean;
  isTrending: boolean;
  language: string;
  author?: string;
  topics?: string[];
  relevanceScore?: number;
  trendingScore?: number;
  metadata?: Record<string, any>;
  analysis?: {
    coreContent: string;
    whyImportant: string;
    targetAudience: string[];
    techHighlights: string[];
    actionRecommendation: string;
    comparison: string;
    impact: string;
    valueAssessment: {
      personal: number;
      team: number;
      product: number;
      business: number;
    };
  };
  deepAnalysis?: {
    coreContent: string;
    whyImportant: string;
    whoShouldFollow: string;
    techHighlights: string[];
    isWorthTrying: boolean;
    differences: string;
    potentialImpact: string;
    trendJudgment: string;
  };
}

export interface GitHubProject {
  id: string;
  name: string;
  fullName: string;
  description: string;
  url: string;
  owner: string;
  ownerAvatar?: string;
  stars: number;
  starsToday?: number;
  starsWeek: number;
  starsMonth: number;
  forks: number;
  watchers: number;
  issues: number;
  language: string;
  languages?: string[];
  topics: string[];
  license?: string;
  homepage?: string;
  createdAt: Date;
  updatedAt: Date;
  pushedAt: Date;
  qualityScore: number;
  hotScore: number;
  isHot: boolean;
  isTrending: boolean;
  metadata?: Record<string, any>;
}

export type ModelType = 'llm' | 'multimodal' | 'code' | 'agent' | 'embedding' | 'vision' | 'audio' | 'speech';

export interface Model {
  id: string;
  name: string;
  organization: string;
  description: string;
  type: ModelType;
  isOpenSource: boolean;
  url: string;
  paperUrl?: string;
  githubUrl?: string;
  huggingfaceUrl?: string;
  releaseDate: Date;
  capabilities: string[];
  performanceScores?: {
    [key: string]: number;
  };
  qualityScore: number;
  hotScore: number;
  isHot: boolean;
  isTrending: boolean;
  isRecommended: boolean;
  metadata?: Record<string, any>;
}

export interface TrendingTopic {
  id: string;
  name: string;
  description: string;
  tags: string[];
  trendScore: number;
  trendDirection: 'up' | 'down' | 'stable';
  velocity: number;
  relatedNews: string[];
  relatedProjects: string[];
  relatedModels: string[];
  startedAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
  subscriptions: string[];
  bookmarks: string[];
  readLater: string[];
  interests: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  language: string;
  sources: SourceType[];
  categories: NewsCategory[];
  excludedCategories: NewsCategory[];
  excludedTags: string[];
  newsDensity: 'low' | 'medium' | 'high';
  refreshFrequency: 'hourly' | 'daily' | 'weekly';
  summaryLength: 'short' | 'medium' | 'long';
  recommendationStyle: 'balanced' | 'research' | 'product' | 'opensource' | 'practical';
  showOnlyHot: boolean;
  autoTranslate: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
