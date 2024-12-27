const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Blog directory
const BLOG_DIR = path.join(__dirname, '../blog');
const PAGES_DIR = path.join(__dirname, '../pages');

// Read all blog files
function getBlogFiles() {
  const files = fs.readdirSync(BLOG_DIR);
  return files.filter(file => file.endsWith('.md') && file !== 'index.md');
}

// Parse article info
function parseArticleInfo(fileName) {
  const filePath = path.join(BLOG_DIR, fileName);
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, excerpt, content: articleContent } = matter(content, { excerpt: true });
  
  // Parse date and title from filename
  const match = fileName.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/);
  if (!match) return null;
  
  const [, year, month, day, slug] = match;
  const title = data.title || slug.replace(/-/g, ' ');
  
  // Extract code block languages
  const codeBlockLanguages = (articleContent.match(/```(\w+)/g) || [])
    .map(lang => lang.replace('```', ''))
    .filter(Boolean);
  
  return {
    title,
    date: `${year}-${month}-${day}`,
    link: `/blog/${fileName.replace(/\.md$/, '')}`,
    tags: data.tags || [],
    categories: data.categories || [],
    excerpt: excerpt || '',
    fileName,
    languages: [...new Set(codeBlockLanguages)]
  };
}

// Generate tags page
function generateTagsPage(articles) {
  const tags = {};
  articles.forEach(article => {
    article.tags.forEach(tag => {
      if (!tags[tag]) tags[tag] = [];
      tags[tag].push(article);
    });
  });

  const content = `---
title: Tags
outline: deep
---

# Tags

${Object.entries(tags)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([tag, posts]) => `
## ${tag} (${posts.length})

${posts
  .sort((a, b) => b.date.localeCompare(a.date))
  .map(post => `- [${post.title}](${post.link}) <sub>${post.date}</sub>`)
  .join('\n')}
`).join('\n')}
`;

  fs.writeFileSync(path.join(PAGES_DIR, 'tags.md'), content);
}

// Generate archives page
function generateArchivesPage(articles) {
  const archives = {};
  articles.forEach(article => {
    const year = article.date.substring(0, 4);
    if (!archives[year]) archives[year] = [];
    archives[year].push(article);
  });

  const content = `---
title: Archives
outline: deep
---

# Archives

${Object.entries(archives)
  .sort(([a], [b]) => b.localeCompare(a))
  .map(([year, posts]) => `
## ${year} (${posts.length})

${posts
  .sort((a, b) => b.date.localeCompare(a.date))
  .map(post => `- [${post.title}](${post.link}) <sub>${post.date}</sub>`)
  .join('\n')}
`).join('\n')}
`;

  fs.writeFileSync(path.join(PAGES_DIR, 'archives.md'), content);
}

// Generate categories page
function generateCategoriesPage(articles) {
  const categories = {};
  articles.forEach(article => {
    const category = article.categories[0] || 'Uncategorized';
    if (!categories[category]) categories[category] = [];
    categories[category].push(article);
  });

  const content = `---
title: Categories
outline: deep
---

# Categories

${Object.entries(categories)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([category, posts]) => `
## ${category} (${posts.length})

${posts
  .sort((a, b) => b.date.localeCompare(a.date))
  .map(post => `- [${post.title}](${post.link}) <sub>${post.date}</sub>`)
  .join('\n')}
`).join('\n')}
`;

  fs.writeFileSync(path.join(PAGES_DIR, 'categories.md'), content);
}

// Generate blog index
function generateBlogIndex(articles) {
  const content = `---
title: Blog
outline: deep
---

# Blog Posts

## Latest Posts

${articles
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 10)
  .map(article => `- [${article.title}](${article.link}) <sub>${article.date}</sub>`)
  .join('\n')}

## Statistics

- Total Posts: ${articles.length}
- First Post: ${articles.sort((a, b) => a.date.localeCompare(b.date))[0].date}
- Latest Post: ${articles.sort((a, b) => b.date.localeCompare(a.date))[0].date}

::: tip
[View All Posts](/pages/archives) | [Browse by Tags](/pages/tags) | [Browse by Categories](/pages/categories)
:::
`;

  fs.writeFileSync(path.join(BLOG_DIR, 'index.md'), content);
}

// Main function
async function generate() {
  // Create necessary directories
  if (!fs.existsSync(PAGES_DIR)) {
    fs.mkdirSync(PAGES_DIR, { recursive: true });
  }

  const files = getBlogFiles();
  const articles = files
    .map(parseArticleInfo)
    .filter(Boolean);

  console.log(`Processing ${articles.length} articles`);

  // Generate pages
  generateTagsPage(articles);
  generateArchivesPage(articles);
  generateCategoriesPage(articles);
  generateBlogIndex(articles);

  console.log('Pages generated successfully!');
}

generate(); 