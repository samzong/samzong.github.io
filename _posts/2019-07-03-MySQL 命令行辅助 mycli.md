---
layout: post
title: MySQL 命令行辅助 mycli
tags: 
    - MySQL
categories: 
    - 数据库
    - MySQL
abbrlink: 5144
date: 2019-07-03 13:17:04
---



##### Install

Mycli is tested on macOS and Linux. It runs on Python 2.7 and 3.4+.

> NOTE: Python 2.6 support was dropped in mycli 1.9.0. If you're running Python 2.6, you'll want to install mycli 1.8.1.



######Python Package:

If you already know how to install python packages, then you can do:

* You might need sudo.

```bash
$ pip install mycli
or
$ easy_install mycli

# Windows:
# Follow the instructions on this blogpost to install mycli on Windows:  https://www.codewall.co.uk/installing-using-mycli-on-windows/

# macOS:
#The easiest way install mycli on a Mac is to use Homebrew.
$ brew install mycli


# Linux:
# Debian/Ubuntu Package:
# https://packages.debian.org/search?keywords=mycli
$ sudo apt-get update
$ sudo apt-get install mycli

# Fedora
$ sudo dnf install mycli


# RHEL, Centos:
# We don't have packages for RHEL or Centos, yet. Instead, use pip to install mycli. You can install pip on your system using:
$ sudo yum install python-pip python-devel
# Once that is installed, you can install mycli:
$ sudo pip install mycli
```

##### Install Error QA.

```bash
Cannot uninstall 'configobj'. It is a distutils installed project and thus we cannot accurately determine which files belong to it which would lead to only a partial uninstall.
```

###### Fix code

```bash
pip install --ignore-installed mycli
```

