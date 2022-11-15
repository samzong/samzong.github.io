---
abbrlink: 1
title: clone git@github.com 加速
tags:
  - Git
---

如果你本地也有代理服务比如：`Clash`、`Surge` 并已完成科学上网，这对访问 Github 起到一定的加速作用，但如果在终端使用，可以还需要一些额外配置，这里以 `Clash` 作为示例。

## 1. 加速你的浏览器

默认情形下，你可能不需要做什么（在代理工作正常的情况下），浏览器的加速通过访问 [Github](https://github.com) 最为直接。

## 2. 加速你的终端 clone

如果你需要在终端 clone 一个托管在 Github 的项目，默认情形下你可能会发现 终端内并未得到加速，还是一如既往的慢。

这是因为终端在默认情况下不会走代理，这里需要你进行一配置

> 这里使用 iTerm2 为例

### 2.1 获取你的代理终端配置

<img src='http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/CleanShot%202022-08-08%20at%2018.35.56.jpg?x-oss-process=image/resize,w_960,m_lfit' alt='resize,w_960,m_lfit'/>


### 2.2 使用 HTTPS 作为 clone 链接

<img src='http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/CleanShot%202022-08-08%20at%2018.37.08.jpg?x-oss-process=image/resize,w_960,m_lfit' alt='resize,w_960,m_lfit'/>

这时将 `2.1` 剪切板获取的命名，放到终端中执行即可。

> 这样的方式适合拉取一个公开的仓库，或者对隐私仓库不使用 sshkey 进行代码的 `pull&push`


### 2.3 使用 git 作为 clone 的方式

此时我们需要特殊处理下，给 git 配置上全局代理部分，这里配置下仅对 `github.com` 这个域名生效

```bash

# 注意将 https://127.0.0.1:7890 后缀端口替换为
git config --global http.https://github.com.proxy https://127.0.0.1:7890
git config --global https.https://github.com.proxy https://127.0.0.1:7890
```

> clashx pro 默认情况下是 7890; 早期 ss 默认配置为 10086