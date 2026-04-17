import express, { type Request, type Response } from 'express';
import { dataManager } from '../services/dataManager.js';
import type { Model, ModelType, ApiResponse } from '../types/index.js';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const { type, page = 1, limit = 20, sortBy = 'hotScore', hotOnly, trendingOnly, recommendedOnly, openSourceOnly } = req.query;
    
    const result = dataManager.getModels({
      type: type as string,
      hotOnly: hotOnly === 'true',
      trendingOnly: trendingOnly === 'true',
      recommendedOnly: recommendedOnly === 'true',
      openSourceOnly: openSourceOnly === 'true',
      sortBy: sortBy as keyof Model,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10)
    });
    
    const response: ApiResponse<{ models: Model[]; types: ModelType[] }> = {
      success: true,
      data: {
        models: result.items,
        types: result.types as ModelType[]
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
    console.error('Error fetching models:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch models'
    };
    res.status(500).json(response);
  }
});

router.get('/types', (req: Request, res: Response) => {
  const types: ModelType[] = ['llm', 'multimodal', 'code', 'agent', 'embedding', 'vision', 'audio'];
  const response: ApiResponse<ModelType[]> = {
    success: true,
    data: types
  };
  res.json(response);
});

router.get('/hot', (req: Request, res: Response) => {
  try {
    const result = dataManager.getModels({ hotOnly: true, limit: 10 });
    const response: ApiResponse<Model[]> = {
      success: true,
      data: result.items
    };
    res.json(response);
  } catch (error) {
    console.error('Error fetching hot models:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch hot models'
    };
    res.status(500).json(response);
  }
});

router.get('/trending', (req: Request, res: Response) => {
  try {
    const result = dataManager.getModels({ trendingOnly: true, limit: 15 });
    const response: ApiResponse<Model[]> = {
      success: true,
      data: result.items
    };
    res.json(response);
  } catch (error) {
    console.error('Error fetching trending models:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch trending models'
    };
    res.status(500).json(response);
  }
});

router.get('/recommended', (req: Request, res: Response) => {
  try {
    const result = dataManager.getModels({ recommendedOnly: true });
    const response: ApiResponse<Model[]> = {
      success: true,
      data: result.items
    };
    res.json(response);
  } catch (error) {
    console.error('Error fetching recommended models:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch recommended models'
    };
    res.status(500).json(response);
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const model = dataManager.getModelById(id);
    
    if (!model) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Model not found'
      };
      return res.status(404).json(response);
    }
    
    const response: ApiResponse<Model> = {
      success: true,
      data: model
    };
    res.json(response);
  } catch (error) {
    console.error('Error fetching model by id:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch model'
    };
    res.status(500).json(response);
  }
});

export default router;
