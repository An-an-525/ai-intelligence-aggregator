import express, { type Request, type Response } from 'express';
import { dataManager } from '../services/dataManager.js';
import type { NewsCategory, NewsItem, ApiResponse } from '../types/index.js';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const { category, page = 1, limit = 20, sortBy = 'hotScore', hotOnly, trendingOnly } = req.query;
    
    const result = dataManager.getNews({
      category: category as string,
      hotOnly: hotOnly === 'true',
      trendingOnly: trendingOnly === 'true',
      sortBy: sortBy as keyof NewsItem,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10)
    });
    
    const response: ApiResponse<NewsItem[]> = {
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
    console.error('Error fetching news:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch news'
    };
    res.status(500).json(response);
  }
});

router.get('/categories', (req: Request, res: Response) => {
  const categories: NewsCategory[] = ['ai', 'research', 'product', 'education', 'policy', 'general'];
  const response: ApiResponse<NewsCategory[]> = {
    success: true,
    data: categories
  };
  res.json(response);
});

router.get('/hot', (req: Request, res: Response) => {
  try {
    const result = dataManager.getNews({ hotOnly: true, limit: 10 });
    const response: ApiResponse<NewsItem[]> = {
      success: true,
      data: result.items
    };
    res.json(response);
  } catch (error) {
    console.error('Error fetching hot news:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch hot news'
    };
    res.status(500).json(response);
  }
});

router.get('/trending', (req: Request, res: Response) => {
  try {
    const result = dataManager.getNews({ trendingOnly: true, limit: 15 });
    const response: ApiResponse<NewsItem[]> = {
      success: true,
      data: result.items
    };
    res.json(response);
  } catch (error) {
    console.error('Error fetching trending news:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch trending news'
    };
    res.status(500).json(response);
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const news = dataManager.getNewsById(id);
    
    if (!news) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'News not found'
      };
      return res.status(404).json(response);
    }
    
    const response: ApiResponse<NewsItem> = {
      success: true,
      data: news
    };
    res.json(response);
  } catch (error) {
    console.error('Error fetching news by id:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch news'
    };
    res.status(500).json(response);
  }
});

export default router;
