---
layout: post
title: Docker Hub 国内加速
tags: 
    - Docker
categories: 
    - 虚拟化
    - Docker
abbrlink: 52977
date: 2017-01-07 15:32:23
---

因为Docker Hub没有在国内部署站点或者增加了国内的CDN，这导致国内的开发者在使用docker pull 获取images的时候速度非常的慢，甚至于因为网络的原因会失败。

但是Docker Hub有着非常丰富的镜像资源，所以我这一直是个问题困扰着我，一次偶然机会发现了[DaoCloud](https://www.daocloud.io)提供了国内镜像加速服务，并且提供的Docker Hub Mirror详细的文档。

#### 1. 注册DaoCloud账号
首先，你需要到一DaoCloud账号，注册很方便，点击地址：[signup](https://account.daocloud.io/signup)
![](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/o6wh3.jpg)

#### 2. 登录到你的DaoCloud账号内，然后入下图操作
![](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/n9mt7.jpg)

#### 3. 查看你的DaoCloud加速器地址
[链接](https://www.daocloud.io/mirror#accelerator-doc)

选择你相对应平台的的加速器设置
![](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/4wuea.jpg)
