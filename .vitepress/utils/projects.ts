import fs from 'fs'
import path from 'path'
import { projects } from '../types/project'

interface SidebarConfig {
  text: string
  items: {
    text: string
    link: string
  }[]
}

export function generateProjectsSidebar(): SidebarConfig {
  // 从 projects 数组生成侧边栏配置
  const sidebarConfig: SidebarConfig = {
    text: 'Projects',
    items: projects.map(project => ({
      text: project.name,
      link: project.docPath
    }))
  }

  // 将配置写入 sidebar.json 文件
  const sidebarPath = path.resolve(__dirname, '../../projects/sidebar.json')
  fs.writeFileSync(sidebarPath, JSON.stringify(sidebarConfig, null, 2))

  return sidebarConfig
}

// 在构建时自动生成侧边栏配置
generateProjectsSidebar() 