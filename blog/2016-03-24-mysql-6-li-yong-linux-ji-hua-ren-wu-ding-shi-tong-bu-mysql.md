---
title: 利用 Linux 计划任务定时同步 MySQL
tags: [MySQL]
date: 2016-03-24 08:03:32
---

 说下实际项目场景，公司一个应用已部署主从数据库，业务也正式上线；现在客户公司领导希望可以看到每天的业务数据报表，本设定直接到从库拿数据，然后进行数据处理，生成报表，但是 Java 同事提出需求新增用户和权限表，这样一来，如果直接使用生产库的表会导致后台系统管理人员与领导的账户和权限混淆，经过讨论决定，按照生产库的表结构新增特殊用户表和权限表；这样操作实际是可以在从库上新增表单，且不影响主从库之间的数据同步，但是从安全性的考虑，新增表单设计需要给用户 Insert 权限，为了保证从库只有利用主库同步写入数据，则只能给其他用户 select 权限。

**最终决定，因为报表系统的使用率低，直接在报表系统的服务器安装本地 mysql 数据库，通过计划任务定时到从库上同步数据。**

### 1. 测试环境

* MacBook Pro 15' i7 16GB
* VMware Fushion 8 Pro
* MySQL Version 5.6
* CentOS Linux 6.x
* slave Server : 172.16.102.129
* local Server : 172.167.102.133

### 2. 利用 mysqldump 导出 sql 文件

需要注意的是，mysqldump 时会锁表，需要给 mysqldump 传递“--single-transaction”参数，可以使得 mysqldump 时不锁表，如下：

```bash
/usr/bin/mysqldump -h 172.168.102.129 -u dbuser -pdbuser --single-transaction slave > slave.sql
```

### 3. 使用 mysql 恢复 sql 文件到数据库中

需要注意的是，如果该 local server 的 slave 库中有数据表，当表名与 slave server 的表名相同时，数据表内的数据会被覆盖；如果 local server 的表在 slave.sql 中不存在，则不受影响，正是利用这个特性解决用户需求。

```bash
/usr/bin/mysql -u dbuser -pdbuser report < /home/.mysql/slave.sql
```

### 4. 编写脚本

 首先在本地某一位置作为临时 sql 存储地址：

```bash
[root@report ~]# mkdir /home/.mysql     # 这个目录可以自定义
```

脚本 1：

```bash
#!/bin/bash

TIME=`date "+%Y%m%d%H"`

rm -rf /home/.mysql/*

/usr/bin/mysqldump -h 172.168.102.129 -u dbuser -pdbuser --single-transaction slave > /home/.mysql/slave_$TIME.sql

/usr/bin/mysql -u dbuser -pdbuser report < /home/.mysql/slave_$TIME.sql

```

### 5. 增加邮件通知功能

 因为前期同事需要得知备份的执行结果，所以希望数据同步成功后获得邮件提醒，这里使用 sendmail 实现，在 CentOS 里预装是没有安装 sendmail，所以我们需要安装 sendmail 服务，另外一个安装命令行邮件工具 mailx：

```bash
[root@report ~]# yum install -y sendmail mailx

......

[root@report ~]# service sendmail start
Starting sendmail:                                         [  OK  ]
Starting sm-client:                                        [  OK  ]
[root@report ~]# chkconfig sendmail on

```

  完整脚本：report_sync.sh，如下：

```bash
#!/bin/bash

TIME=`date "+%Y%m%d%H"`

rm -rf /home/.mysql/*

/usr/bin/mysqldump -h 172.168.102.129 -u dbuser -pdbuser --single-transaction slave > /home/.mysql/slave_$TIME.sql

/usr/bin/mysql -u dbuser -pdbuser report < /home/.mysql/slave_$TIME.sql

# send mail to adminuser
if [ $? -eq 0 ]
then
        echo "report SQL sync is successfully. At time: `date` " | mail -s report-sync-successfully  hello@abc.cn
else
        echo " Error Error report SQL sync is Error. At time: `date` " | mail -s report-sync-error  hello@abc.cn
fi

```

  查看下邮件通知：
![image](images/p01_16cc841e.jpg)

### 6. 计划任务 crontab

和同事及客户沟通，确认每天 1、5、9、13、17、21 整时到从库拉去数据，Linux 选择使用 crontab 做计划任务，crontab 命令常见于 Unix 和类 Unix 的操作系统之中，用于设置周期性被执行的指令。该命令从标准输入设备读取指令，并将其存放于“crontab”文件中。通常，crontab 储存的指令被守护进程激活，crond 常常在后台运行，每一分钟检查是否有预定的作业需要执行。这类作业一般称为 cron jobs。

#### 6.1 安装 crontab

```bash
[root@report ~]# yum install -y vixie-cron
[root@report ~]# yum install -y crontabs

说明：
vixie-cron软件包是cron的主程序；
crontabs软件包是用来安装、卸装、或列举用来驱动 crond 守护进程的表格的程序。

cron 是linux的内置服务，但它不自动起来，可以用以下的方法启动、关闭这个服务：
/sbin/service crond start #启动服务
/sbin/service crond stop #关闭服务
/sbin/service crond restart #重启服务
/sbin/service crond reload #重新载入配置

设置crond开机自启动
[root@report ~]# chkconfig crond on

```

### 7. 添加计划任务

将脚本 report_sync.sh 保存到/usr/bin下：

```bash
[root@report ~]# mv report_sync.sh /usr/bin
```

增加计划任务：

```bash
[root@report ~]# crontab -e

# add this word.
* 1-21/4  * * * /usr/bin/report_sync.sh

# 表示在每天的1-21时间内，每4小时执行一个脚本

```
