---
title: GitLab Forked 如何跟随 upstream 主库
tags: [Git, GitLab, GitHub]
categories: [开发工具]
---

# GitLab Forked 如何跟随 upstream 主库

::: tip 提示
通过 PR (Pull Request) 的方式共同对主仓库进行贡献，是开源项目协作的非常有效的方法。通常我们不会直接对主仓库直接提交代码。
:::

## 基本概念

一般情况下，我们的操作流程是：
1. Fork 一份项目到自己的仓库
2. 在自己的仓库中修改代码
3. 通过 PR 的方式提交贡献请求

![一份完整的 Github贡献指南](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1664330743895-9b2e0dc6-527e-4bcd-8b63-c223aa634b8f.png?x-oss-process=image/resize,w_960,m_lfit)

## GitHub 的实现方式

GitHub 最近更新了 `Sync fork` 功能，通过简单的点击操作，即可完成对源库 (upstream) 的更新同步。

![当 upstream 超前时，提示 update branch](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1664330528512-563a5536-1734-4fd0-b41c-9c5d121327e0.jpeg?x-oss-process=image/resize,w_960,m_lfit)

::: warning 注意
GitHub 的这种同步方式仅在以下场景可用：
- Web 端操作
- GitHub CLI 官方提供的 gh 命令行工具
:::

## GitLab 的解决方案

与 GitHub 不同，GitLab 并未提供 Sync fork 的功能，我们需要自行解决同步的需求。

![gitlab 默认项目首页](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1664331575915-853554f5-c047-4f14-8e79-67e2214429bc.jpeg?x-oss-process=image/resize,w_960,m_lfit)

## 手动添加 upstream 源仓库

::: tip 优势
通过终端或本地使用 `Sourcetree` 的方式更加灵活，可以实现：

- Github → Gitlab
- Github → Github
- Gitlab → Gitlab
- Gitlab → Github
- Gitee → Gitlab
- Gitee → Github
:::

### 操作步骤

```bash
# 1. 添加上游仓库
git remote add upstream https://github.com/DaoCloud/DaoCloud-docs.git

# 2. 查看远程仓库列表
git remote
# 输出：
# origin
# upstream

# 3. 获取上游仓库更新
git fetch upstream

# 4. 合并上游主分支
git pull upstream main

# 5. 推送到自己的仓库
git push origin main
```

::: info 说明
以上命令中的仓库地址和分支名称请根据实际情况替换。
:::
