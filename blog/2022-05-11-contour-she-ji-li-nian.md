---
title: Contour 设计理念
tags: [Microservice]
---

Contour 是一个第 7 层 **HTTP** 中间件反向代理，用于启用 Kubernetes 集群的入口。

## 没有目标

- Contour 不是服务网格
- Contour 也无意公开 Envoy 的所有功能或配置选项
- Contour 不适用于代理第 4 层协议，例如 TCP 或 UDP，除非它们需要传递 HTTP。

> 因此，TCP 代理是可用的，但希望代理用于通过 HTTPS。将来可能会添加一些 UDP 支持，以便我们可以支持使用 UDP 作为传输的 QUIC。使用 Contour 代理原始 TCP 或 UDP 流量可能有效，但不是预期用途

## 最终用户

### 集群管理员

集群管理员负责 Kubernetes 集群的运行状况和运行。他们负责与外部世界的连接、TLS 秘密管理和 DNS 等。他们负责安装 Contour 和 Envoy、这些应用程序的软件生命周期以及 Contour 应用程序配置

### 应用程序开发人员

应用程序开发人员是希望在 Kubernetes 集群上部署 Web 应用程序或微服务工作负载的人，并且对集群的访问权限少于管理员。它们通过创建 Contour 可以理解的类型的 Kubernetes 对象与 Contour 进行交互，并且除了对这些对象的影响之外，它们与 Contour 本身没有交互。

## 意见/评价

Contour 是一个有着专一的项目。我们认为 Contour 的很大一部分价值在于它专精的方法。我们相信这种方式可以让我们编写更好的软件来满足维护者和用户的需求

### 合理的默认值

互联网中的许多项目提供了广泛的配置范围。总的来说，这是一件好事。大多数项目都是由几乎没有机构来运营的。因此必须可以在运行时进行配置。然而，这种做法已经演变为 **如果某些东西可以配置，那么它应该是可配置的。**

> Contour 的设计理念，尽可能使用 Envoy 的配置参数，不会过多的增加配置，而是根据实际需要的用户做出取舍。

Contour 的立场是，当 Envoy 配置参数有合理的默认值时，Contour 将无条件地应用它。过去，我们通过无条件压缩 HTTP 响应主体、禁止 TLS/1.0、选择激进的密码套件等来使用此位置。
如果我们无法找到普遍接受的值，Contour 将为管理员或开发人员提供一种方法来提供他们选择的值作为最后的手段。在该项目的历史上，第二种情况很少发生。通常，由更改特定参数的愿望引发的讨论导致对 Contour 的使用方式有更深入的了解，否则不会发生这种情况。

## 明确的功能范围定义

**Kubernetes 集群上 HTTP 工作负载的反向代理实现**。Contour 对 TCP 代理的有限支持仅用于 Contour 支持希望直接处理 TLS 的 Web 应用程序。

### 应用程序开发人员或集群管理员可以支持每个功能

对于我们添加的每个功能，我们都必须有一个问题的答案——最终用户能否在无需升级到 Contour 维护人员的情况下调试此功能中的故障？
如果涉及第三方组件，我们如何将应用程序开发人员连接到失败的组件，以使他们在无需我们调解的情况下彼此作为第一方知道对方？
这意味着我们更愿意避免添加客户无法自行调试的功能——即使是他们的系统出了问题。
在添加验证功能时，我们会在设计空间方面犯错，即使它不是最完整的，也要尽快给客户反馈；即，由 api 服务器强制执行的 CRD 验证优于对象上的状态字段。
在设计 Kubernetes 对象时，我们尝试将信息尽可能靠近需要它的对象公开。例如，我们将确保 HTTPProxy 对象具有状态条件，告诉创建它们的用户是否存在问题，而不仅仅是从 Contour 本身记录该信息。

### 我们在用户所在的地方与他们会面

Contour 目前支持 Ingress、HTTPproxy 和 Kubernetes Gateway API。我们不要求用户选择他们想要使用的入口 API，相反，我们会考虑为任何请求的类型提供支持，以满足任何地方的用户。
这个目标与最小表面积的目标相冲突，但我们意识到将我们所有的用户引导到仅在 Contour 中实现的 API 不利于他们的互操作性，并限制了我们的总目标市场。这个目标的想法是，我们会在新的入口类型可用时深思熟虑地考虑它们，如果我们认为这是一个好主意，就将它们添加进去。
