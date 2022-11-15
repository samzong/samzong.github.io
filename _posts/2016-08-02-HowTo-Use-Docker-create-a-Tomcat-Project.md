---
layout: post
title: HowTo Use Docker create a Tomcat Project
tags: 
    - Docker
categories: 
    - 虚拟化
    - Docker
abbrlink: 20023
date: 2016-08-02 15:44:20
---

#### **1. 安装CentOS 7.x**
    略。
#### **2. 安装docker**
详见： [How to Install Docker on CentOS 6.x](https://samzong.me/2016/07/07/HowTo-Install-Docker-on-CentOS-6-x/)
#### **3. 基础docker命令**
```
＃ 获取centos6 docker镜像
[root@docker ~]# docker pull centos6
Using default tag: latest
latest: Pulling from library/centos:centos6

43db9dbdcb30: Downloading 41.14 MB/49.33 MB
43db9dbdcb30: Pull complete
2dc64e8f8d4f: Pull complete
670a583e1b50: Pull complete
183b0bfcd10e: Pull complete
Digest: sha256:c6674c44c6439673bf56536c1a15916639c47ea04c3d6296c5df938add67b54b
Status: Downloaded newer image for centso:centos6

＃ 查看当前服务器上的docker镜像
[root@docker ~]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
centos6-visionet    latest              aeed37612ecb        6 hours ago         1.916 GB
centos              centos6             a3c09d36ab4a        2 days ago          194.6 MB
registry            latest              c6c14b3960bd        3 days ago          33.28 MB
＃ 查找docker镜像
[root@docker ~]# docker search centos:centos6
NAME                                     DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
imagine10255/centos6-lnmp-php56          centos6-lnmp-php56                              10                   [OK]
lemonbar/centos6-ssh                     Installed openssh-server on centos6, defau...   7                    [OK]
sergeyzh/centos6-nginx                                                                   2                    [OK]
guyton/centos6                           From official centos6 container with full ...   2                    [OK]
paijp/centos6-apache-php-sqlite2         php5.3.3 with sqlite2 and apache on CentOS...   1                    [OK]
edrans/centos6                                                                           1                    [OK]
mohri1219/centos6.7-ruby2.2.2-mysql5.6   centos6.7-ruby2.2.2-mysql5.6                    1                    [OK]
...
...

＃ 删除 centos6 docker镜像
[root@docker ~]# docker rmi IMAGES_NAME
[root@docker ~]# docker rmi centos:centos6
# 报错无法删除
Error response from daemon: conflict: unable to remove repository reference "centos" (must force) - container 705a30cbc002 is using its referenced image 42118e3df429
# 这是因为之间的运行的进程没有清楚导致该images正在使用中，使用一下命令查看占有的进程
[root@docker ~]# docker ps -a ＃ 查看所有的docker进程
CONTAINER ID        IMAGE               COMMAND               CREATED             STATUS                     PORTS               NAMES
705a30cbc002        centos:centos6              "/bin/bash"           6 minutes ago       Exited (0) 6 minutes ago                       centos6
[root@docker ~]# docker rm 705a30cbc002
705a30cbc002
[root@docker ~]# docker rmi centos:centos6
Untagged: centos:centos6
Deleted: sha256:42118e3df429f09ca581a9deb3df274601930e428e452f7e4e9f1833c56a100a
Deleted: sha256:d72d0199021776e77ac14a764a3decd156e9f6f18b37e25b867b0f1ca42fb3d9
Deleted: sha256:fb178c6cea1453d089ce033b96eba0efdb42274138e042517ea2d5ea7bb51665
Deleted: sha256:8945af30572845a904adce2aeaf73402c842d86e99e8f10688b25cb27834110b
Deleted: sha256:ea9f151abb7e06353e73172dad421235611d4f6d0560ec95db26e0dc240642c1
```

#### **4. 运行一个docker镜像**
#### 进入交互式程序
```
[root@docker ~]# docker run  -it centos:centos6 /bin/bash
[root@c1d190f95562 /]# cat /etc/redhat-release
CentOS release 6.8 (Final)
# Install openssh-server and httpd
root@d8c122dbe09d:/# yum install -y openssh-sever httpd
root@d8c122dbe09d:/# exit

# 注意当你执行exit，从容器之中退出时，容器也会随着关闭，这时如果还继续执行上条命令
# 你会发现之前所有的操作都被还原，因为相对于docker，又是新开了一个进程
# 在exit退出之后，使用一下命令查看上次提交，然后commit修改，便可保存之前的修改

[root@docker ~]# docker ps -l
[root@docker ~]# docker commit c1d190f95562 centos:centos6-httpd
sha256:77eb12e36c7bbe9ef874555b1873019022b5258740aa731627e2cd6fa749c325
[root@docker ~]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
centos              centos6-httpd       77eb12e36c7b        3 seconds ago       290.3 MB
centos6-visionet    latest              aeed37612ecb        6 hours ago         1.916 GB
centos              centos6             a3c09d36ab4a        2 days ago          194.6 MB
registry            latest              c6c14b3960bd        3 days ago          33.28 MB
```

#### **5. 编辑Dockerfile**
```
# dockfile的第一行一定是FROM，指定了父镜像
FROM centos:centos6

# RUN 指的是运行的命令
RUN yum install -y epel-release
RUN yum install -y bash-completion
RUN yum install -y openssh-server openssh-client sudo
RUN sed -i 's/UsePAM yes/UsePAM no/g' /etc/ssh/sshd_config
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# 增加一个用户，并赋予sudo权限
RUN useradd visionet
RUN echo "visionet:visionet" | chpasswd
RUN echo "visionet   ALL=(ALL)       ALL" >> /etc/sudoers

＃ 注意，如果没有执行一下两个命令，sshd是无法远程登陆的
RUN ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key
RUN ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key

＃ EXPOSE 22， 将22端口暴露出来，方便ssh远程连接
RUN mkdir /var/run/sshd
EXPOSE 22
＃ CMD 为系统内部执行命令
CMD ["/usr/sbin/sshd", "-D"]
```

#### **6. 生成自定义docker镜像**
```
# build 编译镜像
[root@docker ~]# docker build -f dockerfile3 -t centos:centos6-ssh .
Sending build context to Docker daemon 44.54 kB
Step 1 : FROM centos:centos6
 ---> a3c09d36ab4a
Step 2 : RUN yum install -y epel-release
 ---> Using cache
 ---> 04d81f280a63
Step 3 : RUN yum install -y bash-completion
 ---> Using cache
 ---> 5ca26894dc9d
Step 4 : RUN yum install -y openssh-server openssh-client sudo
 ---> Using cache
 ---> 42278450311e
Step 5 : RUN sed -i 's/UsePAM yes/UsePAM no/g' /etc/ssh/sshd_config
 ---> Using cache
 ---> db35bef562a2
Step 6 : RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
 ---> Using cache
 ---> dc9f2b82e198
Step 7 : RUN useradd visionet
 ---> Using cache
 ---> 06c574a51755
Step 8 : RUN echo "visionet:visionet" | chpasswd
 ---> Using cache
 ---> 03412f053d04
Step 9 : RUN echo "visionet   ALL=(ALL)       ALL" >> /etc/sudoers
 ---> Using cache
 ---> bf8476812a62
Step 10 : RUN ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key
 ---> Using cache
 ---> 2314cce75171
Step 11 : RUN ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key
 ---> Using cache
 ---> 99304cd9ac15
Step 12 : RUN mkdir /var/run/sshd
 ---> Using cache
 ---> f87283751553
Step 13 : EXPOSE 22
 ---> Using cache
 ---> 56c41202dcb9
Step 14 : CMD /usr/sbin/sshd -D
 ---> Using cache
 ---> d6dccb483fa6
Successfully built d6dccb483fa6
[root@docker ~]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
centos              centos6-ssh         d6dccb483fa6        2 minutes ago         363 MB
centos              centos6-httpd       77eb12e36c7b        6 minutes ago       290.3 MB
centos6-visionet    latest              aeed37612ecb        6 hours ago         1.916 GB
centos              centos6             a3c09d36ab4a        2 days ago          194.6 MB
registry            latest              c6c14b3960bd        3 days ago          33.28 MB

# 后台运行docker容器，并指定nat端口转发
[root@docker ~]# docker run -d -p 2222:22 -P --name=sshd centos:centos6-ssh
b4211f7a304d9e34b72b510230be2c7a76b276886b488f08f3e12896a4d3c172

```

#### **7. ssh登陆到docker容器内，部署项目环境**
```
# inspect 查看docker 容器IP地址
[root@docker ~]# docker inspect sshd | grep IPAddress
[root@docker ~]# ssh visionet@172.17.0.2
visionet@172.17.0.2's password:
[visionet@b4211f7a304d ~]$

# Install mysql
# Install tomcat server

[visionet@b4211f7a304d ~]$ exit
[root@docker ~]# docker stop sshd
sshd
[root@docker ~]# docker ps -l
CONTAINER ID        IMAGE                COMMAND               CREATED             STATUS                       PORTS               NAMES
b4211f7a304d        centos:centos6-ssh   "/usr/sbin/sshd -D"   6 minutes ago       Exited (255) 3 seconds ago                       sshd
[root@docker ~]# docker commit b4211f7a304d centos:centos6-tomcat
sha256:b4f114d5484822d9a3ddf1100b76b460985ba5e5d31e936570e8d7dbd8df282c
[root@docker ~]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
centos              centos6-tomcat      b4f114d54848        4 seconds ago       363.1 MB
centos              centos6-httpd       77eb12e36c7b        15 minutes ago      290.3 MB
centos6-visionet    latest              aeed37612ecb        7 hours ago         1.916 GB
centos              centos6-ssh         d6dccb483fa6        9 hours ago         363 MB
centos              centos6             a3c09d36ab4a        2 days ago          194.6 MB
registry            latest              c6c14b3960bd        3 days ago          33.28 MB

```

#### **8. 推送centos:centos6-tomcat到私有docker仓库**
