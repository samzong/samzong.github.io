---
layout: post
title: HowTo Install Redmine
tags: 
  - Redmine
categories:
  - OpenSource
  - Redmine
abbrlink: 52896
date: 2017-02-22 12:30:36
---

#### Runtime environment

* CentOS 6.x
* Redmine 3.3.2
* Ruby 2.2.6
* rails 4.2
* MySQL 5.1
* Nginx 1.10

#### 安装rvm

##### 导入公钥

```
[root@localhost ~]# curl -sSL https://rvm.io/mpapis.asc | gpg --import
```

##### 安装

```
[root@localhost ~]# curl -L https://get.rvm.io | bash -s stable
```

##### 加载rvm环境并安装基础依赖包

```
[root@localhost ~]# source /etc/profile.d/rvm.sh
[root@localhost ~]# rvm requirements
```

#### 安装ruby

```
[root@localhost ~]# rvm install 2.2.6
...
[root@localhost ~]# rvm use 2.2.6 --default
```

#### 安装rails

##### 更换gem源

默认gem的源站点是https://rubygems.org 由于国内的网络原因导致无法连接，所以导致无法使用gem安装，这里换成国内淘宝的gem镜像站点

```
[root@localhost ~]# gem sources -l
*** CURRENT SOURCES ***

https://rubygems.org/
[root@localhost ~]# gem sources --remove https://rubygems.org/
[root@localhost ~]# gem sources -a https://ruby.taobao.org/
[root@localhost ~]# gem sources -l
*** CURRENT SOURCES ***

https://ruby.taobao.org/
```

##### 安装

```
[root@localhost ~]# gem install rails -v=4.2
```

#### 安装MySQL

```
[root@localhost ~]# yum install -y mysql-server mysql-libs mysql-devel mysql
[root@localhost ~]# service mysqld start
[root@localhost ~]# mysql_secure_installation
```

#### 安装redmine

##### 下载Redmine 3.3.2

```
[root@localhost ~]# wget http://www.redmine.org/releases/redmine-3.3.2.tar.gz
[root@localhost ~]# tar xf redmine-3.3.2.tar.gz
[root@localhost ~]# mv redmine-3.3.2 /opt
```

##### 安装管理ruby的包管理工具bundler

```
# 注意，一定要在redmine目录下操作
[root@localhost ~]# cd /opt/redmine-3.3.2
[root@localhost redmine-3.3.2]# gem install bundler
```

##### 安装redmine运行所需要的依赖包

```
[root@localhost redmine-3.3.2]# bundle install --without development test rmagick
```

##### 为rails生产cookies秘钥

```
[root@localhost redmine-3.3.2]# rake generate_secret_token
```

##### 创建redmine的数据库

```
mysql> create database redmine character set utf8;
mysql> grant all privileges on redmine.* to 'redmine'@'localhost' identified by 'redmine_pass';
```

##### 修改redmine的database.yml

```
[root@localhost redmine-3.3.2]# cp config/database.yml.example config/database.yml
[root@localhost redmine-3.3.2]# vim config/database.yml
production:
  adapter: mysql2
  database: redmine
  host: localhost
  username: redmine
  password: "redmine_pass"
  encoding: utf8
```

##### 创建数据库结构

```
[root@localhost redmine-3.3.2]# RAILS_ENV=production bundle exec rake db:migrate
```

##### 生产缺省数据

```
[root@localhost redmine-3.3.2]# RAILS_ENV=production bundle exec rake redmine:load_default_data
# 选择默认语言，之后可更改，初始为en
```

##### 测试是否安装成功

```
[root@localhost redmine-3.3.2]# bundle exec rails server webrick -e production -b 0.0.0.0
```

> 默认运行3000端口，默认管理员admin/admin



#### 配置Redmine在Nginx上运行

Redmine常用的解决办法是使用passenger+nginx，但是Nginx不支持装载模块，所以需要重新编译安装Nginx，安装Nginx的Passenger有两种方式

* 采用Passenger提供的脚本进行安装，适合新环境
* 手动编译安装Nginx增加Passenger模块，适合已存在Nginx环境

##### 采用Passenger提供脚本安装

```
[root@localhost redmine-3.3.2]# gem install passenger
[root@localhost redmine-3.3.2]# passenger-install-nginx-module --auto --prefix=/opt/nginx
```

##### 采用重新编译Nginx增加Passenger模块

```
# 获取passenger的安装路径
[root@localhost ~]# passenger-config --root
/usr/local/rvm/gems/ruby-2.2.6/gems/passenger-5.1.2

# 重新编译Nginx并添加模块
[root@localhost ~]# wget http://nginx.org/download/nginx-1.10.3.tar.gz
[root@localhost ~]# tar xf nginx-1.10.3.tar.gz
[root@localhost ~]# cd nginx-1.10.3
[root@localhost nginx-1.10.3]# ./configure ... -add-module=/usr/local/rvm/gems/ruby-2.2.6/gems/passenger-5.1.2
```

##### 增加HTTP模块内以下配置

```
passenger_root /usr/local/rvm/gems/ruby-2.2.6/gems/passenger-5.1.2
```

##### 配置nginx.conf 修改server模块中location的配置

```
# ...
server	{
  # ...
  passenger_enabled on;
  location / {
    root /opt/redmine-3.3.2/public;
    index index.html index.htm;
  }
}
# ...
```

##### 启动Nginx

```
[root@localhost ~]# /root/nginx-1.10.3/sbin/nginx -c /root/nginx-1.10.3/conf/nginx.conf
```

#### 其他

到这里，所有的安装都完成了，过程中我遇到这些问题，你也注意下：

##### 7.1 Could not find gem 'mysql2 (~> 0.3.11)' in any of the gem sources listed in your Gemfile.

```
[root@localhost redmine-3.3.2]# rm -f Gemfile.lock
[root@localhost redmine-3.3.2]# bundle install
```





##### 7.2 curl-tools

```
yum install libcurl-devel
```



