# samzong.github.io

这是我的个人博客网站项目，基于 VitePress 构建。本文档将详细介绍项目的架构、特性和使用方法。

## 项目特性

- 基于 VitePress 构建的静态网站
- 支持暗黑模式主题切换
- 全文搜索功能
- 文章标签分类系统
- 自动生成文章归档
- 响应式设计，支持移动端访问
- 集成了 GitHub Actions 自动部署

## 技术栈

- Vue 3
- VitePress
- TypeScript
- Markdown

## 本地开发

```bash
# 克隆项目
git clone https://github.com/samzong/samzong.github.io.git

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 项目结构

```
.
├── .vitepress/        # VitePress 配置目录
├── blog/             # 博客文章目录
├── projects/         # 项目文档目录
├── public/           # 静态资源目录
└── package.json
```

## 部署

项目使用 GitHub Actions 自动部署到 GitHub Pages。每次推送到 main 分支时会自动触发构建和部署。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License 