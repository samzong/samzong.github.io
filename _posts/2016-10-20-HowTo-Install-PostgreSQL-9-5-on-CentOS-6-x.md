---
layout: post
title: HowTo Install PostgreSQL 9.5 on CentOS 6.x
tags: 
    - PostgreSQL
categories: 
    - 数据库
    - PostgreSQL
date: 2016-10-20 07:25:37
---

## CentOS 6

### 1. Install PostgreSQL repository and the PostgreSQL server by running the following

```bash
sudo yum install https://download.postgresql.org/pub/repos/yum/9.5/redhat/rhel-6-x86_64/pgdg-centos95-9.5-2.noarch.rpm

sudo yum install postgresql95-serve
```

### 2. Create the PostgreSQL database cluster

```bash
sduo service postgresql-9.5 initdb
```

### 3. Enable automatic PostgreSQL server startup

```bash
sudo chkconfig postgresql-9.5 on
```

### 4. Start the PostgreSQL server

```bash
sudo service postgresql-9.5 start
```

## CentOS 7

### Install PostgreSQL repository and the PostgreSQL server by running the following

```bash
sudo yum install https://download.postgresql.org/pub/repos/yum/9.5 /redhat/rhel-7-x86_64/pgdg-centos95-9.5-2.noarch.rpm

sudo yum install postgresql95-serve
```

### Create the PostgreSQL database cluster

```bash
sudo /usr/pgsql-9.5/bin/postgresql95-setup initdb
```

### Enable automatic PostgreSQL server startup

```bash
sudo systemctl enable postgresql-9.5
```

### Start the PostgreSQL server

```bash
sudo systemctl start postgresql-9.5
```

## Configurations for CentOS

When installing in CentOs env. you will also need to make the following configurations.

### Change authentication to md5

```bash
sudo vi /var/lib/pgsql/9.5/data/pg_hba.conf
```

### Change METHOD to md5

```bash
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5

# IPv6 local connections:
host    all             all             ::1/128                 md5
```

### 3. Restart PostgreSQL
