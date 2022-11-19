---
layout: post
title: HowTo Install MongoDB  on CentOS 6.x
tags: 
    - MongoDB
categories: 
    - 数据库
    - MongoDB
date: 2016-03-27 05:55:28
---


## 1. Overiew

在 CentOS Linux 中安装软件的方式有很多种，我会在后续的文章中整理给大家，我比较喜欢的方式是尽量用 Yum 安装，不用自己动手去解决软件包之间的依赖关系，“能 Yum 就 Yum，不能 Yum 想着法 Yum。”  -- 这是我遵循的真理；今天给大家整理的就是如何使用 Yum 来安装 Mongodb，在本文中会给出在 32 位与 64 位系统的区别，以及 Mongodb 的版本，本文适用于 CentOS 6/7 的 Linux 发行版本，所以同样适用于红帽体系的 OS，如 RedHat Enterprise Linux 6/7、Fedora。

## 2. Packages

业内常用的 Mongodb 的 Yum 仓库有 Mongodb-org 与 Mongodb-10gen ,这里提供的 Mongodb-org 的 repository 仓库，支持以下软件包列表：

* 2.1 mongodb-org

    这个是源数据包，主要是用来组织自动安装下面的 4 个软件包。

* 2.2 mongodb-org-sever

    这个 Mongodb Server 端，包含了相关的配置和初始化脚本。

* 2.3 mongodb-org-mongos

    这个是 Mongodb 的守护进程。

* 2.4 mongodb-org-shell

    这个是 mongodb 的 shell 环境。

* 2.5 mongodb-org-tools

    这个包里包含了下列 mongodb 的工具：mongoimport bsondump, mongodump, mongoexport, mongofiles, mongooplog, mongoperf, mongorestore, mongostat, and mongotop。

## 3. 添加相对应版本的 Mongodb repo file

### 3.1 Mongodb 2.6 + OS x64

```bash
[root@vm02 ~]# vim /etc/yum.repos.d/mongodb-org-2.6.repo

[mongodb-org-2.6]
name=MongoDB 2.6 Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
gpgcheck=0
enabled=1

```

### 3.2 Mongodb 2.6 + OS i686

```bash
[root@vm02 ~]# vim /etc/yum.repos.d/mongodb-org-2.6.repo

[mongodb-org-2.6]
name=MongoDB 2.6 Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/i686/
gpgcheck=0
enabled=1

```

### 3.3 Mongodb 3.2  + OS x64

```bash
[root@vm02 ~]# vim /etc/yum.repos.d/mongodb-org-3.2.repo

[mongodb-org-3.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.2/x86_64/
gpgcheck=0
enabled=1

```

### 3.4 Mongodb 3.2  + OS i686

```bash
[root@vm02 ~]# vim /etc/yum.repos.d/mongodb-org-3.2.repo

[mongodb-org-3.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.2/i686/
gpgcheck=0
enabled=1

```

## 4. Install MongoDB

安装最新版本的 Mongodb，安装都方式一样，请注意安装相对应的源保证正确安装 Mongodb，请使用如下命令：

```bash
[root@vm02 ~]# yum clean all
[root@vm02 ~]# yum makecache
[root@vm02 ~]# yum install mongodb-org

```

## 5. Run MongoDB

### 5.1 配置 SELinux

SELinux 默认为开启状态，会导致我们的 Mongodb 无法使用，解决方式有两种：

1. [关闭 SELinux](http://blog.ultraera.org/centos6-x-base-settings/)
2. 添加 Mongodb 通过 SELinux 设定，指令如下：

```bash
semanage port -a -t mongod_port_t -p tcp 27017

```

> Tips: 在 CentOS 7，SELinux 会限定你去修改 Mongodb 的 data 目录及 lib 目录。

### 5.2 Start MongoDB

```bash
[root@vm02 ~]# sudo service mongod start
Starting mongod:                                           [  OK  ]
[root@vm02 ~]#

```

### 5.3 检查 MongoDB 日志文件验证服务正常启动， /var/log/mongodb/mongodb.log

```bash
[root@vm02 ~]# cat /var/log/mongodb/mongod.log  # 看到如下内容表示mongodb启动成功了。
2016-03-24T04:09:28.582+0800 I NETWORK  [initandlisten] waiting for connections on port 27017

```

### 5.4 设置 MongoDB 开机自启动

```bash
[root@vm02 ~]# chkconfig mongod on

```

### 5.5 设置 MongoDB 允许其他服务器访问

默认情况下，mongodb 只监听 127.0.0.1，但是实际生产环境中可能需要其他服务器访问，所以这里添加监听其他网络端口，修改 mongodb 的配置文件：/etc/mongodb.conf

```bash
[root@vm02 ~]# vim /etc/mongodb.conf

# line 29 增加一行：
    bindIp: 172.16.102.129

# 注意不要把1270.0.1 去除，这会导致本地无法使用MongoDB .

```

## 6. Use MongoDB

### 6.1 检查 mongodb 状态

```bash
[root@vm02 ~]# service mongod status
mongod (pid 6502) is running...
[root@vm02 ~]#

```

### 6.2 mongodb 自带检测工具

```bash
[root@vm02 ~]# mongostat
insert query update delete getmore command % dirty % used flushes  vsize   res qr|qw ar|aw netIn netOut conn                      time
    *0    *0     *0     *0       0     1|0     0.0    0.0       0 388.0M 68.0M   0|0   0|0   79b    18k    1 2016-03-24T04:25:09+08:00
    *0    *0     *0     *0       0     1|0     0.0    0.0       0 388.0M 68.0M   0|0   0|0   79b    18k    1 2016-03-24T04:25:10+08:00
    *0    *0     *0     *0       0     1|0     0.0    0.0       0 388.0M 68.0M   0|0   0|0   79b    18k    1 2016-03-24T04:25:11+08:00

```

### 6.3 进入 mongodb 命令行模式

```bash
[root@vm02 ~]# mongo
MongoDB shell version: 3.2.4
connecting to: test
Server has startup warnings:
2016-03-24T04:09:28.577+0800 I CONTROL  [initandlisten]
2016-03-24T04:09:28.577+0800 I CONTROL  [initandlisten] ** WARNING: /sys/kernel/mm/transparent_hugepage/enabled is 'always'.
2016-03-24T04:09:28.577+0800 I CONTROL  [initandlisten] **        We suggest setting it to 'never'
2016-03-24T04:09:28.577+0800 I CONTROL  [initandlisten]
2016-03-24T04:09:28.577+0800 I CONTROL  [initandlisten] ** WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'.
2016-03-24T04:09:28.577+0800 I CONTROL  [initandlisten] **        We suggest setting it to 'never'
2016-03-24T04:09:28.577+0800 I CONTROL  [initandlisten]
2016-03-24T04:09:28.577+0800 I CONTROL  [initandlisten] ** WARNING: soft rlimits too low. rlimits set to 1024 processes, 64000 files. Number of processes should be at least 32000 : 0.5 times number of files.
2016-03-24T04:09:28.577+0800 I CONTROL  [initandlisten]
>

```

## 7. Uninstall MongoDB

### 7.1 关闭 mongodb

```bash
[root@vm02 ~]# service mongod stop

```

### 7.2 卸载 mongodb 软件包

```bash
[root@vm02 ~]# yum erase $(rpm -qa | grep mongodb-org)

```

### 7.3 删除 mongodb 文件：数据库文件和日志文件

```bash
[root@vm02 ~]# rm -rf /var/log/mongodb
[root@vm02 ~]# rm -rf /var/lib/mongo

```

## 8. FAQ

Q : Mongodb 占用 99%CPU 并且查询速度很慢？

A : 数据库需要首先建立索引，类似图书的目录文件，否则当你在数据库内查找数据的时候，就类似于在整本字典一页页翻查一个字如此。
