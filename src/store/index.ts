import { create } from 'zustand';
import { NewsItem, GitHubProject, Model, TrendingTopic, UserPreferences } from '../types';
import { mockNewsItems, mockGitHubProjects, mockModels, mockTrendingTopics } from '../data/mockData';

interface AppState {
  newsItems: NewsItem[];
  githubProjects: GitHubProject[];
  models: Model[];
  trendingTopics: TrendingTopic[];
  selectedNewsItem: NewsItem | null;
  searchQuery: string;
  activeTopic: string | null;
  bookmarks: string[];
  userPreferences: UserPreferences;
  isLoading: boolean;
  currentPage: 'home' | 'github' | 'models' | 'agents' | 'search' | 'detail';
  
  setNewsItems: (items: NewsItem[]) => void;
  setGitHubProjects: (projects: GitHubProject[]) => void;
  setModels: (models: Model[]) => void;
  setTrendingTopics: (topics: TrendingTopic[]) => void;
  selectNewsItem: (item: NewsItem | null) => void;
  setSearchQuery: (query: string) => void;
  setActiveTopic: (topic: string | null) => void;
  toggleBookmark: (itemId: string) => void;
  setUserPreferences: (prefs: Partial<UserPreferences>) => void;
  setIsLoading: (loading: boolean) => void;
  setCurrentPage: (page: AppState['currentPage']) => void;
  
  getFilteredNews: () => NewsItem[];
  getFilteredGitHub: () => GitHubProject[];
  getFilteredModels: () => Model[];
}

const defaultUserPreferences: UserPreferences = {
  topics: [],
  excludedTopics: [],
  sources: [],
  infoDensity: 'medium',
  refreshFrequency: '6h',
  language: 'zh',
  summaryLength: 'medium',
  recommendationStyle: 'balanced',
  minQualityScore: 0
};

export const useAppStore = create<AppState>((set, get) => ({
  newsItems: mockNewsItems,
  githubProjects: mockGitHubProjects,
  models: mockModels,
  trendingTopics: mockTrendingTopics,
  selectedNewsItem: null,
  searchQuery: '',
  activeTopic: null,
  bookmarks: [],
  userPreferences: defaultUserPreferences,
  isLoading: false,
  currentPage: 'home',

  setNewsItems: (items) => set({ newsItems: items }),
  setGitHubProjects: (projects) => set({ githubProjects: projects }),
  setModels: (models) => set({ models }),
  setTrendingTopics: (topics) => set({ trendingTopics: topics }),
  selectNewsItem: (item) => set({ selectedNewsItem: item }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveTopic: (topic) => set({ activeTopic: topic }),
  toggleBookmark: (itemId) => set((state) => ({
    bookmarks: state.bookmarks.includes(itemId)
      ? state.bookmarks.filter(id => id !== itemId)
      : [...state.bookmarks, itemId]
  })),
  setUserPreferences: (prefs) => set((state) => ({
    userPreferences: { ...state.userPreferences, ...prefs }
  })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setCurrentPage: (page) => set({ currentPage: page }),

  getFilteredNews: () => {
    const state = get();
    let filtered = [...state.newsItems];
    
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (state.activeTopic) {
      filtered = filtered.filter(item =>
        item.topics.includes(state.activeTopic)
      );
    }
    
    if (state.userPreferences.minQualityScore > 0) {
      filtered = filtered.filter(item =>
        item.qualityScore >= state.userPreferences.minQualityScore
      );
    }
    
    return filtered.sort((a, b) => b.trendingScore - a.trendingScore);
  },

  getFilteredGitHub: () => {
    const state = get();
    let filtered = [...state.githubProjects];
    
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.topics.some(topic => topic.toLowerCase().includes(query))
      );
    }
    
    return filtered.sort((a, b) => b.stars - a.stars);
  },

  getFilteredModels: () => {
    const state = get();
    let filtered = [...state.models];
    
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(model =>
        model.name.toLowerCase().includes(query) ||
        model.description.toLowerCase().includes(query) ||
        model.provider.toLowerCase().includes(query)
      );
    }
    
    return filtered.sort((a, b) => b.qualityScore - a.qualityScore);
  }
}));
