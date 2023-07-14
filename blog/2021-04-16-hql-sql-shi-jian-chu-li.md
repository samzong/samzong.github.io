---
title: HQL/SQL时间处理
tags: 
  - SQL
categories:
  - 数据库
url: https://www.yuque.com/samzong/code/phn4g3
---

```sql
--HQL ms
from_unixtime(CAST(obtained_ms/1000 AS BIGINT), 'yyyy-MM-dd HH:mm:ss')

--SQL ms
from_unixtime(time_in_ms / 1000)

--SQL date
date(from_unixtime(time_in_ms / 1000)) as dt
```
