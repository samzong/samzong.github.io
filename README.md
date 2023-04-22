[![build-deploy](https://github.com/SAMZONG/samzong.me/actions/workflows/ci.yml/badge.svg)](https://github.com/SAMZONG/samzong.me/actions/workflows/ci.yml)  [![pages-build-deployment](https://github.com/SAMZONG/samzong.me/actions/workflows/pages/pages-build-deployment/badge.svg?branch=gh-pages)](https://github.com/SAMZONG/samzong.me/actions/workflows/pages/pages-build-deployment)

# 前言

## 使用说明

### 创建新文章

> 新建 Post，Title 可为中文，自动转变成拼音

```bash
rake post title="A Title" [date="2012-02-09"] [tags=[tag1,tag2]] [category="category"]
```

也可以按照格式创建文章，以标题前缀为日期，title,tag,categroy 写在文章内即可，比如搭配 Typora 之类

### 新建页面

```bash
rake page name="about.html"
```

## 运行 Jekyll

- 目录下运行 `make serve`
- 本地浏览地址：[http://localhost:4000](http://localhost:4000)
