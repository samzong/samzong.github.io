---
layout: post
title: iPhone/iPad 不越狱安装旧版程序
tags: 
    - iPhone
abbrlink: 29639
---

#### 前言

软件版本迭代是会带来新的功能和 BUG 修复，为给用户带来更好的使用体验，我也是乐于尝鲜的性格，所以在软件推出发布新版本时都会及时更新，但用户体验其实是一个玄学的话题，有时并不能给你带来更好的体验，在 iOS 上，由于苹果商店严格的管理机制导致我们在升级后，想要回退到之前版本变得十分困难。

虾米音乐升级到 6.0 版本之后，改变很大，作为一位老虾米非常不适应，所以就瞄准了 6.0 之前的最后一个版本：5.9.4。

解决办法是在 iTunes 下载程序时，使用抓包工具对与苹果应用商店服务器之间的请求进行分析，通过修改下载请求中程序版本识别序列号来下载旧版本。



#### 准备

网上较多的解决办法是使用 Fiddler+iTunes 是在 Windows 平台，因为我只有 Mac ，所以用Charles 代替 Fiddler，这里需要注意的是iTunes的版本，在笔者写这篇教程的前一天 iTunes 更新到12.7，在 12.7 中有一个很大的变化移除了 App store ，所以请使用低于 12.7 版本的 iTunes 。



#####  Charles 安装

对于 Charles 版本并没有特殊要求，我这边是通过brew安装，你也可以到 Charles 官网下载安装， Charles 是需要付费的软件，但是有30天免费使用期限，如果你有长期使用打算，建议购买正版授权。

![](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/x4dkc.jpg)



##### Charles SSL证书导入系统

从 Charles 中导出证书文件

![](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/v815e.jpg)



在 KeyChain Access 中导入证书

![](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/883p7.jpg)

选中导入的证书，然后右键选择 'Get Info' ，设置证书信任状态

![](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/xoalz.jpg)



#### “虾米音乐” 的三次下载

##### 第一次下载

打开 Charles ，开启监听，然后使用搜索虾米音乐，点击 Downloads 按钮。

![](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/6dt52.jpg)

点击下载后，在 Charles 会出现监听到信息，找到一条 'p[xx]-buy.itunes.apple.com' ，其中 xx 是一个随机的数字，选中它，然后右键菜单栏中勾选 'Enable SSL Proxying' 和 'Breakpoints' 。设置完成后，在 iTunes 下载中，清理下载记录。

![](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/ea85i.jpg)



##### 第二次下载

重新搜索虾米音乐，并点击下载按钮，这时 Charles 会弹出窗口，然后在弹出窗口的右下三个按钮中选择 'Execute' ，这一步是我们请求服务器，紧接着出现的就是服务器给我们的响应，然后选择 'Edit Response' - 'XML Text' ，然后向下滚动找到下图中的部分，这里是所有虾米音乐的版本的序列数字，但是这里没有办法直接看到版本号，越大的数字版本号越新。这里可以通过在手机 App store 中查看软件的版本记录，找到大概要回退多少个版本，然后数字从大到小找个半个序列数字记录下来，然后在下面三个按钮中选择 'Abort' ，这时 iTunes 会弹出一个报错窗口，关掉即可。

![](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/27nit.jpg)



##### 第三次下载

再次重新搜索虾米音乐，并点击下载，在这次Charles弹出窗口中我们需要直接修改 'Edit Requset' - 'XML Text' ，将如下图中的 'appExtVrsid' 对应的值修改为，我们上一步中记录的序列数字，然后就一直在每次弹出选择时，选择 'Execute' ，直到下载完成记录。

![](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/h7zzu.jpg)



####  验证

下载完成后，你的 iTunes App Library 中已经有了一个虾米音乐，连接上你的手机，将其安装到手机上即可，下图是我安装后的版本截图。

![](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/ppy2m.jpg)

