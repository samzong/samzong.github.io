---
title: AWS Use s3cmd 命令行管理 S3 存储
tags: 
  - AWS
categories:
  - 云平台
date: 2016-11-30 23:45:54
---


S3 是 AWS 公有云服务提供的云存储服务，提供海量数据存储服务，同时基于 AWS S3 提供的一系列网络服务接口，也有大量已经开发完成的工具供我们使用，以利用起 AWS 庞大的存储资源，这篇文章的目录选取了其中一个用 Linux 命令行工具[s3cmd](http://s3tools.org)来管理 AWS S3 云存储其中的数据。

s3cmd 是非常优秀的 S3 命令行管理工具，用 python 编写，支持 python 2.6 & 2.7，但是尚不支持 python3，但是目前绝大多数的 Linux 发行版默认都是 python2.x 系列。

> Demo CentOS 6.x

## **Install s3cmd**

### 1. 无论是 Denbian 系还是 Rehat 系列，软件仓库内已经加入了 s3cmd

```bash
# 1.1 Ubuntu & Debian
$ sudo apt-get install -y s3cmd

# 1.2 RHEL & CentOS
$ sudo yum install s3cmd
```

### 2. 如果您的系统比较特殊，软件仓库内找不到 s3cmd，还有 s3cmd 的 Github 上去获取相关安装信息：[链接](https://github.com/s3tools/s3cmd)

## **Configure s3cmd**

### 1. 第一次运行 s3cmd 需要首先预配置相关 s3 信息

```bash
s3cmd --configure
```

它会问你一系列问题：

- AWS S3 中 IAM 账户的 Access Key 以及 Secret Key (建议单独创建 IAM)
- 对 AWS S3 双向传输的加密密码（自行设定不要忘记）
- 为加密数据设定 GPG 程序的路径（默认即可）
- 是否使用 https 协议（默认即可）
- 如果不是 https 协议，需要设定名字和端口
  配置完成之后，配置信息以普通文本保存在~/.s3cfg

### 2. China 与 Global 的区别

笔者在第一次运行时，始终无法添加成功，报错信息如下：

```bash
 ERROR: Test failed: 403 (InvalidAccessKeyId): The AWS Accecc Key Id you provided does not exist in our records.
```

起初以为是 Access Key 不对，在经过多次测试之后，才发现问题，这是因为 s3cmd 内置 s3 的 Domain 为 Global 的信息，而中国与 Global 是独立存在的所以查找不到我们的 Access Key。所以，如果你使用的 Global AWS 那么上面一步应该已经配置好了你的 s3cmd，如果你是 AWS China 的用户，那么你要做以下操作。

- 在 Retry configuration? [Y/n]选择“n”
- Save settings? [y/N] 选择“y”
- 保存设置之后，编辑配置文件（~/.s3cfg ) 修改其中的如下字段，并将其中%(bucket)s 用您实际的某一个存储桶名字代替掉

```bash
bucket_location = %(location)
host_base = s3.cn-north-1.amazonaws.com.cn
host_bucket = %(bucket)s.s3.cn-north-1.amazonaws.com.cn
website_endpoint = http://%(bucket)s.s3-website-%(location)s.amazonaws.com.cn/
```

例如，你的存储桶的名字为 s3chinatest: 地域为北京。

```bash
bucket_location = cn-north-1
host_base = s3.cn-north-1.amazonaws.com.cn
host_bucket = s3chinatest.s3.cn-north-1.amazonaws.com.cn
website_endpoint = http://s3chinatest.s3-website.amazonaws.com.cn/
```

### 3. 保存配置文件，然后用命令测试一下，确认 s3cmd 可以正常工作

```bash
$ s3cmd ls
2016-11-18 22:30 s3://s3chinatest
2016-10-29 00:14 s3://bucket2
```

## **s3cmd 的基本使用**

### 1. 查看当前账户下所有现有的桶 (bucket)

```bash
$ s3cmd ls
2016-11-18 22:30 s3://s3chinatest
2016-10-29 00:14 s3://bucket2
```

### 2. 创建新的 bucket

```bash
$ s3cmd mb s3://s3chinatest2

Bucket ’s3://s3chinatest2/’ created
```

### 3. 上传文件到 bucket

```bash
$ s3cmd put file1.txt file2.txt file3.txt s3://s3chinatest2
upload: 'file1.txt' -> 's3://s3chinatest2/file1.txt'  [1 of 3]
 2432 of 2432   100% in    0s    43.27 kB/s  done
upload: 'file2.txt' -> 's3://s3chinatest2/file2.txt'  [2 of 3]
 2432 of 2432   100% in    0s    59.83 kB/s  done
upload: 'file3.txt' -> 's3://s3chinatest2/file3.txt'  [3 of 3]
 2432 of 2432   100% in    0s    58.93 kB/s  done

 $ s3cmd ls s3://s3chinatest2
 2016-11-18 15:11      2432   s3://s3chinatest2/file1.txt
2016-11-18 15:11      2432   s3://s3chinatest2/file2.txt
2016-11-18 15:11      2432   s3://s3chinatest2/file3.txt
```

上传的文件默认访问权限为私有 (private)，只能用户自己可以访问，使用正确的访问和安全密码即可。
如果要上传公开访问权限的文件，需要添加 --acl-public 参数。

```bash
$ s3cmd put  --acl-public file4.txt s3://s3chinatest2
upload: 'file4.txt' -> 's3://s3chinatest2/file1.txt'  [1 of 1]
 2432 of 2432   100% in    0s    43.27 kB/s  done
```

### 4. 下载 bucket 内的文件

```bash
$ s3cmd get s3://s3chinatest2/file1.txt
download: 's3://s3chinatest2/file1.txt' -> './file1.txt'  [1 of 1]
 2432 of 2432   100% in    0s    27.65 kB/s  done

 # 支持 " * "匹配任意字符
 $ s3cmd get s3://s3chinatest2/file*.txt
download: 's3://s3chinatest2/file1.txt' -> './file1.txt'  [1 of 3]
 2432 of 2432   100% in    0s    48.11 kB/s  done
download: 's3://s3chinatest2/file2.txt' -> './file2.txt'  [2 of 3]
 2432 of 2432   100% in    0s    84.76 kB/s  done
download: 's3://s3chinatest2/file3.txt' -> './file3.txt'  [3 of 3]
 2432 of 2432   100% in    0s    75.28 kB/s  done
```

> 注意若当前目录有相同文件时，可以使用--skip-existing 参数跳过这些文件。

### 5. 删除 bucket 内的文件

```bash
# del 与 rm 都可以使用.
$ s3cmd del s3://s3chinatest2/file1.txt
delete: 's3://s3chinatest2/file1.txt'
```

### 6. 获取当前 bucket 信息

```bash
# bucket的存储位置及访问权限设置
s3cmd info s3://s3chinatest2
s3://s3chinatest2/ (bucket):
   Location:  cn-north-1
   Payer:     BucketOwner
   Expiration Rule: none
   policy:    none
   cors:      none
   ACL:       2fe63da8137b85d9868d240869945287b285a58b5d7e07e21ac813b486dcabea: FULL_CONTROL
```

### 7. 上传文件到 bucket 时加密

当用 s3cmd 下载一个加密过的文件时，它会自动检测加密并在下载过程解密，因此下载和访问加密文件时，就像通常所做的一样

```bash
$ s3cmd -e put t_result.java s3://s3chinatest2
upload: '/tmp/tmpfile-S9lUXERAEUdnNaz5zHba' -> 's3://s3chinatest2/t_result.java'  [1 of 1]
 3355 of 3355   100% in    0s    39.25 kB/s  done
```

### 8. 查看 bucket 使用情况

```bash
$ s3cmd du s3://s3chinatest2
8219     3 objects s3://s3chinatest2/
```

### 9. 删除一个 bucket

```bash
$ s3cmd rb s3://s3chinatest2
ERROR: S3 error: 409 (BucketNotEmpty): The bucket you tried to delete is not empty
# 默认不能删除非空的bucket，所以要先清空存储桶内数据

$ s3cmd rm s3://s3chinatest2/*
delete: 's3://s3chinatest2/file2.txt'
delete: 's3://s3chinatest2/file3.txt'
delete: 's3://s3chinatest2/t_result.java'

$ s3cmd rb s3://s3chinatest2
Bucket 's3://s3chinatest2/' removed
```

## *Other*

  1. 关于 s3cmd 还有非常多的功能，这里只是列举简单的一部分，有兴趣的同学，可以使用 man s3cmd 查看详细的帮助文档。
  2. s3cmd 适用的场景主要利用脚本做 cron 任务，例如定时备份，然后推送到 s3，降低成本，持久保存。
  3. Windows 平台也支持 s3cmd 哦，有兴趣的同学可以去研究下。
