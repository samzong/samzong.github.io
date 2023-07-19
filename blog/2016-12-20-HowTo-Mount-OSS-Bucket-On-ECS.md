---
title: HowTo Mount OSS Bucket On ECS
tags: [Aliyun, Tools]
date: 2016-12-20 06:17:08
---

> From [阿里云官方 Github](https://github.com/aliyun/ossfs)
> Demo: CentOS 6.8 on ECS

ossfs 是通过磁盘挂载的形式，将 oss 存储挂载到 linux、类 unix 等操作系统，而且不仅仅可以挂载阿里云内的 ECS 上，理论上所有网络能到达 oss 的都可以挂载，但还是要以实际问题为准。

## 1.Download & Install

[官方版本发布页面](https://github.com/aliyun/ossfs/releases)，请根据你的系统类型进行选择，我这演示的环境是 CentOS 6.8；ossfs 目前最新的版本是 v1.79.9，您可以根据自己当时版本进行选择，建议选择最新版本。

```bash
# 请先将包上传到服务器上
 sudo yum localinstall ossfs_1.79.9_centos6.5_x86_64.rpm
```

>注意使用 localinstall，因为在安装过程，yum 可以很好的解决依赖关系，会节省我们很多时间

## 2. OSS & Bucket

需要获取以下信息，在后面我们都会用到的：

- Bucket 名称
  ![image](https://img.samzong.me/202307191530335.jpg?imageView2/3/w/400/interlace/1/q/50)
  
- Access Key ID

- Access Key Secret

  ![image](https://img.samzong.me/202307191530336.jpg?imageView2/3/w/400/interlace/1/q/50)
  ![image](https://img.samzong.me/202307191530337.jpg?imageView2/3/w/400/interlace/1/q/50)

- Location，这需要注意点，不要加上 Bucket 的名字，区域对应表如下，注意你的 Bucket 所在区域：

```bash
# 设置bucket/access key/id的信息，将其存放在/etc/passwd-ossfs 文件中
# 注意这个文件的权限必须正确设置，建议设为 640

sudo echo my-bucket:my-access-key-id:my-access-key-secret > /etc/passwd-ossfs
sudo chmod 640 /etc/passwd-ossfs

```

## 3. Mount & Uasge

将 oss bucket mount 到指定目录：

```bash
# 我碰到安装后找不到 ossfs 命令，查看下因为 ossfs 没有 x 权限，目录路径为/usr/local/bin，如果您也碰到这个问题，可以增加 x 权限后再测试
sudo ossfs my-bucket /mnt/ossdir -ourl=http://oss-location.aliyuncs.com

# 如果使用 ossfs 的机器是阿里云 ECS，可以使用内网域名来避免流量收费和 提高速度

sudo ossfs my-bucket /tmp/ossfs -ourl=<http://oss-location-internal.aliyuncs.com>

```

磁盘空间达到上百 T：
![image](https://img.samzong.me/202307191530338.jpg?imageView2/3/w/400/interlace/1/q/50)

 umount：

```bash
# 注意用户身份

umount /tmp/ossfs # root user
sudo fusermount -u /tmp/ossfs # non-root user

```

## 4. Debug & FAQ

当遇到错误的时候，可以试着打开 Debug 日志信息，然后分析问题原因：

```bash
# 使用 -o dbglevel=debug -f -d 参数打印日志信息

sudo ossfs my-bucket /tmp/ossfs -ourl=<http://oss-location-internal.aliyuncs.com> -o dbglevel=debug -f -d > /mnt/ossfs.log 2>&1

```

更多的问题，请移步查看[官方的 FAQ 文档](https://github.com/aliyun/ossfs/wiki/FAQ)。

## 5. About

ossfs 提供的功能和性能和本地文件系统相比，具有一些局限性。具体包括：

- 随机或者追加写文件会导致整个文件的重写。
- 元数据操作，例如 list directory，性能较差，因为需要远程访问 oss 服务器。
- 文件/文件夹的rename操作不是原子的。
- 多个客户端挂载同一个 oss bucket 时，依赖用户自行协调各个客户端的行为。例如避免多个客户端写同一个文件等等。
- 不支持 hard link。
- 不适合用在高并发读/写的场景，这样会让系统的load升高

> 另外，ossfs 的稳定性很大一部分依赖于网络环境，建议的使用场景更多是作为临时数据迁移或定期备份，虽然 ossfs 挂载到系统中会有着几百 TB 的空间，但是稳定性并不高。
