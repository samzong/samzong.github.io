---
layout: post
title: HowTo Skip Atlassian Auth for SourceTree
tags: 
    - SourceTree
categories: 
    - Tools
---

## 问题

![image](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/eaxem.png)

因为国内的网络的原因，导致我们在首次打开 SourceTree 时需要验证 Atlassian 账号，但是 Atlassian 的注册页面使用 requirejs 是用了 Google 的 CDN 服务，所以无法正常通过验证，如果你有翻墙工具，那么这就没有问题，下面我要讲的方法是在不翻墙的情况下跳过初始化验证。

> 目前我解决的是在 Windows 平台上的问题，关于 Mac 平台，我稍后会更新到文档中。

## 解决思路

我的想法是通过增加`account`信息，让`SourceTree`跳过验证；经过测试`2.0.19`及以下版本都支持，但是 SourceTree 在最新版本 2.0.20 时可能修订验证方式，所以导致我的这个方式不适用，大家可以在我的百度云盘共享中下载 2.0.19，功能上并没发生多少变化。

链接：<https://pan.baidu.com/s/1qYsHKWs> 密码：wnc3

## 解决步骤

### .NET 4.5.2

SourceTree 依赖的.NET 环境最低是 4.5.2，当然在你安装的过程中，会提示你下载安装，你只需要确认即可，不过这样下载会比较慢，所以建议你使用 Offline 的形式安装，下面是微软官方下载地址：

<https://www.microsoft.com/en-us/download/confirmation.aspx?id=42642>

### SourceTree

安装过程中，默认一路“Next”即可，在安装完成之后，我们需要找到 SourceTree 在 LocalAppData 中的路径，请打开资源管理窗口，然后输入以下地址：

```bash
%LocalAppData%\Atlassian\SourceTree\
```

> 如果路径不存在，创建目录即可

然后将之前百度云盘的文件`accounts.json`复制到这个位置，它的路径应该是：

```bash
%LocalAppData%\Atlassian\SourceTree\accounts.json
```

文件内容：

```json
[
  {
    "$id": "1",
    "$type": "SourceTree.Api.Host.Identity.Model.IdentityAccount, SourceTree.Api.Host.Identity",
    "Authenticate": true,
    "HostInstance": {
      "$id": "2",
      "$type": "SourceTree.Host.Atlassianaccount.AtlassianAccountInstance, SourceTree.Host.AtlassianAccount",
      "Host": {
        "$id": "3",
        "$type": "SourceTree.Host.Atlassianaccount.AtlassianAccountHost, SourceTree.Host.AtlassianAccount",
        "Id": "atlassian account"
      },
      "BaseUrl": "https://id.atlassian.com/"
    },
    "Credentials": {
      "$id": "4",
      "$type": "SourceTree.Model.BasicAuthCredentials, SourceTree.Api.Account",
      "Username": "",
      "Email": null
    },
    "IsDefault": false
  }
]
```

添加完成之后，启动 SourceTree 即可发现已经跳过了验证界面。
