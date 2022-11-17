---
layout: post
title: python django 编写公共模块在app中引用
tags:
  - Python
category:
  - Python
url: https://www.yuque.com/samzong/code/oqgh03
---



## 使用方法一

```python
import sys
sys.path.append('../dingtalk')

from dingtalk import DingTalk
```

```python
import os
import sys

sys.path.insert(0,os.path('../dingtalk'))
```
