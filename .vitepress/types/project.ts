export interface Project {
  name: string
  description: string
  github: string
  website?: string
  logo?: string
  tags: string[]
  createdAt: string // ISO 格式的日期字符串，如：'2024-01-01'
}

export const projects: Project[] = [
  {
    name: 'samzong.github.io',
    description: '个人博客网站，基于 VitePress 构建，支持暗黑模式、全文搜索、标签分类等功能。',
    github: 'https://github.com/samzong/samzong.github.io',
    website: 'https://samzong.me',
    logo: '/logo.png',
    tags: ['Vue3', 'VitePress', 'Blog'],
    createdAt: '2024-01-01',
  },
  {
    name: 'OpenAI Translator',
    description: '基于 OpenAI API 的智能翻译工具，支持多语言互译、文本润色、语法纠正等功能。',
    github: 'https://github.com/samzong/openai-translator',
    website: 'https://translator.samzong.me',
    tags: ['TypeScript', 'OpenAI', 'React', 'API'],
    createdAt: '2023-12-01',
  },
  {
    name: 'Docker Compose Hub',
    description: '收集和维护常用服务的 Docker Compose 配置，包含数据库、缓存、消息队列等基础服务。',
    github: 'https://github.com/samzong/docker-compose-hub',
    tags: ['Docker', 'DevOps', 'Infrastructure'],
    createdAt: '2023-06-15',
  },
  {
    name: 'Kubernetes Tools',
    description: '一组用于简化 Kubernetes 日常运维工作的工具集，包含日志收集、监控报警、配置管理等功能。',
    github: 'https://github.com/samzong/k8s-tools',
    tags: ['Kubernetes', 'Go', 'CLI', 'DevOps'],
    createdAt: '2023-09-20',
  }
] 