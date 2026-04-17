import express, { type Request, type Response } from 'express';
import { dataManager } from '../services/dataManager.js';
import type { TrendingTopic, NewsItem, GitHubProject, Model, ApiResponse } from '../types/index.js';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20, sortBy = 'trendScore' } = req.query;
    
    const result = dataManager.getTopics({
      sortBy: sortBy as keyof TrendingTopic,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10)
    });
    
    const response: ApiResponse<TrendingTopic[]> = {
      success: true,
      data: result.items,
      pagination: {
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
        total: result.total,
        totalPages: Math.ceil(result.total / parseInt(limit as string, 10))
      }
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching trending topics:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch trending topics'
    };
    res.status(500).json(response);
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const topic = dataManager.getTopicById(id);
    
    if (!topic) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Topic not found'
      };
      return res.status(404).json(response);
    }
    
    const relatedNews = topic.relatedNews
      .map(newsId => dataManager.getNewsById(newsId))
      .filter(Boolean) as NewsItem[];
    
    const relatedProjects = topic.relatedProjects
      .map(projectId => dataManager.getProjectById(projectId))
      .filter(Boolean) as GitHubProject[];
    
    const relatedModels = topic.relatedModels
      .map(modelId => dataManager.getModelById(modelId))
      .filter(Boolean) as Model[];
    
    const response: ApiResponse<{
      topic: TrendingTopic;
      relatedNews: NewsItem[];
      relatedProjects: GitHubProject[];
      relatedModels: Model[];
    }> = {
      success: true,
      data: {
        topic,
        relatedNews,
        relatedProjects,
        relatedModels
      }
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching topic by id:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch topic'
    };
    res.status(500).json(response);
  }
});

router.get('/:id/news', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const topic = dataManager.getTopicById(id);
    
    if (!topic) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Topic not found'
      };
      return res.status(404).json(response);
    }
    
    const relatedNews = topic.relatedNews
      .map(newsId => dataManager.getNewsById(newsId))
      .filter(Boolean) as NewsItem[];
    
    const response: ApiResponse<NewsItem[]> = {
      success: true,
      data: relatedNews
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching related news:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch related news'
    };
    res.status(500).json(response);
  }
});

router.get('/:id/projects', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const topic = dataManager.getTopicById(id);
    
    if (!topic) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Topic not found'
      };
      return res.status(404).json(response);
    }
    
    const relatedProjects = topic.relatedProjects
      .map(projectId => dataManager.getProjectById(projectId))
      .filter(Boolean) as GitHubProject[];
    
    const response: ApiResponse<GitHubProject[]> = {
      success: true,
      data: relatedProjects
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching related projects:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch related projects'
    };
    res.status(500).json(response);
  }
});

router.get('/:id/models', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const topic = dataManager.getTopicById(id);
    
    if (!topic) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Topic not found'
      };
      return res.status(404).json(response);
    }
    
    const relatedModels = topic.relatedModels
      .map(modelId => dataManager.getModelById(modelId))
      .filter(Boolean) as Model[];
    
    const response: ApiResponse<Model[]> = {
      success: true,
      data: relatedModels
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching related models:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch related models'
    };
    res.status(500).json(response);
  }
});

export default router;
