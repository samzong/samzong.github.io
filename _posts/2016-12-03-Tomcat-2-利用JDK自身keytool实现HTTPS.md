---
layout: post
title: Tomcat 利用JDK自身keytool实现HTTPS
tags: 
  - Tomcat
categories: 
  - Tomcat
abbrlink: 16693
date: 2016-12-03 18:41:13
---

因为一个偶然机会，想把自己的webserver通过https加密访问，这里就采用JDK自带的keytool工具实现，tomcat官方也推荐这种方式，英文好的同学走这里：[官方配置](https://tomcat.apache.org/tomcat-7.0-doc/ssl-howto.html)

> demo: CentOS 6.6 & Tomcat 7 & JDK 1.7

#### 1. 生成 keystore
```
[root@test conf]# keytool -genkey -v -alias tomcat -keyalg RSA -keystore mykeystore
Enter keystore password:              #设置密码
Re-enter new password:                #重复一次
What is your first and last name?
  [Unknown]:  Alex Lu                #随便填
What is the name of your organizational unit?
  [Unknown]:  visionet                #随便填
What is the name of your organization?
  [Unknown]:  visionet                #随便填
What is the name of your City or Locality?
  [Unknown]:  SH                #随便填
What is the name of your State or Province?
  [Unknown]:  SH                #随便填
What is the two-letter country code for this unit?
  [Unknown]:  ZH                #随便填
Is CN=Alex Lu, OU=visionet, O=visionet, L=SH, ST=SH, C=ZH correct?
  [no]:  Y                    #这里要Y，确认前面信息。

Generating 2,048 bit RSA key pair and self-signed certificate (SHA256withRSA) with a validity of 90 days
    for: CN=Alex Lu, OU=visionet, O=visionet, L=SH, ST=SH, C=ZH
Enter key password for <tomcat>
    (RETURN if same as keystore password):        #默认回车即可，不需要设置太多密码
[Storing mykeystore]
[root@test conf]# ls
Catalina  catalina.policy  catalina.properties  context.xml  logging.properties  mykeystore  server.xml  tomcat-users.xml  web.xml
```
>  注意：-keystore是用来指定keystore保存位置，如果不加参数默认保存的当前用户家目录为~/.keystore
       -validity 可以用来指定证书有效期，单位为天，缺省值为90天。

#### 2. 备份$tomcatdir/conf/server.xml
```
cp $tomcatdir/conf/server.xml $tomcatdir/conf/server.xml
```

#### 3. 修改server.xml
###### a. 注释以下：（tomcat注释用：<\!\-\- XXXX \-\-\> ）,如何也想保留http访问，可以不注释
```
<!--
<Connector executor="tomcatThreadPool"
                port="80" protocol="HTTP/1.1"
                connectionTimeout="20000"
                redirectPort="8443" />
-->
```
###### b. 取消下面注释
```
<Connector port="443" protocol="HTTP/1.1" SSLEnabled="true"
                maxThreads="150" scheme="https" secure="true"
                clientAuth="false" sslProtocol="TLS" />
```
###### c. 增加keystoreFile和keystorePass
```
<Connector port="443" protocol="HTTP/1.1" SSLEnabled="true"
               maxThreads="150" scheme="https" secure="true"
               clientAuth="false" sslProtocol="TLS"
               keystoreFile="conf/mykeystore" keystorePass="123456"/>
```
> keystoreFile=跟keystore文件位置
> keystorePass=跟当时keytool命令执行时输入的密码


#### 4. 重启tomcat
```
[root@test conf]# ../bin/catalina.sh stop && ../bin/catalina.sh start
Using CATALINA_BASE:   /home/pms/apache-tomcat-6.0.44
Using CATALINA_HOME:   /home/pms/apache-tomcat-6.0.44
Using CATALINA_TMPDIR: /home/pms/apache-tomcat-6.0.44/temp
Using JRE_HOME:        /home/pms/jdk1.7.0_65
Using CLASSPATH:       /home/pms/apache-tomcat-6.0.44/bin/bootstrap.jar
Using CATALINA_BASE:   /home/pms/apache-tomcat-6.0.44
Using CATALINA_HOME:   /home/pms/apache-tomcat-6.0.44
Using CATALINA_TMPDIR: /home/pms/apache-tomcat-6.0.44/temp
Using JRE_HOME:        /home/pms/jdk1.7.0_65
Using CLASSPATH:       /home/pms/apache-tomcat-6.0.44/bin/bootstrap.jar
[root@test conf]# netstat -ntlup | grep -e "80\|443"
tcp        0      0 0.0.0.0:80         0.0.0.0:*          LISTEN      21960/java
tcp        0      0 0.0.0.0:443        0.0.0.0:*          LISTEN      21960/java
tcp        0      0 127.0.0.1:8005     0.0.0.0:*          LISTEN      21960/java
tcp        0      0 0.0.0.0:8009       0.0.0.0:*          LISTEN      21960/java
[root@test conf]#
```

OK !
