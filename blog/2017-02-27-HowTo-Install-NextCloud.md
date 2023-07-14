---
title: HowTo Install NextCloud
tags: []
date: 2017-02-27 14:57:00
---


随着最近一个云盘厂家不再提供个人服务，或者开始各种收费限速，自己存放在第三方云盘厂商的数据被盗取，数据的安全性和数据的稳定性都得不到保证，而且随着智能终端的普及，我也有一些更加高质量的图片文件需要大量储存，所以我想到了自建存储服务的方式，在甄别了 OwnCloud，Seafiles 和 NextCloud，最后选择了 NextCloud 作为自己今后数据存储节点，NextCloud 源自 OwnCloud，但是近些年来 OwnCloud 的发展进度几乎停滞，多数开发者也转战 NextCloud，当然 NextCloud 也继承了搭建简单，依赖于 PHP 环境的特性。

## 运行环境

* 阿里云 ECS CentOS 6.x
* 免费 SSL 证书 (腾讯云申请)

## 搭建 LNMP 环境

### 软件版本

* PHP 5.6.30   [安装教程](https://samzong.me/php54-centos6/)
* MySQL 5.6.35  [安装教程](https://samzong.me/how-to-install-mysql-5-6-on-centos/)
* Nginx 1.10.2

### 基础环境安装

```bash
[root@ultraera ~]# yum update -y
[root@ultraera ~]# yum groupinstall -y "Base"
[root@ultraera ~]# yum groupinstall -y "Development tools"

# Install epel
[root@ultraera ~]# yum install -y epel-release

# Install remi
[root@ultraera ~]# yum install http://rpms.famillecollet.com/enterprise/remi-release-6.rpm

# Install mysql-community
[root@ultraera ~]# yum install http://repo.mysql.com/yum/mysql-5.6-community/el/6/x86_64/mysql-community-release-el6-7.noarch.rpm
```

### Install LNMP

```bash
# Install MySQL
[root@ultraera ~]# yum --enablerepo=mysql-community install -y mysql-server mysql-libs mysql-devel
[root@ultraera ~]# service mysqld start
[root@ultraera ~]# mysql_secure_installation
[root@ultraera ~]# chkconfig mysqld on

# Install Nginx
[root@ultraera ~]# yum --enablerepo=epel install -y nginx
[root@ultraera ~]# service nginx start
[root@ultraera ~]# chkconfig nginx on

# Install PHP and php-fpm
[root@ultraera ~]# yum --enablerepo=remi-php56 install php php-fpm php-mysql php-gd php-xml php-redis php-libs php-devel php-zlib
[root@ultraera ~]# service php-fpm start
[root@ultraera ~]# chkconfig php-fpm on
[root@ultraera ~]# service nginx restart
```

### 下载 NextCloud

```bash
[root@ultraera ~]# wget https://download.nextcloud.com/server/releases/nextcloud-11.0.1.tar.bz2
[root@ultraera ~]# tar xf nextcloud-11.0.1.tar.bz2
[root@ultraera ~]# mv nextcloud-11.0.1 /opt/nextcloud
```

### 配置 Nginx 和 php-fpm

因为 php-fpm 默认运行的用户身份是 apache，我们这里使用的环境是 nginx，所有要修改 php-fpm 配置文件的用户和组，注意不要为了省事直接改为 root，这在 php-fpm 中是不允许的

```bash
[root@ultraera ~]# vim /etc/php-fpm.d/www.conf
user=nginx
group=nginx
[root@ultraera ~]# service php-fpm restart
```

因为 NextCloud 默认是以 Apache 的身份运行的，所以我们需要单独配置 NextCloud 的 Nginx 配置文件，以下配置文件，你可以直接拿去用，注意在文件中说明了，需要修改的地方：

```bash
[root@ultraera ~]# vim /etc/nginx/conf.d/nextcloud.conf
 upstream php-handler {
   # 这里是你php-fpm的服务端口，默认是9000
    server 127.0.0.1:9000;
    #server unix:/var/run/php5-fpm.sock;
}

server {
   # 你的域名
    listen pan.ultraera.org:80;
    server_name pan.ultraera.org;
    # enforce https
    return 301 https://$server_name$request_uri;
}

server {
    # 你的域名
    listen pan.ultraera.org:443 ssl;
    server_name pan.ultraera.org;

   # 以下是你的ssl证书文件存放路径
    ssl_certificate /etc/nginx/ssl/1_pan.ultraera.org_bundle.crt;
    ssl_certificate_key /etc/nginx/ssl/2_pan.ultraera.org.key;

    # Add headers to serve security related headers
    # Before enabling Strict-Transport-Security headers please read into this
    # topic first.
    # add_header Strict-Transport-Security "max-age=15768000;
    # includeSubDomains; preload;";
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Robots-Tag none;
    add_header X-Download-Options noopen;
    add_header X-Permitted-Cross-Domain-Policies none;
 add_header Strict-Transport-Security "max-age=15552000; includeSubdomains; ";

    # 设定你的NextCloud的根目录，请根据实际修改
    root /opt/nextcloud/;

    location = /robots.txt {
        allow all;
        log_not_found off;
        access_log off;
    }

    # The following 2 rules are only needed for the user_webfinger app.
    # Uncomment it if you're planning to use this app.
    #rewrite ^/.well-known/host-meta /public.php?service=host-meta last;
    #rewrite ^/.well-known/host-meta.json /public.php?service=host-meta-json
    # last;

    location = /.well-known/carddav {
      return 301 $scheme://$host/remote.php/dav;
    }
    location = /.well-known/caldav {
      return 301 $scheme://$host/remote.php/dav;
    }

    # set max upload size
    client_max_body_size 512M;
    fastcgi_buffers 64 4K;

    # Disable gzip to avoid the removal of the ETag header
    gzip off;

    # Uncomment if your server is build with the ngx_pagespeed module
    # This module is currently not supported.
    #pagespeed off;

    error_page 403 /core/templates/403.php;
    error_page 404 /core/templates/404.php;

    location / {
        rewrite ^ /index.php$uri;
   }

    location ~ ^/(?:build|tests|config|lib|3rdparty|templates|data)/ {
        deny all;
    }
    location ~ ^/(?:\.|autotest|occ|issue|indie|db_|console) {
        deny all;
    }

    location ~ ^/(?:index|remote|public|cron|core/ajax/update|status|ocs/v[12]|updater/.+|ocs-provider/.+|core/templates/40[34])\.php(?:$|/) {
        include fastcgi_params;
        fastcgi_split_path_info ^(.+\.php)(/.*)$;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
        fastcgi_param HTTPS on;
        #Avoid sending the security headers twice
        fastcgi_param modHeadersAvailable true;
        fastcgi_param front_controller_active true;
        fastcgi_pass php-handler;
        fastcgi_intercept_errors on;
        fastcgi_request_buffering off;
    }

    location ~ ^/(?:updater|ocs-provider)(?:$|/) {
        try_files $uri/ =404;
        index index.php;
    }

    # Adding the cache control header for js and css files
    # Make sure it is BELOW the PHP block
    location ~* \.(?:css|js|woff|svg|gif)$ {
        try_files $uri /index.php$uri$is_args$args;
        add_header Cache-Control "public, max-age=7200";
        # Add headers to serve security related headers (It is intended to
        # have those duplicated to the ones above)
        # Before enabling Strict-Transport-Security headers please read into
        # this topic first.
        # add_header Strict-Transport-Security "max-age=15768000;
        #  includeSubDomains; preload;";
        add_header X-Content-Type-Options nosniff;
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-XSS-Protection "1; mode=block";
        add_header X-Robots-Tag none;
        add_header X-Download-Options noopen;
        add_header X-Permitted-Cross-Domain-Policies none;
        # Optional: Don't log access to assets
        access_log off;
    }

    location ~* \.(?:png|html|ttf|ico|jpg|jpeg)$ {
        try_files $uri /index.php$uri$is_args$args;
        # Optional: Don't log access to other assets
        access_log off;
    }
}
[root@ultraera ~]# service nginx restart
```

### 文件权限调整

因为 NextCloud 运行是以 nginx 程序，注意修改目录所属用户和组为 nginx

```bash
[root@ultraera ~]# chown -R nginx:nginx /opt/nextcloud
```

### 创建 MySQL 数据库

```bash
mysql> CREATE DATABASE nextcloud CHARACTER SET UTF-8;
mysql> GRANT ALL PRIVILEGES ON nextcloud.* TO 'nextcloud'@'localhost' IDENTIFIED BY 'your_password';
mysql> FLUSH PRIVILEGES;
```

## 初始化 NextCloud

在浏览器打开你在 nginx 中配置的域名，NextCloud 初始化非常简单，设定一个管理员账户和密码，然后设定数据库即可，按照我们上一步针对 MySQL 的设定，你会非常清楚地知道你的数据库信息：

![image](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/jjkqh.png)

登录之后的界面是这样：

![image](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/7n28v.png)

你可以在登录之后，在你的右上角点击头像选择 Admin 进入管理界面查看和修改你的服务器设置，你还可以在浏览器上方看到你的服务器现有哪些问题，会有对应文档提醒你如何解决这些问题。

![image](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/yx34e.png)

## Other

### 修改默认 data 目录

在我们首次打开 NextCloud 网页时，需要我们设定 datadir 目录，这里有个默认目录在 nextcloud 项目包，这其实是不安全的，我们最后将目录路径修改为其他位置：

```bash
[root@ultraera ~]# mkdir /nextcloud_files/
[root@ultraera ~]# chown -R nginx:nginx /nextcloud_files/

# 修改datadirectory的路径
[root@ultraera ~]# vim /opt/nextcloud/config/config.php
datadirectory' => '/nextcloud/data
```

### 无法登陆到个人用户界面

我在安装时碰到这个问题，折腾了很久才解决，因为我们是使用 nginx 程序，但是 php-fpm 默认用户身份为 apache，所以`/var/lib/php/session`目录的所属用户和组都是 apache，导致我们没有权限去写入 session，所以无法登入系统，报错信息可以在 NextCloud 的 log 文件下看到：

```bash
[root@ultraera ~]# tail -n 1 /usr/nextcloud/data/nextcloud.log
{"reqId":"NNnIwMCCPDMQtzZW5Ndc","remoteAddr":"180.166.66.226","app":"PHP","message":"session_write_close(): Failed to write session data (files). Please verify that the current setting of session.save_path is correct (\/var\/lib\/php\/session) at \/usr\/nextcloud\/lib\/private\/Session\/Internal.php#104","level":3,"time":"2017-02-24T10:46:13+00:00","method":"POST","url":"\/index.php","user":"samzong","version":"11.0.0.10"}

# 修改/var/lib/php/的属组为nginx即可
[root@ultraera ~]# chgrp -R nginx /var/lib/php
```

### 增加 redis 组件，提高性能

关于如何安装 redis 我在之前的文章中也有讲到，大家可以去看下 [安装教程](https://samzong.me/redis01/)

```bash
[root@ultraera ~]# yum --enablerepo=remi install -y redis

# 增加php的redis插件
[root@ultraera ~]# yum --enablerepo=remi-php56 install php-redis

# 配置文件增加redis
  'memcache.local' => '\\OC\\Memcache\\Redis',
  'memcache.locking' => '\\OC\\Memcache\\Redis',
  'redis' =>
   array (
    'host' => 'localhost',
    'port' => 6379,
   )

# 重启令服务生效
[root@ultraera ~]# service php-fpm restart
[root@ultraera ~]# service nginx restart
```

我的 NextCloud 配置如下：

```bash
<?php
$CONFIG = array (
  'memcache.local' => '\\OC\\Memcache\\Redis',
  'memcache.locking' => '\\OC\\Memcache\\Redis',
  'redis' =>
  array (
    'host' => 'localhost',
    'port' => 6379,
  ),
  'enable_previews' => false,
  'instanceid' => 'ockhup01dxbf',
  'passwordsalt' => 'TlJgWGrE0N7vOrRfZkOojwdYh/BixL',
  'secret' => '/IQh0LioZp5eYFQJhicY7n324Q80WQUYOzWL+8OcxcXVw3Ef',
  'trusted_domains' =>
  array (
    0 => 'pan.ultraera.org',
  ),
  'datadirectory' => '/nextcloud',
  'overwrite.cli.url' => 'https://pan.ultraera.org',
  'dbtype' => 'mysql',
  'version' => '11.0.0.10',
  'dbname' => 'nextcloud',
  'dbhost' => 'localhost',
  'dbport' => '',
  'dbtableprefix' => 'oc_',
  'dbuser' => 'nextcloud',
  'dbpassword' => 'nextcloud',
  'logtimezone' => 'CST',
  'installed' => true,
  'mail_from_address' => 'luchuanjia',
  'mail_smtpmode' => 'php',
  'mail_domain' => 'msn.com',
);
```

### SSL 证书

现国内提供免费的 SSL 证书的服务商很多，作为个人站点，免费 SSL 证书是个挺不错的选择，我在之前 nginx 配置时将 ssl 的配置方式写在了配置文件中了，注意如果不启用 ssl 时，不要启用 https 的虚拟主机，当然你可以自己生成一个 ssl 证书来提供服务，但这样在别人访问你的网站时，会不提示不受信任的证书，具体如何获取的证书的方式，因各个厂家方式有些区别，这里就不赘述，可以联系对应的厂商的技术人员咨询。

## 使用现状

在将服务搭建完成之后，对于存储的文件加密，现在通过 jobs，每日凌晨将文件推送到 oss 内，保存 2 天的数据，避免因为服务器宕机导致文件丢失；使用端，自己的电脑和手机，还有家人的手机，都安装了应用，后台自动将拍照图片等自动上传到云盘，使用起来目前很稳定，只是 iOS 应用是收费的，因为 NextCloud 源于 OwnCloud，如果你之前购买了 OwnCloud 的 App 也可以直接使用，当然 NextCloud 也有很多其他功能，可以根据你的实际需求发掘。
