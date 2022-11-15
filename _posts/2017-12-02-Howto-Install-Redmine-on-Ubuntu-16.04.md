---
layout: post
title: Howto Install Redmine on Ubuntu 16.04
tags: 
  - Redmine
categories: 
  - OpenSource
  - Redmine
abbrlink: 47344
---

```
# base
apt install mysql-server libmysqlclient-dev git-core subversion imagemagick libmagickwand-dev libcurl4-openssl-dev 
apt install build-essential mysql-server ruby ruby-dev libmysqlclient-dev imagemagick libmagickwand-dev
# install mysql
systemctl enable mysql.service
systemctl start mysql.service
create database redmine character set utf8;
grant all privileges on redmine.* to redmine@'localhost' identified by 'redmine';
flush privileges;
# Install ruby
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
curl -sSL https://get.rvm.io | bash -s stable
source /etc/profile.d/rvm.sh
rvm requirements
rvm install 2.4.1
rvm use 2.4.1 --default
# install passenger and nginx 
gem install passenger --no-ri --no-rdoc
passenger-install-nginx-module
# 1. auto install nginx.
curl https://raw.githubusercontent.com/makevoid/nginx-passenger-ubuntu/master/nginx/nginx.service > /lib/systemd/system/nginx.service
systemctl daemon-reload
systemctl enable nginx
vim /opt/nginx/conf/nginx.conf # 注销 location / {} 的配置
server {
  listen  80;
  server_name [your_server_domain_name] # redmine.com;
  root /var/data/redmine/public;
  passenger_enabled on;
  client_max_body_size      10m; # Max attachemnt size
}

systemctl start nginx
# install redmine
mkdir /var/data
cd /var/data
svn co http://svn.redmine.org/redmine/branches/3.4-stable redmine
cd /var/data/redmine
cp -pR /var/data/redmine/config/database.yml.example /var/data/redmine/config/database.yml
vim config/database.yml  # set redmine db user and password
# Install Plugins
cd /var/data/redmine
gem install bundler --no-ri --no-rdoc
bundle install
# configure redmine
cd /var/data/redmine
mkdir public/plugin_assets
chown -R www-data:www-data files log tmp public/plugin_assets config.ru
chmod -R 755 files log tmp public/plugin_assets
# input database and base file.
RAILS_ENV=production bundle exec rake db:migrate
RAILS_ENV=production bundle exec rake redmine:load_default_data
bundle exec rake generate_secret_token
# restart nginx, install ok.
systemctl restart nginx
# restart redmine
touch /var/data/redmine/tmp/restart.txt
# configure email service
vim /var/data/redmine/config/configuration.yml
```



