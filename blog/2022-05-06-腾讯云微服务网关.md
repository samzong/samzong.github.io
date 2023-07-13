---
title: 腾讯云微服务网关
tags: 
  - 云原生网关
  - 腾讯云
categories:
  - Kubernetes
  - 云平台
url: https://www.yuque.com/samzong/dao/lrghqv
---



## 网关管理

默认这里展示对应的网关列表，未提供网关的创建入口，需要依赖前序的网关应用创建；

## ![image.png](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1651835188355-19fc2743-a4c8-4656-a5eb-ddda1c009412.png?x-oss-process=image/resize,w_960,m_lfit)

:::warning
在 微服务的应用中心 进行网关创建
:::
![image.png](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1651835152102-06d0d818-2fa9-4de2-bc7c-8ff54598a977.png?x-oss-process=image/resize,w_960,m_lfit)

### 网关的创建过程

![text](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1651837425558-4d08bdb8-0b33-4d15-93f0-50d8f6aff20f.jpeg?x-oss-process=image/resize,w_960,m_lfit)

### 网关绑定的分组管理

一个网关下可以创建多个分组，分别指向不同的 托管 API，根据访问的 Context 区分
![image.png](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1651835588311-0c5f3792-dd31-4f1e-92da-1b50419eab32.png?x-oss-process=image/resize,w_960,m_lfit)

### 分组下的 API 管理

- API 类型为：微服务 API，支持检测自动导入 API；也支持手工编辑
- API 类型为：外部 API，仅支持支持手工编辑

## 插件管理

- 主要支持 2 类型 插件：
  - Auth
  - 转义 Tag <特色>

![image.png](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1651835272534-895b305a-c811-4def-867c-7be69c7febd1.png?x-oss-process=image/resize,w_960,m_lfit)

## 网关监控

监控部分均是自研，实现的内容也比较简单

### 基于网关的监控

![image.png](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1651836406548-7e7da58e-e9d8-424f-ac5e-d1d755793217.png?x-oss-process=image/resize,w_960,m_lfit)

### 基于 API 的统计监控

![image.png](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1651836565750-f2e14946-a137-4929-808c-096c61cebaf6.png?x-oss-process=image/resize,w_960,m_lfit)

## 录屏存放处

> 仅 DaoCloud 可查看

<https://yongyu2000hotmailcom.sharepoint.cn/:f:/s/ndx/Emsrgwa4Z7xMsT4P8GMd31IB5p1zTy__gNKWn10_ynvvIQ?e=GFNejD>
