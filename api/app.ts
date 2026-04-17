/**
 * This is a API server
 */

import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import newsRoutes from './routes/news.js'
import githubRoutes from './routes/github.js'
import modelsRoutes from './routes/models.js'
import trendingRoutes from './routes/trending.js'
import searchRoutes from './routes/search.js'
import { initializeData } from './services/dataInitializer.js'

// for esm mode
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// load env
dotenv.config()

const app: express.Application = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Initialize data on server start
const initializeApp = async () => {
  console.log('Initializing data...')
  try {
    await initializeData()
    console.log('Data initialization completed successfully!')
  } catch (error) {
    console.error('Error initializing data:', error)
  }
}

// Call the initialization function
initializeApp()

/**
 * API Routes
 */
app.use('/api/auth', authRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/github', githubRoutes)
app.use('/api/models', modelsRoutes)
app.use('/api/trending', trendingRoutes)
app.use('/api/search', searchRoutes)

/**
 * health
 */
app.use(
  '/api/health',
  (req: Request, res: Response, next: NextFunction): void => {
    res.status(200).json({
      success: true,
      message: 'ok',
    })
  },
)

/**
 * error handler middleware
 */
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', error)
  res.status(500).json({
    success: false,
    error: 'Server internal error',
  })
})

/**
 * 404 handler
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'API not found',
  })
})

export default app
