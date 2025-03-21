---
title: K8s 系列 南北流量和东西流量
toc: true
tags: [Kubernetes]
---


## 南北流量和东西流量 是什么意思？

在 Service Mesh 微服务架构中，我们常常会听到东西流量和南北流量两个术语。

南北流量（NORTH-SOUTH traffic）和东西流量（EAST-WEST traffic）是数据中心环境中的网络流量模式。下面我们通过一个例子来理解这两个术语。

假设我们尝试通过浏览器访问某些 Web 应用。Web 应用部署在位于某个数据中心的应用服务器中。在多层体系结构中，典型的数据中心不仅包含应用服务器，还包含其他服务器，如负载均衡器、数据库等，以及路由器和交换机等网络组件。假设应用服务器是负载均衡器的前端。

当我们访问 web 应用时，会发生以下类型的网络流量：

![](images/resize,w_960,m_lfit_703a167c.png)

数据中心树型拓扑图是一个典型的包含接入层、汇聚层、核心层三层的网络结构。这种结构诞生之初就是为了将外部流量引流到内部应用。

流量从外部穿过防火墙或者数据中心其它外围网络设备进来，对应到上⾯这张图里，流动方向为从上到下，称为南向流量（和地图一样，上北下南），而与之对应的，数据中心内部产生的，离开数据中心的流量，从下到上故称为北向流量。合起来称为南北流量。

在微服务化流行之前，以巨石系统（monolithic）这种单体应用为单位部署的方式，产生的是典型的南北流量。一个单体应用配有一个专门的服务器（或虚拟机），一个外部请求通常在单体应用内独立完成，除了访问数据库等必须依赖服务之外，很少会发生横向的流量。

但云计算机、大数据、微服务、云原生等技术的发展催生了大量的从左到右以及从右到左的流量，也被称为东西流量。

数据中心内部南北流量的削弱，而东西流量的井喷在硬件上要求数据中心要横向扩展以提供更宽的大二层以及容纳更多的服务器，而在软件上则要求一种新的服务编排方式以便能充分挖掘、利用现有的计算能力，从这个角度看 K8s 的出现是一种必然。

举两个例子：

- 客户端（位于数据中心一侧的浏览器）与负载均衡器（位于数据中心）之间的网络流量

- 负载均衡器、应用服务器、数据库等之间的网络流量，它们都位于数据中心。

在这个例子中，前者即即客户端和服务器之间的流量被称为南北流量。简而言之，南北流量是 server-client 流量。

第二种流量即不同服务器之间的流量与数据中心或不同数据中心之间的网络流被称为东西流量。简而言之，东西流量是 service-service 流量。

当下，东西流量远超南北流量，尤其是在当今的大数据生态系统中，比如 Hadoop 生态系统（大量 server 驻留在数据中心中，用 map reduce 处理），server-server 流量远大于 server-client 流量。

大家可能会好奇，东西南北，为什么这么命名？

该命名来自于绘制典型 network diagrams 的习惯。在图表中，通常核心网络组件绘制在顶部（NORTH），客户端绘制在底部（SOUTH），而数据中心内的不同服务器水平（EAST-WEST）
