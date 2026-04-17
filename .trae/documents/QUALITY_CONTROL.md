# 数据质量控制系统设计

## 1. 核心原则

### 1.1 严格质量标准
- **时效性**：所有内容必须在发布后 24 小时内获取，优先抓取 6 小时内的内容
- **准确性**：所有事实信息必须经过至少两个独立来源验证
- **权威性**：优先从官方渠道、权威机构、顶级专家获取信息
- **完整性**：包含背景、价值、影响、技术解读等完整维度

### 1.2 错误零容忍
- 任何事实错误必须立即识别并标记
- 低质量内容必须被过滤或降级
- 重复内容必须被检测和合并
- 来源可靠性必须持续评估

## 2. 数据采集策略

### 2.1 优先数据源
```typescript
const PRIORITY_SOURCES = {
  // 官方渠道（最高优先级）
  OFFICIAL: [
    'openai.com/blog',
    'anthropic.com',
    'deepmind.google',
    'ai.meta.com',
    'blog.google',
    'azure.microsoft.com'
  ],
  // 研究平台
  RESEARCH: [
    'arxiv.org',
    'huggingface.co/papers',
    'paperswithcode.com'
  ],
  // 代码平台
  CODE: [
    'github.com/trending',
    'github.com/explore'
  ],
  // 权威媒体
  MEDIA: [
    'techcrunch.com',
    'wired.com',
    'theverge.com',
    'nature.com',
    'science.org'
  ],
  // 社区平台（需严格筛选）
  COMMUNITY: [
    'news.ycombinator.com',
    'producthunt.com'
  ]
};
```

### 2.2 采集频率
- **超高频**（每 30 分钟）：官方博客、GitHub Trending
- **高频**（每 2 小时）：arXiv、Hugging Face Papers
- **中频**（每 6 小时）：权威媒体
- **低频**（每 12 小时）：社区平台

## 3. 质量评分系统

### 3.1 多维度评分（0-100）
```typescript
interface QualityScore {
  // 基础指标
  sourceAuthority: number;      // 来源权威性 (30%)
  contentAccuracy: number;      // 内容准确性 (25%)
  timeliness: number;           // 时效性 (20%)
  completeness: number;         // 内容完整性 (15%)
  uniqueness: number;           // 独特性 (10%)
  
  // 综合得分
  overall: number;
}
```

### 3.2 来源权威度评分
```typescript
const SOURCE_RATINGS = {
  // 官方渠道
  'openai.com': 100,
  'anthropic.com': 100,
  'deepmind.google': 100,
  'ai.meta.com': 100,
  
  // 研究机构
  'arxiv.org': 95,
  'nature.com': 95,
  'science.org': 95,
  
  // 技术媒体
  'techcrunch.com': 85,
  'wired.com': 85,
  'theverge.com': 80,
  
  // 社区平台
  'news.ycombinator.com': 75,
  'producthunt.com': 75,
  'reddit.com/r/MachineLearning': 70
};
```

### 3.3 内容质量检查清单
- [ ] 标题与内容一致
- [ ] 无明显事实错误
- [ ] 引用来源可靠
- [ ] 内容完整且有深度
- [ ] 包含技术细节或价值分析
- [ ] 无重复内容
- [ ] 发布时间准确
- [ ] 作者/机构可追溯
- [ ] 符合我们的关注主题

## 4. 去重与验证机制

### 4.1 内容去重策略
1. **指纹去重**：生成内容语义指纹
2. **标题相似度**：计算标题余弦相似度 > 0.85 视为重复
3. **内容相似度**：计算内容相似度 > 0.7 视为重复
4. **来源去重**：同一事件的多个报道只保留质量最高的

### 4.2 事实验证流程
```
1. 提取关键事实点
2. 查找至少两个独立来源
3. 对比事实一致性
4. 标记争议点
5. 人工审核（如果需要）
```

## 5. 内容分级系统

### 5.1 内容等级
```typescript
type ContentGrade = 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' | 'REJECTED';

const GRADE_THRESHOLDS = {
  EXCELLENT: 90,    // 必须展示
  GOOD: 75,         // 推荐展示
  FAIR: 60,         // 可选展示
  POOR: 40,         // 仅在筛选后展示
  REJECTED: 0       // 不展示
};
```

### 5.2 自动降级规则
- 来源可靠性下降 → 降低 10-20 分
- 发现事实错误 → 直接降级至 REJECTED
- 内容过时（> 7 天）→ 降低 30 分
- 重复内容 → 降低 40 分或标记为 REJECTED

## 6. 人工审核机制

### 6.1 需要人工审核的情况
- 质量分数在 60-75 之间的内容
- 存在争议的事实
- 新来源的内容
- 高风险主题（政治、敏感话题）
- 质量评分波动异常

### 6.2 审核队列管理
```typescript
interface ReviewQueueItem {
  contentId: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  reason: string[];
  assignedTo?: string;
  status: 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED';
  createdAt: Date;
}
```

## 7. 监控与反馈闭环

### 7.1 质量监控指标
- 内容错误率（目标 < 0.1%）
- 用户反馈满意度（目标 > 4.5/5）
- 来源可靠性评分变化
- 重复内容检测率（目标 > 99%）
- 审核队列处理时间（目标 < 2 小时）

### 7.2 持续优化机制
1. 收集用户反馈
2. 分析错误案例
3. 优化评分算法
4. 更新来源列表
5. 训练去重模型
