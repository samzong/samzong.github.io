---
layout: post
title: MacTips 调整Launchpad图标大小
tags: 
    - Mac
categories: 
    - Mac
abbrlink: 6375
date: 2016-04-09 05:46:04
---

很多人觉得默认Launchpad的应用程序图标很大，空间比较拥挤，不过这个其实是可以通过调整Launchpad每一行和每一列图标的数量，来调整Launchpad图标大小。

默认如下图：
![](http://samzong.oss-cn-shenzhen.aliyuncs.com/2016%2F04%2FQQ20160408-1.jpg)

代码块：

```
# 调整每一行显示数量为8个。
➜ defaults write com.apple.dock springboard-columns -int 10

＃ 重启Launchpad
➜ defaults write com.apple.dock ResetLaunchPad -bool TRUE;killall Dock
```

修改后如下：
![](http://samzong.oss-cn-shenzhen.aliyuncs.com/2016%2F04%2FQQ20160408-2.jpg)
