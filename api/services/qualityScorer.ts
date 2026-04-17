import type { NewsItem, Source } from '../types/index.js';

export interface QualityScore {
  sourceAuthority: number;
  contentAccuracy: number;
  timeliness: number;
  completeness: number;
  uniqueness: number;
  overall: number;
  grade: ContentGrade;
}

export type ContentGrade = 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' | 'REJECTED';

const GRADE_THRESHOLDS = {
  EXCELLENT: 90,
  GOOD: 75,
  FAIR: 60,
  POOR: 40,
  REJECTED: 0
};

const SOURCE_RATINGS: Record<string, number> = {
  'openai.com': 100,
  'anthropic.com': 100,
  'deepmind.google': 100,
  'ai.meta.com': 100,
  'blog.google': 98,
  'azure.microsoft.com': 95,
  'arxiv.org': 95,
  'nature.com': 95,
  'science.org': 95,
  'huggingface.co': 92,
  'github.com': 90,
  'techcrunch.com': 85,
  'wired.com': 85,
  'theverge.com': 80,
  'news.ycombinator.com': 75,
  'producthunt.com': 75,
  'reddit.com': 65
};

export class QualityScorer {
  private getSourceAuthority(source: Source): number {
    const hostname = new URL(source.url).hostname;
    
    for (const [domain, score] of Object.entries(SOURCE_RATINGS)) {
      if (hostname.includes(domain)) {
        return score;
      }
    }
    
    return 50;
  }

  private calculateTimeliness(publishedAt: Date): number {
    const now = new Date();
    const diffHours = (now.getTime() - publishedAt.getTime()) / (1000 * 60 * 60);
    
    if (diffHours <= 1) return 100;
    if (diffHours <= 3) return 95;
    if (diffHours <= 6) return 90;
    if (diffHours <= 12) return 80;
    if (diffHours <= 24) return 70;
    if (diffHours <= 48) return 50;
    if (diffHours <= 72) return 30;
    return 10;
  }

  private calculateCompleteness(news: NewsItem): number {
    let score = 40;
    
    if (news.summary && news.summary.length > 100) score += 15;
    if (news.content && news.content.length > 300) score += 15;
    if (news.tags && news.tags.length >= 3) score += 10;
    if (news.deepAnalysis) score += 20;
    
    return Math.min(score, 100);
  }

  private calculateContentAccuracy(news: NewsItem): number {
    let score = 60;
    
    if (news.author) score += 10;
    if (news.source && news.source.id) score += 10;
    if (news.url && news.url.startsWith('https://')) score += 10;
    
    const bannedWords = ['clickbait', 'fake', 'rumor', 'unverified', 'alleged'];
    const lowerTitle = news.title.toLowerCase();
    const hasBannedWords = bannedWords.some(word => lowerTitle.includes(word));
    if (hasBannedWords) score -= 30;
    
    return Math.max(0, Math.min(score, 100));
  }

  private calculateUniqueness(news: NewsItem, existingTitles: string[]): number {
    let score = 80;
    
    const lowerTitle = news.title.toLowerCase();
    const isDuplicate = existingTitles.some(title => {
      const lowerExisting = title.toLowerCase();
      const similarity = this.calculateTitleSimilarity(lowerTitle, lowerExisting);
      return similarity > 0.85;
    });
    
    if (isDuplicate) score = 20;
    
    return score;
  }

  private calculateTitleSimilarity(title1: string, title2: string): number {
    const words1 = title1.split(/\s+/);
    const words2 = title2.split(/\s+/);
    
    const set1 = new Set(words1);
    const set2 = new Set(words2);
    
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return union.size > 0 ? intersection.size / union.size : 0;
  }

  public calculateQualityScore(
    news: NewsItem, 
    existingTitles: string[] = []
  ): QualityScore {
    const sourceAuthority = this.getSourceAuthority(news.source);
    const contentAccuracy = this.calculateContentAccuracy(news);
    const timeliness = this.calculateTimeliness(news.publishedAt);
    const completeness = this.calculateCompleteness(news);
    const uniqueness = this.calculateUniqueness(news, existingTitles);
    
    const overall = Math.round(
      sourceAuthority * 0.30 +
      contentAccuracy * 0.25 +
      timeliness * 0.20 +
      completeness * 0.15 +
      uniqueness * 0.10
    );
    
    const grade = this.getGrade(overall);
    
    return {
      sourceAuthority,
      contentAccuracy,
      timeliness,
      completeness,
      uniqueness,
      overall,
      grade
    };
  }

  private getGrade(score: number): ContentGrade {
    if (score >= GRADE_THRESHOLDS.EXCELLENT) return 'EXCELLENT';
    if (score >= GRADE_THRESHOLDS.GOOD) return 'GOOD';
    if (score >= GRADE_THRESHOLDS.FAIR) return 'FAIR';
    if (score >= GRADE_THRESHOLDS.POOR) return 'POOR';
    return 'REJECTED';
  }

  public shouldDisplay(score: QualityScore): boolean {
    return score.grade !== 'REJECTED';
  }

  public shouldHighlight(score: QualityScore): boolean {
    return score.grade === 'EXCELLENT' || score.grade === 'GOOD';
  }
}

export const qualityScorer = new QualityScorer();
