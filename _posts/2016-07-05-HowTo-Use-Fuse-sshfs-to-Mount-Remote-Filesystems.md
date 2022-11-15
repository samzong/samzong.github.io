---
layout: post
title: HowTo Use Fuse-sshfs to Mount Remote Filesystems
tags: 
    - SSH
    - CentOS
categories: 
    - Linux
    - CentOS
abbrlink: 7119
date: 2016-07-05 01:58:03
---

传统我们服务器之间文件共享的方式有采用NFS、Samba等等，但是在我看来配置都有一定的复杂性，当然复杂也有它们的优势，这里推荐一个依赖于SSH的文件共享工具，Fuse-sshfs。<br>
SSH 是一个强大且安全的工具，我们除了可以用它来远程管理主机外，还可以通过它建立 SSH tunnel 作 Proxy 用，远程传输文件等等。而这里我想要介绍另外一个功能，那就是结合 sshfs 这个工具可以把远程主机的文件系统映射到本地主机上，透过 SSH 把远程文件系统挂载到本机上，这样我们可以不必使用 scp 工具就可以做到直接复制及删除远程主机的文件了，就像操作本地磁盘一样方便。
<br>sshfs 是基于 FUSE 构建的 SSH 文件系统客户端程序，通过它远程主机的配置无需作任何改变，就可以透过 SSH 协议来挂载远程文件系统了，非常方便及安全。
<br>

### Install fuse-sshfs
```
[cent@localhost ~]$ sudo yum install -y epel-relese
[cent@localhost ~]$ sudo yum --enablerepo=epel install -y fuse-sshfs
```
### 挂载远程 ssh文件系统
```
[cent@localhost ~]$ mkdir ./mnt
[cent@localhost ~]$ sshfs root@192.168.16.230:/home/ ./mnt
root@192.168.16.230's password:
[cent@localhost ~]$ mount
root@192.168.16.230:/home/ on /home/cent/mnt type fuse.sshfs (rw,nosuid,nodev,user=cent)
```
### 卸载远程 ssh文件系统
```
[cent@localhost ~]$ fusermount -u ./mnt
```
### 常用参数
```
-C 压缩，或者-o compression=yes
-o reconnect 自动重连
-o transform_symlinks 表示转换绝对链接符号为相对链接符号
-o follow_symlinks 沿用服务器上的链接符号
-o cache=yes
-o allow_other 这个参数最重要，必须写，否则任何文件都是Permission Deny
```




###  缺点
当然sshfs也不尽是优点，例如远程主机失去响应后本地挂载点卡死并影响本地系统使用，需要手工找出 sshfs进程并杀死，因网速问题造成操作响应缓慢等等，不过一般在稳定快速的网络中不太会遇上，对比其强大的功能，还是可以接受的，正所谓暇不掩瑜。

1. 所以sshfs适合内部网络比较稳定的地方
2. 配合ssh免密登录使用会更好哦
3. 可以看到的是sshfs默认挂载是rw的权限，但是通过sshfs --help 可以看到有非常详尽的参数配置可以选择，大家可以仔细研究下。


### 附1.
[Link](http://igikorn.com/sshfs-windows-8/) 在windows下可以使用sshfs.
