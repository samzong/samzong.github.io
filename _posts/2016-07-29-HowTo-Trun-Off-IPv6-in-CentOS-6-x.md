---
layout: post
title: HowTo Trun Off IPv6 in CentOS 6.x
tags: 
    - CentOS
categories: 
    - Linux
    - CentOS
abbrlink: 58055
date: 2016-07-29 07:26:19
---

## 1. CentOS 6.x

CentOS 6 上是默认打开了IPv6，但其实在我们实际使用中很难用到它，所以本篇的内容就是如何关闭IPv6。

＃ 可以看到 inet6 ，说明还没关闭。
```
[root@ultraera ~]# ifconfig eth0
eth0      Link encap:Ethernet  HWaddr 00:0C:29:3A:F9:6F
          inet addr:172.16.102.161  Bcast:172.16.102.255  Mask:255.255.255.0
          inet6 addr: fe80::20c:29ff:fe3a:f96f/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:199 errors:0 dropped:0 overruns:0 frame:0
          TX packets:122 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:20124 (19.6 KiB)  TX bytes:17182 (16.7 KiB)
```

＃ 修改/etc/modprobe.d/dist.conf
```
[root@ultraera ~]# vi /etc/modprobe.d/dist.conf
# 添加下面两行内容
alias net-pf-10 off
alias ipv6 off
# 保存退出，并且重新启动系统

# 开机不启动
[root@ultraera ~]# chkconfig ip6tables off
```

＃ 系统重启完成后，检查是否加载IPv6
```
[root@ultraera ~]# lsmod | grep v6
```

＃ 补充

* 修改/etc/sysconfig/network，追加
```
NETWORKING_IPV6=no
```

* 修改/etc/hosts文件，把ipv6的那句本地主机名解析的也注释掉
```
#::1   localhost localhost6 localhost6.localdomain6
```

<br>

## 2. CentOS 7.x

#### Setup 1. 修改grub文件，在启动引导时不加载ipv6
```
[root@ultraera ~]# vim /etc/default/grub

# 在GRUB_CMDLINE_LINUX=" " ,中增加
ipv6.disable＝1

# 重新生产启动引导文件，注意，这里重启系统是没用的，需要手动重建引导文件
[root@ultraera ~]# grub2-mkconfig -o /boot/grub2/grub.cfg
[root@ultraera ~]# reboot
```

＃ 验证是否关闭
```
[root@ultraera ~]# lsmod | grep ipv6
```

#### Setup 2. 第二种方式
```
# 修改/etc/sysctl.conf,增加以下：
net.ipv6.conf.all.disable_ipv6 = 1

reboot
```
> IPv6是默认支持的，所以当你要重新开起IPv6支持时，将以上添加的指令注释掉即可。

> <font color=red><b>之前碰到过安装某些服务时，不能启动，后来检查原因是因为关闭ipv6的问题，因为在这些服务的conf文件，指定了类似监听ipv6,因为关闭了ipv6导致服务无法启动，将其关闭即可。<b></font>

