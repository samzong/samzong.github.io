import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BasePost {
  title: string
  date: string
  url: string
}

export interface FileProcessorOptions {
  contentDir: string
  fileFilter?: (file: string) => boolean
  processFile: (filePath: string, content: string, matter: matter.GrayMatterFile<string>) => any
}

export function walkFiles<T>({ contentDir, fileFilter, processFile }: FileProcessorOptions): T[] {
  const results: T[] = []

  function walk(dir: string) {
    const files = fs.readdirSync(dir)
    
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory()) {
        walk(filePath)
      } else if (path.extname(file) === '.md') {
        if (fileFilter && !fileFilter(file)) {
          return
        }

        const content = fs.readFileSync(filePath, 'utf-8')
        const matterResult = matter(content)
        const result = processFile(filePath, content, matterResult)
        
        if (result) {
          results.push(result)
        }
      }
    })
  }

  walk(contentDir)
  return results
}

// 辅助函数：从文件名中提取日期
export function extractDateFromFilename(filename: string): string | null {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})/)
  return match ? match[1] : null
}

// 辅助函数：格式化日期
export function formatDate(date: string | Date): string {
  if (typeof date === 'string') {
    date = new Date(date)
  }
  return date.toISOString().split('T')[0]
}

// 辅助函数：生成URL
export function generateUrl(filePath: string, baseDir: string): string {
  return '/' + path.relative(path.resolve(baseDir), filePath).replace(/\.md$/, '')
} 