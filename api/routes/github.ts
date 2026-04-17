import express, { type Request, type Response } from 'express';
import { dataManager } from '../services/dataManager.js';
import type { GitHubProject, ApiResponse } from '../types/index.js';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const { language, page = 1, limit = 20, sortBy = 'hotScore', hotOnly, trendingOnly } = req.query;
    
    const result = dataManager.getProjects({
      language: language as string,
      hotOnly: hotOnly === 'true',
      trendingOnly: trendingOnly === 'true',
      sortBy: sortBy as keyof GitHubProject,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10)
    });
    
    const response: ApiResponse<{ projects: GitHubProject[]; languages: string[] }> = {
      success: true,
      data: {
        projects: result.items,
        languages: result.languages
      },
      pagination: {
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10),
        total: result.total,
        totalPages: Math.ceil(result.total / parseInt(limit as string, 10))
      }
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch GitHub projects'
    };
    res.status(500).json(response);
  }
});

router.get('/hot', (req: Request, res: Response) => {
  try {
    const result = dataManager.getProjects({ hotOnly: true, limit: 10 });
    const response: ApiResponse<GitHubProject[]> = {
      success: true,
      data: result.items
    };
    res.json(response);
  } catch (error) {
    console.error('Error fetching hot projects:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch hot projects'
    };
    res.status(500).json(response);
  }
});

router.get('/trending', (req: Request, res: Response) => {
  try {
    const result = dataManager.getProjects({ trendingOnly: true, limit: 15 });
    const response: ApiResponse<GitHubProject[]> = {
      success: true,
      data: result.items
    };
    res.json(response);
  } catch (error) {
    console.error('Error fetching trending projects:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch trending projects'
    };
    res.status(500).json(response);
  }
});

router.get('/stats', (req: Request, res: Response) => {
  try {
    const stats = dataManager.getStats();
    const response: ApiResponse<any> = {
      success: true,
      data: {
        totalProjects: stats.projectsCount,
        totalNews: stats.newsCount,
        totalModels: stats.modelsCount,
        excellentCount: stats.excellentCount,
        goodCount: stats.goodCount
      }
    };
    res.json(response);
  } catch (error) {
    console.error('Error fetching stats:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch stats'
    };
    res.status(500).json(response);
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = dataManager.getProjectById(id);
    
    if (!project) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Project not found'
      };
      return res.status(404).json(response);
    }
    
    const response: ApiResponse<GitHubProject> = {
      success: true,
      data: project
    };
    res.json(response);
  } catch (error) {
    console.error('Error fetching project by id:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch project'
    };
    res.status(500).json(response);
  }
});

export default router;
