# AI 前沿情报聚合与推荐系统

一个完整的AI前沿情报聚合与推荐系统，提供实时、高质量的AI和技术前沿资讯。

## 功能特性

- 📡 实时数据抓取与整合
- 🔍 多维度质量评分系统
- 🌍 双语支持（中文/英文）
- 🎨 高级UI设计（类似Claude网页风格）
- 📱 响应式布局
- 🌙 深色模式支持
- 📊 可视化展示
- 🔖 智能筛选与推荐
- 📌 长期追踪
- 📨 自定义订阅

## 技术栈

### 前端
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- Recharts
- Lucide React

### 后端
- Express.js
- TypeScript
- Node.js

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

#### 启动前端开发服务器
```bash
npm run dev
```

#### 启动后端开发服务器
```bash
npm run dev:api
```

### 构建

#### 构建前端
```bash
npm run build
```

#### 构建后端
```bash
npm run build:api
```

## 项目结构

```
/workspace
├── api/              # 后端代码
│   ├── app.ts       # 后端入口文件
│   ├── services/    # 服务层
│   └── types/       # 类型定义
├── src/             # 前端代码
│   ├── components/  # 组件
│   ├── data/        # 数据
│   ├── stores/      # 状态管理
│   └── utils/       # 工具函数
└── public/          # 静态资源
```

## 仓库地址

https://github.com/An-an-525/ai-intelligence-aggregator

## 部署

此项目已部署到GitHub，可以使用以下方法部署到公网：

1. **GitHub Pages**: 部署前端应用
2. **Vercel/Netlify**: 部署完整应用
3. **Heroku**: 部署后端服务

## 许可证

MIT License
