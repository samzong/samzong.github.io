---
layout: post
title: HowTo Automatic Updates CENTOS/RHEL Using YUM
tags: 
    - CentOS
categories: 
    - Linux
    - CentOS
abbrlink: 60468
date: 2017-02-19 09:56:42
---

大家若工作遇到需要管理的Linux集群机器较多时，同时我们知道系统的安全更新补丁维护这些非常重要，无论你在安装时优化维护做的再好，随着时间的推移，如果不去更新的话，系统早晚都会不安全，所以定期更新我们的系统补丁是一个运维人员的基本工作内容



### Install yum-cron

```
sudo yum install -y yum-cron
```

因为我的服务器系统多为CentOS 6，6的配置文件在<code>/etc/sysconfig/yum-cron</code>，你可以用以下命令查看配置文件位置：

```
rpm -ql yum-cron
/etc/cron.daily/0yum.cron
/etc/rc.d/init.d/yum-cron
/etc/sysconfig/yum-cron
/etc/yum/yum-daily.yum
/etc/yum/yum-weekly.yum
/usr/share/doc/yum-cron-3.2.29
/usr/share/doc/yum-cron-3.2.29/COPYING
/usr/share/man/man8/yum-cron.8.gz
```



### Configure “/etc/sysconfig/yum-cron”

yum-cron的默认设置是会在每天自动检查和安装系统更新包，在安装完成后有些配置需要注意下：

##### 1. 对于不需要更新的可以忽略掉

```
YUM_PARAMETER="--exclude='kernel*' --exclude='php*'"
```

##### 2. 设置管理员邮箱

```
MAILTO="luchuanjia@msn.com"
```

##### 3. 不自动安装，仅检查，通知管理邮箱

```
CHECK_ONLY=yes
```

##### 4. 不自动安装，仅下载

```
DOWNLOAD_ONLY=yes
```



### Automatic Starting yum-cron

```
chkconfig yum-cron on
```

