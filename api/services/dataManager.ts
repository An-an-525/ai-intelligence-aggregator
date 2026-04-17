import type { NewsItem, GitHubProject, Model, TrendingTopic, Source } from '../types/index.js';
import { qualityScorer, type QualityScore } from './qualityScorer.js';
import { deduplicator } from './deduplicator.js';

interface DataStore {
  news: Map<string, NewsItem>;
  projects: Map<string, GitHubProject>;
  models: Map<string, Model>;
  topics: Map<string, TrendingTopic>;
  qualityScores: Map<string, QualityScore>;
}

export class DataManager {
  private store: DataStore = {
    news: new Map(),
    projects: new Map(),
    models: new Map(),
    topics: new Map(),
    qualityScores: new Map()
  };

  constructor() {
    this.initializeIndexes();
  }

  private initializeIndexes(): void {
    deduplicator.clear();
  }

  public addNews(news: NewsItem): { success: boolean; score?: QualityScore; reason?: string } {
    const duplicateCheck = deduplicator.checkNewsDuplicate(news);
    if (duplicateCheck.isDuplicate) {
      return {
        success: false,
        reason: `Duplicate content: ${duplicateCheck.reason}`
      };
    }

    const existingTitles = Array.from(this.store.news.values()).map(n => n.title);
    const score = qualityScorer.calculateQualityScore(news, existingTitles);

    if (!qualityScorer.shouldDisplay(score)) {
      return {
        success: false,
        score,
        reason: `Quality score too low: ${score.overall} (${score.grade})`
      };
    }

    const processedNews = {
      ...news,
      qualityScore: score.overall,
      hotScore: this.calculateHotScore(news, score),
      isHot: score.grade === 'EXCELLENT' || score.grade === 'GOOD',
      isTrending: score.timeliness >= 80
    };

    this.store.news.set(news.id, processedNews);
    this.store.qualityScores.set(news.id, score);
    deduplicator.addToIndex(processedNews, news.id);

    return { success: true, score };
  }

  public addProject(project: GitHubProject): { success: boolean; reason?: string } {
    const duplicateCheck = deduplicator.checkProjectDuplicate(project);
    if (duplicateCheck.isDuplicate) {
      return {
        success: false,
        reason: `Duplicate project: ${duplicateCheck.reason}`
      };
    }

    const processedProject = {
      ...project,
      qualityScore: this.calculateProjectQuality(project),
      hotScore: this.calculateProjectHotScore(project),
      isHot: project.starsToday >= 50 || project.starsWeek >= 300,
      isTrending: project.starsToday >= 20
    };

    this.store.projects.set(project.id, processedProject);
    deduplicator.addToIndex(processedProject, project.id);

    return { success: true };
  }

  public addModel(model: Model): { success: boolean; reason?: string } {
    const duplicateCheck = deduplicator.checkModelDuplicate(model);
    if (duplicateCheck.isDuplicate) {
      return {
        success: false,
        reason: `Duplicate model: ${duplicateCheck.reason}`
      };
    }

    const processedModel = {
      ...model,
      qualityScore: this.calculateModelQuality(model),
      hotScore: this.calculateModelHotScore(model),
      isHot: model.isRecommended || model.qualityScore >= 90,
      isTrending: this.isModelTrending(model)
    };

    this.store.models.set(model.id, processedModel);
    deduplicator.addToIndex(processedModel, model.id);

    return { success: true };
  }

  public addTopic(topic: TrendingTopic): void {
    this.store.topics.set(topic.id, topic);
  }

  public getNews(options?: {
    category?: string;
    hotOnly?: boolean;
    trendingOnly?: boolean;
    sortBy?: keyof NewsItem;
    page?: number;
    limit?: number;
  }): { items: NewsItem[]; total: number } {
    let items = Array.from(this.store.news.values());

    if (options?.category) {
      items = items.filter(n => n.category === options.category);
    }

    if (options?.hotOnly) {
      items = items.filter(n => n.isHot);
    }

    if (options?.trendingOnly) {
      items = items.filter(n => n.isTrending);
    }

    const sortBy = options?.sortBy || 'hotScore';
    items.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return bVal - aVal;
      }
      if (aVal instanceof Date && bVal instanceof Date) {
        return bVal.getTime() - aVal.getTime();
      }
      return 0;
    });

    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      items: items.slice(startIndex, endIndex),
      total: items.length
    };
  }

  public getProjects(options?: {
    language?: string;
    hotOnly?: boolean;
    trendingOnly?: boolean;
    sortBy?: keyof GitHubProject;
    page?: number;
    limit?: number;
  }): { items: GitHubProject[]; total: number; languages: string[] } {
    let items = Array.from(this.store.projects.values());

    if (options?.language && options.language !== 'all') {
      items = items.filter(p =>
        p.language.toLowerCase() === options.language!.toLowerCase() ||
        p.languages?.some(lang => lang.toLowerCase() === options.language!.toLowerCase())
      );
    }

    if (options?.hotOnly) {
      items = items.filter(p => p.isHot);
    }

    if (options?.trendingOnly) {
      items = items.filter(p => p.isTrending);
    }

    const sortBy = options?.sortBy || 'hotScore';
    items.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return bVal - aVal;
      }
      if (aVal instanceof Date && bVal instanceof Date) {
        return bVal.getTime() - aVal.getTime();
      }
      return 0;
    });

    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const languages = Array.from(new Set(items.map(p => p.language)));

    return {
      items: items.slice(startIndex, endIndex),
      total: items.length,
      languages
    };
  }

  public getModels(options?: {
    type?: string;
    hotOnly?: boolean;
    trendingOnly?: boolean;
    recommendedOnly?: boolean;
    openSourceOnly?: boolean;
    sortBy?: keyof Model;
    page?: number;
    limit?: number;
  }): { items: Model[]; total: number; types: string[] } {
    let items = Array.from(this.store.models.values());

    if (options?.type && options.type !== 'all') {
      items = items.filter(m => m.type === options.type);
    }

    if (options?.hotOnly) {
      items = items.filter(m => m.isHot);
    }

    if (options?.trendingOnly) {
      items = items.filter(m => m.isTrending);
    }

    if (options?.recommendedOnly) {
      items = items.filter(m => m.isRecommended);
    }

    if (options?.openSourceOnly) {
      items = items.filter(m => m.isOpenSource);
    }

    const sortBy = options?.sortBy || 'hotScore';
    items.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return bVal - aVal;
      }
      if (aVal instanceof Date && bVal instanceof Date) {
        return bVal.getTime() - aVal.getTime();
      }
      return 0;
    });

    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const types = ['llm', 'multimodal', 'code', 'agent', 'embedding', 'vision', 'audio'];

    return {
      items: items.slice(startIndex, endIndex),
      total: items.length,
      types
    };
  }

  public getTopics(options?: {
    sortBy?: keyof TrendingTopic;
    page?: number;
    limit?: number;
  }): { items: TrendingTopic[]; total: number } {
    let items = Array.from(this.store.topics.values());

    const sortBy = options?.sortBy || 'trendScore';
    items.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return bVal - aVal;
      }
      if (aVal instanceof Date && bVal instanceof Date) {
        return bVal.getTime() - aVal.getTime();
      }
      return 0;
    });

    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      items: items.slice(startIndex, endIndex),
      total: items.length
    };
  }

  public getNewsById(id: string): NewsItem | undefined {
    return this.store.news.get(id);
  }

  public getProjectById(id: string): GitHubProject | undefined {
    return this.store.projects.get(id);
  }

  public getModelById(id: string): Model | undefined {
    return this.store.models.get(id);
  }

  public getTopicById(id: string): TrendingTopic | undefined {
    return this.store.topics.get(id);
  }

  public getQualityScore(id: string): QualityScore | undefined {
    return this.store.qualityScores.get(id);
  }

  public search(query: string, options?: {
    type?: 'all' | 'news' | 'projects' | 'models' | 'topics';
    limit?: number;
  }): {
    news: NewsItem[];
    projects: GitHubProject[];
    models: Model[];
    topics: TrendingTopic[];
  } {
    const lowerQuery = query.toLowerCase();
    const limit = options?.limit || 20;
    const searchType = options?.type || 'all';

    const results = {
      news: [] as NewsItem[],
      projects: [] as GitHubProject[],
      models: [] as Model[],
      topics: [] as TrendingTopic[]
    };

    if (searchType === 'all' || searchType === 'news') {
      results.news = Array.from(this.store.news.values())
        .filter(n =>
          n.title.toLowerCase().includes(lowerQuery) ||
          n.summary.toLowerCase().includes(lowerQuery) ||
          n.tags.some(t => t.toLowerCase().includes(lowerQuery))
        )
        .slice(0, limit);
    }

    if (searchType === 'all' || searchType === 'projects') {
      results.projects = Array.from(this.store.projects.values())
        .filter(p =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery) ||
          p.topics.some(t => t.toLowerCase().includes(lowerQuery))
        )
        .slice(0, limit);
    }

    if (searchType === 'all' || searchType === 'models') {
      results.models = Array.from(this.store.models.values())
        .filter(m =>
          m.name.toLowerCase().includes(lowerQuery) ||
          m.organization.toLowerCase().includes(lowerQuery) ||
          m.description.toLowerCase().includes(lowerQuery) ||
          m.capabilities.some(c => c.toLowerCase().includes(lowerQuery))
        )
        .slice(0, limit);
    }

    if (searchType === 'all' || searchType === 'topics') {
      results.topics = Array.from(this.store.topics.values())
        .filter(t =>
          t.name.toLowerCase().includes(lowerQuery) ||
          t.description.toLowerCase().includes(lowerQuery) ||
          t.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        )
        .slice(0, limit);
    }

    return results;
  }

  private calculateHotScore(news: NewsItem, score: QualityScore): number {
    const timelinessFactor = score.timeliness;
    const qualityFactor = score.overall;
    return Math.round((timelinessFactor * 0.4 + qualityFactor * 0.6));
  }

  private calculateProjectQuality(project: GitHubProject): number {
    let score = 50;
    
    if (project.stars >= 100000) score += 30;
    else if (project.stars >= 50000) score += 25;
    else if (project.stars >= 10000) score += 20;
    else if (project.stars >= 5000) score += 15;
    else if (project.stars >= 1000) score += 10;
    
    if (project.starsToday >= 100) score += 20;
    else if (project.starsToday >= 50) score += 15;
    else if (project.starsToday >= 20) score += 10;
    
    if (project.license) score += 5;
    if (project.homepage) score += 5;
    
    return Math.min(score, 100);
  }

  private calculateProjectHotScore(project: GitHubProject): number {
    const recencyFactor = Math.max(0, 100 - (Date.now() - project.updatedAt.getTime()) / (1000 * 60 * 60 * 24));
    const starsFactor = Math.min(100, project.starsToday * 2);
    return Math.round((recencyFactor * 0.3 + starsFactor * 0.7));
  }

  private calculateModelQuality(model: Model): number {
    let score = 60;
    
    if (model.isRecommended) score += 20;
    if (model.isOpenSource) score += 10;
    if (model.performanceScores) {
      const avgScore = Object.values(model.performanceScores).reduce((a, b) => a + b, 0) / Object.values(model.performanceScores).length;
      score += avgScore * 0.2;
    }
    
    return Math.min(score, 100);
  }

  private calculateModelHotScore(model: Model): number {
    const recencyFactor = Math.max(0, 100 - (Date.now() - model.releaseDate.getTime()) / (1000 * 60 * 60 * 24));
    const qualityFactor = model.qualityScore;
    return Math.round((recencyFactor * 0.4 + qualityFactor * 0.6));
  }

  private isModelTrending(model: Model): boolean {
    const daysSinceRelease = (Date.now() - model.releaseDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceRelease <= 30 || model.isRecommended;
  }

  public clearAll(): void {
    this.store.news.clear();
    this.store.projects.clear();
    this.store.models.clear();
    this.store.topics.clear();
    this.store.qualityScores.clear();
    this.initializeIndexes();
  }

  public getStats(): {
    newsCount: number;
    projectsCount: number;
    modelsCount: number;
    topicsCount: number;
    excellentCount: number;
    goodCount: number;
  } {
    const qualityScores = Array.from(this.store.qualityScores.values());
    return {
      newsCount: this.store.news.size,
      projectsCount: this.store.projects.size,
      modelsCount: this.store.models.size,
      topicsCount: this.store.topics.size,
      excellentCount: qualityScores.filter(s => s.grade === 'EXCELLENT').length,
      goodCount: qualityScores.filter(s => s.grade === 'GOOD').length
    };
  }
}

export const dataManager = new DataManager();
