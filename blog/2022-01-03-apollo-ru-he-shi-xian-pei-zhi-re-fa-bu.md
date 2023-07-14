---
title: Apollo 如何实现配置热发布
tags: []
---

配置中心在微服务架构体系中是非常重要的基础设施服务，承担着分布式配置集中管理、配置热发布以及审计等重要的职责。本文主要探讨 Apollo 配置中心的配置热发布特性如何实现。

![image](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1641235647447-4020ae67-bd11-4fde-bd75-930cd6bec2de.jpeg?x-oss-process=image/resize,w_960,m_lfit)

如上图所示，配置发布的主流程如下：

- （1）用户通过 Portal 向 AdminService 发布配置信息；
- （2）AdminService 在配置发布后会往 ReleaseMessage 表插入一条消息记录；
- （3）ConfigService 中包含了一个定时线程，该定时线程每秒扫描一次 ReleaseMessage 表，检查表中是否有新的消息记录；
- （4）如果存在配置更新，ConfigService 就会通知所有的消息监听器；
- （5）通知 Controller 会根据发布的配置信息通知对应的客户端；

![image](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1641235647465-f12e26b4-9ab7-496d-8a0a-227b36142f00.jpeg?x-oss-process=image/resize,w_960,m_lfit)

这里的配置更新推送其实并不是真正进行信息推送，而是通过长轮询来实现配置的更新。实际上并不是配置的更新推送，而是配置更新通知的推送，客户端拿到通知后需要进一步获取具体的变化的配置信息。

长轮询
（1）如果使用 Push 方式推送数据会有什么问题？

![image](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1641235647464-e43d03b0-0814-4f71-b730-fae9a30058d3.jpeg?x-oss-process=image/resize,w_960,m_lfit)

服务端需要与客户端建立长连接，服务端有数据更新的时候可以进行数据推送，数据更新比较及时。但是服务端无法感知客户端的处理能力，可能会造成数据积压。另外集群情况下部分节点不在线会通知失败，等客户端又在线后需要进行补偿推送，节点还有可能存在扩容等各种情况。对于配置中心这种业务场景来说，通过 Push 方式实现数据推动显得复杂了。

（2）如果使用 Pull 方式拉取数据会有什么问题？

![image](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1641235647430-bb402569-7dfe-4001-9084-286881bb78b7.jpeg?x-oss-process=image/resize,w_960,m_lfit)

Pull 模式主要是通过客户端主动向配置中心进行数据请求，拉取对应的配置信息。由于是客户端主动拉取，因此不会出现数据堆积的问题。但是数据如何去拉，什么时间去拉，拉的频率如何控制，这些都是问题。如果频率过高，而配置并未更新，那么就会对服务端造成不必要的连接压力。如果频率过低，那么配置更新就会存在延时的问题。因此同样不适合配置中心的业务场景。

（3）长轮询

客户端向配置中心进行请求，配置中心不会立即返回响应，而是会 hold 住这个请求直到指定时间超时后进行返回。如果没有配置变更，则返回 Http 状态码 304 给客户端。超时返回后，客户端将再次发起请求。

如果存在配置变更，将返回对应的 namespace 信息，客户端根据 namespace 信息获取对应的配置信息。
另外为了保证配置的有效性，客户端也会定时请求配置信息，防止配置更新可能出现的异常情况，是一种数据保证的兜底 fallback 机制。另外当获取到配置后，会同步到本地配置文件中。这样即便客户端与配置中心无法通信，客户端也可以从本地配置文件中获取配置信息。

那么问题来了，为什么不直接在长轮询的响应中直接回复配置信息呢？主要是由于本身已经存在了定时拉取配置的步骤，那么为了保证单一原则以及代码上的简洁以及复用。所以通过这种获取配置更新后再进行数据拉取的方式。

### Apollo 客户端获取配置信息

我们一起看下客户端如何工作流程，如下图：

![image](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1641235647471-53df92c4-4efc-424b-83a4-c99c9d103a47.jpeg?x-oss-process=image/resize,w_960,m_lfit)

- （1）ConfigServiceLocator：主要负责向 Eruka 注册中心获取 ConfigService 地址列表信息；
- （2）RemoteConfigLongPollService：从 ConfigServiceLocator 获取到地址列表信息后，通过长轮询的方式获取配置变更信息；
- （3）RemoteConfigReposity：从 ConfigService 获取变更的配置数据；
- （4）LocalFileConfigReposity：把配置数据固化到本地，同时作为本地配置数据的来源；
- （5）DefaultConfig：主要和业务方进行交互，提供配置获取方法，同时可以注册配置变更事件。
