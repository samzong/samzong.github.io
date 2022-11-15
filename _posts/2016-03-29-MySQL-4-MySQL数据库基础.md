---
layout: post
title: MySQL数据库使用基础
tags: 
    - MySQL
categories: 
    - 数据库
    - MySQL
abbrlink: 23376
date: 2016-03-29 08:22:14
---


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

## 1. 测试环境
*  MacBook Pro 15‘ i7 16GB
*  VMware Fushion 8 Pro
*  MySQL Version 5.1
*  CentOS Linux 6.x


## 2. 实验步骤

### 2.1 安装mysql

```
[root@ultraera  ~]#  yum  install  mysql  mysql-server  mysql-devel

```


### 2.2 启动mysql，并设置开机自启动

```
[root@ultraera  ~]#  service  mysqld  start
[root@ultraera  ~]#  chkconfig  mysqld  on
[root@ultraera  ~]#  chkconfig  --list  |  grep  mysqld
mysqld	0:off  1:off  2:on  3:on  4:on  5:on  6:off

```


### 2.3 相关配置

```
/etc/my.cnf         mysql配置文件
/var/lib/mysql      mysql数据库文件
port:3306           mysql默认端口

# Tips : MySQL 绝大对数语句都是以分号结尾，注意是英文模式下的分号。字符和字符串用 '' 引起；
```


### 2.4 mysql初始化及登录

```

[root@ultraera ~]# mysql_secure_installation

NOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MySQL
      SERVERS IN PRODUCTION USE!  PLEASE READ EACH STEP CAREFULLY!

In order to log into MySQL to secure it, we'll need the current
password for the root user.  If you've just installed MySQL, and
you haven't set the root password yet, the password will be blank,
so you should just press enter here.

Enter current password for root (enter for none):        # 首次登陆默认为空

Setting the root password ensures that nobody can log into the MySQL
root user without the proper authorisation.

You already have a root password set, so you can safely answer 'n'.

Set the root password? [Y/n] y            # 设置root用户密码
New password:
Re-enter new password:
Password updated successfully!
Reloading privilege tables..
 ... Success!


By default, a MySQL installation has an anonymous user, allowing anyone
to log into MySQL without having to have a user account created for
them.  This is intended only for testing, and to make the installation
go a bit smoother.  You should remove them before moving into a
production environment.

Remove anonymous users? [Y/n] y        # 删除匿名用户
 ... Success!

Normally, root should only be allowed to connect from 'localhost'.  This
ensures that someone cannot guess at the root password from the network.

Disallow root login remotely? [Y/n] y        # 关闭root远程登陆
 ... Success!

By default, MySQL comes with a database named 'test' that anyone can
access.  This is also intended only for testing, and should be removed
before moving into a production environment.

Remove test database and access to it? [Y/n] y    # 删除 test 数据库
 - Dropping test database...
ERROR 1008 (HY000) at line 1: Can't drop database 'test'; database doesn't exist
 ... Failed!  Not critical, keep moving...
 - Removing privileges on test database...
 ... Success!

Reloading the privilege tables will ensure that all changes made so far
will take effect immediately.

Reload privilege tables now? [Y/n] y    # 保存这些设置
 ... Success!


All done!  If you've completed all of the above steps, your MySQL
installation should now be secure.

Thanks for using MySQL!

Cleaning up...
[root@ultraera ~]#

[root@ultraera  ~]# 
[root@ultraera  ~]# mysql  -u  root  -p  '123456'
[root@ultraera  ~]# mysql  -u  root  -p  -h  localhost “-h” 指定服务器地址
```


### 2.5 创建、查看及删除当前数据库

```
mysql>  CREATE  DATABASE  ultraera;
Query  OK,  1  row  affected  (0.00  sec)
mysql>  SHOW  DATABASES;
+--------------------+
|  Database	|
+--------------------+
|  information_schema  |
|  mysql	|
|  test	|
|  ultraera	|
+--------------------+
4  rows  in  set  (0.00  sec)
mysql>  DROP  DATABASE  ultraera;
Query  OK,  0  rows  affected  (0.00  sec)

```

### 2.6 创建、查看及删除当前表格

```
#创建表格之前要先选择数据库
mysql>  use  ultraera;
Database  changed
mysql>  CREATE  TABLE  ultraera(	#create 创建表格，至少1列
->  id  int  NOT  NULL,	#NOT  NULL	不为空,int 整型
->  name  char(20)  NOT  NULL,	#char() 字符型  ,()内定义字符长度
->  age  int  NOT  NULL
->  );
Query  OK,  0  rows  affected  (0.01  sec)
mysql>  DESC  ultraera;
+-------+----------+------+-----+---------+----------------+
|  Field  |  Type	|  Null  |  Key  |  Default  |  Extra	|
+-------+----------+------+-----+---------+----------------+
|  id	|  int(11)  |  NO  |	|  NULL	|	|
|  name  |  char(20)  |  NO  |	|  NULL	|	|
|  age	|  int(11)  |  NO  |	|  NULL	|	|
+-------+----------+------+-----+---------+----------------+
3  rows  in  set  (0.00  sec)
mysql>  DROP  TABLE  ultraera  ;
Query  OK,  0  rows  affected  (0.00  sec)

```
### 2.7 修改表格信息

```
a.重命名表格
mysql>  alter  table  ultraera  rename  ultraera_org;
b.新增列
alter  table  ultraera  add  address  varchar(200);
c.删除列
mysql>  alter  table  ultraera  drop  column  address;
d.修改一个列的数据类型
mysql>  alter  table  ultraera  modify  name  varchar(200);
e.重命名一个列
mysql>  alter  table  ultraera  change  column  NAME  name  varchar(200);
```



### 2.8 向表格中插入数据

```
a.  全局插入
mysql>  insert  into  ultraera  values(1,'name',18);
b.  根据列插入
mysql>  insert  into  ultraera(id,name,age)  values(2,'john',19);
### 2.9 查看表格中的数据：
mysql>  select  *  from  ultraera;	#  *匹配所有列，也可以只查询单个列，
mysql>  select  name  from  ultraera;

```

### 2.10 where运算符：条件判断查询，查询使用方法：where  列  运算符  值；

```
where支持的运算符：=等于；>大于；<小于；<>不等于；>=大于等于；<=小于等于；BETWEEN在某范围之内；
mysql> select * from ultraera where id>1;
mysql> select * from ultraera where id=2;
mysql> select * from ultraera where id>=1;
mysql> select * from ultraera where id<1;
mysql> select * from ultraera where id<=1;
mysql> select * from ultraera where id  between  1  and  4;

```


### 2.11 删除表格中的一条记录（同样可以匹配where运算符）

```
mysql>  delete  from  ultraera  where  id  =  4;
mysql>  delete  *  from  ultraera ；	#清空一个表格的数据；

```
### 2.12 更新表中的一个数据

```
mysql>  update  ultraera  set  age=30  where  id=3;

```


### 2.13 MySQL增加删除一个用户

```
mysql>  create  user  user1  identified  by  '123456';	#user1，密码123456，新用户没有权限，无法登录数据库
mysql>  drop  user  user1;	#删除用户user1

```


### 2.14 给用户添加、删除权限

```
mysql>  grant  all  privileges  on  *.*  to  'user1'@'localhost'  identified  by  '123456';
mysql>  revoke  all  privileges  from  user1;

```

### 2.15 使用mysqldump进行数据库备份

数据库重命名：mysql不能直接对数据库重命名，所以如果想要重名数据库的话，要先导出，接着创建一个新的数据库，然后将导出的sql文件再导入到新的数据库中


```
[adam@ultraera  ~]$  mysqldump  -u  root  -p  ultraera  >  ultraera.sql     #备份
[adam@ultraera  ~]$  mysql  -u  root  -p  new_ultraera  <  ultraera.sql     #恢复到指定数据库

```
