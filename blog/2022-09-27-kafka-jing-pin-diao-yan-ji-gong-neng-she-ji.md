---
title: Kafka 调研及功能设计
tags: [ Microservice, Kafka]
---



## 调研对象

| 厂家 | 产品控制台主页 | 应用模式 |
| --- | --- | --- |
| 阿里云 | [https://kafka.console.aliyun.com/](https://kafka.console.aliyun.com/) | 中间件 PaaS 模块之一 |
| 腾讯云 | [https://console.cloud.tencent.com/ckafka/overview](https://console.cloud.tencent.com/ckafka/overview) | 中间件 PaaS 模块之一 |
| 华为云 | [https://console.huaweicloud.com/dms/?region=cn-east-3&engine=kafka](https://console.huaweicloud.com/dms/?region=cn-east-3&engine=kafka) | 中间件 PaaS 模块之一 |
| QingCloud | [https://console.qingcloud.com/pek3/app/app-n9ro0xcp/](https://console.qingcloud.com/pek3/app/app-n9ro0xcp/) | 中间件 AppCenter 模块之一 |
| UCloud | [https://console.ucloud.cn/ukafka/ukafka](https://console.ucloud.cn/ukafka/ukafka) | 中间件 PaaS 模块之一 |
| 时速云 | [https://console.tenxcloud.com/middleware_center/app](https://console.tenxcloud.com/middleware_center/app) | 中间件 应用之一 |

## operator 选型

- [https://github.com/strimzi/strimzi-kafka-operator](https://github.com/strimzi/strimzi-kafka-operator)
- [https://github.com/banzaicloud/koperator](https://github.com/banzaicloud/koperator)

### 功能横向对比

| 功能点 | 阿里云 | 腾讯云 | 华为云 | QingCloud | UCloud | 时速云 | strimzi-kafka-operator | koperator |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Kafka 实例的生命周期管理 | √ | √ | √ | √ | √ | √ | √  | √  |
| Kafka 多版本支持 | √ 默认固定，工单调整 | √ | √ | √(仅 1 个) | √ | √ | √  | √  |
| Kafka 节点列表 | √ |  | √ |  | √ | 跳转 Pod | √ (能创建 pod) | √  |
| Kafka 原生参数管理 |&#x20;
&#x20;|  | √ | √ 原生 | √ | √ 原生 | √  | √  |
|  Kafka 常用参数抽象 | √ | √ | √ |  | √ |  | √  | √  |
| Kafka 模块自带 Zookeeper | √ | √ | √ |  | √ |  | √ |&#x20;
&#x20;|
| 消息查询功能 | √ | √ | √ | √ 原生 |  | √ 原生 |  |  |
| 消息下载功能 | √(高级版） |  |&#x20;
&#x20;|  |  |  |  |  |
| Topic 管理列表 | √ | √ | √ | √ 原生 | √ | √ 原生 |&#x20;
&#x20;|  |
|  Topic 增删改查 | √ | √ | √ | √ 原生 | √ | √ 原生 |&#x20;
&#x20;|&#x20;
&#x20;|
|  Topic 高级参数支持 | √ | √ | √ | √ 原生 | √ | √ 原生 |&#x20;
&#x20;|&#x20;
&#x20;|
| Topic 详情 | √ | √ |&#x20;
&#x20;| √ 原生 | √ | √ 原生 | √  | √  |
| Consumer Group 列表 | √ | √ |  | √ 原生 |  | √ 原生 |  |  |
| Consumer Group 增删改查 | √ | √ |  | √ 原生 | √ | √ 原生 |  |  |
| 资源监控看板 | √ | √ |  | √ | √ | √ | √ grafana dashboard | √ grafana dashboard |
|  Kafka 业务数据监控 (消息量/积压/消费情况) | √ | √ | √ |  | √ | √Grafana | √ exporter+grafana | √  exporter+grafana |
| 示例接入代码 | √ | √ | √ |  |  |  |  |  |
| 消息发送测试窗口 | √ | √ | √ |  |  |  |  |  |
| Kafka 服务日志查看 |  |  |  |  |  |  |  |  |
| 操作审计日志查看 | √ | √ | √ |  |  |  |  |  |
| 提供 Kafka Manager UI |  |  |  | √ |  | √ |  |  |
| 提供 kafka export 备份功能 | √ | √ |  |  |  |  |  |  |
| 友好性帮助文档 | √ | √ | √ | √ | √ |  |  |  |
| 提供帮助用户迁入上云 | √ | √ | √ |  |  |  |  |  |

## Kafka 创建过程及开放参数

| 厂家      | 字段                                                         |
| --------- | ------------------------------------------------------------ |
| 阿里云    | 名称流量规格集群流量 = 业务流量 + 集群内副本复制流量，该规格实际业务读流量处理峰值为 50 MB/s，业务写流量处理峰值为 10 MB/s。磁盘容量数据默认 3 副本存储。实例规格为标准版时，如购买 300G 磁盘，实际存储业务的磁盘大小为 100G，其余 200G 为备份容量。实例规格为专业版时，如购买 300G 磁盘，实际存储业务的磁盘大小为 300G，额外赠送 600G 备份容量。消息保留最长时间是指在磁盘容量充足的情况下，消息的最长保留时间；在磁盘容量不足（即磁盘水位达到 85%）时，将提前删除旧的消息，以确保服务可用性；默认 72 小时，可选 24 小时 ～ 168 小时。最大消息大小，默认 1MB 边界值？标准版实例单条消息最大为 256KB，专业版实例单条消息最大为 10MB 且支持**下载**Topic 数量 |
| 腾讯云    | 名称 Kafka 版本实例规格配置存储容量消息保留时长               |
| 华为云    | 名称 Kafka 版本实例规格配置存储容量                           |
| QingCloud | 名称 Kafka 版本 Kafka 节点配置：CPU / 内存  / 节点数（规格）客户端节点配置：CPU / 内存  / 节点数（规格）Kafka-Manager / CLI）Zookeeper 实例存储容量自定义参数配置内部 Topic offset replicasKafka manager 认证 zabbix.agentkafka scale version |
| UCloud    | 名称 Kafka 版本实例规格配置 + 存储容量实例数 3`<`设定值`<`100 消息保留时长 |

## 基础设计问题

### 部署方式？

DCE5 支持多集群，Kafka 采用 operator 的方式部署，则需要先安装 Operator 模板到集群内

### 什么时间安装   Kafka-operator？

在用户创建 kafka 实例时，检测是否目标集群是否存在 kafka-operator，如果不存在则同步安装

> 什么时间移除 kafka-operator，默认情况下安装后不移除；交由 Kpanda 对集群释放时处理

### 如果支持 Kafka 多版本？

通过多版本 对应 多 Kafka-opeator 的方式，让用户进行多版本选择

### Operator 更新后，存量 Kafka 怎么办？

> 非必要需求，短期不支持

默认情况下更新了 operator 之后，不对存量做处理；后续可以做友好提示用户升级即可

## 调研对象主要功能截图

### 阿里云

#### 实例生命周期管理

> 实例创建

![CleanShot 2022-08-24 at 10.19.23.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661307586169-51f50e53-916d-4c22-b365-94403478b2cd.jpeg?x-oss-process=image/resize,w_960,m_lfit)

> 实例详情

![CleanShot 2022-08-24 at 10.20.05.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661307617207-228cff9e-97a2-45df-a072-de9161d99594.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### Kafka Topic 管理

![CleanShot 2022-08-24 at 10.18.17.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661307510049-397d57bc-29e5-4795-83f0-f08a0d91606b.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### Kafka 消息查询

![CleanShot 2022-08-24 at 10.16.43.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661307481227-28a5f677-942f-4bee-8a40-f211a0699427.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### 监控告警页面

![CleanShot 2022-08-24 at 10.20.49.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661307674273-cd48a1dc-2d56-4ac6-85ba-f7a15e9c977b.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### Topic 详情

![CleanShot 2022-08-24 at 12.27.10@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661315257657-3dd43b19-5c83-44a5-8dcf-3a7b00fdde2d.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 15.18.33@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661325524370-2d137783-d065-40cf-b0e1-f758ec574a06.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 15.18.54@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661325542835-025378a0-2813-4d38-a0ad-506012d0b7ec.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 15.19.07@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661325553902-8071ff2d-e5ce-4328-bf30-33be12a1aec0.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### Group 管理

![CleanShot 2022-08-24 at 15.19.37.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661325583058-974985e4-822b-4229-bf20-7c78e07a5ac7.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 15.19.45@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661325590879-42d393a0-93de-44fe-b71b-de31ce075c09.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 15.19.54@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661325603155-d688fe65-6f4c-4324-9244-854b7a818154.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### Prom 监控

![CleanShot 2022-08-24 at 14.28.53.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661323003273-fe3de5cc-28d0-48ab-8ead-38d8ba7b52b1.jpeg?x-oss-process=image/resize,w_960,m_lfit)

### 腾讯云

![CleanShot 2022-08-24 at 15.23.24@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661325816247-f34749aa-9d99-4a79-9295-108e9f97cbed.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### Kafka 实例生命周期管理

![CleanShot 2022-08-24 at 15.22.56@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661325788285-5a658ef6-092c-40b2-88b8-1317e29b71b4.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### 消息查询功能

![CleanShot 2022-08-24 at 15.23.44@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661325835047-bc37c5a0-919b-422a-8706-bcb444171aef.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### 数据同步任务

![CleanShot 2022-08-24 at 15.24.04@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661325851682-523521fc-491d-431d-a255-efdaa2c1fa2d.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### 迁移上云功能

![CleanShot 2022-08-24 at 15.24.21@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661325869643-c2bc8a18-17be-406d-891f-fac1348d8072.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### Topic 管理

![CleanShot 2022-08-24 at 17.18.06@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661332709528-c073dd8e-8637-4620-831b-59b714fd31ec.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 17.18.35@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661332721004-1c4aae0a-424a-4a40-89de-904f2cc9e021.jpeg?x-oss-process=image/resize,w_960,m_lfit)
[https://cloud.tencent.com/document/product/597/73566](https://cloud.tencent.com/document/product/597/73566)

#### 查看 Topic 详情

![CleanShot 2022-08-24 at 17.19.00@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661332758035-b38e4bf8-e5e5-4fc6-82ad-72d27a995c05.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### 查看 Topic 生产端连接

![CleanShot 2022-08-24 at 17.19.30@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661332800322-193f8f5e-b5cf-49d1-830c-a35496a34737.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### 发送测试消息

![CleanShot 2022-08-24 at 17.20.13@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661332849948-44c9aa3b-6fcb-42e8-8d07-91ad7dc1108b.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### Group 管理

![CleanShot 2022-08-24 at 17.21.06@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661332888749-197b7cd0-4db2-4324-a8be-523f6230e1d8.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 17.21.36@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661332903130-4aa1572a-2191-4b9a-a7d8-da430d5b664a.jpeg?x-oss-process=image/resize,w_960,m_lfit)

### 华为云

#### 实例的创建

![CleanShot 2022-08-24 at 15.26.48@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661326023773-8c1cfb61-6d36-451a-9ae8-e23253d0630a.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 15.27.28@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661326059316-df094fe7-237e-4aa3-b94c-be9015099325.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### 实例基本信息

![CleanShot 2022-08-24 at 15.44.29@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661327087509-8db8e907-fc63-46b0-8df3-de9c03f05ec1.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### 实例配置修改

![CleanShot 2022-08-24 at 15.42.03@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661326942939-93255eb4-0f4f-4d09-b4f7-c824fe2cdb7d.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### 创建 Topic

![CleanShot 2022-08-24 at 15.41.07@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661326884381-03f190c8-7371-4ee3-8222-39cf0c78bb17.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### 监控

![CleanShot 2022-08-24 at 15.41.43@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661326916095-08d2ad76-421b-481c-a81e-8bd6b402fea3.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 15.43.01@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661326990347-ab2413fc-d1c5-4875-8026-408ba05c19e0.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 15.43.16@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661327009996-7525be7c-31e7-4c94-9b88-9a9d6c06f6bb.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 15.43.40@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661327029319-18496da6-1f6c-458e-9cc2-2841da4ae21b.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 15.43.56@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661327041939-b6642928-ddb3-4f6d-9cf6-f900ff0ba7ee.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### 示例代码

![CleanShot 2022-08-24 at 15.44.07@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661327057619-5dbb3d4b-d6b8-40ec-a528-8b87e6253d62.jpeg?x-oss-process=image/resize,w_960,m_lfit)

### QingCloud

#### Kafka 实例的创建

![CleanShot 2022-08-24 at 15.59.07@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661327953531-4347c195-85b1-4284-90c9-71b2f658d20a.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 15.59.23@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661327970196-df7533af-51b5-44c1-a3e6-dc53dd345165.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 15.59.33@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661327978746-cde36af3-af9d-4818-a225-0435be7d8c70.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 15.59.43@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661327989141-65ba9381-c39d-4df4-b35f-eb30c2c0f117.jpeg?x-oss-process=image/resize,w_960,m_lfit)

> 创建时，需要关联依赖服务 zookeeper

![CleanShot 2022-08-24 at 15.59.51@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661327998858-3c6af065-aac1-4351-8e7a-3a72c803ee36.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### 实例详情

![CleanShot 2022-08-24 at 16.10.36@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661328648427-68359d73-3397-4f51-a41e-72ff088aa1da.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### Topic 管理

提供了原生的 Kafka-manager 管理 UI
[https://docsv3.qingcloud.com/middware/kafka/manual/kafka_manager/kafka_manager_topic/](https://docsv3.qingcloud.com/middware/kafka/manual/kafka_manager/kafka_manager_topic/)

访问方式，以 openvpn 的方式接入到 VPC(需绑定入口公网 IP) 后，通过 client 内网地址访问
![CleanShot 2022-08-24 at 17.57.01@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661335030256-d6d8f4ce-5450-4675-9887-d91bfc43261e.jpeg?x-oss-process=image/resize,w_960,m_lfit)

### UCloud

#### 创建实例

![CleanShot 2022-08-24 at 16.32.07@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661329936765-dc801f1f-b820-4346-8cd5-bd16f22c933b.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### Kafka 实例详情

![CleanShot 2022-08-24 at 16.36.01@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661330180680-64f2f85d-65b1-429b-a9c2-0d4a3b7e7057.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 16.36.29@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661330194590-e638d644-6d73-4008-9e73-fbd9386a739c.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 16.36.41@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661330211435-8ac8d8e4-fa63-4151-a3c4-6cd85c346c2c.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 16.36.55@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661330224056-a5b18cfb-21d8-44ab-aa10-2ec8b3225ad8.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### Kafka 节点的详情页面

![CleanShot 2022-08-24 at 16.50.34@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661331042096-143c7a92-3189-4413-b0f8-59c2e6480eb4.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 16.39.28@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661330392867-c7609d4a-72bd-45e6-b741-943c2c7711fd.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### kafka 自定义配置

![CleanShot 2022-08-24 at 16.50.13@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661331022340-2de4f944-dd32-42ea-a0ab-538044f96ab7.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### Kafka 连接器

将上游 Kafka 数据传输到 HDFS 或者 es
![CleanShot 2022-08-24 at 16.53.11@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661331196868-8af6eb6f-7690-49f8-83fa-f39297820c5f.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 16.52.58@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661331184528-87b97468-042b-479b-9051-6a49838280a2.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 16.52.43@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661331174214-c2788e65-e3a2-4080-b275-73b30ac6ed3c.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### 监控看板

![CleanShot 2022-08-24 at 16.38.11@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661330312396-375635d6-015b-447a-88c2-e5c2ad51de23.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### 创建 Topic

![CleanShot 2022-08-24 at 16.50.50@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661331056766-ea9a2a74-12bd-482a-b77c-e375e9e0bb45.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 16.38.45@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661330340573-54024fe3-75fe-4dfb-b322-a0f157e369bf.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 16.51.29@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661331099713-b943c976-ca08-4769-a4dc-710c92d899a2.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 16.51.05@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661331073008-7df8b7f5-b92b-41a2-8c7f-74cc29071bc8.jpeg?x-oss-process=image/resize,w_960,m_lfit)

### 时速云

#### 实例生命周期管理

![CleanShot 2022-08-24 at 16.59.24@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661331586127-3cd1e00a-fbed-4454-aea2-14e3bf95c393.jpeg?x-oss-process=image/resize,w_960,m_lfit)

- 需要提前安装 zookeeper
- 需要联系时速云管理员安装 kafka-cluster-operator
  - 到交付中心，找到 Operator Hub，选择 Kafka-cluster-operator 安装
  - 安装完成后，可通过 Yaml + 表单形式 创建 Kafka
- 提供 Kafka manger 原生 UI 控制台

#### Kafka 实例详情

提供原生的实例管理界面，进行配置更新等
![CleanShot 2022-08-24 at 17.56.16@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661334983034-f068a1ae-ccda-40b7-9b12-40e64bde24cc.jpeg?x-oss-process=image/resize,w_960,m_lfit)
![CleanShot 2022-08-24 at 17.47.02@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661334441012-bb78b74e-4c95-4679-a25b-52ace6645dd0.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### Kafka 实例下节点信息

直接跳转到 K8s 容器组界面查看
![CleanShot 2022-08-24 at 17.53.57@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661334844501-fd53ecb8-9194-477e-ba99-690950d32ac2.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### Topic 管理

在 Kafka manger 原生 UI 控制台内管理，默认启用了控制台公网访问能力
![CleanShot 2022-08-24 at 17.57.01@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661335035163-a487b30d-6938-4cfb-88a7-5ebbf08a4d02.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### 实例资源监控

基础 CPU、内存、网络、存储监控
![CleanShot 2022-08-24 at 17.55.38@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661334944904-59442083-e24e-4776-8e4b-3683c27e279e.jpeg?x-oss-process=image/resize,w_960,m_lfit)

#### Kafka 性能监控

接入 Grafana 提供一个 Dashboard 的，可以查看 Topics 的消息数，消费量，积压数
![CleanShot 2022-08-24 at 17.55.57@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661334965612-08293584-95c6-4220-b4e5-dcdfe2db44e1.jpeg?x-oss-process=image/resize,w_960,m_lfit)

## 调研对象操作视频录制

操作视频已上传到 OneDrive 共享空间

![CleanShot 2022-08-24 at 18.45.08@2x.jpg](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1661337926424-23d5d513-4080-4f36-af59-2bda413eb905.jpeg?x-oss-process=image/resize,w_960,m_lfit)

[https://yongyu2000hotmailcom.sharepoint.cn/:f:/s/ndx/EuCYqMaXhdlPh411YVnihRQBmCbGLQ4BvU1QW_2DX7_uUQ?e=18NyTR](https://yongyu2000hotmailcom.sharepoint.cn/:f:/s/ndx/EuCYqMaXhdlPh411YVnihRQBmCbGLQ4BvU1QW_2DX7_uUQ?e=18NyTR)

> 腾讯云只可以按月份订购，所以没有录制视频。

## 选型确认

方案一：

- 中间件实例 LCM + 三方 UI 管理工具

实现：

- Kafka 实例 LCM
- Kafka Manage UI (三方)
- 监控三件套 (Insight) [只需要做实例级别]

方案比对：

- 现有 Opeator 不带 Kafka Manger，需要自行处理
- 不需要关心 Topic LCM
- 不需要做业务监控
- 沿用现有的 DCE 中间件的设计思路

方案二：

- 不增加三方 Kafka Manage UI

实现：

- Kafka 实例 LCM
- Topic LCM
- 监控三件套 (Insight) [需要做实例 + 业务监控]

方案对比：

- 现有 Operator 带有 Topic CR，可以用
- 需要做业务监控
- 需要做 Topic LCM
- 与其他中间件模块定义不一致（当前阶段）
