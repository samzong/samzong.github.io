---
layout: post
title: covert timestamp2datetime
tags:
  - Python
category:
  - Python
url: https://www.yuque.com/samzong/code/kgogb9
---

```python
from datetime import datetime

datetime.fromtimestamp(int(res.json()["updated_at"] /1000)).strftime('%Y-%m-%d %H:%M:%S')
```
