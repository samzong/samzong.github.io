---
layout: post
title: What is Hukou
tags:
  - OAuth
categories:
  - 安全
---

## 背景

对于一个大型企业，内部有几十个业务系统是非常正常的一件事情。

在这个背景下，有一个具体的服务可以很干净的只做一件事情是非常棒的：把人管好。

## 功能接入

- 支持接收其他业务系统的注册
  - 支持配置 system_key
  - 支持自定义回调地址
- 通用的身份认证接入方式
  - 接入方系统只需要简单的集成即可完成用户身份的登录支持
- 支持一键禁用账号登录
  - 增强版能力，支持广播账号身份信息发生变化，实时触发账号验证
    - 可选项，由接入方系统根据需求决定是否接入
- 支持与三方业务系统集成
  - 钉钉
  - 飞书
  - etc.

## 功能逻辑说明

<img src='http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/20221123145010.png?x-oss-process=image/resize,w_960,m_lfit' alt='resize,w_960,m_lfit'/>

> 验证流程图

<img src='http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/VIzBnN.jpg?x-oss-process=image/resize,w_960,m_lfit' alt='resize,w_960,m_lfit'/>

## 相关技术和开源实现

- 开源项目
  - Keyclock
- 相关技术
  - Microsoft AD
  - LDAP
  - OIDC
  - OAtuh
- SaaS 产品
  - 飞书 <门神>
  - [auth0.com](https://auth0.com)
  - [fusionauth](https://fusionauth.io/)
