---
layout: post
title: Awesome Hexo Plugin
abbrlink: 52483
date: 2022-03-27 21:45:17
tags:
  - Hexo
categories:
  - Blog
  - Hexo
---

About my blog use hexo plugin

## hexo-hide-posts

[hexo-hide-posts](https://github.com/prinsss/hexo-hide-posts) is A plugin to hide specific posts from your Hexo blog and make them only accessible by links

### Installation

``` bash
$ npm install hexo-hide-posts --save
```

Usage

Add `hidden: true` to the [front-matter](https://hexo.io/docs/front-matter) of posts which you want to hide.

e.g. Edit `source/_posts/lorem-ipsum.md`:

```text
---
layout: post
title: 'Lorem Ipsum'
date: '2019/8/10 11:45:14'
hidden: true
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

This post will not be shown anywhere, but you can still access it by `https://hexo.test/lorem-ipsum/`. (If you want to completely prevent a post from rendering, just set it as a [draft](https://hexo.io/docs/writing.html#Drafts).)

To get a list of hidden posts, you can run `hexo hidden:list` from command line.

For developers, `all_posts` and `hidden_posts` added to [Local Variables](https://hexo.io/api/locals) may be useful.

### Config

In your site's `_config.yml`:

```yml
# hexo-hide-posts
hide_posts:
  enable: true
  # Change the filter name to fit your need
  filter: hidden
  # Generators which you want to expose all posts (include hidden ones) to.
  # Common generators: index, tag, category, archive, sitemap, feed, etc.
  public_generators: []
  # Add "noindex" meta tag to prevent hidden posts from being indexed by search engines
  noindex: true
```


## hexo-generator-restful

[hexo-generator-restful](https://github.com/yscoder/hexo-generator-restful) is generate restful json data for Hexo plugins.

### Install

```bash
npm install hexo-generator-restful --save
```

### Config

以下为默认配置，属性值为 `false` 表示不生成。

```yml
restful:
  # site 可配置为数组选择性生成某些属性
  # site: ['title', 'subtitle', 'description', 'author', 'since', email', 'favicon', 'avatar']
  site: true        # hexo.config mix theme.config
  posts_size: 10    # 文章列表分页，0 表示不分页
  posts_props:      # 文章列表项的需要生成的属性
    title: true
    slug: true
    date: true
    updated: true
    comments: true
    path: true
    excerpt: false
    cover: true      # 封面图，取文章第一张图片
    content: false
    keywords: false
    categories: true
    tags: true
  categories: true         # 分类数据
  use_category_slug: false # Use slug for filename of category data
  tags: true               # 标签数据
  use_tag_slug: false      # Use slug for filename of tag data
  post: true               # 文章数据
  pages: false             # 额外的 Hexo 页面数据, 如 About
```

### Get Hexo Config

获取所有 Hexo 配置（站点配置和主题配置）。

> Request

```
GET /api/site.json
```

> Response

[/api/site.json](https://samzong.me/api/site.json)

### Get Posts

如果配置 `posts_size: 0` 则不分页，以下请求会获取全部文章。

> Request

```
GET /api/posts.json
```

> Response

示例为分页配置下的数据，会包含分页属性 `total`、`pageSize`、`pageCount`，不分页的数据不包含这三项。

[/api/posts.json](https://samzong.me/api/posts.json)