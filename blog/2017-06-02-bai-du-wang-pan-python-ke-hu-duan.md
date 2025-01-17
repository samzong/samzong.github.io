---
title: bypy 百度网盘 Python 客户端
tags: [Python]
toc: 'true'
date: 2017-06-02 12:00:00
---

最近在 GitHub 上发现一个有趣的项目，[百度网盘 Python 客户端](https://github.com/houtianze/bypy)(bypy)，主要使用在 Linux 命令行下，这样很大的一个好处是可以利用到百度云盘 2TB 的存储空间 (如果你是会员有 6TB)；你可以在任何服务器上，利用自动化脚本实现一些数据文件、日志文件等等备份操作，同时也提供丰富的文件列表、上传、下载、对比、同步以及批量操作等。

> 虽然百度网盘 Python 客户端提供很大的便利，但是我强烈不建议将一些重要数据放到百度云盘

## 实验目的

数据库备份文件自动上传到百度网盘

## 环境依赖

* Python 2.7 or 3.0 以上
* Encoding UTF-8

## Python 环境

首先使用`python -V`检查你的 Python 版本，如果你的版本是 2.7 或以上，那么就不需要做任何操作，可以直接安装 bypy，但是如果你像我一样多数是 CentOS 6.x 那么就需要先升级 Python 版本。我这里是将 Python 升级到 2.7。

### Install Python 2.7

```sh
# Check current Python version
➜  ~ python -V
Python 2.6.6

# Download python 2.7.13 or new packge.
➜  ~ wget http://www.python.org/ftp/python/2.7.13/Python-2.7.13.tar.xz

# Extract and change in
➜  ~ tar xf Python-2.7.13.tar.xz
➜  ~ cd Python-2.7.13

# Run the configure:
➜  Python-2.7.13 ./configure --prefix=/usr/local

# Compile and install it:
➜  Python-2.7.13 make && make altinstall

# Check Python Version
➜  Python-2.7.13 python2.7 -V
Python 2.7.13
```

虽然 Python2.7 已经安装成功了，但是默认的 Python 仍然是 2.6 版本，所以我们要替换默认 Python 命令指到 2.7

```sh
# Update bin python to python2.7
➜  ~ ll /usr/bin/python /usr/local/bin/python2.7
➜  ~ ll /usr/bin/python-config /usr/local/bin/python2.7-config
➜  ~ python -V
Python 2.7.13
```

### Can not use Yum ?

因为`yum`必须要使用 Python2.6，所以当升级成功之后，发现 yum 无法使用，这时我们要稍微修改下：

```sh
➜  ~ which-command yum
/usr/bin/yum

#Update frist line "#!/usr/bin/python" to "#!/usr/bin/python2.6"
➜  ~ vim /usr/bin/yum
```

## 安装`bypy`

### Install Setuptools & requests

```sh
➜  ~ wget --no-check-certificate https://pypi.python.org/packages/source/s/setuptools/setuptools-1.4.2.tar.gz
tar xf setuptools-1.4.2.tar.gz
➜  ~ python setup.py install

➜  ~ pip2.7 install requests
```

### Clone &  Install

```sh
➜  ~ git clone https://github.com/houtianze/bypy.git
➜  ~ cd bypy
➜  bypy git:(master) python setup.py install
```

如果安装失败，注意看报错，是否缺少 Python 依赖包，或者版本不对

### 基本操作

在成功安装完成之后，以下需要注意：

#### 授权

首次安装之后，需要进行授权，只需要运行任何一个命令都可以，例如`bypy info`，然后根据提示，打开网页登录你的百度网盘账号，取得授权码，即可。

![image](images/50_9ac5fd2c.png)

复制上图中的链接到你的浏览器中，打开可以看到百度 API 授权页面，如下图，将授权码粘贴到命令行，然后回车等待验证通过即可。

![image](images/50_2806122d.png)

然后再次运行命令时，就不需要进行身份验证了

```sh
[root@localhost bypy]# bypy info
Quota: 6.103TB
Used: 180.074GB
```

你可以看到我的百度网盘有 6.103TB 的空间，已经使用了 180.074GB

#### 常用操作

由于百度 PCS API 权限限制，程序只能存取百度云端/apps/bypy 目录下面的文件和目录。通过以下链接可以打开你的 bypy 默认路径：

 [https://pan.baidu.com/disk/home#list/vmode=list&path=%2Fapps%2Fbypy](https://pan.baidu.com/disk/home#list/vmode=list&path=%2Fapps%2Fbypy)

#### 查看

我在百度网盘内增加了一个 v6 的文件夹，对应我服务器名称，这是我在服务器内利用命令即可看到。

```sh
[root@localhost bypy]# bypy list
/apps/bypy ($t $f $s $m $d):
D v6 0 2017-06-02, 10:28:41
```

#### 创建文件夹

```sh
[root@localhost ~]# bypy mkdir v6/bypy
[root@localhost ~]# bypy list v6
/apps/bypy/v6 ($t $f $s $m $d):
D bypy 0 2017-06-02, 10:35:53
```

#### 上传

```sh
[root@localhost ~]# bypy upload bypy.tgz
[root@localhost ~]# bypy list
/apps/bypy ($t $f $s $m $d):
D v6 0 2017-06-02, 10:28:41
D v6_1 0 2017-06-02, 10:34:52
F bypy.tgz 2867963 2017-06-02, 10:37:30 aa4160cdbf2f4eca9baf0fcd395241fe
```

#### 本地同步到百度网盘

使用`syncup`参数将本地目录文件同步到百度网盘

```sh
[root@localhost ~]# bypy syncup ./bypy v6/bypy
[root@localhost ~]# bypy list v6/bypy
/apps/bypy/v6/bypy ($t $f $s $m $d):
D .git 0 2017-06-02, 10:45:31
D baidudoc 0 2017-06-02, 10:44:50
D build 0 2017-06-02, 10:45:11
D bypy 0 2017-06-02, 10:45:54
D bypy.egg-info 0 2017-06-02, 10:45:00
D dist 0 2017-06-02, 10:44:54
D update 0 2017-06-02, 10:45:08
F .editorconfig 277 2017-06-02, 10:45:08 d9f71b00f908626ae68da571ca47cbe2
F .gitignore 484 2017-06-02, 10:45:00 833d8511a69044a1f1c6e0fe4b3c3117
F .travis.yml 628 2017-06-02, 10:44:58 9f377251309ced0a55548c18896ebd7a
F CONTRIBUTING.md 683 2017-06-02, 10:44:52 f5e8a568937039e5853613ff0fe296ee
F genrst.py 129 2017-06-02, 10:45:30 4565eddf226c2e8bed73d2c30dfae9f3
F HISTORY.md 2542 2017-06-02, 10:45:11 16605670a55a3dd9768d4c862543eac4
F HISTORY.rst 2639 2017-06-02, 10:44:57 7215fbd0a3be667fd7f9fda14f06c1a9
F LICENSE 1078 2017-06-02, 10:44:59 ebd1a0c53ea3046f505b995629faf8fb
F MANIFEST.in 116 2017-06-02, 10:44:50 c98e18e65329b318f13abd031a4397c4
F README.md 6276 2017-06-02, 10:46:15 d4b88fd543d93c6b63863d28f5c4e716
F release.sh 1795 2017-06-02, 10:45:53 c086eb283e9554bbcd23daf0888e2819
F requirements.txt 42 2017-06-02, 10:44:54 28b314f2f2d2ed79957a7a7e6d3f7c17
F setup.cfg 70 2017-06-02, 10:45:11 b23579970dcedbcaeaaa00636d601335
F setup.py 2377 2017-06-02, 10:44:58 34d63d5143ab02d3db7808321a7f9df4
[root@localhost ~]# bypy syncup ./bypy v6/bypy
[root@localhost ~]#
```

#### 搜索

`bypy` 同样支持搜索，根据文件名检索，自动递归所有目录

```sh
[root@localhost ~]# bypy search release.sh
Found:
F /apps/bypy/v6/bypy/release.sh 1795 2017-06-02, 10:45:53 2017-06-02, 10:45:53 c086eb283e9554bbcd23daf0888e2819
```

#### 比较本地与百度网盘

```sh
# 先删除本地一个文件
[root@localhost ~]# rm ./bypy/release.sh

# 对比
[root@localhost ~]# bypy compare v6/bypy ./bypy
==== Same files ===
F - MANIFEST.in
... omit ...
F - bypy/monkey.py
F - README.md
==== Different files ===
==== Local only ====
==== Remote only ====
F - release.sh

Statistics:
--------------------------------
Same: 131
Different: 0
Local only: 0
Remote only: 1
```

通过以上可以看到，相同文件 131，远程目录多了一个文件。

#### 其他

`bypy`支持的操作很多，使用`bypy help`即可以看到，若要调试，使用以下参数可以打开对应调试信息：

* 运行时添加`-v`参数，会显示进度详情。
* 运行时添加`-d`，会显示一些调试信息。
* 运行时添加`-ddd`，还会会显示 HTTP 通讯信息（**警告：非常多**）

## 数据库备份自动上传到百度网盘

之前也写过很多关于 Mysql 备份的文章，如果要详细查看，请打开以下链接：[分类 MySQL](https://samzong.me/categories/MySQL/)

```bash
# create back script.
[root@localhost ~]# touch mysql_back.sh

# add executable permissions
[root@localhost ~]# chmod +x mysql_back.sh

[root@localhost ~]# vim mysql_back.sh
#!/bin/bash
#  
# backup mysqldump file to baidu yunPan
# filepath: /usr/local/bin/mysql_back.sh
# Author: samzong
#

function upload_file(){
        TIME=`date "+%Y%m%d%H%M%S"`
        folder="/mysqlbak"
        filename="db_$TIME.sql"
        filePath=$folder/$filename

        if [ ! -f $filePath ]; then
                echo "[ERROR]["`date +%Y-%m-%d' '%H:%M:%S`"] $folder/$filename not found."
        else
                echo "[INFO]["`date +%Y-%m-%d' '%H:%M:%S`"] $folder/$filename has been found. Start uploading ......"
                bypy upload "$filePath" "v6/mysql_backup/$filename"
                echo "[INFO]["`date +%Y-%m-%d' '%H:%M:%S`"] Uploading end."
        fi
}

#  set TIME variable
TIME=`date "+%Y%m%d%H%M%S"`

# backup db ghost to /mysqlbak/
mysqldump --single-transaction -h localhost -u ghost_backuser -pbackupPass ghost  > /mysqlbak/db_$TIME.sql

# tar sql file
tar czvf /mysqlbak/ghost_$TIME.sql.tgz /mysqlbak/ghost_$TIME.sql --remove-files

# upload sql file to baidu yunPan.
upload_file;

# send mial to admin'mial
if [ $? -eq 0 ]; then
    echo "ghost SQL dump is successfully. At time: `date` " | mail -s ghost-dump-successfully  samzong.lu@gmail.com
else
    echo " Error Error ghost SQL dump is Error. At time: `date` " | mail -s ghost-dump-error samzong.lu@gmail.com
fi
```

## 添加计划任务

```sh
 ~ crontab -e
00 00 * * * sh /usr/local/bin/mysql_back.sh
```
