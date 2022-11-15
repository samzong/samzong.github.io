---
layout: post
title: Dockerfile Run at M1 processor build failed
toc: true
author: samzong.lu
author_id: defaultAuthorId
language: en
tags:
  - Docker
  - Apple M1
categories:
  - 虚拟化
  - Docker
abbrlink: 45311
date: 2022-04-17 20:32:00
---

## Apple M1 processor

在使用了 Apple M1 的笔记本后，在 docker 使用遇到了一些问题，这里做些笔记记录下来


## pull image error

> Error "no matching manifest for linux/arm64/v8 in the manifest list entries"

在我尝试想要 pull 下来时，得到上面的一个错误；同样的问题，我在编写 Dockerfile 和 docker-compose.yml 都遇到这样的问题


### docker-compose.yml

```yaml
version: '3.9'

services:
  # Database
  db:
    image: mysql-server:5.7
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: pass
      MYSQL_DATABASE: wp
      MYSQL_USER: wp
      MYSQL_PASSWORD: wp
    networks:
      - wpsite    
```

### 解决思路

需要指定下 `plaform` ，当我运行在 Apple M1上，变更部分如下：

```
services:
  # Database
  db:
    platform: linux/x86_64  # set platform
    image: mysql-server:5.7
    ...
```

如果只是在 docker pull 时，增加指定参数即可：

```sh
docker pull --plaform linux/x84_64 mysql-server:5.7
```