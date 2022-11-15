---
layout: post
title: HowTo set Tomcat 7 automatic startup with CentOS 7
tags: 
   - Tomcat
   - CentOS
categories: 
   - Tomcat
abbrlink: 8202
date: 2017-04-05 15:21:03
---

因CentOS7与6在系统上，变化较大，所以在之前的文章中讲到的使用Tomcat7开机自启动的方式在CentOS7是是无法使用的，所以这篇文章的目的是如何在CentOS7上将Tomcat7设置为开机自启动。

#### 安装JAVA环境
```

[root@7 ~]# curl -LO -H "Cookie: oraclelicense=accept-securebackup-cookie" \
"http://download.oracle.com/otn-pub/java/jdk/7u75-b13/jdk-7u75-linux-x64.rpm"

[root@7 ~]# rpm -Uvh jdk-7u75-linux-x64.rpm
Preparing...                ########################################### [100%]
   1:jdk                    ########################################### [100%]
Unpacking JAR files...
        rt.jar...
        jsse.jar...
        charsets.jar...
        tools.jar...
        localedata.jar...
        jfxrt.jar...

[root@7 ~]# vi /etc/profile
# add follows to the end
export JAVA_HOME=/usr/java/default
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME/jre/lib:$JAVA_HOME/lib:$JAVA_HOME/lib/tools.jar
[root@7 ~]# source /etc/profile
```

#### 安装Tomcat7
```

[root@7 ~]# wget http://ftp.riken.jp/net/apache/tomcat/tomcat-7/v7.0.77/bin/apache-tomcat-7.0.77.tar.gz
[root@7 ~]# tar zxvf apache-tomcat-7.0.77.tar.gz
[root@7 ~]# mv apache-tomcat-7.0.77 /usr/tomcat7
[root@7 ~]# useradd -M -d /usr/tomcat7 tomcat7
[root@7 ~]# chown -R tomcat7. /usr/tomcat7
```

#### 创建开机自启动脚本
```
[root@7 ~]# cat /usr/lib/systemd/system/tomcat7.service
# create new
 [Unit]
Description=Apache Tomcat 7
After=network.target

[Service]
Type=oneshot
ExecStart=/usr/tomcat7/bin/startup.sh
ExecStop=/usr/tomcat7/bin/shutdown.sh
RemainAfterExit=yes
User=tomcat7
Group=tomcat7

[Install]
WantedBy=multi-user.target
```

#### 启动Tomcat7
```
[root@7 ~]# systemctl start tomcat7.service
[root@7 ~]# systemctl enable tomcat7.service
```
