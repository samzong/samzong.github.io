---
title: 使用 canal 进行数据库增量同步
tags: [Tools, MySQL]
---

![image.png](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/1662586780206-7328e88e-c0e3-4e2f-ac6d-e072747efc4a.png?x-oss-process=image/resize,w_960,m_lfit)

## 简介

![image](http://ipic-typora-samzong.oss-cn-qingdao.aliyuncs.com//uPic/20191104101735947.png?x-oss-process=image/resize,w_960,m_lfit)

**canal \[kə'næl]**，译意为水道/管道/沟渠，主要用途是基于 MySQL 数据库增量日志解析，提供增量数据订阅和消费

早期阿里巴巴因为杭州和美国双机房部署，存在跨机房同步的业务需求，实现方式主要是基于业务 trigger 获取增量变更。从 2010 年开始，业务逐步尝试数据库日志解析获取增量变更进行同步，由此衍生出了大量的数据库增量订阅和消费业务。

基于日志增量订阅和消费的业务包括

- 数据库镜像
- 数据库实时备份
- 索引构建和实时维护 (拆分异构索引、倒排索引等)
- 业务 cache 刷新
- 带业务逻辑的增量数据处理

当前的 canal 支持源端 MySQL 版本包括 5.1.x , 5.5.x , 5.6.x , 5.7.x , 8.0.x

## 工作原理

### MySQL 主备复制原理

<!-- ![image](../assets/ev1v2m/468c1a14-e7ad-3290-9d3d-44ac501a7227.jpg) -->

- MySQL master 将数据变更写入二进制日志 ( binary log, 其中记录叫做二进制日志事件 binary log events，可以通过 show binlog events 进行查看)
- MySQL slave 将 master 的 binary log events 拷贝到它的中继日志 (relay log)
- MySQL slave 重放 relay log 中事件，将数据变更反映它自己的数据

### canal 工作原理

- canal 模拟 MySQL slave 的交互协议，伪装自己为 MySQL slave，向 MySQL master 发送 dump 协议
- MySQL master 收到 dump 请求，开始推送 binary log 给 slave (即 canal )
- canal 解析 binary log 对象 (原始为 byte 流)

## 文档支持

- [Home](https://github.com/alibaba/canal/wiki/Home)
- [Introduction](https://github.com/alibaba/canal/wiki/Introduction)
- [QuickStart](https://github.com/alibaba/canal/wiki/QuickStart)
  - [Docker QuickStart](https://github.com/alibaba/canal/wiki/Docker-QuickStart)
  - [Canal Kafka/RocketMQ QuickStart](https://github.com/alibaba/canal/wiki/Canal-Kafka-RocketMQ-QuickStart%22)
  - [Aliyun RDS for MySQL QuickStart](https://github.com/alibaba/canal/wiki/aliyun-RDS-QuickStart)
  - [Prometheus QuickStart](https://github.com/alibaba/canal/wiki/Prometheus-QuickStart)
- Canal Admin
  - [Canal Admin QuickStart](https://github.com/alibaba/canal/wiki/Canal-Admin-QuickStart)
  - [Canal Admin Guide](https://github.com/alibaba/canal/wiki/Canal-Admin-Guide)
  - [Canal Admin ServerGuide](https://github.com/alibaba/canal/wiki/Canal-Admin-ServerGuide)
  - [Canal Admin Docker](https://github.com/alibaba/canal/wiki/Canal-Admin-Docker)
- [AdminGuide](https://github.com/alibaba/canal/wiki/AdminGuide)
- [ClientExample](https://github.com/alibaba/canal/wiki/ClientExample)
- [ClientAPI](https://github.com/alibaba/canal/wiki/ClientAPI)
- [Performance](https://github.com/alibaba/canal/wiki/Performance)
- [DevGuide](https://github.com/alibaba/canal/wiki/DevGuide)
- [BinlogChange(MySQL 5.6)](https://github.com/alibaba/canal/wiki/BinlogChange%28mysql5.6%29)
- [BinlogChange(MariaDB)](https://github.com/alibaba/canal/wiki/BinlogChange%28MariaDB%29)
- [TableMetaTSDB](https://github.com/alibaba/canal/wiki/TableMetaTSDB)
- [ReleaseNotes](http://alibaba.github.com/canal/release.html)
- [Download](https://github.com/alibaba/canal/releases)
- [FAQ](https://github.com/alibaba/canal/wiki/FAQ)

## 多语言

canal 特别设计了 client-server 模式，交互协议使用 protobuf 3.0 , client 端可采用不同语言实现不同的消费逻辑，欢迎大家提交 pull request

- canal java 客户端：[https://github.com/alibaba/canal/wiki/ClientExample](https://github.com/alibaba/canal/wiki/ClientExample)
- canal c# 客户端：[https://github.com/dotnetcore/CanalSharp](https://github.com/dotnetcore/CanalSharp)
- canal go 客户端：[https://github.com/CanalClient/canal-go](https://github.com/CanalClient/canal-go)
- canal php 客户端：[https://github.com/xingwenge/canal-php](https://github.com/xingwenge/canal-php)
- canal Python 客户端：[https://github.com/haozi3156666/canal-python](https://github.com/haozi3156666/canal-python)
- canal Rust 客户端：[https://github.com/laohanlinux/canal-rs](https://github.com/laohanlinux/canal-rs)
- canal Nodejs 客户端：[https://github.com/marmot-z/canal-nodejs](https://github.com/marmot-z/canal-nodejs)

canal 作为 MySQL binlog 增量获取和解析工具，可将变更记录投递到 MQ 系统中，比如 Kafka/RocketMQ，可以借助于 MQ 的多语言能力

- 参考文档：[Canal Kafka/RocketMQ QuickStart](https://github.com/alibaba/canal/wiki/Canal-Kafka-RocketMQ-QuickStart)

## 资料整理

canal 的策略是模拟了 MySQL Slave 的行为，因此需要有 SELECT, REPLICATION SLAVE, REPLICATION CLIENT 的权限
