import express, { type Request, type Response } from 'express';
import { dataManager } from '../services/dataManager.js';
import type { NewsItem, GitHubProject, Model, TrendingTopic, ApiResponse } from '../types/index.js';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const { q, type = 'all', limit = 20 } = req.query;
    const query = (q as string) || '';
    
    if (!query) {
      const response: ApiResponse<{
        news: NewsItem[];
        projects: GitHubProject[];
        models: Model[];
        topics: TrendingTopic[];
      }> = {
        success: true,
        data: {
          news: [],
          projects: [],
          models: [],
          topics: []
        }
      };
      return res.json(response);
    }
    
    const results = dataManager.search(query, {
      type: type as 'all' | 'news' | 'projects' | 'models' | 'topics',
      limit: parseInt(limit as string, 10)
    });
    
    const response: ApiResponse<typeof results> = {
      success: true,
      data: results
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error performing search:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to perform search'
    };
    res.status(500).json(response);
  }
});

router.get('/suggestions', (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    const query = (q as string)?.toLowerCase() || '';
    
    if (!query || query.length < 2) {
      const response: ApiResponse<string[]> = {
        success: true,
        data: []
      };
      return res.json(response);
    }
    
    const suggestions = new Set<string>();
    
    const { news, projects, models, topics } = dataManager.search(query, { limit: 10 });
    
    news.forEach(item => {
      if (item.title.toLowerCase().includes(query)) {
        suggestions.add(item.title);
      }
      item.tags.forEach(tag => {
        if (tag.toLowerCase().includes(query)) {
          suggestions.add(tag);
        }
      });
    });
    
    projects.forEach(project => {
      if (project.name.toLowerCase().includes(query)) {
        suggestions.add(project.name);
      }
      project.topics.forEach(topic => {
        if (topic.toLowerCase().includes(query)) {
          suggestions.add(topic);
        }
      });
    });
    
    models.forEach(model => {
      if (model.name.toLowerCase().includes(query)) {
        suggestions.add(model.name);
      }
      if (model.organization.toLowerCase().includes(query)) {
        suggestions.add(model.organization);
      }
    });
    
    topics.forEach(topic => {
      if (topic.name.toLowerCase().includes(query)) {
        suggestions.add(topic.name);
      }
      topic.tags.forEach(tag => {
        if (tag.toLowerCase().includes(query)) {
          suggestions.add(tag);
        }
      });
    });
    
    const response: ApiResponse<string[]> = {
      success: true,
      data: Array.from(suggestions).slice(0, 10)
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error getting search suggestions:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to get search suggestions'
    };
    res.status(500).json(response);
  }
});

export default router;
