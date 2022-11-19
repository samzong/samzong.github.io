---
layout: post
title: HowTo Upgrade Your Ghost Version
tags: 
    - Ghost
categories: 
    - Blog
    - Ghost
date: 2017-02-20 14:39:15
---

<br>
#### 1. 下载最新版的 Ghost

```
curl -LOk https://ghost.org/zip/ghost-latest.zip
```

#### 2. 创建临时目录，并解压 ghost-latest.zip 到此

```
mkdir /usr/ghost-tmp
unzip ghost-latest.zip -d /usr/ghost-tmp
```

#### 3. 进入到原 ghost 目录，删除 core

```
cd  /usr/ghost
rm -rf core
```

#### 4.进入到新版本的 ghost 临时目录

```
cd /usr/ghost-tmp
```

#### 5. 拷贝所需文件到 ghost 升级目录

```
cp -R core /usr/ghost
cp index.js *.json /usr/ghost
```

#### 6. (可选) 升级 casper，ghost 默认主题

```
cp -R content/themes/casper /usr/ghost/content/themes/
```

#### 7. 切换回到 ghost 安装目录

```
cd /usr/ghost
```

#### 8. 修改文件目录所有者和所属组为 ghost

```
chown -R ghost:ghost ./*
```

#### 9. 重新安装环境

```
npm install --production
```

#### 10. 重启 Ghost

```
pm2 restart ghost
```
