import path from 'path'
import { BasePost, walkFiles, extractDateFromFilename } from './fileWalker'

interface Post extends BasePost {}

interface ArchiveData {
  [year: string]: Post[]
}

export function generateArchives(): ArchiveData {
  const contentDir = path.resolve(__dirname, '../../blog')
  
  const posts = walkFiles<Post>({
    contentDir,
    fileFilter: (file) => !!extractDateFromFilename(file),
    processFile: (filePath, content, { data }) => {
      const dateFromFilename = extractDateFromFilename(path.basename(filePath))
      if (!dateFromFilename) return null

      return {
        title: data.title || path.basename(filePath).replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, ''),
        date: dateFromFilename,
        url: '/' + path.relative(path.resolve(__dirname, '../..'), filePath).replace(/\.md$/, '')
      }
    }
  })

  // 按日期排序（从新到旧）
  posts.sort((a, b) => b.date.localeCompare(a.date))
  
  // 使用 Map 来保持年份顺序
  const archivesMap = new Map<string, Post[]>()
  
  // 先收集所有年份并排序
  const years = Array.from(new Set(posts.map(post => post.date.split('-')[0])))
  years.sort((a, b) => Number(b) - Number(a))
  
  // 按排序后的年份初始化 Map
  years.forEach(year => {
    archivesMap.set(year, [])
  })
  
  // 将文章分配到对应年份
  posts.forEach(post => {
    const year = post.date.split('-')[0]
    archivesMap.get(year)?.push(post)
  })
  
  // 转换 Map 为普通对象
  const archives: ArchiveData = {}
  archivesMap.forEach((posts, year) => {
    archives[year] = posts
  })
  
  return archives
} 