---
layout: post
title: HowTo Install Openfire  on CentOS
tags: 
  - Openfire
categories: 
  - Linux
  - CentOS
abbrlink: 36827
date: 2016-08-02 16:04:48
---

#### Install Centos 6.x x86_64
  *略.*

#### 安装依赖软件
```
yum -y install wget java glibc.i686
```

#### 下载openfire 3.8 到本地
```
wget http://download.igniterealtime.org/openfire/openfire-3.8.1-1.i386.rpm
```

#### 安装openfire 3.8
```
yum -y install ./openfire*rpm
```
#### 设置服务开启自启动
```
chkconfig openfire on

```
#### Yum Install mysql-server
详见： [How to Install MySQL 5.5/6/7 on RHEL/CentOS 5/6/7](http://blog.ultraera.org/how-to-install-mysql-5-6-on-centos/)

#### 创建openfire数据库
```
mysql -u root -p

create database openfire character set utf8;
grant all privileges on openfire.* to 'openfire'@'127.0.0.1' identified by 'openfire' with grant option;
```
#### 启动openfire
```
http://Host:9090
```

#### 之后的初始化步骤，请根据实际操作，注意设定数据库地址用户名和密码时不要出错

#### FAQ
openfire安装完毕后无法登录控制台
```
报错：Login failed:make sure your username and password are correct and that you’re an admin or moderator

解决方案如下：
1.使用Mysql查看工具进入数据库，进入表“ofuser”，将该表清空，然后执行该SQL
INSERT INTO ofUser (username, plainPassword, name, email, creationDate, modificationDate)
    VALUES ('admin', 'admin', 'Administrator', 'admin@example.com', '0', '0');

2.关闭openfire服务，就是从其控制台stop然后再start，再用用户名：admin,密码：admin登录即可
```

openfire 进程无法启动
```
报错：nohup: failed to run command `/opt/openfire/jre/bin/java': No such file or directory

解决方案如下：
经检查是由于openfire未能正确识别jre环境变量导致，安装时自带的jre是32位，但操作系统却是64位操作平台。
，故在/etc/init.d/openfire的启动脚本修改，
JAVA_HOME="/usr/lib/jvm/jre-$VERSION.x86_64"
```
