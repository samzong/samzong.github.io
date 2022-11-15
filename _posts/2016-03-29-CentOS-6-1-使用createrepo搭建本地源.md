---
layout: post
title: CentOS 使用createrepo搭建本地源
tags: 
    - Yum
categories: 
    - Linux
    - CentOS
abbrlink: 26963
date: 2016-03-29 03:37:31
---


> Tips: 本地搭建本地yum源采用的rpm全部来自CentOS-6.7-bin-DVD1&DVD2

### 1. 测试环境

* MacBook Pro 15-inch i7 16GB
* VMware Fushion 8 Pro
* CentOS-6.7-i686-minimal.iso

因为配置本地yum源需要修改/目录下的文件及/etc下面的配置文件，建议更换到root用户。

### 2. 实验步骤


```
# 2.1 因为配置本地yum源需要修改/目录下的文件及/etc下面的配置文件，建议更换到root用户。
[adam@ultraera ~]$ su -
Password:
[root@ultraera ~]#

# 2.2 首先在本地创建一个存放rpm包的目录，我这里选择直接在/下创建，你可以自定义：
[root@ultraera ~]# mkdir /yumload
[root@ultraera ~]# cd /yumload/
[root@ultraera yumload]# pwd
/yumload
# 2.3 接下来把两张DVD中的Packages中的rpm包全部拷贝到/yumload:
[root@ultraera yumload]# cp /media/CentOS_6.5_Final/Packages/* ./
[root@ultraera yumload]# ll ./*.rpm | wc -l

#两张DVD一共有的rpm包的数量:
4802


# 2.4 然后使用createrepo指令创建本地repo，CentOS6默认不安装createrepo，需要手动安装，没关系，在我们的DVD光盘中已经集成了createrepo的包，如果报需要依赖安装其他包的使用，依次安装即可。

[root@ultraera yumload]# rpm -ivh createrepo-0.9.9-18.el6.noarch.rpm

# 2.5 创建yum仓库，耐心等待，可以加-v参数列出执行信息
[root@ultraera yumload]# createrepo /yumload/
Spawning worker 0 with 4802 pkgs
Workers Finished
Gathering worker results
Saving Primary metadata
Saving file lists metadata
Saving other metadata
Generating sqlite DBs
Sqlite DBs complete
[root@ultraera yumload]#

# 2.6 在/etc/yum.repo.d/下创建一个repo文件，文件名可以自定义，但一定要以repo结尾，并添加一下内容：
[ultraera.org]	#仓库名称可以自定义
name=This is a local repo	#描述信息
baseurl=file:///yumload/	#这里填写仓库的url，注意 有三个正斜线
enabled=1	#是否开启仓库，1为开启，0为关闭
gpgcheck=0	#是否检查gpgkey，1为开启，0为关闭

# 2.7 另外如果想要添加软件包group的信息，可以把DVD1中的repodata文件中的*-comps.xml文件，使用ceraterepo -g 加载本地仓库即可，代码如下：
[root@ultraera repodata]# createrepo -g [字符可能不一样，后缀正确就行]c6-i386-comps.xml /yumload/


# 2.8 到这里本地yum源就已经搭建完成了，接下来重新初始化yum缓存：
[root@ultraera repodata]# yum clean all
Loaded plugins: fastestmirror, refresh-packagekit, security
Cleaning repos: ultraera.org
Cleaning up Everything
Cleaning up list of fastest mirrors
[root@ultraera repodata]# yum makecache
Loaded plugins: fastestmirror, refresh-packagekit, security
Determining fastest mirrors
ultraera.org	| 2.9 kB	00:00 ...
ultraera.org/filelists_db	| 4.9 MB	00:00 ...
ultraera.org/primary_db	| 3.5 MB	00:00 ...
ultraera.org/other_db	| 2.1 MB	00:00 ...
Metadata Cache Created

# 2.9 测试group信息是否添加正确可以用如下代码，只要有正确输出信息就表示成功了
[root@ultraera ~]# yum grouplist


```
