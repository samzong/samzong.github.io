---
layout: post
title: get current timestamp
tags:
  - Python
category:
  - Python
url: https://www.yuque.com/samzong/code/curllenttimestamp
---

```python
import time
millis = int(round(time.time() * 1000))
print millis
```

```python
import time

current_milli_time = lambda: int(round(time.time() * 1000))

current_milli_time()
```
