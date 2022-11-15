---
layout: post
title: mysqldump 常用参数
tags: 
    - MySQL
categories: 
    - 数据库
    - MySQL
abbrlink: 44198
date: 2016-05-05 04:30:11
---

常用的mysqldump命令组合。

## 备份数据库
```
mysqldump db_name > bak_name.sql
mysqldump -A -u [dbuser] -p db_name > bak_name.sql
mysqldump -d -A --add-drop-table -uroot -p >xxx.sql
```

## 备份所有库到一个单独的文件
```shell
mysql -e 'show databases' | sed -n '2,$p' | xargs -I DB 'mysqldump DB > DB.sql'
```

### 1. 导出结构不导出数据
```
mysqldump　--opt　-d　db_name　-u　root　-p　>　xxx.sql
```

### 2. 导出数据不导出结构
```
mysqldump　-t　db_name　-uroot　-p　>　xxx.sql
```

### 3. 导出数据和表结构
```
mysqldump　db_name　-uroot　-p　>　xxx.sql
```

### 4. 导出特定表的结构
```
mysqldump　-uroot　-p　-B　db_name　--table　tb_name　>　xxx.sql
```

## 导入数据
 因为mysqldump导出的是完整的SQL语句，所以用mysql客户程序很容易就能把数据导入了：
```
mysql -u db_user -p db_name  < xxx.sql
mysql> source /path/xxx.sql
```

## mysqldump参数详解：
<code>–all-databases , -A </code>
导出全部数据库<br>
mysqldump -uroot -p –all-databases

<code>–all-tablespaces , -Y</code>
导出全部表空间<br>
mysqldump -uroot -p –all-databases –all-tablespaces

<code>–no-tablespaces , -y</code>
不导出任何表空间信息<br>
mysqldump -uroot -p –all-databases –no-tablespaces

<code>–add-drop-database</code>
每个数据库创建之前添加drop数据库语句<br>
mysqldump -uroot -p –all-databases –add-drop-database

<code>–add-drop-table</code>
每个数据表创建之前添加drop数据表语句。(默认为打开状态，使用–skip-add-drop-table取消选项)<br>
mysqldump -uroot -p –all-databases (默认添加drop语句)
mysqldump -uroot -p –all-databases –skip-add-drop-table (取消drop语句)

<code>–add-locks</code>
在每个表导出之前增加LOCK TABLES并且之后UNLOCK TABLE。(默认为打开状态，使用–skip-add-locks取消选项)<br>
mysqldump -uroot -p –all-databases(默认添加LOCK语句)
mysqldump -uroot -p –all-databases –skip-add-locks (取消LOCK语句)

<code>–comments</code>
附加注释信息。<br>
默认为打开，可以用–skip-comments取消mysqldump -uroot -p –all-databases (默认记录注释)mysqldump -uroot -p –all-databases "code"
skip-comments (取消注释)

<code>–compact</code>
导出更少的输出信息(用于调试),去掉注释和头尾等结构,可以使用选项：–skip-add-drop-table –skip-add-locks –skip-comments –skip-disable-keys<br>
mysqldump -uroot -p –all-databases –compact

<code>–complete-insert, -c</code>
使用完整的insert语句(包含列名称)。这么做能提高插入效率，但是可能会受到max_allowed_packet参数的影响而导致插入失败。<br>
mysqldump -uroot -p –all-databases –complete-insert

<code>–compress, -C</code>
在客户端和服务器之间启用压缩传递所有信息<br>
mysqldump -uroot -p –all-databases –compress

<code>–databases, -B</code>
导出几个数据库。参数后面所有名字参量都被看作数据库名。<br>
mysqldump -uroot -p –databases test mysql

<code>–debug</code>
输出debug信息，用于调试。<br>
默认值为：d:t:o,/tmp/mysqldump.trace<br>
mysqldump -uroot -p –all-databases –debug<br>
mysqldump -uroot -p –all-databases –debug="d:t:o,/tmp/debug.trace"

<code>–debug-info</code>
输出调试信息并退出<br>
mysqldump -uroot -p –all-databases –debug-info

<code>–default-character-set</code>
设置默认字符集，默认值为utf8<br>
mysqldump -uroot -p –all-databases –default-character-set=latin1

<code>–delayed-insert</code>
采用延时插入方式（INSERT DELAYED）导出数据<br>
mysqldump -uroot -p –all-databases –delayed-insert

<code>–events, -E</code>
导出事件<br>
mysqldump -uroot -p –all-databases –events

<code>–flush-logs</code>
开始导出之前刷新日志<br>
请注意：假如一次导出多个数据库(使用选项–databases或者–all-databases)，将会逐个数据库刷新日志。除使用–lock-all-tables或者–master-data外。在这种情况下，日志将会被刷新一次，相应的所以表同时被锁定。因此，如果打算同时导出和刷新日志应该使用–lock-all-tables 或者–master-data 和–flush-logs.<br>
mysqldump -uroot -p –all-databases –flush-logs

<code>–flush-privileges</code>
在导出mysql数据库之后，发出一条FLUSH PRIVILEGES 语句。为了正确恢复，该选项应该用于导出mysql数据库和依赖mysql数据库数据的任何时候。<br>
mysqldump -uroot -p –all-databases –flush-privileges


<code>–force</code>
在导出过程中忽略出现的SQL错误<br>
mysqldump -uroot -p –all-databases –force

<code>–host, -h</code>
需要导出的主机信息<br>
mysqldump -uroot -p –host=localhost –all-databases

<code>–ignore-table</code>

不导出指定表。
指定忽略多个表时，需要重复多次，每次一个表。每个表必须同时指定数据库和表名.
例如：<br>–ignore-table=database.table1 –ignore-table=database.table2 ……<br>
mysqldump -uroot -p –host=localhost –all-databases –ignore-table=mysql.user


<code>–lock-all-tables, -x</code>
提交请求锁定所有数据库中的所有表，以保证数据的一致性。
这是一个全局读锁，并且自动关闭–single-transaction 和–lock-tables 选项。<br>
mysqldump -uroot -p –host=localhost –all-databases –lock-all-tables

<code>–lock-tables, -l</code>
开始导出前，锁定所有表。<br>
用READ LOCAL锁定表以允许MyISAM表并行插入。对于支持事务的表例如InnoDB和BDB，–single-transaction是一个更好的选择，因为它根本不需要锁定表.<br />
请注意当导出多个数据库时，–lock-tables分别为每个数据库锁定表。因此，该选项不能保证导出文件中的表在数据库之间的逻辑一致性。不同数据库表的导出状态可以完全不同。<br>
mysqldump -uroot -p –host=localhost –all-databases –lock-tables

<code>–no-create-db, -n </code>
只导出数据，而不添加CREATE DATABASE 语句。<br>
mysqldump -uroot -p –host=localhost –all-databases –no-create-db

<code>–no-create-info,-t</code>
只导出数据，而不添加CREATE TABLE 语句<br>
mysqldump -uroot -p –host=localhost –all-databases –no-create-info

<code> –no-data, -d </code>
不导出任何数据，只导出数据库表结构<br>
mysqldump -uroot -p –host=localhost –all-databases –no-data

<code> –password, -p </code>
连接数据库密码

<code> –port, -P </code>
连接数据库端口号

<code> –user, -u </code>
指定连接的用户名。
