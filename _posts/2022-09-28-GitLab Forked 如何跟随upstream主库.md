---
layout: post
title: GitLab Forked 如何跟随 upstream 主库
tags:
  - Git
category:
  - Git
url: https://www.yuque.com/samzong/code/vfu56m
---

:::info
通过 PR 的方式共同对主仓库进行贡献的方式，是开源项目协作的非常有效的方法；通常我们不会直接对主仓库直接提交代码。
:::

一般情况下，我们的操作是，在需要贡献时，Fork 一份项目，然后自己修改以 PR 的方式提交贡献请求。

![image.png](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1664330743895-9b2e0dc6-527e-4bcd-8b63-c223aa634b8f.png?x-oss-process=image/resize,w_960,m_lfit "一份完整的 Github贡献指南")

## Github 的实现方式

熟悉 Github 的同学会发现，在 Github 上最近更新了 `Sync fork`的功能，通过简单的点击操作，即可完成对源库 (upstream) 的更新同步。
![CleanShot 2022-09-28 at 10.01.33.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1664330528512-563a5536-1734-4fd0-b41c-9c5d121327e0.jpeg?x-oss-process=image/resize,w_960,m_lfit "当 upstream 超前时，提示 update branch")
通过以上方式，我们可以方便在跟随主库的更新

> Tips Github 的方式，仅在 Web 端 和 Github CLI 官方提供的 GH 才可以使用这样的功能

## No Github, When Gitlab ?

Github 更多在开源项目时贡献，实际上，在我们日常的工作当中，更多会有自建的 Gitlab 或者其他的代码 Hub，这里以 Gitlab 为例

![CleanShot 2022-09-28 at 10.19.20.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1664331575915-853554f5-c047-4f14-8e79-67e2214429bc.jpeg?x-oss-process=image/resize,w_960,m_lfit "gitlab 默认项目首页")
Gitlab 并未提供 Sync fork 的功能，所以我们需要自行解决同步的需求

## 为仓库添加 upstream 源仓库

:::success
以下方式会在终端或本地使用`Sourcetree`更加自由，仅使用 Git 的方式协作，自由度很大
:::
基于这个方式我们可以实现，有关联的 主库到从库的同步；也可以完成跨 Hub 的同步，比如：

- Github ->  Gitlab
- Github -> Github
- Gitlab  -> Gitlab
- Gitlab  ->  Github
- Gitee  ->  Gitlab
- Gitee -> Github

```bash
samzonglu at samzongs-MacBook-Pro in ~/Git/daocloud/DaoCloud-docs(main✔)
± git remote add upstream https://github.com/DaoCloud/DaoCloud-docs.git
Alias tip: gra upstream https://github.com/DaoCloud/DaoCloud-docs.git

samzonglu at samzongs-MacBook-Pro in ~/Git/daocloud/DaoCloud-docs(main✔)
± git remote
Alias tip: gr
origin
upstream

samzonglu at samzongs-MacBook-Pro in ~/Git/daocloud/DaoCloud-docs(main✔)
± git fetch upstream
Alias tip: gf upstream
remote: Enumerating objects: 1268, done.
remote: Counting objects: 100% (182/182), done.
remote: Compressing objects: 100% (5/5), done.
remote: Total 1268 (delta 177), reused 182 (delta 177), pack-reused 1086
Receiving objects: 100% (1268/1268), 1.87 MiB | 2.74 MiB/s, done.
Resolving deltas: 100% (637/637), completed with 119 local objects.
From https://github.com/DaoCloud/DaoCloud-docs
 * [new branch]      feature/theme                            -> upstream/feature/theme
 * [new branch]      fix-typo                                 -> upstream/fix-typo
 * [new branch]      gh-pages                                 -> upstream/gh-pages
 * [new branch]      main                                     -> upstream/main
 * [new branch]      patch-new-gh-pages-01                    -> upstream/patch-new-gh-pages-01
 * [new branch]      stash/bug-codes                          -> upstream/stash/bug-codes

samzonglu at samzongs-MacBook-Pro in ~/Git/daocloud/DaoCloud-docs(main✔)
± git pull upstream main
Alias tip: gl upstream main
From https://github.com/DaoCloud/DaoCloud-docs
 * branch            main       -> FETCH_HEAD
Already up to date.

samzonglu at samzongs-MacBook-Pro in ~/Git/daocloud/DaoCloud-docs(main✔)
± git push origin main
Alias tip: gp origin main
Everything up-to-date
```
