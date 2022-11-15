---
layout: post
title: 在CentOS中配置 SFTP 环境
tags: 
    - SSH
categories: 
    - Linux
    - CentOS
abbrlink: 35680
date: 2016-03-24 14:55:03
---

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;做运维工作的，应该经常会碰到这样的问题，需要新上一个web项目，需要上传文件到服务器上，解决方法有很多种，常见的如sftp和ftp，今天讲如何使用sftp让系统用户用户上传项目的权限，并且实现chroot和无法使用ssh登录到系统。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SFTP是指SSH文件传输协议（SSH File Transfer protocol）或安全文件传输协议（Secure File Transfer Protocol），它提供了可信数据流下的文件访问、文件传输以及文件管理功能。当我们为SFTP配置chroot环境后，只有被许可的用户可以访问，并被限制到他们的家目录中，换言之：被许可的用户将处于牢笼环境中，在此环境中它们甚至不能切换它们的目录。

### 1. 测试环境

* MacBook Pro 15-inch i7 16GB
* VMware Fushion 8 Pro
* Transmit （ SFTP tools for Mac ）

```
[root@test ~]# cat /etc/issue
CentOS release 6.6 (Final)
Kernel \r on an \m
[root@test ~]# rpm -qa | grep openssh-server
openssh-server-5.3p1-104.el6.i686
```

### 2. 实验步骤

##### 2.1 增加一个sftpusers用户组
```
[root@test ~]# groupadd sftpusers
```

##### 2.2 创建一个用户user01，并分配给sftpusers用户组
```
[root@test ~]# useradd -g sftpusers user01
```

##### 2.3 修改用户家目录及指定不能登录shell
```
[root@test ~]# mkdir /sftp/
[root@test ~]# usermod -s /sbin/nologin -d /sftp/user01 -m user01
```

##### 2.4 给用户创建密码（注意密码不明文显示）
```
[root@test ~]# passwd user01
Changing password for user user01.
New password:
BAD PASSWORD: it is too simplistic/systematic
BAD PASSWORD: is too simple
Retype new password:
passwd: all authentication tokens updated successfully.
[root@test ~]#
```

#### 2.5 修改ssh的配置文件，如下设置
```
[root@test ~]# ll /etc/ssh/sshd_config
-rw-------. 1 root root 3879 Oct 15  2014 /etc/ssh/sshd_config
[root@test ~]# vim /etc/ssh/sshd_config

# line 132
#Subsystem      sftp    /usr/libexec/openssh/sftp-server    #注释
Subsystem       sftp    internal-sftp        #修改为internal-sftp

# add this lines at the end of file
Match Group sftpusers        #指定一下参数仅适用的用户组sftpusers
    X11Forwarding no
    AllowTcpForwarding no
    ChrootDirectory %h       #设置chroot将用户锁在家目录，%h=家目录
    ForceCommand internal-sftp    #该参数强制执行内部sftp
```

##### 2.6 重启ssh服务
```
[root@test ~]# /etc/init.d/sshd restart
Stopping sshd:                                             [  OK  ]
Starting sshd:                                             [  OK  ]
```

##### 2.7 设置用户家目录权限,(注意权限不能大于0755)
```
[root@test ~]# chmod 0755 /sftp/user01/
[root@test ~]# chown root /sftp/user01/
[root@test ~]# chgrp -R sftpusers /sftp/user01/
```

##### 2.8 关于上传,根目录无法上传文件。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因为用户家目录属主是root，并且权限最大0755，所以没法写，我的解决方法是在在家目录建立一个文件夹，作为上传目录，并把属主给user01即可。

```
[root@test ~]# mkdir /sftp/user01/upload
[root@test ~]# chown user01:sftpusers /sftp/user01/upload/
```


### 3. 测试验证
##### 3.1 Linux 登录测试
```
[root@test ~]# su - user01
This account is currently not available.    #su - 切换失败

[root@test ~]# cat /etc/passwd | tail -1
user01:x:500:500::/sftp/user01:/sbin/nologin

[root@test ~]# ssh user01@localhost
The authenticity of host 'localhost (::1)' can't be established.
RSA key fingerprint is f3:fc:31:dc:7d:16:d5:ad:8c:bc:eb:69:8f:b2:0b:c9.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'localhost' (RSA) to the list of known hosts.
user01@localhost's password:
This service allows sftp connections only.    #ssh登录也失败，ssh设置成功
Connection to localhost closed.

[root@test ~]# sftp user01@localhost
Connecting to localhost...
user01@localhost's password:
sftp> ls
upload
sftp> pwd
Remote working directory: /
sftp>

```

##### 3.2 SFTP 工具测试
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我这里使用的是Mac，但是传统的文件传输工具都差不多，Windows下有Winscp、Xftp等。




