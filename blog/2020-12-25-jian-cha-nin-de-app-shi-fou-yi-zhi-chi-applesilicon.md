---
title: 检查您的 App 是否已支持 AppleSilicon
tags: []
---

<!-- ![image](assets/check-you-favorites-app-is-ready-on-applesilicon)这里带来 2 个网站，方便大家来检查您所使用和关注的 App 是否已经支持了最新的 Apple M1 芯片 -->

> **目前支持的形式有：**

- 已原生支持
- 使用 Rosetta 2 支持运行的 适配 Intel 引用
- 完全不支持 (包括崩溃、无法启动等各种症状)

## 网友整理 Games on Apple Sillicon

<https://docs.google.com/spreadsheets/d/1er-NivvuIheDmIKBVRu3S_BzA_lZT5z3Z-CxQZ-uPVs/>

> 目前已补充了 App 清单

***

## <https://isapplesiliconready.com/>

![image](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/2020-11-24-142803.png?x-oss-process=image/resize,w_960,m_lfit)

如果你有希望给关注的软件，可以提交给站点维护者，点击页面右上角的 `REQUEST AN APP`

> <https://isapplesiliconready.com/request/>

***

## <https://doesitarm.com/>

![image](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/2020-11-24-143231.png?x-oss-process=image/resize,w_960,m_lfit)

如果你想要关注某一个软件的适配进度，可以在  `Tell me with this changes`输入你的邮箱，这样当软件有适配变更时，会第一时间邮件通知你

![image](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/2020-11-24-143450.png?x-oss-process=image/resize,w_960,m_lfit)

## 如何在命令行使用 `rosseta 2`

`arch -x86_64` 后面追加你需要执行的命令，注意每一个都需要哦

```bash
# 安装 Homebrew
arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"


# brew update 
arch -86_64 brew update


# 安装 htop
arch -x86_64 brew install htop


# 安装 cask app
arch -x86_64 brew cask install virtualbox
```
