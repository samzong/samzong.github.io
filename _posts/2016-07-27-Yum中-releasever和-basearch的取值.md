---
layout: post
title: Yum中$releasever和$basearch的取值
tags: 
    - Yum
categories: 
    - Linux
    - CentOS
abbrlink: 29848
date: 2016-07-27 10:27:54
---

#### 查看/etc/yum.repos.d/CentOS-Base.repo

```
[base]
name=CentOS-$releasever - Base
mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=os&infra=$infra
#baseurl=http://mirror.centos.org/centos/$releasever/os/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6
```

<p>其实在日常使用之中，我们在很多地方，特别是脚本内看到了调用<code>$releasever</code>和<code>$basearch</code></p>

1. $releasever的值,这个表示当前系统的发行版本

```
[root@ultraera /]# rpm -qi centos-release
Name        : centos-release               Relocations: (not relocatable)
Version     : 6                                 Vendor: CentOS
Release     : 7.el6.centos.12.3             Build Date: Tue 04 Aug 2015 12:13:46 AM CST
Install Date: Sat 21 May 2016 03:31:27 AM CST      Build Host: c6b9.bsys.dev.centos.org
Group       : System Environment/Base       Source RPM: centos-release-6-7.el6.centos.12.3.src.rpm
Size        : 35634                            License: GPLv2
Signature   : RSA/SHA1, Tue 04 Aug 2015 12:15:08 AM CST, Key ID 0946fca2c105b9de
Packager    : CentOS BuildSystem <http://bugs.centos.org>
Summary     : CentOS release file
Description :
CentOS release files

# 其中Version 6 就是我们的版本号
```

2. $basearch是我们的系统硬件架构(CPU指令集),就是我们常说的i386\i486\i586\i686\

```
[root@ultraera /]# arch
i386
```
但是，当我在命令行查看是却发现<code>$releasever</code>和<code>$basearch</code>是空的。
<br>
Google 一下之后，说明Yum变量的说明可以在这里（5.3.3. Using Yum Variables）找到，说明如下：
>5.3.3. Using Yum Variables

You can use and reference the following built-in variables in yum commands and in all Yum configuration files (that is, /etc/yum.conf and all .repo files in the /etc/yum.repos.d/ directory):

$releasever<br>
You can use this variable to reference the release version of Red Hat Enterprise Linux. Yum obtains the value of $releasever from the distroverpkg=value line in the /etc/yum.conf configuration file. If there is no such line in /etc/yum.conf, then yum infers the correct value by deriving the version number from the redhat-release package.

$arch<br>
You can use this variable to refer to the system’s CPU architecture as returned when calling Python’s os.uname() function. Valid values for $arch include: i586, i686 and x86_64.

$basearch<br>
You can use $basearch to reference the base architecture of the system. For example, i686 and i586 machines both have a base architecture of i386, and AMD64 and Intel64 machines have a base architecture of x86_64.

$YUM0-9<br>
These ten variables are each replaced with the value of any shell environment variables with the same name. If one of these variables is referenced (in /etc/yum.conf for example) and a shell environment variable with the same name does not exist, then the configuration file variable is not replaced.

To define a custom variable or to override the value of an existing one, create a file with the same name as the variable (without the “$” sign) in the /etc/yum/vars/ directory, and add the desired value on its first line.

For example, repository descriptions often include the operating system name. To define a new variable called $osname, create a new file with “Red Hat Enterprise Linux” on the first line and save it as /etc/yum/vars/osname:

<code>echo “Red Hat Enterprise Linux” > /etc/yum/vars/osname</code>

Instead of “Red Hat Enterprise Linux 6”, you can now use the following in the .repo files: name=$osname $releasever

文中说到$releasever的定义可以查看 /etc/yum.conf 文件的事distroverpkg=value 行，打开 /etc/yum.conf 看一下，默认文件（我的是CentOS 6）内容如下：

```
[main]
cachedir=/var/cache/yum/$basearch/$releasever
keepcache=0
debuglevel=2
logfile=/var/log/yum.log
exactarch=1
obsoletes=1
gpgcheck=1
plugins=1
installonly_limit=5
bugtracker_url=http://bugs.centos.org/set_project.php?project_id=16&ref=http://bugs.centos.org/bug_report_page.php?category=yum
distroverpkg=centos-release
```

distroverpkg=centos-release 代表什么？ 去哪找 centos-release 。找到这里我再一次表示困惑。
不过另一篇文章进行了我的视野： yum的$releasever真是太反动了， 关键内空如下：<br>
在 /etc/yum.repos.d/ 目录下的软件库定义文件中，常常会在 baseurl 的路径中提到 $releasever 这个变量，表示当前发行版的大版本号，但大家知道这个变量是在哪设置的吗？我 grep 了整个 etc 目录都没找到，还是看了 yum.conf 才知道的，是在 yum.conf 文件里 distroverpkg 选项定义的。但这个选项就很有问题：<br>
distroverpkg 和 releasever 名字不同，且看不出什么联系
distroverpkg 的值，并不是明文，而是“redhat-release”。不知道大家看到这个会有什么想法，反正我是首先想到了 /etc/redhat-release 文件，但我错了。实际上指的是 redhat-release 这个RPM包。所谓“distroverpkg=redhat-release”的意思，其实是将 $releasever 设置为 redhat-release 这个RPM包的版本号.

#####  小结：<br>
yum中的$releasever变量是取redhat-release-server rpm包的属性值( %{version})。
[root@ldap01 ~]# rpm -q --qf %{version} redhat-release-server;echo
6Server
