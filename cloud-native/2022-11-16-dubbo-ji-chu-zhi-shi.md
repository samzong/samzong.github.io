---
title: Dubbo 基础知识梳理
tags: [Microservice]
---

> 参考资料：

- [https://juejin.cn/post/7128953614403371015#heading-5](https://juejin.cn/post/7128953614403371015#heading-5)
- [https://dubbo.apache.org/zh/docs/](https://dubbo.apache.org/zh/docs/)

## 简介

- Apache Dubbo 一款基于 RPC 服务开发的云原生微服务框架，与 SpringCloud 类似
- 使用 Dubbo 开发的微服务原生具备相互之间远程地址发现 (注册中心) 和通信的能力
- Dubbo 支持丰富的服务治理特性，包含 服务发现、负载均衡、流量调度 等，高度可扩展
- Dubbo 由 阿里巴巴 开发，并贡献给 Apache

## 发展历程

### 版本迭代

<img src='http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/20221117023215.png?x-oss-process=image/resize,w_960,m_lfit' alt='resize,w_960,m_lfit'/>

### 软件生态的活跃度

<img src='http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/8G8hZG.jpg?x-oss-process=image/resize,w_960,m_lfit' alt='resize,w_960,m_lfit'/>

## 与 SpringCloud 相比的优势

- 功能丰富，基于原生库即可完成大部分的微服务治理能力
- 支持超大规模的微服务机器设计，高性能 RPC 通信协议实现
- 高度可扩展性，支持在调用过程中对流量及协议进行拦截扩展，如 Filter、Router、LB 等
- 支持微服务治理的扩展组件
  - Registry 注册中心：Zookeeper、Nacos
  - Config Center 配置中心：Zookeeper、Nacos
  - Metadata Center 元数据中心 (Dubbo3 支持)

## Dubbo 的基础概念介绍

- RPC 通信
- 服务发现
- 流量治理

### RPC 通信

- Dubbo3 之中，RPC 通信主要使用 Triple 协议，构建在 HTTP/2 协议之上，兼容 gRPC
- 提供 Request Response、Request Streaming、Response Streaming、Bi-directional Streaming 通信模型
- 支持 IDL，基于 Triple 协议

### 服务发现

服务发现，是消费端自动发现服务地址列表的能力，是微服务框架需要具备的关键能力，借助于自动化的服务发现，微服务之间在无需感知对端部署位置与 IP 地址的情况下实现通信。

Dubbo 提供的 Client-Based 服务发现机制，同时也需要第三方注册中心来协调服务发现过程，比如 Nacos/Zookeeper 等。

<img src='http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/oaqyGX.jpg?x-oss-process=image/resize,w_960,m_lfit' alt='resize,w_960,m_lfit'/>

### 流量治理

- Dubbo2 开始，Dubbo 就提供了丰富的服务治理规则，包括路由规则/动态配置等
- Dubbo3 之中的实现
  - Dubbo Mesh : 通过对接 xDS 对接到时下流行的 Mesh 产品如 Istio 中所使用的以 VirtualService、DestinationRule 为代表的治理规则
  - 另一方面 Dubbo 正寻求设计一套自有规则以实现在不通部署场景下的流量治理，以及灵活的治理能力。

## Dubbo Mesh

Dubbo Mesh 的目标是提供适应 Dubbo 体系的完整 Mesh 解决方案，包含定制化控制面（Control Plane）、定制化数据面解决方案。Dubbo 控制面基于业界主流 Istio 扩展，支持更丰富的流量治理规则、Dubbo 应用级服务发现模型等，Dubbo 数据面可以采用 Envoy Sidecar，即实现 Dubbo SDK + Envoy 的部署方案，也可以采用 Dubbo Proxyless 模式，直接实现 Dubbo 与控制面的通信。

<img src='http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/vMniiR.jpg?x-oss-process=image/resize,w_960,m_lfit' alt='resize,w_960,m_lfit'/>

## Dubbo3

Dubbo 3.0 提供的新特性包括：

- **新的地址发现模型（应用级服务发现）**
  - 查看[应用级服务发现的迁移步骤](https://dubbo.apache.org/zh/docs/migration/migration-service-discovery)
  - 查看应用级服务发现的使用方式
  - 查看应用级服务发现设计与实现
- **下一代基于 HTTP/2 的 Triple 协议**
  - 查看[Triple 协议迁移步骤](https://dubbo.apache.org/zh/docs/migration/migration-triple)
  - 查看 [Triple 协议使用方式](https://dubbo.apache.org/zh/docs/references/protocols/tri)
  - 查看 Triple 协议设计与实现
- **统一的路由规则。**
  - 查看[统一路由规则的迁移步骤](https://dubbo.apache.org/zh/docs/migration/migration-routingrule/)
  - 查看[统一路由规则使用方式](https://dubbo.apache.org/zh/docs/references/routers/)
  - 查看统一路由规则设计与实现
