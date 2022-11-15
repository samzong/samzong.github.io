---
layout: post
title: HowTo Install MongoDB  on CentOS 6.x
tags: 
    - MongoDB
categories: 
    - 数据库
    - MongoDB
abbrlink: 32016
date: 2016-03-27 05:55:28
---


## 1. Overiew

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在CentOS Linux 中安装软件的方式有很多种，我会在后续的文章中整理给大家，我比较喜欢的方式是尽量用Yum 安装，不用自己动手去解决软件包之间的依赖关系，“能Yum 就Yum ，不能Yum 想着法Yum 。”  -- 这是我遵循的真理；今天给大家整理的就是如何使用Yum 来安装Mongodb ，在本文中会给出在32位与64位系统的区别，以及Mongodb 的版本，本文适用于CentOS 6/7 的Linux发行版本，所以同样适用于红帽体系的OS，如 RedHat Enterprise Linux 6/7 、 Fedora 。

## 2. Packages

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业内常用的Mongodb 的Yum 仓库有Mongodb-org 与 Mongodb-10gen ,这里提供的Mongodb-org 的repository 仓库，支持以下软件包列表：

* 2.1 mongodb-org

    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这个是源数据包，主要是用来组织自动安装下面的4个软件包.

* 2.2 mongodb-org-sever

   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 这个Mongodb Server端，包含了相关的配置和初始化脚本。

* 2.3 mongodb-org-mongos

   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 这个是Mongodb的守护进程。

* 2.4 mongodb-org-shell

    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这个是mongodb 的shell环境。

* 2.5 mongodb-org-tools

   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 这个包里包含了下列mongodb 的工具：mongoimport bsondump, mongodump, mongoexport, mongofiles, mongooplog, mongoperf, mongorestore, mongostat, and mongotop 。


## 3. 添加相对应版本的Mongodb repo file.

### 3.1 Mongodb 2.6 + OS x64

```
[root@vm02 ~]# vim /etc/yum.repos.d/mongodb-org-2.6.repo

[mongodb-org-2.6]
name=MongoDB 2.6 Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
gpgcheck=0
enabled=1

```

### 3.2 Mongodb 2.6 + OS i686

```
[root@vm02 ~]# vim /etc/yum.repos.d/mongodb-org-2.6.repo

[mongodb-org-2.6]
name=MongoDB 2.6 Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/i686/
gpgcheck=0
enabled=1

```

### 3.3 Mongodb 3.2  + OS x64

```
[root@vm02 ~]# vim /etc/yum.repos.d/mongodb-org-3.2.repo

[mongodb-org-3.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.2/x86_64/
gpgcheck=0
enabled=1

```

### 3.4 Mongodb 3.2  + OS i686

```
[root@vm02 ~]# vim /etc/yum.repos.d/mongodb-org-3.2.repo

[mongodb-org-3.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.2/i686/
gpgcheck=0
enabled=1

```

## 4. Install MongoDB

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;安装最新版本的 Mongodb ，安装都方式一样，请注意安装相对应的源保证正确安装Mongodb，请使用如下命令：

```
[root@vm02 ~]# yum clean all
[root@vm02 ~]# yum makecache
[root@vm02 ~]# yum install mongodb-org

```

## 5. Run MongoDB

### 5.1 配置SELinux

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SELinux 默认为开启状态，会导致我们的Mongodb 无法使用，解决方式有两种：

1. [关闭SELinux](http://blog.ultraera.org/centos6-x-base-settings/)
2. 添加Mongodb 通过SELinux 设定，指令如下：

```
semanage port -a -t mongod_port_t -p tcp 27017

```
> Tips: 在CentOS 7 ，SELinux 会限定你去修改Mongodb的data目录及lib目录。


### 5.2 Start MongoDB

```
[root@vm02 ~]# sudo service mongod start
Starting mongod:                                           [  OK  ]
[root@vm02 ~]#

```
### 5.3 检查MongoDB日志文件验证服务正常启动， /var/log/mongodb/mongodb.log

```
[root@vm02 ~]# cat /var/log/mongodb/mongod.log  # 看到如下内容表示mongodb启动成功了。
2016-03-24T04:09:28.582+0800 I NETWORK  [initandlisten] waiting for connections on port 27017

```

### 5.4 设置MongoDB 开机自启动

```
[root@vm02 ~]# chkconfig mongod on

```

### 5.5 设置MongoDB 允许其他服务器访问

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;默认情况下，mongodb 只监听 127.0.0.1 ，但是实际生产环境中可能需要其他服务器访问，所以这里添加监听其他网络端口，修改mongodb的配置文件：/etc/mongodb.conf

```
[root@vm02 ~]# vim /etc/mongodb.conf

# line 29 增加一行：
    bindIp: 172.16.102.129

# 注意不要把1270.0.1 去除，这会导致本地无法使用MongoDB .

```

## 6. Use MongoDB

### 6.1 检查mongodb 状态

```
[root@vm02 ~]# service mongod status
mongod (pid 6502) is running...
[root@vm02 ~]#

```

### 6.2 mongodb 自带检测工具

```
[root@vm02 ~]# mongostat
insert query update delete getmore command % dirty % used flushes  vsize   res qr|qw ar|aw netIn netOut conn                      time
    *0    *0     *0     *0       0     1|0     0.0    0.0       0 388.0M 68.0M   0|0   0|0   79b    18k    1 2016-03-24T04:25:09+08:00
    *0    *0     *0     *0       0     1|0     0.0    0.0       0 388.0M 68.0M   0|0   0|0   79b    18k    1 2016-03-24T04:25:10+08:00
    *0    *0     *0     *0       0     1|0     0.0    0.0       0 388.0M 68.0M   0|0   0|0   79b    18k    1 2016-03-24T04:25:11+08:00

```

### 6.3 进入mongodb 命令行模式

```
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

### 7.1 关闭mongodb

```
[root@vm02 ~]# service mongod stop

```

### 7.2 卸载mongodb 软件包

```
[root@vm02 ~]# yum erase $(rpm -qa | grep mongodb-org)

```

### 7.3 删除mongodb文件：数据库文件和日志文件

```
[root@vm02 ~]# rm -rf /var/log/mongodb
[root@vm02 ~]# rm -rf /var/lib/mongo

```


## 8. FAQ

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Q : Mongodb 占用99%CPU并且查询速度很慢?

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A : 数据库需要首先建立索引，类似图书的目录文件，否则当你在数据库内查找数据的时候，就类似于在整本字典一页页翻查一个字如此。












