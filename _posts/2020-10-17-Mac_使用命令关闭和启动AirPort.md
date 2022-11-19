---
layout: post
title: Mac:使用命令关闭和启动 AirPort
tags:
  - Mac
category:
  - Mac
url: https://www.yuque.com/samzong/ap/mactips-shi-yong-ming-ling-guan-bi-he-qi-dongairpo-4701029
---

在调试新的 MacBookAir 13’时遇到一个问题，无法检测到她家的 WiFi，一开始怀疑是不是无线路由器长时间未重启导致，所以重启了路由器，但是问题依然没有解决，于是我们将问题转向排查设备，因我们基本正好有 iPad，iPhone，MacBook 这些设备，发现唯独他的这个 Macbook 无法识别 WiFi，后来在 Google 的帮助下，发现多个版本的 Mac OS X 都出现了类似的问题，可以通过重启 AirPort 解决问题，但是 AirPort 在 System Preferences 找不到选项，所以需要使用命令行来重启。

##### **查看网络接口**

    ifconfig
    en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
     ether 60:f8:1d:ad:85:76
     inet6 fe80::18a9:fa23:b02f:5d8a%en0 prefixlen 64 secured scopeid 0x4
     inet 192.168.199.200 netmask 0xffffff00 broadcast 192.168.199.255
     nd6 options=201<PERFORMNUD,DAD>
     media: autoselect
     status: active

##### **关闭 AirPort**

有时候设备的名称是 en0、en1 这样，所以，可以用过设备名称来重启 airport，例如 en0

    networksetup -setairportpower en0 off

##### **查看状态**

    networksetup -getairportpower en0

##### **关闭 AirPort**

    networksetup -setairportpower en0 on
