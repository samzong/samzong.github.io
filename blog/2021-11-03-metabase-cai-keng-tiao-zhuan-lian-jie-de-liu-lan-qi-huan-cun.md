---
title: Metabase 踩坑：跳转链接的浏览器缓存
tags: [Tools]
---

![image.png](images/resize,w_960,m_lfit_c1552da9.png)

### 背景说明

最近在使用 Metabase 做一个内部工具的跳转传送门，大概实现的方式是这样：
![image.png](images/resize,w_960,m_lfit_95783d67.png)

- 通过 Metabase 带有的字段支持链接跳转的功能，拼接上查询结果的部分
- 后端服务完成对用户行为的校验，并且完成身份预认证，生成验证 token
- 然后带着预认证的信息跳转到对应的系统内

### 问题分析

起初用的时候发现还好，不过陆续有同学反馈有些行数的结果不能够进入后台去，而让其他人使用又是没问题；

简单分析了下服务端日志，发现不能正常登录情况是请求根本没有到后端服务器，浏览器直接进行了跳转，而之前签发的 token 是有时效的，超过时间就过期了，所以导致跳转后校验不通过

[![image.png](images/resize,w_960,m_lfit_baeda4aa.png)](https://img.samzong.me/202307191534498.svg?imageView2/3/w/400/interlace/1/q/50)

> 有兴趣的同学，可以点击上方的图片链接，去详细介绍的原文看看

### 解决思路&#xA;&#xA;

靠着对前端和浏览器一知半解+Google 出来的结果，**只要欺骗浏览器每次请求的路径不一样，就可以解决这个问题。**

所以解铃还须系铃人，当然还是靠着 Metabase 来解决这个问题

:::success
在 SQL 查询结果中增加一个每次都是不一样的结果字段 **取 unixtimestamp 时间**，然后将结果拼接到 url 中
:::

```sql
SELECT
 UNIX_TIMESTAMP(now()) AS `ts` //每次取值当前时间
FROM
 table_name
```

> 解决之后对比

![image.png](images/resize,w_960,m_lfit_ca82e083.png)

🎆🎆🎆  完毕，问题得以解决

### 其他

注意在后端服务上去除对时间参数的过滤，因为我是只处理了我想要的字段，所以这样的调整 服务端代码都不用改
