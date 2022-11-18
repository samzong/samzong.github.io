---
layout: post
title: python3 traceback
tags:
  - Python
category:
  - Python
url: https://www.yuque.com/samzong/code/gy3x67
---

打印堆栈信息，方便调试

## 方式一

```python
import traceback

def test(self):
    try:
        1 / 0
    except BaseException as e:
        msg = traceback.format_exc()
        print(msg)
    finally:
        pass
```

### 方式二

```python
import logging

def test(self):
    try:
        1 / 0
    except BaseException as e:
        # msg = traceback.format_exc()
        msg = logging.exception(e)
        print(msg)
    finally:
        pass
```
