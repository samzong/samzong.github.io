---
layout: post
title: Denyhosts增加服务器SSH黑名单机制
tags: 
    - DenyHosts
    - Tools
categories: 
    - Linux
    - CentOS
abbrlink: 21712
date: 2016-11-23 16:24:40
---



##### 查看当前服务器失败登录的统计：
```
cat /var/log/secure | awk '/Failed/{print $(NF-3)}' | sort | uniq -c | sort -n |  awk '{print $2" = "$1}'
```
##### Install denyhosts
```
# 需要预先安装epel源
sudo yum install -y epel-release
sudo yum install -y denyhosts
```
##### 配置文件解析
默认配置文件/etc/denyhosts。
```
# 查看的sshd日志文件
SECURE_LOG = /var/log/secure

# 将阻止IP写入的配置文件
HOSTS_DENY = /etc/hosts.deny

# 过多久之后清除，其中w代表周，d代表天，h代表小时，s代表秒，m代表分钟。
PURGE_DENY = 4h

# 阻止的服务名称
BLOCK_SERVICE  = sshd

# 允许无效用户（在/etc/passwd未列出）登录失败次数,允许无效用户登录失败的次数.
DENY_THRESHOLD_INVALID = 1

# 允许普通用户登录失败的次数
DENY_THRESHOLD_VALID = 5

# 允许root登录失败的次数
DENY_THRESHOLD_ROOT = 2
DENY_THRESHOLD_RESTRICTED = 1

# 设定 deny host 写入到该资料夹
WORK_DIR = /var/lib/denyhosts

# 将deny的host或ip纪录到Work_dir中
SUSPICIOUS_LOGIN_REPORT_ALLOWED_HOSTS=YES

# 是否做域名反解
HOSTNAME_LOOKUP=YES

# 将DenyHOts启动的pid纪录到LOCK_FILE中，已确保服务正确启动，防止同时启动多个服务。
LOCK_FILE = /var/lock/subsys/denyhosts

# 设置管理员邮件地址
ADMIN_EMAIL = luchuanjia@msn.com
SMTP_HOST = localhost
SMTP_PORT = 25
SMTP_FROM = DenyHosts <nobody@localhost>
SMTP_SUBJECT = DenyHosts Report from $[HOSTNAME]

# 有效用户登录失败计数归零的时间
AGE_RESET_VALID=1d

# root用户登录失败计数归零的时间
AGE_RESET_ROOT=25d

# 用户的失败登录计数重置为0的时间(/usr/share/denyhosts/data/restricted-usernames)
AGE_RESET_RESTRICTED=25d

# 无效用户登录失败计数归零的时间
AGE_RESET_INVALID=10d

# denyhosts的日志文件位置
DAEMON_LOG = /var/log/denyhosts

# denyhosts的轮询时间
DAEMON_SLEEP = 30s

# 该项与PURGE_DENY 设置一样，也是清除hosts.deny中 ssh用户的时间
DAEMON_PURGE = 1h
```

##### FAQ

1. 如果想删除一个已经禁止的主机IP，并加入到允许主机例表，只在 /etc/hosts.deny 删除是没用的,还需要以下：
```
/var/lib/denyhosts 目录，进入以下操作：
# 停止denyhosts服务
sudo service denyhosts stop

# 进入denyhosts的目录
cd /var/lib/denyhosts

# 查看哪些文件添加了ssh限制,将IP_addr替换成你的IP
sudo grep IP_addr /usr/share/denyhosts/data/*

# 然后一个个删除文件中你想取消的主机IP所在的行:
/usr/share/denyhosts/data/hosts
/usr/share/denyhosts/data/hosts-restricted
/usr/share/denyhosts/data/hosts-root
/usr/share/denyhosts/data/hosts-valid
/usr/share/denyhosts/data/users-hosts

# 添加你想允许的主机IP地址到allowed-hosts:
sudo echo IP_addr >>/usr/share/denyhosts/data/allowed-hostsps

# 启动 DenyHosts服务：
 service denyhosts start
```

##### Tips

* 尽量是用key验证登录服务器
* 尽量从固定IP点登录服务器，然后将该地址加入白名单
