import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface Post {
  title: string
  date: string
  url: string
}

interface ArchiveData {
  [year: string]: Post[]
}

// 从文件名中提取日期
function extractDateFromFilename(filename: string): string | null {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})/)
  return match ? match[1] : null
}

export function generateArchives(): ArchiveData {
  const posts: Post[] = []
  const contentDir = path.resolve(__dirname, '../../blog')
  
  function findMarkdownFiles(dir: string) {
    const files = fs.readdirSync(dir)
    
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory()) {
        findMarkdownFiles(filePath)
      } else if (path.extname(file) === '.md') {
        // 从文件名中提取日期
        const dateFromFilename = extractDateFromFilename(file)
        
        // 如果文件名没有日期前缀，跳过这个文件
        if (!dateFromFilename) return
        
        const content = fs.readFileSync(filePath, 'utf-8')
        const { data } = matter(content)
        const url = '/' + path.relative(path.resolve(__dirname, '../..'), filePath).replace(/\.md$/, '')
        
        const post = {
          title: data.title || file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, ''),
          date: dateFromFilename,
          url
        }
        
        posts.push(post)
      }
    })
  }
  
  findMarkdownFiles(contentDir)
  
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