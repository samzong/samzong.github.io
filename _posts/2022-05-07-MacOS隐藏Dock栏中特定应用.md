---
layout: post
title: MacOS隐藏Dock栏中特定应用
toc: true
tags:
  - Mac
abbrlink: 5984
date: 2022-05-07 14:57:54
categories:
---



## 背景说明

MacOS Dock 栏的空间是有限的，而且绝大部分应用都会占用一个 Dock 的槽位；但并不是所有软件都提供了 `Hidden  in Dock` 的能力，所以从来不点击，但一直存在，挺痛苦的。

<p style="color:red;font-size=16px">为不具备隐藏 Dock Icon 的应用附加隐藏能力</p>

> 符合这类特征的软件： a. 常驻应用，开机自启动，基本不会打开； b. 像我这样的 Alfred 爱好者

之前了解到一些软件对系统的影响都比较大，基本上都是要接管 整个`Dock`，要关闭 `SIP`，使用成本太好，基本不值得采用。

## 全球同性交友网站

下午在闲逛的时候，发现了这个仓库： https://github.com/FirePanther/MacOS-Hide-Dock-Icon ，一个非常简单的 PHP 脚本，貌似可以提供这个能力，于是我就简单的 Download ，按照 README.md 的方法执行了一下。

很神奇的！ 满足了我的需求！ 所以，我在这里记录和分享给大家，如果你也需要的话。

## 操作步骤

> 当然，你也可以直接 从这切换到 官方仓库的 `README.md` 去操作

```sh
# 下载 脚本文件
➜  ~ wget https://raw.githubusercontent.com/FirePanther/MacOS-Hide-Dock-Icon/master/hideDockIcon.php -O hideDockIcon.php

# 备份地址
➜  ~ wget https://raw.githubusercontent.com/SAMZONG/MacOS-Hide-Dock-Icon/master/hideDockIcon.php -O hideDockIcon.php
```

确保你的 Mac 内装有 PHP

```sh
brew install php   # just one command
```

接下就是操作步骤了： 在此之前，你需要完全退出被隐藏的软件**

![image-20220507152104232](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/image-20220507152104232.png?x-oss-process=image/resize,w_960,m_lfit)

下方是脚本的执行过程：

```sh
➜  ~ sudo php hideDockIcon.php
App name: BaiduNetdisk_mac
Cracking app BaiduNetdisk_mac
Info.plist successfully injected
Signing ------
/Applications/BaiduNetdisk_mac.app: replacing existing signature
------

Finished  # 看到这个就是成功了
```

执行成功后，再次打开App，App会先在Dock栏跳动加载，加载完后图标自动消失，但App依旧在运行。

以上，你就成功的隐藏这个需要的软件，经过在测试，脚本的健壮性很好:

支持的 PC : **2022 年 M1 Max MacOS12.3.1**

## 注意事项

### 确认对的 App Name

![image-20220507153226027](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/image-20220507153226027.png?x-oss-process=image/resize,w_960,m_lfit)

### 恢复被隐藏的应用

**首先 >** 还是要退出App，这时Dock栏也不显示了，菜单栏也没有，所以不好使用 `邮件退出的方式`，那么接下来我们要找到下方这个软件：

![image-20220507153525040](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/image-20220507153525040.png?x-oss-process=image/resize,w_960,m_lfit)

打开软件后，等待加载完成，通过搜索窗口利用 App name 找到被隐藏的软件

![image-20220507154000558](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/image-20220507154000558.png?x-oss-process=image/resize,w_960,m_lfit)

然后使用上方的，`X` 关闭按钮，在弹窗中，选择 `Quit`

然后 > 再去执行下 `hideDockIcon.php` 这个脚本: 

```sh
➜  sudo php hideDockIcon.php
Password:
App name: BaiduNetDisk_mac
Cracking app BaiduNetDisk_mac
This app should be invisible in the Dock
Would you like to show it? (y/n) y
Info.plist successfully injected
Signing ------
/Applications/BaiduNetDisk_mac.app: replacing existing signature
------

Finished
```

然后再次启动 App，那么就会出现在 Dock 栏并且不再隐藏

## 结语

没事儿还是要逛逛 Github

