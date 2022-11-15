---
layout: post
title: 利用 Linux 计划任务定时同步 MySQL
tags: 
    - MySQL
    - CentOS
    - Shell
categories: 
    - 数据库
    - MySQL
abbrlink: 49810
date: 2016-03-24 08:03:32
---

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 说下实际项目场景，公司一个应用已部署主从数据库，业务也正式上线；现在客户公司领导希望可以看到每天的业务数据报表，本设定直接到从库拿数据，然后进行数据处理，生成报表，但是Java同事提出需求新增用户和权限表，这样一来，如果直接使用生产库的表会导致后台系统管理人员与领导的账户和权限混淆，经过讨论决定，按照生产库的表结构新增特殊用户表和权限表；这样操作实际是可以在从库上新增表单，且不影响主从库之间的数据同步，但是从安全性的考虑，新增表单设计需要给用户Insert权限，为了保证从库只有利用主库同步写入数据，则只能给其他用户select权限。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>最终决定，因为报表系统的使用率低，直接在报表系统的服务器安装本地mysql数据库，通过计划任务定时到从库上同步数据。</b>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

### 1. 测试环境
*  MacBook Pro 15‘ i7 16GB
*  VMware Fushion 8 Pro
*  MySQL Version 5.6
*  CentOS Linux 6.x
*  slave Server ：172.16.102.129
*  local Server ：172.167.102.133


### 2. 利用mysqldump导出sql文件

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;需要注意的是，mysqldump时会锁表，需要给mysqldump传递 <i>“--single-transaction”</i>  参数，可以使得mysqldump时不锁表，如下：

```
/usr/bin/mysqldump -h 172.168.102.129 -u dbuser -pdbuser --single-transaction slave > slave.sql
```

### 3. 使用mysql恢复sql文件到数据库中

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;需要注意的是，如果该local server的slave库中有数据表，当表名与slave server的表名相同时，数据表内的数据会被覆盖；如果local server的表在slave.sql中不存在，则不受影响，正是利用这个特性解决用户需求。

```
/usr/bin/mysql -u dbuser -pdbuser report < /home/.mysql/slave.sql
```

### 4. 编写脚本

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 首先在本地某一位置作为临时sql存储地址：
```
[root@report ~]# mkdir /home/.mysql     # 这个目录可以自定义
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  脚本1：

```
#!/bin/bash

TIME=`date "+%Y%m%d%H"`

rm -rf /home/.mysql/*

/usr/bin/mysqldump -h 172.168.102.129 -u dbuser -pdbuser --single-transaction slave > /home/.mysql/slave_$TIME.sql

/usr/bin/mysql -u dbuser -pdbuser report < /home/.mysql/slave_$TIME.sql

```
### 5. 增加邮件通知功能

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 因为前期同事需要得知备份的执行结果，所以希望数据同步成功后获得邮件提醒，这里使用sendmail实现，在CentOS里预装是没有安装sendmail，所以我们需要安装sendmail服务，另外一个安装命令行邮件工具mailx：

```
[root@report ~]# yum install -y sendmail mailx

......

[root@report ~]# service sendmail start
Starting sendmail:                                         [  OK  ]
Starting sm-client:                                        [  OK  ]
[root@report ~]# chkconfig sendmail on

```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  完整脚本：report_sync.sh ，如下：

```
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

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  查看下邮件通知：
![](http://blog.ultraera.org:80/content/images/2016/03/24/p01.jpg)



### 6. 计划任务crontab

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;和同事及客户沟通，确认每天1、5、9、13、17、21整时到从库拉去数据，Linux选择使用crontab做计划任务，crontab命令常见于Unix和类Unix的操作系统之中，用于设置周期性被执行的指令。该命令从标准输入设备读取指令，并将其存放于“crontab”文件中。通常，crontab储存的指令被守护进程激活， crond常常在后台运行，每一分钟检查是否有预定的作业需要执行。这类作业一般称为cron jobs。

#### 6.1 安装crontab

```
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

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;将脚本report_sync.sh 保存到/usr/bin下：

```
[root@report ~]# mv report_sync.sh /usr/bin
```


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;增加计划任务：

```
[root@report ~]# crontab -e

# add this word.
* 1-21/4  * * * /usr/bin/report_sync.sh

# 表示在每天的1-21时间内，每4小时执行一个脚本

```














