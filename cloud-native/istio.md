# Istio 介绍

## 架构介绍


### Istio 的简单架构介绍

![](images/1704528313319-b649bff5-b057-426d-a2ec-278f01f8e0b9_b5e257d9.png)

### Sidecar 架构

![](images/1704528313198-4f71297d-248e-4f44-bfc0-80b4900f863b_c219d048.png)

Istio Control Plane Topo

![](images/1704528313181-b8e7ef6f-3673-4a44-8a0e-da71382844a9_a53fa00c.png)

## 组件介绍

1. **Envoy**：

1. **作用**：作为边车(sidecar)代理部署与服务的容器旁边，负责拦截并处理进出服务的所有网络通信。
2. **通信**：与Istio的控制平面组件沟通，获取配置信息；与服务容器通信，实现流量拦截和转发。

2. **Pilot** ：

- **作用**：Istio的流量管理组件，负责配置和传输下游服务的路由信息给Envoy代理，并提供服务发现功能。
- **通信**：讲解Istio配置并转换到Envoy可以理解的格式，通过xDS API与Envoy进行通信。

3. **Citadel** （随着版本更新可能改名为Istio CA）：

- **作用**：Istio的安全组件，负责证书的签发与管理，提供密钥管理来支持强大的身份验证和授权。
- **通信**：与Envoy代理通信，分发身份证书和密钥。

4. **Galley** ：

- **作用**：Istio配置验证组件，负责配置的收集、处理、验证和分发。
- **通信**：它处理来自Kubernetes API Server的配置，验证及分发给Pilot。

5. **Mixer** （在新版本中Mixer的功能已经被逐渐弃用和分散到其他组件）：

- **作用**：负责策略决策和遥测数据的收集。
- **通信**：与Envoy代理通过gRPC连接通信，进行访问控制和收集遥测数据。

6. **Istiod** （在较新版的Istio中引入）：

- **作用**：简化部署，它将Pilot、Citadel、Galley等组件的功能合并为一个单一的组件。
- **通信**：直接与Envoy代理通信，提供配置、证书管理等。

7. **Istio** **Ingress****Gateway**：

- **作用**：作为服务网格的入口，管理进入服务网格的流量。
- **通信**：直接暴露于外部，接受外部请求并将流量代理至内部服务。

8. **Istio Egress Gateway**：

- **作用**：作为服务网格的出口，管理离开服务网格的流量。
- **通信**：流量从网格内的服务流向Egress Gateway，再从Egress Gateway流向外部服务。

沟通机制：

- 各组件之间主要通过gRPC来通信，这允许组件之间实现跨语言、高效和双向的通讯。
- Envoy代理通过Istio提供的API（如xDS API）与控制平面组件进行动态配置的交换。
- Kubernetes API服务器用作配置存储和集群状态的共享点，其他组件如Galley和Pilot订阅这些信息并做出相应的动作。

随着Istio的迭代，一些组件功能可能会合并成一个，例如Istiod的出现大大简化了管理和部署的复杂度。因此，建议您查阅最新版本的Istio文档以获得最新信息。