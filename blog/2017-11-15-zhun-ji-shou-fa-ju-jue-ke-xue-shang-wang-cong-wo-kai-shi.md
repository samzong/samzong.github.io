---
title: HowTo Use SSR Service on Mac
tags: [Google]
ulisted: true
---

应邀制作一份关于 Mac SSR 的连接使用。

## 准备

1. SSR 服务提供商，[SSGlobal](http://www.ssglobal.co/wp/) ，你可以到 Telegram 加入我们。[SSGlobal Group](https://t.me/joinchat/ESwgR0Ckp_zXMCuRKqykqA)
2. MacOS 版本 10.12.6，经过实测 OS 版本对实际使用影响并不大。
3. SSR Client， [下载](http://www.ssglobal.co/wp/wp-content/uploads/2017/02/ShadowsocksX-NG-R8.dmg)

## SSR 服务

如果你需要科学上网的话，非常愿意给你推荐我正在使用的 SSR 服务商，但是由于其官方网站和客户沟通工具 TG 需要科学上网才能使用，所以你可以联系到我来介绍你们。

最新定价计划：

* Plan-A：**¥15.00 元**，1 个月，无限流量，不限速，可自助切换节点。
* Plan-B：**¥15.00 元**，3 个月，6G 流量包，不限速，可自助切换节点。
* 增加线路：**¥8.00 元**，1 个月，1 条。

> 注：增加线路仅支持 Plan-A 用户配套购买，不超过主线路最长期限，不足 1 个月剩余时限用户不支持购买

### 注册账号

[立即注册](http://www.ssglobal.co/wp/registration/?action=register)

![05](https://img.samzong.me/202307191532482.jpg?imageView2/3/w/400/interlace/1/q/50)

> 这里 alexman@mac.local 仅仅是演示邮箱，请填写对应属于你的邮箱。

当你点击提交完成后，在你的邮箱会收到一封激活邮件，点击其中链接或将链接复制到浏览器中即可激活。

![07](https://img.samzong.me/202307191532483.jpg?imageView2/3/w/400/interlace/1/q/50)

> 这里同样是激活链接，同样仅作为演示。

### 登录系统

[立即登录](http://www.ssglobal.co/wp/login-2/?redirect_to=http://www.ssglobal.co/wp/registration/)

输入注册时的用户名密码，即可登录到系统内，然后在首页找到进入后台按钮，即可看到试用信息。

![06](https://img.samzong.me/202307191532484.jpg?imageView2/3/w/400/interlace/1/q/50)

> 这里填写用户名或邮箱都可以。

进入系统后，找到订阅链接信息，默认情况下，你应该只有一条线路信息，付费用户享有应急通道。

![04](https://img.samzong.me/202307191532485.jpg?imageView2/3/w/400/interlace/1/q/50)

> 上图中”切换“，用来切换不同服务器节点，注意，切换后要到客户端内刷新订阅信息，下面会讲到。

## SSR Client 安装

在本文最上面已经有了，如何下载 SSR 客户端的地方，细心的朋友，应该已经在 SSGlobal 官网上找到了对应下载页面，其中包含全平台的客户端工具。

### 下载

[立即下载](http://www.ssglobal.co/wp/wp-content/uploads/2017/02/ShadowsocksX-NG-R8.dmg)

![01](https://img.samzong.me/202307191532486.jpg?imageView2/3/w/400/interlace/1/q/50)

下载完成后，找到你的下载文件，双击打开，将程序拖到 Mac 程序目录即完成安装，和 Mac 其他软件安装并无不同。

![02](https://img.samzong.me/202307191532487.jpg?imageView2/3/w/400/interlace/1/q/50)

## 启动程序

 在 Launchpad 中找到最近安装的 Shadowsocks NG R8，点击启动后，Mac 右上角导航栏中会有一个小飞机的图标，点击可以看到以下信息：

![03](https://img.samzong.me/202307191532488.jpg?imageView2/3/w/400/interlace/1/q/50)

> 上图中已经有我的订阅信息，请忽略

## 编辑订阅信息

选择编辑订阅信息，然后将你在 SSGlobal 网站后台拿到的订阅信息添加到其中

![09](https://img.samzong.me/202307191532489.jpg?imageView2/3/w/400/interlace/1/q/50)

> 注意只要添加 URL 信息即可，不需要修改其他。

然后选择手动更新订阅，这里在你的服务列表内，就有了你的服务器节点信息，选择对应节点即可开启科学上网

### PAC 规则

首次使用 PAC 需要更新一次 PAC 规则，操作如下图。

![10](https://img.samzong.me/202307191532490.jpg?imageView2/3/w/400/interlace/1/q/50)

这里的 PAC 规则是从 GFWLists 更新的，由于其更新速度较慢，所以如果日常使用发现某些网站无法使用，可以手动添加到 PAC 规则内

![11](https://img.samzong.me/202307191532491.jpg?imageView2/3/w/400/interlace/1/q/50)

> || domain , 这里表示匹配所有代理

更多关于用户规则，可以查看这里，[使用手册](https://adblockplus.org/en/filter-cheatsheet)

## 结语

到这里，基本常用的安装和使用已经完成了，如果测试后仍旧无法正常使用，请仔细检查是否遗漏步骤，也可以与我取得沟通。
