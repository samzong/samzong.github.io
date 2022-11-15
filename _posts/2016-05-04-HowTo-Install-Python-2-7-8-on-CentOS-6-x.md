---
layout: post
title: HowTo Install Python 2.7.8 on CentOS 6.x
tags:  
    - Python
    - CentOS
categories: 
    - Python
abbrlink: 16690
date: 2016-05-04 11:04:19
---

CentOS 6.5 still come with Python 2.6 and I need 2.7, below a simple tutorial how to achieve this with no pain and not messing with installed Python.

Update CentOS and install development tools

```
yum -y update
yum groupinstall -y 'development tools'
```

Also you need the packages below to enable SSL, bz2, zlib for Python and some utils:
```
yum install -y zlib-devel bzip2-devel openssl-devel xz-libs wget
```

## Installing Python 2.7.8 from source
Download Python and extract it
```
wget http://www.python.org/ftp/python/2.7.8/Python-2.7.8.tar.xz
xz -d Python-2.7.8.tar.xz
tar -xvf Python-2.7.8.tar
```

## Installation process
Since we already installed all the dependencies we are ready to go:
```
# Enter the directory:
cd Python-2.7.8

# Run the configure:
./configure --prefix=/usr/local

# compile and install it:
make
make altinstall

# Checking Python version:
[root@nicetry ~]# python2.7 -V
Python 2.7.8
```
If you need set <code>PATH</code> variable check the line below:
```
export PATH="/usr/local/bin:$PATH"
```

## Installing pip and virtualenv
Now we have Python installed, but something is missing isn't? Yes! We need pip and virtualenv.

### Install setuptools
```
wget --no-check-certificate https://pypi.python.org/packages/source/s/setuptools/setuptools-1.4.2.tar.gz

# Extract the files:
tar -xvf setuptools-1.4.2.tar.gz
cd setuptools-1.4.2

# Install setuptools using the Python 2.7.8:
python2.7 setup.py install
```

### Install pip
```
curl https://raw.githubusercontent.com/pypa/pip/master/contrib/get-pip.py | python2.7 -
```

### And finally virtualenv
```
pip2.7 install virtualenv
```

And that's all, we have Python 2.7.8 installed on CentOS.
