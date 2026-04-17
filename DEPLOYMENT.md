# 部署指南：AI 前沿情报聚合与推荐系统

由于指定的GitHub仓库 `https://github.com/an-an-525/github-deployment-skill` 不存在，本指南将使用 Vercel 平台来部署项目到公网。

## 部署方案选择

### Vercel 部署（推荐）
Vercel 是一个现代化的部署平台，支持：
- 前端静态网站部署
- 后端 Serverless Functions
- 自动从 GitHub 拉取代码
- 免费的 HTTPS 证书
- 全球 CDN 加速
- 预览环境

## 部署步骤

### 1. 准备工作

确保项目已经推送到 GitHub 仓库：
- 仓库地址：https://github.com/An-an-525/ai-intelligence-aggregator
- 代码已完整提交

### 2. Vercel 部署

#### 步骤 1：访问 Vercel 官网
- 打开 https://vercel.com/
- 使用 GitHub 账号登录

#### 步骤 2：创建新项目
- 点击 "Add New Project"
- 选择 "Import Git Repository"
- 搜索并选择 `An-an-525/ai-intelligence-aggregator` 仓库
- 点击 "Import"

#### 步骤 3：配置部署设置

**前端配置**：
- **Root Directory**: 留空（项目在根目录）
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install --legacy-peer-deps`

**环境变量**（可选，根据需要添加）：
- `NODE_ENV`: `production`
- `API_URL`: 后端API地址（如果使用外部API）

#### 步骤 4：部署项目
- 点击 "Deploy"
- 等待部署完成
- 获得部署后的 URL

### 3. 部署后端 API

Vercel 支持 Serverless Functions，可以将后端 API 部署为函数：

1. 在项目根目录创建 `api` 文件夹
2. 将后端代码移至 `api` 目录
3. 按照 Vercel Serverless Functions 格式重命名文件（如 `api/data.ts`）

### 4. 自定义域名（可选）

如果需要使用自定义域名：
1. 在 Vercel 项目设置中添加域名
2. 在域名提供商处配置 DNS 记录
3. 等待域名验证完成

## 其他部署选项

### Netlify 部署
1. 访问 https://www.netlify.com/
2. 登录并连接 GitHub 仓库
3. 配置构建命令：`npm run build`
4. 配置发布目录：`dist`
5. 点击 "Deploy site"

### Railway 部署（全栈）
1. 访问 https://railway.app/
2. 登录并创建新项目
3. 连接 GitHub 仓库
4. 配置环境变量
5. 部署项目

## 部署后的访问

部署完成后，您将获得一个公网访问 URL，例如：
- Vercel: `https://ai-intelligence-aggregator.vercel.app`
- Netlify: `https://ai-intelligence-aggregator.netlify.app`

## 维护与更新

- 每次向 GitHub 仓库推送代码时，Vercel/Netlify 会自动重新部署
- 可以在平台控制台查看部署日志和状态
- 可以回滚到之前的部署版本

## 故障排查

### 常见问题
1. **依赖安装失败**：尝试使用 `npm install --legacy-peer-deps --force`
2. **构建失败**：检查构建命令和输出目录配置
3. **API 无法访问**：确保后端函数正确配置

### 日志查看
- Vercel: 在项目控制台的 "Deployments" 页面查看
- Netlify: 在项目控制台的 "Deploys" 页面查看

## 部署验证

部署完成后，访问部署 URL 验证：
- 前端页面是否正常加载
- 后端 API 是否可以访问
- 数据是否正确显示
- 功能是否正常工作
