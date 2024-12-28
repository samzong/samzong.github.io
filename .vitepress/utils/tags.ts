import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface Post {
  title: string
  date: string
  url: string
  tags: string[]
}

interface TagData {
  [key: string]: Post[]
}

// 格式化日期函数
function formatDate(date: string | Date): string {
  if (typeof date === 'string') {
    // 如果是ISO格式的字符串，先转换为Date对象
    date = new Date(date)
  }
  return date.toISOString().split('T')[0]
}

export function generateTags(): TagData {
  const posts: Post[] = []
  const contentDir = path.resolve(__dirname, '../../blog')
  const tags: TagData = {}
  
  function findMarkdownFiles(dir: string) {
    const files = fs.readdirSync(dir)
    
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory()) {
        findMarkdownFiles(filePath)
      } else if (path.extname(file) === '.md') {
        const content = fs.readFileSync(filePath, 'utf-8')
        const { data } = matter(content)
        
        if (data.tags && Array.isArray(data.tags)) {
          const url = '/' + path.relative(path.resolve(__dirname, '../..'), filePath).replace(/\.md$/, '')
          const post = {
            title: data.title || file.replace(/\.md$/, ''),
            date: formatDate(data.date || stat.birthtime),
            url,
            tags: data.tags
          }
          
          posts.push(post)
          
          data.tags.forEach((tag: string) => {
            if (!tags[tag]) {
              tags[tag] = []
            }
            tags[tag].push(post)
          })
        }
      }
    })
  }
  
  findMarkdownFiles(contentDir)
  
  Object.keys(tags).forEach(tag => {
    tags[tag].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  })
  
  const sortedTags: TagData = {}
  Object.keys(tags).sort().forEach(tag => {
    sortedTags[tag] = tags[tag]
  })
  
  return sortedTags
} 