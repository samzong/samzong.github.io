---
layout: post
title: HowTo Monitor Tomcat HeadMemory for Zabbix
tags: 
    - Zabbix
    - Tomcat
categories:
    - OpenSource
    - Java
date: 2017-01-18 23:28:44
---

最近项目上由于 BUG 问题导致 Tomcat 程序在运行过程中经常内存泄漏，而本身监控系统之中没有更好的检测到 Tomcat 堆空间 (Head Memory) 的使用情况导致报警频发，这篇文章主要讲述，如何在 Zabbix 之中调用 jmx 监控服务器上 Tomcat 堆空间的使用情况并增加对应报警功能。

> 测试环境：
> CentOS 6.8
> Zabbix 2.4
> Tomcat 7.0

实验前提默认是各位已经安装 Zabbix Server 服务器，并且至少有一台 Zabbix agent 服务器正常监控。关于如何搭建 Zabbix 监控集群，会有专门文章描述。

#### zabbix-java-gateway 的工作机制

* 首先我们需要配置我们的 Tomcat 服务启用监控服务，这个是默认不启用的
* 之后需要在 Zabbix 的管理页面添加对应 Tomcat 服务器的 jmx 监控接口
* 最后 zabbix 端会自动获取 zabbix-java-gateway 的数据并根据相应模板进行展
示
* 工作流：[Zabbix-Server]-->(port:10053 on zabbix server)--> [zabbix-java-gateway] --(port:12345 on tomcatserver)--> [JMX enabled]

#### 1. Install zabbix-java-gateway on Zabbix Server

因为我的 zabbix 是使用 zabbix 2.4 官方源安装，所以只需要用 yum 在安装即可：

```
[root@6 ~]# sudo  yum install -y zabbix-java-gateway
```

如果你没有官方源可能先安装该源，注意我的服务器 zabbix 版本是 2.4 如果你是不同的版本，请到[[这里](http://repo.zabbix.com/zabbix/)] 查找对应版本。

```
# 查看zabbix server版本
[root@6 ~]# zabbix_server --version
Zabbix server v2.4.8 (revision 59539) (20 April 2016)
Compilation time: May  4 2016 01:32:12
```

在使用 yum 安装 zabbix-java-gateway 源时，会自动关联安装 openjdk，尽管这段程序没多大影响，如果你想保证系统 JAVA 环境不受到改变的话，可以在/etc/profile 文件最后，增加如下内容：

```
# add follows to the end
export JAVA_HOME=/usr/java/default
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME/jre/lib:$JAVA_HOME/lib:$JAVA_HOME/lib/tools.jar
```

#### 2. Confiure Tomcat host with enable jmx

首先在$tomcatdir/bin/catalina.sh 文件开头处增加如下：

```
#!/bin/sh

CATALINA_OPTS="-Dcom.sun.management.jmxremote \
-Dcom.sun.management.jmxremote.authenticate=false \
-Dcom.sun.management.jmxremote.ssl=false \
-Dcom.sun.management.jmxremote.port=12345"
```

然后，启动 Tomcat，你会发现多了一个 12345 端口，这就是 jmx 的监听端口，请保证 zabbix-java-gateway 可以访问到这台服务器。

```
[root@6 ~]# /tomcat7/bin/startup.sh
Starting Tomcat7:
Using CATALINA_BASE:   /tomcat7
Using CATALINA_HOME:   /tomcat7
Using CATALINA_TMPDIR: /tomcat7/temp
Using JRE_HOME:        /usr
Using CLASSPATH:       /tomcat7/bin/bootstrap.jar:/tomcat7/bin/tomcat-juli.jar
Tomcat started.

[root@6 ~]# netstat -ntlp | grep 12345
tcp  0      0 :::12345   :::*     LISTEN      8793/java
[root@6 ~]#
```

#### ==*fix 1* == : zabbix agent 与 server 存在复杂网络环境

这里疏忽了 1 个问题，如果您的 zabbix server 与 agent 端之间有防火墙规则，而按照我上面的所述只是增加了 12345 这个端口，那么很可能，您在/var/log/zabbix/zabbix_java_gateway.log 中会看到“No route to host”的报错，这是因为 JMX 不光开启了 12345 端口，还开启了另外两个随机端口，而在获取监控数据时会使用到其中一个，这就导致了无法通过固定的防火墙规则来开放该端口。其实有另外一个替代方式来使该监听端口固定下来——使用 Tomcat 提供的额外组件 catalina-jmx-remote.jar，这个组件是需要另外下载的：

```
# 查看当前Tomcat版本.
[root@6 bin]# ./catalina.sh version
Using CATALINA_BASE:   /tomcat7
Using CATALINA_HOME:   /tomcat7
Using CATALINA_TMPDIR: /tomcat7/temp
Using JRE_HOME:        /usr
Using CLASSPATH:       /tomcat7/bin/bootstrap.jar:/tomcat7/bin/tomcat-juli.jar
Server version: Apache Tomcat/7.0.64
Server built:   Aug 19 2015 17:18:06 UTC
Server number:  7.0.64.0
OS Name:        Linux
OS Version:     2.6.32-642.11.1.el6.x86_64
Architecture:   amd64
JVM Version:    1.8.0_111-b15
JVM Vendor:     Oracle Corporation

# 下载 catalina-jmx-remote.jar # 请注意下载版本不要高于当前tomcat版本.
wget http://mirror.bit.edu.cn/apache/tomcat/tomcat-7/v7.0.57/bin/extras/catalina-jmx-remote.jar -O lib/catalina-jmx-remote.jar
```

增加如下内容，在 conf/server.xml 中：

```
<Listener className="org.apache.catalina.mbeans.JmxRemoteLifecycleListener"
          rmiRegistryPortPlatform="12345" rmiServerPortPlatform="12346" />
```

因为我们已经在conf/server.xml定义了rmiRegistryPortPlatform，所以要将bin/catalina.sh中CATALINA_OPTS的com.sun.management.jmxremote.port去掉，否则会因为jmxremote.port配置有优先级更高而导致配置失效。

```
CATALINA_OPTS="-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false"
```

完成之后，重启 tomcat 这时会发现 jmx 默认端口已经固定为 12345 何 12346，而 server 依然可以正常获取监控数据。

#### 3. Configure Zabbix Server

首先需要修改 zabbix_server.conf 启用 zabbix-java-gateway，让 zabbix 可以检测到服务，修改如下：

```
### Option: JavaGateway
 #       IP address (or hostname) of Zabbix Java gateway.
 #       Only required if Java pollers are started.
 #
 # Mandatory: no
 # Default:
JavaGateway=10.211.55.4 # 设置为你的zabbixsever IP

### Option: JavaGatewayPort

# Port that Zabbix Java gateway listens on

#

# Mandatory: no

# Range: 1024-32767

# Default

 JavaGatewayPort=10053 # 设置服务端监听接口

### Option: StartJavaPollers

# Number of pre-forked instances of Java pollers

#

# Mandatory: no

# Range: 0-1000

# Default

 StartJavaPollers=5 # 设置多线程启动

```

然后修改 zabbix\_java\_gateway.conf 配置如下：

```

### Option: zabbix.listenIP

# IP address to listen on

#

# Mandatory: no

# Default

 LISTEN_IP="10.211.55.4" # 配置监听IP

### Option: zabbix.listenPort

# Port to listen on

#

# Mandatory: no

# Range: 1024-32767

# Default

 LISTEN_PORT=10053 # 配置监听端口

### Option: zabbix.pidFile

# Name of PID file

# If omitted, Zabbix Java Gateway is started as a console application

#

# Mandatory: no

# Default

# PID_FILE=

 PID_FILE="/var/run/zabbix/zabbix_java.pid"

### Option: zabbix.startPollers

# Number of worker threads to start

#

# Mandatory: no

# Range: 1-1000

# Default

# 不能大于zabbix_server.conf的值，否则可能导致当连接Java gateway时没有多余的线程进行处理

 START_POLLERS=5

```

最后启动启动 zabbix-java-gateway，并重启 zabbix-server

```

[root@6 ~]# service zabbix-java-gateway start
Starting zabbix java gateway:              [  OK  ]
[root@6 ~]# service zabbix-server restart
Stopping zabbix server:              [  OK  ]
Starting zabbix server:              [  OK  ]

```

我在尝试重启发现一问题，zabbix-java-gateway 通过 service 命令管理 stop 不能删除 pid 文件导致服务无法启动，如果你也碰到，解决办法如下：

```

[root@6 zabbix]# vim /etc/rc.d/init.d/zabbix-java-gateway

# line 97, 注释修改为如下

# kill `cat $PID_FILE` && rm $PID_FILE

        rm -f $PID_FILE

```

#### 4. Adding jmx host on Zabbix Web consloe

首先，上传 Template Tomcat Head Memory 模板，这个我做了一个简单的模板，只针对了堆内存空间的监控，并针对使用率超过 60% 以及 80%，不同的警报。需要的同学可以直接从我这里下载，然后在 Configuration-Templates 导入到 zabbix 模板库内。
下载请点击：[Template App Tomcat Head Memory](https://samzong.oss-cn-shenzhen.aliyuncs.com/2016/12/zbx_template_app_tomcat_head_memory.xml)

然后，增加服务器的 jmx 监控
![image](https://samzong.oss-cn-shenzhen.aliyuncs.com/2016/12/zabbix-jmx-settings.png)

关联模板
![image](https://samzong.oss-cn-shenzhen.aliyuncs.com/2016/12/zabbix-host-select-template.png)

#### 5. View the Head Memory Monitoring

![image](https://samzong.oss-cn-shenzhen.aliyuncs.com/2016/12/zabbix-view-monitor.png)
