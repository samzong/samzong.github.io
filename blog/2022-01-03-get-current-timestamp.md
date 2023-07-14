---
title: get current timestamp
tags: []
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
