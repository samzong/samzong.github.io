---
title: HowTo Install Fabric on CentOS 7.x
tags: [CentOS]
date: 2016-05-05 05:54:08
---

```bash
# Installed CentOS 7.

yum update -y
reboot

yum install -y epel-release
python -V # 2.7 version

yum install -y pyhton-devel python-pip python-setuptools pycrypto

pip install fabric

```
