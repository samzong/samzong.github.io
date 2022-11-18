---
layout: post
title: Redash for Docker 部署
tags:
  - Redash
  - BI
category:
  - BI
url: https://www.yuque.com/samzong/code/kfrygp
---

**暗坑很多**

## 部署过程

1. 需要自行维护一个 env 作为配置文件.

<!---->

    REDASH_COOKIE_SECRET=a07cca441ab9f28b66c589f3118e0de48469b1bc6a5036eade7badbed305d96e
    POSTGRES_HOST_AUTH_METHOD=trust
    REDASH_REDIS_URL=redis://redis:6379/0
    REDASH_DATABASE_URL=postgresql://postgres

2. 需要创建一个 postgres-data 并配置 docker-compose.yml 的路径，数据库持久化
3. 需要给 postgres 容器增加 sudo 命令
   1. apk add sudo
4. 需要手工进入到 postgresql 容器内创建 role 和 database
   1. createuser -U postgres redash
   2. createdb -U postgres redash
5. 执行数据库初始化动作
6. docker-compose run --rm server create\_db
7. 然后重启 redash 全部服务即可 docker-compose down 后重启

> postgresql 在执行 psql 命令时，默认会读取当前系统用户作为执行 role；但 psql 默认用户是 postgres

<https://redash.io/help/open-source/setup>
<https://redash.io/help/open-source/dev-guide/docker>
<https://docs.victoriametrics.com/url-examples.html#apiv1exportcsv>

[https://mp.weixin.qq.com/s?src=11\&timestamp=1660629444\&ver=3985\&signature=verv70veamW*Ez2Sgc8e89yMJGwANIOzz4lfwbezyVV3wpWNT2d9SnGrDecUOwrbTJBR2o-Ax6ZS4Fpu2UxfX7Sy9xsk1LCXfY1wNr42ucl3tFePfJ7c536c8z*L-HOy\&new=1](https://mp.weixin.qq.com/s?src=11\&timestamp=1660629444\&ver=3985\&signature=verv70veamW*Ez2Sgc8e89yMJGwANIOzz4lfwbezyVV3wpWNT2d9SnGrDecUOwrbTJBR2o-Ax6ZS4Fpu2UxfX7Sy9xsk1LCXfY1wNr42ucl3tFePfJ7c536c8z*L-HOy\&new=1)

<https://mp.weixin.qq.com/s?src=11&timestamp=1660682601&ver=3986&signature=h8m0RzEX3qWsKcUo6Ee3azdsnzLQqUf3N8FdLhyWNa52U4vAvlbEaBFUCrTZnh54tT-YS2mODfkp-6Hemmzt3n*hzGHlEmXP-HO5830W0Fzmn4MMfnsOPBKLrcjaiU0h&new=1>

- redash env 配置: <https://redash.io/help/open-source/admin-guide/env-vars-settings>
- postgres 权限问题 <https://stackoverflow.com/a/25051632/5067657>
- <https://techoverflow.net/2021/05/07/how-to-fix-alpine-linux-ash-sudo-not-found/>
- <https://discuss.redash.io/t/error-99-connecting-to-localhost-6379-cannot-assign-requested-address/9716/7>

## 启动的服务介绍

    v10-redashio_adhoc_worker_1     # 执行查询任务的 worker
    v10-redashio_postgres_1       # 数据库
    v10-redashio_redis_1        # 缓存
    v10-redashio_scheduled_worker_1   # 执行计划任务的 worker
    v10-redashio_scheduler_1      # 计划任务管理 server
    v10-redashio_server_1        # 主体 server

以上主要会设计到 3 个镜像，redis、pgsql、redash，其中核心是 redash，所以关注镜像版本也是这个

## 版本升级

redash 的版本升级较为方便，更换 server 的镜像；然后升级数据库即可。

> 测试过从 v8 升级到 v10 , 和 v9 升级到 v10 ，都是 ok 的.

1. 关闭 Redash 服务
   1. `docker-compose stop server scheduler scheduled_worker adhoc_worker`
2. 更新 docker-compose.yml
   1. 基本上这一步，只需要更新 redash 的镜像版本即可
   2. 然后执行 `docker-compose pull` 拉取新镜像版本
3. 执行数据库升级
   1. `docker-compose run --rm server manage db upgrade`
4. 启动全部服务即可
   1. `docker-compse up -d`

## 解决 ES 的HTTPS问题

由于我们的 es 地址访问地址采用 https，但为自签证书，所以在 request 之中会有些问题， 所以我在这里更新了 elasticsearch 的插件，然后将其上传到我个人的 docker hub.
<https://hub.docker.com/r/samzong/redash>

> 带来的问题，页面上无法选择到 Elasticsearch 作为数据源，没时间去研究了

看了下还是可以使用 redash 的 API 去创建的 `/api/data_sources`

```json
{
    "options": {
        "basic_auth_password": "-----",
        "basic_auth_user": "elastic",
        "server": "https://10.6.51.101:31001/",
        "skip_tls_verification": true
    },
    "type": "elasticsearch",
    "name": "test-es"
}
```

创建完成后，就可以在页面上更新了。
