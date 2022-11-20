---
layout: post
title: HowTo Install MySQL 5.5/6/7 on RHEL/CentOS 5/6/7
tags: 
    - MySQL
categories: 
    - 数据库
date: 2016-07-07 05:35:32
---

## Install Mysql 5.5 on RHEL/CentOS 5/6/7

### 1. Use Repository

First, to set up the yum repository, install the mysql－community-server 5.5 RPM based on your CentOS/RHEL release:

---

#### mysql-server-5.5.repo for CentOS/RHEL 5.x

```bash
rpm -Uvh http://mirror.webtatic.com/yum/el5/latest.rpm
```

#### * Only Install MySQL 5.5 On CentOS 5.x

If you already have MySql client or server installed (rpm -q mysql mysql-server), then you can upgrade using the following method:

```bash
yum install mysql.`uname -i` yum-plugin-replace
yum replace mysql --replace-with mysql55w
```

“yum install mysql” is only there to make sure yum-plugin-replace can resolve dependencies correctly if only mysql-server was installed.
Otherwise, to install MySql client and server, then run:

```bash
yum install mysql55w mysql55w-server
```

---

#### mysql-server-5.5.repo for CentOS/RHEL 6.x

```bash
# For x86_64
yum install http://repo.mysql.com/yum/mysql-5.5-community/el/6/x86_64/mysql-community-release-el6-5.noarch.rpm

# For i386
yum install http://repo.mysql.com/yum/mysql-5.5-community/el/6/i386/mysql-community-release-el6-5.noarch.rpm
```

#### mysql-server-5.5.repo for CentOS/RHEL 7.x

```bash
# For x86_64
yum install http://repo.mysql.com/yum/mysql-5.5-community/el/7/x86_64/mysql-community-release-el7-5.noarch.rpm

# For i386
yum install http://repo.mysql.com/yum/mysql-5.5-community/el/7/i386/mysql-community-release-el7-5.noarch.rpm
```

### 2. Install MySQL Server 5.5

If you already have MySql client or server installed (rpm -q mysql mysql-server), then you must uninstall using the following method:

```bash
# It's RHEL/CentOS 6/7
yum remove -y mysql-server
yum remove -y mysql*
```

If you don't have mysql-server was installed.
Otherwise, to install MySql client and server, then run:

```bash
yum install -y mysql-community-server
```

### 3. Service Configure

You should upgrade existing tables before setting the server to become a production machine, which can be done by starting the server and running the mysql_upgrade script (this may take time depending on the size of the database).

```bash
service mysqld start
```

This will issue a password prompt for the user. If you don't have a root user password, remove the "-p"

```bash
mysql_secure_installation
```

## Install Mysql 5.6 on RHEL/CentOS 5/6/7

### Use Repository

First, to set up the yum repository, install the mysql－community-server 5.6 RPM based on your CentOS/RHEL release:

#### mysql-server-5.6.repo for CentOS/RHEL 5.x

```bash
# For x86_64
yum install http://repo.mysql.com/yum/mysql-5.6-community/el/5/x86_64/mysql-community-release-el5-5.noarch.rpm

# For i386
yum install http://repo.mysql.com/yum/mysql-5.6-community/el/5/i386/mysql-community-release-el5-5.noarch.rpm
```

#### mysql-server-5.6.repo for CentOS/RHEL 6.x

```bash
# For x86_64
yum install http://repo.mysql.com/yum/mysql-5.6-community/el/6/x86_64/mysql-community-release-el6-5.noarch.rpm

# For i386
yum install http://repo.mysql.com/yum/mysql-5.6-community/el/6/i386/mysql-community-release-el6-5.noarch.rpm
```

#### mysql-server-5.6.repo for CentOS/RHEL 7.x

```bash
# For x86_64
yum install http://repo.mysql.com/yum/mysql-5.6-community/el/7/x86_64/mysql-community-release-el7-5.noarch.rpm

# For i386
yum install http://repo.mysql.com/yum/mysql-5.6-community/el/7/i386/mysql-community-release-el7-5.noarch.rpm
```

### Install MySQL Server 5.6

If you already have MySql client or server installed (rpm -q mysql mysql-server), then you must uninstall using the following method:

```bash
yum remove -y mysql-server
yum remove -y mysql*
```

If you don't have mysql-server was installed.
Otherwise, to install MySql client and server, then run:

```bash
yum install -y mysql-community-server
```

### Service Configure

You should upgrade existing tables before setting the server to become a production machine, which can be done by starting the server and running the mysql_upgrade script (this may take time depending on the size of the database).

```bash
service mysqld start
```

This will issue a password prompt for the user. If you don't have a root user password, remove the "-p"

```bash
mysql_secure_installation
```

## Install Mysql 5.7 on RHEL/CentOS 5/6/7

### Use Repository 5.7

First, to set up the yum repository, install the mysql－community-server 5.7 RPM based on your CentOS/RHEL release:

#### mysql-server-5.7.repo for CentOS/RHEL 5.x

```bash
# For x86_64
yum install http://repo.mysql.com/yum/mysql-5.7-community/el/5/x86_64/mysql-community-release-el5-7.noarch.rpm

# For i386
yum install http://repo.mysql.com/yum/mysql-5.7-community/el/5/i386/mysql-community-release-el5-7.noarch.rpm
```

#### mysql-server-5.7.repo for CentOS/RHEL 6.x

```bash
# For x86_64
yum install http://repo.mysql.com/yum/mysql-5.7-community/el/6/x86_64/mysql-community-release-el6-7.noarch.rpm

# For i386
yum install http://repo.mysql.com/yum/mysql-5.7-community/el/6/i386/mysql-community-release-el6-7.noarch.rpm
```

#### mysql-server-5.7.repo for CentOS/RHEL 7.x

```bash
# For x86_64
yum install http://repo.mysql.com/yum/mysql-5.7-community/el/7/x86_64/mysql-community-release-el7-7.noarch.rpm

# For i386
yum install http://repo.mysql.com/yum/mysql-5.7-community/el/7/i386/mysql-community-release-el7-7.noarch.rpm
```

### 2. Install MySQL Server 5.7

If you already have MySql client or server installed (rpm -q mysql mysql-server), then you must uninstall using the following method:

```bash
yum remove -y mysql-server
yum remove -y mysql*
```

If you don't have mysql-server was installed.
Otherwise, to install MySql client and server, then run:

```bash
yum install -y mysql-community-server
```

### 3. Service Configure*

You should upgrade existing tables before setting the server to become a production machine, which can be done by starting the server and running the mysql_upgrade script (this may take time depending on the size of the database).

```bash
service mysqld start
```

This will issue a password prompt for the user. If you don't have a root user password, remove the "-p"

```bash
mysql_secure_installation
```
