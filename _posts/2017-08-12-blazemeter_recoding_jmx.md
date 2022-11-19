---
layout: post
title: Jmeter 使用 BlazeMeter 为 Jmeter 录制脚本
tags: 
    - Jmeter
categories: 
    - OpenSource
    - Jmeter
---

之前一直使用阿里云的 PTS 服务作为测试，但是今天发现阿里云的 PTS 服务正在升级无法使用，所以打算用 Jmeter 来做压力测试，并使用 Chrome 插件 BlazeMeter 来录制.jmx 脚本。

#### 安装 BlazeMeter 插件

[插件安装](https://chrome.google.com/webstore/search/blazemeter) , 需要能登录到Chrome应用商店，如果不能登录的话，可以在网上搜索下载crx包，手动加载到Chrome中即可。

安装成功之后，在 Chrome 插件栏可以看到程序入口，![](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/r0ps7.jpg)

BlazeMeter 限制需要登录才能导出 jmx 脚本，所以首先需要注册账号。成功登陆后，完整界面如图所示：

![](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/oamv4.png)

#### 录制过程

填写测试脚本名称后，点击开始录制，执行一系列操作后，点停止录制，然后到处 jmx 文件到本地。

#### 导入脚本到 Jmeter

在 Jmeter 中"File-Open"导入你 jmx 脚本，为了方便观察结果，我们需要增加一些察看报告。

![](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/uxe75.jpg)

##### 聚合报告 (Aggregate Report)

我们可以在聚合报告中一些非常有用的信息，这有助于对性能测试的分析。

![](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/j93gs.png)

* Samples：一共完成了多少事务
* Averge：平均响应时间
* Median：统计意义上的响应时间的中值
* 90% Line：90% 的事务响应时间都小于 xx ms
* Min：最小响应时间 ms
* Max :  最大响应时间 ms
* Eror %  : 出错率
* Throughput：吞吐量，事务/秒
* KB/sec：用流量来衡量的吞吐量

> 吞吐量=完成的事务数/完成这些事务数所需要的时间；
>
> 平均响应时间=所有响应时间的总和/完成的事务数；
>
> 失败率=失败的个数/事务数。

##### 查看结果树 (View Results Tree)

通过查看结果树，可以看到每个事务的返回结果，其中红色是出错，绿色则为正常。建议在测试开始前将 log/Display Only 中 Errors 打上勾即可，不然会输出很多东西，不方便查看。

![](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/moo9h.png)
