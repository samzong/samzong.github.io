---
layout: post
title: HowTo Use pt-query-digest
tags: 
    - MySQL
categories: 
    - 数据库
    - MySQL
abbrlink: 62741
date: 2016-09-22 15:20:12
---





### 1. 简介
索引可以我们更快速的执行查询，但是肯定存在不合理的索引，如果想找到那些索引不是很合适的查询，并在它们成为问题前进行优化，则可以使用pt-query-digest的查询审查“review”功能，分析其EXPLAIN出来的执行计划。

pt-query-digest是用于分析mysql慢查询的一个工具，它可以分析binlog、General log、slowlog，也可以通过SHOWPROCESSLIST或者通过tcpdump抓取的MySQL协议数据来进行分析。可以把分析结果输出到文件中，分析过程是先对查询语句的条件进行参数化，然后对参数化以后的查询进行分组统计，统计出各查询的执行时间、次数、占比等，可以借助分析结果找出问题进行优化。

### 2. Install Percona Toolkit & pt-query-digest
percona-toolkit是一组高级命令行工具的集合，用来执行各种通过手工执行非常复杂和麻烦的mysql和系统任务。这些任务包括：

* 检查master和slave数据的一致性
* 有效地对记录进行归档
* 查找重复的索引
* 对服务器信息进行汇总
* 分析来自日志和tcpdump的查询
* 当系统出问题的时候收集重要的系统信息

```
[root@ultrera ~]# wget percona.com/get/percona-toolkit.tar.gz
--2016-09-22 09:17:00--  http://percona.com/get/percona-toolkit.tar.gz
Resolving percona.com... 74.121.199.234, 74.121.199.234
Connecting to percona.com|74.121.199.234|:80... connected.
HTTP request sent, awaiting response... 301 Moved Permanently
Location: https://www.percona.com/get/percona-toolkit.tar.gz [following]
--2016-09-22 09:17:02--  https://www.percona.com/get/percona-toolkit.tar.gz
Resolving www.percona.com... 74.121.199.234, 74.121.199.234
Connecting to www.percona.com|74.121.199.234|:443... connected.
HTTP request sent, awaiting response... 302 Found
Location: https://www.percona.com/downloads/percona-toolkit/2.2.19/tarball/percona-toolkit-2.2.19.tar.gz [following]
--2016-09-22 09:17:03--  https://www.percona.com/downloads/percona-toolkit/2.2.19/tarball/percona-toolkit-2.2.19.tar.gz
Reusing existing connection to www.percona.com:443.
HTTP request sent, awaiting response... 200 OK
Length: 1425623 (1.4M) [application/x-gzip]
Saving to: “percona-toolkit.tar.gz”

100%[=======================>] 1,425,623    766K/s   in 1.8s

2016-09-22 09:17:05 (766 KB/s) - “percona-toolkit.tar.gz” saved [1425623/1425623]

[root@ultrera ~]# tar xf percona-toolkit.tar.gz
[root@ultrera ~]# ls
percona-toolkit-2.2.19  percona-toolkit.tar.gz
[root@ultrera ~]# cd percona-toolkit-2.2.19
[root@ultrera percona-toolkit-2.2.19]# perl Makefile.PL
Warning: prerequisite DBD::mysql 3 not found.
Writing Makefile for percona-toolkit
[root@ultrera percona-toolkit-2.2.19]# make
cp bin/pt-mysql-summary blib/script/pt-mysql-summary
....
Manifying blib/man1/pt-index-usage.1p
Manifying blib/man1/pt-duplicate-key-checker.1p
Manifying blib/man1/pt-config-diff.1p
Manifying blib/man1/pt-stalk.1p
[root@ultrera percona-toolkit-2.2.19]# make install
Installing /usr/local/share/man/man1/pt-query-digest.1p
...
Installing /usr/local/bin/pt-query-digest
...
Appending installation info to /usr/lib64/perl5/perllocal.pod
```
> 运行工具可能会遇到下面的错误: Can't locate Time/HiRes.pm in @INC

```
# 解决办法：
[root@ultrera ~]# yum install -y perl-Time-HiRes
[root@ultrera ~]# pt-query-digest --version
pt-query-digest 2.2.19
```

### 3. 开启 mysql慢日志
##### a. 查看当前‘slow_query_log’ 状态：
```
mysql> show variables like '%query%';
+------------------------------+---------------------------------+
| Variable_name                | Value                           |
+------------------------------+---------------------------------+
| binlog_rows_query_log_events | OFF                             |
| ft_query_expansion_limit     | 20                              |
| have_query_cache             | YES                             |
| long_query_time              | 10.000000                       |
| query_alloc_block_size       | 8192                            |
| query_cache_limit            | 1048576                         |
| query_cache_min_res_unit     | 4096                            |
| query_cache_size             | 1048576                         |
| query_cache_type             | OFF                             |
| query_cache_wlock_invalidate | OFF                             |
| query_prealloc_size          | 8192                            |
| slow_query_log               | OFF                             |
| slow_query_log_file          | /var/lib/mysql/ultrera-slow.log |
+------------------------------+---------------------------------+
13 rows in set (0.00 sec)

mysql> show variables like 'log_queries_not_using_indexes';
+-------------------------------+-------+
| Variable_name                 | Value |
+-------------------------------+-------+
| log_queries_not_using_indexes | OFF   |
+-------------------------------+-------+
1 row in set (0.00 sec)
```
##### b. 启动slow_log, 配置
```
# 设定记录大于2s的sql
mysql> set global long_query_time=2;
Query OK, 0 rows affected (0.00 sec)

# 设定log存放路径
mysql> set global slow_query_log_file='/tmp/ultraera-slow.log';
Query OK, 0 rows affected (0.00 sec)

# 启用慢日志
mysql> set global slow_query_log=ON;
Query OK, 0 rows affected (0.00 sec)

# 同时记录没有使用索引的sql
mysql> set global log_queries_not_using_indexes=on;
Query OK, 0 rows affected (0.00 sec)
```

> 等待一段时间，slow.log 增大的非常快，实际生产中，注意不要被slow.log将磁盘撑满，影响到正常生产使用。

### 4. 分析
pt-query-digest可以从普通MySQL日志，慢查询日志以及二进制日志中分析查询，甚至可以从SHOW PROCESSLIST和MySQL协议的tcpdump中进行分析，如果没有指定文件，它从标准输入流（STDIN）中读取数据。
##### a. 简单使用方法：
```
pt-query-digest slow.logs
```
输出信息如下：

<div align="left">
![](http://images.cnitblog.com/blog/288950/201312/14135450-6f7a732598054f7aa311e95cbd4df3b1.png)
</div>

<ul>
1. Overall这个部分是一个大致的概要信息(类似loadrunner给出的概要信息)，通过它可以对当前MySQL的查询性能做一个初步的评估，比如各个指标的最大值(max)，平均值(min)，95%分布值，中位数(median)，标准偏差(stddev)
<li>查询的执行时间（Exec time）</li>
<li>锁占用的时间（Lock time）</li>
<li>MySQL执行器需要检查的行数（Rows examine）</li>
<li>最后返回给客户端的行数（Rows sent）</li>
<li>查询的大小。</li>
</ul>
<ul>
2. Profile
<li>Rank ： 整个分析中该“语句”的排名，一般也就是性能最慢的</li>
<li>Query ID ：每个查询都有一个</li>
<li>Response time ： “语句”的响应时间以及整体占比情况。</li>
<li>Calls ：“语句”的执行次数</li>
<li>R/Call ：每次执行的平均响应时间。 </li>
<li>V/M</li>
</ul>
##### 详细信息
<p>列出上面Profile中每个Query ID的详细信息</p>

##### b. 从tcpdump包中分析：通过tcpdump命令抓取一定时间网络数据包，然后进行分析：
```
pt-query-digest --type tcpdump mysql.tcp.txt
```


##### c. pt-query-digest 还支持很对其他的数据包分析形势，但是我们主要使用的还是针对慢日志进行分析
> 更多的帮助文档，请查看官方文档：http://www.percona.com/doc/percona-toolkit/2.2/pt-query-digest.html

### 5. 使用Anemometer将pt-query-digest的MySQL慢查询可视化

* 需要安装php 5.3 and over
* 需要预先配置mysql数据库
* 需要预先安装好pt-query-digest

##### 5.1 安装
```
[root@ultrera ~]# git clone https://github.com/box/Anemometer.git anemometer

[root@ultrera ~]# mv anemometer /var/www/html
[root@ultrera ~]# cd /var/www/html/anemometer/
[root@ultrera anemometer]# mysql -h localhost -u root -p < mysql56-install.sql
[root@ultrera anemometer]# mysql -h localhost -u root -p -e "grant all privileges on slow_query_log.* to 'anemometer'@'%' identified by 'anemometer';"
```
##### 5.2 配置
```
[root@ultrera anemometer]# cp conf/sample.config.inc.php conf/config.inc.php
[root@ultrera anemometer]# vim conf/config.inc.php

# line 48,49 and line 284,285
设置数据库的用户名和密码;

[root@ultrera anemometer]# vim conf/config.inc.php
# line 7,8
设置数据库的用户名和密码;
```
##### 5.3 导入
将pt-query-digest 的分析结果到anemometer；

> pt-query-digest version < 2.2

```
$ pt-query-digest --user=anemometer --password=superSecurePass \
                  --review h=db.example.com,D=slow_query_log,t=global_query_review \
                  --review-history h=db.example.com,D=slow_query_log,t=global_query_review_history \
                  --no-report --limit=0% \
                  --filter=" \$event->{Bytes} = length(\$event->{arg}) and \$event->{hostname}=\"$HOSTNAME\"" \
                  /var/lib/mysql/db.example.com-slow.log
```

> pt-query-digest version >= 2.2

```
pt-query-digest --user=anemometer --password=superSecurePass \
                  --review h=db.example.com,D=slow_query_log,t=global_query_review \
                  --history h=db.example.com,D=slow_query_log,t=global_query_review_history \
                  --no-report --limit=0% \
                  --filter=" \$event->{Bytes} = length(\$event->{arg}) and \$event->{hostname}=\"$HOSTNAME\"" \
                  /var/lib/mysql/db.example.com-slow.log


Pipeline process 11 (aggregate fingerprint) caused an error: Argument "57A" isn't numeric in numeric gt (>) at (eval 40) line 6, <> line 27.
Pipeline process 11 (aggregate fingerprint) caused an error: Argument "57B" isn't numeric in numeric gt (>) at (eval 40) line 6, <> line 28.
Pipeline process 11 (aggregate fingerprint) caused an error: Argument "57C" isn't numeric in numeric gt (>) at (eval 40) line 6, <> line 29.
```

