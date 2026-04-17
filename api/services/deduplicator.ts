import type { NewsItem, GitHubProject, Model } from '../types/index.js';

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  duplicateOf?: string;
  similarity?: number;
  reason?: string;
}

export class Deduplicator {
  private contentFingerprints: Map<string, Set<string>> = new Map();
  private urlIndex: Map<string, string> = new Map();
  private titleIndex: Map<string, string> = new Map();

  public clear(): void {
    this.contentFingerprints.clear();
    this.urlIndex.clear();
    this.titleIndex.clear();
  }

  public addToIndex(item: NewsItem | GitHubProject | Model, id: string): void {
    if ('url' in item) {
      this.urlIndex.set(item.url, id);
    }
    
    if ('title' in item) {
      const normalizedTitle = this.normalizeText(item.title);
      this.titleIndex.set(normalizedTitle, id);
    } else if ('name' in item) {
      const normalizedName = this.normalizeText(item.name);
      this.titleIndex.set(normalizedName, id);
    }

    const fingerprint = this.generateContentFingerprint(item);
    if (!this.contentFingerprints.has(fingerprint)) {
      this.contentFingerprints.set(fingerprint, new Set());
    }
    this.contentFingerprints.get(fingerprint)!.add(id);
  }

  public checkNewsDuplicate(news: NewsItem): DuplicateCheckResult {
    if (this.urlIndex.has(news.url)) {
      return {
        isDuplicate: true,
        duplicateOf: this.urlIndex.get(news.url),
        reason: 'URL already exists'
      };
    }

    const normalizedTitle = this.normalizeText(news.title);
    for (const [existingTitle, id] of this.titleIndex.entries()) {
      const similarity = this.calculateSimilarity(normalizedTitle, existingTitle);
      if (similarity > 0.85) {
        return {
          isDuplicate: true,
          duplicateOf: id,
          similarity,
          reason: 'Title similarity threshold exceeded'
        };
      }
    }

    const fingerprint = this.generateContentFingerprint(news);
    if (this.contentFingerprints.has(fingerprint)) {
      const existingIds = this.contentFingerprints.get(fingerprint)!;
      if (existingIds.size > 0) {
        return {
          isDuplicate: true,
          duplicateOf: Array.from(existingIds)[0],
          reason: 'Content fingerprint match'
        };
      }
    }

    return { isDuplicate: false };
  }

  public checkProjectDuplicate(project: GitHubProject): DuplicateCheckResult {
    if (this.urlIndex.has(project.url)) {
      return {
        isDuplicate: true,
        duplicateOf: this.urlIndex.get(project.url),
        reason: 'URL already exists'
      };
    }

    if (this.urlIndex.has(`https://github.com/${project.fullName}`)) {
      return {
        isDuplicate: true,
        duplicateOf: this.urlIndex.get(`https://github.com/${project.fullName}`),
        reason: 'Project already exists'
      };
    }

    return { isDuplicate: false };
  }

  public checkModelDuplicate(model: Model): DuplicateCheckResult {
    const modelKey = `${model.organization.toLowerCase()}-${model.name.toLowerCase()}`;
    
    for (const [url, id] of this.urlIndex.entries()) {
      if (url.includes(modelKey)) {
        return {
          isDuplicate: true,
          duplicateOf: id,
          reason: 'Model already exists'
        };
      }
    }

    return { isDuplicate: false };
  }

  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private calculateSimilarity(text1: string, text2: string): number {
    const words1 = text1.split(' ');
    const words2 = text2.split(' ');
    
    const set1 = new Set(words1);
    const set2 = new Set(words2);
    
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return union.size > 0 ? intersection.size / union.size : 0;
  }

  private generateContentFingerprint(item: NewsItem | GitHubProject | Model): string {
    let content = '';
    
    if ('title' in item) {
      content += item.title;
    } else if ('name' in item) {
      content += item.name;
    }
    
    if ('description' in item) {
      content += ' ' + item.description;
    }
    
    if ('summary' in item) {
      content += ' ' + item.summary;
    }

    const normalized = this.normalizeText(content);
    const words = normalized.split(' ').slice(0, 20);
    return words.sort().join('|');
  }

  public batchDeduplicateNews(newsItems: NewsItem[]): NewsItem[] {
    const uniqueNews: NewsItem[] = [];
    const seenTitles = new Set<string>();

    for (const news of newsItems) {
      const checkResult = this.checkNewsDuplicate(news);
      
      if (!checkResult.isDuplicate) {
        uniqueNews.push(news);
        this.addToIndex(news, news.id);
        seenTitles.add(this.normalizeText(news.title));
      }
    }

    return uniqueNews;
  }

  public mergeDuplicateNews(primary: NewsItem, duplicates: NewsItem[]): NewsItem {
    const merged = { ...primary };
    
    for (const duplicate of duplicates) {
      if (duplicate.tags) {
        const allTags = new Set([...(merged.tags || []), ...duplicate.tags]);
        merged.tags = Array.from(allTags);
      }
      
      if (duplicate.deepAnalysis && !merged.deepAnalysis) {
        merged.deepAnalysis = duplicate.deepAnalysis;
      }
      
      if (duplicate.content && !merged.content) {
        merged.content = duplicate.content;
      }
    }
    
    return merged;
  }
}

export const deduplicator = new Deduplicator();
