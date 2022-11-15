---
layout: post
title: HowTo Install a Tomcat Server 7
tags: 
    - Tomcat
categories: 
    - Tomcat
abbrlink: 49734
date: 2016-09-19 10:25:53
---

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本文件是采用的模板是CentOS 6，同样适用于CentOS 系列其他发行版本。

#### 1. 测试环境
* VMware Fushion 8 Pro # windows Use [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
* [CentOS-6.8-x86_64-minimal.iso](http://mirrors.aliyun.com/centos/6.8/isos/x86_64/CentOS-6.8-x86_64-minimal.iso)
* [JDK 7](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [Tomcat 7](http://ftp.riken.jp/net/apache/tomcat/tomcat-7/)

#### 2. Install Java SE Development Kit 7 (JDK7)

```
[root@ultraera ~]# curl -LO -H "Cookie: oraclelicense=accept-securebackup-cookie" \
"http://download.oracle.com/otn-pub/java/jdk/7u75-b13/jdk-7u75-linux-x64.rpm"
[root@ultraera ~]# rpm -Uvh jdk-7u75-linux-x64.rpm
Preparing...                ########################################### [100%]
   1:jdk                    ########################################### [100%]
Unpacking JAR files...
        rt.jar...
        jsse.jar...
        charsets.jar...
        tools.jar...
        localedata.jar...
        jfxrt.jar...
```
#### 3. Build Java Environment.
```
[root@ultraera ~]# vi /etc/profile
# add follows to the end
export JAVA_HOME=/usr/java/default
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME/jre/lib:$JAVA_HOME/lib:$JAVA_HOME/lib/tools.jar
[root@ultraera ~]# source /etc/profile
[root@ultraera ~]# java -version
java version "1.7.0_75"
Java(TM) SE Runtime Environment (build 1.7.0_75-b13)
Java HotSpot(TM) 64-Bit Server VM (build 24.75-b04, mixed mode)
```
#### 4. Download Tomcat7
Make sure the latest one and download it from the site below.
=》 http://ftp.riken.jp/net/apache/tomcat/tomcat-7/

```
[root@ultraera ~]# wget http://ftp.riken.jp/net/apache/tomcat/tomcat-7/v7.0.70/bin/apache-tomcat-7.0.70.tar.gz
[root@ultraera ~]# tar zxvf apache-tomcat-7.0.70.tar.gz
[root@ultraera ~]# mv apache-tomcat-7.0.70 /usr/tomcat7
[root@ultraera ~]# useradd -M -d /usr/tomcat7 tomcat7
[root@ultraera ~]# chown -R tomcat7. /usr/tomcat7
```
#### 5. create a script , use service manage tomcat7
```
[root@ultraera ~]# cat /etc/rc.d/init.d/tomcat7
 #!/bin/bash

# Tomcat7: Start/Stop Tomcat 7
#
# chkconfig: - 90 10
# description: Tomcat is a Java application Server.

. /etc/init.d/functions
. /etc/sysconfig/network

CATALINA_HOME=/usr/tomcat7
TOMCAT_USER=tomcat7

LOCKFILE=/var/lock/subsys/tomcat7

RETVAL=0
start(){
    echo "Starting Tomcat7: "
    su - $TOMCAT_USER -c "$CATALINA_HOME/bin/startup.sh"
    RETVAL=$?
    echo
    [ $RETVAL -eq 0 ] && touch $LOCKFILE
    return $RETVAL
}

stop(){
    echo "Shutting down Tomcat7: "
    $CATALINA_HOME/bin/shutdown.sh
    RETVAL=$?
    echo
    [ $RETVAL -eq 0 ] && rm -f $LOCKFILE
    return $RETVAL
}

case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        stop
        start
        ;;
    *)
        echo $"Usage: $0 {start|stop|restart}"
        exit 1
        ;;
esac
exit $?
```
#### 6. Add tomcat7 to system service

```shell
[root@ultraera ~]# chmod 755 /etc/rc.d/init.d/tomcat7
[root@ultraera ~]# /etc/rc.d/init.d/tomcat7 start
Starting Tomcat7:
Using CATALINA_BASE:   /usr/tomcat7
Using CATALINA_HOME:   /usr/tomcat7
Using CATALINA_TMPDIR: /usr/tomcat7/temp
Using JRE_HOME:        /usr/java/default
Using CLASSPATH:       /usr/tomcat7/bin/bootstrap.jar:/usr/tomcat7/bin/tomcat-juli.jar
Tomcat started.
[root@ultraera ~]# netstat -ntlp | grep java
tcp        0      0 ::ffff:127.0.0.1:8005       :::*                        LISTEN      6326/java
tcp        0      0 :::8009                     :::*                        LISTEN      6326/java
tcp        0      0 :::8080                    :::*                        LISTEN      6326/java
[root@ultraera ~]# ps axu | grep java
tomcat7       6326  8.3 85.6 5229768 2910176 ?     Sl   Aug22 3216:38 /usr/bin/java -Djava.util.logging.config.file=/usr/tomcat7/conf/logging.properties -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager -server -Djava.endorsed.dirs=/usr/tomcat7/endorsed -classpath /usr/tomcat7/bin/bootstrap.jar:/usr/tomcat7/bin/tomcat-juli.jar -Dcatalina.base=/usr/tomcat7 -Dcatalina.home=/usr/tomcat7 -Djava.io.tmpdir=/usr/tomcat7/temp org.apache.catalina.startup.Bootstrap start
[root@ultraera ~]# chkconfig --add tomcat7
[root@ultraera ~]# chkconfig tomcat7 on
```
#### 7. 打开浏览器测试Tomcat Server搭建完成，默认页面如下
![](https://samzong.oss-cn-shenzhen.aliyuncs.com/2016/09/tomcat7.jpg)

#### 8. 使用curl 测试
```
[root@ultraera ~]# curl -I http://localhost:8080
HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
Content-Type: text/html;charset=ISO-8859-1
Transfer-Encoding: chunked
Date: Sun, 18 Sep 2016 11:14:06 GMT
```

#### 9. Tomcat 文件树

```
[root@ultraera /usr/tomcat7]# tree
.
├── bin
│   ├── bootstrap.jar
│   ├── catalina.bat
│   ├── catalina.sh
│   ├── catalina-tasks.xml
│   ├── commons-daemon.jar
│   ├── commons-daemon-native.tar.gz
│   ├── configtest.bat
│   ├── configtest.sh
│   ├── daemon.sh
│   ├── digest.bat
│   ├── digest.sh
│   ├── setclasspath.bat
│   ├── setclasspath.sh
│   ├── shutdown.bat
│   ├── shutdown.sh
│   ├── startup.bat
│   ├── startup.sh
│   ├── tomcat-juli.jar
│   ├── tomcat-native.tar.gz
│   ├── tool-wrapper.bat
│   ├── tool-wrapper.sh
│   ├── version.bat
│   └── version.sh
├── conf
│   ├── catalina.policy
│   ├── catalina.properties
│   ├── context.xml
│   ├── logging.properties
│   ├── server.xml
│   ├── tomcat-users.xml
│   └── web.xml
├── lib
├── LICENSE
├── logs
│   ├── catalina.2016-09-18.log
│   ├── catalina.out
│   ├── host-manager.2016-09-18.log
│   ├── localhost.2016-09-18.log
│   └── manager.2016-09-18.log
├── NOTICE
├── RELEASE-NOTES
├── RUNNING.txt
├── temp
├── webapps
│   └── ROOT
└── work
```
