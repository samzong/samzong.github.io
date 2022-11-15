---
layout: post
title: HowTo Setup MariaDB Galera Cluster 10 On CentOS 6.x
tags: 
    - MariaDB
    - CentOS
categories: 
    - 数据库
    - MySQL
abbrlink: 49414
date: 2016-08-04 13:14:15
---

####  介绍
<p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MariaDB Galera Cluster 是一套在MySQL InnoDB存储引擎上面实现multi-master及数据实时同步的系统架构，业务层面无需做读写分离工作，数据库读写压力都能按照既定的规则分发到 各个节点上去。在数据方面完全兼容 MariaDB 和 MySQL。使用MariaDB Galera的解决方案，可以方便快速的搭建出高可用的数据库Cluster，不是主备模式，而是双活模式，也就是说，没有主节点和备份节点，每个节点都可以看做是主节点，都可以进行读写，由Galera来实现底层的数据同步。
</p>

* 真正的多主架构，任何节点都可以进行读写
* 同步复制，各节点间无延迟且节点宕机不会导致数据丢失
* 紧密耦合，所有节点均保持相同状态
* 自动节点配置，无需手工备份当前数据库并拷贝至新节点

####  实验环境

* Cluster node4 IP address 172.16.102.168
* Cluster node5 IP address 172.16.102.165
* Cluster node6 IP address 172.16.102.164
* setenforce 0；sed -i 's/SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config
* /etc/init.d/iptables stop;chkconfig iptables off

> 使用vmware 测试需注意:克隆机器需要删除 <code>/etc/udev/rules.d/70-persistent-net.rules</code> 以及<code>/etc/sysconfig/network-scripts/ifcfg-eth0</code>中的网卡mac地址选项，不然网卡起不来

####  环境检测
* 检查iptables状态：/etc/init.d/iptables status;chkconfig --list | grep iptables
* 检查selinux状态：getenforce
* 检查openssh-client包是否安装：系统中是否有ssh命令
* 检查是否系统中含有mysql相关的包：rpm -qa | grep mysql，有的话都需要卸载掉
* 检查网络是否通畅：ping www.baidu.com

#### 安装
##### 1. 在所有节点编辑/etc/hosts
```
[root@node4 ~]# vi /etc/hosts

127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6

# add follows
172.16.102.164 node6
172.16.102.165 node5
172.16.102.168 node4

[root@node4 ~]#

# 依次在node5和node6上编辑/etc/hosts
```

##### 2. 在所有node上安装 MariaDB Galera
```
[root@node4 ~]# vi /etc/yum.repos.d/mariadb.repo
 # MariaDB 10.0 CentOS repository list
# http://mariadb.org/mariadb/repositories/
[mariadb]
name = MariaDB
baseurl = http://yum.mariadb.org/10.0/centos6-amd64
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1
enabled=0

[root@node4 ~]# yum --enablerepo=mariadb -y install MariaDB-Galera-server

# 依次在node5和node6上安装 MariaDB-Galera-server
```

> <i>注意安装完成之后，不要启动mysql</i>

##### 3. 在其中一个节点上编辑/etc/my.cnf.d/server.cnf配置文件
```
[root@node4 ~]# vi /etc/my.cnf.d/server.cnf
# 19 行，取消下面的注释，并修改为需求
[galera]
wsrep_provider=/usr/lib64/galera/libgalera_smm.so
# 指定节点地址，这里也可以使用ip,如果没做安装1，可以直接把cluster的ip写在这里。
wsrep_cluster_address="gcomm://node4,node5,node6"
binlog_format=row
default_storage_engine=InnoDB
innodb_autoinc_lock_mode=2
bind-address=0.0.0.0

# add follows
# cluster name
wsrep_cluster_name="Visionet_MariaDB_Cluster"
# replication provider
wsrep_sst_method=rsync
# own IP address
wsrep_node_address="172.16.102.168"
wsrep_node_name="node4"

# 启动数据库
[root@node4 ~]# /etc/rc.d/init.d/mysql bootstrap
Starting MySQL. SUCCESS!

# 初始化你的数据库
[root@node4 ~]# mysql_secure_installation
```

##### 4. 在其它节点上编辑/etc/my.cnf.d/server.cnf配置文件

##### node5
```
[root@node5 ~]# vi /etc/my.cnf.d/server.cnf
# 19 行，取消下面的注释，并修改为需求
[galera]
wsrep_provider=/usr/lib64/galera/libgalera_smm.so
# 指定节点地址，这里也可以使用ip,如果没做安装1，可以直接把cluster的ip写在这里。
wsrep_cluster_address="gcomm://node4,node5,node6"
binlog_format=row
default_storage_engine=InnoDB
innodb_autoinc_lock_mode=2
bind-address=0.0.0.0

# add follows
# cluster name
wsrep_cluster_name="Visionet_MariaDB_Cluster"
# replication provider
wsrep_sst_method=rsync

# 以下内容注意，注意应设置为当前服务器信息
wsrep_node_address="172.16.102.165"
wsrep_node_name="node5"

# 启动数据库
[root@node5 ~]# /etc/rc.d/init.d/mysql start
Starting MySQL...SST in progress, setting sleep higher. SUCCESS!
```

##### node6
```
[root@node6 ~]# vi /etc/my.cnf.d/server.cnf
# 19 行，取消下面的注释，并修改为需求
[galera]
wsrep_provider=/usr/lib64/galera/libgalera_smm.so
# 指定节点地址，这里也可以使用ip,如果没做安装1，可以直接把cluster的ip写在这里。
wsrep_cluster_address="gcomm://node4,node5,node6"
binlog_format=row
default_storage_engine=InnoDB
innodb_autoinc_lock_mode=2
bind-address=0.0.0.0

# add follows
# cluster name
wsrep_cluster_name="Visionet_MariaDB_Cluster"
# replication provider
wsrep_sst_method=rsync

# 以下内容注意，注意应设置为当前服务器信息
wsrep_node_address="172.16.102.164"
wsrep_node_name="node6"

# 启动数据库
[root@node6 ~]# /etc/rc.d/init.d/mysql start
Starting MySQL...SST in progress, setting sleep higher. SUCCESS!
```

> 注意：只需要初始化第一个节点服务器的数据库，其他数据的配置文件会自动同步，所以你给node4设置的root可以在node5和node6直接使用，当然这是安装正确的前提。

#### 登陆各个节点数据库检查配置是否成功

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;server.cnf的配置如果没有问题，那么wsrep\_local\_state_comment的状态应该是Synced。
```
[root@node4 ~]# mysql -u root -p
Enter password:
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 15
Server version: 10.0.26-MariaDB-wsrep MariaDB Server, wsrep_25.13.raf7f02e

Copyright (c) 2000, 2016, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> show status like 'wsrep_local_state_comment';
+---------------------------+--------+
| Variable_name             | Value  |
+---------------------------+--------+
| wsrep_local_state_comment | Synced |
+---------------------------+--------+
1 row in set (0.01 sec)

MariaDB [(none)]>
```

####  结论

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MariaDB Galera没有主节点和备份节点，配置成功之后，可以在任何一个node节点上操作会自动同步到其他节点，任何一个节点宕机不会影响其他节点的数据和稳定性，配置HAProxy设置VIP的方式来实现负载均衡，提高服务的高可用性，另外，当宕机节点上线之后，事务会自动同步不丢失。







