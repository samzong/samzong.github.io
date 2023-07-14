---
title: Contour 学习笔记
tags: [Microservice]
---



## Contour 官方的资料

- <https://hackmd.io/84Xbl4WBTpm7OBhaOAsSiw>  Contour Community Meeting Notes
- <https://www.youtube.com/watch?v=fpRzvQWiHjI&list=PLk2K7YhXu5KtYU1UGEYNC8ApH5gsWihDJ>  双周例会
- <https://kubernetes.slack.com/archives/C8XRH2R4J>  Slack Chat Channel
- <https://bitnami.com/stack/contour/helm>  Helm 部署 Contour 资料
- <https://juejin.cn/post/7029286464802258974>  Envoy Ingress：Contour 基本原理和源码分析
  - <https://juejin.cn/user/3878732754069272> 掘金大佬

## 参考文档一：使用 Contour 接管 K8s 南北流量

![image.png](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1652658255610-3a38d8d3-2062-486b-a0b9-3b0a1d47dc5c.png?x-oss-process=image/resize,w_960,m_lfit)
容器公司 [Heptio](https://heptio.com/) 开源的项目 [Contour](https://github.com/heptio/contour) 使用 Envoy 作为 Kubernetes 的 Ingress Controller 实现。

### Contour 的组成

Contour Ingress controller 由两个组件组成：

- Envoy : 提供高性能反向代理。
- Contour : 充当 Envoy 的控制平面，为 Envoy 的路由配置提供统一的来源。

### Contour 的部署方式

官方文档提供了三种部署方法：

1. 通过 DaemonSet 来部署，每个节点上跑一个 Contour 实例（Contour 与 Envoy 在同一个 Pod 中）。
2. 通过 Deployment 来部署，总共跑两个 Contour 实例（Contour 与 Envoy 在同一个 Pod 中）。
3. 通过 Deployment 来部署 Contour，总共跑两个 Contour 实例；通过 DaemonSet 来部署 Envoy，每个节点上跑一个 Envoy 实例。

第三种方案比较巧妙，这样可以让 Contour 和 Envoy 这两个组件解耦，可以分别按需对不同的组件进行扩展，具体的优势如下：

- Envoy 以 Daemonset 的形式运行，具有很强的扩展性，后续可通过 ipvs 和 keepalived 等工具来实现其负载均衡和高可用。
- Envoy 运行的网络模式是 hostNetwork，减少了额外的网络性能损耗。
- Contour 与 Envoy 之间通过双向认证的自签名证书进行通信，大大增强了安全性。
- 升级 Contour 不需要重启 Envoy。

![image.png](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1652658571911-263003fa-2d88-47d9-9650-7929589a49c8.png?x-oss-process=image/resize,w_960,m_lfit)

> 启动分析

在 Envoy 的 Pod 初始化期间，Contour 作为 Init 容器运行，并将 bootstrap（初始化）配置写入一个 temporary volume。该 Volume 被传递给 Envoy 容器并告诉 Envoy 将另一个 Deployment 中的 Contour 容器视为控制平面。

![image](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1652659925765-50a45ceb-22f8-44a9-8c48-34fa832cda3e.jpeg?x-oss-process=image/resize,w_960,m_lfit)

> Contour 会根据启动参数和 K8S API Server 中的配置信息生成 Envoy 的初始配置文件

1. Envoy initContainer 根据启动参数和 K8S API Server 中的配置信息生成 Envoy 的初始配置文件 envoy.json，该文件告诉 Envoy 从 xDS server 中获取动态配置信息，并配置了 xDS server 的地址信息，即控制平面的 Contour。
2. Envoy 使用配置文件 envoy.json 启动。
3. Envoy 根据获取到的动态配置启动 Listener，并根据 Listener 的配置，结合 Route 和 Cluster 对进入的流量进行处理。

Contour 作为 Envoy 的 initContainer

## 参考文档 二：Contour 中 Envoy 优雅停服的实现与源码分析
