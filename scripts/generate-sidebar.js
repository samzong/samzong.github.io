const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 博客文章目录
const BLOG_DIR = path.join(__dirname, '../blog');
const CONFIG_FILE = path.join(__dirname, '../.vitepress/config.mts');

// 读取所有博客文件
function getBlogFiles() {
  const files = fs.readdirSync(BLOG_DIR);
  const mdFiles = files.filter(file => file.endsWith('.md') && file !== 'index.md');
  console.log('找到的 Markdown 文件：', mdFiles.length);
  return mdFiles;
}

// 解析文章信息
function parseArticleInfo(fileName) {
  const filePath = path.join(BLOG_DIR, fileName);
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(content);
  
  // 从文件名解析日期和标题
  const match = fileName.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/);
  if (!match) {
    console.log('文件名格式不匹配：', fileName);
    // 尝试提取年份
    const yearMatch = fileName.match(/^(\d{4})/);
    if (!yearMatch) {
      console.log('无法提取年份：', fileName);
      return null;
    }
    const year = yearMatch[1];
    const title = data.title || fileName.replace(/\.md$/, '').replace(/-/g, ' ');
    return {
      title,
      date: `${year}-01-01`,
      link: fileName.replace(/\.md$/, ''),
      tags: data.tags || []
    };
  }
  
  const [, year, month, day, slug] = match;
  const title = data.title || slug.replace(/-/g, ' ');
  
  return {
    title,
    date: `${year}-${month}-${day}`,
    link: fileName.replace(/\.md$/, ''),
    tags: data.tags || []
  };
}

// 生成侧边栏配置
function generateSidebar() {
  const files = getBlogFiles();
  const articles = files
    .map(parseArticleInfo)
    .filter(Boolean);
  
  console.log('解析成功的文章数：', articles.length);
  
  // 按年份分组
  const groupedArticles = articles.reduce((acc, article) => {
    const year = article.date.substring(0, 4);
    if (!acc[year]) acc[year] = [];
    acc[year].push(article);
    return acc;
  }, {});

  // 生成配置
  const sidebarConfig = Object.entries(groupedArticles)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([year, items]) => {
      // 对每年的文章按日期排序
      items.sort((a, b) => b.date.localeCompare(a.date));
      return {
        text: year + '年',
        collapsed: year !== new Date().getFullYear().toString(), // 当前年份默认展开
        items: items.map(item => ({
          text: item.title,
          link: item.link
        }))
      };
    });

  console.log('生成的年份分组：', Object.keys(groupedArticles));
  return sidebarConfig;
}

// 更新配置文件
function updateConfig() {
  const sidebar = generateSidebar();
  let configContent = fs.readFileSync(CONFIG_FILE, 'utf-8');
  
  // 构建新的 sidebar 配置
  const sidebarConfig = `sidebar: {
      '/blog/': {
        base: '/blog/',
        items: ${JSON.stringify(sidebar, null, 2)}
      }
    },`;

  // 使用新的正则表达式
  configContent = configContent.replace(
    /(sidebar:\s*{[\s\S]*?}),\s*\n\s*socialLinks/,
    `${sidebarConfig}\n\n    socialLinks`
  );

  fs.writeFileSync(CONFIG_FILE, configContent, 'utf-8');
  console.log('侧边栏配置更新成功！');
}

updateConfig(); 