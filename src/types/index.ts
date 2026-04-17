export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  sourceUrl: string;
  author?: string;
  publishedAt: string;
  createdAt: string;
  topics: string[];
  tags: string[];
  qualityScore: number;
  relevanceScore: number;
  trendingScore: number;
  metadata: Record<string, any>;
  analysis?: ContentAnalysis;
}

export interface ContentAnalysis {
  coreContent: string;
  whyImportant: string;
  targetAudience: string[];
  techHighlights: string[];
  actionRecommendation: 'try_now' | 'bookmark' | 'follow' | 'skip';
  comparison: string;
  impact: string;
  valueAssessment: {
    personal: number;
    team: number;
    product: number;
    business: number;
  };
}

export interface GitHubProject {
  id: string;
  name: string;
  fullName: string;
  description: string;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  language: string;
  topics: string[];
  owner: string;
  ownerAvatar: string;
  htmlUrl: string;
  homepage?: string;
  createdAt: string;
  updatedAt: string;
  starGrowth: {
    day: number;
    week: number;
    month: number;
  };
  readme?: string;
  qualityScore: number;
}

export interface Model {
  id: string;
  name: string;
  provider: string;
  type: 'closed' | 'open' | 'multimodal' | 'code' | 'agent' | 'speech';
  description: string;
  releaseDate: string;
  capabilities: string[];
  performance: {
    mmlu?: number;
    humaneval?: number;
    gsm8k?: number;
    [key: string]: number | undefined;
  };
  apiUrl?: string;
  githubUrl?: string;
  paperUrl?: string;
  isRecommended: boolean;
  qualityScore: number;
}

export interface TrendingTopic {
  id: string;
  title: string;
  description: string;
  score: number;
  relatedItemIds: string[];
  startedAt: string;
  peakedAt: string;
  trend: 'rising' | 'hot' | 'stable';
}

export interface SearchFilters {
  query?: string;
  topics?: string[];
  sources?: string[];
  dateFrom?: string;
  dateTo?: string;
  minQualityScore?: number;
  itemType?: 'news' | 'github' | 'model' | 'paper';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface UserPreferences {
  topics: string[];
  excludedTopics: string[];
  sources: string[];
  infoDensity: 'low' | 'medium' | 'high';
  refreshFrequency: '1h' | '6h' | '12h' | '24h';
  language: 'zh' | 'en';
  summaryLength: 'short' | 'medium' | 'long';
  recommendationStyle: 'balanced' | 'research' | 'product' | 'opensource' | 'practical';
  minQualityScore: number;
}
