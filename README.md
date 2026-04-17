# AI 前沿情报聚合与推荐系统

一个智能化的 AI 与技术前沿资讯聚合平台，持续获取最新、最广、最有深度、最高质量的 AI 资讯，支持可视化展示、智能筛选、长期追踪和自定义订阅。

## 🚀 系统特性

### 核心功能
- 📰 **综合资讯流** - 智能推荐，最新动态，热门趋势
- 🔍 **智能搜索** - 多维度检索，实时筛选
- 📊 **GitHub 榜单** - Trending 项目，Stars 增长，成熟项目推荐
- 🤖 **模型榜单** - 大模型对比，性能评测，更新动态
- 📈 **热门趋势** - 实时热点，周榜/月榜，趋势分析可视化
- 📝 **深度分析** - AI 生成的技术解读和价值评估
- 🔖 **收藏管理** - 稍后读，标签分类，知识归档

### 技术亮点
- 🎨 **现代化 UI** - 深色主题，流畅动画，响应式设计
- 📱 **全端适配** - 桌面优先，完美支持平板和手机
- ⚡ **高性能** - React 18 + Vite，极快开发体验
- 🔧 **类型安全** - 完整 TypeScript 支持
- 📦 **模块化架构** - 组件化设计，易于扩展

## 🛠️ 技术栈

### 前端
- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **路由**: React Router
- **可视化**: Recharts
- **图标**: Lucide React

### 后端
- **框架**: Express.js + TypeScript
- **数据库**: PostgreSQL (规划中)
- **缓存**: Redis (规划中)

## 📦 快速开始

### 环境要求
- Node.js 18+
- npm 或 pnpm

### 安装运行

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev
```

开发服务器将启动：
- 前端: http://localhost:5173
- 后端: http://localhost:3001

### 构建生产版本

```bash
# 构建前端
npm run build

# 预览生产版本
npm run preview
```

## 📁 项目结构

```
/workspace
├── .trae/documents/      # 产品和技术文档
│   ├── PRD.md            # 产品需求文档
│   ├── TECH_ARCH.md      # 技术架构文档
│   ├── AGENT_ARCH.md     # 多 Agent 架构文档
│   └── DEV_PLAN.md       # 开发计划
├── api/                   # 后端 API
│   ├── routes/
│   ├── app.ts
│   └── server.ts
├── src/                   # 前端源码
│   ├── components/        # 组件
│   │   ├── Layout.tsx
│   │   ├── NewsCard.tsx
│   │   ├── GitHubProjectCard.tsx
│   │   ├── ModelCard.tsx
│   │   └── TrendingTopicCard.tsx
│   ├── pages/            # 页面
│   │   ├── Home.tsx
│   │   ├── TrendingPage.tsx
│   │   ├── GitHubPage.tsx
│   │   ├── ModelsPage.tsx
│   │   ├── AgentsPage.tsx
│   │   ├── EducationPage.tsx
│   │   ├── SearchPage.tsx
│   │   └── DetailPage.tsx
│   ├── store/            # 状态管理
│   │   └── index.ts
│   ├── types/            # TypeScript 类型
│   │   └── index.ts
│   ├── data/             # 数据
│   │   └── mockData.ts
│   ├── App.tsx
│   └── main.tsx
├── public/                # 静态资源
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 📚 核心模块

### 页面组件
1. **首页** - 综合资讯流，热门趋势，分类导航
2. **GitHub 榜单** - 开源项目推荐，语言筛选
3. **模型榜单** - 大模型对比，性能评测
4. **热门趋势** - 实时热点，趋势图表
5. **搜索页** - 多类型内容搜索
6. **详情页** - 深度分析，相关推荐
7. **Agent 专题** - Agent 架构与最佳实践 (占位)
8. **教育科技** - EdTech 产品与工具 (占位)

### 数据卡片
- **NewsCard** - 资讯卡片，质量评分，热门指标
- **GitHubProjectCard** - 项目卡片，Stars 增长，语言标签
- **ModelCard** - 模型卡片，性能指标，能力标签
- **TrendingTopicCard** - 话题卡片，趋势状态，热度评分

## 🎯 产品路线图

### MVP 1.0 ✅ (已完成)
- 完整的前端界面
- 模拟数据展示
- 响应式设计
- 基础搜索和筛选
- 收藏功能

### Phase 2 (进行中)
- 后端 API 框架
- 数据库集成
- GitHub 数据采集
- RSS 源采集

### Phase 3 (规划中)
- 多源数据聚合
- 内容清洗与去重
- 向量嵌入生成
- 语义搜索

### Phase 4 (规划中)
- LLM 集成
- 自动摘要生成
- 质量评分系统
- 个性化推荐

### Phase 5 (规划中)
- 用户系统
- 自定义订阅
- 每日简报
- 管理后台

## 📖 文档

完整的产品和技术文档位于 [`.trae/documents/`](.trae/documents/) 目录：

- **PRD.md** - 产品需求文档
- **TECH_ARCH.md** - 技术架构文档
- **AGENT_ARCH.md** - 多 Agent 架构设计
- **DEV_PLAN.md** - 开发计划与任务拆解

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发规范
- 使用 TypeScript 进行类型安全开发
- 组件保持单一职责，小于 300 行
- 遵循 Tailwind CSS 最佳实践
- 使用 Lucide React 图标库

## 📄 许可证

MIT License

## 🌟 致谢

- React 生态系统
- Tailwind CSS 团队
- Lucide 图标库
- Recharts 数据可视化

---

**AI 前沿情报聚合与推荐系统** - 让 AI 资讯触手可及！
