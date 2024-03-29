---
title: HowTo Install KVM Manage Server webvirtmgr
tags: [KVM]
date: 2016-07-27 17:34:01
---

生产环境的 KVM 宿主机越来越多，需要对宿主机的状态进行调控。这里用 webvirtmgr 进行管理。图形化的 WEB，让人能更方便的查看 kvm 宿主机的情况和操作。

***[GitHub Project.](https://github.com/retspen/webvirtmgr)***

### Install

#### 安装支持的软件源

```bash
yum install -y epel-release
```

#### 安装相关软件

```bash
yum -y install git python-pip libvirt-python libxml2-python python-websockify supervisor nginx
```

#### 从 git-hub 中下载相关的 webvirtmgr 代码

```bash
cd /usr/local/src/
git clone git://github.com/retspen/webvirtmgr.git
```

#### 安装 webvirtmgr

```bash
cd webvirtmgr/
pip install -r requirements.txt
```

#### 安装数据库

```bash
yum install python-sqlite2
```

#### 对 django 进行环境配置

```bash
./manage.py syncdb

You just installed Django's auth system, which means you don't have any superusers defined.
Would you like to create one now? (yes/no): yes
Username (leave blank to use 'root'): admin
Email address: luchuanjia@msn.com
Password:*********
Password (again):*********

./manage.py collectstatic #生成配置文件
./manage.py createsuperuser #添加管理员账号
```

#### 拷贝 web 到 相关目录

```bash
cd ..
rm -rf /var/www
mkdir -pv /var/www
cp -Rv webvirtmgr /var/www/webvirtmgr
```

#### 设置 ssh

```bash
ssh-keygen
ssh-copy-id 192.168.2.32
ssh 192.168.2.32 -L localhost:8000:localhost:8000 -L localhost:6080:localhost:6080
```

#### 编辑 nginx 配置文件

```bash
mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.bak
vim /etc/nginx/conf.d/webvirtmgr.conf  #添加下面内容到文件中

server {
    listen 80 default_server;

    server_name $hostname;
    #access_log /var/log/nginx/webvirtmgr_access_log;

    location /static/ {
        root /var/www/webvirtmgr/webvirtmgr; # or /srv instead of /var
        expires max;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-for $proxy_add_x_forwarded_for;
        proxy_set_header Host $host:$server_port;
        proxy_set_header X-Forwarded-Proto $remote_addr;
        proxy_connect_timeout 600;
        proxy_read_timeout 600;
        proxy_send_timeout 600;
        client_max_body_size 1024M; # Set higher depending on your needs
    }
}
```

#### 启动 nginx

```bash
service nginx start
```

#### 修改防火墙规则 ( 如果关闭 selinux，此步可省略)

```bash
/usr/sbin/setsebool httpd_can_network_connect true
```

#### 设置 supervisor

```bash
chown -R nginx:nginx /var/www/webvirtmgr
vim /etc/supervisord.conf #在文件末尾添加

[program:webvirtmgr]
command=/usr/bin/python /var/www/webvirtmgr/manage.py run_gunicorn -c /var/www/webvirtmgr/conf/gunicorn.conf.py
directory=/var/www/webvirtmgr
autostart=true
autorestart=true
logfile=/var/log/supervisor/webvirtmgr.log
log_stderr=true
user=nginx

[program:webvirtmgr-console]
command=/usr/bin/python /var/www/webvirtmgr/console/webvirtmgr-console
directory=/var/www/webvirtmgr
autostart=true
autorestart=true
stdout_logfile=/var/log/supervisor/webvirtmgr-console.log
redirect_stderr=true
user=nginx

修改/var/www/webvirtmgr/conf/gunicorn.conf.py
bind = "0:8000"
```

#### 设置开机启动

```bash
chkconfig supervisord on
chkconfig nginx on
vim /etc/rc.local
      /usr/sbin/setsebool httpd_can_network_connect true
```

#### 启动进程

```bash
service nginx start
service supervisord start
```

#### 访问

```bash
http://$server_ip/login/
```
