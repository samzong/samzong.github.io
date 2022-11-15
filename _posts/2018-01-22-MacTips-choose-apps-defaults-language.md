---
layout: post
title: MacTips 单独设置程序语言
tags: 
    - Mac
categories: 
    - Mac
abbrlink: 16591
---

Mac 上系统语言设置成英文查看起来是最舒适的，所以我很早就将系统语言改成英文，但是在自身英语水平有限，应对基本的单词没有问题，但是在查看例如Word、PowerPoint这类应用时，有大量的选项大脑转化速度较慢，影响工作效率，所以有时在做PPT时，不得已要将系统切换到中文，这对我来说是一件很麻烦的事情，但是今天在网上找到一个帖子[原文](http://www.viblue.com/wiki/469264501.html)，其实一个命令就可以搞定我的问题，修改某一软件的默认语言。

##### Command

```
defaults write '{AppName}' AppleLanguages '("Your choose language")'
```

这不会影响到我们其他软件的使用。



##### Tips:

我在一次切换Outlook语言时使用上面的命令不能生效，经过研究稍微改造了一下命令：

```
defaults write com.microsoft.Outlook AppleLanguages -array zh
```



##### 例子

1. 修改Microsoft Office Applocation.

```
defaults write com.microsoft.Word AppleLanguages '("zh-CN")'
```

```
defaults write com.microsoft.Excel AppleLanguages '("zh-CN")'
```

```
defaults write com.microsoft.Powerpoint AppleLanguages '("zh-CN")'
```



2. Mac 自带地图应

Mac 自带地图非常的好用，但是中文会更适合我们的查看和标记

```
defaults write com.apple.Maps AppleLanguages '("zh-CN")'
```

> Tip：如果不知道程序名称时，可以在`com.`使用三次`Tab`键来查找程序名称.



#####  结语

如上操作，仅适合本身支持中英文的应用程序，如果程序本身不带有中文或者英文是无法使用的，当然有些应用也内置了语言切换按钮，可以优先使用程序自带的设置选项。


#####  去除设置

ok，在我们增加了特定程序语言环境之后，如果手动切换系统语言之后，已设置的程序语言环境仍保留我们的手动设置情境，如若不需要，可以采用以下命令去除。
```
defaults delete '{AppName}' AppleLanguages
```


* 参考链接：http://www.viblue.com/wiki/469264501.html

