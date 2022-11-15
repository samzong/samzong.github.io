---
layout: post
title: Metabase 上手 - 使用 Jar 运行
toc: true
author: samzong.lu
author_id: defaultAuthorId
language: zh
tags:
  - Metabase
categories:
  - OpenSource
  - Metabase
abbrlink: 49743
date: 2022-04-16 02:40:00
---

## Metabase Documentation

这里主要是 metabase 的部署和使用方法，以及相关的组件的使用方法。

我正在打造一个中文环境下 Metabase 交互的社群，如果你有任何关于 Metabase 的问题，请联系我们：

> Metabase 中文交流 **https://t.me/metabase_zh**

## Installation

Metabase 的安装方式有三种：

- 以Jar包的形式，在本地运行，只需要简单的步骤即可 **(本文)**
- 以 Docker 容器的形式，部署到服务器上

以Jar的方式来运行相对简单，对环境依赖也是比较少，只要的电脑上有 JDK 就可以了。

### 检查 Java 环境

```bash
java -version

=> java version "1.8.0_311"
=> Java(TM) SE Runtime Environment (build 1.8.0_311-b11)
=> Java HotSpot(TM) 64-Bit Server VM (build 25.311-b11, mixed mode)
```

Metabase 要求 Java 8 及以上，如果你的环境不支持，请先升级

### 获取 Metabase 的 Jar 包

> https://metabase.com/start/jar.html

通过上方这个链接，可以很快的获取到 Metabase 的最新版本的 Jar 包


### 启动 Metabase

```bash
java -jar metabase.jar
```

通过一个简单的命令，就可以启动 Metabase 了，这个命令会自动检查环境，如果环境没问题，就会自动启动 Metabase 了。

> 生产环境的 MetaBase 路径是 /data/product/metabase/

成功启动后，Metabase 会运行在 3000 端口

> http://localhost:3000/

### 以后台方式运行 Metabase

```bash
nohup java -jar metabase.jar > metabase.log 2>&1 &
```

日志文件会保存在本地的 metabase.log 文件中，如果你想查看 Metabase 的日志，可以使用 tail -f metabase.log 来查看。

## Configuration


### 配置 Metabase 的数据库

Metabase 默认的采用的是H2的作为数据库存储，会存放在程序运行目录下的 `data` 目录下；但对于在正式环境中启用 Metabase，我们建议使用 MySQL 来作为数据库存储。

而指定 Metabase 的数据库配置，可以很方便的加载到系统的默认环境中:

```bash

vim ~/.bashrc

# update metabase config at .bashrc
export MB_DB_TYPE=mysql
export MB_DB_DBNAME=metabase
export MB_DB_PORT=3306
export MB_DB_USER=
export MB_DB_PASS=
export MB_DB_HOST=
export MB_DB_CONNECTION_URI="mysql://MB_DB_HOST:MB_DB_PORT/MB_DB_DBNAME?user=MB_DB_USER&password=MB_DB_PASS"
export JAVA_TIMEZONE=Asia/Shanghai
```

### 配置 Metabase 的 Nginx

通过配置 Metabase 的 Nginx，可以让 Metabase 在网站上运行，这样可以开放外部服务给使用者

对 Nginx 的配置，比较简单，可以参考这个文档：

```bash
server {
	listen 443 ssl;
	server_name example.com;
	root /var/www/example.com/public;

	# reverse proxy
	location /mb/ {
		proxy_pass http://127.0.0.1:3000;
		proxy_set_header Host $Host;
	}
}
```

> overseas-metabase 的 配置文件放在 /etc/nginx/config.d/leyan.core 下，在 80.conf 内 引用

### 配置 Metabase 的 ClickHouse 插件

> Metabase 官方支持数据库 https://www.metabase.com/docs/latest/administration-guide/01-managing-databases.html#officially-supported-databases

Metabase 默认支持非常丰富数据库驱动，这些都会预置在 Jar 内，例如 MySQL、Oracle、SQL Server；但是 ClickHouse 不在其中，所以我们需要独立进行安装。

ClickHouse 驱动: https://github.com/enqueue/metabase-clickhouse-driver#readme=

- 下载 **合适的** 驱动版本，放在 Metabase 的目录下的 plugin 文件夹下
- 重新启动 Metabase 即可
- 在 Metabase 的数据库管理中新增数据库，选择类型为 ClickHouse

> 更多三方驱动: https://www.metabase.com/docs/latest/developers-guide-drivers.html#how-to-use-a-community-built-driver


## Tips

### 1. 如何重启 Metabase ?

直接杀掉进程即可，如果为了以后方便，可以将下述命令保存为 stop.sh 放在目录下，后续直接执行

```shell
APP_NAME="metabase"

ps aux | grep python | grep ${APP_NAME} | awk '{print $2}' | xargs kill -9
```