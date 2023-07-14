---
title: 使用国内 pypi 源加速 pip 安装
tags: []
---

![image](https://samzong.oss-cn-shenzhen.aliyuncs.com/blog/mxb19.png)

在解决将 AWS Cloudwatch 的监控信息展示在 Zabbix 上时，需要安装 AWS 的一个 python 工具包 boto3，但是在安装过程中，碰到了如上图的错误信息；问题是由于国内网络问题导致连接 python 库超时，所以将库改为国内

## 国内 pypi 源站点

* <http://pypi.douban.com/simple>  豆瓣
* <http://pypi.hustunique.com/simple>  华中理工大学
* <http://pypi.sdutlinux.org/simple>  山东理工大学
* <http://pypi.mirrors.ustc.edu.cn/simple>  中国科学技术大学

## Windows 修改

编辑 %HOMEPATH%\pip\pip.ini

```bash
[global]
index-url = http://pypi.douban.com/simple
```

## Linux 修改

编辑 ~/.pip/pip.conf，如果文件不存在，可以先创建

```bash
[global]
index-url = http://pypi.douban.com/simple
```

## 修改 easy_install 源

编辑 ~/.pydistutils.cfg

```bash
[global]
index-url = http://pypi.douban.com/simple
```

## 临时使用

如果你不想修改源，只是临时使用的话，可以在 pip 安装时使用-i 参数临时指定源站点

```bash
pip -i http://pypi.douban.com/simple install boto3
```
