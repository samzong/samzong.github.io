---
title: How to install MariaDB 10.1 on CentOS 7.x
tags: [MySQL]
---

CentOS 7.x 默认的 MariaDB 版本是 5.5，但是在有些情况我们需要用到 10 版本，注意 MariaDB 与 MySQL 版本是不一样的，下面简单降下如何快速安装 MariaDB10.1 到 CentOS 7.x.

## 创建 MariaDB 10.1 的 Yum 源

```bash
cat <<EOF | sudo tee -a /etc/yum.repos.d/MariaDB.repo
# MariaDB 10.1 CentOS repository list
# http://downloads.mariadb.org/mariadb/repositories/
[mariadb]
name = MariaDB
baseurl = http://yum.mariadb.org/10.1/centos7-amd64
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1
EOF
```

> 注意 MariaDB 会随着时间的推移版本不断更新，你可以到[repo 仓库](http://downloads.mariadb.org/mariadb)获取对应版本链接

## 使用 Yum 安装 MariaDB 10.1 即可

```bash
sudo yum install MariaDB-server MariaDB-client -y
```

## 启动 MariaDB 并设置为开机自启动

```bash
sudo systemctl start mariadb.service
sudo systemctl enable mariadb.service
```

## 初始化 MariaDB 设置

```bash
sudo /usr/bin/mysql_secure_installation

# 回答以下问题，请记住你的数据库root用户密码:

Enter current password for root (enter for none):  回车
Set root password? [Y/n]: Y
New password: 你要设置的数据库root密码
Re-enter new password: 你要设置的数据库root密码
Remove anonymous users? [Y/n]: Y
Disallow root login remotely? [Y/n]: Y
Remove test database and access to it? [Y/n]: Y
Reload privilege tables now? [Y/n]: Y
```
