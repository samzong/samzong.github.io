---
layout: post
title: MySQL 清空表命令之：truncate 与 delete 区别
tags: 
    - MySQL
categories: 
    - 数据库
date: 2016-11-10 02:53:13
---

在实际工作中，有时我们会想要去清空一张表的所有数据，常用的命令有 delete 和 truncate 这两个命令。

### 1. delete

在很多情况，我们对于 delete 的应用更多，因为它支持更多的匹配模式，我们可以使用 where 条件语句，清理一些特定的数据，关于 delete 的操作，这里不做过多解释，有空就专门写写 delete 的使用和原理。delete 在清空表时，如果表内有自增 ID 的设定，那么在 delete 清空之后，再插入数据时，自增 ID 不会从 1 开始，默认会继续增加; 除非我们使用 OPTIMIZE TABLE，重置表属性；

```sql
mysql> delete from piwik_tmp;
Query OK, 0 rows affected (0.00 sec)
```

### 2. truncate

truncate 在清空表时，会同时将自增 ID 重置，再插入新数据时会从 1 开始，而且 truncate 在清空表时，不关心表的行数，所以执行效率会高于 delete；

```sql
mysql> truncate table piwik_tmp;
Query OK, 0 rows affected (0.01 sec)

```

### 3. 释放表空间

但是在 truncate 清空表数据时，myisam 的表和 innodb 的表在使用上有一定的区别；myisam 表会清空所有数据，并释放表空间，即硬盘空间会得到释放。innodb 表也会清空所有数据，但不释放表空间。Innodb 数据库对于已经删除的数据只是标记为删除，并不真正释放所占用的磁盘空间，这就导致 InnoDB 数据库文件不断增长。如果想彻底释放这些已经删除的数据，需要把数据库导出，删除 InnoDB 数据库文件，然后再导入。

```sql
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

还有一种方式是在创建数据库的时候设置 innodb\_file\_per_table，这样 InnoDB 会对每个表创建一个数据文件，然后只需要运行 OPTIMIZE TABLE 命令就可以释放所有已经删除的磁盘空间。

#### 4.1 修改 mysql 默认配置文件

编辑 my.ini 或 my.cnf 在 innodb 段中加入 innodb\_file\_per_table=1 # 1 为启用，0 为禁用

#### 4.2 查看修改结果

通过 mysql 语句可以查看该变量的值：

```sql
mysql> show variables like '%per_table%';
```
