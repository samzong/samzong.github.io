---
layout: post
title: MySQL 清空表命令之：truncate与delete 区别
tags: 
    - MySQL
categories: 
    - 数据库
    - MySQL
abbrlink: 25198
date: 2016-11-10 02:53:13
---

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在实际工作中，有时我们会想要去清空一张表的所有数据，常用的命令有delete和truncate这两个命令。

### 1. delete
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在很多情况，我们对于delete的应用更多，因为它支持更多的匹配模式，我们可以使用where条件语句，清理一些特定的数据，关于delete的操作，这里不做过多解释，有空就专门写写delete的使用和原理。delete 在清空表时，如果表内有自增ID的设定，那么在delete清空之后，再插入数据时，自增ID不会从1开始，默认会继续增加; 除非我们使用OPTIMIZE TABLE，重置表属性；
```
mysql> delete from piwik_tmp;
Query OK, 0 rows affected (0.00 sec)
```

### 2. truncate
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;truncate 在清空表时，会同时将自增ID重置，再插入新数据时会从1开始，而且truncate在清空表时，不关心表的行数，所以执行效率会高于delete；

```
mysql> truncate table piwik_tmp;
Query OK, 0 rows affected (0.01 sec)

```

### 3. 释放表空间
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;但是在truncate清空表数据时，myisam的表和innodb的表在使用上有一定的区别；myisam表会清空所有数据，并释放表空间，即硬盘空间会得到释放。innodb表也会清空所有数据，但不释放表空间。Innodb数据库对于已经删除的数据只是标记为删除，并不真正释放所占用的磁盘空间，这就导致InnoDB数据库文件不断增长。如果想彻底释放这些已经删除的数据，需要把数据库导出，删除InnoDB数据库文件，然后再导入。
```
# 备份数据库：
mysqldump -u -p --quick --force --all-databases > mysqldump.sql

# 停止数据库
service mysqld stop

# 删除这些大文件
rm /usr/local/mysql/var/ibdata1
rm /usr/local/mysql/var/ib_logfile*

# 手动删除除Mysql之外所有数据库文件夹，然后启动数据库
service mysqld start

# 还原数据
mysql -uroot -proot < mysqldump.sql
```

### 4. innodb\_file\_per_table
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;还有一种方式是在创建数据库的时候设置innodb\_file\_per_table，这样InnoDB会对每个表创建一个数据文件，然后只需要运行OPTIMIZE TABLE 命令就可以释放所有已经删除的磁盘空间。

#### 4.1 修改mysql默认配置文件。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编辑my.ini或my.cnf 在innodb段中加入 innodb\_file\_per_table=1 # 1为启用，0为禁用

#### 4.2 查看修改结果
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;通过mysql语句可以查看该变量的值：
```
mysql> show variables like '%per_table%';
```
