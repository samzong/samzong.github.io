---
layout: post
title: GitHub Pages 的妙用
toc: true
author: samzong.lu
author_id: defaultAuthorId
language: en
tags:
  - Github
categories:
  - Blog
  - Github
abbrlink: 17290
date: 2022-04-22 17:23:00
---

## 本来是想好好工作的

最近换了新工作（后面找个时间好好说说），大量接触 k8s & docker，开始写了比较多的 yaml 和 Dockerfile；散落在电脑上的话，还是很不方便，有个仓库管理起来的话，就会很方便了，于是有了这个项目 [samzong/k8s-yaml](https://github.com/SAMZONG/k8s-yaml) 

k8s-yaml 一开始的定义就是 public ，希望给更多其他的人提供帮助，索性就再增加了一个网页吧


## 一分钟快速搭建网站

```sh
git branch gh-pages
echo "## Hello gh-pages" > index.md
git push origin gh-pages
```

eeen.... 这样就 ok ！

`gh-pages` 是每个 GitHub 仓库的默认 github pages 分支，当你创建这个分支并推动到 GitHub 时，会自动触发 Pages 的构建任务，大约30s 左右，你就会得到一个网站 

> http://[github_username].github.io/[github_repo_name]


## 简单的配置

![X4tbDt](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/X4tbDt.png?x-oss-process=image/resize,w_960,m_lfit)

上图简单指引了如何打开 GitHub Pages 的配置路径，下面对主要的几个模块进行说明:

1. Source  - 指定的 以那个分支作为 built 源和文件夹，默认是 gh-pages, 建议不动，统一认知
2. Theme Chooser - 选择对应的博客主题，大概有 10 个，都比较普通，根据自己喜好来，可以自定义，这里不展开 (Google Jekyll themes 一大堆
3. Custom Domain - 可以指定默认的特定的域名，需要配置 `/CNAME`，需要和这里的域名一致，同时域名解析需要配置好 CNAME
4. Enforce HTTPS - 启用 HTTPS，默认不启动，建议启用


> CNAME 配置，将指定的域名指向到 `[github_username].github.io`


经过简单的配置，这个仓库的网站，已经完成了你想要的； 在 `index.md` 内修改为你想要的内容。


## 高级功能：结合 GitHub issue 的评论功能

这里采用的 评论组件是 [utterances](https://utteranc.es/), 提供轻量级的博客评论功能，并且评论是直接创建 GitHub issue，方便管理

这里不赘述安装细节的，比较简单，直接去看下面几个网站即可

- https://utteranc.es/
- https://roife.github.io/2021/02/12/use-utterances-for-comment/
- https://www.evanlin.com/jekyll-remove-disqus/

> 注意需要增加的文件

```md
mkdir _layouts
wget https://raw.githubusercontent.com/SAMZONG/k8s-yaml/gh-pages/_layouts/post.html -o _layouts/post.html
```

index.md 增加 layout 参数，追加在最顶部

```md
---
layout: post
---
```

```sh
git add _layouts/post.html
git add index.md

git commit -m "add comment module with utterances"
git push origin gh-pages
```

## End

以上就是全部的部署内容了，可以去看下我的网站和项目

- https://k8s-yaml.samzong.me


如果你觉得喜欢，求 fork，求 star