---
layout: post
title: MacTips 使用命令关闭和启动AirPort
tags: 
    - Mac
categories: 
    - Mac
abbrlink: 1007
date: 2017-02-27 23:40:29
---

今天在给妹妹调试新的MacBookAir 13’时遇到一个问题，无法检测到她家的WiFi，一开始怀疑是不是无线路由器长时间未重启导致，所以重启了路由器，但是问题依然没有解决，于是我们将问题转向排查设备，因我们基本正好有iPad，iPhone，MacBook这些设备，发现唯独他的这个Macbook无法识别WiFi，后来在Google的帮助下，发现多个版本的Mac OS X都出现了类似的问题，可以通过重启AirPort解决问题，但是AirPort在System Preferences找不到选项，所以需要使用命令行来重启。

##### **查看网络接口**
```
ifconfig
en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
	ether 60:f8:1d:ad:85:76
	inet6 fe80::18a9:fa23:b02f:5d8a%en0 prefixlen 64 secured scopeid 0x4
	inet 192.168.199.200 netmask 0xffffff00 broadcast 192.168.199.255
	nd6 options=201<PERFORMNUD,DAD>
	media: autoselect
	status: active
```
##### **关闭AirPort**
有时候设备的名称是en0、en1这样，所以，可以用过设备名称来重启airport，例如en0
```
networksetup -setairportpower en0 off
```

##### **查看状态**
```
networksetup -getairportpower en0
```

##### **关闭AirPort**
```
networksetup -setairportpower en0 on
```
