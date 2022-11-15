---
layout: post
title: MacTips 解决 oh-my-zsh 在 Terminal 下打开缓慢
tags: 
    - Mac
categories: 
    - Mac
abbrlink: 39409
date: 2016-04-08 16:12:30
---

升级Mac OS X 10.11 之后，使用CleanMyMac 3清理9GB的垃圾文件，之后导致打开iTerm时加载主机名特别的慢，Mac的命令行工具我使用的是iTerm＋ohmyzsh，这个问题困扰了我快两个月，工作比较忙，所以一直用Zoc 代替，也没有认真的研究，最近有需求用到它，实在不行，研究一下，发现，是因为我清理系统的时候把终端日志的索引文件清理掉了，所以每次打开的时候都要先加载索引导致了首次开启非常慢，解决办法是，只要把终端缓存的日志文件删除即可：

代码块：

```
# 日志文件路径
# /private/var/log/asl/*.asl

➜  ~ sudo du -sh /private/var/log/asl/
Password:
2.7G	/private/var/log/asl/

➜  ~ sudo rm -rf /private/var/log/asl/*.asl
➜  ~ sudo du -sh /private/var/log/asl/
208M	/private/var/log/asl/

```

关闭终端，再次打开，问题解决。
