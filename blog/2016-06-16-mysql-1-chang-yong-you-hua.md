---
title: MySQL 常用配置优化
tags: [MySQL]
date: 2016-06-16 02:29:00
---


> **环境：MySQL 5.5 & MySQL 5.6 & RHEL/CentOS 5/6/7**

## 1. MySQL 系统配置优化

网络配置方面：修改/etc/sysctl.conf

```bash
# 增加tcp支持的队列数
net.ipv4.tcp_max_syn_backlog = 65535
# 减少断开时
```

打开文件限制 修改/etc/security/limits.conf

```bash
# 增加：
* sort nofile 65535
* hard nofile 65535
```

## 2.  MySQL 配置文件优化

* 配置文件位置：/etc/my.cnf /etc/mysql/my.cnf

* 如果/etc下没有my.cnf，需要拷贝一份

```bash
cp /usr/share/mysql/my-medium.cnf /etc/my.cnf
```

* 配置文件查找顺序：mysql -verbose --help | grep -A 1 'Default options'

* 常用配置说明：

```bash
 innodb_buffer_pool_size
```

设置 mysql 数据库 innodb 存储缓冲池的大小，如果是独立的 mysql 服务，建议设置为物理内存的 75％左右，如果和 apahce 等服务一起运行时，则根据实际需求设定，尽可能大。

```bash
 innodb_buffer_pool_instances
```

这是 mysql5.5 中新增的一个参数，用于控制缓冲池的个数，默认情况下只有 1 个缓冲池，设置多个缓冲池可以增加并发性，提事物运算效率。

```bash
 innodb_log_buffer_size
```

设定日志缓冲区的大小，由于体制最长每秒就会刷新，不需要太大。

```bash
 innodb_flush_log_at_trx_commit
```

关键参数，对于 innodb 的 IO 效率影响很大，默认值为 1，可以取值 0：不自动同步 log 到磁盘，由 mysql 每秒自动执行，1：将所有事物直接写到磁盘，可以用在保证数据绝对安全的地方，会影响效率，2：先将事物纪录保存在内存中，有 mysql 每秒统一写入磁盘，建议设定为 2

```bash
 innodb_read_io_threads;
 innodb_write_io_threadsm;
```

mysql5.5 新增的两个参数，决定了 Innodb 读写的 io 进程数量，默认为 4，可以根据 CPU 的实际性能设定。

```bash
 innodb_file_per_table
```

关键参数，控制 Innodb 每一个表实用独立的表空间，默认为 off，也就是所有的表都会建立在共享空间，不利于资源回收

```bash
 innodb_stats_on_metadata
```

决定了 mysql 在什么情况下会刷新 innodb 表的统计信息，可以关闭，管理员选取时间手动刷新。存在的目的保证优化器正确找到索引。

 mysql 最大连接数限制

```bash
max_connections=5000
```

 不区分表名称大小写

```bash
lower_case_table_names=1
```

 修改默认字符编码

```bash
# mysql 5.1
default-character-set=utf8

# mysql 5.5 & mysql 5.6
character-set-server=utf8
```

 最大错误操作次数 : 默认是 10，尽量调大，否则容易导致 mysql 对来访主机锁定

```bash
max_connect_errors = 10000
```

 设置 mysql 时区：默认 mysql 使用的系统时区，其实我们也可以在 mysql 内设定时区

```bash
default-time_zone = '+8:00'
```

 以上配置，如何在 mysql 内，检测是否生效

```bash
show variables like '%max_connections%'
show variables like '%time_zone%'
show variables like '%max_connect_errors%'
show variables like '%character-set-server%'
show variables like '%lower_case_table_names%'
```

 修改/etc/my.cnf这是需要重启mysql才能生效，但是很多时候，我们不方便重启mysql，这时我们需要在mysql临时修改配置，注意并不是所有选项都可以在运行中修改，以修改时区为例：

```bash
# 修改全局设置
set global time_zone='+8:00'

# 修改当前会话
set time_zone='+8:00'
```

### 3.  第三方工具对 mysql 配置进行优化

* [http://toolspercona.com](http://toolspercona.com)

先回答问题，然后根据问题你给出的答案，网站会给你一个参考配置。
