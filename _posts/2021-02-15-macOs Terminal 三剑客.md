---
layout: post
title: macOs Terminal 三剑客
tags:
  - Mac
category:
  - Mac
url: https://www.yuque.com/samzong/ap/aof3re
---


### 安装 Homebrew

MacOS 首先需要安装下基础依赖：

    xcode-select —-install

执行完成上一步之后，接下来就可以安装 Homebrew

    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

### 增加 Homebrew 安装图形化软件库

    brew tap caskroom/cask

安装 iTerm 2，当然也可以用来安装其他很多软件

    brew cask install iterm2

### 安装 Zsh

首先使用 homebrew 安装新版本的 zsh，Mac 自带了 zsh 但是使用体验不好

    brew install zsh

Mac 的默认 shell 还是 bash，所以需要将其修改为 zsh

    chsh -s /usr/local/bin/zsh

### 安装 oh-my-zsh

执行以下命令即可，耐心等待

    sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

### 结语

iTerm 是一个非常优秀和方便的终端工具，可以实现非常多的功能，配合 Google Search 可以发掘出非常多的用法

Ohmyzsh 是增加 Mac 终端的丰富的指令，有很多优秀的功能等等

Homebrew 是 MacOS 是一个强大的命令行软件管理工具，可以做到很多图形化应用不一定能实现的功能
