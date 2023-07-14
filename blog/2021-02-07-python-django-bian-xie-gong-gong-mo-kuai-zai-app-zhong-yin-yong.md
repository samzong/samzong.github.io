---
title: python django 编写公共模块在 app 中引用
tags: [Python]
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
