import { generateArchives } from '../../utils/archives'

interface Post {
  title: string
  date: string
  url: string
}

interface BlogData {
  latestPosts: Post[]
  statistics: {
    totalPosts: number
    totalYears: number
  }
  yearGroups: {
    text: string
    items: { text: string, link: string }[]
  }[]
}

export default {
  watch: ['blog/**/*.md'],
  load(): BlogData {
    const archives = generateArchives()
    const years = Object.keys(archives)
      .map(Number)
      .sort((a, b) => b - a)
      .map(String)
    
    // 获取最新的10篇文章
    const latestPosts = years.reduce<Post[]>((posts, year) => {
      return [...posts, ...archives[year]]
    }, []).slice(0, 10)
    
    // 生成统计信息
    const statistics = {
      totalPosts: Object.values(archives).reduce((sum, posts) => sum + posts.length, 0),
      totalYears: years.length
    }
    
    // 生成年份分组
    const yearGroups = years.map(year => ({
      text: year,
      items: archives[year].map(post => ({
        text: post.title,
        link: post.url
      }))
    }))
    
    return {
      latestPosts,
      statistics,
      yearGroups
    }
  }
} 