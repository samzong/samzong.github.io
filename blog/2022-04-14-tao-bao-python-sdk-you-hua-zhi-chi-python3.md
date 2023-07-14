---
title: 淘宝 Python SDK 优化支持 Python3
toc: true
author: samzong.lu
author_id: defaultAuthorId
language: en
tags: 
  - Python
categories:
  - Python
date: 2022-04-14 10:43:00
---
淘宝开放平台的 SDK，Python 的 SDK 是在 2012 年，仅支持 Python2.7 及以上，但不支持 Python3；二现在是 2102 年了，像我这样的新手都是直接从 Python3 开始的

- 我已经把这个项目开放在 GitHub <https://github.com/SAMZONG/taobao-openapi>
- 同时放在了 Python pypi 软件仓库 <https://pypi.org/project/taobao-openapi/>

## Install & Usage

```bash
pip install taobao-openapi
```

```python

import taobao-openapi as tbapi

```

## 持续补充 SDK 能力

淘宝开放平台后台下载获取到的 SDK 文件，会根据应用的权限生产对应的 SDK 包，所以你可能获取到的是几十个或者上百个

NOTE: **如果你有其他的 SDK 没有在文档中找到，可以反馈给我或者提 `Pull requests`，大家一起扩充 SDK**

- v1.0.6 fix 文档错误
- v1.0.4 增加更多接口
- v1.0.3 增加更多接口
- v1.0.2 添加 Wdt QimenCloud-openapi
- v1.0.1 适配 taobao-openapi

## 使用说明

```python3

import top.api
import json

app_key = 
app_secret = 
session_key = 

def trade_rates_get_request():
 req = top.api.TraderatesGetRequest()
 req.set_app_info(top.appinfo(app_key, app_secret))
 
 req.fields = "tid,oid,role,nick,result,created,rated_nick,item_title,item_price,content,reply,num_iid"
 req.rate_type = "get"
 req.role = "buyer"
 
 try:
  resp = req.getResponse(session_key)
 except Exception as e:
  print(e)


if __name__ == '__main__':
 result = trade_rates_get_request()
 print(result)

```

## 适配部分介绍

> 以下为了省时间，基本引用了 <https://blog.csdn.net/starryhwj/article/details/103026402> 补充了 8
> 同时感谢 [@ymj4023](https://github.com/ymj4023)

### 1. Python3 int 替代了 long

```python3
FROM: str(long(time.time() * 1000))

TO: P_TIMESTAMP: str(int(time.time() * 1000))
```

### 2. 用 items 替代 iteritems

```python3
FROM: for key, value in application_parameter.iteritems():

TO: for key, value in application_parameter.items():
```

### 3. dict 方法优化

查阅资料，发现有人说到 dict methods dict.keys(), dict.items() and dict.values() return“views”instead of lists.这样就显而易见知道怎么改了：

```python3
FROM: keys = keys.sort()

TO: keys = sorted(keys)
```

### 4. unicode 对象需要编码

英文意思很明确，unicode 对象在哈希之前必须进行编码转换，想起之前又看到过中文字符在 python 中是以 unicode 存在的，所以：

```python3
FROM: sign = hashlib.md5(parameters)).hexdigest().upper()

TO: sign = hashlib.md5(parameters.encode("utf-8")).hexdigest().upper()
```

### 5. soket.py HttpConnection

这是花费时间最长的一个错误。首先，直接看最后，错误在 soket.py 里，心凉了半截，难道这里的调用都不一样了，再网上看又是 python 3.X 的 http 模块，去百度了半天也没有发现类似的错误，只能自己硬着头皮去看模块，功夫不负有心人，其实也很简单，在类 HTTPConnection 的初始化函数是这样定义的：

```python3
FROM: connection = httplib.HTTPConnection(self.__domain, self.__port, False, timeout)

TO: connection = httplib.HTTPConnection(self.__domain, self.__port, timeout)
```

> 比较下参数发现，python 2 比 3 多了一个参数，去掉即可，这个错误主要是是报错的地方和修改的地方不在一起，所以很难插出原因。

### 6. urllib 方法升级

官方文档是这样解释的：urllib has been split up in Python 3. The urllib.urlencode() function is now urllib.parse.urlencode(), and the urllib.urlopen() function is now urllib.request.urlopen()

```python3
FROM: url = N_REST + "?" + urllib.parse.urlencode(sys_parameters)

TO: url = N_REST + "?" + urllib.urlencode(sys_parameters)
```

### 7. jsonobj 异常抛出

这个错误是在 API 调用出异常的时候暴露出来的。原因前面已经提到了，稍微查了下替代的方法：

```python3
if "error_response" in jsonobj:

if P_CODE in jsonobj["error_response"]:
```

### 8. is not 修改为 !=

在 if 需要使用反向时，应该是 != ，而不是使用  is not；这个也是 PyCharm 给的建议，所以在使用时，所以简单调整下就好了

```python3
FROM: if respone.status is not 200:

TO: if response.status != 200:
```

---

以上调整之后，基本就可以正常跑起来了，基本是可以支持 Python3 的使用，我试过了 Python3.6-3.9，都是 OK 的。

## pypi HowTo

把你的库上传到 pypi 之前，主要依赖的是 setup.py，下方是对应的 demo

- 打包 python3 steup.py sdist
- twine upload dist/*

> 注意：需要先安装 setuptools twine

```python3
# /usr/bin/env python3
# -*- coding: utf-8 -*-

import setuptools
from distutils.core import setup
import codecs
import os
import sys

try:
 from setuptools import setup, find_packages
except:
 from distutils import setup

with open('README.md', 'r', encoding="utf-8") as fp:
 readme = fp.read()

VERSION = "1.0.0"
LICENSE = "MIT"

setup(
 name='taobao-openapi',
 version=VERSION,
 description=(
  '集合了淘宝开放平台的商铺 OPEN API，并适配了 Python3'
 ),
 long_description=readme,
 long_description_content_type='text/markdown',
 author='samzong.lu',
 author_email='samzong.lu@gmail.com',
 maintainer='samzong.lu',
 maintainer_email='samzong.lu@gmail.com',
 license=LICENSE,
 packages=find_packages(),
 platforms=["all"],
 url='https://github.com/SAMZONG/taobao-sdk-python3',
 install_requires=[
  "requests"
  ],
 classifiers=[
  'Development Status :: 4 - Beta',
  'Operating System :: OS Independent',
  'Intended Audience :: Developers',
  'License :: OSI Approved :: BSD License',
  'Programming Language :: Python',
  'Programming Language :: Python :: Implementation',
  'Programming Language :: Python :: 3',
  'Programming Language :: Python :: 3.4',
  'Programming Language :: Python :: 3.5',
  'Programming Language :: Python :: 3.6',
  'Programming Language :: Python :: 3.7',
  'Programming Language :: Python :: 3.8',
  'Programming Language :: Python :: 3.9',
  'Topic :: Software Development :: Libraries'
  ],
 )
```
