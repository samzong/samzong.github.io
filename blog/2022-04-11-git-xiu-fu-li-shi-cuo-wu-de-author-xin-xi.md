---
title: Git 修复历史错误的 Author 信息
toc: true
tags: [Git]
date: 2022-04-11 08:19:00
---

## git author 的作用

一般情况下 git 仓库，都是通过 author 中的 `user.email` 的判定提交者的身份；而这个配置一般在新电脑上需要初始化配置，否则还是容易出错。

- 个人软件仓库使用了公司的 author 信息 [信息泄漏的风险]
- 和其他开发者使用了相同的 author 信息 [影响 commit 追踪]

## ✅ 修改为正确的 author 信息

> 注意修改全局需要增加 `--global` 参数

```bash
// 修改系统默认（影响全部项目）谨慎使用
git config --global user.name "samzong"
git config --global user.email "samzong.lu@gmail.com"

// 修改单个项目
git config user.name "samzong"
git config user.email "samzong.lu@gmail.com"
```

但是，通过以上的变更后，仅对后续的操作生效；所以这样可以帮助你回到正确的轨道上，但无法解决历史遗留的错误问题！

下面我将演示如何解决这个问题

## 修订最近一次提交 (--amend)

`git commit` 提供了 --amend 的参数，作用是对 commit 进行修正，如果你是最近一次提交出错，那么可以直接使用下方命令完成补救。

```bash
# 📢 注意替换 user.name & user.email 为正确的选项
git commit --amend --author="{user.name} <{user.email}>"
```

以上变更完成后，你会发现最近一次的提交被修正成功了，可以使用 `git log -1` 来对比前后的 author 信息的变更；确认无误后，将你的修改推送到目标仓库中即可；

> 如果修改后的结果不满意，是可以再次修订

## 修改更早之前的提交 (谨慎使用)

写在前面的话，如果你知道 rebase 的作用，请谨慎使用的同时记住，可以在任何过程中终止你的操作，这非常重要，使用如下命令

```bash
git rebase --abort
```

如果需要修改更早之前的提交，那就需要结合 `git rebase` 的能力，来实现了

> rebase 是个危险的操作，其产生的风险也就是目前我们要做的修改历史；**仅建议在测试项目或者个人项目中使用，涉及到多人协作的开源、商业化项目谨慎使用**

```bash
## 使用 git log 找到你想要修改的提交
git log
```

```bash
commit 145a3eb180c3f45fd99c2d61cad6439177cbc319
authors: [samzong] <samzong.lu@gmail.com>
Date:   Sun Mar 20 22:22:58 2022 +0800

commit 7e04c7ebaf06b2eea1951a29b79a571090cd1d8b  {commit_id}
authors: [samzong] <samzong.lu@gmail.com>
Date:   Sun Mar 20 22:19:48 2022 +0800
```

找到你想要更新的 commit_id, 然后使用 rebase 命令来进行处理

```bash
git rebase -i {commit_id}
```

然后继续使用 `git commit --amend` 来修改 author 信息，可以增加 --no-edit 来提效，表示无需弹出修改 commit info 的窗口

```bash
git commit --amend --author="{user.name} <{user.email}>"
```

最后使用 `git rebase --coutine` 继续完成剩余的提交

## 更高级做法 `filter-branch`

`filter-branch` 虽然被官方推荐，但也不是可以轻易使用的工具；本次的目的只是修改 author 中邮箱，所以一定要加上 `--commit-filter`，官方的脚本实例我直接 copy 在下方了

```bash
git filter-branch --commit-filter '
        if [ "$GIT_AUTHOR_EMAIL" = "schacon@localhost" ];
        then
                GIT_AUTHOR_NAME="Scott Chacon";
                GIT_AUTHOR_EMAIL="schacon@example.com";
                git commit-tree "$@";
        else
                git commit-tree "$@";
        fi' HEAD
```

## push 到 repo 的注意事项

注意以上的消息会导致提交包含了“它们父提交的 SHA-1 校验”和“这个命令修改历史中的每一个提交的 SHA-1 校验”，再加上修改后的 author 信息，所以在 push 时会遇到警告，可以使用下方命令强制提交

```bash
git push --force origin {branch_name}
```

在多人协作的场景可能会出现覆盖他人代码的情况，请注意协商并 fetch 分支的变更，确保最新状态
