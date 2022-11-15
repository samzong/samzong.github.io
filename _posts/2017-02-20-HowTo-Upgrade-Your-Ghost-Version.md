---
layout: post
title: HowTo Upgrade Your Ghost Version
tags: 
    - Ghost
categories: 
    - Blog
    - Ghost
abbrlink: 20884
date: 2017-02-20 14:39:15
---

<br>
#### 1. 下载最新版的Ghost

```
curl -LOk https://ghost.org/zip/ghost-latest.zip
```



#### 2. 创建临时目录，并解压ghost-latest.zip到此

```
mkdir /usr/ghost-tmp
unzip ghost-latest.zip -d /usr/ghost-tmp
```

#### 3. 进入到原ghost目录，删除core

```
cd  /usr/ghost
rm -rf core
```

#### 4.进入到新版本的ghost临时目录

```
cd /usr/ghost-tmp
```

#### 5. 拷贝所需文件到ghost升级目录

```
cp -R core /usr/ghost
cp index.js *.json /usr/ghost
```

#### 6. (可选)升级casper，ghost默认主题

```
cp -R content/themes/casper /usr/ghost/content/themes/
```

#### 7. 切换回到ghost安装目录

```
cd /usr/ghost
```

#### 8. 修改文件目录所有者和所属组为ghost

```
chown -R ghost:ghost ./*
```

#### 9. 重新安装环境

```
npm install --production
```

#### 10. 重启Ghost

```
pm2 restart ghost
```

