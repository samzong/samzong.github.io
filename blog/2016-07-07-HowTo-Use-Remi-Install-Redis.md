---
title: HowTo Use Remi Install Redis
tags: [CentOS]
date: 2016-07-07 03:49:02
---

## Setup 1. Install

Frist, To install remi Repo and epel Repo.

### Remi EL6 for CentOS/RHEL 6.x

```bash
rpm -Uvh https://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm
```

### Remi EL5 for CentOS/RHEL 5.x

```bash
rpm -Uvh https://dl.fedoraproject.org/pub/epel/5/x86_64/epel-release-5-4.noarch.rpm
rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-5.rpm
```

### 有时间我们会碰到 remi.repo 无法使用报错，就像这样

```bash
http://remi.schlundtech.de/enterprise/latest/remi/x86_64/repodata/repomd.xml: [Errno 14] PYCURL ERROR 22 - "The requested URL returned error: 404 Not Found"
```

### 这时我们需要修改/etc/yum.repos.d/remi.repo，像这样

```bash
baseurl=http://rpms.famillecollet.com/enterprise/5/remi/$basearch/
#mirrorlist=http://rpms.famillecollet.com/enterprise/5/remi/mirror/$basearch/
```

#### 如果发现安装后 yum makecache 没看到相应的源站点，请检查 repo 文件的 enable 参数是否为 1，1 为开启，0 为关闭状态

```bash
[repoName]
name=repoName repo
baseurl=http://repoPath
gpgcheck=0                # 是否启用gpgkey检查
enabled=0                 # 是否启用该源
```

### Install Redis

```bash
yum install -y redis

[root@zabbix yum.repos.d]# rpm -qi redis
Name        : redis
Version     : 3.2.1
Release     : 2.el5.remi
Architecture: x86_64
Install Date: Thu 28 Jul 2016 12:00:41 PM CST
Group       : Applications/Databases
Size        : 2113279
License     : BSD
Signature   : DSA/SHA1, Fri 24 Jun 2016 01:30:12 PM CST, Key ID 004e6f4700f97f56
Source RPM  : redis-3.2.1-2.el5.remi.src.rpm
Build Date  : Fri 24 Jun 2016 01:28:27 PM CST
Build Host  : builder.remirepo.net
Relocations : (not relocatable)
Packager    : http://blog.remirepo.net/
Vendor      : Remi Collet
URL         : http://redis.io
Summary     : A persistent key-value database
```

## Setup 2. 基本配置项

### Redis 配置默认文件/etc/redis.conf

设置 Redis 的运行模式，yes 表示后台运行，no 表示不开启后台运行。

```bash
daemonize yes
```

指定 redis 监听端口，默认为 6379

```bash
port 6379
```

设置 bind_ip，默认监听接口，默认是监听本地，如果未配置的情况下，只有本地可以访问 redis，如果取消，则默认监听所有接口

```bash
# bind 127.0.0.1
```

指定日志记录级别

```bash
# debug  记录很多信息，用于开发和测试
# varbose 很多精简的有用信息，不像 debug 会记录那么多
# notice 普通的 verbose，常用于生产环境
# warning 只有非常重要或者严重的信息会记录到日志

loglevel verbose
```

配置 log 文件名称和全路径地址，默认为 stdout，即标准输出，输出到/dev/null，可以手动指定 redis 日志文件地址，建议级别不要太高，否则会产生大量日志，注意避免磁盘因此撑满。

```bash
logfile stdout
```

＃ 可用数据库数，默认值为 16，默认数据库存储在 DB 0 号 ID 库中，无特殊需求，建议仅设置一个数据库
＃ 查询数据库使用  SELECT 'dbid'，dbid 介于 0 到 'databases'-1 之间。

```bash
database 16
```

- 安全限定，要求客户端在处理任何命令时都要验证身份和设置密码。
- 默认不启用，若要启用，需要将下行取消注释，并将 foobared 设置自定一的密码接即可。
- 因为 redis 加密是通过配置文件进行，所以目前各大云厂家的 redis PAAS 服务，都不支持 redis 加密，在程序开发时需要注意。

```bash
# requirepass foobared

# 如果开启了安全验证，这时通过redis-cli登录时需要首先执行auth，否则不能正常使用。
redis-cli> auth foobared
```

向 redis 内插入一条数据

```bash
redis-cli>  set [key] [values]
```

获取 key 的值

```bash
redis-cli> get key
```

查看 redis 的 db 信息

```bash
redis-cli> info
```

## Setup 3. Others

- redis-dump
- master/slave
- slow log
