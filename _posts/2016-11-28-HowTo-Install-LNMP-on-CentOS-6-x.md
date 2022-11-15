---
layout: post
title: HowTo Install LNMP on CentOS 6.x
tags: 
  - LNMP
categories: 
  - Linux
  - CentOS
abbrlink: 50402
date: 2016-11-28 10:33:09
---

> egrep -v "^ *#|^ *$"     去除所有以#号开头的文件

#### Demo system
```
[Alex@Test01 ~]$ uname -a
Linux Test01 2.6.32-504.el6.x86_64 #1 SMP Wed Oct 15 04:27:16 UTC 2014 x86_64 x86_64 x86_64 GNU/Linux
[Alex@Test01 ~]$ ip addr | grep eth0
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP qlen 1000
    inet 10.0.2.128/24 brd 10.0.2.255 scope global eth0
```

#### Install httpd
```
[Alex@Test01 yum.repos.d]$ sudo yum install -y httpd
[Alex@Test01 ~]$ rpm -qa | grep httpd
httpd-2.2.15-39.el6.centos.x86_64
httpd-tools-2.2.15-39.el6.centos.x86_64

# remove welcome page
[Alex@Test01 yum.repos.d]$ sudo rm -f /etc/httpd/conf.d/welcome.conf
# remove default error page
[Alex@Test01 yum.repos.d]$ sudo rm -f /var/www/error/noindex.html
```

#### Configure httpd . Replace the server name to you own one.
```
[Alex@Test01 ~]# sudo vi /etc/httpd/conf/httpd.conf
# line 44: change
 ServerTokens Prod
# line 76: change to ON
 KeepAlive On
# line 262: Admin's address
 ServerAdmin luchuanjia@msn.com
# line 338: change
 AllowOverride All
# line 276: change to your server's name
 ServerName www.ultraera.org:80
# line 402: add file name that it can access only with directory's name
 DirectoryIndex index.html index.htm
# line 536: change
 ServerSignature Off
# line 759: comment out
# AddDefaultCharset UTF-8
[Alex@Test01 ~]# sudo /etc/init.d/httpd start
 Starting httpd:[  OK  ]
[Alex@Test01 ~]# sudo chkconfig httpd on     # set httpd start with system.
```
#### create a HTML test page
```
[Alex@Test01 ~]# sudo vi /var/www/html/index.html
it's ok.
```
![](http://s3.51cto.com/wyfs02/M00/70/DE/wKioL1XAUfuQoFfwAACC5LJWQgg039.jpg)

#### Install PHP.
```
[Alex@Test01 ~]$ sudo yum install -y php php-mbstring php-pear
[Alex@Test01 ~]$ rpm -qa | grep php
php-common-5.3.3-46.el6_6.x86_64
php-5.3.3-46.el6_6.x86_64
php-mbstring-5.3.3-46.el6_6.x86_64
php-cli-5.3.3-46.el6_6.x86_64
php-pear-1.9.4-4.el6.noarch

[Alex@Test01 ~]$ sudo vi /etc/httpd/conf/httpd.conf
# line 402 add file name that it can access only with directory's name
  DirectoryIndex index.html index.htm index.php
[Alex@Test01 ~]$ sudo vi /etc/php.ini
# line 946 set your timezone
date.timezone = "Asia/Shanghai"
[Alex@Test01 ~]$ sudo /etc/init.d/httpd restart
 Stopping httpd:[  OK  ]
 Starting httpd:[  OK  ]
```

#### create a php test page.
```
[Alex@Test01 ~]# sudo vi /var/www/html/index.php

<?php
    phpinfo();
?>
```
![](http://s3.51cto.com/wyfs02/M02/70/DE/wKioL1XAUguwJCl2AARE16t4hyw682.jpg)

#### Install MySQL
```
[Alex@Test01 ~]$ sudo -y install mysql-server
[Alex@Test01 ~]$ rpm -qa | grep mysql-server
mysql-server-5.1.73-5.el6_6.x86_64

[Alex@Test01 ~]$ sudo vi /etc/my.cnf
[mysqld]
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
user=mysql
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
# add
character-set-server=utf8

[Alex@Test01 ~]$ sudo /etc/rc.d/init.d/mysqld start

Initializing MySQL database:  WARNING: The host 'www.ultraera.org' could not be looked up with resolveip.
This probably means that your libc libraries are not 100 % compatible
with this binary MySQL version. The MySQL daemon, mysqld, should work
normally with the exception that host name resolving will not work.
This means that you should use IP addresses instead of hostnames
when specifying MySQL privileges !
Installing MySQL system tables...
OK
Filling help tables...
OK
...
...
...
You can test the MySQL daemon with mysql-test-run.pl
cd /usr/mysql-test ; perl mysql-test-run.pl

Please report any problems with the /usr/bin/mysqlbug script!

                                              [  OK  ]
Starting mysqld:                      [  OK  ]
[Alex@Test01 ~]$ sudo chkconfig mysqld on
```

#### Initial settings for MySQL
```
[root@www ~]#mysql_secure_installation
NOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MySQL
      SERVERS IN PRODUCTION USE!  PLEASE READ EACH STEP CAREFULLY!

In order to log into MySQL to secure it, we'll need the current
password for the root user.  If you've just installed MySQL, and
you haven't set the root password yet, the password will be blank,
so you should just press enter here.

# Enter
 Enter current password for root (enter for none):
OK, successfully used password, moving on...

Setting the root password ensures that nobody can log into the MySQL
root user without the proper authorisation.

# set root password
 Set root password? [Y/n]y
 New password:    # input any password
 Re-enter new password:
Password updated successfully!
Reloading privilege tables..
 ... Success!

By default, a MySQL installation has an anonymous user, allowing anyone
to log into MySQL without having to have a user account created for
them.  This is intended only for testing, and to make the installation
go a bit smoother.  You should remove them before moving into a
production environment.

# remove anonymous users
 Remove anonymous users? [Y/n]y

 ... Success!

Normally, root should only be allowed to connect from 'localhost'.  This
ensures that someone cannot guess at the root password from the network.

# disallow root login remotely
 Disallow root login remotely? [Y/n]y

 ... Success!

By default, MySQL comes with a database named 'test' that anyone can
access.  This is also intended only for testing, and should be removed
before moving into a production environment.

# remove test database
 Remove test database and access to it? [Y/n]y

 - Dropping test database...
 ... Success!
 - Removing privileges on test database...
 ... Success!

Reloading the privilege tables will ensure that all changes made so far
will take effect immediately.

# reload privilege tables
 Reload privilege tables now? [Y/n]y

 ... Success!

Cleaning up...

All done!  If you've completed all of the above steps, your MySQL
installation should now be secure.

Thanks for using MySQL!

# try to connect with root
 [root@www ~]#mysql -u root -p
 Enter password:# MySQL root password
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 10
Server version: 5.1.73 Source distribution

Copyright (c) 2000, 2013, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

# display user list
 mysql>select user,host,password from mysql.user;
+------+-----------+-------------------------------------------+
| user | host      | password                                  |
+------+-----------+-------------------------------------------+
| root | localhost | ***************************************** |
| root | 127.0.0.1 | ***************************************** |
+------+-----------+-------------------------------------------+
2 rows in set (0.00 sec)

# display database list
 mysql>show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
+--------------------+
2 rows in set (0.00 sec)
mysql>exit
Bye
```
