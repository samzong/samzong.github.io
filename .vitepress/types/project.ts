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
] 