[![build-deploy](https://github.com/SAMZONG/samzong.me/actions/workflows/deploy.yaml/badge.svg)](https://github.com/SAMZONG/samzong.me/actions/workflows/deploy.yaml)

## 简介

- 本博客基于 [VitePress](https://vitepress.dev/) 构建，使用 [GitHub Pages](https://pages.github.com/) 托管
- VitePress 是一个基于 Vue 和 Vite 的静态网站生成器，性能出色且配置简单
- 推荐使用 [yarn](https://yarnpkg.com/) 作为包管理工具
- 推荐使用 Node.js 18.0.0 及以上版本（当前使用 Node.js 20.x）

## 本地开发

```bash
# 克隆项目
git clone https://github.com/samzong/samzong.github.io.git

# 进入项目目录
cd samzong.github.io

# 安装依赖
yarn install

# 启动开发服务器
yarn dev
```

## 构建部署

```bash
# 构建静态文件
yarn build

# 本地预览构建结果
yarn preview
```

## 技术栈

- [VitePress](https://vitepress.dev/) - Vue 驱动的静态网站生成器
- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
