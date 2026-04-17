# AI 前沿情报聚合与推荐系统 - 开发计划

## 1. MVP 版本范围

### 核心功能 (MVP v1.0)
- ✅ 基础前端界面 (首页、搜索、详情页)
- ✅ 模拟数据展示
- ✅ GitHub 项目榜单 (静态数据)
- ✅ 模型榜单 (静态数据)
- ✅ 资讯流展示
- ✅ 基础搜索功能
- ✅ 响应式设计
- 🚧 后端 API 基础框架
- 🚧 PostgreSQL 数据库基础表结构
- 🚧 GitHub 数据采集脚本
- 🚧 RSS 源采集脚本

## 2. 后续迭代路线图

### Phase 2: 数据采集增强
- 多源数据采集 (Hugging Face, arXiv, Hacker News)
- 定时任务调度
- 增量更新机制
- 数据去重

### Phase 3: 内容分析
- 自动摘要生成
- 主题分类
- 质量评分
- 向量嵌入生成

### Phase 4: 智能推荐
- 个性化推荐
- 用户兴趣画像
- 热门趋势分析
- 每日简报生成

### Phase 5: 高级功能
- 用户系统 (注册/登录)
- 收藏与归档
- 自定义订阅
- 管理后台

## 3. 开源项目推荐清单

### 前端框架与工具
- **React 18** - UI 框架 (生态成熟，社区活跃)
- **Vite** - 构建工具 (快速开发体验)
- **TypeScript** - 类型安全 (减少运行时错误)
- **Tailwind CSS** - 样式框架 (快速构建 UI)
- **Zustand** - 状态管理 (轻量简单)
- **React Query** - 数据获取 (缓存与同步)
- **Recharts** - 数据可视化
- **React Router** - 路由管理
- **shadcn/ui** - 高质量 UI 组件库
- **Lucide React** - 图标库

### 后端框架与工具
- **Express.js** - Web 框架 (轻量灵活)
- **TypeScript** - 后端类型安全
- **Prisma** - ORM (类型安全的数据库访问)
- **BullMQ** - 消息队列 (任务调度)
- **node-cron** - 定时任务
- **Winston** - 日志记录
- **Helmet** - 安全头
- **CORS** - 跨域处理

### 数据库与存储
- **PostgreSQL 15** - 主数据库 (功能强大)
- **pgvector** - 向量扩展 (相似度搜索)
- **Redis 7** - 缓存与会话
- **Qdrant** - 向量数据库 (可选，用于大规模向量搜索)
- **MeiliSearch** - 全文搜索 (快速易用)

### 数据采集与处理
- **Octokit** - GitHub API SDK
- **rss-parser** - RSS 解析
- **cheerio** - HTML 解析
- **axios** - HTTP 客户端
- **Puppeteer** - 浏览器自动化 (可选，用于复杂页面)

### AI/LLM 集成
- **OpenAI SDK** - GPT-4/GPT-3.5 API
- **Anthropic SDK** - Claude API (可选)
- **LangChain** - LLM 应用框架 (可选，用于复杂 Agent 流程)
- **Transformers.js** - 本地运行模型 (可选)

### 部署与运维
- **Docker** - 容器化
- **Docker Compose** - 本地开发环境
- **GitHub Actions** - CI/CD
- **Prometheus + Grafana** - 监控 (可选)
- **Sentry** - 错误追踪 (可选)

## 4. 项目结构设计

```
/workspace
├── docs/                    # 文档
│   ├── PRD.md
│   ├── TECH_ARCH.md
│   ├── AGENT_ARCH.md
│   └── DEV_PLAN.md
├── frontend/                # 前端
│   ├── src/
│   │   ├── components/     # 组件
│   │   ├── pages/          # 页面
│   │   ├── hooks/          # 自定义 hooks
│   │   ├── store/          # 状态管理
│   │   ├── services/       # API 服务
│   │   ├── types/          # TypeScript 类型
│   │   ├── utils/          # 工具函数
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/                 # 后端
│   ├── src/
│   │   ├── controllers/    # 控制器
│   │   ├── services/       # 服务层
│   │   ├── agents/         # Agent 实现
│   │   ├── models/         # 数据模型
│   │   ├── routes/         # 路由
│   │   ├── middleware/     # 中间件
│   │   ├── jobs/           # 定时任务
│   │   ├── utils/          # 工具函数
│   │   ├── types/          # TypeScript 类型
│   │   └── index.ts
│   ├── prisma/             # Prisma schema
│   ├── package.json
│   └── tsconfig.json
├── docker/                  # Docker 配置
│   ├── docker-compose.yml
│   ├── postgres/
│   └── redis/
├── scripts/                 # 脚本
│   ├── seed-data.ts         # 种子数据
│   └── fetch-github.ts      # GitHub 数据采集
├── .env.example
└── README.md
```

## 5. MVP 开发任务拆解

### 任务 1: 项目初始化
- [ ] 创建项目目录结构
- [ ] 初始化前端项目 (Vite + React + TypeScript)
- [ ] 初始化后端项目 (Express + TypeScript)
- [ ] 配置 Docker Compose
- [ ] 创建 .env.example

### 任务 2: 前端基础架构
- [ ] 配置 Tailwind CSS
- [ ] 设置路由 (React Router)
- [ ] 创建基础布局组件
- [ ] 设置状态管理 (Zustand)
- [ ] 配置 API 客户端

### 任务 3: 前端页面实现
- [ ] 首页 (资讯流 + 热门趋势)
- [ ] GitHub 榜单页
- [ ] 模型榜单页
- [ ] 搜索页
- [ ] 详情页
- [ ] 导航栏与侧边栏

### 任务 4: 后端基础架构
- [ ] 设置 Express 服务器
- [ ] 配置 Prisma ORM
- [ ] 创建数据库 schema
- [ ] 实现基础 API 路由
- [ ] 配置 CORS 和错误处理

### 任务 5: 数据模型与种子数据
- [ ] 定义 Prisma schema
- [ ] 创建数据库迁移
- [ ] 编写种子数据脚本
- [ ] 生成模拟数据

### 任务 6: API 实现
- [ ] GET /api/items - 获取资讯列表
- [ ] GET /api/items/:id - 获取资讯详情
- [ ] GET /api/github - 获取 GitHub 项目
- [ ] GET /api/models - 获取模型列表
- [ ] GET /api/search - 搜索接口

### 任务 7: 数据采集 (基础版)
- [ ] GitHub Trending 采集脚本
- [ ] RSS 源采集脚本
- [ ] 简单的数据存储

### 任务 8: 测试与优化
- [ ] 前端功能测试
- [ ] 后端 API 测试
- [ ] 响应式测试
- [ ] 性能优化

## 6. 快速启动指南

### 本地开发环境 (使用 Docker)

```bash
# 1. 克隆项目
git clone <repo-url>
cd <project-dir>

# 2. 复制环境变量
cp .env.example .env
# 编辑 .env 填入必要的配置

# 3. 启动服务
docker-compose up -d

# 4. 初始化数据库
cd backend
npm install
npx prisma migrate dev
npx prisma db seed

# 5. 启动后端
npm run dev

# 6. 启动前端 (新终端)
cd frontend
npm install
npm run dev
```

## 7. 关键技术决策说明

### 为什么选择 React + TypeScript?
- 生态系统最成熟，组件库丰富
- TypeScript 提供类型安全，减少 bug
- Vite 提供极快的开发体验

### 为什么选择 Express.js?
- 轻量级，灵活度高
- Node.js 全栈，前后端语言一致
- 中间件生态丰富

### 为什么选择 PostgreSQL?
- 支持 JSON、向量等高级特性
- 事务支持完善
- 开源免费，社区活跃

### 为什么选择 Prisma?
- 类型安全的 ORM
- 自动生成类型定义
- 迁移管理方便

## 8. 个人开发建议

### 第一周: 快速原型
- 专注前端界面，使用静态数据
- 实现核心页面和交互
- 验证产品设计

### 第二周: 后端基础
- 搭建后端 API
- 设计数据库
- 实现基础数据采集

### 第三周: 数据增强
- 完善多源采集
- 添加内容分析
- 实现基础推荐

### 第四周: 完善功能
- 用户系统
- 收藏订阅
- 管理后台

## 9. 小团队开发建议

### 角色分工
- **前端开发**: 2人 - 界面、交互、可视化
- **后端开发**: 2人 - API、数据采集、Agent 系统
- **全栈/DevOps**: 1人 - 部署、监控、CI/CD

### 开发流程
1. 每周 Sprint 计划
2. 每日站会同步
3. 代码审查
4. 自动化测试
5. 持续部署
