---
title: Git 使用规范流程
tags: [Git]
---

团队开发中，遵循一个合理、清晰的 Git 使用流程，是非常重要的。否则，每个人都提交一堆杂乱无章的 commit，项目很快就会变得难以协调和维护。下图是比较常规的 Git 使用规范流程，这能适合绝大多数团队开发的需求，推荐你们也这样使用。

![image](images/50_e93a61b6.png)

## 1.  分支管理

![image](images/50_abc471a7.jpg)

1. 主分支 Master：首先，代码库应该有一个、且仅有一个主分支。所有提供给用户使用的正式版本，都在这个主分支上发布。

2. 开发分支 Develop：主分支只用来分布重大版本，日常开发应该在另一条分支上完成。我们把开发用的分支，叫做 Develop。

3. 临时性分支

   1. 功能分支 : 为了开发某种特定功能，从 Develop 分支上面分出来的。开发完成后，要再并入 Develop，功能分支的名字，可以采用 feature-*的形式命名。

   2. 预发布分支 : 指发布正式版本之前（即合并到 Master 分支之前），我们可能需要有一个预发布的版本进行测试，预发布分支是从 Develop 分支上面分出来的，预发布结束以后，必须合并进 Develop 和 Master 分支。它的命名，可以采用 release-*的形式。

   3. 修补 bug 分支：软件正式发布以后，难免会出现 bug。这时就需要创建一个分支，进行 bug 修补。修补 bug 分支是从 Master 分支上面分出来的。修补结束以后，再合并进 Master 和 Develop 分支。它的命名，可以采用 fixbug-*的形式

​

## 2. 新建分支

Master 分支不允许进行开发，所有的开发相关操作都必须基于 develop 分支。

```bash
# 获取主分支最新代码
git chekcout master

# 新建develop分支进行开发
git checkout -b develop
```

## 3. 提交分支

分支修改后，使用 commit 提交修改。

```bash
# add 所有新增的文件
git add --all

# 提交更新， 每次提交必须写增加的东西和修改内容，保证协同开发是其他看到代码就能知道你做了什么
gti commit -m "first commit"
```

## 4. 推送到远程仓库

commit 之后，其实代码还在本地仓库，这时我们需要将本地版本与 git 远端仓库进行同步

```bash
# 推送到远程develop分支
git push origin develop
```

## 5. 合并分支

当代码提交到远端 develop 分支后，应该让别人进行代码 review 和测试，确认无误后，合并到 Master 分支，完成开发。
