---
title: covert timestamp2datetime
tags: [Python]
---

```python
from datetime import datetime

datetime.fromtimestamp(int(res.json()["updated_at"] /1000)).strftime('%Y-%m-%d %H:%M:%S')
```
