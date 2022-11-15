---
layout: post
title: HowTo Reset MySQL Root Password
tags: 
    - MySQL
categories: 
    - 数据库
    - MySQL
abbrlink: 20222
date: 2016-12-04 09:57:23
---

#### 1. 处理的状态
 首先确认服务器出于安全的状态，也就是没有人能够任意地连接MySQL数据库。
因为在重新设置MySQL的root密码的期间，MySQL数据库完全出于没有密码保护的
状态下，其他的用户也可以任意地登录和修改MySQL的信息。可以采用将MySQL对
外的端口封闭，并且停止Apache以及所有的用户进程的方法实现服务器的准安全
状态。最安全的状态是到服务器的Console上面操作，并且拔掉网线。

#### 2. 重置密码

1. 修改mysql配置文件，增加skip-grant-tables
```
[root@demo ~]# vim /etc/my.cnf
[mysqld]
skip-grant-tables
```

2. 重启mysqld
```
[root@demo ~]# service mysqld restart
Stopping mysqld:                                           [  OK  ]
Starting mysqld:                                           [  OK  ]
```

3. 登录mysql，并修改root密码.
```
[root@demo ~]# mysql -u root
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 3
Server version: 5.5.53 MySQL Community Server (GPL)

Copyright (c) 2000, 2016, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> use mysql
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> update user set password=password('new-pass') where user='root';
Query OK, 5 rows affected (0.00 sec)
Rows matched: 5  Changed: 5  Warnings: 0
```

4. 配置文件去除skip-grant-tables，并重启服务器.
```
[root@demo ~]# vim /etc/my.cnf
[root@demo ~]# service mysqld restart
```

5. 使用新密码登录到mysql
```
[root@demo ~]# mysql -h localhost -u root -p
```
