---
title: Docker for Mac 网络技巧
tags: []
---

在 Windows 和 Linux 中使用 Docker，可以通过 docker0 这个网络 IP，在容器内访问宿主机的端口及服务

```shell
➜  ~ ifconfig
docker0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
        ether 02:42:65:e2:82:de  txqueuelen 0  (Ethernet)
        RX packets 19240  bytes 9107695 (8.6 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 16989  bytes 9952021 (9.4 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

但以上在 macOS 中无 docker0 端口，那我们如何在 Docker for Mac 中访问宿主机的服务呢？

> docker.for.mac.host.internal

可以采用以上本地域名内实现在容器内访问 宿主机的服务
