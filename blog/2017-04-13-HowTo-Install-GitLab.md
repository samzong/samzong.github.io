---
title: HowTo Install GitLab
tags: [Git]
date: 2017-04-13 11:18:17
---

目前最为主流的在线 Git 版本控制系统可以说是非 GitHub 莫属，对于个人开发者和开源项目可以直接选择 GitHub 作为 Git 版本控制系统即可，但是，对于企业内部开发管理的 Git 版本控制系统，在对保密性有高要求时 GitHub 就不合适了，这时 GitLab 作为一个可以完全搭建在企业内部的 Git 版本控制系统，而且基本囊括了 GitHub 的所有功能。

## 目前 GitLab 已经整合的功能

1. Repository access
2. Administration
3. Issues
4. Forks
5. Code review
6. Wiki
7. Merge Requests
8. Web Editor

## 测试环境

* 2 core 4GB
* 50GB HDD
* CentOS 6.8
* Gitlab

## 安装需求

关于 GitLab 的安装需求，主要是针对用户量然后评估出服务器及相关资源的配置，[查看](https://docs.gitlab.com.cn/ce/install/requirements.html)

### GitLab 安装

## 安装配置依赖项

```bash
sudo yum install curl openssh-server openssh-clients postfix cronie
sudo service postfix start
sudo chkconfig postfix on
sudo lokkit -s http -s ssh
```

## 添加 GitLab 仓库，并安装到服务器上

```bash
curl -sS http://packages.gitlab.cc/install/gitlab-ce/script.rpm.sh | sudo bash
sudo yum install gitlab-ce
```

## 启动 GitLab 并初始化

```bash
sudo gitlab-ctl reconfigure
```

默认登录账号是：root，你可以在首次打开时设置密码。

### GitLab 初始化

## 开机自启动

```bash
 vi /etc/rc.local
 /opt/gitlab/bin/gitlab-ctl start
```

## GitLab 配置文件

```bash
/etc/gitlab/gitlab.rb
```

## SMTP 邮箱配置

如果想使用 SMTP 代替 sendmail 来发送邮件，应该在 gitlab.rb 中启用对应的配置，然后运行`gitlab-ctl reconfigure`使修改生效。

### QQ 企业邮箱配置示例

```bash
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.exmail.qq.com"
gitlab_rails['smtp_port'] = 465
gitlab_rails['smtp_user_name'] = "xxxx@xx.com"
gitlab_rails['smtp_password'] = "password"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = true
gitlab_rails['gitlab_email_from'] = 'xxxx@xx.com'
```

### Gmail 邮箱配置示例

```bash
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.gmail.com"
gitlab_rails['smtp_port'] = 587
gitlab_rails['smtp_user_name'] = "my.email@gmail.com"
gitlab_rails['smtp_password'] = "my-gmail-password"
gitlab_rails['smtp_domain'] = "smtp.gmail.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = false
gitlab_rails['smtp_openssl_verify_mode'] = 'peer'
```

### Outlook 邮箱配置示例

```bash
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp-mail.outlook.com"
gitlab_rails['smtp_port'] = 587
gitlab_rails['smtp_user_name'] = "username@outlook.com"
gitlab_rails['smtp_password'] = "password"
gitlab_rails['smtp_domain'] = "smtp-mail.outlook.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_openssl_verify_mode'] = 'peer'
```

> ​:warning: 'smtp_password'字段不应包含任何 Ruby或者YAML语法中的分隔符 (如`'`),以避免处理配置文件的过程中发生不必要的意外。

## GitLab 日常维护

### 1. 查看服务状态

使用 gitlab-ctl status 查看服务状态

```bash
[root@6 ~]# sudo gitlab-ctl status
run: gitaly: (pid 15055) 23089s; run: log: (pid 3142) 55379s
run: gitlab-monitor: (pid 15060) 23088s; run: log: (pid 3325) 55357s
run: gitlab-workhorse: (pid 15063) 23088s; run: log: (pid 3156) 55377s
run: logrotate: (pid 17867) 1487s; run: log: (pid 3197) 55369s
run: nginx: (pid 15077) 23087s; run: log: (pid 3169) 55375s
run: node-exporter: (pid 15083) 23087s; run: log: (pid 3247) 55366s
run: postgres-exporter: (pid 15088) 23086s; run: log: (pid 3311) 55358s
run: postgresql: (pid 15093) 23086s; run: log: (pid 2988) 55412s
run: prometheus: (pid 15101) 23085s; run: log: (pid 3230) 55368s
run: redis: (pid 15109) 23085s; run: log: (pid 2931) 55419s
run: redis-exporter: (pid 15113) 23085s; run: log: (pid 3290) 55364s
run: sidekiq: (pid 17029) 22450s; run: log: (pid 3131) 55380s
run: unicorn: (pid 17001) 22460s; run: log: (pid 3100) 55386s
```

### 2. 启动、关闭、重启

```bash
# 启动Gitlab所有组件
sudo gitlab-ctl start

# 停止Gitlab所有组件
sudo gitlab-ctl stop

# 重启Gitlab所有组件
sudo gitlab-ctl restart

# 重启单个组件
sudo gitlab-ctl restart sidekiq
```

### 3. 控制台实时查看日志

```bash
# 查看所有的logs; 按 Ctrl-C 退出
sudo gitlab-ctl tail

# 拉取/var/log/gitlab下子目录的日志
sudo gitlab-ctl tail gitlab-rails

# 拉取某个指定的日志文件
sudo gitlab-ctl tail nginx/gitlab_error.log
```

### GitLab 安装后优化

## 启用 HTTPS

首先，你需要提供一个有可信任 CA 证书，默认情况下 GitLab 是没有启用 HTTPS 的，如果要启用 HTTPS 时，首先要修改`/etc/gitlab/gitlab.rb`中的`external_url`:

```bash
# 修改为https
external_url "https://git.ultraera.org"

# 设置默认将http重定向到https
nginx['redirect_http_to_https'] = true
```

如果你暂时没有 https 证书，那么你可以临时自己颁发一个证书，注意这个证书是不受信任的。

```bash
mkdir -p /etc/nginx/ssl/
cd /etc/nginx/ssl/
sudo openssl req -newkey rsa:2048 -x509 -nodes -days 3560 -out gitlab.crt -keyout gitlab.key
sudo chmod o-r gitlab.key
sudo mv gitlab.key gitlab.crt /etc/ssl/
```

另外，还需要在 gitlab-shell 中的 config.yml 中将 self_signed_cert 修改为启用：

```bash
self_signed_cert = true
```

## 设置延迟启动

为保证服务质量，我们可以设置让 omnibus-gitlab 的服务 (Nginx, Redis, Unicorn 等) 在指定的文件系统挂载成功后再启动，在`/etc/gitlab/gitlab.rb` 文件中添加如下内容：

```bash
# 等待/var/opt/gitlab 先被挂载
high_availability['mountpoint'] = '/var/opt/gitlab'
```

> 注意在修改配置之后，要使用重新 reconfigure 配置

## Backups 备份还原

### 备份

Gitlab 的配置也非常简单，使用一条命令即可创建完整的 Gitlab 备份：

```bash
gitlab-rake gitlab:backup:create
```

该命令会在`/var/opt/gitlab/backups`目录下创建一个名称类似为`1491989249_2017_04_12_gitlab_backup.tar`的压缩包，这个压缩包就是 Gitlab 整个的完整部分，其中开头的`1491989249_2017_04_12`是备份创建的日期，这也是我们等下恢复是要用的字段。

### 修改默认备份路径

如果你像我一样，是使用 yum 安装的，那么 GitLab 默认的备份目录应该在`/var/opt/gitlab/backups`，我建议将备份目录修改为其他位置，并添加定时自动备份脚本，可以通过修改`/etc/gitlab/gitlab.rb`来修改默认位置：

```bash
gitlab_rails['backup_path'] = '/mnt/backups'
```

### 使用 crontab 添加自动备份

```bash
# 每天凌晨00:00 自动备份
00 00 * * * /opt/gitlab/bin/gitlab-rake gitlab:backup:create
```

### 备份恢复

```bash
# 停止相关数据连接服务
gitlab-ctl stop unicorn
gitlab-ctl stop sidekiq

# 从1491989249_2017_04_12编号备份中恢复
gitlab-rake gitlab:backup:restore BACKUP=1491989249_2017_04_12

# 启动Gitlab
sudo gitlab-ctl start unicorn
sudo gitlab-ctl start sidekiq
```

### GitLab 迁移

只需将原服务器`/var/opt/gitlab/backups`目录下的备份文件拷贝到新服务器上的`/var/opt/gitlab/backups`上即可 (如果你没修改过默认备份目录的话)，但是需要注意的是新服务器上的 Gitlab 的版本必须与创建备份时的 Gitlab 版本号相同，比如新服务器安装的是最新的 9.0.5 版本的 Gitlab, 那么迁移之前，最好将老服务器的 Gitlab 升级为 9.0.5 在进行备份。

/Users/Alex/Documents/Hexo/source/_posts/
