---
layout: post
title: CentOS 7 Configure DNS Server
tags: 
   - CentOS
categories:
   - Linux
   - CentOS
abbrlink: 3568
---


今天介绍下如何在CentOS 7下部署DNS Server，测试环境中服务端搭建在了CentOS 7，客户端分别在Windows和Linux实现测试。

因为目的是让自建DNS服务器解析公司内部的自定义域名，所以当客户端需要访问外网域名时，DNS服务器会将解析请求转发给ISP的DNS服务器，并会将解析结果缓存，并且只对内网主机的解析请求进行转发，而不会对公网的主机解析请求进行转发。

#### DNS服务介绍
DNS服务由BIND提供，启动后服务名为`named`，管理工具为`rndc`，debug工具为`dig`，主要配置文件在`/etc/named.conf`。

#### 安装
推荐选择`bind-chroot`来安装，提高服务的安全性：
```shell
➜  ~ yum install -y bind-chroot
```

安装完成之后，启动`named-chroot`服务，并设置为开机自启动：
```shell
➜  ~ systemctl enable named-chroot.service
Created symlink from /etc/systemd/system/multi-user.target.wants/named-chroot.service to /usr/lib/systemd/system/named-chroot.service.
➜  ~ systemctl start named-chroot.service
➜  ~ netstat -ntlp | grep 53
tcp        0      0 127.0.0.1:53            0.0.0.0:*               LISTEN      4515/named
tcp        0      0 127.0.0.1:953           0.0.0.0:*               LISTEN      4515/named
```

#### 配置
首先备份DNS服务端的主配置文件，然后修改其中的内容：
```shell
➜  ~ cp /etc/named.conf /etc/named.conf.bak
➜  ~ vim /etc/named.conf

options {
        listen-on port 53 { any; };
        listen-on-v6 port 53 { ::1; };
        directory       "/var/named";
        dump-file       "/var/named/data/cache_dump.db";
        statistics-file "/var/named/data/named_stats.txt";
        memstatistics-file "/var/named/data/named_mem_stats.txt";
        
        allow-query     { 192.168.16.0/24; 192.168.0.0/23; };
        recursion yes;
        allow-recursion { 192.168.16.0/24; 192.168.0.0/23; };
        
        forward first;
        forwarders { 202.96.209.133; 114.114.114.114; };
        
        dnssec-enable no;
        dnssec-validation no;
        dnssec-lookaside no;

        bindkeys-file "/etc/named.iscdlv.key";
        managed-keys-directory "/var/named/dynamic";

        pid-file "/run/named/named.pid";
        session-keyfile "/run/named/session.key";
};

logging {
        channel default_debug {
                file "data/named.run";
                severity dynamic;
        };
};

zone "." IN {
        type hint;
        file "named.ca";
};

// 新增一个samzong.local域名.
zone "samzong.local" IN {
    type master;
    file "samzong.local.zone";
};

include "/etc/named.rfc1912.zones";
include "/etc/named.root.key";
```

#### 编辑samzong.local.zone配置文件
首先创建samzong.local.zone文件：
```
➜  ~ cd /var/named
➜  named touch samzong.local.zone;
```
然后编辑文件内容新增：
```shell
$TTL 86400
@ IN SOA @ root.samzong.local. (
    2016042112 ;Serial
    3600 ;Refresh
    1800 ;Retry
    604800 ;Expire
    43200 ;Minimum TTL
)

        NS  @
        A       10.0.2.6
www     A       192.168.16.100
a   IN  CNAME   www.baidu.com.
b       A       192.168.16.101
```
编辑完成之后，重新启动named-chroot让服务生效：
```shell
➜  named systemctl restart named-chroot.service
```

#### 客户端验证
```shell
➜  named nslookup www.samzong.local
Server:		192.168.16.6
Address:	192.168.16.6#53

Name:	www.samzong.local
Address: 192.168.16.100
```

#### 使用rndc管理DNS解析记录
rndc 常用指令：
```shell
status          显示bind服务器的工作状态
reload          重新加载配置文件和区域文件
reload zone     重新加载指定的zone
reconfig        重新读取配制间并加载新增的zone
querylog        关闭或开启查询日志
dumpdb          将高速缓存转存到文件,named.conf 有指定文件位置
freeze          暂停更新所有zone状态
```


